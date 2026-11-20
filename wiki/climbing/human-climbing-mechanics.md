---
description: What biomechanics studies of rock climbers on instrumented holds say about how weight and horizontal force are shared between hands and feet, and what happens when one hold is released. Useful background for anyone designing a limbed climber.
status: draft
---

# How human climbers load their holds

In the late 1990s a French research group built a climbing frame whose four holds each sat on a three-axis force sensor, and measured what skilled climbers do when they let go of one hold. The studies are small, a handful of climbers each, and they concern holding a posture, not moving upward. But they are the cleanest published data on how a four-limbed climber distributes force on a wall, and they show the same structure that falls out of the statics of a spine climber ([Sizing spine pads for a limbed climber](sizing-a-limbed-climber.md)).

> [!NOTE]
> This page reports the findings as stated in the papers' abstracts, which are qualitative. For force magnitudes, read the papers. Keep in mind that a hand on a hold can pull outward; a spine pad cannot.

## The experiments

| Study | Wall | Hold released | What was compared |
|---|---|---|---|
| [Quaine 1997a][quaine1997a] | vertical | right hand | trunk held away from the wall, against trunk close to it; six expert climbers |
| [Quaine 1997b][quaine1997b] | vertical | a leg | forces at the holds during the leg movement |
| [Quaine & Martin 1999][quaine1999] | vertical | right foot | arrangement of forces before and after |
| [Noé 2001][noe2001] | vertical and overhanging | right foot | the two wall angles |
| [Testa 1999][testa1999] | | | hold type and size of movement, through the momentum of the body |

In the first four, the climber starts on four holds, releases one, and holds the three-point posture for a few seconds while the forces on every hold are recorded.

## Findings

**Vertical and horizontal forces are organised differently.** After a foot is released, the vertical forces are carried by all three remaining holds, a tripod. The horizontal forces, the ones that keep the body against the wall, are carried by only two: the hand and foot on the side *opposite* the released foot ([Quaine & Martin 1999][quaine1999]). The remaining hold on the same side as the released one carries almost no horizontal force.

**Horizontal force follows the moment of the body's weight about the feet.** The contact forces at the holds are linked to the couple formed by body weight and its distance from the wall ([Quaine 1997a][quaine1997a]). This is the relation $T = W h / L$.

**Standing closer to the wall makes the transfer gentler.** With the trunk close to the wall, less force is transferred when a hand is released, and more of it goes to the hold on the same side, than with the trunk held away ([Quaine 1997a][quaine1997a]).

**On an overhang the arms do more.** In the overhanging position the arms are significantly involved in preventing a fall even on four holds. Horizontal forces on the holds are smaller, and less force shifts to the opposite side when a foot is released ([Noé 2001][noe2001]).

**The body prepares before it lets go.** Before the limb moves, the body's horizontal momentum is already changing, in a way that depends on the hold and on the size of the coming movement. Horizontal momentum serves balance; vertical momentum starts the movement ([Testa 1999][testa1999]).

## What a spine climber can take from this

| Human climber on holds | Spine climber on a flat wall |
|---|---|
| Horizontal forces gather on the two holds opposite a released hold | The optimisation gives the same answer: lift the right foot and the pull-in moves to the left hand |
| Feet carry weight; hands mostly steady the body | Reversed: the hands must carry most of the weight, because a spine pad can only pull in while loaded in shear |
| A hand can pull outward strongly on an edge | A pad pulls in only within $\theta_{max}$ of the wall |
| Keeping the trunk close reduces horizontal forces | Hand load is proportional to $h/L$, and beyond $h/L \approx \tan\theta_{max}$ the stance is impossible |
| Load is shifted before a hold is released | Unload a pad gradually and watch the force angle on the others while doing it |
| An overhang shifts work to the arms | An overhang adds to the pull-in the hands must supply; a single array may not manage it at all |

The differences matter as much as the similarities. A person's hands can supply a large pull-out force on an edge without carrying any weight. Take that ability away, and the comfortable human strategy of standing on the feet stops working. A spine climber has to be designed, and has to move, as something that hangs.

## Gaps

These studies cover static postures on a prepared frame. They do not give the forces needed to move upward, and none concerns climbing with tools. If you know of measurements on ice-tool or aid climbing, where the hand's contact is also a hook that needs load to stay on, they would be a closer analogue: please [add them](../about/contributing.md).

[quaine1997a]: ../reference/bibliography.md#quaine1997a
[quaine1997b]: ../reference/bibliography.md#quaine1997b
[quaine1999]: ../reference/bibliography.md#quaine1999
[noe2001]: ../reference/bibliography.md#noe2001
[testa1999]: ../reference/bibliography.md#testa1999
