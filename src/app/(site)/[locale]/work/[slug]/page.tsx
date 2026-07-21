import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { getCaseStudy, getCaseStudySlugs, getContent, isLocale, LOCALES } from "@/lib/content";
import { caseStudyMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/i18n";

type Params = Promise<{ locale: string; slug: string }>;

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

function ProseSection({ title, paragraphs }: { title: string; paragraphs?: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="grid gap-4 border-t border-zinc-800 py-10 md:grid-cols-[220px_1fr] md:gap-12">
      <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      <div className="max-w-[68ch] space-y-4 text-base leading-7 text-zinc-400">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
        <nav aria-label={content.common.breadcrumb}>
          <Link href={`${localizedPath(locale)}#work`} className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {content.common.links.backToWork}
          </Link>
        </nav>

        <header className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">
            <span>{work.contextLabel}</span>
            {work.confidentiality === "confidential" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-400">
                <LockKeyhole className="h-3 w-3" aria-hidden /> {content.common.confidential}
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 text-[clamp(2.6rem,8vw,5.8rem)] font-semibold leading-[1] tracking-[-0.055em] text-zinc-100">{work.title}</h1>
          <p className="mt-7 max-w-[70ch] text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">{work.summary}</p>
        </header>

        <dl className="mt-12 grid border-y border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          {detail.overview.map((item) => (
            <div key={item.label} className="border-b border-zinc-800 py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-600">{item.label}</dt>
              <dd className="mt-2 text-sm text-zinc-300">{item.value}</dd>
            </div>
          ))}
        </dl>

        {detail.confidentialityNote ? (
          <p className="my-10 max-w-[68ch] border-l border-emerald-500/50 pl-5 text-sm leading-7 text-zinc-400">{detail.confidentialityNote}</p>
        ) : null}

        <div className="mt-8">
          <ProseSection title={content.caseStudyLabels.problem} paragraphs={detail.problem} />
          <ProseSection title={content.caseStudyLabels.constraints} paragraphs={detail.constraints} />
          <ProseSection title={content.caseStudyLabels.responsibility} paragraphs={detail.responsibilities} />
          <ProseSection title={content.caseStudyLabels.approach} paragraphs={detail.approach} />

          {detail.decisions?.length ? (
            <section className="border-t border-zinc-800 py-10">
              <h2 className="text-sm font-semibold text-zinc-200">{content.caseStudyLabels.decisions}</h2>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                {detail.decisions.map((decision) => (
                  <article key={decision.title} className="border-l border-zinc-700 pl-5">
                    <h3 className="text-lg font-semibold text-zinc-100">{decision.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-500">{decision.context}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{decision.decision}</p>
                    {decision.tradeoff ? <p className="mt-3 text-sm leading-6 text-zinc-500">{decision.tradeoff}</p> : null}
                    {decision.outcome ? <p className="mt-3 text-sm leading-6 text-zinc-400">{decision.outcome}</p> : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <ProseSection title={content.caseStudyLabels.outcomes} paragraphs={detail.outcomes} />
          <ProseSection title={content.caseStudyLabels.reflection} paragraphs={detail.reflection} />

          {testimonials.length ? (
            <section className="border-t border-zinc-800 py-10" aria-labelledby="testimonial-heading">
              <h2 id="testimonial-heading" className="text-sm font-semibold text-zinc-200">{content.caseStudyLabels.testimonial}</h2>
              <div className="mt-7 space-y-8">
                {testimonials.map((testimonial) => (
                  <figure key={testimonial.id} className="max-w-[68ch] border-l border-emerald-500/50 pl-5">
                    <blockquote className="text-lg leading-8 text-zinc-300">{testimonial.quote}</blockquote>
                    <figcaption className="mt-4 text-sm text-zinc-500">
                      {testimonial.sourceUrl ? (
                        <ExternalLink href={testimonial.sourceUrl} newTabLabel={content.common.links.opensNewTab} className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-100">
                          {testimonial.name}
                        </ExternalLink>
                      ) : <span className="font-medium text-zinc-300">{testimonial.name}</span>}
                      {` · ${testimonial.role}, ${testimonial.company}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {work.externalUrl || work.repositoryUrl ? (
          <div className="mt-3 flex flex-wrap gap-5">
            {work.externalUrl ? (
              <ExternalLink href={work.externalUrl} newTabLabel={content.common.links.opensNewTab} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-emerald-500/60 underline-offset-4">
                {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
            ) : null}
            {work.repositoryUrl ? (
              <ExternalLink href={work.repositoryUrl} newTabLabel={content.common.links.opensNewTab} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-emerald-500/60 underline-offset-4">
                {content.common.links.repository} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
            ) : null}
          </div>
        ) : null}

        <section className="mt-20 border-t border-zinc-800 pt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-semibold text-zinc-100">{content.caseStudyLabels.related}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.id} href={localizedPath(locale, `/work/${item.slug}`)} className="group rounded-lg border border-zinc-800 p-5 hover:border-zinc-700">
                <p className="font-mono text-xs text-zinc-600">{item.contextLabel}</p>
                <h3 className="mt-2 font-semibold text-zinc-200">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-300">{content.common.links.caseStudy} <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8" aria-labelledby="case-contact-heading">
          <h2 id="case-contact-heading" className="text-xl font-semibold text-zinc-100">{content.caseStudyLabels.contactHeading}</h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-6 text-zinc-400">{content.caseStudyLabels.contactBody}</p>
          <Button asChild className="mt-6"><Link href={`${localizedPath(locale)}#contact`}>{content.common.links.contact}</Link></Button>
        </section>
      </article>
    </main>
  );
}
