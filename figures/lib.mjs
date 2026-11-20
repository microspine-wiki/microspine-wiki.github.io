/* Small SVG toolkit for the wiki's original figures.

   Every figure is a function that returns an SVG string. Figures are drawn on
   a white plate at 720 units wide, the width of the article column, so text
   set at 12-13 units reads at its natural size. Only presentation attributes
   are used (no <style>, no scripts), so the files render the same on the
   site, on GitHub and in Obsidian. */

export const C = {
  page: '#ffffff', band: '#f5f5f7', fill: '#e8e8ed', hair: '#d2d2d7',
  ink: '#1d1d1f', ink2: '#6e6e73',
  // Series colours: validated together for colour-vision deficiency against a
  // white surface (see figures/README.md). Assign in this order; do not add hues.
  blue: '#0071e3', orange: '#eb6834', aqua: '#1baf7a', violet: '#6250d6',
  // One-hue ramp for ordered series (light → dark = small → large), validated as an
  // ordinal ramp on white: every step is distinguishable and the lightest clears 2:1.
  ramp: ['#86b6ef', '#5598e7', '#2a78d6', '#184f95'],
  // Meaning-carrying tints, always paired with a text label.
  good: '#1a7f37', goodBg: '#e5f4ea', bad: '#c0001a', badBg: '#fde7ea', warn: '#9a5200', warnBg: '#fff3dc',
  wall: '#e8e8ed', wallEdge: '#8e8e93',
};

export const FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const num = value => Number(value.toFixed(2));
const attrs = object => Object.entries(object)
  .filter(([, value]) => value !== undefined && value !== null && value !== false)
  .map(([key, value]) => ` ${key}="${typeof value === 'number' ? num(value) : esc(value)}"`).join('');

export const el = (name, attributes = {}, body) =>
  body === undefined ? `<${name}${attrs(attributes)}/>` : `<${name}${attrs(attributes)}>${body}</${name}>`;

export const group = (body, attributes = {}) => el('g', attributes, Array.isArray(body) ? body.join('') : body);
export const line = (x1, y1, x2, y2, o = {}) =>
  el('line', {x1, y1, x2, y2, stroke: o.stroke ?? C.ink, 'stroke-width': o.width ?? 1.5, 'stroke-linecap': o.cap ?? 'round', 'stroke-dasharray': o.dash, opacity: o.opacity});
export const rect = (x, y, width, height, o = {}) =>
  el('rect', {x, y, width, height, rx: o.rx, fill: o.fill ?? 'none', stroke: o.stroke, 'stroke-width': o.stroke ? (o.width ?? 1.5) : undefined, opacity: o.opacity});
export const circle = (cx, cy, r, o = {}) =>
  el('circle', {cx, cy, r, fill: o.fill ?? 'none', stroke: o.stroke, 'stroke-width': o.stroke ? (o.width ?? 1.5) : undefined, 'stroke-dasharray': o.dash, opacity: o.opacity});
export const path = (d, o = {}) =>
  el('path', {d, fill: o.fill ?? 'none', stroke: o.stroke === undefined ? C.ink : o.stroke || undefined, 'stroke-width': o.width ?? 1.5, 'stroke-linecap': o.cap ?? 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash, opacity: o.opacity, 'fill-opacity': o.fillOpacity});
export const polygon = (points, o = {}) =>
  el('polygon', {points: points.map(([x, y]) => `${num(x)},${num(y)}`).join(' '), fill: o.fill ?? C.ink, stroke: o.stroke, 'stroke-width': o.stroke ? (o.width ?? 1.5) : undefined, 'stroke-linejoin': 'round', opacity: o.opacity, 'fill-opacity': o.fillOpacity});
export const polyline = (points, o = {}) =>
  path(points.map(([x, y], i) => `${i ? 'L' : 'M'}${num(x)} ${num(y)}`).join(''), o);

/** Text with light markup: _{sub}, ^{sup}, and *italic* runs for variables. */
export function text(x, y, content, o = {}) {
  const size = o.size ?? 12.5;
  let out = '';
  let dy = 0; // running baseline offset, so shifts are undone after each run
  const pattern = /_\{([^}]*)\}|\^\{([^}]*)\}|\*([^*]+)\*|([^_^*]+|[_^*])/g;
  for (const [, sub, sup, italic, plain] of String(content).matchAll(pattern)) {
    if (sub !== undefined || sup !== undefined) {
      const shift = sub !== undefined ? size * 0.28 : -size * 0.38;
      out += `<tspan dy="${num(shift - dy)}" font-size="${num(size * 0.72)}">${esc(sub ?? sup)}</tspan>`;
      dy = shift;
    } else {
      const reset = dy ? ` dy="${num(-dy)}"` : '';
      dy = 0;
      out += italic !== undefined ? `<tspan${reset} font-style="italic">${esc(italic)}</tspan>` : `<tspan${reset}>${esc(plain)}</tspan>`;
    }
  }
  return el('text', {
    x, y, 'font-family': FONT, 'font-size': size, 'font-weight': o.weight, fill: o.fill ?? C.ink,
    'text-anchor': o.anchor, transform: o.rotate ? `rotate(${o.rotate} ${num(x)} ${num(y)})` : undefined,
    'letter-spacing': o.spacing,
  }, out);
}

/** A straight arrow with a solid head, drawn as geometry so it renders everywhere. */
export function arrow(x1, y1, x2, y2, o = {}) {
  const color = o.stroke ?? C.ink;
  const width = o.width ?? 1.75;
  const head = o.head ?? 8;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const tip = (px, py, a) => polygon([
    [px, py],
    [px - head * Math.cos(a - 0.38), py - head * Math.sin(a - 0.38)],
    [px - head * Math.cos(a + 0.38), py - head * Math.sin(a + 0.38)],
  ], {fill: color});
  const back = head * 0.7;
  const sx = o.both ? x1 + back * Math.cos(angle) : x1;
  const sy = o.both ? y1 + back * Math.sin(angle) : y1;
  return line(sx, sy, x2 - back * Math.cos(angle), y2 - back * Math.sin(angle), {stroke: color, width, dash: o.dash, cap: 'butt'})
    + tip(x2, y2, angle) + (o.both ? tip(x1, y1, angle + Math.PI) : '');
}

/** Arc for an angle mark, from angle a0 to a1 (radians, screen coordinates). */
export function arc(cx, cy, r, a0, a1, o = {}) {
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return path(`M${num(x0)} ${num(y0)}A${r} ${r} 0 ${large} ${sweep} ${num(x1)} ${num(y1)}`, {stroke: o.stroke ?? C.ink2, width: o.width ?? 1.2, dash: o.dash});
}

/** A filled wedge between two angles, for cones and regions. */
export function wedge(cx, cy, r, a0, a1, o = {}) {
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const sweep = a1 > a0 ? 1 : 0;
  return path(`M${num(cx)} ${num(cy)}L${num(x0)} ${num(y0)}A${r} ${r} 0 0 ${sweep} ${num(x1)} ${num(y1)}Z`, {fill: o.fill ?? C.band, stroke: o.stroke ?? '', fillOpacity: o.fillOpacity});
}

/** A coil spring between two points. */
export function spring(x1, y1, x2, y2, o = {}) {
  const coils = o.coils ?? 5;
  const amp = o.amp ?? 5;
  const lead = o.lead ?? 0.18;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const ux = dx / length, uy = dy / length;
  const nx = -uy, ny = ux;
  const points = [[x1, y1], [x1 + dx * lead, y1 + dy * lead]];
  const steps = coils * 2;
  for (let i = 0; i < steps; i += 1) {
    const t = lead + (1 - 2 * lead) * (i + 0.5) / steps;
    const side = i % 2 ? -1 : 1;
    points.push([x1 + dx * t + nx * amp * side, y1 + dy * t + ny * amp * side]);
  }
  points.push([x1 + dx * (1 - lead), y1 + dy * (1 - lead)], [x2, y2]);
  return polyline(points, {stroke: o.stroke ?? C.ink, width: o.width ?? 1.5});
}

/** Deterministic pseudo-random numbers, so figures rebuild identically. */
export function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Small panel letter + title, e.g. "A  One spine on one ledge". */
export function panelTitle(x, y, letter, title) {
  return text(x, y, letter, {weight: 600, size: 13}) + text(x + 18, y, title, {weight: 600, size: 13});
}

/** Legend key: a short stroke or swatch followed by a label in text colour. */
export function key(x, y, color, label, o = {}) {
  const mark = o.swatch
    ? rect(x, y - 9, 12, 12, {fill: color, rx: 3, opacity: o.opacity})
    : line(x, y - 4, x + 16, y - 4, {stroke: color, width: o.width ?? 2, dash: o.dash});
  return mark + text(x + (o.swatch ? 18 : 22), y, label, {size: 12, fill: C.ink2});
}

export function svg(width, height, body, {title, description} = {}) {
  const content = Array.isArray(body) ? body.join('') : body;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img"${title ? ' aria-labelledby="t"' : ''}>`
    + (title ? `<title id="t">${esc(title)}</title>` : '')
    + (description ? `<desc>${esc(description)}</desc>` : '')
    + rect(0, 0, width, height, {fill: C.page})
    + content
    + '</svg>\n';
}

/* ---- charts ---------------------------------------------------------------- */

/** Linear scale helper: returns a function mapping data to pixels. */
export const scale = (d0, d1, p0, p1) => value => p0 + (value - d0) * (p1 - p0) / (d1 - d0);

/** Axes frame with hairline grid, tick labels and axis titles. */
export function axes({x, y, width, height, xTicks, yTicks, xScale, yScale, xLabel, yLabel, xFormat = String, yFormat = String, zeroX, zeroY}) {
  const parts = [];
  for (const tick of yTicks) parts.push(line(x, yScale(tick), x + width, yScale(tick), {stroke: C.fill, width: 1, cap: 'butt'}));
  for (const tick of xTicks) parts.push(line(xScale(tick), y, xScale(tick), y + height, {stroke: C.fill, width: 1, cap: 'butt'}));
  if (zeroY !== undefined) parts.push(line(x, yScale(zeroY), x + width, yScale(zeroY), {stroke: C.hair, width: 1.25, cap: 'butt'}));
  if (zeroX !== undefined) parts.push(line(xScale(zeroX), y, xScale(zeroX), y + height, {stroke: C.hair, width: 1.25, cap: 'butt'}));
  for (const tick of yTicks) parts.push(text(x - 8, yScale(tick) + 4, yFormat(tick), {size: 11.5, fill: C.ink2, anchor: 'end'}));
  for (const tick of xTicks) parts.push(text(xScale(tick), y + height + 17, xFormat(tick), {size: 11.5, fill: C.ink2, anchor: 'middle'}));
  if (xLabel) parts.push(text(x + width / 2, y + height + 38, xLabel, {size: 12, fill: C.ink2, anchor: 'middle'}));
  if (yLabel) parts.push(text(x - 44, y + height / 2, yLabel, {size: 12, fill: C.ink2, anchor: 'middle', rotate: -90}));
  return parts.join('');
}
