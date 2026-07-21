import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { SiteContent } from "@/lib/content-schema";

export default function StackSection({ content }: { content: SiteContent }) {
  return (
    <Section id="capabilities">
      <SectionHeading id="capabilities" {...content.sectionCopy.capabilities} />
      <div className="grid border-y border-zinc-800 md:grid-cols-2">
        {content.capabilities.groups.map((group, index) => (
          <article
            key={group.id}
            className={`py-8 md:px-8 ${
              index % 2 === 0 ? "md:border-r md:border-zinc-800 md:pl-0" : "md:pr-0"
            } ${index > 1 ? "border-t border-zinc-800" : index === 1 ? "border-t border-zinc-800 md:border-t-0" : ""}`}
          >
            <h3 className="text-lg font-semibold text-zinc-100">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-zinc-600">
          {content.common.alsoWorkedWith}
        </p>
        <p className="font-mono text-xs leading-6 text-zinc-500">
          {content.capabilities.additionalTools.join(" · ")}
        </p>
      </div>
    </Section>
  );
}
