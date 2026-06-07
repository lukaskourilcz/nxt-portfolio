import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
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
    tech: ["Next.js", "TypeScript", "Payload CMS", "PostgreSQL", "next-intl"],
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
    title: "AI Powered Quiz App",
    description:
      "AI-powered quiz app that generates random React questions with Gemini and grades answers in real time.",
    tech: ["Next.js", "TypeScript", "Gemini AI", "Vercel"],
    image: "/projects/aiquiz_projekt.png",
  },
  {
    title: "Habit Tracker",
    description:
      "Full-stack web app for tracking personal habits and skill progress, pairing a React front end with an Express and Prisma API.",
    tech: ["React", "TypeScript", "Express", "Prisma", "Node.js"],
    github: "https://github.com/lukaskourilcz/habit-tracker",
    image: "/projects/habittracker_projekt.png",
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
  {
    title: "Vue Quiz App",
    description:
      "Frontend-knowledge quiz that serves questions from JSON and tallies a final score, deployed on Netlify.",
    tech: ["Vue 3", "Vite", "Bootstrap", "Netlify"],
    image: "/projects/vuequiz_projekt.png",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="03" command="projects" title="Projects" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj, i) => (
          <Reveal key={proj.title} delay={Math.min(i * 0.05, 0.25)}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md">
              <div className="relative h-44 w-full overflow-hidden border-b border-zinc-800 bg-zinc-800/50">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-zinc-100">{proj.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-500">
                    {proj.github && (
                      <Link
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${proj.title} source on GitHub`}
                        className="transition-colors hover:text-emerald-400"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {proj.vercel && (
                      <Link
                        href={proj.vercel}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${proj.title} live site`}
                        className="transition-colors hover:text-emerald-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-zinc-400">
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
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
