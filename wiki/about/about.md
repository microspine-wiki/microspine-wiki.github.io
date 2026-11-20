---
description: What this wiki is, what it is built on, how far to trust it and how to cite it.
status: draft
---

# About this wiki

The Microspine Wiki is an open handbook on climbing with spines. It explains how a small hook holds on a rough wall, how to design suspensions so that hundreds of hooks share a load, how to build and test them, and what the robots and people who have climbed this way found out.

## Why it exists

The foundations of the subject were laid between about 2004 and 2012, and what was learned is scattered. The design rules are in one journal paper and one doctoral thesis. The reasoning behind them is spread over a dozen conference papers. Practical detail lived on laboratory web pages that are no longer maintained ([The BDML Z-Man wiki](bdml-archive.md)). Later work on grippers, rock-climbing robots and spacecraft builds on those results and seldom restates them.

Anyone starting a spine project today has to put all of this together again. The wiki tries to do that once, in the open, and to keep it current.

## What it covers

- **Fundamentals**: what a spine can hold on to, which surfaces work, how size and number trade off, and the limit curve that governs control.
- **Design**: what a suspension must do, how load is shared, a simple model that reproduces measured behaviour, the toe designs that have been published, and how spines are arranged in feet, patches and grippers.
- **Build and test**: materials, fabrication, and the measurements that tell you whether a toe works.
- **Systems**: the robots, aircraft, grippers and human-scale devices that have used spines, with what each one taught.
- **Climbing mechanics**: what the statics of a climber on a wall demands of its pads.

Gecko-like dry adhesives, suction and magnets appear only where they help to explain spines. They deserve handbooks of their own.

## What it is built on

Every factual statement should be traceable to something you can read yourself:

- **Published papers**, cited by author and year and listed with DOIs in the [bibliography](../reference/bibliography.md).
- **Alan Asbeck's doctoral thesis** ([Asbeck 2010](../reference/bibliography.md#asbeck2010)), which is the fullest account of the subject and is openly available. Where the wiki follows it closely, the section is given.
- **Pages, working documents and videos from the laboratory's old project wikis**, for history and practical detail. Everything used from them was made at Stanford. They were not peer reviewed, and pages that use them say so.
- **Manufacturers' data sheets**, for material properties.

Material from other organisations that took part in the same programme is not used. [The BDML Z-Man wiki](bdml-archive.md) lists what this wiki takes from the archive and what it leaves out.

Some pages go beyond their sources: a worked example, a rule of thumb, a comparison between two papers, the sizing analysis in [Sizing spine pads for a limbed climber](../climbing/sizing-a-limbed-climber.md). These are marked as the wiki's own reading, and they are the first places to look for mistakes.

## How far to trust it

Each page carries a status next to its date.

| Status | Meaning |
|---|---|
| stub | An outline. Do not rely on it. |
| draft | Written from the sources and checked by its author, not yet by anyone else. |
| reviewed | A second person has checked every number and claim against the sources cited. |

Nearly every page is a draft at present. Treat the wiki as a guide to the literature, and go to the paper before you commit a design to a number found here. If you find an error, [say so](contributing.md): that is the most useful contribution there is.

> [!WARNING]
> Climbing on spines is experimental. Spines hold statistically, and they let go without warning when a surface is weaker or smoother than expected. Nothing on this wiki has been certified for supporting a person or for any use where failure would cause injury. Test with a belay or over padding, protect your eyes, and keep people out from under the load.

## Who is behind it

The wiki is a community project maintained by its contributors. It is not an official publication of Stanford University, of the Biomimetics and Dexterous Manipulation Laboratory, of DARPA, or of any other institution whose work it describes, and none of them has reviewed or endorsed it. Names of robots, products and programmes are used only to identify them.

If you are an author of work described here and think it is misrepresented, or you hold rights in something shown here and want it changed or removed, open an issue in the project's repository. It will be dealt with promptly.

## How to cite

For a technical claim, cite the original paper or thesis. The wiki gives the reference for each.

To cite the wiki itself, for example for a figure or an analysis that originates here:

> Microspine Wiki contributors. *Title of the page*. Microspine Wiki, date you read it, address of the page.

Pages change, so give the date.

## Licence

- **Text and original figures** are released under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). You may copy, adapt and redistribute them, including commercially, provided you give credit.
- **Code**, meaning the site generator, the figure scripts, the interactive tools and the scripts in `tools/`, is released under the MIT licence.
- **Figures reproduced from other works** remain under their own terms, which are stricter. Each one says so in its caption, and all are listed in [Credits and licences](credits.md).
