import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { CONTENT } from "@/lib/content";

export default function ExperienceSection() {
  return (
    <Section id="experience" mesh="right">
      <SectionHeading index="03" command="experience" title="Experience" />

      <div className="border-t border-zinc-800">
        {CONTENT.experience.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="grid gap-x-8 gap-y-4 border-b border-zinc-800 py-8 sm:grid-cols-[150px_1fr]"
          >
            <div className="font-mono text-xs leading-relaxed">
              <p className="text-zinc-400">{exp.period}</p>
              <p className="mt-1 text-zinc-600">
                {exp.location}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                {/* White tile normalizes the mixed logo shapes and keeps dark
                    marks visible; echoes the white "LK" square in the nav. */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-transparent bg-white p-0.5 hover:animate-[logo-pulse_0.45s_ease-in-out]">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-100">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {exp.company}
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5">
                {exp.responsibilities.map((res, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-snug text-zinc-400"
                  >
                    <span className="mt-0.5 select-none font-mono text-zinc-600">
                      ›
                    </span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-xs text-zinc-500">
                {exp.tags.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
