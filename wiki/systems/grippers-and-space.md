---
description: Spine grippers took microspines off the wall and onto rock, ceilings and the sea floor, and made them a candidate for exploring caves, cliffs and asteroids. A survey of the machines, by group.
status: draft
---

# Grippers, rock climbers and space

Once spines are arranged to pull against each other ([Opposed spines and grippers](../design/opposed-spines.md)), they no longer need gravity or a flat wall. This page surveys the robots built on that idea. Figures are quoted from the papers' abstracts unless noted.

## Jet Propulsion Laboratory

JPL's work began with anchors for bodies with almost no gravity and grew into a family of grippers.

- **Omnidirectional anchor** (2011). Microspine toes in an opposed, octagonal scissor layout, with rows of 30 toes on each lever arm around a central housing. It withstood more than 100 N on natural rock, was developed for the LEMUR IIb robot, and could react the forces of a coring drill ([Parness 2011][parness2011]).
- **250 mm anchor and inverted drilling** (2012). Each anchor held more than 160 N tangent to the rock, 150 N at 45° and 180 N normal to it, on vesicular basalt and a'a lava. With a rotary-percussive drill it cored 20 mm holes 83 mm deep while hanging upside down ([Parness 2012][parness2012]).
- **LEMUR IIB** (2013). Four limbs, each ending in a gripper with more than 250 microspines in 16 carriages. On rough rock a single gripper supports the whole 10 kg robot in any orientation. The paper reports pull tests on several rock types and climbing in three orientations relative to gravity: vertical, overhanging and inverted ([Parness 2013][parness2013]).
- **LEMUR 3** (2017). Four limbs of seven identical actuators each. The same robot climbed cliff faces on microspine grippers and smooth glass solar panels on gecko-adhesive grippers ([Parness 2017a][parness2017]). It later carried astrobiology instruments, a lidar and a camera through more than ten field tests, rehearsing missions to the walls of lava-tube caves and canyons on Mars ([Uckert 2020][uckert2020]).
- **Microspine tool for asteroid capture** (2016–17). A gripper, an anchoring drill and a drivetrain, baselined as a pair of tools to grasp and help extract a boulder in NASA's proposed Asteroid Redirect Mission. Its compliant suspension was developed and tested separately ([Parness 2017b][parness2017tool]; [Merriam 2016][merriam2016]).
- **Nautilus gripper** (2020). Sixteen fingers, highly underactuated, for the deep ocean. It grasps objects of 10 to 30 cm, anchors with more than 450 N on rough rock in shear and in the normal direction, and was used from a remotely operated vehicle at depths to 2,100 m ([Backus 2020][backus2020]).

### Rotary microspines

The same group turned the spine array into a wheel. **DROP** is a two-wheeled robot whose wheels are rings of compliant spines; it climbs vertical cinder block at 25 cm/s, moves from floor to wall quickly, and survives falls of 3 m ([Parness & McKenzie 2013][parness2013drop]). Later wheels with new flexure materials took robots of under 10 g, and larger ones with a powered tail wheel, up stairs, curbs and concrete-block buildings six stories tall ([Carpenter 2016][carpenter2016]).

## Tohoku University

- **Passive spine gripper** (2018). Fine spines latch onto asperities passively and adaptively; an actuator is needed only to release. A static model of gripping was verified on a prototype, and a light four-limbed robot carrying the grippers climbed a rugged, steep slope ([Nagaoka 2018][nagaoka2018]).
- **HubRobo** (2021). A 3 kg quadruped with a compliant spine gripper on each foot, tested by teleoperation on terrain with slopes up to 45° ([Uno 2021][uno2021]).
- **Self-locking gripper** (2025). Holds its grip with the actuator off; one gripper supported a 3.65 kg robot unpowered ([Panorel & Nagaoka 2025][panorel2025]).
- **LIMBERO** (2026). A 10 kg-class quadruped. One motor drives both the closing of the fingers and the hooking of the spines; the 525 g gripper holds more than 150 N. The robot has climbed steep rock under Earth gravity ([Uno 2026][uno2026]).

## University of California, Los Angeles

- **GOAT gripper** (2021). A rigid, underactuated two-finger gripper built on a whippletree mechanism, with spring-loaded spines at the fingertips. Its design was optimised for kinematics and grasp force together ([Tanaka 2021][tanaka2021]).
- **SCALER** (2022, 2025). A quadruped that trots on the ground and free-climbs bouldering walls, overhangs and ceilings. It carries 233 % of its own weight on the ground and 35 % on a vertical wall. The journal paper studies using the whole body to add grasp force, and faster gripper actuation for dynamic climbing ([Tanaka 2022][tanaka2022]; [Tanaka 2025][tanaka2025]).
- **Planning under uncertain grip** (2020). Motion planning that keeps the probability of losing a grip below a chosen bound, with grip strength learned from data, shown on an 11.5 kg six-limbed robot climbing between two walls ([Shirai 2020][shirai2020]).

## Carnegie Mellon University

- **Printed microspines** (2022). See [Building spine toes](../fabrication/building-toes.md#printed-toes) ([Nadan 2022][nadan2022]).
- **LORIS** (2024). A lightweight free-climber with fully passive microspine grippers and passive wrists. An optimisation-based controller distributes forces among the grippers to lower the risk of one pulling off. It climbs flat cinder-block walls and uneven rock in full gravity ([Nadan 2024][nadan2024]).

## Stanford University

- **Hands and palms for heavy robots.** See [Human-scale climbing](human-scale-climbing.md#since-then-hands-and-palms-for-heavy-robots).
- **ReachBot** (2022–24). A small body with long extendable booms, each ending in a light spine gripper, for caves and lava tubes where anchor points are sparse and far apart. A prototype gripper pulled 8 N on volcanic rock, limited by its printed parts, with 26 N predicted for stronger materials. One arm and gripper were field-tested in a lava tube in the Mojave Desert ([Schneider 2022][schneider2022]; [Chen 2022][chen2022]; [Chen 2024][chen2024]). Its planner chooses a sequence of grasps to cross a cave with at least 90 % probability of success in simulation ([Newdick 2023][newdick2023]).

## Other machines

- **MARCBot** (2024). A rock-climbing robot whose spiny grippers hold when climbing and support when walking, with a controller that optimises how the attachment forces are distributed ([Zi 2024][zi2024]).
- **Claw grippers for concrete and cliffs.** Hook-like claws for inspection robots on rough concrete, with models of claw and asperity ([Xu 2012][xu2012]), and grappling claws in a cross arrangement with a method for judging which regions of a wall can be gripped ([Xu 2020][xu2020]).
- **Tbot and SpinyCrawler.** A wheeled climber with rings of spines, and a tracked one whose opposed spiny grippers hold on rough ceilings ([Liu 2015][liu2015]; [Liu 2020][liu2020]).
- **Soft grippers and soft robots.** A soft gripper that combines a flat dry adhesive with retractable microspines, to hold both smooth and rough objects ([Hu 2021][hu2021]); and passive two-row microspine arrays that increased the distance a soft crawler covered on natural terrain tenfold on average ([Ervin 2025][ervin2025]).

## Models and reviews

- A statistical model of compliant spine arrays, single and opposed ([Jiang 2018][jiang2018]).
- A model and simulation of a single microspine interlocking with an asperity on rock ([Iacoponi 2020][iacoponi2020]).
- A review of biological attachment and the devices it has inspired, including mechanical interlocking ([Xu 2022][xu2022]).
- A review and comparison of microspine gripper designs for landing on asteroids, which notes that most current designs fail under large compressive and torsional loads ([Akers 2026][akers2026]).

## What the survey shows

- **Opposition is the standard answer** for rock. Most of these grippers arrange their spines to pull toward a centre, radially or in opposed pairs.
- **Passive beats active where energy is short.** Several groups have moved to grippers that latch and hold without power.
- **The grip is treated as uncertain.** Planning and control now account for it explicitly, by distributing forces or bounding risk.
- **Quantitative comparison is hard.** Papers report holding force on different rocks with different protocols. A shared test would help ([Open questions](../reference/open-questions.md)).

[parness2011]: ../reference/bibliography.md#parness2011
[parness2012]: ../reference/bibliography.md#parness2012
[parness2013]: ../reference/bibliography.md#parness2013
[parness2013drop]: ../reference/bibliography.md#parness2013drop
[parness2017]: ../reference/bibliography.md#parness2017
[parness2017tool]: ../reference/bibliography.md#parness2017tool
[merriam2016]: ../reference/bibliography.md#merriam2016
[backus2020]: ../reference/bibliography.md#backus2020
[uckert2020]: ../reference/bibliography.md#uckert2020
[carpenter2016]: ../reference/bibliography.md#carpenter2016
[nagaoka2018]: ../reference/bibliography.md#nagaoka2018
[uno2021]: ../reference/bibliography.md#uno2021
[uno2026]: ../reference/bibliography.md#uno2026
[panorel2025]: ../reference/bibliography.md#panorel2025
[tanaka2021]: ../reference/bibliography.md#tanaka2021
[tanaka2022]: ../reference/bibliography.md#tanaka2022
[tanaka2025]: ../reference/bibliography.md#tanaka2025
[shirai2020]: ../reference/bibliography.md#shirai2020
[nadan2022]: ../reference/bibliography.md#nadan2022
[nadan2024]: ../reference/bibliography.md#nadan2024
[schneider2022]: ../reference/bibliography.md#schneider2022
[chen2022]: ../reference/bibliography.md#chen2022
[chen2024]: ../reference/bibliography.md#chen2024
[newdick2023]: ../reference/bibliography.md#newdick2023
[zi2024]: ../reference/bibliography.md#zi2024
[xu2012]: ../reference/bibliography.md#xu2012
[xu2020]: ../reference/bibliography.md#xu2020
[liu2015]: ../reference/bibliography.md#liu2015
[liu2020]: ../reference/bibliography.md#liu2020
[hu2021]: ../reference/bibliography.md#hu2021
[ervin2025]: ../reference/bibliography.md#ervin2025
[jiang2018]: ../reference/bibliography.md#jiang2018
[iacoponi2020]: ../reference/bibliography.md#iacoponi2020
[xu2022]: ../reference/bibliography.md#xu2022
[akers2026]: ../reference/bibliography.md#akers2026
