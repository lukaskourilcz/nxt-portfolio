/**
 * A single faint blueprint grid behind the whole page, faded toward the
 * edges with a radial mask. Gives the "dev" canvas feel without per-section noise.
 */
export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="bg-grid pointer-events-none fixed inset-0 -z-10"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 45%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse at center, black 45%, transparent 100%)",
      }}
    />
  );
}
