import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/external-link";
import { Tag } from "@/components/tag";
import { staggerDelay } from "@/lib/anim";

// Screenshots are captured separately and dropped into /public/projects/ as
// <slug>.png. Until those files exist, keep this false so cards render flat
// (no broken images, identical to the current look). Once the PNGs are in
// place, flip to true to switch each card to its live-screenshot background.
const SCREENSHOTS_READY: boolean = true;

type Project = {
  title: string;
  description: string;
  tech: string[];
  // Live screenshot used as the card background once SCREENSHOTS_READY is on
  // (see ProjectCard). Stored at /public/projects/<slug>.png. Omit to keep a
  // card image-less — used when a site has no live URL or can't be captured.
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
      "Developer-knowledge quiz and learning app with topic paths, daily challenges, real-time multiplayer, and leaderboards, built on React, serverless functions, and Supabase.",
    tech: ["React", "TypeScript", "Supabase", "Realtime", "Vercel"],
    vercel: "https://react-express-app-five.vercel.app",
    image: "/projects/devshark.png",
  },
  {
    title: "Personal Dashboard",
    description:
      "Personal life dashboard for subscriptions, todos, streaks, finances, Czech invoices, books, and a calendar, with natural-language quick-add powered by Claude.",
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
      "Real-time, browser-based Czech-themed Monopoly where 2–4 players buy Czech cities via a room code, with a trivia twist and full CS/EN localization.",
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
      "Marketing site for a Czech bus and freight company, covering its fleet, passenger, and cargo services, with a focus on SEO and i18n.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "i18n"],
    vercel: "https://autobusyhodonin.cz",
    image: "/projects/autobusy-hodonin.png",
  },
  {
    title: "Umyjeme fasádu",
    description:
      "Marketing site for a Czech exterior-cleaning service — hot-water pressure washing of facades, roofs, and paving, with before/after sliders, a service breakdown, and a quote request form.",
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
      "Company rebrand and web app, focused on performance, backed by PostgreSQL and Prisma.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    image: "/projects/bekind.png",
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
      className="inline-flex items-center justify-center rounded-md border border-white/10 bg-zinc-950/60 p-1.5 text-zinc-200 backdrop-blur-sm transition-colors hover:text-emerald-300"
    >
      {children}
    </ExternalLink>
  );
}

// The live screenshot sits in a fixed 16:10 banner at the top of the card —
// the same ratio it's captured at, so object-cover shows the whole shot with no
// cropping. Title and description follow, and the tech tags get their own dark
// footer container, which is what makes the card taller (the screenshot's ratio
// is untouched). The only link is the external-link icon (top right of the
// banner); the title isn't a link. On hover the only motion is a gentle zoom of
// the screenshot — the card itself stays put (no lift, border, or shadow shift).
function ProjectCard({ proj, delay }: { proj: Project; delay: number }) {
  const showImage = SCREENSHOTS_READY && proj.image;
  return (
    // Reveal (the motion element) owns the scroll-entrance animation — opacity
    // and transform. The card has no hover animation of its own; only the inner
    // screenshot zooms via group-hover, so there's no CSS transition on the card
    // to fight Framer Motion's inline transform writes (which previously flashed
    // the cards on scroll, notably on mobile Safari's compositor).
    <Reveal as="article" delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          {showImage ? (
            <>
              <Image
                src={proj.image as string}
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
            <div className="absolute right-3 top-3">
              <IconLink href={proj.vercel} label={`${proj.title} live site`}>
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </IconLink>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-5 pt-4">
          <h3 className="text-base font-semibold text-zinc-100">
            {proj.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {proj.description}
          </p>
          {proj.note && (
            <p className="mt-2 text-xs italic leading-relaxed text-zinc-500">
              {proj.note}
            </p>
          )}
        </div>

        {/* Tags in their own dark container — adds card height without touching
            the screenshot's aspect ratio. */}
        <div className="mt-4 border-t border-zinc-800 bg-zinc-950 px-5 py-4">
          <div className="flex flex-wrap gap-1.5">
            {proj.tech.map((tech) => (
              <Tag key={tech} variant="accent">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
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
