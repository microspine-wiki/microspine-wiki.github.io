# Figures

Every original figure in the wiki is drawn by a script in this folder. Each module exports `file`, the name of the SVG it writes to `wiki/assets/figures/`, and `render()`, which returns the SVG as a string.

```sh
node figures/build.mjs                  # redraw every figure
node figures/build.mjs stalk-model      # redraw one
```

The SVGs are committed, so pages show their figures on GitHub and in Obsidian without a build. Change the script, rebuild, and commit both.

| Module | Role |
|---|---|
| `lib.mjs` | drawing helpers: shapes, text with sub- and superscripts, arrows, springs, axes, the colour constants |
| `stalk.mjs` | the compliant-stalk model shared by the stalk figures; `tools/stalk_model.py` is the same model in Python |
| `build.mjs` | writes every figure |
| everything else | one figure each |

## Conventions

- **Plate.** White, 720 units wide, which is the width of the article column, so text drawn at 11.5 to 13 units appears at its natural size. Height as the figure needs.
- **Self-contained.** Presentation attributes only: no `<style>`, no scripts, no fonts or images from elsewhere. The file must look the same on the site, on GitHub and in Obsidian.
- **Accessible.** Pass `title` and `description` to `svg()`, and give the image alt text on the page.
- **Text** is set in Inter, falling back to Helvetica or Arial, in ink `#1d1d1f` or secondary ink `#6e6e73`. Text is never set in a series colour; a coloured mark next to it carries the identity.
- **Series colours**, assigned in this order and never cycled: blue `#0071e3`, orange `#eb6834`, aqua `#1baf7a`, violet `#6250d6`. A fifth series means the figure should be split into small multiples instead.
- **Ordered series**, such as increasing preload, use the single-hue ramp `#86b6ef`, `#5598e7`, `#2a78d6`, `#184f95`, light for small and dark for large.
- **Good, bad and warning tints** appear only together with a text label.
- **Labels on the lines** where possible, and a key whenever two or more series share a panel.
- **One vertical scale per panel.** Quantities with different units go in separate panels, never on a second axis.
- **The wall** is drawn as a light grey band (`C.wall`) with a darker edge (`C.wallEdge`), on the left of a side view.

## Colour checks

The four series colours were checked as a set against the white plate with a palette validator: lightness and chroma within range, contrast of marks against white, and distance between adjacent pairs in OKLab under normal vision and under simulated protanopia, deuteranopia and tritanopia. All checks passed. The ramp was checked as an ordinal ramp: each step is distinguishable from its neighbours, and the lightest step has at least 2:1 contrast with white. If you change a colour, check the whole set again in the same way, and keep the guarantee that no figure relies on colour alone.
