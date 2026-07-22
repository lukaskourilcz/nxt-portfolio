import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { SiteContent } from "@/lib/content-schema";

export default function StackSection({ content }: { content: SiteContent }) {
  return (
    <Section id="capabilities">
      <SectionHeading id="capabilities" {...content.sectionCopy.capabilities} />
      <div className="grid border-y border-edge md:grid-cols-2">
        {content.capabilities.groups.map((group, index) => (
          <article
            key={group.id}
            className={`py-8 md:px-8 ${
              index % 2 === 0 ? "md:border-r md:border-edge md:pl-0" : "md:pr-0"
            } ${index > 1 ? "border-t border-edge" : index === 1 ? "border-t border-edge md:border-t-0" : ""}`}
          >
            <h3 className="text-lg font-semibold text-primary">{group.title}</h3>
            <ul className="mt-4 grid gap-2 text-sm text-secondary sm:grid-cols-2">
              {group.items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden className="font-mono text-[10px] text-accent">+</span>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {content.common.alsoWorkedWith}
        </p>
        <p className="font-mono text-xs leading-6 text-muted">
          {content.capabilities.additionalTools.join(" · ")}
        </p>
      </div>
    </Section>
  );
}
