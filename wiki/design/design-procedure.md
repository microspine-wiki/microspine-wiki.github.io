---
description: A step-by-step route from a wall and a load to a toe and a spine count, following the published design method, with a worked example and a checklist.
status: draft
---

# A design procedure

This page turns the preceding ones into a sequence you can follow. It is the method of [Asbeck & Cutkosky 2012][asbeck2012] (§6.2), with the sizing argument of [Asbeck 2010][asbeck2010] (§4.2.1) and a worked example added. Treat every number it produces as a starting point for testing.

## Before you start

You need to know two things about the job:

- **The loads on each foot**, in shear and in adhesion, at the worst moment of the gait. For anything with limbs, find these from statics first ([Sizing spine pads for a limbed climber](../climbing/sizing-a-limbed-climber.md)).
- **The surfaces** it must hold on. A foot tuned for stucco will work on rough concrete. It will not work on sealed brick.

## Step 1: measure the wall

Three numbers describe a surface for this purpose:

| Quantity | Symbol | How to get it |
|---|---|---|
| Typical spacing between usable asperities | $\lambda$ | Drag one spine on a stiff link under light load and note the distance between catches |
| Largest angle from the wall at which contacts hold | $\theta_{max}$ | Vary the pull angle until the tip slips off; plot failures in force space |
| Force at which a contact fails | $F^*$ | Increase the pull until the spine bends, slips or the asperity breaks |

The single-spine drag test is described in [Which surfaces can be climbed](../fundamentals/surfaces.md#judging-a-new-surface). If you cannot test, some published values give the order of magnitude: on the surfaces profiled for the original study, usable asperities for a 10 µm tip were 1 to 3 mm apart on average; contacts with 15 to 20 µm tips failed at 1 to 2 N; and on roofing paper, which is about as rough as stucco, failures fell between 20° and 45° from the surface.

Choose the tip size here too. The tip radius should be well below the size of the features the surface offers ([Scaling](../fundamentals/scaling.md)).

## Step 2: choose the mechanism

Pick a suspension whose behaviour approximates a stretchable stalk ([The stalk model](stalk-model.md)). Whatever its construction, it should:

- give loading lines that are nearly radial in force space, curving toward the shear axis if at all;
- ideally soften as it approaches full extension;
- hold the spine's orientation as it stretches;
- have a stop that releases the spine at the end of its travel;
- let a spine withdraw from a pit or crack without jamming.

The [RiSE toe](toe-designs.md) does all of these except the softening.

## Step 3: set the parameters

Work through them in this order.

1. **Travel along the wall, $\Delta y_{max}$.** It must exceed the typical asperity spacing $\lambda$, so that neighbours of an engaged spine have room to find their own ledges. The RiSE toe has 9 to 11 mm.
2. **Axial stiffness, $k_r$.** Choose it so that the shear force reaches the contact strength at about full travel:
   $$
   k_r \approx \frac{F^*}{\Delta y_{max}}
   $$
3. **Initial angle, $\theta_0$.** With no preload, the force on a spine that has just begun to stretch should point about 10 % more steeply away from the wall than the surface can sustain. In practice, start with $\theta_0$ a little above $\theta_{max}$ and check the loading lines.
4. **Travel normal to the wall, $\Delta x_{max}$.** Enough to follow the unevenness of the surface under the foot and to pull at angles close to the wall without the base touching it. The RiSE toe has about 8 mm.
5. **Torsional stiffness, $k_\theta$.** As low as possible, but enough to return each toe to its rest position against friction from its neighbours. Check the ratio $\varepsilon = k_\theta / (r_0^2 k_r)$: it should be much less than 1.
6. **Length, $r_0$.** Long enough that the angles above are consistent with the standoff the normal travel requires; longer still if space allows, since load sharing improves with length.

Then compute or measure the loading lines and compare them with the safe region from step 1. Iterate.

## Step 4: count the spines

Decide what fraction $p$ of spines you expect to engage: 0.25 to 0.5 for surfaces you have experience with, 0.2 if the surface is marginal. Engaged spines are stretched by different amounts, so their average load is about half that of the most loaded one. For a foot that must carry $W$:

$$
N \approx \frac{2W}{p\,F^*}
$$

Check that the asperities can take the resulting load per spine. If they cannot, add spines.

Then check the width. Toes have a thickness fixed by how they are made, and a foot that is too wide for the limb catches its edges on the wall when slightly misaligned. If $N$ toes do not fit in one row, use more rows, and read [Arrays, feet and large patches](arrays-and-patches.md) before you do.

## Worked example

A hypothetical 2 kg quadruped climbs stucco-like walls with three feet on the wall at a time. The statics give a worst-case load of 15 N in shear on one front foot, with adhesion at about 12° from the wall.

**Wall.** From drag tests: $\lambda \approx 2$ mm, contacts hold to about 20°, and fail at about 1.5 N with the chosen hooks.

**Mechanism.** A stalk-like toe with an overload stop.

**Parameters.**

| Parameter | Choice | Reason |
|---|--:|---|
| $\Delta y_{max}$ | 10 mm | Five times $\lambda$ |
| $k_r$ | 150 N/m | $1.5\ \text{N} / 0.010\ \text{m}$ |
| $\theta_0$ | 25° | A little above the 20° limit |
| $\Delta x_{max}$ | 8 mm | To follow the surface |
| $r_0$ | 30 mm | Standoff $r_0 \sin\theta_0 = 12.7$ mm covers the normal travel |
| $k_\theta$ | 0.0015 N·m/rad | $\varepsilon = 0.011$ |

These are close to the RiSE toe, which is reassuring: its 191 N/m over 9 to 11 mm gives 1.7 to 2.1 N at the stop, just where contacts with its hooks begin to fail.

**Loading lines.** Put the parameters into the [explorer](stalk-model.md#explore-the-model) or `tools/stalk_model.py`. At full travel the lines end at 18.6°, 15.4°, 12.2° and 9.2° from the wall for preloads of 0, 2, 4 and 6 mm, all inside the 20° limit, and a preload of 4 mm gives the 12° the statics ask for. The force at full travel is 1.4 to 1.5 N, at the contact strength.

**Count.** With $p = 0.3$:

$$
N \approx \frac{2 \times 15}{0.3 \times 1.5} \approx 67
$$

Add a margin for dynamic loads and poor placements, say a factor of 1.5: 100 toes per front foot. If a toe is 1 mm thick that is two rows of 50, each 5 cm wide.

**Preload check.** Ten RiSE toes needed 0.04 to 0.2 N to seat, depending on how they approached the surface. Scaled to 100 toes that is 0.4 to 2 N, which the other feet must supply as extra adhesion while this one is placed. Against loads of 15 N per foot the lower figure is comfortable and the upper one is not negligible, so approach at an angle. A patch of thousands of toes makes this a first-order concern ([Arrays, feet and large patches](arrays-and-patches.md#preload-adds-up)).

## Then test

No part of this procedure removes the need to measure. Build one row and:

1. measure its loading lines on a bar ([Test methods](../testing/test-methods.md#characterising-a-linkage));
2. drag it over the real surface and record a force trace;
3. map its limit curve on that surface;
4. only then build feet.

## Checklist

- Tip radius is well below the feature size of the smoothest target surface.
- Travel along the wall exceeds the asperity spacing.
- Force at the overload stop is at or just below the contact strength.
- Loading lines lie inside the surface's safe region over the working range of preload.
- Loading lines pass near the origin and do not curve away from the shear axis.
- Normal force at zero shear is positive, so freed spines can re-engage.
- The spine does not rotate more than about 15° over the full travel.
- No hard part of the toe can touch the wall before the spine does.
- A stop limits travel in every direction and prevents tangling.
- Soft-to-hard joints are shaped to avoid peeling.
- Spine count covers the worst-case load with the expected engagement fraction and a margin.
- Total preload is small compared with the adhesion available from the other feet.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
