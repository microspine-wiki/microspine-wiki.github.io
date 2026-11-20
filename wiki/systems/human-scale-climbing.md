---
description: What is publicly known about carrying a person, or a robot of similar weight, on spines. Covers the Stanford human-scale tests of 2007–2009, the DARPA Z-Man programme they belonged to, and the hands and palms built since.
status: draft
---

# Human-scale climbing and Z-Man

A person weighs twenty times as much as RiSE. Holding one on a wall needs more than a thousand spines working together, and that is a different engineering problem from a robot foot with thirty. This page gives an overview. Two further pages tell the early history in detail: [Human-scale prototypes, 2007](zman-prototypes-2007.md) and [Spine paddles on a five-storey wall, 2008](discovery-paddles.md).

> [!NOTE]
> Besides published papers and the thesis, this history draws on working documents from the laboratory's project wiki, which were not peer reviewed. Material from other organisations in the programme is not used. See [The BDML Z-Man wiki](../about/bdml-archive.md).

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

## Prototypes and first hang tests, 2007

In the summer of 2007 the group tried toes with coil-spring, spring-steel, wire and nitinol-wire flexures alongside cast toes, and mounted patches of them on hand-held "ice axes". In October people hung from a pebbly wall outside the laboratory on two of these axes. The rig held a person of about 66 kg for about 30 seconds at a time, but not people of about 77 kg ([Asbeck 2007][bdml-outside-testing]). Photographs, test numbers and a video are on [Human-scale prototypes, 2007](zman-prototypes-2007.md).

## A patch of 1200 toes

The thesis shows its author hanging from a single large patch of 1200 Z-Man toes ([photograph](../fundamentals/what-are-microspines.md#three-scales-that-have-been-built)). [Asbeck & Cutkosky 2012][asbeck2012] give the mass supported as 84 kg. Averaged over every toe that is 0.69 N each; with a third of them engaged it is about 2 N per working spine, which is at the limit of what a contact of this size holds.

## Climbing paddles

For climbing, as opposed to hanging, the toes were mounted in several rows on rigid paddles held in the hands ([Arrays, feet and large patches](../design/arrays-and-patches.md#several-rows-the-alignment-problem)). The paddles were built in 2008 for the "Geckoman" episode of the Discovery Channel series *Prototype This!*, first shown on 19 March 2009, and a professional climber used them to climb a five-storey building ([BDML media list][bdml-media]; [Prototype This! 2009][prototype-this]). Their design, how they were loaded and what they held are on [Spine paddles on a five-storey wall, 2008](discovery-paddles.md).

The thesis records two lessons from their use:

- **The lower rows did not pull their weight.** Many fewer spines engaged in the lower rows than in the top row. A rigid plate with rows of spines has to lie flat on the wall, and a plate held in a hand, loaded through a handle, does not. This observation is the starting point of the thesis chapter on patch moments.
- **The system was heavy.** The thesis concludes that lighter designs and materials are needed, and that suspensions with a lower profile would be easier to build into a paddle.

## What human-scale climbing demands

From the record, the difficulties in rough order of importance:

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
