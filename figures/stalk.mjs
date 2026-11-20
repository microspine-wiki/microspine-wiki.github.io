/* The compliant-stalk model of a spine suspension (Asbeck 2010, section 4.2.3;
   Asbeck & Cutkosky 2012, equation 3). One function, shared by the figures. */

// Published fit to the RiSE toe (Asbeck & Cutkosky 2012): lengths in metres,
// stiffness in N/m and N·m/rad, angles in radians.
export const RISE = {r0: 0.030, theta0: 30 * Math.PI / 180, thetaP: 3 * Math.PI / 180, kr: 191, kTheta: 0.0015};

/**
 * Tip force after the base is pressed `preload` metres toward the wall and
 * then dragged `drag` metres down it.
 *
 * During the preload the tip is free to slide, so the stalk keeps its length
 * and only swings toward the wall. The tip then catches (a pin joint) and the
 * drag stretches the stalk. Returns shear Fs (along the wall, positive when the
 * wall holds the spine up) and normal Fn (positive pressing into the wall,
 * negative pulling out of it), in newtons, plus the stalk's length and angle.
 */
export function stalkForce({r0, theta0, thetaP, kr, kTheta}, preload, drag) {
  const x = r0 * Math.sin(theta0) - preload; // base distance from the wall
  const angleAtCatch = Math.asin(Math.min(1, Math.max(-1, x / r0)));
  const y = r0 * Math.cos(angleAtCatch) + drag; // base distance below the tip
  const r = Math.hypot(x, y);
  const theta = Math.atan2(x, y);
  const axial = kr * (r - r0); // tension along the stalk
  const lateral = kTheta * (theta0 + thetaP - theta) / r; // torsion spring, at the tip
  return {
    Fs: axial * Math.cos(theta) + lateral * Math.sin(theta),
    Fn: -axial * Math.sin(theta) + lateral * Math.cos(theta),
    r, theta,
  };
}

/** Loading line: tip forces along a drag at constant preload. */
export function loadingLine(params, preload, maxDrag = 0.008, steps = 40) {
  return Array.from({length: steps + 1}, (_, i) => {
    const drag = maxDrag * i / steps;
    return {drag, ...stalkForce(params, preload, drag)};
  });
}
