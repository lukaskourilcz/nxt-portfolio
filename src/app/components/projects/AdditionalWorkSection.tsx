import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink } from "@/components/external-link";
import { getAdditionalWork } from "@/lib/content";
import type { Locale, SiteContent, Work } from "@/lib/content-schema";

function ProductRow({ item, content, index }: { item: Work; content: SiteContent; index: number }) {
  return (
    <article className="grid gap-5 border-t border-edge py-7 sm:grid-cols-[2rem_7.5rem_1fr_auto] sm:items-start">
      <span aria-hidden className="font-mono text-[10px] text-muted">{String(index + 1).padStart(2, "0")}</span>
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-edge bg-surface">
          <Image src={item.image.src} alt={item.image.alt} fill sizes="120px" className="object-cover object-top" />
        </div>
      ) : <div className="hidden sm:block" />}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-semibold text-primary">{item.title}</h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{item.contextLabel}</span>
        </div>
        <p className="mt-2 max-w-[66ch] text-sm leading-6 text-secondary">{item.summary}</p>
        <p className="mt-3 font-mono text-xs text-muted">{item.role} · {item.technologies.join(" · ")}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 sm:flex-col sm:items-end">
        {item.externalUrl ? (
          <ExternalLink
            href={item.externalUrl}
            newTabLabel={content.common.links.opensNewTab}
            aria-label={`${item.title}: ${content.common.links.externalProduct}`}
            className="editorial-link inline-flex min-h-11 items-center gap-1 text-sm"
          >
            {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        ) : null}
        {item.repositoryUrl ? (
          <ExternalLink
            href={item.repositoryUrl}
            newTabLabel={content.common.links.opensNewTab}
            aria-label={`${item.title}: ${content.common.links.repository}`}
            className="editorial-link inline-flex min-h-11 items-center gap-1 text-sm"
          >
            {content.common.links.repository} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}

function ClientItem({ item, content }: { item: Work; content: SiteContent }) {
  const link = item.externalUrl ?? item.repositoryUrl;

  return (
    <article className="border-t border-edge py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-secondary">{item.title}</h3>
          <p className="mt-1 font-mono text-xs text-muted">{item.contextLabel} · {item.role}{item.year ? ` · ${item.year}` : ""}</p>
        </div>
        {link ? (
          <ExternalLink
            href={link}
            newTabLabel={content.common.links.opensNewTab}
            aria-label={`${item.title}: ${item.externalUrl ? content.common.links.externalProduct : content.common.links.repository}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted hover:bg-interactive hover:text-primary"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        ) : null}
      </div>
      <p className="mt-3 max-w-[62ch] text-sm leading-6 text-muted">{item.summary}</p>
    </article>
  );
}

export default function AdditionalWorkSection({ locale, content }: { locale: Locale; content: SiteContent }) {
  const items = getAdditionalWork(locale);
  const products = items.filter((item) => item.group === "product" || item.group === "experiment");
  const client = items.filter((item) => item.group === "client");

  return (
    <Section id="additional-work">
      <SectionHeading id="additional-work" {...content.sectionCopy.additionalWork} />
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b border-edge">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">{content.common.productAndExperimental}</h3>
          {products.map((item, index) => <ProductRow key={item.id} item={item} content={content} index={index} />)}
        </div>
        <div className="border-b border-edge">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">{content.common.clientAndEarlier}</h3>
          {client.map((item) => <ClientItem key={item.id} item={item} content={content} />)}
        </div>
      </div>
    </Section>
  );
}
