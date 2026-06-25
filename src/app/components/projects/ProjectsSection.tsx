import type { ReactNode } from "react";
import { Github, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/external-link";
import { ArrowLink } from "@/components/arrow-link";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  vercel?: string;
};

// Scouted from the live deployments + each repo's package.json.
// GitHub links are shown only for public repos (private/removed repos would
// 404 for visitors); live links only where the deployment still resolves.
const PROJECTS: Project[] = [
  {
    title: "Portfolio",
    description:
      "Personal developer portfolio with a terminal-inspired design and animated, responsive sections covering my stack, experience, and projects.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/lukaskourilcz/nxt-portfolio",
    vercel: "https://lukaskouril.vercel.app/",
  },
  {
    title: "aifirst",
    description:
      "Daily, fully static bilingual (CS/EN) AI & tech magazine — a scheduled GitHub Actions job scrapes the day's sources and Claude curates and writes each issue.",
    tech: ["Next.js", "TypeScript", "Claude API", "GitHub Actions"],
  },
  {
    title: "Take a Break",
    description:
      "B2B meditation-booking app with a booking dashboard, achievements, and news, built on a Turborepo monorepo.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Turborepo"],
    vercel: "https://take-a-break-seven.vercel.app",
  },
  {
    title: "Czech Monopoly",
    description:
      "Real-time, browser-based Czech-themed Monopoly where 2–4 players buy Czech cities via a room code, with a trivia twist and full CS/EN localization.",
    tech: ["Next.js", "TypeScript", "Payload CMS", "Neon", "Ably"],
    vercel: "https://czech-cities.vercel.app",
  },
  {
    title: "Personal Dashboard",
    description:
      "Personal life dashboard for subscriptions, todos, streaks, finances, Czech invoices, books, and a calendar, with natural-language quick-add powered by Claude.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Recharts"],
    vercel: "https://own-dashboard-tau.vercel.app",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Marketing site for a Czech bus and freight company, covering its fleet, passenger, and cargo services, with a focus on SEO and i18n.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
  },
  {
    title: "Umyjeme fasádu",
    description:
      "Marketing site for a Czech facade- and surface-cleaning service, presenting its work and contact details.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    vercel: "https://umyjemefasadu.vercel.app/",
  },
  {
    title: "Eurowafers",
    description:
      "Marketing site for a Czech spa-wafer maker, covering its history, products, and distribution.",
    tech: ["Astro", "TypeScript", "TailwindCSS", "Vercel"],
    vercel: "https://eurowafers.vercel.app",
  },
  {
    title: "DevQuiz",
    description:
      "Developer-knowledge quiz and learning app with topic paths, daily challenges, real-time multiplayer, and leaderboards, built on React, serverless functions, and Supabase.",
    tech: ["React", "TypeScript", "Supabase", "Realtime", "Vercel"],
    vercel: "https://react-express-app-five.vercel.app",
  },
  {
    title: "beKind Web App",
    description:
      "Company rebrand and web app, focused on performance, backed by PostgreSQL and Prisma.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
  },
  {
    title: "Dont Wanna Know",
    description:
      "Enter a birth year, country, and city to get an instant, fully in-browser report on the era someone grew up in — no backend and no API calls.",
    tech: ["React", "TypeScript", "Vite"],
    github: "https://github.com/lukaskourilcz/dontwannaknow",
    vercel: "https://dontwannaknow.vercel.app",
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

// Image-less "blank" card: title + links, description, and tech tags.
function ProjectCard({ proj, delay }: { proj: Project; delay: number }) {
  const primary = proj.vercel || proj.github || null;
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-semibold text-zinc-100">
          {primary ? (
            <ArrowLink
              href={primary}
              arrowClassName="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
            >
              {proj.title}
            </ArrowLink>
          ) : (
            proj.title
          )}
        </h3>
        {(proj.github || proj.vercel) && (
          <div className="flex shrink-0 gap-1.5">
            {proj.github && (
              <IconLink href={proj.github} label={`${proj.title} source on GitHub`}>
                <Github className="h-3.5 w-3.5" />
              </IconLink>
            )}
            {proj.vercel && (
              <IconLink href={proj.vercel} label={`${proj.title} live site`}>
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </IconLink>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {proj.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {proj.tech.map((tech) => (
          <Tag key={tech} variant="accent">
            {tech}
          </Tag>
        ))}
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
