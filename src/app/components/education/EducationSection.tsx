import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ArrowLink } from "@/components/arrow-link";
import { CONTENT } from "@/lib/content";

export default function EducationSection() {
  return (
    <Section id="education" mesh="left">
      <SectionHeading index="04" command="education" title="Education" />

      <div className="border-t border-zinc-800 light:border-zinc-200">
        {CONTENT.education.map((a) => (
          <article
            key={a.name}
            className="grid gap-x-8 gap-y-4 border-b border-zinc-800 py-8 light:border-zinc-200 sm:grid-cols-[150px_1fr]"
          >
            <p className="font-mono text-xs leading-relaxed text-zinc-400 light:text-zinc-600">
              {a.period}
            </p>

            <div>
              <h3 className="font-semibold text-zinc-100 light:text-zinc-900">
                {a.url ? <ArrowLink href={a.url}>{a.name}</ArrowLink> : a.name}
              </h3>
              <p className="text-sm text-zinc-400 light:text-zinc-600">
                {a.field}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                {a.description}
              </p>
              <p className="mt-3 font-mono text-xs text-zinc-500">
                {a.skills.join(" · ")}
              </p>

              <div className="mt-5 grid max-w-[510px] grid-cols-3 gap-2">
                {a.photos.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-md border border-zinc-800 light:border-zinc-200"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, 170px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
