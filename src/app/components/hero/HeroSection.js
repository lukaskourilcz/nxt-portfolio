import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CodeWindow } from "@/components/code-window";

const CODE_LINES = [
  <>
    <span className="text-purple-400">const</span>{" "}
    <span className="text-zinc-100">lukas</span>{" "}
    <span className="text-zinc-500">= {"{"}</span>
  </>,
  <>
    {"  "}role<span className="text-zinc-500">:</span>{" "}
    <span className="text-emerald-400">&quot;Software Engineer&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}location<span className="text-zinc-500">:</span>{" "}
    <span className="text-emerald-400">&quot;Prague, Czech Republic&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}stack<span className="text-zinc-500">: [</span>
    <span className="text-emerald-400">&quot;TypeScript&quot;</span>
    <span className="text-zinc-500">, </span>
    <span className="text-emerald-400">&quot;React&quot;</span>
    <span className="text-zinc-500">, </span>
    <span className="text-emerald-400">&quot;Node.js&quot;</span>
    <span className="text-zinc-500">],</span>
  </>,
  <>
    {"  "}focus<span className="text-zinc-500">: [</span>
    <span className="text-emerald-400">&quot;clean UI&quot;</span>
    <span className="text-zinc-500">, </span>
    <span className="text-emerald-400">&quot;accessibility&quot;</span>
    <span className="text-zinc-500">, </span>
    <span className="text-emerald-400">&quot;performance&quot;</span>
    <span className="text-zinc-500">],</span>
  </>,
  <>
    {"  "}available<span className="text-zinc-500">:</span>{" "}
    <span className="text-orange-400">true</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    <span className="text-zinc-500">{"}"};</span>
  </>,
];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pt-28 pb-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
            Lukas Kouril
          </h1>
          <p className="mt-4 text-xl font-medium text-zinc-300 md:text-2xl">
            Software Engineer
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            I build clean, user-friendly web applications with{" "}
            <span className="font-medium text-zinc-100">TypeScript</span>,{" "}
            <span className="font-medium text-zinc-100">React</span> and{" "}
            <span className="font-medium text-zinc-100">Node.js</span> — from
            micro-frontends to AI-powered tools. Endlessly curious, always
            shipping.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-emerald-400 hover:text-zinc-900"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/pdf/cv_lukaskouril.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              <Link
                href="https://github.com/lukaskourilcz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/lukas-kouril/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md p-2 text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Right — code window */}
        <Reveal delay={0.15}>
          <CodeWindow title="lukas.ts">
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              {CODE_LINES.map((line, i) => (
                <Fragment key={i}>
                  <span className="select-none text-right text-zinc-600">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre text-zinc-300">{line}</span>
                </Fragment>
              ))}
            </div>
          </CodeWindow>
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
