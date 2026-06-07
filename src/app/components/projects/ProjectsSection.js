import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
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

function ProjectCard({ proj, delay }) {
  const primary = proj.vercel || proj.github || null;
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)]"
    >
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
    </Reveal>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="02" command="projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj, i) => (
          <ProjectCard
            key={proj.title}
            proj={proj}
            delay={Math.min(i * 0.04, 0.25)}
          />
        ))}
      </div>
    </section>
  );
}
