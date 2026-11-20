---
description: A small aircraft that can land on a wall can rest, watch and recharge without burning energy to stay aloft. Spines make the landing gear simple, because they need almost no force to engage and none to hold.
status: draft
---

# Perching aircraft

Flying costs power every second. An aircraft that can attach itself to a wall or a cliff can stop flying and still stay where it is useful. Spines suit this job well: they engage with a light touch, hold without power, and release when the load is taken off.

## Landing on a wall

The first system was a small fixed-wing aircraft developed at Stanford ([Lussier Desbiens & Cutkosky 2010][desbiens2010]; [Lussier Desbiens 2011a][desbiens2011]; [Lussier Desbiens 2011b][desbiens2011b]). The sequence:

1. The aircraft flies toward the wall. A range sensor detects it.
2. That triggers an open-loop pitch-up: the aircraft rears up, sheds speed, and arrives nearly parallel to the wall, moving slowly.
3. Feet carrying rows of microspines touch the wall and the spines catch on asperities.
4. A non-linear suspension between the feet and the airframe absorbs the remaining kinetic energy while keeping the forces on the spines inside what they can hold.

The whole manoeuvre takes less than a second.

The suspension is the heart of it. It has to turn a range of arrival speeds and attitudes into contact forces that stay within the [safe region](../fundamentals/limit-curve.md) of the spines: enough shear to keep them engaged, never so much pull-out that they slide off, and no rebound. A planar dynamic model was used to choose its parameters and was checked against high-speed video and force-plate measurements.

| | |
|---|--:|
| Aircraft mass | 0.4 kg |
| Spines | 10 |
| Acceptable pitch at touchdown | 60° to 105° |
| Acceptable vertical speed | 0 to 2.7 m/s downward |
| Acceptable horizontal speed | up to 3 m/s |
| Landings reported | 10 autonomous, 20 manual |
| Success rate, autonomous, on building walls | about 80 % |

Mass and spine count are from [Asbeck & Cutkosky 2012][asbeck2012] (Fig. 1); the rest from the abstract of [Lussier Desbiens & Cutkosky 2010][desbiens2010]. The failures were attributed to errors in detecting the wall, not to the spines.

The width of that touchdown envelope is the point. Because the spines and suspension tolerate a wide range of arrival conditions, the aircraft does not need precise control in the last moments of flight.

## Fly, perch, climb, take off

**SCAMP**, the Stanford Climbing and Aerial Maneuvering Platform, combined the pieces: it flies, perches passively on outdoor surfaces such as concrete and stucco, climbs, and takes off again, with all sensing and computation on board. Its paper also reports recovery from climbing failures and the use of aerodynamic forces to increase the density of usable footholds ([Pope 2017][pope2017]).

A fixed-wing aircraft using a thrust-assisted pitch-up to slow down before touching, microspines to hold, and only onboard sensing has also perched on and taken off from vertical walls autonomously ([Mehanovic 2017][mehanovic2017]).

## Curved and natural targets

Walls are flat. Branches, pipes and rock are not.

- A **microspine grapple** on a tether conforms to convex targets such as branches and pipelines, tightens passively, releases easily, and was tension-tested to more than 60 kg ([Nguyen 2019][nguyen2019]).
- A bird-inspired legged robot perches dynamically on branches, converting the energy of impact into grasp force and closing in under 50 ms ([Roderick 2021][roderick2021]).

Birds themselves offer a hint about why claws work on unpredictable surfaces. Parrotlets landing on perches of different sizes and textures use the same leg and wing motions every time and adapt only their feet, toes and claws at touchdown. Their claws can reposition within one or two milliseconds, dragging to find a better asperity ([Roderick 2019][roderick2019]). That is the microspine strategy: make the approach uniform and let many small contacts sort themselves out.

For the wider picture of machines and animals that move between flight and surfaces, including how attachment by claws and by adhesion each limit the size of a percher, see the review by [Roderick 2017][roderick2017].

## Design notes for a perching mechanism

Drawn from the papers above and from the suspension rules elsewhere in this wiki:

- The spines need shear to hold. Arrange the landing so that the aircraft's weight, or its remaining downward speed, loads them along the wall.
- Size the suspension travel for the energy it must absorb, and its stiffness so that the peak force stays below what the engaged spines can carry.
- Avoid rebound. A spine that is unloaded, even for an instant, can let go.
- Keep pull-out forces small during the impact.
- Take-off is the easy part: reduce the shear and the spines release.

[asbeck2012]: ../reference/bibliography.md#asbeck2012
[desbiens2010]: ../reference/bibliography.md#desbiens2010
[desbiens2011]: ../reference/bibliography.md#desbiens2011
[desbiens2011b]: ../reference/bibliography.md#desbiens2011b
[pope2017]: ../reference/bibliography.md#pope2017
[mehanovic2017]: ../reference/bibliography.md#mehanovic2017
[nguyen2019]: ../reference/bibliography.md#nguyen2019
[roderick2021]: ../reference/bibliography.md#roderick2021
[roderick2019]: ../reference/bibliography.md#roderick2019
[roderick2017]: ../reference/bibliography.md#roderick2017
