/* What "catching an asperity" means, and why tip size matters. */
import {C, arc, arrow, circle, line, panelTitle, polygon, polyline, svg, text, wedge} from './lib.mjs';

export const file = 'spine-asperity.svg';

const STEEL = '#48484a';

function wall(points, left) {
  const outline = [[left, points[0][1]], ...points, [left, points.at(-1)[1]]];
  return polygon(outline, {fill: C.wall}) + polyline(points, {stroke: C.wallEdge, width: 1.75});
}

/** A tapered spine ending in a round tip of radius r at (cx, cy); `tilt` is its angle from the wall. */
function spine(cx, cy, r, tilt, length, wide) {
  const ux = Math.sin(tilt), uy = -Math.cos(tilt); // from the tip up along the shaft
  const px = -uy, py = ux; // perpendicular
  const fx = cx + ux * length, fy = cy + uy * length;
  return polygon([
    [cx + px * r, cy + py * r], [fx + px * wide, fy + py * wide],
    [fx - px * wide, fy - py * wide], [cx - px * r, cy - py * r],
  ], {fill: STEEL}) + circle(cx, cy, r, {fill: STEEL});
}

export function render() {
  const W = 720, H = 336;

  /* ---- A: one tip on one ledge ------------------------------------------- */
  const profileA = [
    [130, 52], [126, 84], [132, 116], [128, 146], [130, 180], // wall face down to the ledge root
    [174, 170], [181, 178], [178, 198], [166, 216], [150, 234], [136, 252], [130, 278], [134, 300], [130, 316],
  ];
  // The ledge runs from its root (130,180) to its lip (174,170); its upward normal leans toward the wall.
  const dx = 44, dy = -10, len = Math.hypot(dx, dy);
  const nx = dy / len, ny = -dx / len;
  const r = 13;
  const tip = [130 + dx * 0.42 + nx * r, 180 + dy * 0.42 + ny * r];

  // Inset: which load directions the ledge can hold, drawn clear of the rock.
  const o = [300, 150];
  const down = Math.PI / 2; // screen angle of "straight down the wall"
  const thetaMax = 26 * Math.PI / 180;
  const thetaLoad = 11 * Math.PI / 180;
  const ray = (angle, length) => [o[0] + Math.sin(angle) * length, o[1] + Math.cos(angle) * length];

  const a = [
    panelTitle(24, 30, 'A', 'One tip on one ledge'),
    wall(profileA, 24),
    spine(tip[0], tip[1], r, 34 * Math.PI / 180, 118, 21),
    text(64, 100, 'wall', {size: 12, fill: C.ink2}),
    line(246, 74, 214, 88, {stroke: C.ink2, width: 1}),
    text(250, 76, 'spine', {size: 12, weight: 600}),
    line(tip[0] + 10, tip[1] + 2, 196, 138, {stroke: C.ink2, width: 1}),
    text(200, 142, 'tip, radius *r*_{s}', {size: 12}),
    text(40, 204, 'ledge', {size: 12, weight: 600}),
    text(40, 219, '(a usable', {size: 11.5, fill: C.ink2}),
    text(40, 233, 'asperity)', {size: 11.5, fill: C.ink2}),
    line(84, 200, 140, 179, {stroke: C.ink2, width: 1}),

    // the inset
    text(o[0] - 4, o[1] - 34, 'Load directions', {size: 12, weight: 600}),
    text(o[0] - 4, o[1] - 19, 'this ledge can hold', {size: 12, weight: 600}),
    wedge(o[0], o[1], 124, down - thetaMax, down, {fill: C.goodBg}),
    line(o[0], o[1], ...ray(0, 136), {stroke: C.ink2, width: 1, dash: '4 4'}),
    line(o[0], o[1], ...ray(thetaMax, 136), {stroke: C.good, width: 1.5}),
    arrow(o[0], o[1], ...ray(thetaLoad, 100), {stroke: C.blue, width: 2.25, head: 9}),
    arc(o[0], o[1], 58, down - thetaLoad, down, {stroke: C.blue}),
    circle(o[0], o[1], 4, {fill: STEEL}),
    text(o[0] - 8, o[1] + 62, '*θ*_{load}', {size: 12, anchor: 'end'}),
    text(o[0] + 26, o[1] + 106, '*F*', {size: 13, weight: 600}),
    text(o[0] + 60, o[1] + 126, '*θ*_{max}', {size: 12.5, fill: C.good}),
    text(o[0] - 8, o[1] + 150, 'down', {size: 11, fill: C.ink2, anchor: 'end'}),
    text(o[0] - 8, o[1] + 163, 'the wall', {size: 11, fill: C.ink2, anchor: 'end'}),
  ];

  /* ---- B: the same wall seen by two tip sizes ------------------------------- */
  const X = 480;
  const small = y => [[X, y - 16], [X, y], [X + 11, y - 3], [X + 13, y + 4], [X + 7, y + 12], [X, y + 18]];
  const profileB = [
    [X, 52], ...small(92), ...small(136), ...small(180),
    [X, 222], [X, 252], [X + 36, 245], [X + 41, 256], [X + 31, 280], [X + 10, 300], [X, 308], [X, 316],
  ];
  // Large tip seated on the big ledge (root (X,252) → lip (X+36,245)).
  const bl = Math.hypot(36, -7);
  const R = 25;
  const bc = [X + 36 * 0.9 + (-7 / bl) * R, 252 - 7 * 0.9 + (-36 / bl) * R];
  const b = [
    panelTitle(442, 30, 'B', 'The same wall, two tip sizes'),
    wall(profileB, 442),
    circle(X + 5.2, 92 - 7.2, 5.5, {fill: STEEL}),
    text(X + 28, 82, 'small tip', {size: 12, weight: 600}),
    text(X + 28, 97, 'seats on any small ledge', {size: 11.5, fill: C.ink2}),
    circle(X + 27.6, 158, 25, {stroke: C.ink2, width: 1.25, dash: '4 3'}),
    text(X + 64, 154, 'large tip', {size: 12, weight: 600}),
    text(X + 64, 169, 'rides over them …', {size: 11.5, fill: C.ink2}),
    circle(bc[0], bc[1], R, {fill: STEEL}),
    text(X + 64, 222, '… and holds only on', {size: 11.5, fill: C.ink2}),
    text(X + 64, 236, 'a ledge its own size', {size: 11.5, fill: C.ink2}),
  ];

  return svg(W, H, [line(424, 20, 424, H - 20, {stroke: C.fill, width: 1}), ...a, ...b], {
    title: 'A spine tip resting on a ledge, and how tip size limits which ledges it can use',
    description: 'Panel A: a spine tip of radius r-s rests on a ledge of a rough wall. The ledge holds any load that points down the wall and up to theta-max away from it. Panel B: a small tip seats on small ledges; a large tip rides over them and only holds on a ledge of its own size.',
  });
}
