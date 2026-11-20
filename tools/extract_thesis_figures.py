#!/usr/bin/env python3
"""Cut the figures this wiki reproduces out of Alan Asbeck's PhD thesis.

The thesis (Stanford, 2010, https://purl.stanford.edu/xt008ys4403) is licensed
CC BY-NC-ND 3.0 US. The figures are reproduced whole and unaltered: this script
only renders a page and crops to one figure. Do not edit the results.

Usage:  python3 tools/extract_thesis_figures.py path/to/thesis.pdf
Needs:  poppler's `pdftoppm` on the PATH, and Pillow (pip install pillow).
"""
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops

OUT = Path(__file__).resolve().parent.parent / "wiki" / "assets" / "thesis"
DPI = 220

# name: (PDF page, top and bottom of the band holding the figure as page fractions, format)
FIGURES = {
    "asbeck2010-fig2-01-spine-on-concrete": (27, 0.120, 0.430, "jpg"),
    "asbeck2010-fig2-07-spinybot": (37, 0.120, 0.436, "jpg"),
    "asbeck2010-fig2-11-limit-curve-roofing-paper": (45, 0.247, 0.672, "png"),
    "asbeck2010-fig4-01-rise-and-zman": (78, 0.120, 0.442, "jpg"),
    "asbeck2010-fig4-02-toes": (79, 0.120, 0.398, "jpg"),
    "asbeck2010-fig4-03-toe-group": (80, 0.115, 0.392, "jpg"),
    "asbeck2010-fig4-04-spine-tips": (82, 0.447, 0.642, "jpg"),
    "asbeck2010-fig4-08-four-bar-toe": (88, 0.115, 0.395, "jpg"),
    "asbeck2010-fig4-25-toes-on-tarpaper": (108, 0.178, 0.452, "jpg"),
    "asbeck2010-fig4-26-force-trace": (109, 0.115, 0.438, "png"),
    "asbeck2010-fig5-02-patches": (124, 0.400, 0.652, "jpg"),
}


def trim(image, pad=14):
    """Crop to the non-white content, keeping a small white margin."""
    background = Image.new("RGB", image.size, (255, 255, 255))
    box = ImageChops.difference(image, background).point(lambda v: 255 if v > 14 else 0).getbbox()
    if not box:
        return image
    left, top, right, bottom = box
    return image.crop((max(0, left - pad), max(0, top - pad), min(image.width, right + pad), min(image.height, bottom + pad)))


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    pdf = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for name, (page, top, bottom, kind) in FIGURES.items():
            stem = Path(tmp) / name
            subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(DPI), "-png", "-singlefile", str(pdf), str(stem)], check=True)
            image = Image.open(f"{stem}.png").convert("RGB")
            band = image.crop((0, int(top * image.height), image.width, int(bottom * image.height)))
            figure = trim(band)
            target = OUT / f"{name}.{kind}"
            if kind == "jpg":
                figure.save(target, quality=88, optimize=True, progressive=True)
            else:
                figure.save(target, optimize=True)
            print(f"{target.name:56} {figure.width}x{figure.height}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
