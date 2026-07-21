import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink } from "@/components/external-link";
import { getFeaturedWork } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import type { Locale, SiteContent, Work } from "@/lib/content-schema";

function WorkVisual({ item }: { item: Work }) {
  if (item.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 lg:aspect-auto lg:min-h-[300px]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 1023px) 100vw, 42vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div className="case-study-cover relative flex aspect-[16/10] items-end overflow-hidden border-b border-zinc-800 p-6 lg:aspect-auto lg:min-h-[300px] lg:border-b-0 lg:border-r">
      <div aria-hidden className="absolute inset-0 opacity-50">
        <div className="absolute left-[18%] top-[22%] h-px w-[64%] bg-emerald-400/30" />
        <div className="absolute bottom-[27%] left-[28%] h-[46%] w-px bg-emerald-400/20" />
        <div className="absolute right-[21%] top-[18%] h-20 w-20 rounded-full border border-emerald-400/25" />
      </div>
      <div className="relative">
        <LockKeyhole className="h-5 w-5 text-emerald-400" aria-hidden />
        <p className="mt-3 max-w-[24ch] font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">
          {item.contextLabel}
        </p>
      </div>
    </div>
  );
}

function SelectedWorkCard({
  item,
  locale,
  content,
}: {
  item: Work;
  locale: Locale;
  content: SiteContent;
}) {
  const href = localizedPath(locale, `/work/${item.slug}`);

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/55 lg:grid-cols-[0.82fr_1.18fr]">
      <WorkVisual item={item} />
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-500">
            <span>{item.contextLabel}</span>
            {item.confidentiality === "confidential" ? (
              <span className="rounded-full border border-zinc-700 px-2 py-1 text-zinc-400">
                {content.common.confidential}
              </span>
            ) : null}
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-zinc-100 sm:text-3xl">
            <Link href={href} className="focus-visible:outline-none">
              {item.title}
            </Link>
          </h3>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            {item.organization ? <div><dt className="sr-only">{content.common.organizationLabel}</dt><dd>{item.organization}</dd></div> : null}
            <div><dt className="sr-only">{content.common.roleLabel}</dt><dd>{item.role}</dd></div>
            {item.period ? <div><dt className="sr-only">{content.common.periodLabel}</dt><dd>{item.period}</dd></div> : null}
          </dl>
          <p className="mt-6 max-w-[62ch] text-base leading-7 text-zinc-400">
            {item.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={content.common.capabilitiesLabel}>
            {item.capabilities.map((capability) => (
              <li key={capability} className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href={href}
            data-analytics="case_study_navigation"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-zinc-100 underline decoration-emerald-500/70 underline-offset-4"
          >
            {content.common.links.caseStudy} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {item.externalUrl ? (
            <ExternalLink
              href={item.externalUrl}
              newTabLabel={content.common.links.opensNewTab}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200"
            >
              {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ExternalLink>
          ) : null}
          {item.repositoryUrl ? (
            <ExternalLink
              href={item.repositoryUrl}
              newTabLabel={content.common.links.opensNewTab}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200"
            >
              {content.common.links.repository} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection({ locale, content }: { locale: Locale; content: SiteContent }) {
  const work = getFeaturedWork(locale);

  return (
    <Section id="work">
      <SectionHeading id="work" {...content.sectionCopy.work} />
      <div className="space-y-6">
        {work.map((item) => (
          <SelectedWorkCard key={item.id} item={item} locale={locale} content={content} />
        ))}
      </div>
    </Section>
  );
}
