---
description: What is publicly known about carrying a person, or a robot of similar weight, on spines. Covers the Stanford human-scale tests of 2007–2009, the DARPA Z-Man programme they belonged to, and the hands and palms built since.
status: draft
---

# Human-scale climbing and Z-Man

A person weighs twenty times as much as RiSE. Holding one on a wall needs more than a thousand spines working together, and that is a different engineering problem from a robot foot with thirty. This page collects what has been published about it.

> [!NOTE]
> Parts of this history are documented only in laboratory notes and programme reviews that have not been released. This page uses published papers, the thesis, and pages of the old BDML wiki that are openly readable. See [The BDML Z-Man wiki](../about/bdml-archive.md) for what else exists.

## Z-Man

Z-Man was a programme of the US Defense Advanced Research Projects Agency. In the agency's words it aimed "to develop biologically inspired climbing aids to enable warfighters to scale vertical walls constructed from typical building materials, while carrying a full combat load, and without the use of ropes or ladders", drawing on creatures that climb with "strong reversible adhesion via van der Waals forces or hook-into-surface asperities" ([DARPA Z-Man][darpa-zman]). The two mechanisms in that sentence are the two halves of the programme: gecko-like dry adhesives for smooth surfaces and spines for rough ones.

Stanford's Biomimetics and Dexterous Manipulation Laboratory took part, working on both, and kept a project wiki from 2007 ([The BDML Z-Man wiki](../about/bdml-archive.md)). The spine toe developed there for human climbing is the "ZMan toe" of the thesis.

The programme's public result came on the smooth-surface side. In 2014 DARPA announced that a 218-pound climber had ascended and descended 25 feet of glass on a pair of hand-held, gecko-inspired paddles, in one trial carrying a further 50 pounds, and that the first human climbing demonstration had taken place in February 2012. The adhesive technology in those paddles was developed for DARPA by Draper Laboratory ([DARPA 2014][darpa2014]).

## The Z-Man toe

The human-climbing toe uses the same layout as the RiSE toe, scaled up ([Asbeck 2010][asbeck2010], §4.2.2):

| | RiSE toe | Z-Man toe |
|---|--:|--:|
| Length, pivot to tip | 3.0 cm | 4.6 cm |
| Flexure rubber | VytaFlex 30 (30 Shore A) | VytaFlex 60 (60 Shore A) |
| Flexure shape | | short and wide |
| Fingered joints between hard and soft | yes | not needed |

The harder rubber and stouter flexures suit the higher load per toe. Details are in [Toe designs](../design/toe-designs.md).

## First hang tests, October 2007

A short report on the laboratory's wiki describes the first outdoor test ([Asbeck 2007][bdml-outside-testing]). People did pull-ups on a pebbly wall outside the laboratory, holding two "ice axes", each carrying two patches of spine toes.

- The rig supported a person of about 145 lb (66 kg) for about 30 seconds at a time, and probably could have for longer. People of about 170 lb (77 kg) could not be held.
- The two types of toe on the two axes did not perform equally. One pair of patches was carrying about two thirds of the weight, roughly 47 lb (21 kg) per patch, against an estimated requirement of 64 lb (29 kg). The other type was reaching its overload stops too early.
- A shower of small rock fragments came down the wall, so the testers wore goggles. When a patch failed and scraped down the wall, the noise brought people out of the building.
- The patches and axes were larger and heavier than they needed to be.

## A patch of 1200 toes

The thesis shows its author hanging from a single large patch of 1200 Z-Man toes ([photograph](../fundamentals/what-are-microspines.md#three-scales-that-have-been-built)). [Asbeck & Cutkosky 2012][asbeck2012] give the mass supported as 84 kg. Averaged over every toe that is 0.69 N each; with a third of them engaged it is about 2 N per working spine, which is at the limit of what a contact of this size holds.

## Climbing paddles

For climbing, as opposed to hanging, the toes were mounted in several rows on rigid paddles held in the hands ([Arrays, feet and large patches](../design/arrays-and-patches.md#several-rows-the-alignment-problem)). The thesis records two lessons from their use:

- **The lower rows did not pull their weight.** Many fewer spines engaged in the lower rows than in the top row. A rigid plate with rows of spines has to lie flat on the wall, and a plate held in a hand, loaded through a handle, does not. This observation is the starting point of the thesis chapter on patch moments.
- **The system was heavy.** The thesis concludes that lighter designs and materials are needed, and that suspensions with a lower profile would be easier to build into a paddle.

## On television, 2009

The laboratory's media list records that Aaron Parness of the laboratory helped to create a climbing "gecko suit" for the "Geckoman" episode of the Discovery Channel series *Prototype This!*, first shown on 19 March 2009 ([BDML media list][bdml-media]). In that episode the show's team set out to build two devices with which a person could climb a smooth and a rough vertical surface ([Prototype This! 2009][prototype-this]). What was built, and how well it worked, has not been described in the published literature.

## What human-scale climbing demands

From the published record, the difficulties in rough order of importance:

1. **Alignment of a large patch.** See [the patch as a mechanics problem](../design/arrays-and-patches.md#the-patch-as-a-mechanics-problem).
2. **The direction of the load.** Spines need the load nearly parallel to the wall. A climber's arms pull outward as well as down. [Sizing spine pads for a limbed climber](../climbing/sizing-a-limbed-climber.md) quantifies this for a robot.
3. **Surfaces.** A design sized for one wall may need several times as many spines on another.
4. **Preload.** Thousands of toes need up to 10 N just to seat ([preload adds up](../design/arrays-and-patches.md#preload-adds-up)).
5. **Weight** of the device itself.

## Since then: hands and palms for heavy robots

The line continued at Stanford with spine arrays for robots of roughly human scale.

- **Linearly constrained spines** pack 19 spines into each square centimetre. A 120 × 100 mm palm of twelve spine tiles, with a pulley differential to share load between tiles, held a mean of up to 710 N in shear on concrete block. It was built for JPL's RoboSimian ([Wang 2016][wang2016]; [Wang 2017][wang2017]).
- **SpinyHand** has articulated fingers that take the grips human climbers use, with dense spine tiles on each phalanx and a transmission that divides shear force among them. A model of its wrench space agreed with bench tests to within 10 to 15 % ([Wang 2019][wang2019]).
- **Soft and spiny paws** combine spined gripping surfaces with soft flexure joints and a particle-jamming palm, stiffened by tendons and vacuum for loads of 250 N and more ([Ruotolo 2019][ruotolo2019]).

On the smooth-surface side, a person of 70 kg has climbed vertical glass on 140 cm² of gecko-inspired adhesive per hand, using a load-sharing mechanism that spreads force nearly evenly over many adhesive tiles ([Hawkes 2015][hawkes2015]). The mechanism matters more than the adhesive here, and the same idea applies to tiles of spines.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[asbeck2012]: ../reference/bibliography.md#asbeck2012
[wang2016]: ../reference/bibliography.md#wang2016
[wang2017]: ../reference/bibliography.md#wang2017
[wang2019]: ../reference/bibliography.md#wang2019
[ruotolo2019]: ../reference/bibliography.md#ruotolo2019
[hawkes2015]: ../reference/bibliography.md#hawkes2015
[darpa-zman]: ../reference/bibliography.md#darpa-zman
[darpa2014]: ../reference/bibliography.md#darpa2014
[bdml-outside-testing]: ../reference/bibliography.md#bdml-outside-testing
[bdml-media]: ../reference/bibliography.md#bdml-media
[prototype-this]: ../reference/bibliography.md#prototype-this
