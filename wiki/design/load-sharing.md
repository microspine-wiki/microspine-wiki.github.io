---
description: Spines on one foot catch at different heights, so they are stretched by different amounts. Good suspensions make them pull at the same angle and with nearly the same force anyway. This page explains how, and how to measure the shortfall.
status: draft
---

# Load sharing

Spines in a row share one base but each catches wherever its ledge happens to be. The one that caught first is stretched most; the one that caught last has barely begun to carry load. Load sharing is about making that spread harmless. There are two separate goals ([Asbeck 2010][asbeck2010], §3.5.1):

1. **Keep the largest force small.** No spine should approach the strength limit $F^*$ while its neighbours are idle.
2. **Keep the force directions parallel.** No spine should approach the adhesion limit $\theta_{max}$ while its neighbours have angle to spare.

## Loading lines

Because all spines in a row are attached to the same base, they are all the same distance from the wall. They differ only in how far each has been stretched along it. Hold the base at a fixed distance from the wall, vary the stretch, and the tip force traces a curve in [force space](../fundamentals/limit-curve.md). That curve is the **loading line** for that base distance. At any instant every engaged spine in the row sits somewhere on the same loading line, the early ones far out along it, the late ones near its start.

Moving the base toward or away from the wall selects a different loading line. A suspension is characterised by its family of loading lines, and they are easy to measure ([Test methods](../testing/test-methods.md#characterising-a-linkage)).

## Goal 2 first: radial loading lines

![Two force-space panels with the same adhesion limit. Left: three spines on a straight loading line that misses the origin pull at three different angles, and the least-stretched one lies outside the limit. Right: three spines on a loading line through the origin all pull at the same angle and all lie inside the limit.](../assets/figures/load-sharing.svg)

*Three spines on one foot, stretched by different amounts. Whether they pull at one angle or three depends on the shape of the loading line.*

If the loading line is a straight ray from the origin, every spine on it pulls at the same angle, however much or little it is stretched. The whole row then reaches the adhesion limit at the same moment, and it does so on any surface, whatever that surface's $\theta_{max}$ happens to be. This is the ideal.

If the loading line misses the origin, as it does for a suspension with constant stiffness, spines at different stretches pull at different angles. The row can then only be loaded until the *worst-placed* spine reaches the limit. The others still have margin they cannot use, and the row as a whole lets go at a shallower angle than its contacts could individually sustain.

In terms of stiffness, a radial loading line at angle $\theta$ requires, for base motion along the wall,

$$
\frac{|k_{xy}|}{k_{yy}} = \tan\theta, \qquad k_{xy} < 0
$$

at every point along the line. A full family of radial lines, one for each base distance, also needs zero normal stiffness at zero load, which no real mechanism has. The practical target is $F_{x,max} \ll F^*$: normal forces at light load that are negligible next to the forces the spine will carry.

### Bending the right way

Real loading lines are curved. The direction of the curve matters ([Asbeck 2010][asbeck2010], §4.3.1).

Take a foot that has been loaded in shear and is then pulled away from the wall, as happens to the upper feet of a climbing robot. Some spines will exceed their ledges' limits and come off, and their load passes to the rest.

- If loading lines **curve up, toward the shear axis**, the steepest pull belongs to the *least-loaded* spines. They slip first, shed little load, and the others absorb it easily.
- If they **curve down**, the steepest pull belongs to the *most-loaded* spines. When those slip, a large load lands on the remainder, pushing more of them over the limit. The failure can cascade until the foot comes off.

Curving up has two further advantages. Real limit curves bend the same way, because asperities are stronger when pulled along the wall, so an upward-curving loading line follows the boundary of the safe region. And at light load such a line points more steeply away from the wall, so spines sitting on poor ledges are pulled off early and get a chance to find better ones.

The RiSE toe curves up. A parallel four-bar toe tested alongside it curved down ([Toe designs](toe-designs.md#parallel-four-bar-toe)).

## Goal 1: softening springs

For the forces to be nearly equal despite unequal stretch, force must rise quickly at first and then level off. A suspension that is stiff at small extension and soft at large extension does this: once a spine has stretched a little it carries nearly its full share, and further stretch adds little.

A convenient measure is

$$
\text{load-sharing ratio} = \frac{\text{largest force on any engaged spine}}{\text{average force on the engaged spines}}
$$

which is 1 when sharing is perfect. With linear springs the worst moment is just after the second spine catches: it carries almost nothing, so the ratio is 2. In a simulation of five spines catching 1.25 mm apart, a stalk whose axial spring followed a square-root law gave much more even loads through the whole stroke than the same stalk with a linear spring ([Asbeck 2010][asbeck2010], §4.5).

The RiSE and Z-Man toes do **not** have this softening behaviour: their shear stiffness is close to constant. It is the most obvious improvement still open ([Open questions](../reference/open-questions.md)).

## How much is lost: the RiSE toe as an example

One way to put a number on non-ideal loading lines is to ask by how many degrees the usable adhesion limit of the row is reduced, compared with a row whose spines all pull at the same angle.

For the RiSE toe, computed from its measured loading lines with ten spines spread evenly along their travel, the loss is less than 1° when the spines are at half their maximum load and less than 2.5° at full extension ([Asbeck 2010][asbeck2010], §4.4). This is a conservative figure, since spines that happen to catch at similar heights lose nothing.

Simulations with the [stalk model](stalk-model.md) show the trends:

- **Longer stalks lose less.** A given stretch rotates a long stalk less, so the loading line is straighter. The cost is packing density if there are several rows.
- **Smaller initial angles lose less.**

## Re-engagement and dynamic adhesion

A spine that slips is not lost if it can catch again. For that the base must be close enough to the wall that the freed spine, back at its rest position, still presses on the surface ([What the suspension must do](suspension-requirements.md#re-engaging-catching-again-after-a-slip)).

Loading lines show directly when this is possible. Follow the group's current loading line back to zero shear. If the normal force there is positive, a freed spine touches the wall and can re-engage. If it would be negative, the foot has been pulled so far out that a relaxed spine hangs in the air. With upward-curving lines this happens when the foot is loaded at steep angles. The remedy is to bring the foot back toward pure shear, or to lift it and place it again.

When re-engagement works, the result is **dynamic adhesion**: the row keeps holding while individual spines let go, spring back and catch again. Ten RiSE toes dragged 4 cm across roofing paper at constant height, four times the travel of a single toe, held at least 1 N of adhesion and 2.5 N of shear throughout. In four further trials over 6 cm, adhesion never fell quite to zero, with two to five spines engaged at a time ([Asbeck 2010][asbeck2010], §4.7). On the RiSE robot, feet slip a little almost continually, and this is what turns each slip into a non-event.

A spine that releases at full stretch snaps back along the wall faster than its weak normal spring can press it down, so it normally returns all the way to rest before catching again.

## Choosing where to hold

Asperities differ in the angle they can sustain. A foot that will need adhesion wants its spines on the good ones. Two tactics follow from the shape of the loading lines ([Asbeck 2010][asbeck2010], §4.3.4):

- Load lightly at a steep angle first. Spines on poor ledges slip and move on; those that stay are on ledges that can hold that angle. Then increase the load.
- Use a suspension whose loading lines curve up. It does the same thing passively: steep at light load, flatter as load grows.

The cost of being selective is that fewer spines engage.

## Checklist

- Loading lines pass close to the origin and are as straight as possible.
- Where they curve, they curve toward the shear axis.
- Normal force at zero shear is positive over the working range, so freed spines touch the wall.
- Shear stiffness falls as the spine stretches, or at least does not rise.
- Travel along the wall exceeds the typical spacing between asperities, and a stop releases the spine at the end of it.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
