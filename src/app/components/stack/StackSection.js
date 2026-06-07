"use client";

import { useState } from "react";
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

// Icons are sized by relevancy: lg (languages) > md (frameworks + version
// control) > sm (everything else).
const SIZES = {
  lg: { box: "h-32 w-32 sm:h-40 sm:w-40", devicon: "text-7xl sm:text-8xl", svg: "h-16 w-16 sm:h-20 sm:w-20" },
  md: { box: "h-24 w-24 sm:h-28 sm:w-28", devicon: "text-5xl sm:text-6xl", svg: "h-12 w-12 sm:h-14 sm:w-14" },
  sm: { box: "h-20 w-20 sm:h-[5.5rem] sm:w-[5.5rem]", devicon: "text-4xl sm:text-5xl", svg: "h-8 w-8 sm:h-10 sm:w-10" },
};

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
const LG = seededShuffle(byTier("lg"), 7);
const MD = seededShuffle(byTier("md"), 13);
const SM = seededShuffle(byTier("sm"), 29);
const FLAT = [...LG, ...MD, ...SM];

// Concentric rings, tightened and jittered so it reads as a scattered cluster
// rather than tidy circles. Percent offsets from the container center.
function ring(items, r, offsetDeg, seed) {
  const n = items.length;
  const rnd = makeRng(seed);
  return items.map((it, k) => {
    const ang = ((offsetDeg + (360 / n) * k + (rnd() - 0.5) * 22) * Math.PI) / 180;
    const rr = r + (rnd() - 0.5) * 8;
    return { it, x: 50 + rr * Math.cos(ang), y: 50 + rr * Math.sin(ang) };
  });
}
const CIRCLE = [
  ...ring(LG, 16, 45, 101),
  ...ring(MD, 29, 12, 211),
  ...ring(SM.slice(0, 14), 39, 8, 307),
  ...ring(SM.slice(14), 46, 0, 421),
];
const POS = Object.fromEntries(CIRCLE.map((p) => [p.it.name, p]));

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

// On hover, push nearby icons outward — proximity-scaled, in px.
function pushOffset(name, hovered) {
  if (!hovered || hovered === name) return { x: 0, y: 0 };
  const h = POS[hovered];
  const t = POS[name];
  if (!h || !t) return { x: 0, y: 0 };
  const dx = t.x - h.x;
  const dy = t.y - h.y;
  const dist = Math.hypot(dx, dy) || 0.001;
  const INFLUENCE = 24; // percent
  if (dist >= INFLUENCE) return { x: 0, y: 0 };
  const force = (1 - dist / INFLUENCE) * 60; // px
  return { x: (dx / dist) * force, y: (dy / dist) * force };
}

function StackIcon({ it, size }) {
  if (it.icon) return <i className={`${it.icon} ${size.devicon}`} aria-hidden />;
  if (it.brand)
    return <BrandIcon name={it.brand} className={size.svg} style={{ color: it.color }} />;
  return <it.Icon className={size.svg} style={{ color: it.color }} aria-hidden />;
}

function IconBubble({ it, color, floatIndex, reduce, hovered }) {
  const size = SIZES[it.size];
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
          className={`flex ${size.box} items-center justify-center rounded-2xl border bg-zinc-900/80 transition-colors duration-200`}
          style={{
            borderColor: hovered ? color : "#27272a",
            boxShadow: hovered ? `0 0 26px -4px ${color}` : "none",
          }}
        >
          <StackIcon it={it} size={size} />
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

  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      {/* Desktop: scattered circular constellation with hover repulsion */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-4xl lg:block">
        {CIRCLE.map(({ it, x, y }, i) => {
          const isHover = hovered === it.name;
          const off = pushOffset(it.name, hovered);
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
                  <IconBubble it={it} color={PALETTE[i % PALETTE.length]} floatIndex={i} reduce={reduce} hovered={isHover} />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet: flowing wrap */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {FLAT.map((it, i) => {
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
                <IconBubble it={it} color={PALETTE[i % PALETTE.length]} floatIndex={i} reduce={reduce} hovered={isHover} />
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
