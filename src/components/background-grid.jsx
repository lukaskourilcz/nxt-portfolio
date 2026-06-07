"use client";

import { useEffect, useRef } from "react";

// Soft circular spotlight that reveals the emerald grid around the cursor.
const SPOTLIGHT =
  "radial-gradient(circle 170px at var(--mx) var(--my), #000 0%, #000 25%, transparent 72%)";

// A single faint blueprint grid behind the whole page, faded toward the edges.
// A brighter emerald copy lights up in a soft spotlight that follows the cursor.
export function BackgroundGrid() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = glowRef.current;
    if (!el) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.opacity = "1";
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
      <div
        ref={glowRef}
        className="bg-grid-glow absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          "--mx": "-9999px",
          "--my": "-9999px",
          WebkitMaskImage: SPOTLIGHT,
          maskImage: SPOTLIGHT,
        }}
      />
    </div>
  );
}
