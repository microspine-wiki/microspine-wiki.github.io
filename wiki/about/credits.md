---
description: Where every figure, library and font on this site comes from, and the terms on which it is used.
status: draft
---

# Credits and licences

## This wiki's own material

The text, and the original diagrams and charts in `wiki/assets/figures/`, are the work of the wiki's contributors and are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The figures are drawn by the scripts in `figures/` from the models and published data cited in their captions. The site generator, the interactive tools and the scripts in `tools/` are released under the MIT licence.

## Figures from Asbeck 2010

Eleven figures are reproduced from Alan T. Asbeck's doctoral thesis:

> Alan Thomas Asbeck, *Compliant directional suspensions for climbing with spines and adhesives*, Ph.D. thesis, Stanford University, 2010. [purl.stanford.edu/xt008ys4403](https://purl.stanford.edu/xt008ys4403)

The figures are © Alan T. Asbeck. The thesis states: "This work is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 United States License" ([CC BY-NC-ND 3.0 US](https://creativecommons.org/licenses/by-nc-nd/3.0/us/)). The record in the Stanford Digital Repository gives the 3.0 Unported version of the same licence. Both allow the work to be shared with attribution, for non-commercial purposes and without changes.

So these figures:

- are reproduced whole: each was cut from a 220 dpi image of its page along the figure's own boundary, with the white margin trimmed and nothing else changed (`tools/extract_thesis_figures.py`);
- carry their figure number, the copyright holder and the licence in their caption, which is written for this wiki;
- are **not** covered by this wiki's CC BY licence. If you reuse the wiki's content commercially, leave them out.

| File | Thesis figure | Shows | Used on |
|---|---|---|---|
| `asbeck2010-fig2-01-spine-on-concrete.jpg` | 2.1 | A typical spine and surface | [What microspines are](../fundamentals/what-are-microspines.md) |
| `asbeck2010-fig2-07-spinybot.jpg` | 2.7 | The upper part of SpinybotII, and spines engaging | [Spinybot](../systems/spinybot.md) |
| `asbeck2010-fig2-11-limit-curve-roofing-paper.png` | 2.11 | A limit curve on tar paper, with the effects of surface failure | [Force space and the limit curve](../fundamentals/limit-curve.md) |
| `asbeck2010-fig4-01-rise-and-zman.jpg` | 4.1 | The RiSE robot, and the author hanging from Z-Man spines | [What microspines are](../fundamentals/what-are-microspines.md) |
| `asbeck2010-fig4-02-toes.jpg` | 4.2 | A RiSE toe and a Z-Man toe, photographed and modelled | [Toe designs](../design/toe-designs.md) |
| `asbeck2010-fig4-03-toe-group.jpg` | 4.3 | A group of RiSE toes assembled with side plates | [Arrays, feet and large patches](../design/arrays-and-patches.md) |
| `asbeck2010-fig4-04-spine-tips.jpg` | 4.4 | New, dull and bent spine tips | [Toe designs](../design/toe-designs.md) |
| `asbeck2010-fig4-08-four-bar-toe.jpg` | 4.8 | The four-bar linkage toe | [Toe designs](../design/toe-designs.md) |
| `asbeck2010-fig4-25-toes-on-tarpaper.jpg` | 4.25 | RiSE toes on tar paper | [Test methods](../testing/test-methods.md) |
| `asbeck2010-fig4-26-force-trace.png` | 4.26 | Forces over time for RiSE toes on tar paper | [Test methods](../testing/test-methods.md) |
| `asbeck2010-fig5-02-patches.jpg` | 5.2 | Patches of spines and of dry adhesive | [Arrays, feet and large patches](../design/arrays-and-patches.md) |

The descriptions follow the thesis's list of figures.

## Libraries

The site is built with two libraries, copied unchanged into `vendor/` together with their licences.

| Library | Version | Licence | Used to |
|---|---|---|---|
| [markdown-it](https://github.com/markdown-it/markdown-it) | 15.0.3 | MIT, © 2014 Vitaly Puzrin and Alex Kocharin | turn Markdown into HTML |
| [KaTeX](https://katex.org/) | 0.19.1 | MIT, © 2013–2020 Khan Academy and other contributors | typeset math as MathML |

Both run only when the site is built. Nothing from them is sent to the reader's browser except the HTML and MathML they produce.

## Fonts

Text is set in [Inter](https://rsms.me/inter/) and Inter Tight, designed by Rasmus Andersson, and code in [JetBrains Mono](https://www.jetbrains.com/lp/mono/), all under the SIL Open Font License 1.1. Pages load them from Google Fonts, the only resource the site fetches from another server. Math is drawn with the fonts already on the reader's device.

## Names and trademarks

Names of products, materials and companies, such as Smooth-On, Task, VytaFlex and Tiemco, are trademarks of their owners and are used here only to identify them. Their mention implies no endorsement in either direction.

## Corrections and removal

If you hold rights in something shown here and believe it is used wrongly, or want it credited differently or removed, open an issue in the project's repository. Requests are handled promptly.
