import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { SiteContent } from "@/lib/content-schema";

export default function ApproachSection({ content }: { content: SiteContent }) {
  return (
    <Section id="approach">
      <SectionHeading id="approach" {...content.sectionCopy.approach} />
      <ol className="grid border-y border-edge md:grid-cols-2">
        {content.approach.map((principle, index) => (
          <li
            key={principle.id}
            className={`py-8 md:px-8 ${
              index % 2 === 0 ? "md:border-r md:border-edge md:pl-0" : "md:pr-0"
            } ${index > 1 ? "border-t border-edge" : index === 1 ? "border-t border-edge md:border-t-0" : ""}`}
          >
            <p className="font-mono text-xs text-accent">principle / 0{index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold text-primary">{principle.title}</h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-7 text-secondary">{principle.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
