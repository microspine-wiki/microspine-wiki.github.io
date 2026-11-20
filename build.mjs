#!/usr/bin/env node
/* Build the wiki: wiki/**.md → _site/**.html. Nothing to install; needs Node 20+.

     node build.mjs               build into _site/ and report problems
     node build.mjs --serve       build, serve on http://localhost:4173, rebuild on change
     node build.mjs --standalone  self-contained pages in _preview/ (styles, scripts and
                                  images inlined) for file:// or embedded previews
     node build.mjs --public      ignore the local pending/ overlay (always on in CI)

   The build fails on broken links, missing anchors or images, LaTeX errors,
   and third-party media that is not listed in wiki/about/credits.md. */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import config from './site.config.mjs';
import {parseFrontMatter} from './lib/frontmatter.mjs';
import {createMarkdown, renderPage, readText} from './lib/markdown.mjs';
import {flatten, parseSummary} from './lib/nav.mjs';
import {renderShell} from './lib/template.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2).filter(arg => !arg.includes('=')));
const option = name => process.argv.find(arg => arg.startsWith(`--${name}=`))?.split('=')[1];
const serve = args.has('--serve');
const standalone = args.has('--standalone');
const publicOnly = args.has('--public') || Boolean(process.env.CI);
const port = Number(option('port') ?? 4173);
const outDir = path.join(root, standalone ? '_preview' : '_site');
const wikiDir = path.join(root, 'wiki');
const pendingDir = path.join(root, 'pending', 'wiki');
const themeDir = path.join(root, 'theme');

const RASTER = /\.(png|jpe?g|gif|webp|avif|mp4|webm|mov|pdf)$/i;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.py': 'text/plain; charset=utf-8',
};

function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    if (entry.name.startsWith('.')) return []; // .DS_Store, .obsidian, …
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full, base) : [path.relative(base, full).split(path.sep).join('/')];
  });
}

function lastChanged(file) {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {cwd: root, stdio: ['ignore', 'pipe', 'ignore']}).toString().trim();
    if (date) return date;
  } catch { /* not a Git checkout, or Git is missing */ }
  const time = fs.statSync(file).mtime;
  const pad = number => String(number).padStart(2, '0');
  return `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())}`;
}

function outPath(src) {
  return src.endsWith('README.md') ? src.replace(/README\.md$/, 'index.html') : src.replace(/\.md$/, '.html');
}

function build({liveReload = false} = {}) {
  const errors = [];
  const warnings = [];

  /* ---- gather files: wiki/, then the optional local overlay ------------- */
  const files = new Map();
  for (const rel of walk(wikiDir)) files.set(rel, {file: path.join(wikiDir, rel), pending: false});
  if (!publicOnly) for (const rel of walk(pendingDir)) files.set(rel, {file: path.join(pendingDir, rel), pending: true});

  const pages = new Map();
  for (const [rel, entry] of files) {
    if (rel.startsWith('theme/')) errors.push(`wiki/${rel}: "theme/" is reserved for the site's own styles and scripts`);
    if (!rel.endsWith('.md') || rel === 'SUMMARY.md') continue;
    try {
      const {data, body} = parseFrontMatter(readText(entry.file), rel);
      pages.set(rel, {src: rel, file: entry.file, out: outPath(rel), data, body, pending: entry.pending, backlinks: [], group: ''});
    } catch (error) {
      errors.push(error.message);
    }
  }

  const site = {
    config, pages,
    assetExists: rel => files.has(rel) && !rel.endsWith('.md'),
    assetPath: rel => files.get(rel).file,
  };

  /* ---- navigation ------------------------------------------------------- */
  let nav = [];
  try {
    nav = parseSummary(readText(path.join(wikiDir, 'SUMMARY.md')));
  } catch (error) {
    errors.push(error.message);
  }
  for (const group of nav) {
    group.items = group.items.filter(item => {
      if (pages.has(item.src)) return true;
      errors.push(`SUMMARY.md: "${item.title}" points to ${item.src}, which does not exist`);
      return false;
    });
  }
  // Local drafts name the sidebar group they belong to with `nav: Group title`.
  for (const page of pages.values()) {
    if (!page.pending || !page.data.nav) continue;
    let group = nav.find(g => g.title === page.data.nav);
    if (!group) nav.push(group = {title: String(page.data.nav), items: []});
    group.items.push({title: null, src: page.src});
  }
  site.nav = nav;

  /* ---- render ----------------------------------------------------------- */
  const md = createMarkdown();
  const anchors = [];
  const usedAssets = new Set();
  const external = new Set();
  for (const page of pages.values()) {
    try {
      const result = renderPage(md, page, site);
      Object.assign(page, {
        html: result.html, title: result.title || page.src, toc: result.toc, links: result.links,
        widgets: result.widgets, ids: result.ids, sections: result.sections,
      });
      page.description = page.data.description || (result.sections[0]?.text ?? '').slice(0, 155);
      page.updated = lastChanged(page.file);
      anchors.push(...result.anchors);
      result.assets.forEach(asset => usedAssets.add(asset));
      result.external.forEach(url => external.add(url));
      result.problems.forEach(problem => errors.push(`${page.src}: ${problem}`));
      for (const name of result.widgets) {
        if (!fs.existsSync(path.join(themeDir, 'widgets', `${name}.js`))) errors.push(`${page.src}: unknown widget "${name}"`);
      }
    } catch (error) {
      errors.push(error.message.startsWith(page.src) ? error.message : `${page.src}: ${error.message}`);
      Object.assign(page, {html: '', title: page.src, toc: [], links: [], widgets: new Set(), ids: new Set(), sections: [], description: '', updated: ''});
    }
  }
  for (const group of nav) {
    for (const item of group.items) {
      const page = pages.get(item.src);
      item.title ??= page.title;
      page.group = group.title;
    }
  }
  site.order = flatten(nav);

  /* ---- checks ----------------------------------------------------------- */
  for (const {page: target, hash, from} of anchors) {
    let id = hash;
    try { id = decodeURIComponent(hash); } catch { /* keep as written */ }
    if (!pages.get(target)?.ids.has(id)) errors.push(`${from}: no heading or anchor "#${hash}" in ${target}`);
  }
  const listed = new Set(site.order.map(item => item.src));
  for (const page of pages.values()) {
    if (!listed.has(page.src)) warnings.push(`${page.src}: not listed in SUMMARY.md, so it has no sidebar entry`);
  }
  const creditsPage = pages.get('about/credits.md');
  const credits = creditsPage ? creditsPage.body : '';
  const credited = rel => credits.includes(path.posix.basename(rel));
  for (const rel of files.keys()) {
    if (rel.endsWith('.md')) continue;
    const thirdParty = RASTER.test(rel) || !rel.startsWith('assets/figures/');
    const posterOf = rel.endsWith('.poster.jpg') ? [...files.keys()].find(other => /\.(mp4|webm)$/i.test(other) && other.replace(/\.(mp4|webm)$/i, '.poster.jpg') === rel) : null;
    if (thirdParty && !/\.(py|csv|json|txt)$/i.test(rel) && !credited(rel) && !(posterOf && credited(posterOf))) {
      errors.push(`wiki/${rel}: media that is not an original figure must be listed in about/credits.md with its source and licence`);
    }
    if (!usedAssets.has(rel)) warnings.push(`wiki/${rel}: file is not used by any page`);
  }

  /* ---- backlinks -------------------------------------------------------- */
  for (const page of pages.values()) {
    if (page.src === 'README.md') continue; // the home page links to everything
    for (const target of new Set(page.links)) {
      if (target !== page.src) pages.get(target)?.backlinks.push(page);
    }
  }
  for (const page of pages.values()) page.backlinks.sort((a, b) => a.title.localeCompare(b.title));

  /* ---- write ------------------------------------------------------------ */
  fs.rmSync(outDir, {recursive: true, force: true});
  fs.mkdirSync(outDir, {recursive: true});
  const widgetNames = walk(path.join(themeDir, 'widgets')).filter(name => name.endsWith('.js')).map(name => name.slice(0, -3));
  const inline = standalone ? {
    css: readText(path.join(themeDir, 'site.css')),
    js: readText(path.join(themeDir, 'site.js')),
    widgets: Object.fromEntries(widgetNames.map(name => [name, readText(path.join(themeDir, 'widgets', `${name}.js`))])),
  } : {};

  for (const page of pages.values()) {
    let html = renderShell(page, site, {standalone, inline, liveReload});
    if (standalone) {
      html = html.replace(/(<img\b[^>]*?\bsrc=")([^"]+)(")/g, (whole, before, src, after) => {
        if (/^(?:data:|[a-z]+:\/\/)/i.test(src)) return whole;
        const rel = path.posix.normalize(path.posix.join(path.posix.dirname(page.src), decodeURI(src)));
        const entry = files.get(rel);
        if (!entry) return whole;
        const mime = MIME[path.extname(rel).toLowerCase()] ?? 'application/octet-stream';
        return `${before}data:${mime};base64,${fs.readFileSync(entry.file).toString('base64')}${after}`;
      });
    }
    const target = path.join(outDir, page.out);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.writeFileSync(target, html);
  }

  if (!standalone) {
    for (const [rel, entry] of files) {
      if (rel.endsWith('.md')) continue;
      const target = path.join(outDir, rel);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.copyFileSync(entry.file, target);
    }
    fs.mkdirSync(path.join(outDir, 'theme', 'widgets'), {recursive: true});
    for (const name of ['site.css', 'site.js']) fs.copyFileSync(path.join(themeDir, name), path.join(outDir, 'theme', name));
    for (const name of widgetNames) fs.copyFileSync(path.join(themeDir, 'widgets', `${name}.js`), path.join(outDir, 'theme', 'widgets', `${name}.js`));

    const index = [...pages.values()].map(page => ({
      u: page.out, t: page.title, g: page.group,
      s: page.sections.map(section => [section.id, section.title, section.text]),
    }));
    // U+2028 / U+2029 are valid in JSON but end a line in older JavaScript parsers.
    const separators = new RegExp(`[${String.fromCharCode(0x2028, 0x2029)}]`, 'g');
    const json = JSON.stringify(index).replace(separators, c => `\\u${c.charCodeAt(0).toString(16)}`);
    fs.writeFileSync(path.join(outDir, 'theme', 'search-index.js'), `window.WIKI_SEARCH=${json};`);
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    if (config.siteUrl) {
      const urls = [...pages.values()].filter(page => !page.pending)
        .map(page => `<url><loc>${config.siteUrl}${page.out === 'index.html' ? '' : page.out}</loc><lastmod>${page.updated}</lastmod></url>`);
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
    }
    fs.writeFileSync(path.join(outDir, 'external-links.txt'), `${[...external].sort().join('\n')}\n`);
  }

  /* ---- report ----------------------------------------------------------- */
  const pendingCount = [...pages.values()].filter(page => page.pending).length;
  for (const warning of warnings) console.warn(`warning  ${warning}`);
  for (const error of errors) console.error(`ERROR    ${error}`);
  console.log(`${pages.size} pages${pendingCount ? ` (${pendingCount} local drafts from pending/)` : ''}, ${files.size - pages.size - 1} assets → ${path.relative(root, outDir)}/` +
    `  ·  ${errors.length} errors, ${warnings.length} warnings`);
  return {errors, warnings};
}

/* ---- command line -------------------------------------------------------- */
if (!serve) {
  const {errors} = build();
  process.exit(errors.length ? 1 : 0);
}

const clients = new Set();
const safeBuild = () => {
  try { build({liveReload: true}); } catch (error) { console.error(error); }
  for (const client of clients) client.write('data: reload\n\n');
};
safeBuild();
let timer;
for (const dir of [wikiDir, pendingDir, themeDir]) {
  if (!fs.existsSync(dir)) continue;
  fs.watch(dir, {recursive: true}, () => { clearTimeout(timer); timer = setTimeout(safeBuild, 150); });
}
http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/__reload') {
    response.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive'});
    clients.add(response);
    request.on('close', () => clients.delete(response));
    return;
  }
  let file = path.join(outDir, decodeURIComponent(url.pathname));
  if (!file.startsWith(outDir)) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { response.writeHead(404, {'Content-Type': 'text/plain'}).end('Not found'); return; }
  response.writeHead(200, {'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-store'});
  fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Serving http://localhost:${port}  (Ctrl+C to stop; lib/ changes need a restart)`));
