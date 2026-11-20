/* The standard preload – drag – pull-off test trajectory for a row of spines. */
import {C, arrow, circle, line, polyline, rect, svg, text} from './lib.mjs';

export const file = 'test-trajectory.svg';

export function render() {
  const W = 720, H = 268;
  const surface = 196; // top of the sample
  const mm = 15; // px per millimetre
  const start = [150, surface - 96];
  const afterPreload = [start[0] + 4 * mm, start[1] + 4 * mm];
  const afterDrag = [afterPreload[0] + 16 * mm, afterPreload[1]];
  const end = [afterDrag[0], afterDrag[1] - 6.5 * mm];
  const badge = (x, y, n) => circle(x, y, 9.5, {fill: C.ink}) + text(x, y + 4, String(n), {size: 11.5, weight: 600, fill: C.page, anchor: 'middle'});
  const toes = (x, y, color) => [0, 9, 18, 27].map(k => line(x + k - 14, y, x + k - 25, y + 34, {stroke: color, width: 2})).join('');

  const body = [
    rect(60, surface, 600, 20, {fill: C.wall}),
    line(60, surface, 660, surface, {stroke: C.wallEdge, width: 1.75, cap: 'butt'}),
    rect(60, surface + 20, 600, 12, {fill: C.hair}),
    text(360, surface + 50, 'sample (roofing paper) on a force plate', {size: 12, fill: C.ink2, anchor: 'middle'}),

    toes(start[0], start[1], C.hair),
    toes(afterPreload[0], afterPreload[1] + 0, C.ink2),
    polyline([start, afterPreload, afterDrag, end], {stroke: C.fill, width: 7}),
    arrow(start[0], start[1], afterPreload[0] - 4, afterPreload[1] - 4, {stroke: C.blue, width: 2.25, head: 9}),
    arrow(afterPreload[0] + 8, afterPreload[1], afterDrag[0] - 8, afterDrag[1], {stroke: C.blue, width: 2.25, head: 9}),
    arrow(afterDrag[0], afterDrag[1] - 8, end[0], end[1], {stroke: C.blue, width: 2.25, head: 9}),

    badge(start[0] - 4, start[1] - 22, 1),
    text(start[0] + 12, start[1] - 26, 'preload', {size: 12.5, weight: 600}),
    text(start[0] + 12, start[1] - 11, '4 mm toward the surface, at 45°', {size: 11.5, fill: C.ink2}),
    badge(afterPreload[0] + 36, afterPreload[1] - 34, 2),
    text(afterPreload[0] + 52, afterPreload[1] - 38, 'drag', {size: 12.5, weight: 600}),
    text(afterPreload[0] + 52, afterPreload[1] - 23, '16 mm along the surface,', {size: 11.5, fill: C.ink2}),
    text(afterPreload[0] + 52, afterPreload[1] - 9, 'at 2.5 mm/s', {size: 11.5, fill: C.ink2}),
    badge(end[0] + 22, end[1] + 34, 3),
    text(end[0] + 38, end[1] + 30, 'pull-off', {size: 12.5, weight: 600}),
    text(end[0] + 38, end[1] + 45, 'straight out until', {size: 11.5, fill: C.ink2}),
    text(end[0] + 38, end[1] + 59, 'every spine lets go', {size: 11.5, fill: C.ink2}),
    text(start[0] - 26, start[1] + 52, 'row of', {size: 11.5, fill: C.ink2, anchor: 'end'}),
    text(start[0] - 26, start[1] + 66, 'ten toes', {size: 11.5, fill: C.ink2, anchor: 'end'}),
  ];
  return svg(W, H, body, {
    title: 'Preload, drag and pull-off trajectory used to test a row of spines',
    description: 'The base of a row of spines moves 4 millimetres toward the sample at 45 degrees, then 16 millimetres along the surface at 2.5 millimetres per second, then straight away from the surface until all spines release.',
  });
}
