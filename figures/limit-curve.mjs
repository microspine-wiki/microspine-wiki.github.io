/* Force space for one spine on one asperity: the safe region and its three edges. */
import {C, arc, arrow, circle, line, path, svg, text} from './lib.mjs';

export const file = 'limit-curve.svg';

export function render() {
  const W = 720, H = 372;
  const ox = 214, oy = 118; // origin of force space
  const R = 336; // |F| = F*
  const thetaMax = 28 * Math.PI / 180;
  const mu = 0.25;
  const top = 34;

  // Safe region: friction line (up-left), top edge, F* arc, adhesion line.
  const frictionX = ox - mu * (oy - top);
  const arcTopX = ox + Math.sqrt(R * R - (oy - top) ** 2);
  const endX = ox + R * Math.cos(thetaMax);
  const endY = oy + R * Math.sin(thetaMax);
  const region = `M${ox} ${oy}L${frictionX} ${top}L${arcTopX.toFixed(1)} ${top}A${R} ${R} 0 0 1 ${endX.toFixed(1)} ${endY.toFixed(1)}Z`;

  const body = [
    path(region, {fill: C.goodBg, stroke: ''}),
    // axes
    arrow(60, oy, 690, oy, {stroke: C.ink2, width: 1.25}),
    arrow(ox, 344, ox, 22, {stroke: C.ink2, width: 1.25}),
    text(690, oy - 10, '*F*_{s}', {anchor: 'end', size: 13}),
    text(690, oy + 18, 'shear, along the wall', {anchor: 'end', size: 11.5, fill: C.ink2}),
    text(ox - 10, 30, '*F*_{n}', {anchor: 'end', size: 13}),
    text(ox - 36, 62, 'pressing', {anchor: 'end', size: 11.5, fill: C.ink2}),
    text(ox - 36, 76, 'into the wall', {anchor: 'end', size: 11.5, fill: C.ink2}),
    text(ox - 12, 318, 'pulling out', {anchor: 'end', size: 11.5, fill: C.ink2}),
    text(ox - 12, 332, '(adhesion)', {anchor: 'end', size: 11.5, fill: C.ink2}),

    // the three limits
    line(ox, oy, frictionX, top, {stroke: C.ink, width: 2}),
    line(ox, oy, endX, endY, {stroke: C.ink, width: 2}),
    path(`M${arcTopX.toFixed(1)} ${top}A${R} ${R} 0 0 1 ${endX.toFixed(1)} ${endY.toFixed(1)}`, {stroke: C.ink, width: 2}),

    // angle mark for theta_max
    arc(ox, oy, 96, 0, thetaMax),
    text(ox + 112, oy + 51, '*θ*_{max}', {size: 13}),

    // labels
    text(388, 84, 'Safe region', {size: 15, weight: 600, fill: C.good}),
    text(388, 102, 'the contact holds', {size: 12, fill: C.good}),

    text(66, 176, 'Friction limit', {size: 12.5, weight: 600}),
    text(66, 192, 'spine dragged back', {size: 11.5, fill: C.ink2}),
    text(66, 206, 'up the wall:', {size: 11.5, fill: C.ink2}),
    text(66, 222, '−*F*_{s} ≤ *μ* *F*_{n}', {size: 12}),
    line(150, 164, ox - mu * 34 - 4, oy - 32, {stroke: C.ink2, width: 1}),

    text(300, 262, 'Adhesion limit', {size: 12.5, weight: 600}),
    text(300, 278, 'pull farther from the wall and', {size: 11.5, fill: C.ink2}),
    text(300, 292, 'the tip slides off its ledge:', {size: 11.5, fill: C.ink2}),
    text(300, 308, '−*F*_{n} ≤ *F*_{s} tan *θ*_{max}', {size: 12}),
    line(382, 250, 404, oy + 190 * Math.tan(thetaMax) + 6, {stroke: C.ink2, width: 1}),

    text(574, 204, 'Strength limit', {size: 12.5, weight: 600}),
    text(574, 220, 'spine bends or the', {size: 11.5, fill: C.ink2}),
    text(574, 234, 'asperity breaks:', {size: 11.5, fill: C.ink2}),
    text(574, 250, '|*F*| ≤ *F**', {size: 12}),

    // loading path through the origin
    arrow(ox, oy, ox + 250 * Math.cos(0.2), oy + 250 * Math.sin(0.2), {stroke: C.blue, width: 2}),
    text(ox + 150, oy + 22, 'loading', {size: 12, fill: C.ink2}),
    circle(ox, oy, 4.5, {fill: C.blue, stroke: C.page, width: 2}),
    text(ox + 12, oy - 10, 'origin: lets go at zero force', {size: 11.5, fill: C.ink2}),
  ];
  return svg(W, H, body, {
    title: 'Limit curve of a spine–asperity contact in force space',
    description: 'A wedge-shaped safe region bounded by a friction limit, an adhesion limit at angle theta-max below the shear axis, and a strength limit of radius F-star. The region passes through the origin.',
  });
}
