import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { SiteContent } from "@/lib/content-schema";

export default function EducationSection({ content }: { content: SiteContent }) {
  return (
    <Section id="education">
      <SectionHeading id="education" {...content.sectionCopy.education} />
      <div className="border-b border-zinc-800">
        {content.education.map((entry) => (
          <article key={entry.id} className="grid gap-6 border-t border-zinc-800 py-8 md:grid-cols-[180px_220px_1fr] md:gap-8">
            <p className="font-mono text-xs leading-6 text-zinc-500">{entry.period}</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 220px"
                className="object-cover"
              />
            </div>
            <div>
              <ExternalLink
                href={entry.url}
                newTabLabel={content.common.links.opensNewTab}
                className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-zinc-100 underline decoration-zinc-700 underline-offset-4 hover:decoration-emerald-500"
              >
                {entry.name} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ExternalLink>
              <p className="text-sm text-zinc-500">{entry.field}</p>
              <p className="mt-4 max-w-[60ch] text-sm leading-6 text-zinc-400">{entry.description}</p>
              <p className="mt-4 font-mono text-xs leading-6 text-zinc-600">{entry.skills.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
