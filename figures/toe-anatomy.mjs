/* Functional anatomy of the RiSE / Z-Man toe (a schematic, not to scale). */
import {C, arrow, circle, line, path, polygon, polyline, rect, spring, svg, text} from './lib.mjs';

export const file = 'toe-anatomy.svg';

const STEEL = '#48484a';
const tag = (x, y, label, o = {}) => circle(x, y, 9.5, {fill: o.fill ?? C.page, stroke: o.stroke ?? C.ink, width: 1.25})
  + text(x, y + 4, label, {size: 11.5, weight: 600, anchor: 'middle', fill: o.ink ?? C.ink});

export function render() {
  const W = 720, H = 430;
  const profile = [[150, 36], [146, 78], [151, 112], [163, 110], [165, 116], [157, 132], [150, 150], [147, 204], [152, 254], [149, 306], [151, 356], [150, 398]];
  const pin6 = [262, 126], pin7 = [212, 334], pin8 = [398, 214];

  const body = [
    // wall
    polygon([[40, 36], ...profile, [40, 398]], {fill: C.wall}),
    polyline(profile, {stroke: C.wallEdge, width: 1.75}),
    text(86, 70, 'wall', {size: 12, fill: C.ink2}),

    // the foot: side plates carry the three pins
    polygon([pin6, pin8, pin7], {fill: 'none', stroke: C.hair, width: 1.5}),

    // 1: hard body, with its travel window
    path('M204 70L292 64Q316 66 320 96L322 172Q318 214 296 242L270 270L206 270Q196 268 196 256L196 82Q196 72 204 70Z', {fill: C.band, stroke: C.ink, width: 1.75}),
    rect(228, 96, 68, 122, {rx: 16, fill: C.page, stroke: C.ink, width: 1.5}),
    // the hook, cast into the body
    path('M159 110C150 92 172 72 214 80', {stroke: STEEL, width: 3.75}),

    // 2: link that turns on pin 7
    path('M200 318L292 312Q340 306 356 298Q368 306 358 322Q340 332 292 338L206 348Q192 342 194 328Q194 320 200 318Z', {fill: C.band, stroke: C.ink, width: 1.75}),

    // 3, 4: shear flexures between body and link
    spring(216, 270, 216, 316, {stroke: C.orange, coils: 4, amp: 5, lead: 0.16, width: 2}),
    spring(254, 270, 268, 314, {stroke: C.orange, coils: 4, amp: 5, lead: 0.16, width: 2}),
    // 5: soft normal flexure from the link to the anchor pin
    spring(356, 304, pin8[0], pin8[1] + 6, {stroke: C.blue, coils: 6, amp: 5, lead: 0.14, width: 2}),

    // pins
    circle(...pin6, 6.5, {fill: C.ink}),
    circle(...pin8, 6.5, {fill: C.ink}),
    circle(...pin7, 7.5, {fill: C.page, stroke: C.ink, width: 1.75}), circle(...pin7, 2.6, {fill: C.ink}),

    // travel of pin 6 inside the window
    arrow(pin6[0] + 20, pin6[1] + 2, pin6[0] + 20, 206, {stroke: C.ink2, width: 1.25, head: 6}),

    // what moves
    arrow(pin7[0], 360, pin7[0], 410, {stroke: C.ink, width: 2.5, head: 10}),
    text(pin7[0] + 14, 396, 'the foot pulls down the wall', {size: 12}),
    arrow(159, 104, 159, 58, {stroke: C.blue, width: 2.25, head: 9}),
    text(170, 54, 'ledge holds the hook', {size: 12}),

    // part numbers
    tag(214, 172, '1'), tag(310, 324, '2'),
    tag(196, 293, '3', {stroke: C.orange}), tag(284, 290, '4', {stroke: C.orange}),
    tag(408, 266, '5', {stroke: C.blue}),
    tag(pin6[0] - 22, pin6[1] - 2, '6'), tag(pin7[0] - 26, pin7[1] + 14, '7'), tag(pin8[0] + 22, pin8[1] - 4, '8'),
  ];

  const legend = [
    ['1', 'hard body with the hook cast in'],
    ['2', 'rigid link that turns on pin 7'],
    ['3, 4', 'shear flexures (stretch along the wall)'],
    ['5', 'normal flexure (soft, stretched at rest)'],
    ['6', 'overload pin in a window of the body'],
    ['7', 'pivot pin'],
    ['8', 'anchor pin'],
  ];
  legend.forEach(([number, label], i) => {
    const y = 92 + i * 27;
    const color = number === '3, 4' ? C.orange : number === '5' ? C.blue : C.ink;
    body.push(text(452, y, number, {size: 12.5, weight: 600, fill: C.ink}));
    if (color !== C.ink) body.push(line(452, y + 6, 452 + (number.length > 1 ? 24 : 8), y + 6, {stroke: color, width: 2}));
    body.push(text(486, y, label, {size: 12, fill: C.ink2}));
  });
  body.push(text(452, 300, 'Pins 6, 7 and 8 are fixed in the side plates,', {size: 12}));
  body.push(text(452, 316, 'so they move together with the foot.', {size: 12}));
  body.push(line(446, 296, 360, 240, {stroke: C.ink2, width: 1}));

  return svg(W, H, body, {
    title: 'Schematic of the RiSE and Z-Man spine toe',
    description: 'A hook is cast into a hard body. Two shear flexures join the body to a rigid link that pivots on a pin. A soft, pre-stretched normal flexure runs from the link to an anchor pin. An overload pin rides in a window of the body. The three pins are fixed in side plates that form the foot. Pulling the foot down the wall stretches the shear flexures while the ledge holds the hook.',
  });
}
