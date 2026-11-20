/* Interactive explorer for the compliant-stalk model (wiki/design/stalk-model.md). */
(() => {
  const RAMP = ['#86b6ef', '#5598e7', '#2a78d6', '#184f95'];
  const PRELOADS = [0, 2, 4, 6]; // mm
  const INK = '#1d1d1f', INK2 = '#6e6e73', GRID = '#e8e8ed', AXIS = '#d2d2d7', GOOD = '#1a7f37', GOOD_BG = '#e5f4ea';
  const rad = degrees => degrees * Math.PI / 180;

  function tipForce(p, preloadMm, dragMm) {
    const r0 = p.r0 / 1000, theta0 = rad(p.theta0);
    const x = r0 * Math.sin(theta0) - preloadMm / 1000;
    if (x <= 0) return null; // the base would pass through the wall
    const y = r0 * Math.cos(Math.asin(x / r0)) + dragMm / 1000;
    const r = Math.hypot(x, y), theta = Math.atan2(x, y);
    const axial = p.kr * (r - r0);
    const lateral = p.ktheta * (theta0 + rad(p.thetap) - theta) / r;
    return {Fs: axial * Math.cos(theta) + lateral * Math.sin(theta), Fn: -axial * Math.sin(theta) + lateral * Math.cos(theta)};
  }

  const CONTROLS = [
    {key: 'theta0', label: 'Initial angle θ<sub>0</sub>', unit: '°', min: 5, max: 60, step: 1, value: 30},
    {key: 'r0', label: 'Stalk length r<sub>0</sub>', unit: ' mm', min: 15, max: 60, step: 1, value: 30},
    {key: 'kr', label: 'Axial stiffness k<sub>r</sub>', unit: ' N/m', min: 50, max: 400, step: 1, value: 191},
    {key: 'ktheta', label: 'Torsional stiffness k<sub>θ</sub>', unit: ' mN·m/rad', min: 0, max: 20, step: 0.1, value: 1.5, scale: 0.001},
    {key: 'thetap', label: 'Torsion preload θ<sub>p</sub>', unit: '°', min: 0, max: 10, step: 0.5, value: 3},
    {key: 'drag', label: 'Drag along the wall', unit: ' mm', min: 4, max: 12, step: 0.5, value: 8},
    {key: 'limit', label: 'Adhesion limit of the wall θ<sub>max</sub>', unit: '°', min: 5, max: 45, step: 1, value: 20},
  ];

  window.WikiWidgets = window.WikiWidgets || {};
  window.WikiWidgets['stalk-model'] = root => {
    const state = Object.fromEntries(CONTROLS.map(c => [c.key, c.value]));
    const el = (name, props = {}, parent) => {
      const node = Object.assign(document.createElement(name), props);
      if (parent) parent.append(node);
      return node;
    };
    el('h4', {textContent: 'Stalk model explorer'}, root);
    const controls = el('div', {className: 'controls'}, root);
    const plot = el('div', {className: 'plot'}, root);
    const readout = el('div', {className: 'readout'}, root);
    const details = el('details', {}, root);
    el('summary', {textContent: 'Values at the end of each line (table)'}, details);
    const table = el('table', {}, details);
    const note = el('p', {className: 'note'}, root);

    for (const control of CONTROLS) {
      const label = el('label', {}, controls);
      const value = el('b', {}, label);
      label.insertAdjacentHTML('beforeend', control.label); // static markup: <sub> only
      const input = el('input', {type: 'range', min: control.min, max: control.max, step: control.step, value: control.value}, label);
      input.setAttribute('aria-label', control.label.replace(/<[^>]+>/g, ''));
      const show = () => { value.textContent = `${Number(input.value)}${control.unit}`; };
      input.addEventListener('input', () => { state[control.key] = Number(input.value); show(); draw(); });
      show();
    }
    const reset = el('button', {type: 'button', textContent: 'Reset to the RiSE toe'}, controls);
    reset.style.cssText = 'align-self:end;height:30px;padding:0 12px;border-radius:999px;border:1px solid #6e6e73;background:none;font:500 12px/1 inherit;';
    reset.addEventListener('click', () => {
      controls.querySelectorAll('input').forEach((input, i) => { input.value = CONTROLS[i].value; input.dispatchEvent(new Event('input')); });
    });

    function draw() {
      const p = {...state, ktheta: state.ktheta * 0.001};
      const lines = PRELOADS.map(preload => {
        const points = [];
        for (let i = 0; i <= 40; i += 1) {
          const drag = state.drag * i / 40;
          const force = tipForce(p, preload, drag);
          if (!force) return null;
          points.push({drag, ...force});
        }
        return {preload, points};
      });
      const valid = lines.filter(Boolean);
      const all = valid.flatMap(line => line.points);
      const nice = value => { const step = value > 2 ? 0.5 : value > 1 ? 0.4 : 0.2; return Math.ceil(value / step) * step; };
      const xMax = nice(Math.max(0.4, ...all.map(q => q.Fs)) * 1.05);
      const yMin = -nice(Math.max(0.2, ...all.map(q => -q.Fn)) * 1.05);
      const yMax = Math.max(0.1, nice(Math.max(0, ...all.map(q => q.Fn))));
      const W = 720, H = 360, x0 = 62, y0 = 18, w = 630, h = 290;
      const xs = v => x0 + v / xMax * w;
      const ys = v => y0 + (yMax - v) / (yMax - yMin) * h;
      const f = v => v.toFixed(1);
      let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Loading lines of the stalk model in force space">`;
      // safe region for the chosen adhesion limit
      const slope = Math.tan(rad(state.limit));
      const xr = Math.min(xMax, -yMin / slope);
      svg += `<path d="M${f(xs(0))} ${f(ys(0))}L${f(xs(xMax))} ${f(ys(0))}L${f(xs(xMax))} ${f(ys(Math.max(yMin, -xMax * slope)))}L${f(xs(xr))} ${f(ys(-xr * slope))}Z" fill="${GOOD_BG}"/>`;
      svg += `<path d="M${f(xs(0))} ${f(ys(0))}L${f(xs(xr))} ${f(ys(-xr * slope))}" stroke="${GOOD}" stroke-width="1.5" fill="none"/>`;
      const xStep = xMax > 2 ? 0.5 : 0.2, yStep = -yMin > 1 ? 0.4 : 0.2;
      for (let v = 0; v <= xMax + 1e-9; v += xStep) {
        svg += `<line x1="${f(xs(v))}" y1="${y0}" x2="${f(xs(v))}" y2="${y0 + h}" stroke="${GRID}"/><text x="${f(xs(v))}" y="${y0 + h + 17}" font-size="11.5" fill="${INK2}" text-anchor="middle">${v.toFixed(1)}</text>`;
      }
      for (let v = yMax; v >= yMin - 1e-9; v -= yStep) {
        const value = Math.abs(v) < 1e-9 ? 0 : v;
        svg += `<line x1="${x0}" y1="${f(ys(value))}" x2="${x0 + w}" y2="${f(ys(value))}" stroke="${value === 0 ? AXIS : GRID}" stroke-width="${value === 0 ? 1.25 : 1}"/><text x="${x0 - 8}" y="${f(ys(value) + 4)}" font-size="11.5" fill="${INK2}" text-anchor="end">${value.toFixed(1).replace('-', '−')}</text>`;
      }
      svg += `<text x="${x0 + w / 2}" y="${H - 6}" font-size="12" fill="${INK2}" text-anchor="middle">shear Fs (N)</text>`;
      svg += `<text x="16" y="${y0 + h / 2}" font-size="12" fill="${INK2}" text-anchor="middle" transform="rotate(-90 16 ${y0 + h / 2})">normal Fn (N)</text>`;
      svg += `<text x="${f(xs(xr) - 6)}" y="${f(ys(-xr * slope) - 8)}" font-size="11.5" fill="${GOOD}" text-anchor="end">θmax = ${state.limit}°</text>`;
      lines.forEach((line, i) => {
        if (!line) return;
        const d = line.points.map((q, k) => `${k ? 'L' : 'M'}${f(xs(q.Fs))} ${f(ys(q.Fn))}`).join('');
        const end = line.points.at(-1);
        svg += `<path d="${d}" fill="none" stroke="${RAMP[i]}" stroke-width="2.25" stroke-linecap="round"/>`;
        svg += `<circle cx="${f(xs(end.Fs))}" cy="${f(ys(end.Fn))}" r="4.5" fill="${RAMP[i]}" stroke="#fff" stroke-width="2"/>`;
        svg += `<text x="${f(xs(end.Fs) + 9)}" y="${f(ys(end.Fn) + 4)}" font-size="11.5" fill="${INK}">${line.preload} mm</text>`;
      });
      svg += `<g class="hover" visibility="hidden"><circle r="6" fill="none" stroke="${INK}" stroke-width="1.5"/><rect rx="6" fill="#fff" stroke="${AXIS}"/><text font-size="11.5" fill="${INK}"></text></g>`;
      svg += '</svg>';
      plot.innerHTML = svg;

      // hover: snap to the nearest computed point on any line
      const svgNode = plot.firstChild;
      const hover = svgNode.querySelector('.hover');
      const [ring, box, label] = hover.children;
      svgNode.addEventListener('pointermove', event => {
        const bounds = svgNode.getBoundingClientRect();
        const px = (event.clientX - bounds.left) * W / bounds.width;
        const py = (event.clientY - bounds.top) * H / bounds.height;
        let best = null;
        for (const line of valid) for (const q of line.points) {
          const distance = Math.hypot(xs(q.Fs) - px, ys(q.Fn) - py);
          if (!best || distance < best.distance) best = {distance, q, line};
        }
        if (!best || best.distance > 60) { hover.setAttribute('visibility', 'hidden'); return; }
        const {q, line} = best;
        const cx = xs(q.Fs), cy = ys(q.Fn);
        ring.setAttribute('cx', cx); ring.setAttribute('cy', cy);
        const angle = Math.atan2(-q.Fn, q.Fs) * 180 / Math.PI;
        label.textContent = `Fs ${q.Fs.toFixed(2)} N · Fn ${q.Fn.toFixed(2).replace('-', '−')} N · ${angle.toFixed(1)}° · preload ${line.preload} mm, drag ${q.drag.toFixed(1)} mm`;
        const width = label.getComputedTextLength() + 16;
        const tx = Math.min(Math.max(cx - width / 2, x0), x0 + w - width), ty = cy > y0 + 44 ? cy - 36 : cy + 14;
        box.setAttribute('x', tx); box.setAttribute('y', ty); box.setAttribute('width', width); box.setAttribute('height', 22);
        label.setAttribute('x', tx + 8); label.setAttribute('y', ty + 15);
        hover.setAttribute('visibility', 'visible');
      });
      svgNode.addEventListener('pointerleave', () => hover.setAttribute('visibility', 'hidden'));

      // readouts
      const ends = valid.map(line => ({preload: line.preload, ...line.points.at(-1), spring: line.points[0].Fn}));
      const angles = ends.map(e => Math.atan2(-e.Fn, e.Fs) * 180 / Math.PI);
      const outside = angles.filter(a => a > state.limit).length;
      const epsilon = p.ktheta / ((state.r0 / 1000) ** 2 * state.kr);
      const springs = ends.map(e => e.spring * 1000);
      readout.replaceChildren();
      const tile = (caption, value, bad) => {
        const box = el('div', {}, readout);
        el('small', {innerHTML: caption}, box); // captions are static strings below
        const strong = el('strong', {textContent: value}, box);
        if (bad) strong.className = 'bad';
      };
      tile('Angle of pull at full drag', `${Math.min(...angles).toFixed(1)}° to ${Math.max(...angles).toFixed(1)}°`, outside > 0);
      tile('Force at full drag', `${Math.min(...ends.map(e => Math.hypot(e.Fs, e.Fn))).toFixed(2)} to ${Math.max(...ends.map(e => Math.hypot(e.Fs, e.Fn))).toFixed(2)} N`);
      tile('Spring-back force of a freed spine', `${Math.min(...springs).toFixed(1)} to ${Math.max(...springs).toFixed(1)} mN`, Math.min(...springs) <= 0);
      tile('Stiffness ratio ε = k<sub>θ</sub> / (r<sub>0</sub><sup>2</sup> k<sub>r</sub>)', epsilon.toFixed(4), epsilon > 0.1);

      table.replaceChildren();
      const head = el('tr', {}, table);
      ['Preload', 'Fs (N)', 'Fn (N)', 'Angle', 'Spring-back (mN)'].forEach(text => el('th', {textContent: text}, head));
      ends.forEach((e, i) => {
        const row = el('tr', {}, table);
        [`${e.preload} mm`, e.Fs.toFixed(2), e.Fn.toFixed(2).replace('-', '−'), `${angles[i].toFixed(1)}°`, (e.spring * 1000).toFixed(1)].forEach(text => el('td', {textContent: text}, row));
      });

      const skipped = lines.length - valid.length;
      note.textContent = (outside ? `${outside} of ${valid.length} lines end beyond the wall's adhesion limit: at those preloads, fully stretched spines would have slid off. ` : 'All lines end inside the safe region. ')
        + (skipped ? `${skipped} preload depth${skipped > 1 ? 's are' : ' is'} not drawn because the base would reach the wall. ` : '')
        + 'Each line is one preload depth; forces are per spine.';
    }
    draw();
  };
})();
