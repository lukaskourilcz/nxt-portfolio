"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

// Scouted from the live deployments + each repo's package.json.
// GitHub links are shown only for public repos (private/removed repos would
// 404 for visitors); live links only where the deployment still resolves.
const PROJECTS = [
  {
    title: "Portfolio",
    description:
      "Personal developer portfolio with a terminal-inspired design, showcasing stack, experience, and projects across animated, responsive sections.",
    tech: ["Next.js", "JavaScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/lukaskourilcz/nxt-portfolio",
    vercel: "https://lukaskouril.vercel.app/",
    image: "/projects/portfolio_projekt.png",
  },
  {
    title: "Take a Break",
    description:
      "B2B meditation-scheduling app featuring a booking dashboard, achievements, and news, built on a Turborepo monorepo.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Turborepo"],
    vercel: "https://take-a-break-seven.vercel.app",
    image: "/projects/takeabreak_projekt.png",
  },
  {
    title: "Czech Monopoly",
    description:
      "Browser-based Czech-themed Monopoly game offering code-based 2–4 player multiplayer and next-intl localization.",
    tech: ["Next.js", "TypeScript", "Payload CMS", "NeonDB", "next-intl"],
    vercel: "https://czech-cities.vercel.app",
    image: "/wip.png",
  },
  {
    title: "Personal Dashboard",
    description:
      "Productivity dashboard tracking subscriptions, habits, plans, and calendar, enriched with AI insights and analytics charts.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Recharts"],
    vercel: "https://own-dashboard-tau.vercel.app",
    image: "/wip.png",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Marketing website for a Czech bus and freight transport company, presenting fleet, passenger, and cargo services with an SEO and i18n focus.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
    image: "/projects/autodopravakopecek_projekt.png",
  },
  {
    title: "Eurowafers",
    description:
      "Marketing website for a Czech spa-wafer manufacturer, presenting its history, product range, and distribution.",
    tech: ["Astro", "TypeScript", "TailwindCSS", "Vercel"],
    vercel: "https://eurowafers.vercel.app",
    image: "/wip.png",
  },
  {
    title: "DevQuiz",
    description:
      "Full-stack developer quiz with JWT-secured auth and Supabase-backed data over an Express serverless API.",
    tech: ["React", "TypeScript", "Express", "Supabase", "JWT"],
    vercel: "https://react-express-app-five.vercel.app",
    image: "/wip.png",
  },
  {
    title: "beKind Web App",
    description:
      "Company rebrand and web app delivering a polished, performance-focused experience on a Prisma-backed PostgreSQL database.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    image: "/projects/bekind_projekt.png",
  },
  {
    title: "Dont Wanna Know",
    description:
      "Interactive web app that asks personal questions, then uses Gemini AI to reveal tailored life statistics.",
    tech: ["Next.js", "TypeScript", "Gemini AI"],
    github: "https://github.com/lukaskourilcz/dontwannaknow",
    vercel: "https://dontwannaknow.vercel.app",
    image: "/wip.png",
  },
];

function IconLink({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-200 backdrop-blur-sm transition-colors hover:text-emerald-300"
    >
      {children}
    </Link>
  );
}

// Shared card visual (image + content), reused by the desktop grid and the
// mobile peek list.
function ProjectVisual({ proj }) {
  const primary = proj.vercel || proj.github || null;
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={proj.image}
          alt={proj.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
        <div className="absolute right-3 top-3 flex translate-y-1 gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {proj.github && (
            <IconLink href={proj.github} label={`${proj.title} source on GitHub`}>
              <Github className="h-3.5 w-3.5" />
            </IconLink>
          )}
          {proj.vercel && (
            <IconLink href={proj.vercel} label={`${proj.title} live site`}>
              <ExternalLink className="h-3.5 w-3.5" />
            </IconLink>
          )}
        </div>
      </div>

      <div className="relative z-10 -mt-6 flex flex-1 flex-col px-5 pb-5">
        <h3 className="text-base font-semibold text-zinc-100">
          {primary ? (
            <Link
              href={primary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-emerald-300"
            >
              {proj.title}
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ) : (
            proj.title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {proj.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {proj.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.7rem] text-emerald-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

const CARD_SHELL =
  "group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-900";

function ProjectCard({ proj, delay }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`${CARD_SHELL} h-full border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)]`}
    >
      <ProjectVisual proj={proj} />
    </Reveal>
  );
}

// Mobile: cards peek in from alternating edges (first off the left, second off
// the right, …) showing ~70%, and slide to center — fully visible — on tap.
// Cards span the full viewport width, so a 30% translate is exactly a 30% crop.
const SLIDE = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

function MobileProjects({ projects }) {
  const [active, setActive] = useState(null);
  return (
    <div className="-mx-6 overflow-hidden sm:hidden">
      <div className="flex flex-col gap-5">
        {projects.map((proj, i) => {
          const isActive = active === i;
          const fromLeft = i % 2 === 0;
          const x = isActive ? "0%" : fromLeft ? "-30%" : "30%";
          return (
            <motion.article
              key={proj.title}
              initial={false}
              animate={{ x }}
              transition={SLIDE}
              className={`${CARD_SHELL} w-full ${
                isActive ? "border-emerald-500/40" : "border-zinc-800"
              }`}
            >
              <ProjectVisual proj={proj} />

              {isActive ? (
                <button
                  type="button"
                  aria-label={`Collapse ${proj.title}`}
                  onClick={() => setActive(null)}
                  className="absolute left-3 top-3 z-30 rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-200 backdrop-blur-sm transition-colors hover:text-emerald-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label={`Show ${proj.title}`}
                  onClick={() => setActive(i)}
                  className={`absolute inset-0 z-30 ${
                    fromLeft ? "cursor-e-resize" : "cursor-w-resize"
                  }`}
                />
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-12 sm:py-24">
      <SectionHeading index="02" command="projects" title="Projects" />

      {/* Tablet / desktop: grid of cards */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj, i) => (
          <ProjectCard
            key={proj.title}
            proj={proj}
            delay={Math.min(i * 0.04, 0.25)}
          />
        ))}
      </div>

      {/* Mobile: alternating peek cards that slide to center on tap */}
      <MobileProjects projects={PROJECTS} />
    </section>
  );
}
