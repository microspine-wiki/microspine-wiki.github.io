/* Why the lower rows of a rigid multi-row paddle let go, and what keeps them on. */
import {C, arrow, circle, line, panelTitle, path, polygon, rect, svg, text} from './lib.mjs';

export const file = 'paddle-rows.svg';

const STEEL = '#48484a';

/** A rigid plate with five rows of toes, hinged about its top row by `tilt` radians. */
function paddle(face, topY, tilt) {
  const ax = [Math.sin(tilt), Math.cos(tilt)];
  const out = [Math.cos(tilt), -Math.sin(tilt)];
  const at = (s, o) => [face + 18 + ax[0] * s + out[0] * o, topY + ax[1] * s + out[1] * o];
  const parts = [polygon([at(-12, 0), at(172, 0), at(172, 12), at(-12, 12)], {fill: STEEL})];
  const rows = [];
  for (let i = 0; i < 5; i += 1) {
    const root = at(8 + i * 36, 0);
    const reach = [root[0] - 23, root[1] + 12]; // toe reaches toward the wall and down; it can give a few px
    const tip = [Math.max(reach[0], face + 1), reach[1]];
    const engaged = reach[0] <= face + 1;
    parts.push(line(root[0], root[1], tip[0], tip[1], {stroke: engaged ? C.blue : C.ink2, width: 2.5}));
    parts.push(circle(tip[0], tip[1], 3.4, {fill: engaged ? C.blue : C.page, stroke: engaged ? C.blue : C.ink2, width: 1.5}));
    rows.push({tip, engaged});
  }
  return {svg: parts.join(''), at, rows};
}

export function render() {
  const W = 720, H = 372;
  const wallA = 96, wallB = 456;
  const wall = face => rect(face - 56, 52, 56, 282, {fill: C.wall}) + line(face, 52, face, 334, {stroke: C.wallEdge, width: 1.75, cap: 'butt'});

  /* ---- A: load taken on a handle that stands off the wall -------------------- */
  const a = paddle(wallA, 92, 5 * Math.PI / 180);
  const gripA = a.at(206, 62);
  const partsA = [
    panelTitle(24, 30, 'A', 'Rigid backing, load on a handle'),
    wall(wallA), a.svg,
    line(...a.at(150, 12), ...gripA, {stroke: STEEL, width: 5}),
    circle(...gripA, 6, {fill: C.page, stroke: C.ink, width: 2}),
    arrow(gripA[0], gripA[1] + 8, gripA[0] + 22, gripA[1] + 70, {stroke: C.ink, width: 2.5, head: 10}),
    text(gripA[0] + 28, gripA[1] + 40, 'load', {size: 12.5, weight: 600}),
    text(gripA[0] + 28, gripA[1] + 55, 'down and outward', {size: 11.5, fill: C.ink2}),
    path(`M${wallA + 86} 116A64 64 0 0 1 ${wallA + 104} 196`, {stroke: C.orange, width: 2}),
    polygon([[wallA + 104, 196], [wallA + 96, 186], [wallA + 109, 185]], {fill: C.orange}),
    text(wallA + 116, 150, 'the paddle turns', {size: 11.5, fill: C.ink2}),
    text(wallA + 116, 164, 'about its top rows', {size: 11.5, fill: C.ink2}),
    text(wallA + 64, 100, 'top rows pressed in', {size: 11.5, fill: C.ink2}),
    line(wallA + 60, 100, wallA + 12, 106, {stroke: C.ink2, width: 1}),
    text(wallA + 96, 236, 'bottom rows lift off:', {size: 12, fill: C.bad}),
    text(wallA + 96, 251, 'fewer spines carry the load', {size: 12, fill: C.bad}),
    line(wallA + 92, 240, a.rows[4].tip[0] + 8, a.rows[4].tip[1], {stroke: C.bad, width: 1}),
  ];

  /* ---- B: load line kept close to the wall --------------------------------------- */
  const b = paddle(wallB, 92, 0);
  const anchor = b.at(172, 6);
  const partsB = [
    panelTitle(384, 30, 'B', 'Load line kept close to the wall'),
    wall(wallB), b.svg,
    line(anchor[0], anchor[1], anchor[0] + 3, 300, {stroke: C.ink, width: 2}),
    arrow(anchor[0] + 3, 300, anchor[0] + 4, 338, {stroke: C.ink, width: 2.5, head: 10}),
    text(anchor[0] + 16, 320, 'load, nearly parallel to the wall', {size: 12.5, weight: 600}),
    text(anchor[0] + 16, 335, '(a long tether to the foot)', {size: 11.5, fill: C.ink2}),
    text(wallB + 64, 136, 'all rows stay on the wall', {size: 12, fill: C.ink}),
    text(wallB + 64, 164, 'Also helps: a compliant joint', {size: 11.5, fill: C.ink2}),
    text(wallB + 64, 178, 'between rows and handle, rows that', {size: 11.5, fill: C.ink2}),
    text(wallB + 64, 192, 'float separately, wider and shorter', {size: 11.5, fill: C.ink2}),
    text(wallB + 64, 206, 'patches', {size: 11.5, fill: C.ink2}),
  ];

  return svg(W, H, [line(368, 20, 368, H - 16, {stroke: C.fill, width: 1}), ...partsA, ...partsB], {
    title: 'Why the lower rows of a rigid spine paddle disengage',
    description: 'Panel A: a rigid plate with five rows of spines is loaded through a handle that stands off the wall. The outward component of the load turns the plate about its top rows, so the bottom rows lift off. Panel B: with the load applied nearly parallel to the wall through a long tether, all rows stay engaged.',
  });
}
