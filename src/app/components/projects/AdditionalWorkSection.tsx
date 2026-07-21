import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink } from "@/components/external-link";
import { getAdditionalWork } from "@/lib/content";
import type { Locale, SiteContent, Work } from "@/lib/content-schema";

function ProductRow({ item, content }: { item: Work; content: SiteContent }) {
  return (
    <article className="grid gap-5 border-t border-zinc-800 py-7 sm:grid-cols-[120px_1fr_auto] sm:items-start">
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
          <Image src={item.image.src} alt={item.image.alt} fill sizes="120px" className="object-cover object-top" />
        </div>
      ) : <div />}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-semibold text-zinc-100">{item.title}</h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-600">{item.contextLabel}</span>
        </div>
        <p className="mt-2 max-w-[66ch] text-sm leading-6 text-zinc-400">{item.summary}</p>
        <p className="mt-3 font-mono text-xs text-zinc-600">{item.role} · {item.technologies.join(" · ")}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 sm:flex-col sm:items-end">
        {item.externalUrl ? (
          <ExternalLink
            href={item.externalUrl}
            newTabLabel={content.common.links.opensNewTab}
            className="inline-flex min-h-11 items-center gap-1 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200"
          >
            {content.common.links.externalProduct} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        ) : null}
        {item.repositoryUrl ? (
          <ExternalLink
            href={item.repositoryUrl}
            newTabLabel={content.common.links.opensNewTab}
            className="inline-flex min-h-11 items-center gap-1 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200"
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
    <article className="border-t border-zinc-800 py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-zinc-200">{item.title}</h3>
          <p className="mt-1 font-mono text-xs text-zinc-600">{item.contextLabel} · {item.role}{item.year ? ` · ${item.year}` : ""}</p>
        </div>
        {link ? (
          <ExternalLink
            href={link}
            newTabLabel={content.common.links.opensNewTab}
            aria-label={`${item.title}: ${item.externalUrl ? content.common.links.externalProduct : content.common.links.repository}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ExternalLink>
        ) : null}
      </div>
      <p className="mt-3 max-w-[62ch] text-sm leading-6 text-zinc-500">{item.summary}</p>
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
        <div className="border-b border-zinc-800">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{content.common.productAndExperimental}</h3>
          {products.map((item) => <ProductRow key={item.id} item={item} content={content} />)}
        </div>
        <div className="border-b border-zinc-800">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{content.common.clientAndEarlier}</h3>
          {client.map((item) => <ClientItem key={item.id} item={item} content={content} />)}
        </div>
      </div>
    </Section>
  );
}
