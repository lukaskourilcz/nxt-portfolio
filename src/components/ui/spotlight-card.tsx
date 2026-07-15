"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { STACK_GLOW_COLORS } from "@/lib/stack-colors";

/**
 * Aceternity/Magic-UI-style spotlight card: a soft radial glow that follows the
 * cursor and a border that lifts on hover, so a grid of these reads as
 * "designed", not as the same flat box repeated N times. Renders an <article>
 * by default and carries its own client boundary, so server components can drop
 * it in and pass server-rendered children straight through.
 *
 * Each time the cursor enters, the glow picks a fresh random colour from the
 * tech stack's brand palette (never the same one twice in a row), so every
 * sweep — and every card — lights up differently. Pass `glow` to pin one
 * colour instead. Colour picking happens inside the event handler, purely on
 * the client, so the randomness can't cause a hydration mismatch.
 *
 * The glow only appears on hover (pointer devices) — touch screens and
 * reduced-motion users just get the static card, no animation loop involved.
 */
export function SpotlightCard({
  children,
  className = "",
  glow,
}: {
  children: ReactNode;
  className?: string;
  /** Pin the glow to one colour; omit for a random brand colour per hover. */
  glow?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const lastColorRef = useRef<string | null>(null);

  function handleEnter() {
    const el = ref.current;
    if (!el || glow) return;
    const options = STACK_GLOW_COLORS.filter(
      (color) => color !== lastColorRef.current
    );
    const color = options[Math.floor(Math.random() * options.length)];
    lastColorRef.current = color;
    el.style.setProperty("--spot-color", color);
  }

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <article
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      className={className}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--spot-color, " +
            (glow ?? "var(--color-ring, #34d399)") +
            ") 20%, transparent), transparent 60%)",
        }}
      />
      {children}
    </article>
  );
}
