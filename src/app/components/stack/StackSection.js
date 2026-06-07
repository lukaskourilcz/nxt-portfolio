"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
import { Reveal } from "@/components/reveal";
import { BrandIcon } from "@/components/brand-icons";
import GitHubGrid from "@/components/github-grid";

// shadcn/ui has no devicon glyph — render its two-stroke logo inline.
function ShadcnIcon({ className, style, ...props }) {
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
      {...props}
    >
      <line x1="208" y1="128" x2="128" y2="208" />
      <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
  );
}

// `size` ("lg"|"md"|"sm") is used only for ring placement. The actual pixel
// size of each icon is computed per-icon in PX below.

// A distinct tooltip / glow color per icon (cycled).
const PALETTE = [
  "#34d399", "#38bdf8", "#a78bfa", "#fbbf24", "#fb7185", "#22d3ee",
  "#a3e635", "#e879f9", "#fb923c", "#2dd4bf", "#818cf8", "#f472b6",
];

const STACK = [
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
  { name: "Payload CMS", Icon: Layers, color: "#d4d4d8", size: "sm" },
  { name: "Better Auth", Icon: ShieldCheck, color: "#d4d4d8", size: "sm" },
  { name: "Auth0", Icon: KeyRound, color: "#eb5424", size: "sm" },
  // tools — small
  { name: "Docker", icon: "devicon-docker-plain colored", size: "sm" },
  { name: "Vercel", icon: "devicon-vercel-original", size: "sm" },
  { name: "Netlify", icon: "devicon-netlify-plain colored", size: "sm" },
  { name: "Vite", icon: "devicon-vitejs-plain colored", size: "sm" },
  { name: "Postman", icon: "devicon-postman-plain colored", size: "sm" },
  { name: "Google Cloud", icon: "devicon-googlecloud-plain colored", size: "sm" },
  { name: "Figma", icon: "devicon-figma-plain colored", size: "sm" },
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

// Seeded PRNG so the scattered arrangement is stable across SSR/client.
function makeRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
function seededShuffle(arr, seed) {
  const a = arr.slice();
  const rnd = makeRng(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const byTier = (t) => STACK.filter((x) => x.size === t);
const LG_BASE = byTier("lg");
const MD_BASE = byTier("md");
const SM_BASE = byTier("sm");

// Concentric rings, tightened and jittered so it reads as a scattered cluster.
// `rnd` is shared across rings so the jitter varies with the layout seed.
function ring(items, r, offsetDeg, rnd) {
  const n = items.length;
  return items.map((it, k) => {
    const ang = ((offsetDeg + (360 / n) * k + (rnd() - 0.5) * 16) * Math.PI) / 180;
    const rr = r + (rnd() - 0.5) * 5;
    return { it, x: 50 + rr * Math.cos(ang), y: 50 + rr * Math.sin(ang) };
  });
}

// Build a full layout (shuffled order + ring positions) from a seed.
function buildLayout(seed) {
  const lg = seededShuffle(LG_BASE, seed + 7);
  const md = seededShuffle(MD_BASE, seed + 13);
  const sm = seededShuffle(SM_BASE, seed + 29);
  const rnd = makeRng(seed + 101);
  const circle = [
    ...ring(lg, 14, 45, rnd),
    ...ring(md, 24, 12, rnd),
    ...ring(sm.slice(0, 14), 32, 8, rnd),
    ...ring(sm.slice(14), 40, 0, rnd),
  ];
  return {
    flat: [...lg, ...md, ...sm],
    circle,
    posByName: Object.fromEntries(circle.map((p) => [p.it.name, p])),
  };
}

// A random hover tilt per icon (mixed direction + magnitude), seeded so it's
// stable across renders.
const ROT = (() => {
  const rnd = makeRng(555);
  const m = {};
  for (const it of STACK) {
    const mag = 16 + rnd() * 20; // 16–36°
    m[it.name] = Math.round((rnd() < 0.5 ? -1 : 1) * mag);
  }
  return m;
})();

// Per-icon desktop pixel size: JS biggest, TS second, HTML/CSS third, then a
// lot of others spread across varied medium sizes (seeded for stability).
const PX = (() => {
  const rnd = makeRng(909);
  const m = {};
  for (const it of STACK) {
    if (it.name === "JavaScript") m[it.name] = 160;
    else if (it.name === "TypeScript") m[it.name] = 134;
    else if (it.name === "HTML5" || it.name === "CSS3") m[it.name] = 114;
    else if (it.size === "md") m[it.name] = Math.round(88 + rnd() * 24);
    else m[it.name] = Math.round(74 + rnd() * 24);
  }
  return m;
})();

// A stable tooltip / glow color per icon.
const COLOR = Object.fromEntries(
  STACK.map((it, i) => [it.name, PALETTE[i % PALETTE.length]])
);

// On hover, push nearby icons outward — proximity-scaled, in px.
function pushOffset(name, hovered, pos) {
  if (!hovered || hovered === name) return { x: 0, y: 0 };
  const h = pos[hovered];
  const t = pos[name];
  if (!h || !t) return { x: 0, y: 0 };
  const dx = t.x - h.x;
  const dy = t.y - h.y;
  const dist = Math.hypot(dx, dy) || 0.001;
  const INFLUENCE = 26; // percent
  if (dist >= INFLUENCE) return { x: 0, y: 0 };
  const force = (1 - dist / INFLUENCE) * 72; // px
  return { x: (dx / dist) * force, y: (dy / dist) * force };
}

function StackIcon({ it, px }) {
  if (it.icon)
    return <i className={it.icon} style={{ fontSize: `${px}px`, lineHeight: 1 }} aria-hidden />;
  if (it.brand)
    return <BrandIcon name={it.brand} style={{ color: it.color, width: px, height: px }} />;
  return <it.Icon style={{ color: it.color, width: px, height: px }} aria-hidden />;
}

function IconBubble({ it, color, floatIndex, reduce, hovered, px }) {
  return (
    <div
      className={reduce ? undefined : "animate-floaty"}
      style={
        reduce
          ? undefined
          : {
              animationDelay: `${(floatIndex % 9) * 0.4}s`,
              animationDuration: `${3.6 + (floatIndex % 5) * 0.5}s`,
            }
      }
    >
      <div className="relative flex items-center justify-center">
        <div
          aria-label={it.name}
          className="flex items-center justify-center rounded-2xl border bg-zinc-900/80 transition-colors duration-200"
          style={{
            width: px,
            height: px,
            borderColor: hovered ? color : "#27272a",
            boxShadow: hovered ? `0 0 26px -4px ${color}` : "none",
          }}
        >
          <StackIcon it={it} px={Math.round(px * 0.52)} />
        </div>
        <span
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.7rem] font-semibold text-zinc-950 shadow-lg transition-opacity duration-200"
          style={{ backgroundColor: color, opacity: hovered ? 1 : 0 }}
        >
          {it.name}
        </span>
      </div>
    </div>
  );
}

const ENTRANCE = { type: "spring", stiffness: 260, damping: 18 };
const INTERACT = { type: "spring", stiffness: 320, damping: 20, mass: 0.6 };

export default function StackSection() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [seed, setSeed] = useState(0);

  // Re-randomize the order on every load (after hydration to avoid a mismatch).
  useEffect(() => setSeed(1 + Math.floor(Math.random() * 1e9)), []);
  const { circle, flat, posByName } = useMemo(() => buildLayout(seed), [seed]);

  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      {/* Desktop: scattered circular constellation with hover repulsion */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-3xl lg:block">
        {circle.map(({ it, x, y }, i) => {
          const isHover = hovered === it.name;
          const off = pushOffset(it.name, hovered, posByName);
          return (
            <div
              key={it.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, zIndex: isHover ? 50 : 1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...ENTRANCE, delay: Math.min(i * 0.012, 0.4) }}
              >
                <motion.div
                  animate={{
                    x: off.x,
                    y: off.y,
                    scale: isHover ? 1.3 : 1,
                    rotate: reduce ? 0 : isHover ? ROT[it.name] : 0,
                  }}
                  transition={INTERACT}
                  onMouseEnter={() => setHovered(it.name)}
                  onMouseLeave={() => setHovered((h) => (h === it.name ? null : h))}
                >
                  <IconBubble it={it} color={COLOR[it.name]} floatIndex={i} reduce={reduce} hovered={isHover} px={PX[it.name]} />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet: flowing wrap */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {flat.map((it, i) => {
          const isHover = hovered === it.name;
          return (
            <motion.div
              key={it.name}
              className="relative"
              style={{ zIndex: isHover ? 50 : 1 }}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...ENTRANCE, delay: Math.min(i * 0.012, 0.4) }}
            >
              <motion.div
                animate={{ scale: isHover ? 1.25 : 1, rotate: reduce ? 0 : isHover ? ROT[it.name] : 0 }}
                transition={INTERACT}
                onMouseEnter={() => setHovered(it.name)}
                onMouseLeave={() => setHovered((h) => (h === it.name ? null : h))}
              >
                <IconBubble it={it} color={COLOR[it.name]} floatIndex={i} reduce={reduce} hovered={isHover} px={Math.round(PX[it.name] * 0.6)} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-xs text-zinc-400">
              <span className="text-emerald-400">$</span> git log --graph
            </p>
            <Link
              href="https://github.com/lukaskourilcz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-400"
            >
              <Github className="h-3.5 w-3.5" /> @lukaskourilcz
            </Link>
          </div>
          <GitHubGrid />
          <p className="mt-5 text-center font-mono text-xs text-zinc-500">
            wish I could also show you the GitLab stats 😔
          </p>
        </div>
      </Reveal>
    </section>
  );
}
