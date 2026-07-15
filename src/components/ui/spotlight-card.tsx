"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Aceternity/Magic-UI-style spotlight card: a soft radial glow that follows the
 * cursor and a border that lifts on hover, so a grid of these reads as
 * "designed", not as the same flat box repeated N times. Renders an <article>
 * by default and carries its own client boundary, so server components can drop
 * it in and pass server-rendered children straight through.
 *
 * The glow only appears on hover (pointer devices) — touch screens and
 * reduced-motion users just get the static card, no animation loop involved.
 */
export function SpotlightCard({
  children,
  className = "",
  glow = "var(--color-ring, #34d399)",
}: {
  children: ReactNode;
  className?: string;
  /** Glow color; defaults to the theme ring (emerald). */
  glow?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <article ref={ref} onMouseMove={handleMove} className={className}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, " +
            glow +
            " 20%, transparent), transparent 60%)",
        }}
      />
      {children}
    </article>
  );
}
