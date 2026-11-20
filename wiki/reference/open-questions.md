---
description: Things the published record does not settle. If you are looking for a project, or have data that answers one of these, start here.
status: draft
---

# Open questions

This page lists gaps: questions that the sources behind this wiki raise and do not answer, and measurements that would make the rest of the wiki more useful. Each is an invitation. If you can close one, [contribute](../about/contributing.md), and it moves from here to the page where the answer belongs.

## Suspensions

- **A softening shear spring.** Analysis says a suspension whose shear stiffness falls with extension shares load much better than a linear one. The RiSE toe is linear. Has anyone built and measured a softening toe? ([Load sharing](../design/load-sharing.md#goal-1-softening-springs))
- **A wider angular range without an ankle.** The overload stop confines a toe to 10° to 15° of good behaviour. Can the stop be redesigned to release at the end of travel without limiting rotation?
- **Shorter toes.** Length buys straight loading lines and costs packing density. Is there a mechanism that gets radial loading lines from a short toe?
- **Hysteresis and creep.** Polyurethane flexures show both. How do loading lines change over minutes of sustained load, and over thousands of cycles?
- **Parameters of the Z-Man toe.** Its geometry is published; its fitted stiffnesses are not.

## Arrays and patches

- **Row-by-row engagement.** How does the fraction of spines engaged vary from the top row to the bottom row of a multi-row patch, and how does that change with the way the patch is loaded? No measurements appear to be published.
- **Suspensions for many rows.** The single row is understood. What is the equivalent of the stalk model for a patch?
- **Flexible backings and graded spine lengths.** Both are suggested in the thesis as ways to make a patch conform. Neither seems to have been tested systematically.
- **Preload of large arrays.** What is the smallest force with which a thousand spines can be seated, and what limits it?

## Surfaces

- **A shared table of surfaces.** Limit angle, contact strength and asperity spacing, measured the same way, for common building and natural materials. The published set is small ([Which surfaces can be climbed](../fundamentals/surfaces.md)).
- **Three-dimensional asperity statistics.** The original model is a two-dimensional profile. Modern optical scanners give full surfaces. Does a three-dimensional analysis predict engagement better?
- **Undercut ledges.** A stylus cannot see them. How much of real holding happens on features with surface angles beyond 90°?
- **Wet, dusty, icy, mossy, painted.** Spines are said to tolerate dirt and moisture. By how much, on which surfaces?
- **Damage.** How quickly do spines wear a given wall, and does a wall get easier or harder to climb with repeated passes?

## Spines

- **Tip shape and wear.** What tip radius does a hook settle at in service, on which materials, and how does performance change as it gets there?
- **Better than fishhooks.** Hooks are available and adequate. What would a spine designed for the purpose look like: a logarithmic-spiral profile, a different steel, a coating, a replaceable tip?
- **Friction.** A higher friction coefficient between tip and surface would open up many more asperities. Is there a practical way to get it?

## Whole systems

- **Validation of the limbed-climber analysis.** The [sizing analysis](../climbing/sizing-a-limbed-climber.md) on this wiki is unvalidated. Measurements of pad forces on a real robot through a gait cycle would test it.
- **Force control with pads that slip.** What control law keeps every pad inside its limit curve when the limits are uncertain and the pads slip?
- **Sensing engagement.** What is the cheapest reliable signal that a pad has caught: shear force, sound, motion of the toes?
- **Comparable tests for grippers.** Papers on spine grippers report holding forces on different rocks with different procedures. A common test rock and protocol would let designs be compared.
- **Learning to climb with spines.** A contact model for spine arrays that is fast enough for reinforcement learning, and faithful to the limit curve and its statistics, would be widely useful. Does one exist, and how well does a controller trained on it transfer to hardware?

## History

- **The undocumented middle.** Much of what was learned about human-scale spine climbing between 2007 and 2010 is recorded only in unreleased notes ([The BDML Z-Man wiki](../about/bdml-archive.md)). If you took part and can share what you learned, this wiki would be a good home for it.
