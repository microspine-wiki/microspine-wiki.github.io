---
description: Plot the force on a spine with shear on one axis and normal force on the other, and the loads it can hold fill a wedge that starts at the origin. That wedge, the limit curve, is the most useful single picture for designing and controlling spine feet.
status: draft
---

# Force space and the limit curve

A spine contact is described by two force components. Throughout this wiki:

- $F_s$, **shear**, acts along the wall. It is positive when the wall is holding the spine up.
- $F_n$, **normal**, is positive when the spine is pressed into the wall and negative when it is pulling out of it. A negative $F_n$ is what is meant by *adhesion*.

Plot one against the other and you have *force space*. The set of forces a contact can sustain is its *safe region*, and the boundary of that region is the *limit curve* ([Asbeck 2010][asbeck2010], §2.4; [Asbeck & Cutkosky 2012][asbeck2012], §3).

![Force space with shear on the horizontal axis and normal force on the vertical axis. A wedge-shaped safe region starts at the origin. It is bounded by a steep friction limit on the left, a straight adhesion limit sloping down at angle theta-max, and a circular strength limit of radius F-star.](../assets/figures/limit-curve.svg)

*The safe region of one spine–asperity contact and its three boundaries.*

## Three boundaries

**The adhesion limit.** Pull the spine farther from the wall and it slides off its ledge. A ledge whose normal is at angle $\theta$ holds loads up to $\theta_{max} = \theta - \arctan(1/\mu)$ from the wall ([Spine–asperity contact](spine-asperity-contact.md#the-friction-condition)), so in force space the boundary is a straight line through the origin:

$$
-F_n \;\le\; F_s \tan\theta_{max}
$$

Some papers write the slope as $\alpha = \tan\theta_{max}$.

**The strength limit.** The spine bends, its tip rotates off, or the asperity breaks. As a first approximation this is a circle around the origin:

$$
\sqrt{F_s^2 + F_n^2} \;\le\; F^*
$$

$F^*$ is called $F_{max}$ in [Asbeck & Cutkosky 2012][asbeck2012]. The true boundary is not quite circular. An asperity presents its largest cross-section to a pull along the wall, so contacts are strongest in pure shear and weaker as the pull swings outward, and the corner between the adhesion limit and the strength limit is rounded off.

**The friction limit.** If the spine is dragged the other way, back up the wall, it is not hooked on anything and ordinary Coulomb friction applies: $-F_s \le \mu F_n$.

## What the wedge tells you

**Adhesion has to be paid for with shear.** The safe region touches the $F_n$ axis only at the origin. A spine cannot pull outward at all unless it is also loaded along the wall, and the more shear it carries the more adhesion it can supply, up to the strength limit. A foot at the top of a climber, which must pull in to stop the body tipping backward, is therefore forced to carry a share of the weight as well. [Sizing spine pads for a limbed climber](../climbing/sizing-a-limbed-climber.md) works out what that costs.

**Letting go is free.** Because the region passes through the origin, relaxing the load brings the contact back to zero force and the spine lifts away in roughly the direction it arrived from. No peeling force, no stored energy released into the structure, no jolt. Gecko setae behave the same way, which is why this is called *frictional adhesion* ([Autumn 2006][autumn2006]). An adhesive tape, by contrast, has a limit curve that does not pass through the origin and must be peeled.

**The path matters.** A foot traces a path in force space as it is loaded. A good path stays just inside the adhesion limit and well short of the strength limit, and a good release retraces it. See the loading cycle in [What the suspension must do](../design/suspension-requirements.md#one-cycle-step-by-step).

## A measured limit curve

Ten RiSE toes were mounted on a motion stage over a force plate carrying roofing paper. In each trial they were pressed into the surface to one of three depths (1.5, 4.0 or 6.5 mm) and then dragged in a direction that was varied from parallel to the surface to steeply away from it. The largest force reached in each trial is one point in the plot below.

![Scatter plot in force space titled Limit curve for roofing paper, 10 spines. Points from regular and glued roofing paper lie in a fan below the shear axis between dashed lines at 20 and 45 degrees. Shaded bands mark the safe region, bounded by a friction limit, a theta-max limit and an F-star limit.](../assets/thesis/asbeck2010-fig2-11-limit-curve-roofing-paper.png)

*Largest forces sustained by ten RiSE toes on roofing paper. Red crosses: plain paper. Blue dots: paper whose granules were secured with cyanoacrylate glue. Figure 2.11 of [Asbeck 2010][asbeck2010], © Alan T. Asbeck, [CC BY-NC-ND 3.0 US](https://creativecommons.org/licenses/by-nc-nd/3.0/us/).*

What the measurement shows:

- **Failures fall between two angles.** Almost all points lie between 20° and 45° from the shear axis. The shallower line is a conservative adhesion limit for this surface; the steeper one is about the best that can be hoped for.
- **Securing the granules raised the strength limit and left the angles alone.** With glue the points reach farther from the origin, within the same fan. Geometry sets the angle; the strength of the wall sets the radius.
- **More preload and a flatter pull gave larger forces.** Dragging parallel to the surface produced more than pulling away at a steep angle.
- **Ten spines held shear forces of the order of 10 to 20 N** on the glued paper. Usually several spines were engaged at once and the group was limited by asperities failing.

## From one contact to a group

Each asperity has its own $\theta_{max}$ and its own strength, so each contact has its own wedge. A group of spines on one foot does not see the envelope of all of them. It sees something closer to the average, for two reasons.

First, a spine that slips off a poor ledge keeps sliding and may catch a better one, so the group as a whole can find its way to steeper angles than a single placement would suggest. Second, as the number of spines grows, the scatter of the group's limit shrinks. A foot with a few spines behaves like a gamble; a foot with hundreds behaves like a material with a known strength and a known limiting angle.

The group limit is larger at shallow angles than at steep ones. More asperities can hold a shallow pull than a steep one, so more spines are engaged, and each asperity is stronger when pulled along the wall.

How close a real foot gets to the limit of its individual contacts depends on whether all its spines pull at the same angle. That is the subject of [Load sharing](../design/load-sharing.md).

## Preload: the ratio μ′

The force needed to seat the spines is small compared with what they then hold. For the ten toes above, an angled approach needed about 0.04 N before adhesion began, and a perpendicular approach about 0.2 N, against about 5 N of adhesion: ratios of adhesion to preload of 125 and 25. For gecko setae the published figure is 8 to 16 ([Asbeck 2010][asbeck2010], §4.6).

Low preload matters more than it might seem. Whatever force presses a new foot into the wall has to be supplied as extra adhesion by the feet already attached, which eats directly into their margin ([Arrays, feet and large patches](../design/arrays-and-patches.md#preload-adds-up)).

## The same picture for dry adhesives

Directional dry adhesives have a limit surface of the same shape: a maximum loading angle and a maximum force, passing through the origin ([Santos 2007][santos2007]). Much of what is said about suspensions for spine arrays carries over to patches of such adhesives, which is how chapter 5 of the thesis treats them ([Arrays, feet and large patches](../design/arrays-and-patches.md)).

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
[autumn2006]: ../reference/bibliography.md#autumn2006
[santos2007]: ../reference/bibliography.md#santos2007
