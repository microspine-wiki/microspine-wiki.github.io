---
description: RiSE was a 3.8 kg six-legged robot that walked on the ground and climbed building walls. Its feet are the best-characterised spine arrays in the literature and the source of most of the design data in this wiki.
status: draft
---

# RiSE

RiSE was a hexapedal robot designed to move over the ground and to climb vertical building surfaces such as brick, stucco and crushed stone, without suction, magnets or adhesives. The systems paper covers its body, the layered compliance of its legs and feet, and the sensing and control that made climbing dependable ([Spenko 2008][spenko2008]).

The photograph on the [introductory page](../fundamentals/what-are-microspines.md#three-scales-that-have-been-built) shows it on a wall.

## In numbers

| | | Source |
|---|--:|---|
| Mass | just over 3.8 kg | [Spenko 2008][spenko2008], authors' copy |
| Payload | 1.5 kg | same |
| Climbing speed | up to 4 cm/s | same, abstract |
| Legs | 6, each with 2 degrees of freedom | [Asbeck 2006 (video)][asbeck2006video] |
| Toes per foot | 25–50, flat, in a row | [Spenko 2008][spenko2008], authors' copy |
| Spines in total | 192 | [Asbeck & Cutkosky 2012][asbeck2012], Fig. 1 |

An earlier short paper gives the mass of the platform as 3.2 kg ([Asbeck 2006 (video)][asbeck2006video]); it grew.

## Feet

RiSE's feet went through many generations. The systems paper describes toes of two polyurethanes made by Shape Deposition Manufacturing, with fishhook spines of about 25 µm tip radius, and a later generation with finer spines of about 15 µm. The toe analysed in the thesis and in [Asbeck & Cutkosky 2012][asbeck2012] is 3 cm long, uses Smooth-On Task 9 and VytaFlex 30, and carries a size 14 dry-fly hook. Its anatomy, measured stiffness and loading lines are in [Toe designs](../design/toe-designs.md) and [The stalk model](../design/stalk-model.md).

Two features of the foot matter beyond the toe itself:

- **An ankle.** Each row of toes is mounted on a pin joint with a torsion spring, so the row can swing to follow the direction of the load. This widened the range of loading angles the foot could sustain from about 10° to about 16° in one mounting ([Asbeck 2010][asbeck2010], §4.3.3).
- **Compliance in layers.** The toe, the ankle and the leg each add compliance at a different length scale, so that the foot seats even when the leg places it imprecisely.

## What climbing with it taught

Several observations in the thesis come from watching RiSE climb ([Asbeck 2010][asbeck2010]):

- **Feet slip all the time.** Local surface failures and imperfect force control mean that spines are continually letting go. What keeps the robot on the wall is that the feet go on holding while they slip: [dynamic adhesion](../design/load-sharing.md#re-engagement-and-dynamic-adhesion).
- **The loading sequence is: press in, load in shear, then pull away.** This is the case the analysis of loading-line curvature was built around.
- **When a loaded foot cannot re-engage, re-place it.** If a foot is carrying a steep load and loses spines, the freed spines no longer reach the wall. Lifting the foot and placing it again with a pawing motion works better than waiting.
- **Tangles accumulate over hundreds of steps** unless the toes are prevented from landing on each other.

## Relatives

**RiSE V3** was a later, larger machine: 5.4 kg and 70 cm long, with a 28 cm tail. It was specialised for fast, dynamic climbing of poles and ascended a wooden telephone pole at 21 cm/s ([Haynes 2009][haynes2009]). On wood it used claws that penetrate, a different mechanism from the microspines of this wiki.

A related line of work on *dynamic* climbing, built around a pendulum-like template taken from animals, produced a prototype that climbs at up to 0.67 m/s ([Lynch 2012][lynch2012]).

## Further reading

The project's publications are listed, with authors' copies of many of them, on the [RiSE publications page](https://bdml.stanford.edu/twiki/bin/view/Rise/RisePublications.html) of the old BDML wiki.

[spenko2008]: ../reference/bibliography.md#spenko2008
[asbeck2006video]: ../reference/bibliography.md#asbeck2006video
[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
[haynes2009]: ../reference/bibliography.md#haynes2009
[lynch2012]: ../reference/bibliography.md#lynch2012
