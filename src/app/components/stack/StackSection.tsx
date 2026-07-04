"use client";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Layers,
  ShieldCheck,
  KeyRound,
  RadioTower,
  ArrowLeftRight,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { BrandIcon } from "@/components/brand-icons";
import { useContainerScale } from "@/hooks/useContainerScale";
import {
  createSeededRandom,
  buildConstellation,
  getRepulsionOffset,
} from "@/lib/stack-layout";
import { staggerDelay } from "@/lib/anim";
import type { IconComponent } from "@/lib/types";

// Devicon SVGs as static imports — bundles only the ~30 logos actually used
// instead of shipping the whole devicon icon-font CSS.
import javascriptIcon from "devicon/icons/javascript/javascript-original.svg";
import typescriptIcon from "devicon/icons/typescript/typescript-original.svg";
import html5Icon from "devicon/icons/html5/html5-original.svg";
import css3Icon from "devicon/icons/css3/css3-original.svg";
import reactIcon from "devicon/icons/react/react-original.svg";
import nextjsIcon from "devicon/icons/nextjs/nextjs-plain.svg";
import vuejsIcon from "devicon/icons/vuejs/vuejs-original.svg";
import astroIcon from "devicon/icons/astro/astro-plain.svg";
import tailwindcssIcon from "devicon/icons/tailwindcss/tailwindcss-original.svg";
import materialuiIcon from "devicon/icons/materialui/materialui-original.svg";
import bootstrapIcon from "devicon/icons/bootstrap/bootstrap-original.svg";
import framermotionIcon from "devicon/icons/framermotion/framermotion-original.svg";
import gitIcon from "devicon/icons/git/git-original.svg";
import githubIcon from "devicon/icons/github/github-original.svg";
import gitlabIcon from "devicon/icons/gitlab/gitlab-original.svg";
import nodejsIcon from "devicon/icons/nodejs/nodejs-original.svg";
import expressIcon from "devicon/icons/express/express-original.svg";
import postgresqlIcon from "devicon/icons/postgresql/postgresql-original.svg";
import mysqlIcon from "devicon/icons/mysql/mysql-original.svg";
import mongodbIcon from "devicon/icons/mongodb/mongodb-original.svg";
import prismaIcon from "devicon/icons/prisma/prisma-original.svg";
import dockerIcon from "devicon/icons/docker/docker-original.svg";
import netlifyIcon from "devicon/icons/netlify/netlify-original.svg";
import vitejsIcon from "devicon/icons/vitejs/vitejs-original.svg";
import postmanIcon from "devicon/icons/postman/postman-original.svg";
import googlecloudIcon from "devicon/icons/googlecloud/googlecloud-original.svg";
import figmaIcon from "devicon/icons/figma/figma-original.svg";
import mochaIcon from "devicon/icons/mocha/mocha-original.svg";
import jestIcon from "devicon/icons/jest/jest-plain.svg";
import vitestIcon from "devicon/icons/vitest/vitest-original.svg";
import playwrightIcon from "devicon/icons/playwright/playwright-original.svg";

type StackSize = "lg" | "md" | "sm";

// Group labels drive the labeled grid shown below `md`, where the
// constellation's hover interactions don't exist.
const GROUPS = [
  "languages",
  "frameworks & ui",
  "version control",
  "backend & realtime",
  "data & auth",
  "tooling",
  "testing & validation",
  "ai",
] as const;

type StackGroup = (typeof GROUPS)[number];

type StackItem = {
  name: string;
  size: StackSize;
  group: StackGroup;
  // Exactly one icon source:
  img?: StaticImageData; //  devicon SVG
  brand?: string; //         key in BrandIcon
  Icon?: IconComponent; //   lucide or inline SVG component
  // Dark monochrome logos get flipped to white for the dark background.
  invert?: boolean;
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

// The tech stack, curated to tools that carry real signal (the AI section
// lists dev tooling, not chat apps). `size` is the tier that decides which
// ring an icon sits on in the constellation; exact pixels come from
// ICON_SIZE_PX below.
const STACK: StackItem[] = [
  // languages
  { name: "JavaScript", img: javascriptIcon, size: "lg", group: "languages" },
  { name: "TypeScript", img: typescriptIcon, size: "lg", group: "languages" },
  { name: "HTML5", img: html5Icon, size: "lg", group: "languages" },
  { name: "CSS3", img: css3Icon, size: "lg", group: "languages" },
  // frameworks & ui
  { name: "React", img: reactIcon, size: "md", group: "frameworks & ui" },
  { name: "Next.js", img: nextjsIcon, invert: true, size: "md", group: "frameworks & ui" },
  { name: "Vue.js", img: vuejsIcon, size: "md", group: "frameworks & ui" },
  { name: "Astro", img: astroIcon, invert: true, size: "md", group: "frameworks & ui" },
  { name: "TailwindCSS", img: tailwindcssIcon, size: "md", group: "frameworks & ui" },
  { name: "shadcn/ui", Icon: ShadcnIcon, size: "md", group: "frameworks & ui" },
  { name: "MUI", img: materialuiIcon, size: "md", group: "frameworks & ui" },
  { name: "Bootstrap", img: bootstrapIcon, size: "md", group: "frameworks & ui" },
  { name: "Motion", img: framermotionIcon, invert: true, size: "md", group: "frameworks & ui" },
  { name: "TanStack", brand: "tanstack", color: "#d4d4d8", size: "md", group: "frameworks & ui" },
  // version control
  { name: "Git", img: gitIcon, size: "md", group: "version control" },
  { name: "GitHub", img: githubIcon, invert: true, size: "md", group: "version control" },
  { name: "GitLab", img: gitlabIcon, size: "md", group: "version control" },
  // backend & realtime
  { name: "Node.js", img: nodejsIcon, size: "sm", group: "backend & realtime" },
  { name: "Express.js", img: expressIcon, invert: true, size: "sm", group: "backend & realtime" },
  { name: "WebSockets", Icon: ArrowLeftRight, color: "#d4d4d8", size: "sm", group: "backend & realtime" },
  { name: "Ably", Icon: RadioTower, color: "#ff5416", size: "sm", group: "backend & realtime" },
  // data & auth
  { name: "PostgreSQL", img: postgresqlIcon, size: "sm", group: "data & auth" },
  { name: "MySQL", img: mysqlIcon, size: "sm", group: "data & auth" },
  { name: "MongoDB", img: mongodbIcon, size: "sm", group: "data & auth" },
  { name: "Prisma", img: prismaIcon, invert: true, size: "sm", group: "data & auth" },
  { name: "Drizzle", Icon: DrizzleIcon, color: "#c5f74f", size: "sm", group: "data & auth" },
  { name: "Payload CMS", Icon: Layers, color: "#d4d4d8", size: "sm", group: "data & auth" },
  { name: "Better Auth", Icon: ShieldCheck, color: "#d4d4d8", size: "sm", group: "data & auth" },
  { name: "Auth0", Icon: KeyRound, color: "#eb5424", size: "sm", group: "data & auth" },
  // tooling
  { name: "Docker", img: dockerIcon, size: "sm", group: "tooling" },
  { name: "Netlify", img: netlifyIcon, size: "sm", group: "tooling" },
  { name: "Vite", img: vitejsIcon, size: "sm", group: "tooling" },
  { name: "Postman", img: postmanIcon, size: "sm", group: "tooling" },
  { name: "Google Cloud", img: googlecloudIcon, size: "sm", group: "tooling" },
  { name: "Figma", img: figmaIcon, size: "sm", group: "tooling" },
  // testing & validation
  { name: "Zod", brand: "zod", color: "#408aff", size: "sm", group: "testing & validation" },
  { name: "React Hook Form", brand: "reacthookform", color: "#ec5990", size: "sm", group: "testing & validation" },
  { name: "Mocha", img: mochaIcon, size: "sm", group: "testing & validation" },
  { name: "Jest", img: jestIcon, size: "sm", group: "testing & validation" },
  { name: "Vitest", img: vitestIcon, size: "sm", group: "testing & validation" },
  { name: "Playwright", img: playwrightIcon, size: "sm", group: "testing & validation" },
  // ai — dev tooling only
  { name: "Claude Code", brand: "claude", color: "#d97757", size: "sm", group: "ai" },
  { name: "Anthropic SDK", brand: "anthropic", color: "#d4d4d8", size: "sm", group: "ai" },
  { name: "Vercel AI SDK", brand: "vercel", color: "#d4d4d8", size: "sm", group: "ai" },
  { name: "LangChain", brand: "langchain", color: "#7fc8ff", size: "sm", group: "ai" },
];

// Fallback accent for anything without its own brand colour.
const ACCENT = "#34d399";

// Per-logo brand colour used for the hover border, glow, and name label so each
// icon lights up in its own colour instead of a uniform green. Items that already
// carry a `color` (the BrandIcon / lucide glyphs) reuse it; this map fills in the
// devicon-based entries. Monochrome logos (Next, GitHub, Express, …) use a light
// neutral so they read on the dark background.
const BRAND_COLOR: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  React: "#61dafb",
  "Next.js": "#e5e7eb",
  "Vue.js": "#42b883",
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
  Netlify: "#00c7b7",
  Vite: "#ffd028",
  Postman: "#ff6c37",
  "Google Cloud": "#4285f4",
  Figma: "#f24e1e",
  Mocha: "#a5744b",
  Jest: "#c21325",
  Vitest: "#99c93c",
  Playwright: "#2ead33",
};

// Resolve the colour an icon lights up in: its own brand colour first, then the
// devicon map, then the shared accent.
function brandColor(tech: StackItem): string {
  return tech.color ?? BRAND_COLOR[tech.name] ?? ACCENT;
}

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
// screens). TypeScript and React lead — that's the actual specialization —
// with JavaScript next and the rest spread across varied sizes by tier.
const ICON_SIZE_PX: Record<string, number> = (() => {
  const random = createSeededRandom(909);
  const sizeByName: Record<string, number> = {};
  for (const tech of STACK) {
    if (tech.name === "TypeScript") sizeByName[tech.name] = 160;
    else if (tech.name === "React") sizeByName[tech.name] = 138;
    else if (tech.name === "JavaScript") sizeByName[tech.name] = 118;
    else if (tech.name === "HTML5" || tech.name === "CSS3")
      sizeByName[tech.name] = 96;
    else if (tech.size === "md")
      sizeByName[tech.name] = Math.round(88 + random() * 24);
    else sizeByName[tech.name] = Math.round(74 + random() * 24);
  }
  return sizeByName;
})();

// Renders the glyph for a single tech, whichever icon source it uses.
function StackIcon({ tech, px }: { tech: StackItem; px: number }) {
  if (tech.img)
    return (
      <Image
        src={tech.img}
        alt=""
        width={px}
        height={px}
        unoptimized
        aria-hidden
        className={tech.invert ? "invert" : undefined}
        style={{ width: px, height: px }}
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

// One icon tile: glows in its brand color on hover and shows its name.
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
        className="flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 transition-colors duration-200"
        style={{
          width: px,
          height: px,
          // Hover overrides the themed border with the brand colour.
          borderColor: hovered ? color : undefined,
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

// Grouped, labeled grid for touch screens (below md) — hover tooltips don't
// exist there, so every icon gets a visible name instead.
function MobileStackList() {
  return (
    <div className="space-y-8 md:hidden">
      {GROUPS.map((group) => {
        const items = STACK.filter((tech) => tech.group === group);
        if (!items.length) return null;
        return (
          <div key={group}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span className="text-emerald-500">
                {"//"}
              </span>{" "}
              {group}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {items.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2.5 text-sm text-zinc-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                    <StackIcon tech={tech} px={20} />
                  </span>
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

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
    <Section id="stack" mesh="right">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      <MobileStackList />

      {/* Scattered constellation with hover repulsion — pointer screens only;
          touch gets the labeled grid above. */}
      <div
        ref={containerRef}
        className="relative mx-auto hidden aspect-square w-full max-w-3xl md:block"
      >
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
                    color={brandColor(tech)}
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
