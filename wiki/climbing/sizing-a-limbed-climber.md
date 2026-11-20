---
description: A climber with spine pads on its hands and feet must pull itself into the wall with its hands, and spines can only pull in while they carry shear. That one fact fixes how the load is split, how far the body may stand off the wall, and how many spines the hands need.
status: draft
---

# Sizing spine pads for a limbed climber

This page works out the loads on the pads of a robot that climbs a vertical wall with a spine pad on each of four limbs, and turns them into spine counts and rules for the gait.

> [!IMPORTANT]
> The analysis on this page is original to this wiki. It is elementary statics combined with the published [limit curve](../fundamentals/limit-curve.md) and [sizing rule](../fundamentals/scaling.md#how-many-spines) for spines. It has not been peer reviewed and has not been validated on hardware. Check it, and please [report](../about/contributing.md) what you find.

## The model

![Two panels. Left: side view of a climber on a vertical wall with its centre of mass a distance h from the wall and its hands a height L above its feet. Weight acts at the centre of mass; the hands are pulled into the wall with force T and the feet pushed out with force N. Right: the force on a hand resolved into a pull T into the wall and a shear V-h up the wall, which must lie within the angle theta-max of the wall.](../assets/figures/climber-statics.svg)

*A: forces on the climber. B: what a spine pad can supply.*

- The wall is vertical. The climber moves slowly enough for statics to apply.
- Its weight $W$ acts at the centre of mass, a distance $h$ from the wall.
- The hands are a height $L$ above the feet.
- Each pad can carry shear only in the direction that pulls its spines down the wall, and can pull into the wall only within an angle $\theta_{max}$ of it. A pad in compression simply presses on its backing.

## Why the hands decide everything

**The body tips backward.** The weight acts away from the wall, so it turns the climber about its feet with a moment $W h$. The feet are below and can only push. The pull that resists tipping must come from above, from the hands:

$$
T = \frac{W\,h}{L}
$$

and the feet push out with the same force.

**Spines pull only when they carry shear.** A pad that must pull in with $T$ has to carry at least

$$
V_h \ge \frac{T}{\tan\theta_{max}}
$$

up the wall at the same time. With $h/L = 1/6$ and $\theta_{max} = 15^\circ$, the hands must carry $0.167 / 0.268 = 62\,\%$ of the weight in shear merely to be allowed to hold the body against the wall. A human climber stands on the feet and steadies with the hands. A spine climber has to *hang* from its hands.

**Changing hands is the worst moment.** When one hand is lifted, the other supplies all of $T$. If the hand being placed presses on the wall with a force $P$, that adds directly to the pull required. The load on the spines of the supporting hand is then

$$
F_{hand} = \frac{W\,h/L + P}{\sin\theta_{max}}
$$

This closed form agrees with a full optimisation over all pad forces ([below](#all-three-stances)).

![Line chart. Horizontal axis: h over L from 0 to 0.5. Vertical axis: load on the supporting hand divided by weight, from 0 to 1.2. Four straight lines through the origin for theta-max of 10, 15, 20 and 30 degrees, each ending where it reaches the whole weight. A ring marks h over L of 0.17 at 15 degrees, at 0.64 of the weight.](../assets/figures/hand-load.svg)

*Load on the single supporting hand, before any preload, as a fraction of the climber's weight.*

<details>
<summary>The same data as a table</summary>

Load on the supporting hand ÷ weight, for $P = 0$. A dash means the stance cannot be held.

| $h/L$ | $\theta_{max}=10^\circ$ | $15^\circ$ | $20^\circ$ | $30^\circ$ |
|--:|--:|--:|--:|--:|
| 0.05 | 0.29 | 0.19 | 0.15 | 0.10 |
| 0.10 | 0.58 | 0.39 | 0.29 | 0.20 |
| 0.15 | 0.86 | 0.58 | 0.44 | 0.30 |
| 0.20 | – | 0.77 | 0.58 | 0.40 |
| 0.25 | – | 0.97 | 0.73 | 0.50 |
| 0.30 | – | – | 0.88 | 0.60 |
| 0.40 | – | – | – | 0.80 |

</details>

Three rules follow at once.

1. **Stay close to the wall and stay stretched out.** The hand load is proportional to $h/L$.
2. **There is a hard limit.** One hand cannot carry more shear than the whole weight, so the stance is impossible when $h/L$ exceeds about $\tan\theta_{max}$: 0.27 at 15°. Keep well inside it.
3. **Preload is expensive.** Each newton with which a new hand is pressed onto the wall costs $1/\sin\theta_{max}$ newtons at the supporting hand: 3.9 N at 15°. Pads must seat by being dragged, with almost no push.

## A worked example

A 30 kg robot, $W = 294$ N, with $h = 0.15$ m, $L = 0.9$ m, $\theta_{max} = 15^\circ$, placing each hand with 5 N.

- Pull needed at the hands: $T = 294 \times 0.15 / 0.9 = 49$ N.
- Supporting hand while the other is moved: $(49 + 5)/\sin 15^\circ = 209$ N, which is 71 % of the weight.

For the spine count, use the [sizing rule](../fundamentals/scaling.md#how-many-spines) with 30 % of spines engaged and contacts that fail at 1.5 N:

$$
N \approx \frac{2 \times 209}{0.3 \times 1.5} \approx 930 \text{ spines per hand}
$$

before any margin for dynamic loads. For comparison, a person of 84 kg has hung from a patch of 1200 toes ([Human-scale climbing](../systems/human-scale-climbing.md#a-patch-of-1200-toes)).

How the count moves with posture and with the surface's limit angle, for the same robot:

| | $L = 0.8$ m | $L = 0.9$ m | $L = 1.0$ m |
|---|--:|--:|--:|
| $\theta_{max} = 15^\circ$, $h = 0.10$ m | 720 | 650 | 590 |
| $\theta_{max} = 15^\circ$, $h = 0.15$ m | 1030 | 930 | 840 |
| $\theta_{max} = 20^\circ$, $h = 0.10$ m | 540 | 490 | 450 |
| $\theta_{max} = 20^\circ$, $h = 0.15$ m | 780 | 700 | 640 |

Bringing the centre of mass 5 cm closer to the wall saves about 30 % of the spines. A pad that holds to 20° instead of 15° saves about a quarter.

## Try your own numbers

<!-- widget: climber-sizing -->

## All three stances

The closed form covers the worst case. For the other stances, and to check it, the pad forces can be found by optimisation: choose the forces that satisfy equilibrium and the pad limits while making the largest hand load as small as possible, then the largest foot load. The repository includes a script that does this, `tools/climber_loads.py`. It also lets the centre of mass shift sideways by up to 10 cm toward the supporting side and limits sideways force on a pad to 15 % of its shear.

For the example above, with hands 0.20 m and feet 0.15 m either side of the centreline:

| Stance | Pad | Up the wall (N) | Normal (N) | On the spines (N) |
|---|---|--:|--:|--:|
| All four on the wall | each hand | 92 | −25 | 95 |
| | each foot | 56 | +25 | 56 |
| Right hand lifted | left hand | 202 | −54 | **209** |
| | right foot | 64 | −15 | 66 |
| | left foot | 28 | +64 | 28 |
| Right foot lifted | right hand | 134 | −6 | 134 |
| | left hand | 160 | −43 | **166** |
| | left foot | 0 in this solution | +49 | 0 |

Negative normal force is adhesion. Three things to notice:

- With the right hand lifted, the result is the closed form exactly.
- With the right foot lifted, nearly all the pull-in moves to the *left* hand, the one diagonal to the lifted foot. The right hand and right foot would otherwise form a couple that swings the body like a door.
- The feet's best-case loads are small, and in the last stance the foot carries no shear at all because the hands can take everything. Size the feet for more than this, about half a hand, so that a controller has room to put weight on them.

The same pattern appears in human climbers: when a hold is released, the horizontal forces gather on the two holds of the opposite side ([How human climbers load their holds](human-climbing-mechanics.md)).

## What this means for the gait

- **Move one limb at a time**, in a diagonal sequence: right hand, left foot, left hand, right foot.
- **Before lifting a hand**, shift the centre of mass toward the other hand and in toward the wall, and check that both feet are engaged.
- **Unload gradually.** As the load transfers, watch the angle of the force on the supporting hand. If it approaches $\theta_{max}$, stop and put the load back.
- **To place a hand**: touch with the top edge of the pad first, with as little push as the mechanism allows, then drag it down the wall until shear builds. Load it in shear before asking it to pull in.
- **To release a hand**: take the load off, move the pad a little way up the wall to unhook, then lift it away.
- **Every hand you place will later be the only hand.** Test it before trusting it, for example by loading it beyond what the next move will need.
- **Feet may press on the wall freely.** Compression at the feet costs the hands nothing, and a swinging foot kept lightly against the wall helps to resist rotation about the vertical axis.

## Pads and wrists

- **Hands need about twice the spines of feet.**
- **Make pads wide, not tall**, and let rows or tiles float so that each finds the wall ([Arrays, feet and large patches](../design/arrays-and-patches.md)).
- **Mount each pad on a joint placed by the stable-engagement rule**, so that load presses the pad flat ([the patch as a mechanics problem](../design/arrays-and-patches.md#top-to-bottom)).
- **Keep normal stiffness very low.** In the example the whole hand must seat with about 5 N.
- **Measure force at each wrist**, at least shear and normal. Without it the robot cannot keep its hand forces inside the limit, and it cannot tell whether a pad has caught.
- **Count the weight of the pads** in $W$.

## Limits of the analysis

- **$\theta_{max}$ dominates and must be measured** for the whole pad on the real wall. Ten RiSE toes on roofing paper held between 20° and 45°; a large pad on a hand will do worse than ten toes on a test stage.
- **The force distribution is the best possible.** A position-controlled robot will not achieve it.
- **Statics only.** Swinging limbs, and the jolt when a slipped spine catches again, add to the loads.
- **The wall is flat and vertical.** An overhang raises the pull-in the hands must supply.
- **The engagement fraction and contact strength are single numbers** standing in for distributions.

## Another route

All of the above follows from one limitation: a single array pulls in only while it is loaded down the wall. A hand built as an [opposed-spine gripper](../design/opposed-spines.md) supplies its own shear and can pull straight out. That removes the link between pull-in and weight, at the cost of an actuated gripper and a greater sensitivity to the shape of the surface. Most recent free-climbing robots take this route ([Grippers, rock climbers and space](../systems/grippers-and-space.md)).
