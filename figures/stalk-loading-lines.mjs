/* Loading lines of the stalk model in force space, for three initial stalk angles. */
import {C, axes, circle, key, line, polyline, scale, svg, text} from './lib.mjs';
import {RISE, loadingLine} from './stalk.mjs';

export const file = 'stalk-loading-lines.svg';

const PRELOADS = [0, 0.002, 0.004, 0.006]; // metres
const X_MAX = 1.6, Y_MIN = -0.8, Y_MAX = 0.1; // newtons

function panel(x0, y0, w, h, thetaDeg, title, first) {
  const xs = scale(0, X_MAX, x0, x0 + w);
  const ys = scale(Y_MAX, Y_MIN, y0, y0 + h);
  const params = {...RISE, theta0: thetaDeg * Math.PI / 180};
  const parts = [axes({
    x: x0, y: y0, width: w, height: h, xScale: xs, yScale: ys,
    xTicks: [0, 0.4, 0.8, 1.2, 1.6], yTicks: [0, -0.2, -0.4, -0.6, -0.8],
    xFormat: v => v.toFixed(1), yFormat: v => (!first ? '' : v === 0 ? '0' : v.toFixed(1).replace('-', '−')),
    xLabel: 'shear *F*_{s} (N)', yLabel: first ? 'normal *F*_{n} (N)' : undefined, zeroY: 0,
  })];
  // reference rays from the origin at 10°, 20° and 30° from the wall
  for (const degrees of [10, 20, 30]) {
    const slope = Math.tan(degrees * Math.PI / 180);
    const xEnd = Math.min(X_MAX, -Y_MIN / slope);
    parts.push(line(xs(0), ys(0), xs(xEnd), ys(-xEnd * slope), {stroke: C.hair, width: 1, dash: '3 3'}));
    const lx = xEnd === X_MAX ? xs(xEnd) + 4 : xs(xEnd) + 4;
    const ly = xEnd === X_MAX ? ys(-xEnd * slope) + 4 : ys(Y_MIN) - 5;
    parts.push(text(lx, ly, `${degrees}°`, {size: 10.5, fill: C.ink2}));
  }
  PRELOADS.forEach((preload, i) => {
    if (preload >= params.r0 * Math.sin(params.theta0)) return; // base would pass through the wall
    const points = loadingLine(params, preload, 0.008).map(p => [xs(p.Fs), ys(p.Fn)]);
    parts.push(polyline(points, {stroke: C.ramp[i], width: 2}));
    const [ex, ey] = points.at(-1);
    parts.push(circle(ex, ey, 4, {fill: C.ramp[i], stroke: C.page, width: 2}));
  });
  parts.push(text(x0, y0 - 12, title, {size: 12.5, weight: 600}));
  return parts.join('');
}

export function render() {
  const W = 720, H = 318;
  const w = 178, h = 190, top = 58;
  const body = [
    panel(62, top, w, h, 15, '*θ*_{0} = 15°', true),
    panel(282, top, w, h, 30, '*θ*_{0} = 30°  (fit to the RiSE toe)', false),
    panel(502, top, w, h, 45, '*θ*_{0} = 45°', false),
    text(62, 22, 'Preload depth', {size: 12, weight: 600}),
    ...PRELOADS.map((p, i) => key(160 + i * 78, 22, C.ramp[i], `${p * 1000} mm`)),
    text(700, 22, 'each line: base dragged 8 mm down the wall', {size: 11.5, fill: C.ink2, anchor: 'end'}),
  ];
  return svg(W, H, body, {
    title: 'Loading lines of the compliant-stalk model for initial stalk angles of 15, 30 and 45 degrees',
    description: 'Three force-space panels. In each, four lines show tip shear and normal force as the base is dragged 8 millimetres down the wall after preloads of 0, 2, 4 and 6 millimetres. The lines fan out from near the origin; a smaller initial angle gives lines closer to pure shear, a larger one gives steeper adhesion.',
  });
}
