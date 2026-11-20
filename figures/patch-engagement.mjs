/* Where to put the joint behind a large patch so that load presses it flat (after Asbeck 2010, ch. 5). */
import {C, arc, arrow, circle, line, path, polygon, rect, svg, text} from './lib.mjs';

export const file = 'patch-engagement.svg';

export function render() {
  const W = 720, H = 396;
  const face = 110; // wall face
  const top = [face + 2, 84]; // the patch touches here first
  const tilt = 5 * Math.PI / 180;
  const ax = [Math.sin(tilt), Math.cos(tilt)]; // down the patch
  const out = [Math.cos(tilt), -Math.sin(tilt)]; // away from the wall
  const along = (s, o = 0) => [top[0] + ax[0] * s + out[0] * o, top[1] + ax[1] * s + out[1] * o];
  const P = along(26); // where the wall's net force acts on the patch face
  const thetaMax = 24 * Math.PI / 180;
  const lineX = y => P[0] + (y - P[1]) * Math.tan(thetaMax);
  const bottom = 352;
  const J = [262, 214]; // a good joint position
  const bad = [146, 306]; // a poor one
  const Q = [lineX(322), 322]; // where the angle of the limit line is marked
  const mount = along(118, 18);

  const body = [
    rect(54, 40, face - 54, bottom - 28, {fill: C.wall}),
    line(face, 40, face, bottom + 12, {stroke: C.wallEdge, width: 1.75, cap: 'butt'}),
    text(82, 344, 'wall', {size: 12, fill: C.ink2, anchor: 'middle'}),

    // stable region: lower than P, and outside the theta_max line through P
    polygon([P, [lineX(bottom), bottom], [452, bottom], [452, P[1]]], {fill: C.goodBg}),
    line(P[0], P[1], lineX(bottom + 14), bottom + 14, {stroke: C.good, width: 1.5}),
    line(P[0], P[1], 452, P[1], {stroke: C.good, width: 1.5}),
    text(444, P[1] + 22, 'stable region for the joint', {size: 12.5, weight: 600, fill: C.good, anchor: 'end'}),

    // the patch: spines or adhesive on the wall side, rigid backing behind
    polygon([along(0), along(196), along(196, 6), along(0, 6)], {fill: C.orange}),
    polygon([along(0, 6), along(196, 6), along(196, 18), along(0, 18)], {fill: '#48484a'}),
    // rigid bracket to the joint
    line(mount[0], mount[1], J[0], J[1], {stroke: '#48484a', width: 5}),
    path(`M${J[0] - 15} ${J[1] - 12}A19 19 0 1 1 ${J[0] + 9} ${J[1] + 17}`, {stroke: C.orange, width: 2}),
    circle(J[0], J[1], 7.5, {fill: C.page, stroke: C.ink, width: 2}),

    // forces
    arrow(P[0], P[1], P[0] - 15, P[1] - 62, {stroke: C.blue, width: 2.25, head: 9}),
    text(P[0] - 22, P[1] - 68, '*F*_{patch}', {size: 13, anchor: 'end'}),
    arrow(J[0], J[1] + 9, J[0] + 15, J[1] + 82, {stroke: C.blue, width: 2.25, head: 9}),
    text(J[0] + 24, J[1] + 80, '*F*_{joint}', {size: 13}),
    line(Q[0], Q[1], Q[0], Q[1] - 64, {stroke: C.ink2, width: 1, dash: '4 4'}),
    arc(Q[0], Q[1], 46, -Math.PI / 2 - thetaMax, -Math.PI / 2, {stroke: C.good}),
    text(Q[0] + 8, Q[1] - 40, '*θ*_{max}', {size: 13, fill: C.good}),

    // a joint in the wrong place
    circle(bad[0], bad[1], 7.5, {stroke: C.bad, width: 1.5, dash: '3 3'}),
    line(bad[0] + 9, bad[1] + 6, 252, 366, {stroke: C.ink2, width: 1}),
    text(258, 370, 'a joint here can turn the patch either way: the bottom may peel', {size: 11.5, fill: C.ink2}),

    // notes
    line(top[0] + 22, top[1] - 4, 196, 62, {stroke: C.ink2, width: 1}),
    text(200, 58, 'tilted a few degrees so the top edge touches first', {size: 12}),
    line(J[0] + 12, J[1] - 8, 300, 168, {stroke: C.ink2, width: 1}),
    text(304, 152, 'ball joint and torsion', {size: 12}),
    text(304, 168, 'spring *k*_{φ}', {size: 12}),

    // list
    text(498, 96, 'Any load between pure shear and *θ*_{max}', {size: 12}),
    text(498, 112, 'now turns the patch the same way:', {size: 12}),
    text(498, 128, 'flat against the wall.', {size: 12}),
    text(498, 160, 'Size *k*_{φ} so the patch is just parallel', {size: 12}),
    text(498, 176, 'to the wall at the largest load.', {size: 12}),
    text(498, 208, 'Keep the joint close to the wall:', {size: 12}),
    text(498, 224, 'a long standoff multiplies every', {size: 12}),
    text(498, 240, 'error in load direction.', {size: 12}),
  ];
  return svg(W, H, body, {
    title: 'Stable engagement of a large patch: joint position relative to the theta-max line',
    description: 'A patch on a rigid backing is tilted so its top edge touches the wall first. The joint that loads it sits in a stable region: lower than the point where the wall force acts on the patch, and farther from the wall than a line drawn from that point at theta-max. From there any load between pure shear and theta-max rotates the patch flat against the wall.',
  });
}
