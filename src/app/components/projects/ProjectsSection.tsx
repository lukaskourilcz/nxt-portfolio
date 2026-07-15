import Image from "next/image";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ExternalLink } from "@/components/external-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CONTENT, type Project } from "@/lib/content";

const PROJECTS: Project[] = CONTENT.projects;

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

  const bannerClass =
    "relative block aspect-[16/10] overflow-hidden bg-zinc-950";

  return proj.vercel ? (
    <ExternalLink
      href={proj.vercel}
      aria-label={`${proj.title} live site`}
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
    <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-card transition-colors duration-300 hover:border-zinc-700">
      <ProjectBanner proj={proj} />

      <div className="relative z-20 flex flex-1 flex-col px-5 pt-4">
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

      <p className="relative z-20 px-5 pb-5 pt-4 font-mono text-xs leading-relaxed text-zinc-500">
        {proj.tech.join(" · ")}
      </p>
    </SpotlightCard>
  );
}

export default function ProjectsSection() {
  return (
    <Section id="projects" mesh="left">
      <SectionHeading index="02" command="projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((proj) => (
          <ProjectCard key={proj.title} proj={proj} />
        ))}
      </div>
    </Section>
  );
}
