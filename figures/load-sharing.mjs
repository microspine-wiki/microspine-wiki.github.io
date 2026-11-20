/* Why loading lines should be radial: three spines on one foot, two suspensions. */
import {C, arrow, circle, line, panelTitle, path, svg, text} from './lib.mjs';

export const file = 'load-sharing.svg';

function panel(ox, oy, {title, radial, notes}) {
  const R = 236;
  const limit = 21 * Math.PI / 180; // adhesion limit of this wall
  const at = (shear, adhesion) => [ox + shear, oy + adhesion];
  const [ex, ey] = [ox + R * Math.cos(limit), oy + R * Math.sin(limit)];
  const arcTop = ox + Math.sqrt(R * R - 30 * 30);
  const parts = [
    path(`M${ox} ${oy}L${ox} ${oy - 30}L${arcTop.toFixed(1)} ${oy - 30}A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}Z`, {fill: C.goodBg, stroke: ''}),
    line(ox, oy, ex, ey, {stroke: C.good, width: 1.5}),
    arrow(ox - 16, oy, ox + 272, oy, {stroke: C.ink2, width: 1.25}),
    arrow(ox, oy + 118, ox, oy - 44, {stroke: C.ink2, width: 1.25}),
    text(ox + 270, oy - 9, '*F*_{s}', {anchor: 'end', size: 13}),
    text(ox - 8, oy - 34, '*F*_{n}', {anchor: 'end', size: 13}),
    text(ex - 2, ey + 18, 'adhesion limit of this wall', {size: 11.5, fill: C.good, anchor: 'end'}),
  ];
  // Three spines that caught at different heights, so they are stretched by different amounts.
  const slope = Math.tan(15 * Math.PI / 180);
  const along = s => radial ? at(s, s * slope) : at(s, 22 + s * slope * 0.55);
  parts.push(line(...along(0), ...along(226), {stroke: C.blue, width: 2.25}));
  [80, 140, 200].forEach((s, i) => {
    const [x, y] = along(s);
    parts.push(line(ox, oy, x, y, {stroke: C.ink2, width: 1, dash: '3 3'}));
    const outside = Math.atan2(y - oy, x - ox) > limit;
    parts.push(circle(x, y, 6, {fill: outside ? C.bad : C.blue, stroke: C.page, width: 2}));
    parts.push(text(x + 7, y - 11, ['caught last', 'middle', 'caught first'][i], {size: 11, fill: C.ink2}));
  });
  parts.push(panelTitle(ox - 16, oy - 70, radial ? 'B' : 'A', title));
  notes.forEach((note, i) => parts.push(text(ox - 16, oy + 150 + i * 16, note, {size: 12, fill: C.ink2})));
  return parts.join('');
}

export function render() {
  const W = 720, H = 300;
  const body = [
    panel(54, 104, {
      title: 'Constant stiffness: one line, three angles', radial: false,
      notes: ['The spine that caught last is stretched least, pulls', 'at the steepest angle, and slips first (red).'],
    }),
    panel(416, 104, {
      title: 'Radial loading line: one angle for all', radial: true,
      notes: ['Every spine reaches the limit at the same moment,', 'whatever the limit of the wall happens to be.'],
    }),
    line(384, 24, 384, H - 16, {stroke: C.fill, width: 1}),
  ];
  return svg(W, H, body, {
    title: 'Load sharing between three spines for a constant-stiffness suspension and for a radial loading line',
    description: 'Two force-space panels with the same adhesion limit. With a constant-stiffness suspension the three spines lie on a straight line that misses the origin, so each pulls at a different angle and the least-stretched one falls outside the limit. With a radial loading line all three pull at the same angle and stay inside.',
  });
}
