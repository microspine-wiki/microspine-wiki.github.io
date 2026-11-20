---
description: How compliant spine toes are made. Covers the cast two-material toe used on Spinybot, RiSE and for Z-Man, the hooks, the details that decide whether a toe survives, and newer printed alternatives.
status: draft
---

# Building spine toes

The toes described in [Toe designs](../design/toe-designs.md) are flat parts made of two polymers, one hard and one rubbery, with a steel hook set into the hard one. They were made by **Shape Deposition Manufacturing** (SDM), a process of alternately machining and casting that lets several materials and embedded parts end up in one piece ([Cham 2002][cham2002]).

> [!NOTE]
> Published papers describe the materials and the result more fully than the workshop practice. Where this page gives a procedure, it is the generic SDM sequence. If you have built toes and know what the papers leave out, please [add it](../about/contributing.md).

## Materials

| Part | Material | Hardness | Used on |
|---|---|---|---|
| Hard body and links | Urethane, Innovative Polymers | 75 Shore D | SpinybotII ([Kim 2005][kim2005]) |
| Flexures | Urethane, Innovative Polymers | 20 Shore A | SpinybotII |
| Hard body and links | Polyurethane | Shore 72DC | RiSE, earlier toes ([Spenko 2008][spenko2008]) |
| Flexures | Polyurethane | 20 Shore A | RiSE, earlier toes |
| Hard body and links | Smooth-On Task 9 | 85 Shore D | RiSE and Z-Man toes ([Asbeck 2010][asbeck2010]) |
| Flexures | Smooth-On VytaFlex 30 | 30 Shore A | RiSE toes |
| Flexures | Smooth-On VytaFlex 60 | 60 Shore A | Z-Man toes |
| Spine | Steel fishing hook | | see [below](#hooks) |

Manufacturer's figures for the Smooth-On materials, from the current technical bulletins ([Task 9][smoothon-task9]; [VytaFlex][smoothon-vytaflex]). Formulations change, so check the bulletin for the batch you buy.

| Material | Shore hardness | Tensile strength | Elongation at break | Tear strength |
|---|--:|--:|--:|--:|
| Task 9 | 85 D | 7,800 psi (54 MPa) | 6 % | not listed |
| VytaFlex 30 | 30 A | 500 psi (3.4 MPa) | 1,000 % | 78 pli (13.7 kN/m) |
| VytaFlex 60 | 60 A | 880 psi (6.1 MPa) | 480 % | 136 pli (23.8 kN/m) |

The choice of flexure rubber sets the stiffnesses of the toe for a given geometry. The heavier the load per toe, the harder the rubber: 20 to 30 Shore A on robots of 0.4 to 4 kg, 60 Shore A for human climbing.

## The SDM sequence

SDM builds the part inside a block of machinable wax, which acts as both mould and fixture. In outline:

1. **Machine the cavities for the hard parts** into the wax: the body, the base link, and the end block of the normal flexure. Include a seat for the hook.
2. **Place the hooks** in their seats.
3. **Cast the hard urethane** into the cavities, over the hooks. Let it cure.
4. **Machine the cavities for the flexures.** They border the cured hard parts, and their outline decides how the soft material wraps around the hard one.
5. **Cast the flexure rubber.** Let it cure.
6. **Machine the top face flat** and drill the pin holes.
7. **Remove the part from the wax.**

Many toes are made in one block. Side plates and pins complete a foot ([Arrays, feet and large patches](../design/arrays-and-patches.md#one-row-a-foot)). A lab log from the summer of 2007, still on the [BDML wiki](../about/bdml-archive.md), follows this order day by day: mill and pour the hard parts with the hooks embedded, mill and pour the flexures, mill the pin holes, then make the side plates.

## Details that matter

These come from the design discussion in [Asbeck 2010][asbeck2010] (§4.2.2).

- **Wrap the rubber around the ends of the hard parts.** A flexure that ends in a flat butt joint against the hard material peels from the middle of that joint. Running the rubber along the edges of the hard part spreads the stress.
- **Use interlocking fingers where the stiffness mismatch is large.** The RiSE toe, with 30 A rubber against 85 D plastic, has fingers of rubber reaching into the hard part at the ends of one flexure. The Z-Man toe, with 60 A rubber, did not need them.
- **Leave material around the pivot hole.** About 1 to 2 mm below the pin. This is part of what sets the minimum standoff of the toe from the wall.
- **Build in the preload.** The normal flexure is stretched when the toe is assembled on its pins, so the pin spacing in the side plates must be slightly longer than the flexure's rest length.
- **Angle the rear flexure steeply.** It keeps toes in their plane and stops them tangling with their neighbours.
- **Keep the faces flat and smooth.** Toes slide against each other. Friction between them is what limits how soft the normal spring can be made.

## Hooks

The spines on the published toes are small dry-fly hooks:

| Hook | Tip radius | Used on | Source |
|---|--:|---|---|
| Tiemco TMC 100BL | about 25 µm | RiSE toes, tenth generation | [Spenko 2008][spenko2008] |
| Finer spine, not a fishhook | about 15 µm | RiSE toes, eleventh generation | [Spenko 2008][spenko2008] |
| Tiemco TMC 900BL, size 14 | 10–25 µm in use | RiSE and Z-Man toes | [Asbeck 2010][asbeck2010] |

The TMC 900BL is a barbless, forged, black-finished hook in fine wire ([TMC 900BL][tmc900bl]). A barbless hook has nothing behind the point to snag when the spine lets go.

What to look for in a hook:

- **Hardened steel.** The thesis credits these hooks' performance to their tip geometry and to hardened steel, both of which resist bending.
- **A slender, evenly tapered point.** The tip radius decides which surfaces you can climb.
- **Enough shank to embed.** The shank is cast into the hard body. The hooks are cut to length first ([below](#trimming-the-hooks)).

Tips wear from about 10 µm when new to 25–35 µm with heavy use, and can bend ([Toe designs](../design/toe-designs.md#the-spine-itself)). Design feet so that toes, or whole rows, can be replaced.

### Trimming the hooks

With hundreds of toes to a foot, cutting hooks is a real share of the work. The laboratory filmed two ways of doing it in 2009 ([BDML 2009 (videos)][bdml2009-hook-videos]).

![Video of a pair of pliers lying on a bench. A hand places a fishhook in the jaws and presses the handles closed with the palm; cut hooks collect on the bench.](../assets/video/bdml2009-trimming-hooks-pliers.mp4)

*Cutting hooks one at a time in pliers braced on the bench and closed with the palm. Video: Stanford BDML, 2009.*

![Video of hands holding a stack of white plastic pieces with a line of black hooks along one edge, snipping along the edge with small side cutters.](../assets/video/bdml2009-trimming-hooks-in-row.mp4)

*A faster technique: snipping hooks in quick succession with side cutters while they are held in a stack. Video: Stanford BDML, 2009.*

## Assembly

A row of toes is threaded onto three pins between two side plates: the pivot pin, the anchor pin of the normal flexure, and the overload pin. Check each toe after assembly:

- it swings back freely when its tip is pressed, and returns;
- its body slides along the wall direction and returns;
- at rest it sits against the overload pin;
- at the end of its travel the pin lifts the tip away.

## Printed toes

Casting in two materials around machined wax is slow. [Nadan 2022][nadan2022] apply Hybrid Deposition Manufacturing to microspines and also propose a toe made by fused-filament printing alone, in a single flexible material with a fishhook embedded during the print, with a stiffness model to guide the geometry. In tensile tests the printed toes matched cast SDM toes in normal and axial stiffness and bettered them in maximum load and fatigue. Their LORIS robot uses passive microspine grippers ([Nadan 2024][nadan2024]).

For JPL's rotary microspine wheels, new flexure materials, including viscoelastic and single-cast designs, shortened the path from a wheel concept to a tested wheel to three days ([Carpenter 2016][carpenter2016]).

## Other ways to make a suspension

- **Nitinol wire cast into hard urethane**, as in the [parallel four-bar toe](../design/toe-designs.md#parallel-four-bar-toe): 0.38 mm and 0.25 mm superelastic wires as the flexures.
- **Linearly constrained spines** in a housing, for dense arrays on heavy robots ([Wang 2017][wang2017]).
- **Metal or moulded single-material flexures.** Not documented in the open literature for the Stanford toes; a natural direction for anyone with wire EDM, laser cutting or injection moulding.

## Safety

Liquid urethanes contain isocyanates. Follow the supplier's safety data sheet: ventilation, gloves, eye protection. Cut hooks under a shield and wear safety glasses, since the offcuts fly. Finished feet are rows of very sharp points: cap them when they are not on a wall.

[asbeck2010]: ../reference/bibliography.md#asbeck2010
[cham2002]: ../reference/bibliography.md#cham2002
[kim2005]: ../reference/bibliography.md#kim2005
[spenko2008]: ../reference/bibliography.md#spenko2008
[nadan2022]: ../reference/bibliography.md#nadan2022
[nadan2024]: ../reference/bibliography.md#nadan2024
[carpenter2016]: ../reference/bibliography.md#carpenter2016
[wang2017]: ../reference/bibliography.md#wang2017
[smoothon-task9]: ../reference/bibliography.md#smoothon-task9
[smoothon-vytaflex]: ../reference/bibliography.md#smoothon-vytaflex
[tmc900bl]: ../reference/bibliography.md#tmc900bl
[bdml2009-hook-videos]: ../reference/bibliography.md#bdml2009-hook-videos
