---
description: The symbols, sign conventions and terms used across the wiki, in one place.
status: draft
---

# Notation and glossary

The literature on spines uses several notations. This wiki keeps to one, listed here with the equivalents you will meet in the sources.

## Axes and signs

- $x$ is normal to the wall, positive away from it. $y$ runs along the wall, positive upward.
- $F_s$, shear, is the force of the wall on the spine along the wall. It is positive when the wall is holding the spine up, which is the normal loaded state.
- $F_n$, normal force, is positive when the spine is pressed into the wall and **negative when the spine pulls out of the wall**. Negative $F_n$ is adhesion.
- Angles of a force or of a stalk are measured **from the wall**. A pull at 0° is pure shear; a pull at 90° is straight out.
- Force-space plots put $F_s$ on the horizontal axis and $F_n$ on the vertical, so adhesion is downward.

## Symbols

| Symbol | Meaning | Also written |
|---|---|---|
| $r_s$ | radius of the spine tip | |
| $\theta_a$ | angle at which the spine approaches the wall | |
| $\theta$ (surface) | angle of the local surface normal from the wall's outward normal; 90° is a perfect shelf | |
| $\theta_{min}$ | smallest surface angle that holds a spine under a given load direction | |
| $\theta_{load}$ | angle of the load on a spine, from the wall | |
| $\theta_{max}$ | largest load angle a contact, or a surface, sustains: the adhesion limit | $\alpha = \tan\theta_{max}$ in [Asbeck & Cutkosky 2012][asbeck2012] |
| $\mu$ | coefficient of friction between spine and surface | |
| $F^*$ | load at which a spine–asperity contact fails | $F_{max}$ in [Asbeck & Cutkosky 2012][asbeck2012] |
| $\lambda$ | average spacing of usable asperities along the drag direction | |
| $h$ (surface) | range of asperity positions normal to the wall | |
| $k_{xx}, k_{xy}, k_{yy}$ | stiffness of a suspension at the spine tip | |
| $\Delta x_{max}, \Delta y_{max}$ | travel of a suspension normal to and along the wall | |
| $F_{x,max}$ | force to push a spine through its full normal travel | |
| $r_0$ | rest length of the stalk in the stalk model | $l_0$ in [Asbeck 2010][asbeck2010] |
| $\theta_0$ | rest angle of the stalk from the wall | |
| $\theta_p$ | preload angle of the stalk's torsion spring | $\theta_{preload}$ in [Asbeck 2010][asbeck2010] |
| $k_r$ | axial stiffness of the stalk | $k_{ext}$ in [Asbeck 2010][asbeck2010] |
| $k_\theta$ | torsional stiffness at the base of the stalk | |
| $\varepsilon$ | $k_\theta / (r^2 k_r)$, ratio of torsional to axial stiffness | |
| $p$ | fraction of spines in an array that engage | |
| $N$ | number of spines | |
| $W$ | weight | |
| $h$ (climber) | distance of a climber's centre of mass from the wall | |
| $L$ | height of a climber's hands above its feet | |
| $T$ | pull into the wall required at the hands | |
| $x_j$ | distance of a patch's joint from the wall | |
| $k_\psi$ | torsional stiffness of a patch's joint against side-to-side tilt | |
| $w_z$ | width of a patch | |
| $d_z$ | sideways offset of the resultant force on a patch from its joint | |
| $\kappa$ | normal stiffness of the elements of a patch, per unit width | |
| $\gamma_{max}$ | normal force per unit width at which the elements of a patch let go | |

Two symbols, $h$ and $\theta$, each have two meanings. The context makes clear which is meant.

## Terms

**Adhesion.** A force holding the spine, or the climber, toward the wall. For spines it exists only together with shear.

**Adhesion limit.** The boundary of the safe region beyond which a spine slides off its ledge: a straight line through the origin of force space at $\theta_{max}$.

**Ankle.** A compliant joint between a group of toes and the limb, free in rotation and stiff in translation.

**Asperity.** A bump, pit or ledge on a surface. A *usable* asperity is one a given spine can rest on and be loaded from.

**Base.** The part that a group of suspensions is attached to: the foot, or the moving part of a test stage.

**Contact strength.** See $F^*$.

**Directional adhesion.** Adhesion that depends on the direction of loading, appearing with shear in one direction and vanishing when the load is relaxed or reversed.

**Dynamic adhesion.** Adhesion maintained while the array slides, as individual spines let go and re-engage.

**Engagement.** A spine coming to rest on an asperity and beginning to carry load.

**Force space.** The plane of shear force against normal force.

**Frictional adhesion.** The model of gecko attachment in which adhesion is proportional to shear and the limit passes through the origin. Spines behave the same way.

**Limit curve.** The boundary of the safe region in force space. For forces and moments together, the *limit surface*.

**Linearly constrained spine.** A spine that slides normal to the surface in a housing, soft in that direction and stiff in others. Used for dense arrays.

**Load sharing.** Distribution of the total load among engaged spines, in magnitude and in direction.

**Loading line.** The path in force space of a spine's tip force as it is stretched along the wall with the base at a fixed distance from the wall.

**Microspine.** A small, sharp, non-penetrating spine on a compliant suspension, used in arrays.

**Opposed array.** Two or more groups of spines loaded against each other, so that the array supplies its own shear.

**Overload protection.** A stop that releases a spine before it, its suspension or its asperity is damaged.

**Patch.** A two-dimensional array of spines or adhesive elements on a common backing.

**Preload.** The force, or the displacement, with which a spine or array is pressed against the wall before it is loaded.

**Re-engagement.** A spine that has slipped catching again while the rest of the array is still loaded.

**Safe region.** The set of forces a contact, or an array, sustains.

**SDM.** Shape Deposition Manufacturing: building a part by alternately machining and casting, with components embedded.

**Spine.** In this wiki, the sharp element itself, usually a steel hook.

**Stalk model.** A two-spring model of a spine suspension: a stretchable stalk pinned at both ends, with a torsion spring at the base.

**Suspension.** The compliant mechanism between a spine and the base.

**Toe.** One spine together with its suspension.

**Traced surface.** The path followed by the centre of a spine tip rolled over a surface profile: the surface as that spine sees it.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
