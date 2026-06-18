import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ArrowLink } from "@/components/arrow-link";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

type Academy = {
  name: string;
  field: string;
  period: string;
  url?: string;
  description: string;
  skills: string[];
};

type Educator = {
  mark: string;
  name: string;
  url?: string;
  blurb: string;
  tags: string[];
};

const ACADEMIES: Academy[] = [
  {
    name: "arol.dev",
    field: "Computer Software Engineering",
    period: "Jul 2024 – Dec 2024",
    url: "https://arol.dev",
    description:
      "Intensive software engineering academy in Barcelona focused on full-stack web development. I worked mainly with JavaScript, TypeScript, React, Next.js, Vue.js, Node.js, Express.js, PostgreSQL, Prisma, and MongoDB, alongside data structures, algorithms, and tools like Git, Docker, Vercel, and Figma. Most of the learning came from building actual projects, which is also where I got hooked on software engineering.",
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
      "Web development bootcamp where I built my foundation in HTML, CSS, and JavaScript. The course centered on responsive, interactive web apps and the fundamentals behind them.",
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

const EDUCATORS: Educator[] = [
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
      "Web developer, designer, and teacher of the Complete JavaScript and Ultimate React courses, with over 2M students.",
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
      "Project-based coding community that helps people build full-stack apps and land developer jobs.",
    tags: ["Full-Stack"],
  },
];

export default function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading index="04" command="education" title="Education" />

      <div className="space-y-5">
        {ACADEMIES.map((a, i) => (
          <Reveal
            as="article"
            key={a.name}
            delay={staggerDelay(i, 0.08)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-card sm:p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-100">
                    {a.url ? (
                      <ArrowLink href={a.url}>{a.name}</ArrowLink>
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
              {a.skills.map((skill) => (
                <Tag key={skill} className="text-[0.65rem]">
                  {skill}
                </Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-6 mt-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-emerald-500">{"//"}</span> completed courses &amp;
          favorite mentors
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATORS.map((e, i) => (
          <Reveal
            as="article"
            key={e.name}
            delay={staggerDelay(i, 0.05)}
            className="group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-card-hover"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-xs font-semibold text-emerald-300">
                {e.mark}
              </span>
              <h3 className="font-semibold text-zinc-100">
                {e.url ? (
                  <ArrowLink
                    href={e.url}
                    arrowClassName="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {e.name}
                  </ArrowLink>
                ) : (
                  e.name
                )}
              </h3>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-zinc-400">
              {e.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.tags.map((tag) => (
                <Tag key={tag} variant="accent">
                  {tag}
                </Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
