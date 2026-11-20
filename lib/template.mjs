/* The page shell: floating nav, page list, article, "on this page", footers. */
import path from 'node:path';
import {escapeHtml as esc} from './markdown.mjs';

const posix = path.posix;

// A spine tip catching a ledge: the one picture the whole wiki is about.
const MARK = `<svg class="mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 21V11.5l5-2v5.5l5-2V21z" fill="#d2d2d7"/><path d="M20 3c-1 6.4-4.1 9.9-9.3 10.5" fill="none" stroke="#1d1d1f" stroke-width="2.2" stroke-linecap="round"/><circle cx="10.4" cy="13.5" r="1.8" fill="#0071e3"/></svg>`;

const FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1d1d1f"/><path d="M10 54V31l13-5v14l13-5v19z" fill="#6e6e73"/><path d="M52 10c-2.4 16-10.4 24.8-23.6 26.4" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/><circle cx="27.6" cy="36.6" r="4.6" fill="#2997ff"/></svg>`)}`;

const FONTS = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

function href(page, targetOut) {
  return posix.relative(posix.dirname(page.out), targetOut) || posix.basename(targetOut);
}

function sidebar(page, site) {
  return site.nav.map(group => {
    const items = group.items.map(item => {
      const target = site.pages.get(item.src);
      const current = target === page ? ' aria-current="page"' : '';
      const pending = target.pending ? '<span class="tag-pending" title="Local draft, not published">local</span>' : '';
      return `<li><a href="${href(page, target.out)}"${current}>${esc(item.title)}${pending}</a></li>`;
    }).join('');
    const heading = group.title ? `<h2>${esc(group.title)}</h2>` : '';
    return `<section>${heading}<ul>${items}</ul></section>`;
  }).join('');
}

function tableOfContents(toc) {
  const entries = toc.filter(entry => entry.level === 2 || entry.level === 3);
  if (entries.length < 2) return '';
  const items = entries.map(entry =>
    `<li class="l${entry.level}"><a href="#${entry.id}">${esc(entry.text)}</a></li>`).join('');
  return `<aside class="toc" aria-label="On this page"><h2>On this page</h2><ul>${items}</ul></aside>`;
}

function pageFooter(page, site) {
  const parts = [];
  if (page.backlinks.length) {
    const links = page.backlinks.map(from => `<li><a href="${href(page, from.out)}">${esc(from.title)}</a></li>`).join('');
    parts.push(`<section class="backlinks"><h2>Pages that link here</h2><ul>${links}</ul></section>`);
  }
  if (site.config.repository && !page.pending) {
    const source = `${site.config.repository}/edit/${site.config.branch}/wiki/${page.src}`;
    parts.push(`<p class="page-meta">Spotted an error or have data to add? <a href="${esc(source)}" rel="noopener">Edit this page on GitHub</a>.</p>`);
  }
  const index = site.order.findIndex(item => item.src === page.src);
  if (index !== -1) {
    const link = (item, cls, label) => {
      if (!item) return '<span></span>';
      const target = site.pages.get(item.src);
      return `<a class="${cls}" href="${href(page, target.out)}"><small>${label}</small><span>${esc(item.title)}</span></a>`;
    };
    parts.push(`<nav class="pager" aria-label="Previous and next page">${link(site.order[index - 1], 'prev', 'Previous')}${link(site.order[index + 1], 'next', 'Next')}</nav>`);
  }
  return parts.length ? `<footer class="page-foot">${parts.join('')}</footer>` : '';
}

export function renderShell(page, site, {standalone = false, inline = {}, liveReload = false} = {}) {
  const {config} = site;
  const rootSlash = `${posix.relative(posix.dirname(page.out), '.') || '.'}/`;
  const isHome = page.src === 'README.md';
  const title = isHome ? `${config.title}: ${config.tagline}` : `${page.title} · ${config.title}`;
  const description = page.description || config.description;
  const canonical = config.siteUrl ? `\n<link rel="canonical" href="${esc(config.siteUrl + (page.out === 'index.html' ? '' : page.out))}">` : '';

  const crumbs = isHome ? '' : `<p class="crumbs"><a href="${rootSlash}index.html">${esc(config.title)}</a>${page.group ? ` / ${esc(page.group)}` : ''}</p>`;
  const byline = [];
  if (page.updated) byline.push(`<span>Updated <time datetime="${page.updated}">${page.updated}</time></span>`);
  if (page.data.status && config.statuses[page.data.status]) {
    byline.push(`<span class="st st-${esc(page.data.status)}" title="${esc(config.statuses[page.data.status])}">${esc(page.data.status)}</span>`);
  }
  const lead = page.data.description ? `<div class="abstract"><p>${esc(page.data.description)}</p></div>` : '';
  const pending = page.pending
    ? `<p class="pending-banner"><strong>Local draft.</strong> This page is loaded from <code>pending/</code>, which Git ignores. It is not part of the public site until it is cleared for release and moved into <code>wiki/</code>.</p>` : '';
  const widgets = [...page.widgets];

  const css = standalone ? `<style>${inline.css}</style>` : `<link rel="stylesheet" href="${rootSlash}theme/site.css">`;
  const scripts = standalone
    ? `<script>${inline.js}</script>${widgets.map(name => `<script>${inline.widgets[name]}</script>`).join('')}`
    : `<script src="${rootSlash}theme/site.js" defer></script>${widgets.map(name => `<script src="${rootSlash}theme/widgets/${name}.js" defer></script>`).join('')}`;
  const reload = liveReload ? `<script>new EventSource('/__reload').onmessage=function(){location.reload()}</script>` : '';
  const search = standalone ? '' : `<div class="search" role="search">
    <input id="search-input" type="search" placeholder="Search" aria-label="Search the wiki" autocomplete="off" spellcheck="false">
    <kbd aria-hidden="true">/</kbd>
    <div id="search-results" class="search-results" hidden></div>
  </div>`;
  const repo = config.repository ? `<a class="nav-link" href="${esc(config.repository)}" rel="noopener">GitHub</a>` : '';

  return `<!doctype html>
<html lang="${config.language}">
<head>
<meta name="referrer" content="no-referrer">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light">
<meta property="og:title" content="${esc(isHome ? config.title : page.title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${isHome ? 'website' : 'article'}">
<meta property="og:site_name" content="${esc(config.title)}">${canonical}
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${css}
</head>
<body class="${isHome ? 'home' : 'doc'}" data-root="${rootSlash}">
<a class="skip" href="#content">Skip to content</a>
<nav class="nav" aria-label="${esc(config.title)}">
  <button class="nav-toggle" type="button" aria-controls="sidebar" aria-expanded="false" aria-label="Open the page list"><span></span></button>
  <a class="nav-title" href="${rootSlash}index.html">${MARK}<span class="t-full">${esc(config.title)}</span></a>
  ${page.group ? `<span class="crumb">${esc(page.group)}</span>` : ''}
  ${search}
  ${repo}
</nav>
<div class="layout">
  <nav id="sidebar" class="sidebar" aria-label="Wiki pages">${sidebar(page, site)}</nav>
  <main id="content">
    <article>
      <header class="art-head">
        ${crumbs}
        <h1>${esc(page.title)}</h1>
        ${byline.length ? `<p class="byline">${byline.join('')}</p>` : ''}
        ${lead}
        ${pending}
      </header>
      <div class="prose">
${page.html}
      </div>
      ${pageFooter(page, site)}
    </article>
  </main>
  ${isHome ? '' : tableOfContents(page.toc)}
</div>
<footer class="site-foot"><div class="wrap">
  <p>Text and original figures: <a href="${config.license.url}" rel="noopener">${config.license.text}</a> unless marked otherwise. Third-party figures keep their own terms; see <a href="${rootSlash}about/credits.html">credits</a>.</p>
  <p>An independent community project, not an official publication of any university, laboratory or sponsor. <a href="${rootSlash}about/about.html">About this wiki</a></p>
</div></footer>
${scripts}${reload}
</body>
</html>
`;
}
