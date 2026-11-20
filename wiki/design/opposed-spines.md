---
description: A single spine array needs gravity, or something like it, to supply shear. Two arrays pulling against each other supply their own. This is the principle behind every spine gripper, from asteroid anchors to free-climbing robots.
status: draft
---

# Opposed spines and grippers

Everything in the pages before this one assumes that something loads the spines along the wall. On a vertical wall that something is the weight of the climber. Take it away, on a ceiling, on an overhang, in microgravity, or when the task is to pull straight out of the surface, and a single array of spines can hold nothing: its [safe region](../fundamentals/limit-curve.md) touches the pull-out axis only at the origin.

The way out is to use **two arrays that pull toward each other**.

## The principle

Place two groups of spines on a surface, facing each other, and draw them together. Each group is now loaded in shear by the other. Each can therefore supply adhesion, up to its own limit angle. Their shear forces cancel inside the gripper, and their adhesion adds.

If each side carries an internal shear force $F_i$ and holds to an angle $\theta_{max}$ from the surface, the pair can resist a pull straight out of the surface of about

$$
F_{out} \approx 2\,F_i \tan\theta_{max}
$$

before the tips slide off their ledges. This is a simple estimate that ignores the gripper's own geometry. $F_i$ itself is limited by the number of engaged spines times their contact strength. The gripper needs an actuator, a spring or a mechanism to generate and hold $F_i$; that internal force is the price of independence from gravity.

Three consequences shape every design:

- **Preload strategy matters.** How the internal force is applied, and in what order relative to the external load, changes what the pair can hold. Models and experiments on opposed arrays show this directly ([Jiang 2018][jiang2018]).
- **Directions multiply.** Two opposed arrays resist loads along one line. Arranging arrays radially, like the spokes of a wheel, gives a grip that holds in every tangential direction and straight out.
- **The surface must cooperate over the whole footprint.** A gripper spans centimetres to decimetres, so it needs usable asperities, and some conformance, across that span.

[Asbeck & Cutkosky 2012][asbeck2012] note that the analysis of suspensions carries over unchanged; what is new is the need for the tangential loading force.

## Radial grippers for rock

The most developed opposed-spine devices are the microspine grippers built at NASA's Jet Propulsion Laboratory for climbing rock and for anchoring to bodies with almost no gravity.

| Device | Arrangement | Reported holding | Source |
|---|---|---|---|
| Omnidirectional anchor, 2011 | Opposed octagonal scissor layout, rows of 30 toes on each lever arm | more than 100 N on natural rock | [Parness 2011][parness2011] |
| 250 mm anchor, 2012 | Hierarchical array of microspines with suspension flexures | more than 160 N tangent, 150 N at 45°, 180 N normal, on vesicular basalt and a'a lava | [Parness 2012][parness2012] |
| LEMUR IIB gripper, 2013 | More than 250 microspines in 16 carriages | one gripper supports the 10 kg robot in any orientation on rough rock | [Parness 2013][parness2013] |
| Nautilus gripper, 2020 | 16 fingers, highly underactuated, for the deep ocean | more than 450 N on rough rock, in shear and normal | [Backus 2020][backus2020] |

The 2012 anchor was also used to react the forces of a rotary-percussive drill, coring rock upside down. LEMUR 3, a later four-limbed robot, climbed cliff faces with microspine grippers and smooth solar panels with gecko-adhesive ones, using largely the same hardware ([Parness 2017a][parness2017]), and carried science instruments in field tests that rehearsed missions to the walls of caves and canyons ([Uckert 2020][uckert2020]). A gripper of this family was baselined to grasp a boulder for NASA's proposed Asteroid Redirect Mission ([Parness 2017b][parness2017tool]; [Merriam 2016][merriam2016]).

The papers describe these grippers as **hierarchical**: each microspine has its own suspension flexure, the microspines are grouped in carriages, and the carriages are arranged around a central housing. Compliance at more than one level is the same idea as the [ankle](toe-designs.md#an-ankle-widens-the-range) and the [floating rows](arrays-and-patches.md#what-helps-in-practice), carried further.

## Grippers on limbed climbers

Several free-climbing robots carry a spine gripper on each limb:

- **Passive spine grippers** latch fine spines onto asperities without an actuator for gripping, and use one only to release ([Nagaoka 2018][nagaoka2018]). They are used on the HubRobo quadruped ([Uno 2021][uno2021]) and, in a later form with coupled closing and hooking driven by one motor, on LIMBERO ([Uno 2026][uno2026]). A self-locking variant holds without power ([Panorel & Nagaoka 2025][panorel2025]).
- **LORIS** uses fully passive microspine grippers on passive wrists and relies on its controller to distribute forces so that no gripper is pulled off ([Nadan 2024][nadan2024]).
- **SCALER** uses a two-finger underactuated gripper with spring-loaded spines at the fingertips, on bouldering holds and overhangs ([Tanaka 2021][tanaka2021]; [Tanaka 2022][tanaka2022]; [Tanaka 2025][tanaka2025]).
- **ReachBot** puts light, passive spine grippers at the ends of long extendable booms and treats locomotion as manipulation of its own body ([Chen 2022][chen2022]; [Chen 2024][chen2024]).
- **SpinyHand** and related hands for human-scale robots cover articulated fingers and palms with dense spine tiles and share load between them mechanically ([Wang 2019][wang2019]; [Ruotolo 2019][ruotolo2019]).

More on each in [Grippers, rock climbers and space](../systems/grippers-and-space.md).

## Opposed spines on legs and tracks

The same principle works without a dedicated gripper. A robot can pull its own legs toward each other. In *distributed inward gripping*, contralateral legs engage spines by pulling in toward the body instead of down against gravity; small robots using it have walked on vertical and inverted mesh ([Wile 2008][wile2008]; [Palmer 2015][palmer2015]). A tracked robot whose links carry opposed spiny grippers has climbed rough ceilings ([Liu 2020][liu2020]).

## Planning with grips that may fail

A spine grip is a statistical thing, and a robot hanging from several of them has to plan accordingly. Two approaches have been published: choosing motions under a bound on the probability of losing a grip, with grip strength modelled from data ([Shirai 2020][shirai2020]), and choosing sequences of grasps from the available terrain features so that the whole traverse succeeds with a stated probability ([Newdick 2023][newdick2023]).

## Design notes

These follow from the principle and from the single-array design rules. They are this wiki's summary, not a published procedure.

- Design each side as you would a single foot: [loading lines](load-sharing.md) near-radial, travel greater than the asperity spacing, overload stops.
- Choose the internal force so that each side works at a loading angle comfortably inside the surface's limit when the external load is applied.
- Give the two sides a way to equalise, for example a floating link or differential, so that one side seating first does not take all the internal force.
- Expect the first motion after closing to be sliding. The spines must drag to find ledges, so the closing stroke has to be longer than the asperity spacing.
- Decide how the gripper lets go. Reversing the closing stroke works for the same reason it does for a foot: the contacts return to the origin of force space.

[asbeck2012]: ../reference/bibliography.md#asbeck2012
[jiang2018]: ../reference/bibliography.md#jiang2018
[parness2011]: ../reference/bibliography.md#parness2011
[parness2012]: ../reference/bibliography.md#parness2012
[parness2013]: ../reference/bibliography.md#parness2013
[parness2017]: ../reference/bibliography.md#parness2017
[parness2017tool]: ../reference/bibliography.md#parness2017tool
[merriam2016]: ../reference/bibliography.md#merriam2016
[backus2020]: ../reference/bibliography.md#backus2020
[uckert2020]: ../reference/bibliography.md#uckert2020
[nagaoka2018]: ../reference/bibliography.md#nagaoka2018
[uno2021]: ../reference/bibliography.md#uno2021
[uno2026]: ../reference/bibliography.md#uno2026
[panorel2025]: ../reference/bibliography.md#panorel2025
[nadan2024]: ../reference/bibliography.md#nadan2024
[tanaka2021]: ../reference/bibliography.md#tanaka2021
[tanaka2022]: ../reference/bibliography.md#tanaka2022
[tanaka2025]: ../reference/bibliography.md#tanaka2025
[chen2022]: ../reference/bibliography.md#chen2022
[chen2024]: ../reference/bibliography.md#chen2024
[wang2019]: ../reference/bibliography.md#wang2019
[ruotolo2019]: ../reference/bibliography.md#ruotolo2019
[wile2008]: ../reference/bibliography.md#wile2008
[palmer2015]: ../reference/bibliography.md#palmer2015
[liu2020]: ../reference/bibliography.md#liu2020
[shirai2020]: ../reference/bibliography.md#shirai2020
[newdick2023]: ../reference/bibliography.md#newdick2023
