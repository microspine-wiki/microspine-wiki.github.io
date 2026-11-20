#!/usr/bin/env python3
"""Static loads on the spine pads of a four-limbed climber on a vertical wall.

Wiki page: wiki/climbing/sizing-a-limbed-climber.md
Needs numpy and scipy (pip install numpy scipy).

Frame: x to the climber's right, y up the wall, z out of the wall.
Pad i sits on the wall at (x_i, y_i, 0); the centre of mass is at (xc, yc, h).
The wall applies (Fx, Fy, Fz) to each pad: Fz > 0 pushes the climber away
(the pad is in compression), Fz < 0 pulls it in (the spines are in adhesion).

What a spine pad can do:
    Fy >= 0                    spines only carry load pulling them down the wall
    -Fz <= tan(cone) * Fy      adhesion only within `cone` of the wall (the limit curve)
    |Fx| <= side * Fy          sideways force is a small fraction of the shear (assumption)
The load carried by the spines is sqrt(Fx^2 + Fy^2 + adhesion^2). Compression is
taken by the backing of the pad, not by the spines.

How the internal forces are shared out is up to the controller. This script
assumes the best case: it minimises the largest hand load, then the largest
foot load. A real controller will do worse, which is what the margin is for.

    python3 tools/climber_loads.py
    python3 tools/climber_loads.py --mass 30 --h 0.12 --L 0.95 --cone 15 --preload 5
"""
import argparse

import numpy as np
from scipy.optimize import linprog, minimize


def solve(pads, kinds, weight, h, xc_range, tan_cone, side, external=None):
    """Best-case force distribution for the pads in contact.

    pads: [(x, y)], kinds: 'H' or 'F' per pad.
    external: ((x, y), (Fx, Fy, Fz)), a known extra force from the wall, for
    example the preload on a pad that is being placed.
    Returns {'pads': [{Fx, Fy, Fz, load}], 'xc': lateral position of the centre of mass}.
    """
    n = len(pads)
    count = 4 * n + 3  # per pad: Fx, Fy, compression, adhesion; then xc and the two minimax bounds
    i_xc, i_hand, i_foot = 4 * n, 4 * n + 1, 4 * n + 2

    def col(pad, k):
        return 4 * pad + k

    point = np.zeros(3)
    force = np.zeros(3)
    if external is not None:
        point = np.array([external[0][0], external[0][1], 0.0])
        force = np.array(external[1], float)
    moment = np.cross(point, force)

    a_eq, b_eq = [], []

    def equation(row, value):
        a_eq.append(row)
        b_eq.append(value)

    row = np.zeros(count)
    for i in range(n):
        row[col(i, 0)] = 1
    equation(row, -force[0])                      # sum Fx = 0
    row = np.zeros(count)
    for i in range(n):
        row[col(i, 1)] = 1
    equation(row, weight - force[1])              # sum Fy = W
    row = np.zeros(count)
    for i in range(n):
        row[col(i, 2)] = 1
        row[col(i, 3)] = -1
    equation(row, -force[2])                      # sum Fz = 0
    row = np.zeros(count)
    for i, (_, y) in enumerate(pads):
        row[col(i, 2)] = y
        row[col(i, 3)] = -y
    equation(row, -h * weight - moment[0])        # moments about x: tipping backward
    row = np.zeros(count)
    for i, (x, _) in enumerate(pads):
        row[col(i, 2)] = -x
        row[col(i, 3)] = x
    equation(row, -moment[1])                     # moments about y: swinging like a door
    row = np.zeros(count)
    for i, (x, y) in enumerate(pads):
        row[col(i, 1)] = x
        row[col(i, 0)] = -y
    row[i_xc] = -weight
    equation(row, -moment[2])                     # moments about z: rotating in the wall plane

    a_ub, b_ub = [], []
    for i in range(n):
        for terms in ([(3, 1), (1, -tan_cone)], [(0, 1), (1, -side)], [(0, -1), (1, -side)]):
            row = np.zeros(count)
            for k, value in terms:
                row[col(i, k)] = value
            a_ub.append(row)
            b_ub.append(0)
    linear = len(b_ub)
    for i in range(n):
        row = np.zeros(count)
        row[col(i, 1)] = 1
        row[col(i, 3)] = 1
        row[i_hand if kinds[i] == 'H' else i_foot] = -1
        a_ub.append(row)
        b_ub.append(0)

    bounds = []
    for _ in range(n):
        bounds += [(None, None), (0, None), (0, None), (0, None)]
    bounds += [xc_range, (0, None), (0, None)]
    cost = np.zeros(count)
    cost[i_hand] = 1
    cost[i_foot] = 0.01
    for i in range(n):
        cost[col(i, 2)] += 1e-6
        cost[col(i, 3)] += 1e-6
    a_eq, b_eq, a_ub, b_ub = map(np.array, (a_eq, b_eq, a_ub, b_ub))
    first = linprog(cost, A_ub=a_ub, b_ub=b_ub, A_eq=a_eq, b_eq=b_eq, bounds=bounds, method="highs")
    if not first.success:
        return None
    v = first.x

    def loads(v):
        return np.array([np.sqrt(v[col(i, 0)] ** 2 + v[col(i, 1)] ** 2 + v[col(i, 3)] ** 2) for i in range(n)])

    hands = [i for i in range(n) if kinds[i] == 'H']
    feet = [i for i in range(n) if kinds[i] == 'F']
    constraints = [
        {'type': 'eq', 'fun': lambda v: a_eq @ v - b_eq},
        {'type': 'ineq', 'fun': lambda v: (b_ub - a_ub @ v)[:linear]},
        {'type': 'ineq', 'fun': lambda v: np.concatenate([v[i_hand] - loads(v)[hands], v[i_foot] - loads(v)[feet]])},
    ]
    refined = minimize(lambda v: v[i_hand] + 0.01 * v[i_foot], v, constraints=constraints, bounds=bounds,
                       method="SLSQP", options={'maxiter': 800, 'ftol': 1e-10})
    if refined.success and refined.fun <= first.fun + 1e-6:
        v = refined.x
    result = []
    for i in range(n):
        fx, fy, push, pull = v[col(i, 0)], v[col(i, 1)], v[col(i, 2)], v[col(i, 3)]
        result.append(dict(Fx=fx, Fy=fy, Fz=push - pull, load=float(np.sqrt(fx ** 2 + fy ** 2 + pull ** 2))))
    return dict(pads=result, xc=v[i_xc])


def stances(args):
    weight = args.mass * 9.81
    tan_cone = np.tan(np.radians(args.cone))
    position = {"RH": (args.xh, args.L), "LH": (-args.xh, args.L), "RF": (args.xf, 0.0), "LF": (-args.xf, 0.0)}
    kind = {"RH": "H", "LH": "H", "RF": "F", "LF": "F"}
    rows = []
    for lifted, label, preload in [(None, "all four on the wall", 0.0),
                                   ("RH", "right hand lifted", args.preload),
                                   ("RF", "right foot lifted", 0.0)]:
        active = [name for name in position if name != lifted]
        external = (position[lifted], (0, 0, preload)) if (lifted and preload) else None
        solution = solve([position[name] for name in active], [kind[name] for name in active],
                         weight, args.h, (-args.shift, args.shift), tan_cone, args.side, external)
        rows.append((label, active, solution))
    return weight, rows


def main():
    parser = argparse.ArgumentParser(description="Static loads on the spine pads of a four-limbed climber")
    parser.add_argument("--mass", type=float, default=30.0, help="mass including the pads, kg")
    parser.add_argument("--h", type=float, default=0.15, help="distance of the centre of mass from the wall, m")
    parser.add_argument("--L", type=float, default=0.9, help="height of the hands above the feet, m")
    parser.add_argument("--xh", type=float, default=0.20, help="hands at +/- this distance from the centreline, m")
    parser.add_argument("--xf", type=float, default=0.15, help="feet at +/- this distance from the centreline, m")
    parser.add_argument("--cone", type=float, default=15.0, help="largest angle from the wall at which a pad holds, degrees")
    parser.add_argument("--side", type=float, default=0.15, help="limit on sideways force as a fraction of shear")
    parser.add_argument("--shift", type=float, default=0.10, help="how far the centre of mass may move sideways, +/- m")
    parser.add_argument("--preload", type=float, default=5.0, help="force pressing a newly placed hand onto the wall, N")
    parser.add_argument("--engaged", type=float, default=0.3, help="fraction of spines expected to engage")
    parser.add_argument("--strength", type=float, default=1.5, help="load at which one spine contact fails, N")
    parser.add_argument("--margin", type=float, default=1.0, help="extra factor on spine count")
    args = parser.parse_args()

    weight, rows = stances(args)
    print(f"W = {weight:.0f} N, h = {args.h} m, L = {args.L} m, cone = {args.cone} deg, preload = {args.preload} N")
    print(f"total pull-in needed at the hands, W h / L = {args.h * weight / args.L:.0f} N")
    worst = {"H": 0.0, "F": 0.0}
    for label, active, solution in rows:
        if solution is None:
            print(f"{label}: no solution. The pads cannot hold this stance: reduce h, increase L or reduce the preload.")
            continue
        print(f"{label} (centre of mass shifted {solution['xc']:+.2f} m)")
        for name, pad in zip(active, solution["pads"]):
            print(f"   {name}: up the wall {pad['Fy']:5.0f} N   normal {pad['Fz']:+5.0f} N   sideways {pad['Fx']:+4.0f} N   on the spines {pad['load']:5.0f} N")
            worst[name[1]] = max(worst[name[1]], pad["load"])
    per_spine = args.engaged * args.strength / 2
    for key, name in (("H", "hand"), ("F", "foot")):
        number = args.margin * worst[key] / per_spine
        print(f"largest {name} load {worst[key]:.0f} N -> about {number:.0f} spines "
              f"({args.engaged:.0%} engaged, contacts fail at {args.strength} N, margin x{args.margin})")


if __name__ == "__main__":
    main()
