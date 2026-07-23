import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink } from "@/components/external-link";
import { ProjectVisual } from "@/components/project-visual";
import { getFeaturedWork } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, SiteContent, Work } from "@/lib/content-schema";

function SelectedWorkCard({
  item,
  locale,
  content,
  index,
}: {
  item: Work;
  locale: Locale;
  content: SiteContent;
  index: number;
}) {
  const href = localizedPath(locale, `/work/${item.slug}`);
  const visualOnRight = item.id === "ersilia-ai-tooling";

  return (
    <article
      className={cn(
        "group relative grid overflow-hidden border border-edge bg-canvas/60 transition-colors duration-[var(--motion-standard)] ease-[var(--ease-out)] hover:border-edge-strong",
        visualOnRight ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]",
      )}
    >
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] tracking-[0.14em] text-muted" aria-hidden>
        0{index + 1} / 03
      </span>
      <ProjectVisual item={item} className={visualOnRight ? "border-b lg:order-2 lg:border-b-0 lg:border-l" : "border-b lg:border-b-0 lg:border-r"} />
      <div className={cn("flex flex-col justify-between p-6 sm:p-8 lg:p-10", visualOnRight && "lg:order-1")}>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            <span>{item.contextLabel}</span>
            {item.confidentiality === "confidential" ? (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-confidential/45 px-2 py-1 text-confidential">
                <LockKeyhole className="h-3 w-3" aria-hidden /> {content.common.confidential}
              </span>
            ) : null}
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-primary sm:text-3xl">
            <Link href={href}>
              {item.title}
            </Link>
          </h3>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {item.organization ? <div><dt className="sr-only">{content.common.organizationLabel}</dt><dd>{item.organization}</dd></div> : null}
            <div><dt className="sr-only">{content.common.roleLabel}</dt><dd>{item.role}</dd></div>
            {item.period ? <div><dt className="sr-only">{content.common.periodLabel}</dt><dd>{item.period}</dd></div> : null}
          </dl>
          <p className="mt-6 max-w-[62ch] text-base leading-7 text-secondary">
            {item.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted" aria-label={content.common.capabilitiesLabel}>
            {item.capabilities.map((capability) => (
              <li key={capability} className="after:ml-3 after:text-edge-strong after:content-['/'] last:after:hidden">
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href={href}
            data-analytics="case_study_navigation"
            aria-label={`${content.common.links.caseStudy}: ${item.title}`}
            className="editorial-link inline-flex min-h-11 items-center gap-2 font-medium text-primary decoration-accent/70"
          >
            {content.common.links.caseStudy} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {item.externalUrl ? (
            <ExternalLink
              href={item.externalUrl}
              newTabLabel={content.common.links.opensNewTab}
              aria-label={`${item.title}: ${content.common.links.externalProduct}`}
              className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm"
            >
              {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ExternalLink>
          ) : null}
          {item.repositoryUrl ? (
            <ExternalLink
              href={item.repositoryUrl}
              newTabLabel={content.common.links.opensNewTab}
              aria-label={`${item.title}: ${content.common.links.repository}`}
              className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm"
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
      <div className="space-y-8">
        {work.map((item, index) => (
          <SelectedWorkCard key={item.id} item={item} locale={locale} content={content} index={index} />
        ))}
      </div>
    </Section>
  );
}
