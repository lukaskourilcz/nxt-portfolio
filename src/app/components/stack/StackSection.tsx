"use client";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Github,
  Layers,
  ShieldCheck,
  KeyRound,
  Zap,
  RadioTower,
  ArrowLeftRight,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { BrandIcon } from "@/components/brand-icons";
import GitHubGrid from "@/components/github-grid";
import { useContainerScale } from "@/hooks/useContainerScale";
import {
  createSeededRandom,
  buildConstellation,
  getRepulsionOffset,
} from "@/lib/stack-layout";
import { staggerDelay } from "@/lib/anim";
import { GITHUB_USERNAME } from "@/lib/site";
import type { IconComponent } from "@/lib/types";

type StackSize = "lg" | "md" | "sm";

type StackItem = {
  name: string;
  size: StackSize;
  icon?: string;
  brand?: string;
  Icon?: IconComponent;
  color?: string;
};

// shadcn/ui has no devicon glyph — render its two-stroke logo inline.
function ShadcnIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <line x1="208" y1="128" x2="128" y2="208" />
      <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
  );
}

// Drizzle ORM has no devicon glyph — render its four diagonal "drizzle"
// streaks inline.
function DrizzleIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={className}
      style={style}
    >
      <line x1="3.8" y1="9.2" x2="9.8" y2="6.2" />
      <line x1="13.4" y1="8.2" x2="19.4" y2="5.2" />
      <line x1="4.6" y1="18.8" x2="10.6" y2="15.8" />
      <line x1="14.2" y1="17.8" x2="20.2" y2="14.8" />
    </svg>
  );
}

// The full tech stack. Each entry sets exactly one icon source:
//   icon  → a devicon CSS class      brand → a key in BrandIcon
//   Icon  → a React component (a lucide or one of the inline SVGs above)
// `size` is the tier ("lg" | "md" | "sm") that decides which ring the icon
// sits on; its exact pixel size is derived per-icon in ICON_SIZE_PX below.
const STACK: StackItem[] = [
  // languages — large
  { name: "JavaScript", icon: "devicon-javascript-plain colored", size: "lg" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored", size: "lg" },
  { name: "HTML5", icon: "devicon-html5-plain colored", size: "lg" },
  { name: "CSS3", icon: "devicon-css3-plain colored", size: "lg" },
  // frameworks — medium
  { name: "React", icon: "devicon-react-original colored", size: "md" },
  { name: "Next.js", icon: "devicon-nextjs-plain", size: "md" },
  { name: "Vue.js", icon: "devicon-vuejs-plain colored", size: "md" },
  { name: "Astro", icon: "devicon-astro-plain", size: "md" },
  { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored", size: "md" },
  { name: "shadcn/ui", Icon: ShadcnIcon, size: "md" },
  { name: "MUI", icon: "devicon-materialui-plain colored", size: "md" },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain colored", size: "md" },
  { name: "Framer Motion", icon: "devicon-framermotion-original", size: "md" },
  // version control — medium
  { name: "Git", icon: "devicon-git-plain colored", size: "md" },
  { name: "GitHub", icon: "devicon-github-original", size: "md" },
  { name: "GitLab", icon: "devicon-gitlab-plain colored", size: "md" },
  // backend & realtime — small
  { name: "Node.js", icon: "devicon-nodejs-plain colored", size: "sm" },
  { name: "Express.js", icon: "devicon-express-original", size: "sm" },
  { name: "WebSockets", Icon: ArrowLeftRight, color: "#d4d4d8", size: "sm" },
  { name: "Ably", Icon: RadioTower, color: "#ff5416", size: "sm" },
  // data — small
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", size: "sm" },
  { name: "MySQL", icon: "devicon-mysql-original colored", size: "sm" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", size: "sm" },
  { name: "Prisma", icon: "devicon-prisma-original", size: "sm" },
  { name: "Drizzle", Icon: DrizzleIcon, color: "#c5f74f", size: "sm" },
  { name: "Payload CMS", Icon: Layers, color: "#d4d4d8", size: "sm" },
  { name: "Better Auth", Icon: ShieldCheck, color: "#d4d4d8", size: "sm" },
  { name: "Auth0", Icon: KeyRound, color: "#eb5424", size: "sm" },
  // tools — small
  { name: "Docker", icon: "devicon-docker-plain colored", size: "sm" },
  { name: "Netlify", icon: "devicon-netlify-plain colored", size: "sm" },
  { name: "Vite", icon: "devicon-vitejs-plain colored", size: "sm" },
  { name: "Postman", icon: "devicon-postman-plain colored", size: "sm" },
  { name: "Google Cloud", icon: "devicon-googlecloud-plain colored", size: "sm" },
  { name: "Figma", icon: "devicon-figma-plain colored", size: "sm" },
  // testing & validation — TanStack medium, rest small
  { name: "TanStack", brand: "tanstack", color: "#d4d4d8", size: "md" },
  { name: "Zod", brand: "zod", color: "#408aff", size: "sm" },
  { name: "React Hook Form", brand: "reacthookform", color: "#ec5990", size: "sm" },
  { name: "Mocha", icon: "devicon-mocha-plain colored", size: "sm" },
  { name: "Jest", icon: "devicon-jest-plain colored", size: "sm" },
  { name: "Vitest", icon: "devicon-vitest-plain colored", size: "sm" },
  { name: "Playwright", icon: "devicon-playwright-plain colored", size: "sm" },
  // ai — small
  { name: "Claude Code", brand: "claude", color: "#d97757", size: "sm" },
  { name: "Anthropic SDK", brand: "anthropic", color: "#d4d4d8", size: "sm" },
  { name: "Superpowers", Icon: Zap, color: "#f59e0b", size: "sm" },
  { name: "Cursor", brand: "cursor", color: "#d4d4d8", size: "sm" },
  { name: "GitHub Copilot", brand: "copilot", color: "#d4d4d8", size: "sm" },
  { name: "ChatGPT", brand: "openai", color: "#d4d4d8", size: "sm" },
  { name: "Gemini", brand: "gemini", color: "#8e75b2", size: "sm" },
  { name: "Perplexity", brand: "perplexity", color: "#1fb8cd", size: "sm" },
  { name: "Grok", brand: "grok", color: "#d4d4d8", size: "sm" },
  { name: "Vercel AI SDK", brand: "vercel", color: "#d4d4d8", size: "sm" },
  { name: "LangChain", brand: "langchain", color: "#7fc8ff", size: "sm" },
];

// A single accent for every icon's hover glow and tooltip, so the constellation
// reads as designed rather than a random rainbow.
const ACCENT = "#34d399";

// Per-icon values, derived once from fixed seeds so they match on server and client.

// A random hover tilt (degrees, mixed direction and magnitude) per icon.
const HOVER_TILT_DEG: Record<string, number> = (() => {
  const random = createSeededRandom(555);
  const tiltByName: Record<string, number> = {};
  for (const tech of STACK) {
    const magnitude = 16 + random() * 20; // 16–36°
    const direction = random() < 0.5 ? -1 : 1;
    tiltByName[tech.name] = Math.round(direction * magnitude);
  }
  return tiltByName;
})();

// Base pixel size per icon at the reference width (scaled down to fit smaller
// screens): JavaScript biggest, TypeScript next, then HTML/CSS, then the rest
// spread across varied sizes by tier.
const ICON_SIZE_PX: Record<string, number> = (() => {
  const random = createSeededRandom(909);
  const sizeByName: Record<string, number> = {};
  for (const tech of STACK) {
    if (tech.name === "JavaScript") sizeByName[tech.name] = 160;
    else if (tech.name === "TypeScript") sizeByName[tech.name] = 134;
    else if (tech.name === "HTML5" || tech.name === "CSS3")
      sizeByName[tech.name] = 114;
    else if (tech.size === "md")
      sizeByName[tech.name] = Math.round(88 + random() * 24);
    else sizeByName[tech.name] = Math.round(74 + random() * 24);
  }
  return sizeByName;
})();

// Renders the glyph for a single tech, whichever icon source it uses.
function StackIcon({ tech, px }: { tech: StackItem; px: number }) {
  if (tech.icon)
    return (
      <i
        className={tech.icon}
        style={{ fontSize: `${px}px`, lineHeight: 1 }}
        aria-hidden
      />
    );
  if (tech.brand)
    return (
      <BrandIcon
        name={tech.brand}
        style={{ color: tech.color, width: px, height: px }}
      />
    );
  if (tech.Icon) {
    const Glyph = tech.Icon;
    return (
      <Glyph
        style={{ color: tech.color, width: px, height: px }}
        aria-hidden
      />
    );
  }
  return null;
}

// One icon tile: glows in the accent color on hover and shows its name.
function IconBubble({
  tech,
  color,
  hovered,
  px,
}: {
  tech: StackItem;
  color: string;
  hovered: boolean;
  px: number;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        role="img"
        aria-label={tech.name}
        className="flex items-center justify-center rounded-2xl border bg-zinc-900/80 transition-colors duration-200"
        style={{
          width: px,
          height: px,
          borderColor: hovered ? color : "#27272a",
          boxShadow: hovered ? `0 0 26px -4px ${color}` : "none",
        }}
      >
        <StackIcon tech={tech} px={Math.round(px * 0.52)} />
      </div>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.7rem] font-semibold text-zinc-950 shadow-lg transition-opacity duration-200"
        style={{ backgroundColor: color, opacity: hovered ? 1 : 0 }}
      >
        {tech.name}
      </span>
    </div>
  );
}

// Spring transitions for the scroll-in entrance and hover interactions.
const ENTRANCE_SPRING = { type: "spring", stiffness: 260, damping: 18 } as const;
const HOVER_SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 20,
  mass: 0.6,
} as const;

// Width (px) the layout is tuned for (matches max-w-3xl); narrower containers
// scale down by the same factor.
const REFERENCE_WIDTH_PX = 768;

export default function StackSection() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);
  const [containerRef, scale] = useContainerScale(REFERENCE_WIDTH_PX);

  // Re-shuffle on each load, but only after hydration: the server and first
  // client render both use seed 0, avoiding a mismatch warning.
  useEffect(() => setSeed(1 + Math.floor(Math.random() * 1e9)), []);

  const { positions, positionByName } = useMemo(
    () => buildConstellation(STACK, seed),
    [seed]
  );

  return (
    <Section id="stack">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      {/* Scattered constellation with hover repulsion; same layout at every
          breakpoint, scaled to fit. The GitHub contribution graph sits as a
          backdrop behind the icons (z-0); icons float on top (z-1+). */}
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-3xl"
      >
        {/* Contribution graph backdrop, centered behind the constellation. The
            "garden" grid is scaled up 2.5× (full-bleed) to read large behind the
            floating icons, while the labels stay normal-size and readable. */}
        <div className="absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 sm:block">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-xs text-zinc-500">
              <span className="text-emerald-400">$</span> git log --graph
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600">
              <Github className="h-3.5 w-3.5" /> @{GITHUB_USERNAME}
            </span>
          </div>
          <div className="my-28 origin-center scale-[2.5]">
            <GitHubGrid />
          </div>
          <p className="mt-2 text-center font-mono text-xs text-zinc-600">
            wish I could show you the GitLab stats
          </p>
        </div>

        {positions.map(({ item: tech, x, y }, i) => {
          const isHovered = hovered === tech.name;
          const offset = getRepulsionOffset(tech.name, hovered, positionByName);
          return (
            <div
              key={tech.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, zIndex: isHovered ? 50 : 1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...ENTRANCE_SPRING, delay: staggerDelay(i, 0.012, 0.4) }}
              >
                <motion.div
                  animate={{
                    x: offset.x * scale,
                    y: offset.y * scale,
                    scale: isHovered ? 1.3 : 1,
                    rotate: reduce ? 0 : isHovered ? HOVER_TILT_DEG[tech.name] : 0,
                  }}
                  transition={HOVER_SPRING}
                  onMouseEnter={() => setHovered(tech.name)}
                  onMouseLeave={() =>
                    setHovered((current) =>
                      current === tech.name ? null : current
                    )
                  }
                >
                  <IconBubble
                    tech={tech}
                    color={ACCENT}
                    hovered={isHovered}
                    px={Math.max(1, Math.round(ICON_SIZE_PX[tech.name] * scale))}
                  />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
