#!/usr/bin/env python3
"""Reference implementation of the compliant-stalk model of a spine suspension.

Model: Asbeck (2010), PhD thesis, section 4.2.3; Asbeck & Cutkosky (2012),
"Designing compliant spine mechanisms for climbing", equation 3.
Wiki page: wiki/design/stalk-model.md

Conventions
    Fs  shear along the wall, positive when the wall holds the spine up   [N]
    Fn  normal force, positive pressing into the wall, negative = adhesion [N]
    Angles are measured from the wall. Lengths in metres.

Run it to print loading lines for the published fit to the RiSE toe:

    python3 tools/stalk_model.py
    python3 tools/stalk_model.py --theta0 20 --ktheta 0.003 --preloads 0 3 6
    python3 tools/stalk_model.py --plot        (needs matplotlib)
"""
import argparse
from dataclasses import dataclass
from math import asin, atan2, cos, degrees, hypot, radians, sin


@dataclass
class Stalk:
    """Parameters of one stalk. Defaults: Asbeck & Cutkosky (2012), RiSE toe."""
    r0: float = 0.030          # rest length [m]
    theta0: float = radians(30)  # rest angle from the wall [rad]
    thetap: float = radians(3)   # preload angle of the torsion spring [rad]
    kr: float = 191.0          # axial stiffness [N/m]
    ktheta: float = 0.0015     # torsional stiffness [N m/rad]


def tip_force(stalk: Stalk, preload: float, drag: float):
    """Force of the wall on the spine tip.

    The base is first pressed `preload` metres toward the wall. During that
    motion the tip is free to slide, so the stalk keeps its length and swings
    toward the wall. The tip then catches (a pin joint) and the base is dragged
    `drag` metres down the wall, which stretches the stalk.

    Returns (Fs, Fn, r, theta).
    """
    x = stalk.r0 * sin(stalk.theta0) - preload   # base distance from the wall
    if x <= 0:
        raise ValueError("preload pushes the base through the wall")
    y = stalk.r0 * cos(asin(x / stalk.r0)) + drag  # base distance below the tip
    r, theta = hypot(x, y), atan2(x, y)
    axial = stalk.kr * (r - stalk.r0)                                  # tension along the stalk
    lateral = stalk.ktheta * (stalk.theta0 + stalk.thetap - theta) / r  # torsion spring, at the tip
    fs = axial * cos(theta) + lateral * sin(theta)
    fn = -axial * sin(theta) + lateral * cos(theta)
    return fs, fn, r, theta


def loading_line(stalk: Stalk, preload: float, max_drag: float = 0.008, steps: int = 40):
    """Tip forces along a drag at constant preload: list of (drag, Fs, Fn)."""
    return [(max_drag * i / steps, *tip_force(stalk, preload, max_drag * i / steps)[:2]) for i in range(steps + 1)]


def stiffness(stalk: Stalk, preload: float, drag: float, step: float = 1e-6):
    """Numerical stiffness matrix [[kxx, kxy], [kxy, kyy]] in N/m.

    Uses the convention of the paper: x and y are displacements of the tip
    relative to the base, x away from the wall and y up it. Pressing the base
    toward the wall is +x, dragging it down the wall is +y. A well-behaved
    suspension has kxx > 0 and small, kyy > 0, and kxy < 0.
    """
    def force(dx, dy):
        fs, fn, _, _ = tip_force(stalk, preload + dx, drag + dy)
        return fn, fs
    fn_x1, fs_x1 = force(step, 0)
    fn_x0, fs_x0 = force(-step, 0)
    fn_y1, fs_y1 = force(0, step)
    fn_y0, fs_y0 = force(0, -step)
    return [[(fn_x1 - fn_x0) / (2 * step), (fn_y1 - fn_y0) / (2 * step)],
            [(fs_x1 - fs_x0) / (2 * step), (fs_y1 - fs_y0) / (2 * step)]]


def main():
    parser = argparse.ArgumentParser(description="Loading lines of the compliant-stalk model")
    parser.add_argument("--r0", type=float, default=30.0, help="stalk length, mm (default 30)")
    parser.add_argument("--theta0", type=float, default=30.0, help="initial angle from the wall, degrees (default 30)")
    parser.add_argument("--thetap", type=float, default=3.0, help="torsion preload angle, degrees (default 3)")
    parser.add_argument("--kr", type=float, default=191.0, help="axial stiffness, N/m (default 191)")
    parser.add_argument("--ktheta", type=float, default=0.0015, help="torsional stiffness, N m/rad (default 0.0015)")
    parser.add_argument("--preloads", type=float, nargs="*", default=[0, 2, 4, 6], help="preload depths, mm")
    parser.add_argument("--drag", type=float, default=8.0, help="drag length, mm (default 8)")
    parser.add_argument("--plot", action="store_true", help="plot the lines in force space")
    args = parser.parse_args()

    stalk = Stalk(args.r0 / 1000, radians(args.theta0), radians(args.thetap), args.kr, args.ktheta)
    print(f"epsilon = ktheta / (r0^2 kr) = {stalk.ktheta / (stalk.r0 ** 2 * stalk.kr):.4f}")
    print("preload  drag     Fs      Fn    angle from wall   spring-back at zero drag")
    lines = []
    for preload_mm in args.preloads:
        line = loading_line(stalk, preload_mm / 1000, args.drag / 1000)
        lines.append((preload_mm, line))
        _, fs, fn = line[-1]
        springback = line[0][2]
        print(f"{preload_mm:5.1f} mm {args.drag:4.1f} mm {fs:6.2f} N {fn:6.2f} N {degrees(atan2(-fn, fs)):8.1f} deg {springback * 1000:14.1f} mN")
    k = stiffness(stalk, args.preloads[0] / 1000, args.drag / 2000)
    print(f"stiffness at half drag, first preload [N/m]: kxx={k[0][0]:.1f} kxy={k[0][1]:.1f} kyy={k[1][1]:.1f}")

    if args.plot:
        import matplotlib.pyplot as plt
        for preload_mm, line in lines:
            plt.plot([p[1] for p in line], [p[2] for p in line], label=f"preload {preload_mm:g} mm")
        plt.axhline(0, color="0.7", linewidth=0.8)
        plt.xlabel("shear Fs [N]")
        plt.ylabel("normal Fn [N]  (negative = adhesion)")
        plt.legend()
        plt.title("Stalk model loading lines")
        plt.show()


if __name__ == "__main__":
    main()
