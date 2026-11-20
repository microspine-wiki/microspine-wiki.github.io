/* Geometry of the compliant-stalk model. */
import {C, arc, arrow, circle, line, path, rect, spring, svg, text} from './lib.mjs';

export const file = 'stalk-model.svg';

export function render() {
  const W = 720, H = 400;
  const wx = 200; // wall face
  const tip = [wx, 84];
  const L0 = 190;
  const t0 = 32 * Math.PI / 180;
  const base0 = [tip[0] + L0 * Math.sin(t0), tip[1] + L0 * Math.cos(t0)];
  const dx = 44, dy = 84; // base moves toward the wall (preload) and down it (drag)
  const base1 = [base0[0] - dx, base0[1] + dy];
  const t1 = Math.atan2(base1[0] - tip[0], base1[1] - tip[1]);
  const down = Math.PI / 2;
  const block = ([x, y], fill) => rect(x - 7, y - 9, 36, 18, {fill, rx: 3});
  const onArc = (radius, angle) => [tip[0] + radius * Math.sin(angle), tip[1] + radius * Math.cos(angle)];
  const [a0x, a0y] = onArc(136, t0 * 0.74);
  const [a1x, a1y] = onArc(92, t1 * 0.46);

  const body = [
    // wall
    rect(wx - 62, 36, 62, 336, {fill: C.wall}),
    line(wx, 36, wx, 372, {stroke: C.wallEdge, width: 1.75, cap: 'butt'}),
    text(wx - 31, 360, 'wall', {size: 12, fill: C.ink2, anchor: 'middle'}),

    // at rest (ghost)
    line(tip[0], tip[1], base0[0], base0[1], {stroke: C.hair, width: 5}),
    block(base0, C.hair),
    text(base0[0] + 38, base0[1] - 8, 'at rest:', {size: 11.5, fill: C.ink2}),
    text(base0[0] + 38, base0[1] + 7, 'length *r*_{0}, angle *θ*_{0}', {size: 11.5, fill: C.ink2}),

    // angles, measured from the wall
    line(tip[0], tip[1], tip[0], tip[1] + 150, {stroke: C.ink2, width: 1, dash: '4 4'}),
    arc(tip[0], tip[1], 120, down - t0, down, {stroke: C.hair, width: 1.5}),
    text(a0x, a0y, '*θ*_{0}', {size: 13, fill: C.ink2, anchor: 'middle'}),
    arc(tip[0], tip[1], 74, down - t1, down, {stroke: C.ink}),
    text(a1x, a1y, '*θ*', {size: 13, anchor: 'middle'}),

    // loaded: axial spring along the stalk, torsion spring at the base
    spring(tip[0], tip[1], base1[0], base1[1], {stroke: C.ink, coils: 6, amp: 7, lead: 0.4, width: 2}),
    block(base1, C.ink),
    path(`M${base1[0] - 20} ${base1[1] - 6}A21 21 0 0 1 ${base1[0] - 2} ${base1[1] - 21}`, {stroke: C.orange, width: 2.5}),
    circle(tip[0], tip[1], 5, {fill: C.page, stroke: C.ink, width: 2}),
    circle(base1[0], base1[1], 4.5, {fill: C.page, stroke: C.ink, width: 2}),

    // how the base got there
    arrow(base0[0] + 12, base0[1] + 24, base1[0] + 12, base0[1] + 24, {stroke: C.blue, width: 1.75, head: 7}),
    text(base0[0] + 20, base0[1] + 28, '1  preload: toward the wall', {size: 11.5, fill: C.ink2}),
    arrow(base1[0] + 12, base0[1] + 32, base1[0] + 12, base1[1] - 14, {stroke: C.blue, width: 1.75, head: 7}),
    text(base1[0] + 20, base0[1] + 50, '2  drag: down the wall', {size: 11.5, fill: C.ink2}),
    text(base1[0] - 6, base1[1] + 30, 'base (the foot)', {size: 12}),

    // forces the wall applies to the tip
    arrow(tip[0], tip[1] - 8, tip[0], tip[1] - 56, {stroke: C.blue, width: 2.25, head: 9}),
    text(tip[0] + 10, tip[1] - 42, '*F*_{s}', {size: 13}),
    text(tip[0] + 32, tip[1] - 42, 'holds the spine up', {size: 12, fill: C.ink2}),
    arrow(tip[0] - 8, tip[1], tip[0] - 78, tip[1], {stroke: C.blue, width: 2.25, head: 9}),
    text(tip[0] - 86, tip[1] - 4, '−*F*_{n}', {size: 13, anchor: 'end'}),
    text(tip[0] - 86, tip[1] + 12, 'holds it in', {size: 12, fill: C.ink2, anchor: 'end'}),
    text(tip[0] + 14, tip[1] + 4, 'tip: a pin on its ledge', {size: 12}),

    // spring labels
    text(486, 136, '*k*_{r}', {size: 14, weight: 600}),
    text(486, 154, 'stretch along the stalk', {size: 12}),
    text(486, 170, 'carries the load; its travel lets', {size: 11.5, fill: C.ink2}),
    text(486, 184, 'spines that catch late catch up', {size: 11.5, fill: C.ink2}),
    line(480, 140, tip[0] + (base1[0] - tip[0]) * 0.42 + 11, tip[1] + (base1[1] - tip[1]) * 0.42, {stroke: C.ink2, width: 1}),

    text(486, 332, '*k*_{θ}', {size: 14, weight: 600}),
    text(486, 350, 'weak torsion spring at the base', {size: 12}),
    text(486, 366, 'presses the tip lightly on the wall', {size: 11.5, fill: C.ink2}),
    text(486, 380, 'so it can find a ledge', {size: 11.5, fill: C.ink2}),
    line(480, 336, base1[0] - 4, base1[1] - 26, {stroke: C.ink2, width: 1}),
  ];
  return svg(W, H, body, {
    title: 'The compliant-stalk model of a spine suspension',
    description: 'A stalk of rest length r-zero runs from a pin at the spine tip on the wall to a pin at the base, at angle theta-zero from the wall. A stiff spring k-r resists stretching along the stalk and a weak torsion spring k-theta at the base presses the tip toward the wall. Moving the base toward the wall and down it stretches and rotates the stalk, producing shear and adhesion at the tip.',
  });
}
