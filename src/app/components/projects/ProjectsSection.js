import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const PROJECTS = [
  {
    title: "Portfolio",
    description:
      "My personal portfolio showcasing projects and skills. Built with Next.js, TailwindCSS, and Framer Motion.",
    tech: ["JavaScript", "Next.js", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/lukaskourilcz/portfolio",
    vercel: "https://lukaskouril.vercel.app/",
    image: "/projects/portfolio_projekt.png",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Developed and deployed a modern Next.js website for a transport company with SEO and accessibility in mind.",
    tech: ["TypeScript", "Next.js", "TailwindCSS", "SEO", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
    image: "/projects/autodopravakopecek_projekt.png",
  },
  {
    title: "AI Powered Quiz App",
    description:
      "Quiz app built with Next.js and Gemini AI that generates random React-related questions and grades answers in real time.",
    tech: ["TypeScript", "Next.js", "Gemini AI", "Vercel"],
    vercel: "https://quiz-app-nxt.vercel.app/",
    github: "https://github.com/lukaskourilcz/react-quiz-app",
    image: "/projects/aiquiz_projekt.png",
  },
  {
    title: "Dont Wanna Know",
    description:
      "Web app using Gemini AI to reveal life stats after answering personal questions. Built with Next.js and Node.js.",
    tech: ["JavaScript", "React", "Node.js", "Gemini AI", "Vercel"],
    github: "https://github.com/lukaskourilcz/dontwannaknow",
    image: "/wip.png",
  },
  {
    title: "beKind Web App",
    description:
      "Contributed to rebranding and building the company web app with a focus on UX/UI and performance.",
    tech: ["TypeScript", "Next.js", "Node.js", "Prisma", "PostgreSQL"],
    image: "/projects/bekind_projekt.png",
  },
  {
    title: "Take a Break Web App",
    description:
      "Full-stack B2B meditation scheduling app. Built with Next.js, TypeScript, Prisma, and PostgreSQL.",
    tech: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Digital Twin",
      "UX/UI",
      "Vercel",
    ],
    github: "https://github.com/lukaskourilcz/TakeABreak",
    image: "/projects/takeabreak_projekt.png",
  },
  {
    title: "Habit Tracker",
    description:
      "Web app to track personal habits and skills using React, TypeScript, and ShadCN components.",
    tech: ["TypeScript", "React", "Node.js", "ShadCN", "TailwindCSS", "Vercel"],
    github: "https://github.com/lukaskourilcz/habit-tracker",
    image: "/projects/habittracker_projekt.png",
  },
  {
    title: "Vue Quiz App",
    description:
      "Vue 3 quiz app that tests frontend knowledge. Takes questions from JSON and evaluates score at the end.",
    tech: ["Vue 3", "Vite", "Bootstrap", "Netlify"],
    vercel: "https://quiz-app-sable-eight-67.vercel.app/",
    github: "https://github.com/lukaskourilcz/vue-quiz-app",
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
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/40">
              <div className="relative h-44 w-full overflow-hidden border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
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
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                    {proj.github && (
                      <Link
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${proj.title} source on GitHub`}
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
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
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {proj.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-emerald-100 bg-emerald-50/60 px-2 py-0.5 font-mono text-[0.7rem] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
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
