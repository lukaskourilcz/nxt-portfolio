import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";

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
      "Joined as the team's first AI-focused engineer — brought AI tooling into the workflow and set the conventions for how we use it",
      "Lead frontend work in TypeScript, React and Next.js, including code quality and cross-browser behavior",
      "Maintain coding standards and client guidelines around accessibility and web standards",
      "Write technical specs from designs and prepare graphic assets for the build",
      "Model structured content in Payload CMS and improve UX details across client sites",
    ],
    tags: ["AI tooling", "TypeScript", "Next.js", "React", "Payload CMS"],
  },
  {
    company: "EmbedIT",
    logo: "/logos/embedit_logo.png",
    role: "Senior Fullstack Developer",
    period: "Oct 2025 – Mar 2026",
    location: "Prague, Czech Republic",
    responsibilities: [
      "Led the modernization of an online banking platform, moving legacy systems to a micro-frontend architecture",
      "Built the Backend-for-Frontend (BFF) layer — controllers, mappers, and service orchestration",
      "Designed API contracts and kept integrations stable across several downstream services",
      "Covered the code with unit, integration, and E2E tests, and met WCAG accessibility requirements",
      "Sped up CI/CD pipelines and tightened code review standards",
    ],
    tags: ["TypeScript", "React", "Express.js", "StyleX", "Node.js"],
  },
  {
    company: "Ersilia",
    logo: "/logos/ersilia_logo.png",
    role: "Fullstack Developer",
    period: "May 2025 – Sep 2025",
    location: "Barcelona, Spain",
    responsibilities: [
      "Built a full-stack app in Next.js and TypeScript for managing structured ML model metadata",
      "Designed the database schema and the backend behind it",
      "Built an AI workflow on the Vercel AI SDK that analyzes scientific PDFs with an LLM",
      "Automated metadata validation and repo syncing with the GitHub API and Actions",
      "Worked directly with the research team on an open-science codebase",
    ],
    tags: ["TypeScript", "Next.js", "Vercel AI SDK", "PostgreSQL", "Node.js"],
  },
  {
    company: "beKind",
    logo: "/logos/bekind_logo.png",
    role: "Frontend Developer",
    period: "Nov 2024 – Jun 2025",
    location: "Barcelona, Spain",
    responsibilities: [
      "Built the site in Next.js from reusable components, tuned for performance and SEO",
      "Helped shape the UX/UI around clear, simple navigation",
      "Handled deployment and ran speed and accessibility passes before release",
    ],
    tags: ["TypeScript", "Next.js", "Tailwind", "PostgreSQL", "Node.js"],
  },
  {
    company: "Autodoprava Kopeček",
    logo: "/logos/autodopravakopecek_logo.png",
    role: "Frontend Engineer",
    period: "Jan 2025 – Feb 2025",
    location: "Brno, Czech Republic",
    responsibilities: [
      "Solo project — took the client's brief from concept and design through testing and release",
      "Built the site in Next.js and shadcn/ui, mobile-first and heavy on SEO",
      "Designed the customer flow around quote requests and conversions",
      "Deployed on Vercel and tuned performance and accessibility",
    ],
    tags: ["TypeScript", "Next.js", "SEO", "UX/UI", "i18n", "shadcn/ui"],
  },
  {
    company: "Take a Break",
    logo: "/logos/takeabreak_logo.png",
    role: "Full Stack Developer",
    period: "Apr 2024 – Oct 2024",
    location: "Barcelona, Spain",
    responsibilities: [
      "Built a full-stack B2B app for booking meditation sessions in Next.js and TypeScript",
      "Assembled the UI from reusable React, TailwindCSS, and shadcn/ui components",
      "Tuned PostgreSQL queries through Prisma",
      "Integrated Stripe and third-party APIs for payments, auth, and real-time updates",
      "Deployed on Vercel with CI for preview and production builds",
    ],
    tags: ["TypeScript", "Next.js", "Tailwind", "PostgreSQL", "Prisma"],
  },
  {
    company: "Controlant",
    logo: "/logos/controlant_logo.png",
    role: "Technical Analyst",
    period: "Nov 2021 – Apr 2024",
    location: "Reykjavík, Iceland",
    responsibilities: [
      "Monitored live telemetry from cold-chain IoT trackers on pharmaceutical shipments and triaged critical temperature excursions",
      "Ran root-cause analysis on shipment and sensor data and turned findings into compliant resolutions for global clients",
      "Automated recurring parts of data processing and client reporting",
      "Wrote audit reports and quality documentation, and presented findings to senior management",
    ],
    tags: ["Data Analysis", "IoT Telemetry", "Root-Cause Analysis", "Automation"],
  },
  {
    company: "Entain Group",
    logo: "/logos/entain_logo.png",
    role: "User Protection Expert",
    period: "Jan 2020 – Sep 2021",
    location: "Gibraltar",
    responsibilities: [
      "Detected fraud and money-laundering patterns in betting and transaction data using dedicated analysis tools",
      "Ran investigations on flagged accounts and handled sensitive user data under GDPR",
      "Kept detection processes compliant with EU and local gaming regulations",
      "Mentored junior analysts on compliance and risk",
    ],
    tags: ["Fraud Detection", "AML/KYC", "Data Analytics", "GDPR"],
  },
  {
    company: "Kiwi.com",
    logo: "/logos/kiwi_logo.png",
    role: "Customer Relations Advisor",
    period: "Dec 2015 – Nov 2019",
    location: "Brno, Czech Republic",
    responsibilities: [
      "Resolved complex booking issues across multiple airline and CRM systems",
      "Reworked support workflows based on resolution-time data, cutting handle times",
      "Supported KAYAK operations and B2B partners with data-backed resolutions",
      "Trained new hires on systems, policies, and support processes",
    ],
    tags: ["CRM Systems", "Workflow Optimization", "B2B Support"],
  },
];

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading index="03" command="experience" title="Experience" />

      <div className="border-t border-zinc-800">
        {EXPERIENCES.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="grid gap-x-8 gap-y-4 border-b border-zinc-800 py-8 sm:grid-cols-[150px_1fr]"
          >
            <div className="font-mono text-xs leading-relaxed">
              <p className="text-zinc-400">{exp.period}</p>
              <p className="mt-1 text-zinc-600">{exp.location}</p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                {exp.logo ? (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-md object-contain"
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800 font-mono text-xs font-semibold text-zinc-300">
                    {exp.mark}
                  </span>
                )}
                <div>
                  <h3 className="font-semibold text-zinc-100">{exp.role}</h3>
                  <p className="text-sm text-zinc-400">{exp.company}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5">
                {exp.responsibilities.map((res, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-snug text-zinc-400"
                  >
                    <span className="mt-0.5 select-none font-mono text-zinc-600">
                      ›
                    </span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-xs text-zinc-500">
                {exp.tags.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
