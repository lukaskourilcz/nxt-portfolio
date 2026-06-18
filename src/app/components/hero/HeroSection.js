import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Terminal } from "@/components/ui/terminal";
import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/site";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-start px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:justify-center"
    >
      <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — intro */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
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
            <span className="font-mono text-xs text-zinc-400">
              available for work · Prague, CZ
            </span>
          </div>

          <p className="mb-3 font-mono text-sm text-emerald-400">$ whoami</p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl md:text-5xl lg:text-6xl">
            Lukas Kouril
          </h1>
          <p className="mt-4 text-lg font-medium text-zinc-300 sm:text-xl md:text-2xl">
            Senior Frontend Engineer
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            I specialize in{" "}
            <span className="font-medium text-zinc-100">TypeScript</span> and{" "}
            <span className="font-medium text-zinc-100">React</span> — from
            micro-frontends for online banking to AI tooling in production
            teams. I care about readable code and frontends that stay
            maintainable as they grow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="#contact">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" /> View CV
              </a>
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <ExternalLink
                href={GITHUB_URL}
                aria-label="GitHub"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <Github className="h-5 w-5" />
              </ExternalLink>
              <ExternalLink
                href={LINKEDIN_URL}
                aria-label="LinkedIn"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-emerald-400"
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
            commands={[
              "whoami",
              "cat about.txt",
              "ls ~/stack",
              "echo $STATUS",
            ]}
            outputs={{
              0: ["Lukas Kouril — Senior Frontend Engineer · Prague, CZ"],
              1: [
                "I build web apps with TypeScript, React,",
                "Next.js and Node.js.",
              ],
              2: [
                "typescript  react  next.js  node.js  postgresql",
                "prisma  tailwindcss  payload  docker  ...",
              ],
              3: ["available for work ✅"],
            }}
          />
        </Reveal>
      </div>

      <div className="mt-16 hidden justify-center md:flex">
        <Link
          href="#stack"
          className="font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-400"
        >
          scroll ↓
        </Link>
      </div>
    </section>
  );
}
