import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { localizedPath } from "@/lib/i18n";
import type { Experience, Locale, SiteContent } from "@/lib/content-schema";

function RoleHeader({ role }: { role: Experience }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-1">
        <Image
          src={role.logo}
          alt={role.logoAlt}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-zinc-100">{role.role}</h3>
        <p className="mt-0.5 text-sm text-zinc-400">{role.company}</p>
      </div>
    </div>
  );
}

function EngineeringRole({
  role,
  locale,
  caseStudyLabel,
  capabilitiesLabel,
}: {
  role: Experience;
  locale: Locale;
  caseStudyLabel: string;
  capabilitiesLabel: string;
}) {
  return (
    <article className="grid gap-5 border-t border-zinc-800 py-9 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="font-mono text-xs leading-6 text-zinc-500">
        <p>{role.period}</p>
        <p>{role.location}</p>
      </div>
      <div className="max-w-3xl">
        <RoleHeader role={role} />
        <p className="mt-5 text-base leading-7 text-zinc-300">{role.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {role.contributions.map((contribution) => (
            <li key={contribution} className="flex gap-3 text-sm leading-6 text-zinc-400">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-zinc-500" aria-label={capabilitiesLabel}>
          {role.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
        {role.caseStudySlug ? (
          <Link
            href={localizedPath(locale, `/work/${role.caseStudySlug}`)}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-emerald-500/60 underline-offset-4"
          >
            {caseStudyLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function EarlierRole({ role, capabilitiesLabel }: { role: Experience; capabilitiesLabel: string }) {
  return (
    <article className="grid gap-3 border-t border-zinc-800 py-6 sm:grid-cols-[180px_1fr] sm:gap-10">
      <div className="font-mono text-xs leading-6 text-zinc-500">
        <p>{role.period}</p>
        <p>{role.location}</p>
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="font-semibold text-zinc-200">{role.role}</h4>
          <p className="text-sm text-zinc-500">{role.company}</p>
        </div>
        <p className="mt-2 max-w-[68ch] text-sm leading-6 text-zinc-400">{role.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-zinc-600" aria-label={capabilitiesLabel}>
          {role.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function ExperienceSection({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const engineering = content.experience.filter((role) => role.phase === "engineering");
  const earlier = content.experience.filter((role) => role.phase === "earlier");

  return (
    <Section id="experience">
      <SectionHeading id="experience" {...content.sectionCopy.experience} />
      <div className="border-b border-zinc-800">
        {engineering.map((role) => (
          <EngineeringRole
            key={role.id}
            role={role}
            locale={locale}
            caseStudyLabel={content.common.links.caseStudy}
            capabilitiesLabel={content.common.capabilitiesLabel}
          />
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-400">
            {content.common.beforeEngineering}
          </p>
          <p className="mt-4 text-sm leading-6 text-zinc-400">{content.earlierCareerIntro}</p>
        </div>
        <div className="border-b border-zinc-800">
          {earlier.map((role) => <EarlierRole key={role.id} role={role} capabilitiesLabel={content.common.transferableCapabilities} />)}
        </div>
      </div>
    </Section>
  );
}
