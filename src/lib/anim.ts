// Per-item entrance delay for staggered reveal animations, capped so long
// lists don't make the last item wait too long.
export function staggerDelay(index: number, step = 0.04, max = 0.25): number {
  return Math.min(index * step, max);
}
