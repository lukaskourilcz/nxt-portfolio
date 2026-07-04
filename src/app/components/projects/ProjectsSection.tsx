import Image from "next/image";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ExternalLink } from "@/components/external-link";

type Project = {
  title: string;
  description: string;
  tech: string[];
  // Live screenshot at /public/projects/<slug>.png, shown in the card banner.
  image?: string;
  vercel?: string;
  // Optional italic aside shown under the description (e.g. a caveat about the
  // screenshot). Omit on cards that don't need it.
  note?: string;
};

// Scouted from the live deployments + each repo's package.json.
// The repos are private, so no source links are shown — only a live link
// (the external-link icon) where the deployment still resolves.
const PROJECTS: Project[] = [
  {
    title: "devShark",
    description:
      "Developer quiz and learning app with topic paths, daily challenges, real-time multiplayer, and leaderboards. React and Supabase behind serverless functions.",
    tech: ["React", "TypeScript", "Supabase", "Realtime", "Vercel"],
    vercel: "https://react-express-app-five.vercel.app",
    image: "/projects/devshark.png",
  },
  {
    title: "Personal Dashboard",
    description:
      "Life dashboard for subscriptions, habits, finances, Czech invoices, books, and a calendar — plus a natural-language quick-add built on Claude.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Recharts"],
    vercel: "https://own-dashboard-tau.vercel.app",
    image: "/projects/personal-dashboard.png",
  },
  {
    title: "aifirst",
    description:
      "Daily, fully static bilingual (CS/EN) AI & tech magazine — a scheduled GitHub Actions job scrapes the day's sources and Claude curates and writes each issue.",
    tech: ["Next.js", "TypeScript", "Claude API", "GitHub Actions"],
    vercel: "https://aifirst-beryl.vercel.app/",
    image: "/projects/aifirst.png",
  },
  {
    title: "Czech Monopoly",
    description:
      "Real-time, browser-based Czech-themed Monopoly where 2–4 players buy Czech cities via a room code, with a trivia twist and CS/EN localization.",
    tech: ["Next.js", "TypeScript", "Payload CMS", "Neon", "Ably"],
    vercel: "https://czech-cities.vercel.app",
    image: "/projects/czech-cities.png",
  },
  {
    title: "Dont Wanna Know",
    description:
      "Enter a birth year, country, and city to get an instant, fully in-browser report on the era someone grew up in — no backend and no API calls.",
    tech: ["React", "TypeScript", "Vite", "i18n", "Vercel"],
    vercel: "https://dontwannaknow.vercel.app",
    image: "/projects/dontwannaknow.png",
  },
  {
    title: "AutobusyHodonín.cz",
    description:
      "Marketing site for a Czech bus and freight company — fleet, passenger routes, and cargo — tuned for SEO, in Czech and English.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    image: "/projects/autobusy-hodonin.png",
  },
  {
    title: "Umyjeme fasádu",
    description:
      "Marketing site for a Czech exterior-cleaning service — hot-water pressure washing of facades, roofs, and paving — with before/after sliders and a quote form.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS"],
    vercel: "https://umyjemefasadu.vercel.app/",
    image: "/projects/umyjeme-fasadu.png",
  },
  {
    title: "Eurowafers",
    description:
      "Marketing site for a Czech spa-wafer maker, covering its history, products, and distribution.",
    tech: ["Astro", "TypeScript", "TailwindCSS", "Vercel"],
    vercel: "https://eurowafers.vercel.app",
    image: "/projects/eurowafers.png",
  },
  {
    title: "Take a Break",
    description:
      "B2B meditation-booking app with a booking dashboard, achievements, and news, built on a Turborepo monorepo.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Turborepo"],
    image: "/projects/takeabreak.png",
    note: "Unfortunately I don't have a photo of the app anymore, but look at that beautiful team!",
  },
  {
    title: "beKind Web App",
    description:
      "Company rebrand and web app on Next.js, backed by PostgreSQL and Prisma.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    image: "/projects/bekind.png",
  },
];

// The screenshot banner and its corner icon inside; if the project is live,
// the whole banner is the link (the icon is a decorative affordance, not a
// separate nested anchor).
function ProjectBanner({ proj }: { proj: Project }) {
  const visual = (
    <>
      {proj.image ? (
        <>
          <Image
            src={proj.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Slight top scrim so the link icon stays legible on any shot. */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-zinc-900" />
      )}
      {proj.vercel && (
        <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-300 backdrop-blur-sm transition-colors group-hover:text-white">
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  const bannerClass = "relative block aspect-[16/10] overflow-hidden bg-zinc-950";

  return proj.vercel ? (
    <ExternalLink
      href={proj.vercel}
      aria-label={`${proj.title} — live site`}
      className={bannerClass}
    >
      {visual}
    </ExternalLink>
  ) : (
    <div className={bannerClass}>{visual}</div>
  );
}

// 16:10 screenshot banner (the same ratio it's captured at), then title,
// description, and a quiet mono tech list. On hover the only motion is a
// gentle zoom of the screenshot — the card itself stays put.
function ProjectCard({ proj }: { proj: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-card">
      <ProjectBanner proj={proj} />

      <div className="flex flex-1 flex-col px-5 pt-4">
        <h3 className="text-base font-semibold text-zinc-100">{proj.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {proj.description}
        </p>
        {proj.note && (
          <p className="mt-2 text-xs italic leading-relaxed text-zinc-500">
            {proj.note}
          </p>
        )}
      </div>

      <p className="px-5 pb-5 pt-4 font-mono text-xs leading-relaxed text-zinc-500">
        {proj.tech.join(" · ")}
      </p>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading index="02" command="projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj) => (
          <ProjectCard key={proj.title} proj={proj} />
        ))}
      </div>
    </Section>
  );
}
