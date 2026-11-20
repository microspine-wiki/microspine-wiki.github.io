/* The two idealised scaling trends: contact strength rises as r², asperity count falls as 1/r². */
import {C, line, rect, svg, text} from './lib.mjs';

export const file = 'scaling.svg';

const DECADE_X = 78; // px per decade of tip radius (1 → 1000 µm)
const DECADE_Y = 30; // px per decade of the relative quantity (six decades)

function panel(x0, y0, {title, subtitle, rising}) {
  const w = DECADE_X * 3, h = DECADE_Y * 6;
  const px = radius => x0 + Math.log10(radius) * DECADE_X;
  const parts = [];
  // band of typical microspine tip radii, 10–35 µm
  parts.push(rect(px(10), y0, px(35) - px(10), h, {fill: C.band}));
  for (let d = 0; d <= 6; d += 2) parts.push(line(x0, y0 + h - d * DECADE_Y, x0 + w, y0 + h - d * DECADE_Y, {stroke: C.fill, width: 1, cap: 'butt'}));
  for (let d = 0; d <= 3; d += 1) parts.push(line(x0 + d * DECADE_X, y0, x0 + d * DECADE_X, y0 + h, {stroke: C.fill, width: 1, cap: 'butt'}));
  parts.push(line(x0, y0 + h, x0 + w, y0 + h, {stroke: C.hair, width: 1.25, cap: 'butt'}));
  for (const [d, label] of [[0, '1'], [1, '10'], [2, '100'], [3, '1000']]) parts.push(text(x0 + d * DECADE_X, y0 + h + 17, label, {size: 11.5, fill: C.ink2, anchor: 'middle'}));
  for (const [d, label] of [[0, '1'], [2, '10^{2}'], [4, '10^{4}'], [6, '10^{6}']]) parts.push(text(x0 - 8, y0 + h - d * DECADE_Y + 4, label, {size: 11.5, fill: C.ink2, anchor: 'end'}));
  parts.push(text(x0 + w / 2, y0 + h + 38, 'spine tip radius *r*_{s} (µm)', {size: 12, fill: C.ink2, anchor: 'middle'}));
  parts.push(text(x0 - 40, y0 + h / 2, 'relative value', {size: 12, fill: C.ink2, anchor: 'middle', rotate: -90}));
  // the trend line, slope ±2 on log–log axes
  const [ya, yb] = rising ? [y0 + h, y0] : [y0, y0 + h];
  parts.push(line(x0, ya, x0 + w, yb, {stroke: rising ? C.blue : C.orange, width: 2.25}));
  parts.push(text(x0, y0 - 30, title, {size: 13, weight: 600}));
  parts.push(text(x0, y0 - 13, subtitle, {size: 12, fill: C.ink2}));
  parts.push(text(px(10) + 3, y0 + (rising ? 14 : h - 8), 'typical tips', {size: 10.5, fill: C.ink2}));
  return {svg: parts.join(''), px, w, h};
}

export function render() {
  const W = 720, H = 386;
  const left = panel(70, 62, {title: 'Load one contact can carry', subtitle: 'grows as *r*_{s}^{2}', rising: true});
  const right = panel(436, 62, {title: 'Usable asperities per unit of wall area', subtitle: 'fall as 1 / *r*_{s}^{2}', rising: false});

  // Largest usable asperities a surface offers (Asbeck 2010, section 2.3).
  const bar = (y, to, label) => rect(right.px(1), y, right.px(to) - right.px(1), 6, {fill: C.ink2, rx: 3})
    + text(right.px(to) + 8, y + 7, label, {size: 11.5, fill: C.ink2});
  const y = 62 + right.h + 74;
  const ranges = [
    text(right.px(1), y - 4, 'Asperity sizes a surface offers', {size: 11.5, weight: 600}),
    bar(y + 6, 20, 'smooth concrete, stone panels'),
    bar(y + 24, 300, 'rough concrete'),
  ];

  // The reading of the two panels together.
  const note = [
    text(70, y - 4, 'Halve the tip radius:', {size: 11.5, weight: 600}),
    text(70, y + 13, 'each contact holds a quarter of the load,', {size: 11.5, fill: C.ink2}),
    text(70, y + 28, 'but four times as many ledges are in reach.', {size: 11.5, fill: C.ink2}),
  ];

  return svg(W, H, [left.svg, right.svg, ...ranges, ...note], {
    title: 'Idealised scaling of spine contact strength and asperity availability with tip radius',
    description: 'Two log-log panels sharing a tip-radius axis from 1 to 1000 micrometres. Left: the load a single spine-asperity contact can carry grows as the square of tip radius. Right: the number of usable asperities per unit wall area falls as one over the square of tip radius. Typical microspine tips are 10 to 35 micrometres.',
  });
}
