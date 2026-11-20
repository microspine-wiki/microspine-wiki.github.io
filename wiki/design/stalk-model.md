---
description: A spine toe can be modelled as a stretchable stalk, pinned at the tip and at the base, with a stiff axial spring and a weak torsion spring. Five numbers describe it, and they predict the measured behaviour of the RiSE toe well enough to design with.
status: draft
---

# The stalk model

The toe mechanisms used on RiSE and for Z-Man look complicated, but in the plane of the wall normal they behave like something much simpler: a stalk that can stretch along its length and that is pushed gently toward the wall by a spring at its base. The model was introduced in [Asbeck 2010][asbeck2010] (§4.2.3) and is the basis of the design method in [Asbeck & Cutkosky 2012][asbeck2012].

![A stalk runs from a pin at the spine tip on the wall down to a pin at the base. At rest it has length r-zero and makes angle theta-zero with the wall. After the base is moved toward the wall and down it, the stalk is longer and steeper. A spring k-r along the stalk resists stretching and a weak torsion spring k-theta at the base presses the tip toward the wall. The wall applies shear and adhesion to the tip.](../assets/figures/stalk-model.svg)

*The model. The base is the foot of the robot; the tip is a pin on its ledge.*

## Definition

The stalk has rest length $r_0$ and at rest makes an angle $\theta_0$ with the wall, the tip above the base. Two springs act on it:

- an **axial spring** $k_r$ along the stalk, which carries the load;
- a **torsion spring** $k_\theta$ at the base, which turns the stalk toward the wall. It has a small preload angle $\theta_p$, so that the tip presses on the wall even at rest.

When the stalk has length $r$ and angle $\theta$, the wall exerts on the tip

$$
\begin{bmatrix} F_n \\ F_s \end{bmatrix}
=
\begin{bmatrix} -\sin\theta & -\tfrac{1}{r}\cos\theta \\ \cos\theta & -\tfrac{1}{r}\sin\theta \end{bmatrix}
\begin{bmatrix} k_r\,(r - r_0) \\ k_\theta\,(\theta - \theta_0 - \theta_p) \end{bmatrix}
$$

Read the two terms separately. Tension in the stalk, $k_r(r-r_0)$, acts along it: mostly shear, plus a pull out of the wall that grows with $\sin\theta$. The torsion spring contributes a small force across the stalk, $k_\theta(\theta_0+\theta_p-\theta)/r$, that presses the tip into the wall whenever $\theta < \theta_0 + \theta_p$.

The geometry follows from where the base is. If the base is a distance $x$ from the wall and a distance $y$ below the tip,

$$
r = \sqrt{x^2 + y^2}, \qquad \theta = \arctan\!\left(\frac{x}{y}\right)
$$

## Why the stiffness comes out right

Define the ratio of the two stiffnesses, made dimensionless with the stalk length:

$$
\varepsilon = \frac{k_\theta}{r^2 k_r}
$$

For small motions about a configuration $\theta$, the stiffness matrix at the tip is

$$
K = k_r
\begin{bmatrix}
\sin^2\theta + \varepsilon\cos^2\theta & (\varepsilon - 1)\sin\theta\cos\theta \\
(\varepsilon - 1)\sin\theta\cos\theta & \cos^2\theta + \varepsilon\sin^2\theta
\end{bmatrix}
$$

If $\varepsilon \ll 1$ and the stalk lies at a modest angle to the wall, this has exactly the pattern asked for in [What the suspension must do](suspension-requirements.md): $k_{xx}$ small, $k_{yy}$ close to $k_r$, and $k_{xy}$ negative and moderate. A stalk also keeps the spine's orientation nearly fixed when it is long compared with its normal travel.

For the RiSE fit below, $\varepsilon \approx 0.009$.

## Parameters fitted to the RiSE toe

| Parameter | Symbol | Journal paper | Thesis |
|---|---|--:|--:|
| Stalk length | $r_0$ | 3.0 cm | 3.0 cm |
| Initial angle from the wall | $\theta_0$ | 30° | 30° |
| Preload angle | $\theta_p$ | 3° | 3° |
| Axial stiffness | $k_r$ | 191 N/m | 184 N/m |
| Torsional stiffness | $k_\theta$ | 0.0015 N·m/rad | 0.0025 N·m/rad |

The two sources report slightly different fits to the same toe ([Asbeck & Cutkosky 2012][asbeck2012], §5.1; [Asbeck 2010][asbeck2010], Table 4.1). With either set the model follows the measured forces closely; the main difference is hysteresis in the polyurethane, which the model does not have. The figures and the explorer on this page use the journal values.

In the real toe, $k_r$ comes from the two shear flexures acting in parallel and $k_\theta$ from the soft normal flexure acting on a lever arm ([Toe designs](toe-designs.md)). The Z-Man toe uses the same layout with $r_0 = 4.6$ cm and stiffer flexures; its fitted parameters have not been published.

## Loading lines

To predict a loading line, the base is first pressed toward the wall by a preload depth and then dragged down the wall. The curves below assume that during the preload the tip is free to slide, so the stalk keeps its length and only swings toward the wall, and that the tip is pinned from the moment the drag begins. This reproduces the published test, in which the toes caught on a bar after being pressed in ([Test methods](../testing/test-methods.md#characterising-a-linkage)).

![Three force-space panels for initial stalk angles of 15, 30 and 45 degrees. Each shows four loading lines, for preloads of 0, 2, 4 and 6 millimetres, fanning out from near the origin as the base is dragged 8 millimetres. Reference rays mark 10, 20 and 30 degrees from the wall.](../assets/figures/stalk-loading-lines.svg)

*Loading lines of the stalk model with the RiSE parameters, and with the initial angle changed to 15° and 45°. Each line is one preload depth; the dot marks 8 mm of drag. Dashed rays show constant angles from the wall.*

Things to notice:

- **The lines are nearly radial.** Each stays close to one of the dashed rays, which is what [load sharing](load-sharing.md) asks for.
- **They curve slightly toward the shear axis.** As the base is dragged, the stalk swings into line with the wall and the pull becomes more nearly pure shear. This is the benign direction of curvature.
- **Preload selects the angle.** Pressing the base closer to the wall gives a flatter line. With the RiSE parameters the lines span roughly 13° to 24° at 8 mm of drag.
- **$\theta_0$ moves the whole fan.** At 15° the toe works close to pure shear and offers little adhesion. At 45° it can only pull steeply; on a surface whose contacts fail beyond 20° it would be loaded outside the safe region at any preload.

<details>
<summary>Values at 8 mm of drag (table)</summary>

| $\theta_0$ | Preload | $F_s$ (N) | $F_n$ (N) | Angle from the wall |
|--:|--:|--:|--:|--:|
| 15° | 0 mm | 1.46 | −0.30 | 11.7° |
| 15° | 6 mm | 1.52 | −0.06 | 2.3° |
| 30° | 0 mm | 1.25 | −0.55 | 23.5° |
| 30° | 6 mm | 1.43 | −0.34 | 13.3° |
| 45° | 0 mm | 0.95 | −0.68 | 35.6° |
| 45° | 6 mm | 1.25 | −0.54 | 23.5° |

</details>

## Explore the model

<!-- widget: stalk-model -->

Drag the sliders to see how each parameter moves the loading lines. The shaded wedge is the safe region for an adhesion limit you choose; a loading line that leaves the wedge means spines at that preload would slide off before reaching full stretch.

## What each parameter does

These trends come from the simulations in [Asbeck 2010][asbeck2010] (§4.8) and the design notes in [Asbeck & Cutkosky 2012][asbeck2012] (§6).

**Initial angle $\theta_0$.** The stalk starts at $\theta_0$ and swings toward the wall as it is loaded, so the tip force ends up at a somewhat smaller angle. For the toe to work with $\theta < \theta_0$, which it must for [re-engagement](load-sharing.md#re-engagement-and-dynamic-adhesion), $\theta_0$ has to exceed the adhesion limit of the surface: $\theta_0 > \theta_{max}$. If it is too small, part of the safe region is out of reach. If it is much too large, the stalk must swing a long way before its pull is shallow enough to hold, and the base may hit the wall first. A workable rule: with no preload, the first force on the tip should point about 10 % steeper than the surface's $\theta_{max}$.

**Torsional stiffness $k_\theta$.** Raising it lifts every loading line toward the shear axis. A large enough value gives pure shear at full preload and stretch, which is useful for rear feet that are pressed against the wall anyway, but it raises the preload force, to nearly 0.4 N per spine in one simulated case. Where adhesion is needed, keep $k_\theta$ as low as inter-toe friction allows.

**Axial stiffness $k_r$.** Sets how fast force builds with drag. Choose it so that the force reaches the contact strength $F^*$ at about full travel.

**Stalk length $r_0$.** A longer stalk rotates less for the same drag, so its loading lines are straighter and load sharing improves, and the spine's orientation changes less. The cost is space: longer toes pack fewer rows into a foot. There is also a lower limit. The base must sit at least the normal travel away from the wall, plus material around the pivot pin, about 9 to 10 mm for the RiSE toe. Shorten the stalk at that standoff and $\theta_0$ becomes too steep. The practical minimum is a few centimetres, about the length the RiSE toe already has.

**Travel.** Not a stalk parameter, but it belongs here. Travel along the wall must exceed the typical spacing between asperities, and a stop must release the spine at the end of it ([Toe designs](toe-designs.md#overload-protection)). The stop also limits the range of angles the toe can use; RiSE added an [ankle](toe-designs.md#an-ankle-widens-the-range) to widen it.

## Code

A reference implementation in Python is in the repository at `tools/stalk_model.py`. The core is four lines:

```python
x = r0 * sin(theta0) - preload          # base distance from the wall
y = r0 * cos(asin(x / r0)) + drag       # base distance below the tip
r, theta = hypot(x, y), atan2(x, y)
axial, lateral = kr * (r - r0), ktheta * (theta0 + thetap - theta) / r
Fs = axial * cos(theta) + lateral * sin(theta)
Fn = -axial * sin(theta) + lateral * cos(theta)
```

## Limits of the model

- It is planar and quasi-static. It says nothing about toes twisting out of plane or tangling with neighbours.
- It has no hysteresis, no damping and no stops. Real toes have all three.
- Its axial spring is linear, like that of the RiSE toe. A softening spring would share load better ([Load sharing](load-sharing.md#goal-1-softening-springs)); adding one to the model is a one-line change and a good experiment.
- Rotation of the spine itself is not checked. It was not measured on the test stage either.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
