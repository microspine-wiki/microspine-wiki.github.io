---
description: A community handbook on microspines, the small steel hooks on soft suspensions that let robots, aircraft and people hang on rough walls. How they work, how to design, build and test them, and what the machines that used them have taught.
---

# Microspine Wiki

Drag a sharp steel hook lightly down a concrete wall and it will catch on a ledge too small to see. On its own it holds about a newton. Mount hundreds of such hooks on soft, independent suspensions, so that each finds a ledge of its own and none carries more than its share, and together they hold a climbing robot, a perching aircraft or a person. That is a microspine array.

The idea was worked out at Stanford in the 2000s and has since been used on legged and wheeled robots, perching aircraft, and grippers for rock and for spacecraft. This wiki gathers what is known about it in one place, in plain language, with the sources for every number.

## Start here

New to spines? Read these five pages in order.

1. [What microspines are](fundamentals/what-are-microspines.md): the idea, and what it is good and bad at.
2. [Spine–asperity contact](fundamentals/spine-asperity-contact.md): how a single tip holds, and when it lets go.
3. [Force space and the limit curve](fundamentals/limit-curve.md): why spines pull toward the wall only while they are loaded down it.
4. [Load sharing](design/load-sharing.md): the central design problem.
5. [A design procedure](design/design-procedure.md): from a load and a surface to a toe.

## Contents

<!-- cards -->

### Fundamentals

How a spine holds, on what, and how many you need.

- [What microspines are](fundamentals/what-are-microspines.md)
- [Spine–asperity contact](fundamentals/spine-asperity-contact.md)
- [Which surfaces can be climbed](fundamentals/surfaces.md)
- [Scaling: how big, how many](fundamentals/scaling.md)
- [Force space and the limit curve](fundamentals/limit-curve.md)

### Design

Suspensions that let many spines share one load.

- [What the suspension must do](design/suspension-requirements.md)
- [Load sharing](design/load-sharing.md)
- [The stalk model](design/stalk-model.md)
- [Toe designs](design/toe-designs.md)
- [A design procedure](design/design-procedure.md)
- [Arrays, feet and large patches](design/arrays-and-patches.md)
- [Opposed spines and grippers](design/opposed-spines.md)

### Build and test

Materials, casting, and the measurements that matter.

- [Building spine toes](fabrication/building-toes.md)
- [Test methods](testing/test-methods.md)

### Systems

What has climbed on spines, and what each machine taught.

- [Timeline of spine climbers](systems/timeline.md)
- [Spinybot](systems/spinybot.md)
- [RiSE](systems/rise.md)
- [Human-scale climbing and Z-Man](systems/human-scale-climbing.md)
- [Human-scale prototypes, 2007](systems/zman-prototypes-2007.md)
- [Spine paddles on a five-storey wall, 2008](systems/discovery-paddles.md)
- [Perching aircraft](systems/perching.md)
- [Grippers, rock climbers and space](systems/grippers-and-space.md)

### Climbing mechanics

What a four-limbed climber asks of its pads.

- [How human climbers load their holds](climbing/human-climbing-mechanics.md)
- [Sizing spine pads for a limbed climber](climbing/sizing-a-limbed-climber.md)

### Reference

Symbols, gaps in the record, videos, and every source.

- [Notation and glossary](reference/notation-and-glossary.md)
- [Open questions](reference/open-questions.md)
- [Videos](reference/videos.md)
- [Bibliography](reference/bibliography.md)

<!-- /cards -->

## Try the models

- [The stalk model](design/stalk-model.md#explore-the-model): change the geometry and stiffness of a toe and watch its loading lines move.
- [Sizing spine pads](climbing/sizing-a-limbed-climber.md#try-your-own-numbers): enter a climber's mass and posture to get the load on its hands and the number of spines they need.

Both are also available as Python scripts in the `tools/` folder of the repository.

## Watch

![Video of a climber going up a five-storey concrete-block building on two spine paddles, one paddle at a time, sped up four times.](assets/video/bdml2008-building-climb-4x.mp4)

*In 2008 a professional climber went up a five-storey building on two hand-held paddles of spines, loading them through webbing to the feet. Sped up four times. The story is in [Spine paddles on a five-storey wall, 2008](systems/discovery-paddles.md); more in [Videos](reference/videos.md).*

## About this wiki

> [!NOTE]
> The wiki is young and maintained by its community. Most pages are drafts: written from the published sources and checked by their author, but not yet reviewed by a second person. Check numbers against the cited papers before you rely on them, and [report anything that is wrong](about/contributing.md).

It is built on published papers, Alan Asbeck's openly licensed doctoral thesis, and pages, working documents and videos from the Stanford laboratory's old project wikis ([About this wiki](about/about.md); [The BDML Z-Man wiki](about/bdml-archive.md)). It is independent of the laboratories and sponsors whose work it describes.
