import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/external-link";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

// Screenshots are captured separately and dropped into /public/projects/ as
// <slug>.png. Until those files exist, keep this false so cards render flat
// (no broken images, identical to the current look). Once the PNGs are in
// place, flip to true to switch each card to its live-screenshot background.
const SCREENSHOTS_READY: boolean = true;

type Project = {
  title: string;
  description: string;
  tech: string[];
  // Live screenshot used as the card background once SCREENSHOTS_READY is on
  // (see ProjectCard). Stored at /public/projects/<slug>.png. Omit to keep a
  // card image-less — used when a site has no live URL or can't be captured.
  image?: string;
  vercel?: string;
};

// Scouted from the live deployments + each repo's package.json.
// The repos are private, so no source links are shown — only a live link
// (the external-link icon) where the deployment still resolves.
const PROJECTS: Project[] = [
  {
    title: "devShark",
    description:
      "Developer-knowledge quiz and learning app with topic paths, daily challenges, real-time multiplayer, and leaderboards, built on React, serverless functions, and Supabase.",
    tech: ["React", "TypeScript", "Supabase", "Realtime", "Vercel"],
    vercel: "https://react-express-app-five.vercel.app",
    image: "/projects/devshark.png",
  },
  {
    title: "Personal Dashboard",
    description:
      "Personal life dashboard for subscriptions, todos, streaks, finances, Czech invoices, books, and a calendar, with natural-language quick-add powered by Claude.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Recharts"],
    vercel: "https://own-dashboard-tau.vercel.app",
    image: "/projects/personal-dashboard.png",
  },
  {
    title: "aifirst",
    description:
      "Daily, fully static bilingual (CS/EN) AI & tech magazine — a scheduled GitHub Actions job scrapes the day's sources and Claude curates and writes each issue.",
    tech: ["Next.js", "TypeScript", "Claude API", "GitHub Actions"],
    vercel: "https://aifirst-beryl.vercel.app/",
    image: "/projects/aifirst.png",
  },
  {
    title: "Czech Monopoly",
    description:
      "Real-time, browser-based Czech-themed Monopoly where 2–4 players buy Czech cities via a room code, with a trivia twist and full CS/EN localization.",
    tech: ["Next.js", "TypeScript", "Payload CMS", "Neon", "Ably"],
    vercel: "https://czech-cities.vercel.app",
    image: "/projects/czech-monopoly.png",
  },
  {
    title: "Dont Wanna Know",
    description:
      "Enter a birth year, country, and city to get an instant, fully in-browser report on the era someone grew up in — no backend and no API calls.",
    tech: ["React", "TypeScript", "Vite"],
    vercel: "https://dontwannaknow.vercel.app",
    image: "/projects/dont-wanna-know.png",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Marketing site for a Czech bus and freight company, covering its fleet, passenger, and cargo services, with a focus on SEO and i18n.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    image: "/projects/autobusy-hodonin.png",
  },
  {
    title: "Umyjeme fasádu",
    description:
      "Marketing site for a Czech exterior-cleaning service — hot-water pressure washing of facades, roofs, and paving, with before/after sliders, a service breakdown, and a quote request form.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS"],
    vercel: "https://umyjemefasadu.vercel.app/",
    image: "/projects/umyjeme-fasadu.png",
  },
  {
    title: "Eurowafers",
    description:
      "Marketing site for a Czech spa-wafer maker, covering its history, products, and distribution.",
    tech: ["Astro", "TypeScript", "TailwindCSS", "Vercel"],
    vercel: "https://eurowafers.vercel.app",
    image: "/projects/eurowafers.png",
  },
  {
    title: "Take a Break",
    description:
      "B2B meditation-booking app with a booking dashboard, achievements, and news, built on a Turborepo monorepo.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Turborepo"],
    vercel: "https://take-a-break-seven.vercel.app",
    image: "/projects/take-a-break.png",
  },
  {
    title: "beKind Web App",
    description:
      "Company rebrand and web app, focused on performance, backed by PostgreSQL and Prisma.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
  },
  {
    title: "Portfolio",
    description:
      "Personal developer portfolio with a terminal-inspired design and animated, responsive sections covering my stack, experience, and projects.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    vercel: "https://lukaskouril.vercel.app/",
    image: "/projects/portfolio.png",
  },
];

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <ExternalLink
      href={href}
      aria-label={label}
      className="rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-300 transition-colors hover:text-emerald-300"
    >
      {children}
    </ExternalLink>
  );
}

// When SCREENSHOTS_READY is on and the project has an `image`, the live
// screenshot becomes the card background under a dark scrim. The title,
// description, and tags sit at the bottom over the opaque end of the scrim so
// they stay readable, while the upper part of the card shows the screenshot.
// The only link is the external-link icon (top right) — the title itself isn't
// a link; the card just gets a hover lift and a title colour shift on hover.
function ProjectCard({ proj, delay }: { proj: Project; delay: number }) {
  const showImage = SCREENSHOTS_READY && proj.image;
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-card-hover"
    >
      {showImage && (
        <>
          <Image
            src={proj.image as string}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Scrim: opaque at the bottom (where the text sits) and fading to
              mostly clear at the top so more of the screenshot shows through. */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/25" />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {proj.vercel && (
          <div className="flex justify-end">
            <IconLink href={proj.vercel} label={`${proj.title} live site`}>
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </IconLink>
          </div>
        )}

        <div className="mt-auto">
          <h3 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-emerald-300">
            {proj.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {proj.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {proj.tech.map((tech) => (
              <Tag key={tech} variant="accent">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading index="02" command="projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj, i) => (
          <ProjectCard key={proj.title} proj={proj} delay={staggerDelay(i)} />
        ))}
      </div>
    </Section>
  );
}
