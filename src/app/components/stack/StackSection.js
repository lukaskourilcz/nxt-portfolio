"use client";

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
// control) > sm (everything else). Each item renders a devicon class
// (`icon`), an inlined brand logo (`brand`), or a component (`Icon`).
const SIZES = {
  lg: { box: "h-20 w-20", devicon: "text-5xl", svg: "h-10 w-10" },
  md: { box: "h-[3.75rem] w-[3.75rem]", devicon: "text-3xl", svg: "h-8 w-8" },
  sm: { box: "h-12 w-12", devicon: "text-xl", svg: "h-5 w-5" },
};

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

function StackIcon({ it, size }) {
  if (it.icon) {
    return <i className={`${it.icon} ${size.devicon}`} aria-hidden />;
  }
  if (it.brand) {
    return (
      <BrandIcon name={it.brand} className={size.svg} style={{ color: it.color }} />
    );
  }
  return <it.Icon className={size.svg} style={{ color: it.color }} aria-hidden />;
}

export default function StackSection() {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
      >
        {STACK.map((it, i) => {
          const size = SIZES[it.size];
          return (
            <motion.div
              key={it.name}
              variants={{
                hidden: { opacity: 0, scale: reduce ? 1 : 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="shrink-0"
            >
              <div
                className={reduce ? undefined : "animate-floaty"}
                style={
                  reduce
                    ? undefined
                    : {
                        animationDelay: `${(i % 9) * 0.4}s`,
                        animationDuration: `${3.4 + (i % 5) * 0.5}s`,
                      }
                }
              >
                <div
                  title={it.name}
                  aria-label={it.name}
                  className={`group/icon flex ${size.box} items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:scale-110 hover:border-emerald-500/40 hover:bg-zinc-900 hover:shadow-[0_0_22px_-6px_rgba(16,185,129,0.35)]`}
                >
                  <StackIcon it={it} size={size} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

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
        </div>
      </Reveal>
    </section>
  );
}
