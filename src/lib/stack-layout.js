// Pure geometry + randomness helpers for the tech-stack "constellation" — the
// scattered ring of floating icons in StackSection. Deliberately framework-free
// and deterministic: the same seed always produces the same arrangement, so the
// server render and the client render agree (no hydration mismatch).

// Deterministic pseudo-random generator (Park–Miller LCG). Returns a function
// that yields the next number in [0, 1) each time it's called.
export function createSeededRandom(seed) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => (state = (state * 16807) % 2147483647) / 2147483647;
}

// Fisher–Yates shuffle driven by a seed, so a given seed always yields the same
// order. Returns a new array; the input is left untouched.
export function seededShuffle(items, seed) {
  const shuffled = items.slice();
  const random = createSeededRandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Spread `items` evenly around a circle of the given `radius` (in % of the
// container), starting at `startAngleDeg`, with a little seeded jitter on both
// the angle and the radius so the ring reads as a hand-scattered cluster rather
// than a perfect circle. Coordinates are percentages centred on (50, 50).
function placeOnRing(items, radius, startAngleDeg, random) {
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

// Small icons are split across two rings; this many go on the inner ring and
// the rest spill onto an outer ring, so the cluster doesn't get too crowded.
const INNER_SMALL_RING_COUNT = 14;

/**
 * Build the icon positions for one layout `seed`. Icons are grouped by their
 * `size` tier ("lg" | "md" | "sm") onto concentric rings, with each tier
 * independently shuffled so the arrangement changes on every reload.
 *
 * Returns:
 *   - positions:      [{ item, x, y }] in container-percentage coordinates
 *   - positionByName: item.name → position, for fast neighbour lookups
 */
export function buildConstellation(stack, seed) {
  const tier = (size) => stack.filter((icon) => icon.size === size);
  const large = seededShuffle(tier("lg"), seed + 7);
  const medium = seededShuffle(tier("md"), seed + 13);
  const small = seededShuffle(tier("sm"), seed + 29);

  const random = createSeededRandom(seed + 101);
  const positions = [
    ...placeOnRing(large, 14, 45, random),
    ...placeOnRing(medium, 24, 12, random),
    ...placeOnRing(small.slice(0, INNER_SMALL_RING_COUNT), 32, 8, random),
    ...placeOnRing(small.slice(INNER_SMALL_RING_COUNT), 40, 0, random),
  ];

  return {
    positions,
    positionByName: Object.fromEntries(
      positions.map((position) => [position.item.name, position])
    ),
  };
}

// How close (in % of the container) an icon must be to the hovered one to get
// pushed, and how hard (in px) the closest icons are pushed.
const INFLUENCE_RADIUS = 26;
const MAX_PUSH_PX = 72;

/**
 * Hover repulsion: when one icon is hovered, its neighbours slide away to open
 * up space around it. Returns the {x, y} pixel offset to apply to the icon
 * named `name`, given the currently `hoveredName` icon and the name→position
 * map. Icons beyond INFLUENCE_RADIUS (or when nothing is hovered) don't move.
 */
export function getRepulsionOffset(name, hoveredName, positionByName) {
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
