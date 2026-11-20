/* Load on the single supporting hand of a climber, versus how far its centre of mass sits from the wall. */
import {C, axes, circle, key, line, polyline, scale, svg, text} from './lib.mjs';

export const file = 'hand-load.svg';

export function render() {
  const W = 720, H = 392;
  const x0 = 78, y0 = 60, w = 430, h = 262;
  const xs = scale(0, 0.5, x0, x0 + w);
  const ys = scale(0, 1.2, y0 + h, y0);
  const angles = [30, 20, 15, 10]; // degrees; lightest to darkest = most forgiving to most demanding
  const body = [axes({
    x: x0, y: y0, width: w, height: h, xScale: xs, yScale: ys,
    xTicks: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
    xFormat: v => v.toFixed(1), yFormat: v => v.toFixed(1),
    xLabel: 'centre-of-mass standoff ÷ hand-to-foot height,  *h* / *L*',
    yLabel: 'load on the supporting hand ÷ weight', zeroY: 0,
  })];
  body.push(line(x0, ys(1), x0 + w, ys(1), {stroke: C.ink2, width: 1, dash: '5 4'}));
  body.push(text(x0 + 6, ys(1) - 6, 'the whole weight', {size: 11, fill: C.ink2}));

  // legend, in the same order as the lines from left to right
  body.push(text(x0, 26, 'Largest angle from the wall at which the hand still holds, *θ*_{max}', {size: 12, weight: 600}));
  [...angles].reverse().forEach((degrees, k) => body.push(key(x0 + k * 74, 44, C.ramp[3 - k], `${degrees}°`)));

  angles.forEach((degrees, i) => {
    const theta = degrees * Math.PI / 180;
    const end = Math.min(0.5, Math.tan(theta)); // beyond tan(theta) even the whole weight is not enough
    const points = Array.from({length: 41}, (_, k) => {
      const ratio = end * k / 40;
      return [xs(ratio), ys(ratio / Math.sin(theta))];
    });
    body.push(polyline(points, {stroke: C.ramp[i], width: 2.25}));
    const [ex, ey] = points.at(-1);
    body.push(circle(ex, ey, 4.5, {fill: C.ramp[i], stroke: C.page, width: 2}));
    body.push(text(ex + (degrees === 30 ? 10 : 0), ey - (degrees === 30 ? -4 : 11), `${degrees}°`, {size: 12, anchor: degrees === 30 ? 'start' : 'middle'}));
  });

  // the worked example: h = 0.15 m, L = 0.9 m, cone of 15 degrees
  const ex = 0.15 / 0.9, ey = ex / Math.sin(15 * Math.PI / 180);
  body.push(circle(xs(ex), ys(ey), 7, {stroke: C.ink, width: 1.5}));

  const tx = x0 + w + 44;
  [
    ['Each line stops where one', C.ink2], ['hand would have to carry', C.ink2], ['the whole weight:', C.ink2], ['*h* / *L* = tan *θ*_{max}.', C.ink],
  ].forEach(([string, fill], k) => body.push(text(tx, 112 + k * 15, string, {size: 11.5, fill})));
  body.push(circle(tx + 6, 196, 6, {stroke: C.ink, width: 1.5}));
  [
    ['Worked example', C.ink, 600], ['*h* / *L* = 0.17, *θ*_{max} = 15°:', C.ink2], ['the hand carries 0.64 *W*', C.ink2], ['before any preload.', C.ink2],
  ].forEach(([string, fill, weight], k) => body.push(text(tx + (k ? 0 : 20), 200 + k * 15 + (k ? 6 : 0), string, {size: 11.5, fill, weight})));

  return svg(W, H, body, {
    title: 'Load on the one supporting hand of a climber as a fraction of its weight',
    description: 'A line chart. The load on the supporting hand divided by weight rises in proportion to h over L, with slope one over sine of theta-max, for theta-max of 10, 15, 20 and 30 degrees. Each line ends where h over L equals tan theta-max, where the hand would carry the whole weight.',
  });
}
