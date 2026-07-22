import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { FragmentFocus } from "@/components/fragment-focus";
import { ProjectVisual } from "@/components/project-visual";
import { getCaseStudy, getCaseStudySlugs, getContent, isLocale, LOCALES } from "@/lib/content";
import { caseStudyMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/i18n";
import type { SiteContent, Work } from "@/lib/content-schema";

type Params = Promise<{ locale: string; slug: string }>;
type Detail = NonNullable<Work["detail"]>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getCaseStudySlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const work = getCaseStudy(locale, slug);
  return work ? caseStudyMetadata(locale, content, work) : {};
}

function ProseSection({
  id,
  title,
  paragraphs,
  list = false,
}: {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: boolean;
}) {
  if (!paragraphs?.length) return null;
  return (
    <section id={id} className="scroll-mt-28 border-t border-edge py-10 md:grid md:grid-cols-[10rem_1fr] md:gap-8">
      <h2 data-fragment-heading tabIndex={-1} className="font-mono text-xs uppercase tracking-[0.12em] text-muted outline-none">{title}</h2>
      {list ? (
        <ul className="mt-5 max-w-[68ch] space-y-3 text-base leading-7 text-secondary md:mt-0">
          {paragraphs.map((paragraph) => (
            <li key={paragraph} className="grid grid-cols-[1rem_1fr] gap-3">
              <span aria-hidden className="pt-0.5 font-mono text-xs text-accent">+</span>
              <span>{paragraph}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 max-w-[68ch] space-y-5 text-base leading-7 text-secondary md:mt-0">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
    </section>
  );
}

function DecisionRecords({ content, decisions }: { content: SiteContent; decisions?: Detail["decisions"] }) {
  if (!decisions?.length) return null;
  return (
    <section id="decisions" className="scroll-mt-28 border-t border-edge py-10" aria-labelledby="decisions-heading">
      <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-8">
        <h2 id="decisions-heading" data-fragment-heading tabIndex={-1} className="font-mono text-xs uppercase tracking-[0.12em] text-muted outline-none">
          {content.caseStudyLabels.decisions}
        </h2>
        <div>
          {decisions.map((record, index) => (
            <article key={record.title} className="grid gap-5 border-t border-edge py-7 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_1fr]">
              <span aria-hidden className="font-mono text-[10px] text-accent">ADR-{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-primary">{record.title}</h3>
                <dl className="mt-5 grid gap-5">
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{content.caseStudyLabels.context}</dt>
                    <dd className="text-sm leading-6 text-muted">{record.context}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">{content.caseStudyLabels.decision}</dt>
                    <dd className="text-sm leading-6 text-secondary">{record.decision}</dd>
                  </div>
                  {record.tradeoff ? (
                    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-warning">{content.caseStudyLabels.tradeoff}</dt>
                      <dd className="text-sm leading-6 text-muted">{record.tradeoff}</dd>
                    </div>
                  ) : null}
                  {record.outcome ? (
                    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-success">{content.caseStudyLabels.outcome}</dt>
                      <dd className="text-sm leading-6 text-secondary">{record.outcome}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const work = getCaseStudy(locale, slug);
  if (!work?.detail) notFound();
  const detail = work.detail;
  const related = content.work.filter((item) => item.featured && item.id !== work.id).slice(0, 2);
  const testimonials = content.testimonials.filter((testimonial) => testimonial.workId === work.id);
  const contents = [
    ["problem", content.caseStudyLabels.problem, detail.problem],
    ["constraints", content.caseStudyLabels.constraints, detail.constraints],
    ["responsibility", content.caseStudyLabels.responsibility, detail.responsibilities],
    ["approach", content.caseStudyLabels.approach, detail.approach],
    ["decisions", content.caseStudyLabels.decisions, detail.decisions],
    ["outcomes", content.caseStudyLabels.outcomes, detail.outcomes],
    ["reflection", content.caseStudyLabels.reflection, detail.reflection],
  ].filter((entry) => entry[2]?.length) as Array<[string, string, unknown[]]>;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <FragmentFocus />
      <article className="page-shell pb-20 pt-28 sm:pb-28 sm:pt-36">
        <nav aria-label={content.common.breadcrumb}>
          <Link href={`${localizedPath(locale)}#work`} className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {content.common.links.backToWork}
          </Link>
        </nav>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_16rem] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">
              <span>{work.contextLabel}</span>
              {work.confidentiality === "confidential" ? (
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-confidential/45 px-2.5 py-1 text-confidential">
                  <LockKeyhole className="h-3 w-3" aria-hidden /> {content.common.confidential}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-[clamp(2.6rem,8vw,5.8rem)] font-semibold leading-[1] tracking-[-0.055em] text-primary">{work.title}</h1>
            <p className="mt-7 max-w-[70ch] text-lg leading-8 text-secondary sm:text-xl sm:leading-9">{work.summary}</p>
          </div>
          <p className="border-l border-accent/45 pl-4 font-mono text-[11px] uppercase leading-6 tracking-[0.1em] text-muted">
            {work.role}<br />{work.organization}<br />{work.period}
          </p>
        </header>

        <dl className="mt-12 grid border-y border-edge sm:grid-cols-2 lg:grid-cols-4">
          {detail.overview.map((item) => (
            <div key={item.label} className="border-b border-edge py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{item.label}</dt>
              <dd className="mt-2 text-sm text-secondary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <figure className="mt-10 border border-edge bg-canvas">
          <ProjectVisual item={work} />
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-edge px-4 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            <span>{content.caseStudyLabels.visualEvidence}</span>
            <span>{work.id === "devshark" ? content.caseStudyLabels.authenticVisual : content.caseStudyLabels.abstractVisual}</span>
          </figcaption>
        </figure>

        {detail.confidentialityNote ? (
          <aside className="my-10 grid max-w-4xl gap-3 border-l border-confidential/60 bg-subtle py-4 pl-5 pr-4 sm:grid-cols-[8rem_1fr]" aria-label={content.common.confidential}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-confidential">{content.common.confidential}</p>
            <p className="text-sm leading-7 text-secondary">{detail.confidentialityNote}</p>
          </aside>
        ) : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-[11rem_1fr] lg:gap-12">
          <nav aria-label={content.caseStudyLabels.contents} className="self-start border-y border-edge py-4 lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{content.caseStudyLabels.contents}</p>
            <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1 lg:block lg:space-y-1">
              {contents.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`} className="editorial-link inline-flex min-h-11 items-center text-xs">
                    <span aria-hidden className="mr-2 font-mono text-[9px] text-muted">{String(index + 1).padStart(2, "0")}</span>{label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <ProseSection id="problem" title={content.caseStudyLabels.problem} paragraphs={detail.problem} />
            <ProseSection id="constraints" title={content.caseStudyLabels.constraints} paragraphs={detail.constraints} list />
            <ProseSection id="responsibility" title={content.caseStudyLabels.responsibility} paragraphs={detail.responsibilities} list />
            <ProseSection id="approach" title={content.caseStudyLabels.approach} paragraphs={detail.approach} />
            <DecisionRecords content={content} decisions={detail.decisions} />
            <ProseSection id="outcomes" title={content.caseStudyLabels.outcomes} paragraphs={detail.outcomes} list />
            <ProseSection id="reflection" title={content.caseStudyLabels.reflection} paragraphs={detail.reflection} />

            <section className="border-t border-edge py-10 md:grid md:grid-cols-[10rem_1fr] md:gap-8" aria-labelledby="technology-heading">
              <h2 id="technology-heading" className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{content.caseStudyLabels.technology}</h2>
              <p className="mt-5 font-mono text-sm leading-7 text-secondary md:mt-0">{work.technologies.join(" · ")}</p>
            </section>

            {testimonials.length ? (
              <section className="border-t border-edge py-10" aria-labelledby="testimonial-heading">
                <h2 id="testimonial-heading" className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{content.caseStudyLabels.testimonial}</h2>
                <div className="mt-7 space-y-8">
                  {testimonials.map((testimonial) => (
                    <figure key={testimonial.id} className="max-w-[68ch] border-l border-accent/50 pl-5">
                      <blockquote className="text-lg leading-8 text-secondary">{testimonial.quote}</blockquote>
                      <figcaption className="mt-4 text-sm text-muted">
                        {testimonial.sourceUrl ? (
                          <ExternalLink href={testimonial.sourceUrl} newTabLabel={content.common.links.opensNewTab} className="editorial-link font-medium text-secondary">
                            {testimonial.name}
                          </ExternalLink>
                        ) : <span className="font-medium text-secondary">{testimonial.name}</span>}
                        {` · ${testimonial.role}, ${testimonial.company}`}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        {work.externalUrl || work.repositoryUrl ? (
          <div className="mt-3 flex flex-wrap gap-5 border-t border-edge pt-8">
            {work.externalUrl ? (
              <ExternalLink href={work.externalUrl} newTabLabel={content.common.links.opensNewTab} className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm font-medium decoration-accent/60">
                {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
            ) : null}
            {work.repositoryUrl ? (
              <ExternalLink href={work.repositoryUrl} newTabLabel={content.common.links.opensNewTab} className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm font-medium decoration-accent/60">
                {content.common.links.repository} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
            ) : null}
          </div>
        ) : null}

        <section className="mt-20 border-t border-edge pt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-semibold text-primary">{content.caseStudyLabels.related}</h2>
          <div className="mt-6 border-b border-edge">
            {related.map((item) => (
              <Link key={item.id} href={localizedPath(locale, `/work/${item.slug}`)} className="group grid min-h-20 gap-2 border-t border-edge py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{item.contextLabel}</span>
                  <span className="mt-1 block font-semibold text-secondary group-hover:text-primary">{item.title}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted group-hover:text-secondary">{content.common.links.caseStudy} <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border border-edge bg-subtle p-6 sm:p-8" aria-labelledby="case-contact-heading">
          <h2 id="case-contact-heading" className="text-xl font-semibold text-primary">{content.caseStudyLabels.contactHeading}</h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-6 text-secondary">{content.caseStudyLabels.contactBody}</p>
          <Button asChild className="mt-6"><Link href={`${localizedPath(locale)}#contact`}>{content.common.links.contact}</Link></Button>
        </section>
      </article>
    </main>
  );
}
