"use client";

import Image from "next/image";
import { ExternalLink as ExternalLinkIcon, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ExternalLink } from "@/components/external-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useI18n } from "@/components/language-provider";
import { type Project } from "@/lib/content";
import type { UIStrings } from "@/lib/i18n";

// The screenshot banner and its corner icon inside; if the project is live,
// the whole banner is the link (the icon is a decorative affordance, not a
// separate nested anchor). `featured` switches the banner to a full-height
// left panel with a left-to-right scrim instead of the 16:10 top banner.
function ProjectBanner({
  proj,
  featured,
}: {
  proj: Project;
  featured: boolean;
}) {
  const visual = (
    <>
      {proj.image ? (
        <>
          <Image
            src={proj.image}
            alt=""
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Featured gets a left-to-right scrim so the text side stays legible;
              regular cards keep a slight top scrim for the link icon. */}
          <div
            className={
              featured
                ? "absolute inset-0 bg-gradient-to-r from-transparent from-[55%] to-zinc-900/55"
                : "absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent"
            }
          />
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

  const bannerClass = featured
    ? "relative block min-h-[220px] w-full shrink-0 overflow-hidden bg-zinc-950 lg:min-h-[300px] lg:w-[52%]"
    : "relative block aspect-[16/10] overflow-hidden bg-zinc-950";

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

// The tech line plus a right-aligned live-site link (or a muted "not public"
// when there's no deploy). Shared by both card layouts.
function ProjectFooter({
  proj,
  featured,
  t,
}: {
  proj: Project;
  featured: boolean;
  t: UIStrings;
}) {
  return (
    <div
      className={`relative z-20 flex items-center justify-between gap-4 ${
        featured ? "px-7 pb-7 pt-5" : "px-5 pb-5 pt-4"
      }`}
    >
      <p className="min-w-0 truncate font-mono text-xs leading-relaxed text-zinc-500">
        {proj.tech.join(" · ")}
      </p>
      {proj.vercel ? (
        <ExternalLink
          href={proj.vercel}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-emerald-400 transition-colors hover:text-emerald-300"
        >
          {t.projects.visitSite} <ArrowUpRight className="h-3 w-3" />
        </ExternalLink>
      ) : (
        <span className="shrink-0 font-mono text-xs text-zinc-600">
          {t.projects.notPublic}
        </span>
      )}
    </div>
  );
}

// A single project card. Featured cards span the full grid width and lay out
// horizontally (image left, text right); regular cards stack vertically. On
// hover the SpotlightCard sweeps a random-colour glow, the border lightens,
// and the screenshot zooms — same behaviour for both layouts.
function ProjectCard({
  proj,
  featured,
  t,
}: {
  proj: Project;
  featured: boolean;
  t: UIStrings;
}) {
  return (
    <SpotlightCard
      className={`group relative flex overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-card transition-colors duration-300 hover:border-zinc-700 ${
        featured ? "flex-col lg:flex-row" : "h-full flex-col"
      } ${featured ? "col-span-full lg:col-span-6" : "lg:col-span-2"}`}
    >
      <ProjectBanner proj={proj} featured={featured} />

      <div className="relative z-20 flex min-w-0 flex-1 flex-col">
        <div
          className={`flex flex-1 flex-col ${
            featured ? "px-7 pt-7" : "px-5 pt-4"
          }`}
        >
          {featured && (
            <span className="mb-3.5 self-start rounded-full border border-emerald-400/40 px-2.5 py-[3px] font-mono text-[11px] uppercase tracking-[0.08em] text-emerald-300">
              {t.projects.featured}
            </span>
          )}
          <h3
            className={`font-semibold text-zinc-100 ${
              featured ? "text-2xl tracking-tight" : "text-base"
            }`}
          >
            {proj.title}
          </h3>
          <p
            className={`mt-2.5 leading-relaxed text-zinc-400 ${
              featured ? "max-w-[48ch] text-[15px]" : "text-sm"
            }`}
          >
            {proj.description}
          </p>
          {proj.note && (
            <p className="mt-2 text-xs italic leading-relaxed text-zinc-500">
              {proj.note}
            </p>
          )}
        </div>

        <ProjectFooter proj={proj} featured={featured} t={t} />
      </div>
    </SpotlightCard>
  );
}

export default function ProjectsSection({
  // How many leading projects render as full-width featured cards (0–3).
  featuredCount = 1,
}: {
  featuredCount?: number;
} = {}) {
  const { content, t } = useI18n();
  const featured = Math.max(0, Math.min(3, featuredCount));

  return (
    <Section id="projects" mesh="left">
      <SectionHeading
        index="02"
        command={t.sections.projects.command}
        title={t.sections.projects.title}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {content.projects.map((proj, i) => (
          <ProjectCard
            key={proj.title}
            proj={proj}
            featured={i < featured}
            t={t}
          />
        ))}
      </div>
    </Section>
  );
}
