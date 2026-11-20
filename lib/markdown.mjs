/* Markdown → HTML for wiki pages.

   Pages are plain GitHub-flavoured Markdown, so they read correctly in the
   GitHub file viewer and in Obsidian without this build. Everything here is an
   enhancement of syntax those two already understand:

     # Title                      the page title (exactly one per page)
     [text](other-page.md#anchor) relative links, checked and rewritten to .html
     ![alt](assets/fig.svg)       image; an italic paragraph right after it
     *Caption.*                   becomes the figure caption
     > [!NOTE]                    callouts (NOTE, TIP, IMPORTANT, WARNING, CAUTION)
     $x$  and  $$ … $$            math, typeset at build time
     <!-- widget: name -->        interactive widget (invisible elsewhere)
*/
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from '../vendor/markdown-it/markdown-it.mjs';
import {mathPlugin} from './math.mjs';
import {createSlugger} from './slug.mjs';
import {imageSize} from './imagesize.mjs';

const CALLOUTS = {NOTE: 'Note', TIP: 'Tip', IMPORTANT: 'Important', WARNING: 'Warning', CAUTION: 'Caution'};
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const posix = path.posix;

export const escapeHtml = text => String(text)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function plainText(children = []) {
  return children.map(token => {
    if (token.type === 'text' || token.type === 'code_inline') return token.content;
    if (token.type === 'softbreak' || token.type === 'hardbreak') return ' ';
    if (token.type === 'image') return '';
    return '';
  }).join('');
}

/** Resolve a relative reference written in `page` to a wiki-root path. */
function resolveRef(page, ref) {
  const target = posix.normalize(posix.join(posix.dirname(page.src), ref));
  return target.startsWith('..') ? null : target;
}

function relativeHref(fromOut, toOut) {
  return posix.relative(posix.dirname(fromOut), toOut) || posix.basename(toOut);
}

function linkTarget(href, env, what) {
  const hashAt = href.indexOf('#');
  const rawPath = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : href.slice(hashAt + 1);
  if (rawPath === '') {
    env.anchors.push({page: env.page.src, hash, from: env.page.src});
    return href;
  }
  let decoded;
  try { decoded = decodeURI(rawPath); } catch { decoded = rawPath; }
  let target = resolveRef(env.page, decoded);
  if (target === null) {
    env.problems.push(`${what} "${href}" points outside wiki/`);
    return href;
  }
  if (decoded.endsWith('/')) target = posix.join(target, 'README.md');
  if (target.endsWith('.md')) {
    const page = env.site.pages.get(target);
    if (!page) {
      env.problems.push(`${what} "${href}" → no such page (${target})`);
      return href;
    }
    env.links.push(target);
    if (hash) env.anchors.push({page: target, hash, from: env.page.src});
    return relativeHref(env.page.out, page.out) + (hash ? `#${hash}` : '');
  }
  if (!env.site.assetExists(target)) {
    env.problems.push(`${what} "${href}" → file not found (${target})`);
    return href;
  }
  env.assets.add(target);
  return href;
}

function handleLink(token, env) {
  const href = token.attrGet('href');
  if (!href) return;
  if (EXTERNAL.test(href)) {
    if (/^https?:/i.test(href)) {
      token.attrSet('rel', 'noopener');
      token.attrJoin('class', 'external');
      env.external.add(href);
    }
    return;
  }
  token.attrSet('href', linkTarget(href, env, 'link'));
}

function handleImage(token, env) {
  const src = token.attrGet('src');
  if (!src) return;
  if (!plainText(token.children).trim()) env.problems.push(`image "${src}" has no alt text`);
  if (EXTERNAL.test(src)) {
    env.problems.push(`image "${src}" is hot-linked; copy it into wiki/assets/ and credit it instead`);
    return;
  }
  const target = resolveRef(env.page, decodeURI(src));
  if (target === null || !env.site.assetExists(target)) {
    env.problems.push(`image "${src}" → file not found`);
    return;
  }
  env.assets.add(target);
  const size = imageSize(env.site.assetPath(target));
  if (size) {
    token.attrSet('width', String(Math.round(size.width)));
    token.attrSet('height', String(Math.round(size.height)));
  }
  token.attrSet('loading', 'lazy');
  token.attrSet('decoding', 'async');
}

/** Relative src/href/poster attributes inside raw HTML get the same checks. */
function rewriteHtml(html, env) {
  return html.replace(/\b(src|href|poster)="([^"]+)"/g, (whole, name, value) => {
    if (EXTERNAL.test(value) || value.startsWith('#')) return whole;
    return `${name}="${linkTarget(value, env, `<${name}>`)}"`;
  });
}

function isImageParagraph(inline) {
  const meaningful = inline.children.filter(t => !(t.type === 'softbreak' || (t.type === 'text' && !t.content.trim())));
  return meaningful.length > 0 && meaningful.every(t => t.type === 'image') ? meaningful.length : 0;
}

function isCaptionParagraph(inline) {
  const kids = inline.children;
  if (kids.length < 3 || kids[0].type !== 'em_open' || kids.at(-1).type !== 'em_close') return false;
  let depth = 0;
  for (const [index, token] of kids.entries()) {
    if (token.type === 'em_open') depth += 1;
    if (token.type === 'em_close') depth -= 1;
    if (depth === 0 && index < kids.length - 1) return false; // emphasis ends early
  }
  return true;
}

function transform(state) {
  const {env, Token} = state;
  if (!env.page) return; // plain md.render() calls (tests, snippets)
  let tokens = state.tokens;
  const slug = createSlugger();

  /* ---- title: the single level-1 heading -------------------------------- */
  const h1 = tokens.findIndex(t => t.type === 'heading_open' && t.tag === 'h1');
  if (h1 === -1) env.problems.push('page has no "# Title" heading');
  else {
    env.title = plainText(tokens[h1 + 1].children).trim();
    tokens.splice(h1, 3);
    if (tokens.some(t => t.type === 'heading_open' && t.tag === 'h1')) {
      env.problems.push('more than one "# " heading; use "## " for sections');
    }
  }

  /* ---- callouts --------------------------------------------------------- */
  for (let i = 0; i < tokens.length; i += 1) {
    const open = tokens[i];
    const inline = tokens[i + 2];
    if (open.type !== 'blockquote_open' || tokens[i + 1]?.type !== 'paragraph_open' || inline?.type !== 'inline') continue;
    const marker = inline.children[0];
    const match = marker?.type === 'text' && /^\[!(\w+)\]\s*$/.exec(marker.content);
    if (!match) continue;
    const kind = match[1].toUpperCase();
    if (!CALLOUTS[kind]) {
      env.problems.push(`unknown callout [!${match[1]}]; use ${Object.keys(CALLOUTS).join(', ')}`);
      continue;
    }
    let close = i + 1;
    while (!(tokens[close].type === 'blockquote_close' && tokens[close].level === open.level)) close += 1;
    open.tag = 'div';
    open.attrJoin('class', `callout callout-${kind.toLowerCase()}`);
    tokens[close].tag = 'div';
    inline.children.shift();
    if (inline.children[0]?.type === 'softbreak') inline.children.shift();
    const title = new Token('html_block', '', 0);
    title.content = `<p class="callout-title">${CALLOUTS[kind]}</p>\n`;
    if (inline.children.length === 0) tokens.splice(i + 1, 3, title);
    else tokens.splice(i + 1, 0, title);
  }

  /* ---- card grids: <!-- cards --> … <!-- /cards -->, one card per ### ---- */
  for (let i = 0, inGrid = false, inCard = false; i < tokens.length; i += 1) {
    const token = tokens[i];
    const html = text => Object.assign(new Token('html_block', '', 0), {content: text});
    if (token.type === 'html_block' && /^<!--\s*cards\s*-->\s*$/.test(token.content)) {
      token.content = '<div class="card-grid">\n';
      inGrid = true;
    } else if (token.type === 'html_block' && /^<!--\s*\/cards\s*-->\s*$/.test(token.content)) {
      token.content = `${inCard ? '</div>\n' : ''}</div>\n`;
      inGrid = inCard = false;
    } else if (inGrid && token.type === 'heading_open' && token.tag === 'h3') {
      tokens.splice(i, 0, html(`${inCard ? '</div>\n' : ''}<div class="card">\n`));
      inCard = true;
      i += 1;
    }
  }

  /* ---- figures: image paragraph + optional italic caption --------------- */
  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i].type !== 'paragraph_open' || tokens[i + 1]?.type !== 'inline') continue;
    const count = isImageParagraph(tokens[i + 1]);
    if (!count) continue;
    tokens[i].tag = 'figure';
    if (count > 1) tokens[i].attrJoin('class', 'multi');
    tokens[i + 1].children = tokens[i + 1].children.filter(t => t.type === 'image');
    const caption = tokens[i + 4];
    if (tokens[i + 3]?.type === 'paragraph_open' && caption?.type === 'inline' && isCaptionParagraph(caption)) {
      tokens[i + 2].hidden = true;
      tokens[i + 3].tag = 'figcaption';
      tokens[i + 5].tag = 'figcaption';
      caption.children = caption.children.slice(1, -1);
      const end = new Token('html_block', '', 0);
      end.content = '</figure>\n';
      tokens.splice(i + 6, 0, end);
      i += 6;
    } else {
      tokens[i + 2].tag = 'figure';
    }
  }

  /* ---- headings, links, images, raw HTML, search text ------------------- */
  let section = {id: '', title: '', text: []};
  const sections = [section];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.type === 'heading_open') {
      const inline = tokens[i + 1];
      const text = plainText(inline.children).trim();
      if (inline.children.some(t => t.type === 'math_inline')) env.problems.push(`heading "${text}" contains math; anchors would differ on GitHub`);
      const id = slug(text);
      token.attrSet('id', id);
      tokens[i + 2].meta = {id};
      env.ids.add(id);
      const level = Number(token.tag.slice(1));
      if (level <= 3) {
        env.toc.push({level, id, text});
        section = {id, title: text, text: []};
        sections.push(section);
      }
      i += 2;
      continue;
    }
    if (token.type === 'inline') {
      for (const child of token.children) {
        if (child.type === 'link_open') handleLink(child, env);
        else if (child.type === 'image') handleImage(child, env);
        else if (child.type === 'html_inline') {
          child.content = rewriteHtml(child.content, env);
          for (const [, id] of child.content.matchAll(/\bid="([^"]+)"/g)) env.ids.add(id);
        }
      }
      section.text.push(plainText(token.children));
      continue;
    }
    if (token.type === 'html_block') {
      const widget = /^<!--\s*widget:\s*([a-z0-9-]+)\s*-->\s*$/.exec(token.content);
      if (widget) {
        env.widgets.add(widget[1]);
        token.content = `<div class="widget" data-widget="${widget[1]}"><p class="widget-fallback">This interactive tool needs JavaScript.</p></div>\n`;
        continue;
      }
      token.content = rewriteHtml(token.content, env);
      for (const [, id] of token.content.matchAll(/\bid="([^"]+)"/g)) env.ids.add(id);
    }
  }
  env.sections = sections
    .map(s => ({id: s.id, title: s.title, text: s.text.join(' ').replace(/\s+/g, ' ').trim()}))
    .filter(s => s.text || s.title);
  state.tokens = tokens;
}

export function createMarkdown() {
  const md = new MarkdownIt({html: true, linkify: false, typographer: true});
  mathPlugin(md);
  md.core.ruler.push('wiki', transform);

  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';

  md.renderer.rules.heading_close = (tokens, index) => {
    const {tag, meta} = tokens[index];
    const anchor = meta?.id ? `<a class="anchor" href="#${meta.id}" aria-label="Link to this section">#</a>` : '';
    return `${anchor}</${tag}>\n`;
  };

  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    token.attrSet('alt', self.renderInlineAsText(token.children, options, env));
    return `<img${self.renderAttrs(token)}>`;
  };

  return md;
}

/** Render one page. Returns the body HTML plus everything the build tracks. */
export function renderPage(md, page, site) {
  const env = {
    page, site, where: page.src,
    title: '', toc: [], links: [], anchors: [], assets: new Set(), widgets: new Set(),
    external: new Set(), ids: new Set(), sections: [], problems: [],
  };
  const html = md.render(page.body, env);
  return {html, ...env};
}

export function readText(file) {
  return fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
}
