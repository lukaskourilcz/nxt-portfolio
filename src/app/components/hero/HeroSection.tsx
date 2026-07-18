import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Terminal } from "@/components/ui/terminal";
import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { ResumeButton } from "@/components/resume-button";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { CONTENT } from "@/lib/content";

// Renders the intro string with **word** segments highlighted.
function Intro({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="font-medium text-zinc-100">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function HeroSection() {
  const hero = CONTENT.hero;
  const commands = hero.terminal.map((line) => line.command);
  const outputs = Object.fromEntries(
    hero.terminal.map((line, i) => [i, line.outputs])
  );

  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-5xl flex-col px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:min-h-[100svh] lg:justify-center"
    >
      {/* Static mesh-gradient accent — sits behind the content (-z-10) and
          fades into the dark page background. Purely decorative. Full-bleed:
          the section is max-w-5xl and centered, so break out to the full
          viewport width instead of being clamped to the content column. */}
      <div
        aria-hidden
        className="hero-mesh pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10"
      />
      <div className="relative grid items-center gap-8 sm:gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Left — intro */}
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div id="hero-avatar" className="relative">
              <Image
                src="/profile.png"
                alt="Portrait of Lukas Kouril"
                width={56}
                height={56}
                priority
                className="h-14 w-14 rounded-full border border-zinc-700 object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-500" />
              </span>
            </div>
            {/* Availability pill — emerald, with a leading dot. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/[0.08] px-3 py-[5px] font-mono text-xs text-emerald-300">
              <span className="h-[7px] w-[7px] rounded-full bg-emerald-400" />
              {hero.availability}
            </span>
          </div>

          <p className="mb-3 font-mono text-sm text-emerald-400">
            {hero.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl md:text-5xl lg:text-6xl">
            {hero.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-zinc-300 sm:text-xl md:text-2xl">
            {hero.title}
          </p>
          {/* Specialization line — the actual day-to-day stack. */}
          <p className="mt-2.5 font-mono text-[13px] text-zinc-500">
            {hero.specialization}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            <Intro text={hero.intro} />
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="bg-emerald-400 font-semibold text-[#052e1f] shadow-[0_0_24px_-6px_rgba(52,211,153,0.5)] hover:bg-emerald-300"
            >
              <Link href="#contact">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <ResumeButton>
              <FileText className="h-4 w-4" /> View CV
            </ResumeButton>
            <div className="ml-1 flex items-center gap-1">
              <ExternalLink
                href={GITHUB_URL}
                aria-label="GitHub"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <Github className="h-5 w-5" />
              </ExternalLink>
              <ExternalLink
                href={LINKEDIN_URL}
                aria-label="LinkedIn"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <Linkedin className="h-5 w-5" />
              </ExternalLink>
            </div>
          </div>
        </Reveal>

        {/* Right — animated terminal */}
        <Reveal delay={0.15}>
          <Terminal
            username="lukas"
            className="px-0"
            typingSpeed={45}
            delayBetweenCommands={900}
            commands={commands}
            outputs={outputs}
          />
        </Reveal>
      </div>
    </section>
  );
}
