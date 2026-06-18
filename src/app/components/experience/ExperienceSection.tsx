import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  tags: string[];
  logo?: string;
  mark?: string;
};

const EXPERIENCES: Experience[] = [
  {
    company: "Web Integrator",
    mark: "Wi",
    role: "Senior Frontend Engineer",
    period: "Apr 2026 – Present",
    location: "Prague, Czech Republic",
    responsibilities: [
      "Joined as the team's first AI-focused engineer, building AI tooling into the team's workflow and setting how we use it day to day",
      "Lead frontend work in TypeScript, React and Next.js, and own code quality and cross-browser behavior",
      "Set and maintain coding standards and client guidelines, with a focus on accessibility and web standards",
      "Write technical specs from designs and other materials, and prepare graphic assets for the build",
      "Improve technical and UX details across sites, and model structured content in Payload CMS",
      "Track and report on progress, and ship changes according to the project plan",
    ],
    tags: ["AI", "TYPESCRIPT", "NEXT.JS", "REACT", "PAYLOADCMS"],
  },
  {
    company: "EmbedIT",
    logo: "/logos/embedit_logo.png",
    role: "Senior Fullstack Developer",
    period: "Oct 2025 – Mar 2026",
    location: "Prague, Czech Republic",
    responsibilities: [
      "Led the work to modernize an online banking platform, moving its legacy systems to a micro-frontend architecture",
      "Built a Backend-for-Frontend (BFF) layer, including its controllers, mappers, and service orchestration",
      "Owned API contract design and kept integrations stable across several downstream services",
      "Covered the code with unit, integration, and E2E tests, and met WCAG accessibility requirements",
      "Improved developer experience by speeding up CI/CD pipelines and tightening code review standards",
    ],
    tags: ["TYPESCRIPT", "REACT", "EXPRESS.JS", "STYLEX", "NODE.JS"],
  },
  {
    company: "Ersilia",
    logo: "/logos/ersilia_logo.png",
    role: "Fullstack Developer",
    period: "May 2025 – Sep 2025",
    location: "Barcelona, Spain",
    responsibilities: [
      "Built a full-stack web app with Next.js and TypeScript",
      "Designed the database schema and the backend for managing structured model metadata",
      "Built key parts of an AI workflow that uses the Vercel AI SDK to analyze PDFs with an LLM",
      "Automated metadata validation and repo syncing with the GitHub API and Actions",
      "Worked with researchers and engineers to keep the implementation in line with the project's open-science goals",
    ],
    tags: ["TYPESCRIPT", "NEXT.JS", "VERCEL AI SDK", "POSTGRESQL", "NODE.JS"],
  },
  {
    company: "beKind",
    logo: "/logos/bekind_logo.png",
    role: "Frontend Developer",
    period: "Nov 2024 – Jun 2025",
    location: "Barcelona, Spain",
    responsibilities: [
      "Built the site in Next.js, with performance and SEO in mind",
      "Helped with the UX/UI design, focusing on clear, easy navigation",
      "Built responsive front-end interfaces from reusable components",
      "Helped with deployment and tuned the site for speed and accessibility",
      "Worked with other teams to move the project from planning to release",
    ],
    tags: ["TYPESCRIPT", "NEXT.JS", "TAILWIND", "POSTGRESQL", "NODE.JS"],
  },
  {
    company: "Autodoprava Kopeček",
    logo: "/logos/autodopravakopecek_logo.png",
    role: "Frontend Engineer",
    period: "Jan 2025 – Feb 2025",
    location: "Brno, Czech Republic",
    responsibilities: [
      "Built the website in Next.js, with a focus on speed, mobile, and SEO",
      "Used ShadCN components to put together the interface",
      "Designed parts of the UX/UI around an easy customer flow and better conversions",
      "Deployed on Vercel and tuned the site for performance and accessibility",
      "Handled the whole project, from concept and design through testing and release",
      "Worked directly with the client, turning their brief into the finished site",
    ],
    tags: ["TYPESCRIPT", "NEXT.JS", "SEO", "UX/UI", "VERCEL", "I18N", "ShadCN"],
  },
  {
    company: "Take a Break",
    logo: "/logos/takeabreak_logo.png",
    role: "Full Stack Developer",
    period: "Apr 2024 – Oct 2024",
    location: "Barcelona, Spain",
    responsibilities: [
      "Worked on a full-stack B2B app for booking meditation sessions, using Next.js and TypeScript",
      "Built the UI from reusable React, TailwindCSS, and ShadCN components",
      "Worked with PostgreSQL and Prisma, tuning queries and keeping the data consistent",
      "Integrated Stripe and other third-party APIs for real-time updates and authentication",
      "Used Figma for UI/UX design and Linear to track work across sprints",
      "Deployed on Vercel with CI for preview and production builds",
    ],
    tags: ["TYPESCRIPT", "NEXT.JS", "TAILWIND", "POSTGRESQL", "ShadCN", "PRISMA"],
  },
  {
    company: "Controlant",
    logo: "/logos/controlant_logo.png",
    role: "Technical Customer Analyst",
    period: "Nov 2021 – Apr 2024",
    location: "Reykjavík, Iceland",
    responsibilities: [
      "Answered logistics inquiries for pharmaceutical shipments, where keeping products safe in transit was critical",
      "Monitored shipment data and resolved critical issues using the company's tracking tools",
      "Ran root-cause analysis and provided compliant solutions for clients around the world",
      "Spotted opportunities to automate parts of data processing and client communication",
      "Put together quality documentation and audit reports, and presented findings to senior management",
      "Handled high-stakes technical issues that needed coordination across several international teams",
    ],
    tags: ["DATA ANALYSIS", "PROCESS AUTOMATION", "LOGISTICS", "ROOT-CAUSE ANALYSIS"],
  },
  {
    company: "Entain Group",
    logo: "/logos/entain_logo.png",
    role: "Customer Protection Expert",
    period: "Jan 2020 – Sep 2021",
    location: "Gibraltar",
    responsibilities: [
      "Built up expertise in gaming compliance and anti-money laundering (AML)",
      "Used data analysis and dedicated tools to spot suspicious behavior and prevent fraud",
      "Kept processes in line with EU and local regulations",
      "Ran investigations and handled sensitive customer data in line with GDPR",
      "Trained and mentored junior team members on compliance and risk",
      "Took a strict, zero-tolerance approach to policy breaches",
    ],
    tags: ["COMPLIANCE", "AML/KYC", "DATA ANALYTICS", "RISK MANAGEMENT"],
  },
  {
    company: "Kiwi.com",
    logo: "/logos/kiwi_logo.png",
    role: "Customer Relations Advisor",
    period: "Dec 2015 – Nov 2019",
    location: "Brno, Czech Republic",
    responsibilities: [
      "Resolved complex customer issues across multiple channels",
      "Kept up with aviation trends and learned the various CRM systems we used",
      "Shared feedback with management and reworked workflows to cut resolution time",
      "Supported KAYAK operations with data-backed resolutions, and helped B2B partners",
      "Kept a customer satisfaction (CSAT) score above team targets",
      "Trained new hires on company policies, products, and how we handled support",
    ],
    tags: ["CRM SYSTEMS", "STAKEHOLDER COMMUNICATION", "WORKFLOW OPTIMIZATION"],
  },
];

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading index="03" command="experience" title="Experience" />

      <ol className="relative ml-2 border-l border-zinc-800">
        {EXPERIENCES.map((exp, i) => (
          <Reveal
            as="li"
            key={`${exp.company}-${exp.period}`}
            delay={staggerDelay(i, 0.04, 0.2)}
            className="relative mb-8 ml-6 last:mb-0"
          >
            <span className="absolute -left-[1.875rem] top-2 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-500 ring-1 ring-emerald-500/30" />

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-card transition-all duration-200 hover:border-emerald-500/40 hover:shadow-card-hover">
              <p className="font-mono text-xs text-zinc-400">
                {exp.period} <span className="text-zinc-600">·</span>{" "}
                {exp.location}
              </p>

              <div className="mt-2 flex items-center gap-3">
                {exp.logo ? (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-md object-contain"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-300">
                    {exp.mark}
                  </span>
                )}
                <div>
                  <h3 className="font-semibold text-zinc-100">{exp.company}</h3>
                  <p className="text-sm text-zinc-400">{exp.role}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5">
                {exp.responsibilities.map((res, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-snug text-zinc-400"
                  >
                    <span className="mt-0.5 select-none font-mono text-emerald-500">
                      ›
                    </span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <Tag key={tag} className="px-2.5">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
