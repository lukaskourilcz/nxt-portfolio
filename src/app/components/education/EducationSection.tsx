import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ArrowLink } from "@/components/arrow-link";

type Academy = {
  name: string;
  field: string;
  period: string;
  url?: string;
  description: string;
  skills: string[];
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
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "REST APIs",
      "Docker",
    ],
  },
  {
    name: "Reykjavík Academy of Web Development",
    field: "Web Development",
    period: "Aug 2022 – Dec 2022",
    url: "https://en.tskoli.is/study-programme/reykjavik-academy-of-web-development/",
    description:
      "Web development bootcamp where I built my foundation in HTML, CSS, and JavaScript. Everything centered on building responsive, interactive web apps.",
    skills: [
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Vue.js",
      "Responsive Design",
      "REST APIs",
    ],
  },
];

export default function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading index="04" command="education" title="Education" />

      <div className="border-t border-zinc-800">
        {ACADEMIES.map((a) => (
          <article
            key={a.name}
            className="grid gap-x-8 gap-y-4 border-b border-zinc-800 py-8 sm:grid-cols-[150px_1fr]"
          >
            <p className="font-mono text-xs leading-relaxed text-zinc-400">
              {a.period}
            </p>

            <div>
              <h3 className="font-semibold text-zinc-100">
                {a.url ? <ArrowLink href={a.url}>{a.name}</ArrowLink> : a.name}
              </h3>
              <p className="text-sm text-zinc-400">{a.field}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {a.description}
              </p>
              <p className="mt-3 font-mono text-xs text-zinc-500">
                {a.skills.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
