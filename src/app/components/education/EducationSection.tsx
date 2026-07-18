import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ArrowLink } from "@/components/arrow-link";
import { CONTENT } from "@/lib/content";

export default function EducationSection() {
  return (
    <Section id="education" mesh="left">
      <SectionHeading index="04" command="education" title="Education" />

      <div className="border-t border-zinc-800">
        {CONTENT.education.map((a) => (
          <article
            key={a.name}
            className="grid gap-x-8 gap-y-4 border-b border-zinc-800 py-8 sm:grid-cols-[150px_1fr]"
          >
            <p className="font-mono text-xs leading-relaxed text-zinc-400">
              {a.period}
            </p>

            <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
              {a.photos[0] && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-zinc-800">
                  <Image
                    src={a.photos[0].src}
                    alt={a.photos[0].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="font-semibold text-zinc-100">
                  {a.url ? <ArrowLink href={a.url}>{a.name}</ArrowLink> : a.name}
                </h3>
                <p className="text-sm text-zinc-400">
                  {a.field}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {a.description}
                </p>
                <p className="mt-3 font-mono text-xs text-zinc-500">
                  {a.skills.join(" · ")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
