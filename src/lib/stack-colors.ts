// The tech stack's brand palette, shared so the whole site draws accent
// colours from one place: the stack constellation uses BRAND_COLOR for its
// hover/spotlight border, glow, and name label; the project cards' cursor
// flashlight sweeps in colours from STACK_GLOW_COLORS.

// Per-logo brand colour for the devicon-based stack entries. Monochrome logos
// (Next, GitHub, Express, …) use a light neutral so they read on the dark
// background.
export const BRAND_COLOR: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  React: "#61dafb",
  "Next.js": "#e5e7eb",
  Astro: "#ff5d01",
  TailwindCSS: "#38bdf8",
  "shadcn/ui": "#e5e7eb",
  MUI: "#007fff",
  Bootstrap: "#7952b3",
  Motion: "#fff312",
  Git: "#f05032",
  GitHub: "#e5e7eb",
  GitLab: "#fc6d26",
  "Node.js": "#8cc84b",
  "Express.js": "#e5e7eb",
  PostgreSQL: "#4a90d9",
  MySQL: "#4479a1",
  MongoDB: "#47a248",
  Prisma: "#e5e7eb",
  Docker: "#2496ed",
  Vite: "#ffd028",
  Postman: "#ff6c37",
  "Google Cloud": "#4285f4",
  Figma: "#f24e1e",
  Mocha: "#a5744b",
  Jest: "#c21325",
  Vitest: "#99c93c",
  Playwright: "#2ead33",
};

// The light neutral assigned to monochrome logos — kept out of the glow
// palette so the flashlight always sweeps in a real colour.
const NEUTRAL = "#e5e7eb";

// Brand colours that only exist inline on stack items without a devicon glyph
// (the BrandIcon/lucide entries in StackSection's STACK).
const ITEM_BRAND_COLORS = [
  "#ff5416", // Ably
  "#eb5424", // Auth0
  "#c5f74f", // Drizzle
  "#408aff", // Zod
  "#ec5990", // React Hook Form
  "#d97757", // Claude Code
  "#bc52ee", // Astryx
  "#4f7cff", // StyleX
];

// Vivid, deduplicated palette for randomized accents.
export const STACK_GLOW_COLORS = [
  ...new Set([
    ...Object.values(BRAND_COLOR).filter((color) => color !== NEUTRAL),
    ...ITEM_BRAND_COLORS,
  ]),
];
