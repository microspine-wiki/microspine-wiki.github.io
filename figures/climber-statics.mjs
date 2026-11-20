/* Statics of a limbed climber on a vertical wall, and the cone that limits its hands. */
import {C, arc, arrow, circle, line, panelTitle, path, rect, svg, text, wedge} from './lib.mjs';

export const file = 'climber-statics.svg';

export function render() {
  const W = 720, H = 396;
  const face = 132;
  const hand = [face, 96], foot = [face, 318];
  const com = [236, 214];

  const a = [
    panelTitle(24, 30, 'A', 'Forces on the climber'),
    rect(70, 50, face - 70, 310, {fill: C.wall}),
    line(face, 50, face, 360, {stroke: C.wallEdge, width: 1.75, cap: 'butt'}),
    // body
    rect(204, 132, 64, 166, {rx: 22, fill: C.band, stroke: C.ink, width: 1.75}),
    line(214, 150, hand[0] + 4, hand[1], {stroke: C.ink, width: 4}),
    line(214, 282, foot[0] + 4, foot[1], {stroke: C.ink, width: 4}),
    circle(hand[0] + 4, hand[1], 6, {fill: C.blue}),
    circle(foot[0] + 4, foot[1], 6, {fill: C.ink}),
    circle(com[0], com[1], 9, {fill: C.page, stroke: C.ink, width: 1.75}),
    path(`M${com[0]} ${com[1] - 9}A9 9 0 0 1 ${com[0] + 9} ${com[1]}L${com[0]} ${com[1]}Z`, {fill: C.ink, stroke: ''}),
    path(`M${com[0]} ${com[1] + 9}A9 9 0 0 1 ${com[0] - 9} ${com[1]}L${com[0]} ${com[1]}Z`, {fill: C.ink, stroke: ''}),
    // dimensions
    line(face, com[1] + 34, com[0], com[1] + 34, {stroke: C.ink2, width: 1}),
    line(face, com[1] + 28, face, com[1] + 40, {stroke: C.ink2, width: 1}), line(com[0], com[1] + 28, com[0], com[1] + 40, {stroke: C.ink2, width: 1}),
    text((face + com[0]) / 2, com[1] + 52, '*h*', {size: 13.5, anchor: 'middle'}),
    line(92, hand[1], 92, foot[1], {stroke: C.ink2, width: 1}),
    line(86, hand[1], 98, hand[1], {stroke: C.ink2, width: 1}), line(86, foot[1], 98, foot[1], {stroke: C.ink2, width: 1}),
    text(82, (hand[1] + foot[1]) / 2 + 4, '*L*', {size: 13.5, anchor: 'end'}),
    // forces
    arrow(com[0], com[1] + 12, com[0], com[1] + 84, {stroke: C.ink, width: 2.5, head: 10}),
    text(com[0] + 10, com[1] + 80, '*W*', {size: 13.5, weight: 600}),
    arrow(hand[0] + 4, hand[1] - 8, hand[0] + 4, hand[1] - 50, {stroke: C.blue, width: 2.25, head: 9}),
    text(hand[0] + 14, hand[1] - 34, '*V*_{h}', {size: 13}),
    arrow(hand[0] - 4, hand[1], hand[0] - 50, hand[1], {stroke: C.blue, width: 2.25, head: 9}),
    text(hand[0] - 28, hand[1] - 10, '*T*', {size: 13, anchor: 'middle'}),
    arrow(foot[0] + 4, foot[1] - 8, foot[0] + 4, foot[1] - 44, {stroke: C.ink, width: 2.25, head: 9}),
    text(foot[0] + 14, foot[1] - 30, '*V*_{f}', {size: 13}),
    arrow(foot[0] + 12, foot[1], foot[0] + 58, foot[1], {stroke: C.ink, width: 2.25, head: 9}),
    text(foot[0] + 62, foot[1] + 4, '*N*', {size: 13}),
    text(288, 106, 'hands pull in', {size: 12}),
    text(288, 122, '*T* = *W* *h* / *L*', {size: 13}),
    text(288, 316, 'feet push out', {size: 12}),
    text(288, 332, '*N* = *T*', {size: 13}),
    text(288, 214, '*V*_{h} + *V*_{f} = *W*', {size: 13}),
  ];

  /* ---- B: the hand force must stay inside the spine cone -------------------------- */
  const o = [520, 300];
  const thetaMax = 16 * Math.PI / 180;
  const up = -Math.PI / 2;
  const T = 44, V = T / Math.tan(thetaMax * 0.86);
  const b = [
    panelTitle(432, 30, 'B', 'What the hand can supply'),
    wedge(o[0], o[1], 226, up - thetaMax, up, {fill: C.goodBg}),
    line(o[0], o[1], o[0], o[1] - 238, {stroke: C.ink2, width: 1, dash: '4 4'}),
    line(o[0], o[1], o[0] - Math.sin(thetaMax) * 238, o[1] - Math.cos(thetaMax) * 238, {stroke: C.good, width: 1.5}),
    arc(o[0], o[1], 128, up - thetaMax, up, {stroke: C.good}),
    text(o[0] - 44, o[1] - 138, '*θ*_{max}', {size: 13, fill: C.good, anchor: 'end'}),
    // components and resultant (the wall's force on the hand)
    line(o[0] - T, o[1] - V, o[0], o[1] - V, {stroke: C.ink2, width: 1, dash: '3 3'}),
    line(o[0] - T, o[1], o[0] - T, o[1] - V, {stroke: C.ink2, width: 1, dash: '3 3'}),
    arrow(o[0], o[1], o[0] - T, o[1] - V, {stroke: C.blue, width: 2.5, head: 10}),
    arrow(o[0], o[1], o[0] - T, o[1], {stroke: C.blue, width: 1.75, head: 8}),
    arrow(o[0], o[1], o[0], o[1] - V, {stroke: C.blue, width: 1.75, head: 8}),
    circle(o[0], o[1], 5, {fill: C.blue}),
    text(o[0] - T / 2, o[1] + 18, '*T*', {size: 13, anchor: 'middle'}),
    text(o[0] + 10, o[1] - V / 2, '*V*_{h}', {size: 13}),
    text(o[0] + 10, o[1] - V / 2 + 18, 'must be at least', {size: 11.5, fill: C.ink2}),
    text(o[0] + 10, o[1] - V / 2 + 34, '*T* / tan *θ*_{max}', {size: 13}),
    text(o[0] + 10, o[1] - 222, 'up the wall', {size: 11.5, fill: C.ink2}),
    text(o[0] - 78, o[1] - 6, 'into the wall', {size: 11.5, fill: C.ink2, anchor: 'end'}),
    text(432, 348, 'Spines pull inward only while they are also', {size: 12, fill: C.ink2}),
    text(432, 364, 'carrying shear. A hand that must hold *T* is', {size: 12, fill: C.ink2}),
    text(432, 380, 'therefore forced to carry much of the weight.', {size: 12, fill: C.ink2}),
  ];

  return svg(W, H, [line(412, 20, 412, H - 16, {stroke: C.fill, width: 1}), ...a, ...b], {
    title: 'Statics of a limbed climber on a vertical wall',
    description: 'Panel A: weight W acts at the centre of mass a distance h from the wall. Hands a height L above the feet must pull into the wall with T equal to W h over L, and the feet push out with the same force. Panel B: a spine pad can only supply an inward pull T together with a shear V-h of at least T over tan theta-max, so the pulling hand must also carry a large share of the weight.',
  });
}
