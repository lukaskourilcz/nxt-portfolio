import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const EXPERIENCES = [
  {
    company: "Web Integrator",
    mark: "Wi",
    role: "Senior Frontend Engineer",
    period: "Apr 2026 – Present",
    location: "Prague, Czech Republic",
    responsibilities: [
      "Joined as the team's first AI-focused engineer, bringing AI tools into everyday work to help the team move faster while keeping quality high",
      "Lead advanced frontend implementation with TypeScript, React and Next.js, owning code validity and correct cross-browser behavior",
      "Define and enforce coding standards, client guidelines and best practices, with a strong emphasis on accessibility and web standards",
      "Author complete technical specifications from supplied designs and available materials, and prepare graphic assets for implementation",
      "Drive technical and UX optimizations across sites and model structured content with Payload CMS",
      "Own change delivery against the project plan with disciplined activity tracking and reporting",
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
      "Led modernization of an online banking platform, migrating legacy systems to a micro-frontend architecture",
      "Designed and implemented a Backend-for-Frontend (BFF) layer, including controllers, mappers, and service orchestration",
      "Owned API contract design and integration stability across multiple downstream services",
      "Ensured production-grade quality through unit, integration, and E2E testing, with strict WCAG accessibility compliance",
      "Improved developer experience by optimizing CI/CD pipelines and enforcing code review standards",
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
      "Designed and implemented a full-stack web app built with Next.js and TypeScript",
      "Created the database schema and implemented backend integration for structured model metadata management",
      "Developed key features of an AI-powered workflow leveraging the Vercel AI SDK for LLM-based PDF analysis",
      "Automated metadata validation and repository synchronization through GitHub APIs and Actions",
      "Collaborated with researchers and engineers to align technical implementation with open-science goals",
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
      "Developed the site with Next.js to ensure high performance, modern standards, and strong SEO capabilities",
      "Contributed to the UX/UI design process, emphasizing intuitive navigation and user-centered design",
      "Implemented responsive and clean front-end interfaces using reusable components and best practices",
      "Assisted with deployment and optimized the site for speed, accessibility, and scalability",
      "Collaborated across departments to guide the project from planning through production release",
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
      "Developed the website using Next.js, ensuring a modern, high-performance, and mobile-responsive SEO-friendly platform",
      "Implemented UI components from ShadCN to create a sleek and visually appealing interface",
      "Designed key aspects of the UX/UI focused on seamless customer experience and high conversion",
      "Deployed and optimized the site for performance, accessibility, and scalability using Vercel",
      "Managed the full development lifecycle from initial concept and design through testing and production release",
      "Collaborated closely with the client to deliver a product that met all business requirements",
    ],
    tags: ["TYPESCRIPT", "NEXT.JS", "SEO", "UX/UI", "VERCEL", "AI18N", "ShadCN"],
  },
  {
    company: "Take a Break",
    logo: "/logos/takeabreak_logo.png",
    role: "Full Stack Developer",
    period: "Apr 2024 – Oct 2024",
    location: "Barcelona, Spain",
    responsibilities: [
      "Collaborated on a full-stack B2B web app for scheduling meditation sessions using Next.js & TypeScript",
      "Built a modern UI with reusable React, TailwindCSS, and ShadCN components",
      "Managed PostgreSQL & Prisma databases, optimizing performance and ensuring data integrity",
      "Integrated Stripe and other third-party APIs for real-time updates and secure authentication",
      "Used Figma for detailed UI/UX design and Linear for agile task management across sprints",
      "Deployed the app on Vercel for scalability, fast load times, and easy continuous integration",
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
      "Handled logistics inquiries for pharmaceutical products, ensuring safe transport worldwide",
      "Monitored shipment data and resolved critical anomalies using advanced data insights and tracking tools",
      "Performed detailed root-cause analysis and delivered regulatory-compliant solutions to global clients",
      "Identified opportunities for AI-driven automation improvements in data processing and client communication",
      "Compiled quality documentation, audit reports, and presented findings to senior management",
      "Managed high-stakes technical issues requiring coordination between multiple international teams",
    ],
    tags: ["DATA ANALYSIS", "AI AUTOMATION", "LOGISTICS", "ROOT-CAUSE ANALYSIS"],
  },
  {
    company: "Entain Group",
    logo: "/logos/entain_logo.png",
    role: "Customer Protection Expert",
    period: "Jan 2020 – Sep 2021",
    location: "Gibraltar",
    responsibilities: [
      "Developed expertise in gaming compliance and anti-money laundering (AML) frameworks",
      "Used data analytics and specialized tools to detect suspicious behavior and prevent financial fraud",
      "Delivered regulatory-compliant solutions ensuring adherence to strict EU and local standards",
      "Conducted in-depth investigations and processed sensitive customer data in line with GDPR",
      "Provided training and guidance to junior team members on compliance protocols and risk mitigation",
      "Maintained a zero-tolerance approach to breaches of regulatory policy",
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
      "Resolved complex customer issues with efficient communication workflows across multiple channels",
      "Stayed updated on aviation trends and mastered various CRM systems to ensure high quality support",
      "Provided feedback to stakeholders and management and optimized workflows to reduce resolution time",
      "Supported KAYAK operations through data-backed resolutions and provided support for B2B partners",
      "Consistently maintained a high customer satisfaction (CSAT) score exceeding team goals",
      "Trained new hires on company policies, products, and customer service best practices",
    ],
    tags: ["CRM SYSTEMS", "STAKEHOLDER COMMUNICATION", "WORKFLOW OPTIMIZATION"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-12 sm:py-24">
      <SectionHeading index="03" command="experience" title="Experience" />

      <ol className="relative ml-2 border-l border-zinc-800">
        {EXPERIENCES.map((exp, i) => (
          <Reveal
            as="li"
            key={`${exp.company}-${exp.period}`}
            delay={Math.min(i * 0.04, 0.2)}
            className="relative mb-8 ml-6 last:mb-0"
          >
            <span className="absolute -left-[1.875rem] top-2 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-500 ring-1 ring-emerald-500/30" />

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:border-emerald-500/40 hover:shadow-sm">
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
                  <h3 className="font-semibold text-zinc-100">
                    {exp.company}
                  </h3>
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
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 font-mono text-[0.7rem] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
