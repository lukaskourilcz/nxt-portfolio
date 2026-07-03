"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "motion/react";

// A single faint blueprint grid behind the whole page, faded toward the edges.
// A brighter emerald copy lights up in a soft spotlight that follows the cursor.
export function BackgroundGrid() {
  const reduce = useReducedMotion();

  // Raw pointer position drives a spring so the spotlight trails the cursor with
  // a soft lag instead of snapping — replaces the old hand-rolled rAF loop.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);
  const springCfg = { stiffness: 350, damping: 40, mass: 0.6 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  // Soft circular spotlight mask that reveals the emerald grid around the cursor.
  const mask = useMotionTemplate`radial-gradient(circle 170px at ${sx}px ${sy}px, #000 0%, #000 25%, transparent 72%)`;

  useEffect(() => {
    if (reduce) return;
    // The spotlight follows a cursor, so it's a hover/fine-pointer feature only.
    // On touch devices a finger drag-scroll fires pointermove events, which would
    // otherwise light the grid up and drag it along under the finger while
    // scrolling — the mobile scroll "glitch". Skip it on touch-only devices.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let first = true;
    const onMove = (e: PointerEvent) => {
      // Ignore touch pointers on hybrid devices (touchscreen laptops) so a
      // finger scroll never triggers the cursor spotlight.
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      // Jump the spring to the first position so the glow fades in where the
      // cursor is rather than streaking in from the top-left offscreen origin.
      if (first) {
        sx.jump(e.clientX);
        sy.jump(e.clientY);
        first = false;
      }
      opacity.set(1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y, sx, sy, opacity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="bg-grid absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 100%)",
        }}
      />
      <motion.div
        className="bg-grid-glow absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}
