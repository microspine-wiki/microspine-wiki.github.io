---
description: Each spine sits on a small spring mechanism. This page sets out what that mechanism has to do in each phase of a step, and turns those jobs into requirements on its stiffness.
status: draft
---

# What the suspension must do

A rigid row of spines is nearly useless: the first spine to catch would take the whole load while its neighbours hung in the air. Each spine therefore gets its own **suspension**, a small compliant linkage between the spine and the foot. Its job is to let every spine find its own ledge and then to make the ones that found a ledge share the load.

This page follows the analysis in chapter 3 of [Asbeck 2010][asbeck2010] and §3 of [Asbeck & Cutkosky 2012][asbeck2012].

## Coordinates and symbols

Put the origin at the spine tip, $x$ normal to the wall (positive away from it) and $y$ along the wall (positive up). The tip is treated as a pin on its ledge: it can carry force, not moment. The part of the robot that the suspensions are attached to is called the **base**. All spines in a group share one base and are otherwise independent.

Near any configuration the suspension is described by a stiffness matrix relating small base motions to changes in tip force:

$$
\begin{bmatrix} \delta F_n \\ \delta F_s \end{bmatrix}
=
\begin{bmatrix} k_{xx} & k_{xy} \\ k_{xy} & k_{yy} \end{bmatrix}
\begin{bmatrix} \delta x \\ \delta y \end{bmatrix}
$$

A full treatment adds rotation of the spine, with terms $k_{x\theta}$, $k_{y\theta}$ and $k_{\theta\theta}$. For an elastic mechanism the matrix is symmetric, and in general it changes as the mechanism moves.

Four characteristic quantities come from the wall and the spine:

| Symbol | Meaning |
|---|---|
| $\lambda$ | average distance between usable asperities along the direction of drag |
| $h$ | range of asperity positions normal to the wall, much smaller than $\lambda$ |
| $F^*$ | load at which a typical spine–asperity contact fails |
| $\theta_{max}$ | largest angle from the wall at which contacts still hold |

and three from the suspension: its travel $\Delta x_{max}$ normal to the wall, its travel $\Delta y_{max}$ along it, and $F_{x,max}$, the force needed to push a spine through its full normal travel.

## Two kinds of compliance

- **Normal compliance** lets every tip reach the wall even though the wall is uneven and the foot is never perfectly parallel to it. The travel must cover the unevenness: $\Delta x_{max} \ge h$.
- **Shear compliance** lets the foot keep moving after the first spine has caught, so that the others can go on searching. The travel must be at least the distance to the next ledge: $\Delta y_{max} \ge \lambda$.

Normal travel should be cheap, so that seating the spines takes almost no force: $F_{x,max} \ll F^*$. Shear travel should build force, since that is how the spine comes to carry load.

## One cycle, step by step

![Left: a foot approaches a wall, its spine touches and drags down until the tip catches a ledge, and the suspension stretches as the foot keeps moving. Right: the same sequence drawn as a path in force space, leaving the origin, rising along a loading curve inside the safe region, and ending either at the adhesion limit or at the strength limit.](../assets/figures/loading-cycle.svg)

*One spine through one cycle. Numbers match between the two panels.*

1. **Approach.** The foot moves toward the wall. No force.
2. **Touch and drag.** The tip meets the wall and is pressed against it very lightly, then dragged down it. There is a small positive normal force and a little friction.
3. **Catch.** The tip drops onto a ledge and stops. The foot keeps moving.
4. **Load.** The suspension stretches. Shear force builds, and because of the way the linkage is arranged the normal force falls through zero and becomes adhesion. The contact moves out along a *loading curve* in force space.

From here three things can happen:

5. **The foot is pulled away from the wall.** Adhesion rises at about constant shear until the contact crosses the adhesion limit and the tip slides off its ledge.
6. **The foot is pulled too hard.** The contact approaches the strength limit. A well-designed toe has a mechanical stop that releases the spine before anything breaks ([overload protection](toe-designs.md#overload-protection)).
7. **The load is relaxed**, usually by moving the foot a little way back up the wall. The contact returns to the origin and the spine lifts off.

When a spine comes off for either of the first two reasons while its neighbours are still holding, it springs back to its rest position and, if the foot is close enough to the wall, starts again at step 2.

## Requirements, state by state

A spine is always in one of four states, and each asks something different of the stiffness matrix.

### Unattached: tracing the wall

The spine must follow the surface closely, reaching into pits, without building up force. Two requirements conflict.

A tip that drops off the edge of a bump is briefly airborne. Treating the spine and its mount as a mass $m$ on a spring $k_{xx}$, it needs about half a period, $\tau \approx \pi\sqrt{m/k_{xx}}$, to come back to the wall, and it should do so before it has passed the next ledge: $\tau\, v_y < \lambda$ for a drag speed $v_y$. That argues for a stiff normal spring, a light spine and a slow drag.

But if half the spines in a row are sitting on high points and fully compressed while the other half are reaching into pits, the compressed ones must not hold the rest off the wall. For a total preload budget this gives $k_{xx} \le 2F_{x,max}/\Delta x_{max}$, and since every newton of preload must be paid for by adhesion elsewhere, $k_{xx}$ should be as low as possible.

In practice the lower limit on $k_{xx}$ is friction between neighbouring toes. Make the normal spring too weak and toes stick to each other and move in clumps.

### Loaded: sharing the load

This is the subject of [Load sharing](load-sharing.md). In brief, the stiffnesses $k_{yy}$ and $k_{xy}$ should be nonlinear, softening as the spine stretches, and $k_{xy}$ should be negative, so that the foot moves toward the wall as load comes on.

### Loaded: staying clear of the wall

The wall is in the way in two senses.

The base cannot pass through it. A linkage that needs a large inward motion of the base to produce shallow loading angles may run out of room, especially where the wall bulges under the foot. Choose a geometry that gives good loading lines within the normal travel actually available.

Parts of the toe may touch it. If the block that holds the spine rotates until it rests on the wall, that new contact carries compressive load and, by equilibrium, the spine tip is levered away from its ledge. The same happens if the shank of the spine itself is rotated onto the surface. The suspension must therefore resist rotation of the spine. Spine angles of 45° to 60° from the wall were found to work best; limiting rotation to 15° (0.262 rad) under full load requires $k_{y\theta} > F^*/0.262$ and $k_{x\theta} > F_{x,max}/0.262$.

### Re-engaging: catching again after a slip

On a real robot spines come off all the time, from vibration, weak asperities or poor ledges. A spine that has slipped returns to its rest position. Whether it can catch again depends on whether, in that position, it still touches the wall. That requires the base to have moved *toward* the wall as the group took up load, which is the meaning of $k_{xy} < 0$. To bring the base in by the full normal travel under a load near $F^*$ takes $k_{xy} \approx F^*/\Delta x_{max}$.

The force with which the freed spine presses on the wall can be read from a plot of loading lines: it is the normal force on the group's current loading line at zero shear. It is small, at most a few hundredths of a newton per spine in the model fitted to the RiSE toe, but it is the same force that seated the spine in the first place.

### Disengaging: coming off cleanly

When the load is relaxed the spines usually slide a little way back up the wall, because they caught at different heights and the foot overshoots. A tip that has worked into a crack must come out along its own axis. If the spine rotates as it is unloaded it can jam. The same rotational stiffness that keeps the toe off the wall under load serves here: $k_{x\theta}, k_{y\theta} > F_{x,max}/0.262$.

## Summary of stiffness requirements

| State | $k_{xx}$ | $k_{yy}$ | $k_{xy}$ | $k_{x\theta}$ | $k_{y\theta}$ |
|---|---|---|---|---|---|
| Unattached | as low as inter-toe friction allows, but high enough to follow the wall | | | | |
| Loaded, load sharing | nonlinear | nonlinear, softening | nonlinear, negative | | |
| Loaded, geometric | | | | $> F_{x,max}/0.262$ | $> F^*/0.262$ |
| Re-engaging | $\le 2F_{x,max}/\Delta x_{max}$ | | negative | | |
| Disengaging | | | | $> F_{x,max}/0.262$ | $> F_{x,max}/0.262$ |

After Table 3.1 of [Asbeck 2010][asbeck2010]. No single linear spring arrangement satisfies all rows, which is why practical toes are linkages with nonlinear behaviour.

## The same list in plain words

[Asbeck & Cutkosky 2012][asbeck2012] (§1 and §6.1) state the requirements without matrices. A spine suspension should:

- spread shear and normal load evenly, so that no spine is damaged and no local failure runs across the array like a peel front;
- keep neighbours independent, so that each spine settles on its own ledge;
- hold the orientation of each spine as load rises, so that it does not rotate off;
- absorb misalignment between the foot and the wall, and curvature of the wall;
- limit the force on any spine, releasing it before it or its mount is damaged;
- let spines withdraw from pits and cracks without jamming;
- bring a spine that has slipped back into contact so it can catch again.

## An ankle above the toes

The analysis assumes the base does not rotate. Real legs twist a little, and some feet are given a deliberate **ankle**: a joint above the group of toes that is free in rotation and stiff in translation. An ankle lets a foot land out of parallel and still seat. It changes little of the above, because the toes are much softer than the ankle, with one exception: load sharing depends on the exact force–displacement behaviour of the toes, so the ankle's compliance has to be included when predicting loading lines. On RiSE an ankle also widened the range of loading angles the foot could use ([Toe designs](toe-designs.md#an-ankle-widens-the-range)).

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
