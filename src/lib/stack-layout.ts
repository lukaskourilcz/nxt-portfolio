// Geometry + seeded-randomness helpers for the tech-stack constellation in
// StackSection. Pure and deterministic: a given seed always yields the same
// arrangement, so the server and client renders match (no hydration mismatch).

export type Vec = { x: number; y: number };
export type Positioned<T> = { item: T } & Vec;

// Minimal shape the layout needs from a stack entry.
type Sizable = { name: string; size: string };

// Seeded PRNG (Park–Miller LCG): returns a function yielding numbers in [0, 1).
export function createSeededRandom(seed: number): () => number {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => (state = (state * 16807) % 2147483647) / 2147483647;
}

// Seeded Fisher–Yates shuffle. Returns a new array; the input is left untouched.
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const shuffled = items.slice();
  const random = createSeededRandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Spread `items` around a circle of `radius` (% of container) from
// `startAngleDeg`, with seeded jitter on angle and radius so it reads as a
// scattered cluster. Coordinates are percentages centred on (50, 50).
function placeOnRing<T>(
  items: T[],
  radius: number,
  startAngleDeg: number,
  random: () => number
): Positioned<T>[] {
  const count = items.length;
  return items.map((item, i) => {
    const angleJitterDeg = (random() - 0.5) * 16;
    const angleRad =
      ((startAngleDeg + (360 / count) * i + angleJitterDeg) * Math.PI) / 180;
    const jitteredRadius = radius + (random() - 0.5) * 5;
    return {
      item,
      x: 50 + jitteredRadius * Math.cos(angleRad),
      y: 50 + jitteredRadius * Math.sin(angleRad),
    };
  });
}

// Small icons span two rings; this many sit on the inner ring, the rest outside.
const INNER_SMALL_RING_COUNT = 14;

// Positions for one layout `seed`: each size tier is shuffled and placed on its
// own ring. Returns the positioned items ({ item, x, y }, in % coordinates)
// plus a name→position map for neighbour lookups.
export function buildConstellation<T extends Sizable>(stack: T[], seed: number) {
  const tier = (size: string) => stack.filter((icon) => icon.size === size);
  const large = seededShuffle(tier("lg"), seed + 7);
  const medium = seededShuffle(tier("md"), seed + 13);
  const small = seededShuffle(tier("sm"), seed + 29);

  const random = createSeededRandom(seed + 101);
  const positions: Positioned<T>[] = [
    ...placeOnRing(large, 14, 45, random),
    ...placeOnRing(medium, 24, 12, random),
    ...placeOnRing(small.slice(0, INNER_SMALL_RING_COUNT), 32, 8, random),
    ...placeOnRing(small.slice(INNER_SMALL_RING_COUNT), 40, 0, random),
  ];

  return {
    positions,
    positionByName: Object.fromEntries(
      positions.map((position) => [position.item.name, position])
    ) as Record<string, Positioned<T>>,
  };
}

// Repulsion reach (% of container) and max push strength (px).
const INFLUENCE_RADIUS = 26;
const MAX_PUSH_PX = 72;

// Pixel offset that pushes `name` away from `hoveredName`. Icons beyond
// INFLUENCE_RADIUS, or when nothing is hovered, don't move.
export function getRepulsionOffset(
  name: string,
  hoveredName: string | null,
  positionByName: Record<string, Vec>
): Vec {
  if (!hoveredName || hoveredName === name) return { x: 0, y: 0 };

  const hovered = positionByName[hoveredName];
  const target = positionByName[name];
  if (!hovered || !target) return { x: 0, y: 0 };

  const dx = target.x - hovered.x;
  const dy = target.y - hovered.y;
  const distance = Math.hypot(dx, dy) || 0.001;
  if (distance >= INFLUENCE_RADIUS) return { x: 0, y: 0 };

  const force = (1 - distance / INFLUENCE_RADIUS) * MAX_PUSH_PX;
  return { x: (dx / distance) * force, y: (dy / distance) * force };
}
