"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/components/language-provider";
import { staggerDelay } from "@/lib/anim";
import { type Experience } from "@/lib/content";

// The recent engineering roles render in full; the earlier, pre-engineering
// roles collapse into one compact "earlier career" group so the senior work
// stays dominant. The first five entries are the engineering roles.
const ENGINEERING_COUNT = 5;

// The rail marker for a timeline entry. The current role gets an emerald dot
// with a soft ring; the rest are quiet zinc dots. The 2px ring is the page
// background, so the dot reads as sitting on top of the rail.
function TimelineDot({ current }: { current: boolean }) {
  return (
    <span
      className={`absolute left-[-5.5px] top-1.5 hidden h-2.5 w-2.5 rounded-full border-2 border-zinc-950 sm:block ${
        current
          ? "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
          : "bg-zinc-700"
      }`}
    />
  );
}

// A logo tile — a white square that normalizes the mixed logo shapes and keeps
// dark marks visible.
function LogoChip({ exp }: { exp: Experience }) {
  return (
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
  );
}

// A full timeline entry for a recent engineering role.
function EngineeringRow({
  exp,
  current,
  delay,
  presentLabel,
}: {
  exp: Experience;
  current: boolean;
  delay: number;
  presentLabel: string;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="grid grid-cols-1 gap-y-2 pb-9 sm:grid-cols-[130px_1fr] sm:gap-x-7"
    >
      <div className="flex items-baseline gap-x-2.5 font-mono text-xs leading-relaxed sm:block sm:pt-0.5">
        <p className={current ? "text-emerald-300" : "text-zinc-400"}>
          {exp.period}
        </p>
        <p className="text-zinc-600 sm:mt-1">{exp.location}</p>
      </div>

      <div className="relative sm:border-l sm:border-zinc-800 sm:pl-7">
        <TimelineDot current={current} />

        <div className="flex flex-wrap items-center gap-3">
          <LogoChip exp={exp} />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-semibold text-zinc-100">{exp.role}</h3>
              {current && (
                <span className="rounded-full bg-emerald-400 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#052e1f]">
                  {presentLabel}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-400">{exp.company}</p>
          </div>
        </div>

        <ul className="mt-4 flex flex-col gap-1.5">
          {exp.responsibilities.map((res, j) => (
            <li
              key={j}
              className="flex gap-2 text-sm leading-[1.45] text-zinc-400"
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
    </Reveal>
  );
}

export default function ExperienceSection({
  // When true the earlier-career roles expand back to full bullet lists.
  earlierRolesOpen = false,
}: {
  earlierRolesOpen?: boolean;
} = {}) {
  const { content, t } = useI18n();
  const engineering = content.experience.slice(0, ENGINEERING_COUNT);
  const earlier = content.experience.slice(ENGINEERING_COUNT);

  return (
    <Section id="experience" mesh="right">
      <SectionHeading
        index="03"
        command={t.sections.experience.command}
        title={t.sections.experience.title}
      />

      <div>
        {engineering.map((exp, idx) => (
          <EngineeringRow
            key={`${exp.company}-${exp.period}`}
            exp={exp}
            current={idx === 0}
            delay={staggerDelay(idx, 0.06, 0.4)}
            presentLabel={t.experience.present}
          />
        ))}

        {/* Earlier career — one compact group of one-line rows. */}
        <Reveal
          as="article"
          delay={staggerDelay(engineering.length, 0.06, 0.4)}
          className="grid grid-cols-1 gap-y-1.5 sm:grid-cols-[130px_1fr] sm:gap-x-7"
        >
          <div className="font-mono text-xs text-zinc-600 sm:pt-0.5">
            {t.experience.earlierPeriod}
          </div>

          <div className="relative sm:border-l sm:border-zinc-800 sm:pl-7">
            <TimelineDot current={false} />
            <h3 className="mb-1.5 font-mono text-xs uppercase tracking-[0.08em] text-zinc-400">
              {t.experience.earlierCareer}
            </h3>

            <div className="flex flex-col">
              {earlier.map((exp) => (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className="border-t border-[#1f1f23] py-3"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <span className="text-sm">
                      <span className="font-semibold text-zinc-200">
                        {exp.role}
                      </span>
                      <span className="text-zinc-500">{`  ·  ${exp.company}`}</span>
                    </span>
                    <span className="whitespace-nowrap font-mono text-xs text-zinc-600">
                      {exp.period}
                    </span>
                  </div>

                  {earlierRolesOpen ? (
                    <ul className="mt-2 flex flex-col gap-1">
                      {exp.responsibilities.map((res, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-[13px] leading-[1.4] text-zinc-400"
                        >
                          <span className="select-none font-mono text-zinc-600">
                            ›
                          </span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1.5 font-mono text-[11.5px] text-zinc-600">
                      {exp.tags.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
