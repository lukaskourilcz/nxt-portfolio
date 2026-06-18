import Image from "next/image";
import type { ReactNode } from "react";
import { Github, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/external-link";
import { ArrowLink } from "@/components/arrow-link";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  vercel?: string;
};

// Scouted from the live deployments + each repo's package.json.
// GitHub links are shown only for public repos (private/removed repos would
// 404 for visitors); live links only where the deployment still resolves.
const PROJECTS: Project[] = [
  {
    title: "Portfolio",
    description:
      "Personal developer portfolio with a terminal-inspired design and animated, responsive sections covering my stack, experience, and projects.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/lukaskourilcz/nxt-portfolio",
    vercel: "https://lukaskouril.vercel.app/",
    image: "/projects/portfolio_projekt.png",
  },
  {
    title: "Take a Break",
    description:
      "B2B meditation-booking app with a booking dashboard, achievements, and news, built on a Turborepo monorepo.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Turborepo"],
    vercel: "https://take-a-break-seven.vercel.app",
    image: "/projects/takeabreak_projekt.png",
  },
  {
    title: "Czech Monopoly",
    description:
      "Browser-based, Czech-themed Monopoly game with code-based 2–4 player multiplayer and next-intl localization.",
    tech: ["Next.js", "TypeScript", "Payload CMS", "NeonDB", "next-intl"],
    vercel: "https://czech-cities.vercel.app",
    image: "/wip.png",
  },
  {
    title: "Personal Dashboard",
    description:
      "Productivity dashboard for subscriptions, habits, plans, and a calendar, with AI insights and analytics charts.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Recharts"],
    vercel: "https://own-dashboard-tau.vercel.app",
    image: "/wip.png",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Marketing site for a Czech bus and freight company, covering its fleet, passenger, and cargo services, with a focus on SEO and i18n.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
    image: "/projects/autodopravakopecek_projekt.png",
  },
  {
    title: "Eurowafers",
    description:
      "Marketing site for a Czech spa-wafer maker, covering its history, products, and distribution.",
    tech: ["Astro", "TypeScript", "TailwindCSS", "Vercel"],
    vercel: "https://eurowafers.vercel.app",
    image: "/wip.png",
  },
  {
    title: "DevQuiz",
    description:
      "Full-stack developer quiz with JWT auth and Supabase data behind an Express serverless API.",
    tech: ["React", "TypeScript", "Express", "Supabase", "JWT"],
    vercel: "https://react-express-app-five.vercel.app",
    image: "/wip.png",
  },
  {
    title: "beKind Web App",
    description:
      "Company rebrand and web app, focused on performance, backed by PostgreSQL and Prisma.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    image: "/projects/bekind_projekt.png",
  },
  {
    title: "Dont Wanna Know",
    description:
      "Interactive web app that asks personal questions, then uses Gemini AI to generate tailored life stats.",
    tech: ["Next.js", "TypeScript", "Gemini AI"],
    github: "https://github.com/lukaskourilcz/dontwannaknow",
    vercel: "https://dontwannaknow.vercel.app",
    image: "/wip.png",
  },
];

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <ExternalLink
      href={href}
      aria-label={label}
      className="rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-200 backdrop-blur-sm transition-colors hover:text-emerald-300"
    >
      {children}
    </ExternalLink>
  );
}

// Shared card visual (image + content) for every project card.
function ProjectVisual({ proj }: { proj: Project }) {
  const primary = proj.vercel || proj.github || null;
  return (
    <>
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
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </IconLink>
          )}
        </div>
      </div>

      <div className="relative z-10 -mt-6 flex flex-1 flex-col px-5 pb-5">
        <h3 className="text-base font-semibold text-zinc-100">
          {primary ? (
            <ArrowLink
              href={primary}
              arrowClassName="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
            >
              {proj.title}
            </ArrowLink>
          ) : (
            proj.title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {proj.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {proj.tech.map((tech) => (
            <Tag key={tech} variant="accent">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
}

const CARD_SHELL =
  "group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-900 shadow-card";

function ProjectCard({ proj, delay }: { proj: Project; delay: number }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`${CARD_SHELL} h-full border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-card-hover`}
    >
      <ProjectVisual proj={proj} />
    </Reveal>
  );
}

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading index="02" command="projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj, i) => (
          <ProjectCard key={proj.title} proj={proj} delay={staggerDelay(i)} />
        ))}
      </div>
    </Section>
  );
}
