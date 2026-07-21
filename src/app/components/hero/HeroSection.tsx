import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { ResumeButton } from "@/components/resume-button";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import type { Locale, SiteContent } from "@/lib/content-schema";

export default function HeroSection({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const { hero, common } = content;
  const home = localizedPath(locale);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto grid min-h-[min(900px,100svh)] max-w-6xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-20"
    >
      <div className="max-w-3xl hero-enter">
        <p className="font-mono text-sm text-emerald-400">{hero.eyebrow}</p>
        <h1
          id="hero-heading"
          className="mt-5 text-[clamp(2.55rem,8.5vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-zinc-100"
        >
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-[64ch] text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
          {hero.subheadline}
        </p>
        <p className="mt-5 max-w-[68ch] text-base leading-7 text-zinc-400">
          {hero.supporting}
        </p>

        <ul className="mt-7 flex max-w-2xl flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-zinc-500" aria-label={common.coreCapabilities}>
          {hero.proof.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden className="text-zinc-700">·</span> : null}
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[65ch] border-l border-emerald-500/50 pl-4 text-sm leading-6 text-zinc-400">
          {hero.availability}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`${home}#work`}>
              {hero.primaryAction} <ArrowDown className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <ResumeButton>
            <FileText className="h-4 w-4" aria-hidden />
            {hero.cvAction} <span className="font-mono text-[10px] text-zinc-500">PDF</span>
          </ResumeButton>
          <Button asChild variant="outline">
            <Link href={`${home}#contact`}>
              <Mail className="h-4 w-4" aria-hidden /> {hero.contactAction}
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <ExternalLink
            href={GITHUB_URL}
            newTabLabel={common.links.opensNewTab}
            data-analytics="external_github"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-200"
          >
            <Github className="h-4 w-4" aria-hidden /> GitHub
          </ExternalLink>
          <ExternalLink
            href={LINKEDIN_URL}
            newTabLabel={common.links.opensNewTab}
            data-analytics="external_linkedin"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-200"
          >
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </ExternalLink>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
        <div className="absolute -inset-8 -z-10 rounded-full bg-emerald-500/[0.08] blur-3xl" aria-hidden />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            fill
            priority
            sizes="(max-width: 1023px) 384px, 32vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/55 to-transparent" aria-hidden />
        </div>
      </div>
    </section>
  );
}
