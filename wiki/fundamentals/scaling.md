---
description: Contact strength grows with the square of spine size while the supply of ledges falls with it. That trade is why microspine arrays use many small spines, and it sets how many you need.
status: draft
---

# Scaling: how big, how many

For a climber of a given weight, how large should the spines be, and how many are needed? Two trends pull in opposite directions ([Asbeck 2006][asbeck2006]; [Asbeck 2010][asbeck2010], §2.3).

![Two log–log panels sharing a tip-radius axis from 1 to 1000 micrometres. Left: the load one contact can carry rises as the square of tip radius. Right: usable asperities per unit wall area fall as one over the square of tip radius. A band marks typical tip radii of 10 to 35 micrometres, and bars show that smooth concrete offers asperities up to about 20 micrometres and rough concrete up to about 300.](../assets/figures/scaling.svg)

*The two idealised trends. Slopes are exact; vertical positions are arbitrary. Real surfaces fall below the right-hand line once the tip is larger than the features the surface offers.*

## The two trends

**Strength rises as $r_s^2$.** Whether a contact fails because the spine bends, because its tip rotates off the ledge, or because the asperity breaks, the load at failure grows with the square of the spine's linear size ([Spine–asperity contact](spine-asperity-contact.md#three-ways-a-contact-fails)).

**Supply falls as $1/r_s^2$.** On a surface with similar structure at all scales, the number of usable asperities per unit length goes as $1/r_s$ and so per unit area as $1/r_s^2$. On real walls the supply drops even faster once the tip is larger than the largest features the finish has left.

Pull-off tests with spines of several sizes on concrete and sandpaper, and asperity counts from profiles of concrete and granite, both followed these trends ([Asbeck 2010][asbeck2010], Fig. 2.8).

## Why many small spines

Taken together, the two idealised trends cancel: halve the tip radius and each contact holds a quarter of the load, but four times as many ledges are within reach of a given area of foot. To first order, then, going smaller costs nothing in load per unit of foot area, and it gains a great deal in practice, because it reaches down into the range of feature sizes that smoother surfaces still have. The price is the number of spines, and with it the need to make them share load. (The cancellation is this wiki's reading of the two trends; the sources state the trends and the conclusion, not the product.)

Two generations of the same robot show the trade:

| | SpinybotI | SpinybotII |
|---|---|---|
| Spines per foot | 4 | two rows of spines |
| Tip radius | 30–50 µm | 15–20 µm |
| Load per contact | several newtons, usually limited by the asperity | 1–2 N |
| Surfaces | stucco, rough concrete | brick, stucco, concrete; a catch is likely within each centimetre of stroke |

SpinybotI's larger spines were stronger, but on smooth concrete and dressed stone the chance of a spine meeting a usable asperity within its 2 cm stroke was too low to climb reliably. SpinybotII gave up strength per spine and gained surfaces ([Asbeck 2010][asbeck2010], §2.3).

Animals take the other route. A foot with two to five claws must put the whole load on them, so claw size grows with body mass. Hardened steel is also much stronger and stiffer than a natural claw, which is part of why an engineered array can be so much finer than an animal's claws for the same load.

## Two principles for the designer

Because each contact carries little, an array works only if ([Asbeck 2010][asbeck2010], §2.3):

1. **as many spines as possible attach, each independently of its neighbours**, and
2. **the load is spread among the attached spines as evenly as possible.**

Both are jobs for the suspension: see [What the suspension must do](../design/suspension-requirements.md) and [Load sharing](../design/load-sharing.md).

## How many spines

A first estimate needs three numbers: the largest load $W$ the group must carry, the fraction $p$ of spines that engage, and the load $F^*$ at which a contact fails. Spines that engage early are stretched further than those that engage late, so on average an engaged spine carries about half of what the most loaded one does. Sizing the most loaded spine at $F^*$ gives

$$
N \;\approx\; \frac{W}{p \cdot \tfrac{1}{2} F^*}
$$

This is the rule given in [Asbeck & Cutkosky 2012][asbeck2012] (§6.2): use enough spines that the engaged ones hold, on average, half of their maximum load. Take $p$ between 0.25 and 0.5 from experience with the surface, or 0.2 for a marginal one.

For example, a foot that must hold 15 N on a surface where $p = 0.3$ and $F^* = 1.5$ N needs about $15 / (0.3 \times 0.75) \approx 67$ spines. Apply a further margin for dynamic loads and for feet that land badly.

For orientation, dividing weight by spine count for three systems that used the same toe design:

| System | Mass | Spines | Weight ÷ spines |
|---|--:|--:|--:|
| Perching aircraft | 0.4 kg | 10 | 0.39 N |
| RiSE hexapod | 3.8 kg | 192 | 0.19 N |
| Person on a wall | 84 kg | 1200 | 0.69 N |

Masses and counts are from [Asbeck & Cutkosky 2012][asbeck2012] (Fig. 1); the last column is simple division. It understates the load per working spine, since a walking robot has only some feet on the wall and only a fraction of each foot's spines engaged.

## Limits of the argument

- The $1/r_s^2$ supply assumes self-similar roughness. Machined and polished surfaces fall short of it at large scales, and sandpaper, with its single grain size, at small ones.
- Smaller spines need smaller, more numerous suspensions, and friction between neighbouring toes sets a floor on how soft those can be ([What the suspension must do](../design/suspension-requirements.md)).
- Preload adds up. Every spine must be pressed lightly against the wall, and the total grows with the count ([Arrays, feet and large patches](../design/arrays-and-patches.md#preload-adds-up)).
- Very small spines may need a second, coarser level of suspension so that groups of them can follow the gross shape of the wall ([Asbeck 2010][asbeck2010], ch. 6).

[asbeck2006]: ../reference/bibliography.md#asbeck2006
[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
