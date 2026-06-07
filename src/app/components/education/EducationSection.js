import Link from "next/link";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const ACADEMIES = [
  {
    name: "arol.dev",
    field: "Computer Software Engineering",
    period: "Jul 2024 – Dec 2024",
    url: "https://arol.dev",
    description:
      "Intensive Software Engineering academy in Barcelona, where I gained experience in full-stack web development, working mainly with technologies like JavaScript, TypeScript, React, Next.js, Vue.js, Node.js, Express.js, PostgreSQL, PrismaDB, and MongoDB. Alongside learning data structures, algorithms, and tools like Git, Docker, Vercel, and Figma, I built real-world projects that strengthened my problem-solving skills but also my passion for software engineering and continuous learning.",
    skills: [
      "Redux.js",
      "Software Development",
      "Agile Application Development",
      "AngularJS",
      "Heroku",
      "React Native",
      "Node.js",
      "Vue.js",
      "Webpack",
      "PostgreSQL",
      "Front-End Development",
      "Front-end Coding",
      "HTML5",
      "GitHub",
      "Web Application Development",
      "Back-End Web Development",
      "Prisma ORM",
      "Web Development",
      "Mocha (JavaScript Framework)",
      "Kubernetes",
      "Tailwind CSS",
      "SASS",
      "Docker Products",
      "DevOps",
      "Full-Stack Development",
    ],
  },
  {
    name: "Reykjavík Academy of Web Development",
    field: "Web Development",
    period: "Aug 2022 – Dec 2022",
    url: "https://en.tskoli.is/study-programme/reykjavik-academy-of-web-development/",
    description:
      "Web Development focused bootcamp, where I developed a strong foundation in HTML, CSS, and JavaScript. The curriculum focused on building responsive, interactive web applications and emphasized core web development principles.",
    skills: [
      "JavaScript",
      "CSS",
      "Vue.js",
      "Front-End Development",
      "HTML5",
      "GitHub",
      "Web Development",
      "Mocha (JavaScript Framework)",
      "Git",
    ],
  },
];

const EDUCATORS = [
  {
    mark: "JR",
    name: "The Joy of React",
    url: "https://www.joyofreact.com",
    blurb:
      "Josh W. Comeau's interactive React course covering fundamentals, hooks, state, component design, and full-stack Next.js.",
    tags: ["React", "Next.js"],
  },
  {
    mark: "CS",
    name: "Colt Steele",
    url: "https://www.coltsteele.com",
    blurb:
      "Developer and bootcamp instructor behind Udemy's best-selling Web Developer Bootcamp; former lead instructor at Galvanize.",
    tags: ["Full-Stack", "JavaScript"],
  },
  {
    mark: "JS",
    name: "Jonas Schmedtmann",
    url: "https://jonas.io",
    blurb:
      "Web developer, designer, and teacher of the acclaimed Complete JavaScript and Ultimate React courses, with 2M+ students.",
    tags: ["JavaScript", "React", "CSS"],
  },
  {
    mark: "MP",
    name: "Matt Pocock",
    url: "https://www.totaltypescript.com",
    blurb:
      "Full-time TypeScript educator and creator of Total TypeScript; former XState core team and Vercel developer advocate.",
    tags: ["TypeScript"],
  },
  {
    mark: "RQ",
    name: "Rafeh Qazi",
    url: "https://www.cleverprogrammer.com",
    blurb:
      "Founder of CleverProgrammer, teaching project-based full-stack development to over a million aspiring developers.",
    tags: ["Full-Stack", "React"],
  },
  {
    mark: "ND",
    name: "Naz Dumanskyy",
    url: "https://www.linkedin.com/in/nazariydumanskyy",
    blurb:
      "Full-stack developer and educator who helped build CleverProgrammer; now co-founder of the AI tool Poppy AI.",
    tags: ["Full-Stack", "JavaScript"],
  },
  {
    mark: "CP",
    name: "CleverProgrammer",
    url: "https://www.cleverprogrammer.com",
    blurb:
      "Project-based coding community teaching learners to build real-world full-stack apps and land developer jobs.",
    tags: ["Full-Stack"],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="04" command="education" title="Education" />

      <div className="space-y-5">
        {ACADEMIES.map((a, i) => (
          <Reveal
            as="article"
            key={a.name}
            delay={i * 0.08}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-100">
                    {a.url ? (
                      <Link
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-emerald-300"
                      >
                        {a.name}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      a.name
                    )}
                  </h3>
                  <p className="text-sm text-zinc-400">{a.field}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-zinc-500 sm:pt-1 sm:text-right">
                {a.period}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {a.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {a.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[0.65rem] text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-6 mt-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-emerald-500">{"//"}</span> courses &amp; mentors
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATORS.map((e, i) => (
          <Reveal
            as="article"
            key={e.name}
            delay={Math.min(i * 0.05, 0.25)}
            className="group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)]"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-xs font-semibold text-emerald-300">
                {e.mark}
              </span>
              <h3 className="font-semibold text-zinc-100">
                {e.url ? (
                  <Link
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-emerald-300"
                  >
                    {e.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ) : (
                  e.name
                )}
              </h3>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-zinc-400">
              {e.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.7rem] text-emerald-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
