/* Progressive enhancement only: every page is complete without this script. */
(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const root = document.body.dataset.root || './';

  /* ---- navigation drawer (small screens) --------------------------------- */
  const toggle = $('.nav-toggle');
  const setNav = open => {
    document.body.classList.toggle('nav-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close the page list' : 'Open the page list');
  };
  toggle?.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  document.addEventListener('click', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (!event.target.closest('.sidebar') && !event.target.closest('.nav-toggle')) setNav(false);
  });
  $('.sidebar a[aria-current="page"]')?.scrollIntoView({block: 'center'});

  /* ---- "on this page" highlight ------------------------------------------ */
  const tocLinks = new Map($$('.toc a').map(link => [decodeURIComponent(link.hash.slice(1)), link]));
  if (tocLinks.size && 'IntersectionObserver' in window) {
    const headings = [...tocLinks.keys()].map(id => document.getElementById(id)).filter(Boolean);
    const mark = id => tocLinks.forEach((link, key) => link.classList.toggle('active', key === id));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) mark(entry.target.id);
    }, {rootMargin: '-90px 0px -68% 0px'});
    headings.forEach(heading => observer.observe(heading));
  }

  /* ---- search ------------------------------------------------------------- */
  const input = $('#search-input');
  const panel = $('#search-results');
  if (input && panel) {
    let index = null;
    let loading = null;
    let active = -1;
    const load = () => loading ??= new Promise((resolve, reject) => {
      // A script tag, not fetch(): it also works when the site is opened from disk.
      const script = document.createElement('script');
      script.src = `${root}theme/search-index.js`;
      script.onload = () => resolve(index = window.WIKI_SEARCH || []);
      script.onerror = reject;
      document.head.append(script);
    });
    const escape = text => text.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
    const highlight = (text, terms) => {
      const pattern = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
      return escape(text).replace(pattern, '<mark>$1</mark>');
    };
    const snippet = (text, terms) => {
      const lower = text.toLowerCase();
      const at = Math.max(0, Math.min(...terms.map(t => lower.indexOf(t)).filter(i => i >= 0), text.length));
      const start = Math.max(0, at - 50);
      return (start ? '…' : '') + text.slice(start, start + 150).trim() + (start + 150 < text.length ? '…' : '');
    };
    const search = query => {
      const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
      if (!terms.length) return [];
      const hits = [];
      for (const page of index) {
        const title = page.t.toLowerCase();
        let perPage = 0;
        for (const [id, heading, text] of page.s) {
          const head = heading.toLowerCase();
          const body = text.toLowerCase();
          let score = 0;
          let all = true;
          for (const term of terms) {
            const inTitle = title.includes(term);
            const inHead = head.includes(term);
            const count = body.split(term).length - 1;
            if (!inTitle && !inHead && !count) { all = false; break; }
            score += (inTitle ? 8 : 0) + (inHead ? 6 : 0) + Math.min(count, 4);
            if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(`${head} ${body}`)) score += 1;
          }
          if (!all) continue;
          if (!id) score += 2; // the page's opening section
          hits.push({page, id, heading, text, score, order: perPage++});
        }
      }
      hits.sort((a, b) => b.score - a.score || a.order - b.order);
      const seen = new Map();
      return hits.filter(hit => {
        const n = seen.get(hit.page.u) ?? 0;
        seen.set(hit.page.u, n + 1);
        return n < 2;
      }).slice(0, 10);
    };
    const render = () => {
      const query = input.value.trim();
      if (!query) { panel.hidden = true; return; }
      const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
      const hits = index ? search(query) : [];
      active = -1;
      panel.hidden = false;
      panel.innerHTML = hits.length ? hits.map(hit => `<a href="${root}${hit.page.u}${hit.id ? `#${hit.id}` : ''}">
        <span class="where">${escape(hit.page.g || 'Wiki')}</span>
        <span class="title">${highlight(hit.page.t, terms)}${hit.heading && hit.id ? ` › ${highlight(hit.heading, terms)}` : ''}</span>
        <span class="snippet">${highlight(snippet(hit.text, terms), terms)}</span></a>`).join('')
        : `<p class="empty">${index ? `No pages mention “${escape(query)}”.` : 'Loading the index…'}</p>`;
    };
    const move = step => {
      const links = $$('a', panel);
      if (!links.length) return;
      active = (active + step + links.length) % links.length;
      links.forEach((link, i) => link.classList.toggle('active', i === active));
      links[active].scrollIntoView({block: 'nearest'});
    };
    input.addEventListener('focus', () => load().then(render).catch(() => { panel.hidden = false; panel.innerHTML = '<p class="empty">Search is unavailable here.</p>'; }));
    input.addEventListener('input', () => load().then(render).catch(() => {}));
    input.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
      else if (event.key === 'Enter') { const link = $$('a', panel)[Math.max(active, 0)]; if (link) location.href = link.href; }
      else if (event.key === 'Escape') { panel.hidden = true; input.blur(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.search')) panel.hidden = true; });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setNav(false);
      const typing = /^(input|textarea|select)$/i.test(event.target.tagName) || event.target.isContentEditable;
      if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) { event.preventDefault(); input.focus(); input.select(); }
    });
  }

  /* ---- widgets register themselves; mount whatever is on the page -------- */
  window.WikiWidgets = window.WikiWidgets || {};
  const mount = () => $$('.widget[data-widget]').forEach(node => {
    const factory = window.WikiWidgets[node.dataset.widget];
    if (factory && !node.dataset.mounted) { node.dataset.mounted = 'true'; node.innerHTML = ''; factory(node); }
  });
  if (document.readyState === 'complete') mount(); else addEventListener('load', mount);
})();
