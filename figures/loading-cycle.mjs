/* One attach–load–release cycle, in space (left) and in force space (right). */
import {C, arrow, circle, line, panelTitle, path, polygon, polyline, rect, spring, svg, text} from './lib.mjs';

export const file = 'loading-cycle.svg';

const badge = (x, y, n, o = {}) => circle(x, y, 9.5, {fill: o.fill ?? C.ink}) + text(x, y + 4, String(n), {size: 11.5, weight: 600, fill: C.page, anchor: 'middle'});

export function render() {
  const W = 720, H = 372;

  /* ---- A: the foot moves, the tip stays ------------------------------------ */
  const wx = 96; // wall face
  const profile = [[wx, 46], [wx - 3, 90], [wx + 2, 130], [wx, 168], [wx + 16, 164], [wx + 19, 170], [wx + 12, 190], [wx, 206], [wx - 2, 250], [wx + 2, 300], [wx, 348]];
  const ledge = [wx + 5, 161]; // where the tip ends up
  const base = {approach: [258, 96], touch: [206, 148], catch: [206, 246], loaded: [206, 322]};
  const tipAtTouch = [wx + 6, 74];
  const toe = (from, to, color, width = 1.6) => spring(from[0], from[1], to[0], to[1], {stroke: color, coils: 6, amp: 4.5, lead: 0.3, width})
    + circle(from[0], from[1], 3.4, {fill: color});
  const foot = ([x, y], fill) => rect(x - 9, y - 8, 31, 16, {fill, rx: 3});
  const a = [
    panelTitle(24, 30, 'A', 'What the foot does'),
    polygon([[24, 46], ...profile, [24, 348]], {fill: C.wall}),
    polyline(profile, {stroke: C.wallEdge, width: 1.75}),
    polyline([base.approach, base.touch, base.loaded], {stroke: C.fill, width: 6}),
    arrow(base.approach[0], base.approach[1], base.touch[0] + 8, base.touch[1] - 8, {stroke: C.ink2, width: 1.25, head: 7}),
    arrow(base.touch[0] + 6, base.touch[1] + 16, base.touch[0] + 6, base.catch[1] - 16, {stroke: C.ink2, width: 1.25, head: 7}),
    toe(tipAtTouch, base.touch, C.hair),
    toe(ledge, base.catch, C.ink2),
    toe(ledge, base.loaded, C.ink, 2),
    foot(base.touch, C.hair), foot(base.catch, C.ink2), foot(base.loaded, C.ink),
    badge(280, 82, 1), text(296, 86, 'approach', {size: 12}),
    badge(252, 148, 2), text(268, 144, 'touch, then drag', {size: 12}), text(268, 159, 'lightly down the wall', {size: 11.5, fill: C.ink2}),
    badge(252, 246, 3), text(268, 242, 'tip catches a ledge;', {size: 12}), text(268, 257, 'the foot keeps moving', {size: 11.5, fill: C.ink2}),
    badge(252, 322, 4), text(268, 318, 'suspension stretches', {size: 12}), text(268, 333, 'and takes the load', {size: 11.5, fill: C.ink2}),
    text(40, 300, 'wall', {size: 12, fill: C.ink2}),
  ];

  /* ---- B: the same cycle in force space --------------------------------------- */
  const ox = 470, oy = 108;
  const R = 222;
  const thetaMax = 30 * Math.PI / 180;
  const at = (magnitude, angle) => [ox + magnitude * Math.cos(angle), oy + magnitude * Math.sin(angle)];
  const top = 60;
  const arcTop = ox + Math.sqrt(R * R - (oy - top) ** 2);
  const [ex, ey] = at(R, thetaMax);
  const p2 = [ox + 4, oy - 12];
  const p4 = at(124, 0.2);
  const p5 = [p4[0], oy + (p4[0] - ox) * Math.tan(thetaMax)]; // straight out from the wall to the limit
  const p6 = at(R, 0.15);
  const b = [
    panelTitle(432, 30, 'B', 'The same cycle in force space'),
    path(`M${ox} ${oy}L${ox - 12} ${top}L${arcTop.toFixed(1)} ${top}A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}Z`, {fill: C.goodBg, stroke: ''}),
    arrow(ox - 34, oy, 708, oy, {stroke: C.ink2, width: 1.25}),
    arrow(ox, 318, ox, 50, {stroke: C.ink2, width: 1.25}),
    text(706, oy - 9, '*F*_{s}', {anchor: 'end', size: 13}),
    text(ox - 8, 60, '*F*_{n}', {anchor: 'end', size: 13}),
    text(ox - 8, 312, 'adhesion', {anchor: 'end', size: 11.5, fill: C.ink2}),
    text(606, 76, 'safe region', {size: 12, fill: C.good, weight: 600}),
    // release back to the origin
    path(`M${(p4[0] - 6).toFixed(1)} ${(p4[1] - 8).toFixed(1)}Q${ox + 60} ${oy - 16} ${ox + 16} ${oy - 5}`, {stroke: C.ink2, width: 1.25, dash: '4 3'}),
    text(ox + 20, oy - 30, 'relax to let go', {size: 11.5, fill: C.ink2}),
    // 2/3 → 4: the loading curve
    path(`M${p2[0]} ${p2[1]}Q${ox + 62} ${oy + 2} ${p4[0].toFixed(1)} ${p4[1].toFixed(1)}`, {stroke: C.blue, width: 2.25}),
    // 4 → 6: keep pulling along the wall
    arrow(p4[0], p4[1], p6[0], p6[1], {stroke: C.blue, width: 2.25, head: 8}),
    // 4 → 5: pull the foot away from the wall
    arrow(p4[0], p4[1], p5[0], p5[1] - 2, {stroke: C.orange, width: 2.25, head: 8}),
    badge(ox - 15, oy + 15, 1), badge(p2[0] + 6, p2[1] - 15, 2), badge(ox + 50, oy + 24, 3), badge(p4[0] + 4, p4[1] - 17, 4),
    badge(p5[0] - 17, p5[1] + 2, 5, {fill: C.orange}), badge(p6[0] - 2, p6[1] + 20, 6),
    text(p5[0] - 16, p5[1] + 62, 'foot pulled away from the wall:', {size: 11.5, fill: C.ink2, anchor: 'middle'}),
    text(p5[0] - 16, p5[1] + 76, 'the tip slides off at the adhesion limit', {size: 11.5, fill: C.ink2, anchor: 'middle'}),
    line(p5[0] - 22, p5[1] + 12, p5[0] - 16, p5[1] + 48, {stroke: C.ink2, width: 1}),
    text(706, p6[1] + 50, 'pulled too hard:', {size: 11.5, fill: C.ink2, anchor: 'end'}),
    text(706, p6[1] + 64, 'overload stop', {size: 11.5, fill: C.ink2, anchor: 'end'}),
    text(706, p6[1] + 78, 'lets go', {size: 11.5, fill: C.ink2, anchor: 'end'}),
  ];

  return svg(W, H, [line(412, 20, 412, H - 20, {stroke: C.fill, width: 1}), ...a, ...b], {
    title: 'A spine attaching, loading and releasing, shown in space and in force space',
    description: 'Left: a foot approaches the wall, drags its spine down until the tip catches a ledge, and keeps moving so the suspension stretches. Right: the tip force leaves the origin, grows along a loading curve inside the safe region, and then either hits the adhesion limit if the foot is pulled away from the wall or the strength limit if it is pulled too hard. Relaxing the load returns to the origin.',
  });
}
