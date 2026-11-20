---
description: Which walls work with spines, which do not, and how to judge one you have not tried. Includes the measured roughness table from the original profile study.
status: draft
---

# Which surfaces can be climbed

A spine needs ledges about the size of its tip or larger, steep enough to hold it ([Spine–asperity contact](spine-asperity-contact.md)), and strong enough not to break off. Surfaces differ in all three respects.

## Surfaces that have been climbed

Robots carrying the spine arrays described in this wiki have climbed cinder block, concrete, brick, stucco, and walls with small embedded stones. Spines also work on penetrable materials such as felt and cloth ([Asbeck 2010][asbeck2010], §1.3.2).

| Surface | How spines fare | Notes |
|---|---|---|
| Rough concrete, cinder block | Very well | Asperities up to about 300 µm; many pits, which are strong |
| Stucco | Well | Already climbed reliably by SpinybotI with only four spines per foot |
| Brick | Well | Climbed by SpinybotII and RiSE |
| Roofing paper (tar paper with mineral granules) | Well | Roughness close to stucco; granules can pull out |
| Aluminium-oxide sandpaper, 80 and 100 grit | Very well | Sharp grains, high density of steep ledges |
| Aluminium-oxide sandpaper, 120 and 150 grit | Less well | Feet slide farther before engaging |
| Rough-cut granite | Marginal | Barely enough ledges for SpinybotII to climb |
| Painter's sandpaper, 100 grit | Poor | Rounded grains: rough, but few steep ledges |
| Ground or polished stone | Not at all | No ledges at the scale of the tip |

The sandpaper and stone rows are SpinybotII's performance on the samples whose profiles appear in the table below ([Asbeck 2010][asbeck2010], §2.2.2).

## Measured profiles

Twelve surfaces were profiled over 5 cm. The table lists their average roughness $R_a$, RMS roughness $R_q$ and the fractal dimension $D$ estimated from the power spectrum of the profile ([Asbeck 2010][asbeck2010], Table 2.1).

| No. | Surface | $R_a$ (µm) | $R_q$ (µm) | $D$ |
|--:|---|--:|--:|--:|
| 1 | Cobblestone | 56.9 | 78.1 | 1.2 |
| 2 | Machined granite | 6.6 | 10.3 | 1.4 |
| 3 | Rough-cut granite | 42.7 | 56.1 | 1.4 |
| 4 | Polished granite | 13.2 | 21.0 | 1.3 |
| 5 | Paving stone | 73.0 | 92.2 | 1.2 |
| 6 | Concrete cinder block | 93.0 | 131.9 | 1.1 |
| 7 | Concrete 2 | 70.1 | 88.4 | 1.0 |
| 8 | Aluminium oxide, 80 grit | 42.1 | 57.0 | 1.1 |
| 9 | Aluminium oxide, 100 grit | 35.8 | 49.9 | 1.1 |
| 10 | Aluminium oxide, 120 grit | 20.3 | 26.0 | 1.1 |
| 11 | Aluminium oxide, 150 grit | 21.7 | 27.8 | 1.1 |
| 12 | Painter's sandpaper, 100 grit | 30.5 | 38.9 | 1.0 |

Read this table with the performance column above and one thing stands out: **roughness does not rank the surfaces.** Painter's 100 grit is rougher by both measures than 120- and 150-grit aluminium oxide and is the worst of the three to climb. Polished granite has twice the $R_q$ of machined granite, and the robot could not climb ground or polished stone at all. What separates good surfaces from bad is how many features have a near-perpendicular face at the scale of the tip, which depends on grain shape and on how the surface was formed.

Natural rock profiles are roughly self-affine, with fractal dimensions between about 1.1 and 1.5, so they keep offering structure as you look closer. That is why shrinking the spine tip opens up smoother surfaces. The limit is set by how the surface was finished: cutting, polishing and wear erase the large features first.

| Surface type | Largest usable asperities |
|---|--:|
| Rough concrete | up to about 300 µm |
| Smooth concrete, stone panels | up to about 20 µm |

A spine tip much larger than these values finds nothing to hold ([Asbeck 2010][asbeck2010], §2.3).

## How many spines catch

On most surfaces it could climb, 30 to 40 % of SpinybotII's spines were engaged at a time ([Asbeck 2010][asbeck2010], §2.3). For design, [Asbeck & Cutkosky 2012][asbeck2012] suggest assuming that 25 to 50 % of the spines in a group engage in a loading cycle, depending on the surface, and the thesis uses 20 % as the worst case for a surface that is only marginally climbable.

## Weak surfaces

A ledge is only useful if it stays attached to the wall. Roofing paper is a convenient example: its mineral granules are held by a weak bond, and in tests they often pulled out before the spine or its suspension reached their limits. Coating the paper with a thin layer of cyanoacrylate glue, which flowed between the granules without changing the profile, raised the forces the surface could sustain but left the limiting *angles* unchanged ([Asbeck 2010][asbeck2010], §2.4.1). In other words, the glue changed the strength limit and not the geometry.

On a real wall, look for the same signs: grit falling from under the feet, and forces that drop suddenly without the suspension having reached its travel stop.

## Dust, water and wear

Spines are relatively unaffected by dirt and only moderately affected by moisture, which is a large part of their appeal for exterior walls ([Asbeck 2010][asbeck2010], §1.3.2). The tips do wear. New hooks of the type used on RiSE have tip radii of 10 to 15 µm; heavy use brings them to 25 to 35 µm, and an extremely dull tip was measured at 53 µm ([Toe designs](../design/toe-designs.md#the-spine-itself)). A duller tip sees fewer ledges, so a foot that has climbed a lot grips marginal surfaces less well than a new one.

## Judging a new surface

The quickest test needs one spine and no robot ([Asbeck & Cutkosky 2012][asbeck2012], §6.2):

1. Fix a spine to the end of a long, stiff link so that it meets the surface at 45° to 60°.
2. Drag it along the surface under a light normal force until it catches.
3. Increase the pull, and vary its angle away from the surface, until the tip slips off or the asperity breaks. Record the force and the angle each time.
4. Repeat at many places. Note how far the spine travels between catches.

This gives rough values for the three numbers a design needs: the typical distance between usable asperities, the largest angle from the wall at which contacts still hold, and the force at which they fail. Plotted in force space, the results outline the surface's [limit curve](limit-curve.md). [Test methods](../testing/test-methods.md) describes the instrumented version.

> [!NOTE]
> This page lists only surfaces with published results. If you have measurements on other materials, such as limestone, sandstone, bark, asphalt, weathered paint or 3D-printed test surfaces, please [add them](../about/contributing.md).

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
