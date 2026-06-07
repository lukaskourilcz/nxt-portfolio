import Link from "next/link";
import { Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import GitHubGrid from "@/components/github-grid";

const STACK = [
  {
    label: "languages",
    items: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
    ],
  },
  {
    label: "frontend",
    items: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
    ],
  },
  {
    label: "backend & data",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-original colored" },
    ],
  },
  {
    label: "tools",
    items: [
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Figma", icon: "devicon-figma-plain colored" },
    ],
  },
];

export default function StackSection() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {STACK.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              <span className="text-emerald-500">{"//"}</span> {group.label}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/40"
                >
                  <i className={`${it.icon} text-lg`} aria-hidden />
                  <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    {it.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              <span className="text-emerald-600 dark:text-emerald-400">$</span>{" "}
              git log --graph
            </p>
            <Link
              href="https://github.com/lukaskourilcz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-emerald-600 dark:text-zinc-500 dark:hover:text-emerald-400"
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
