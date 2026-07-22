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
  const portraitAnnotation =
    locale === "cs"
      ? {
          location: "Praha",
          availability: "2026 / výběrová dostupnost",
          source: "portrét / autentický zdroj",
        }
      : {
          location: "Prague",
          availability: "2026 / available selectively",
          source: "portrait / authentic source",
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="page-shell grid min-h-[min(880px,100svh)] items-center gap-12 pb-20 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.34fr)_minmax(17rem,0.66fr)] lg:gap-16"
    >
      <div className="max-w-3xl hero-enter">
        <p className="font-mono text-sm text-accent">{hero.eyebrow}</p>
        <h1
          id="hero-heading"
          className="mt-5 text-[clamp(2.55rem,8.5vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-primary"
        >
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-8 text-secondary sm:text-xl sm:leading-9">
          {hero.subheadline}
        </p>
        <p className="mt-5 max-w-[68ch] text-base leading-7 text-muted">
          {hero.supporting}
        </p>

        <ul className="mt-8 grid max-w-2xl gap-x-6 gap-y-3 border-y border-edge py-5 sm:grid-cols-2" aria-label={common.coreCapabilities}>
          {hero.proof.map((item, index) => (
            <li key={item} className="grid grid-cols-[1.7rem_1fr] items-baseline gap-2 text-sm text-secondary">
              <span aria-hidden className="font-mono text-[10px] text-accent">0{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[65ch] border-l border-accent/50 pl-4 text-sm leading-6 text-secondary">
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
            {hero.cvAction} <span className="font-mono text-[10px] text-muted">PDF</span>
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
            className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm text-muted"
          >
            <Github className="h-4 w-4" aria-hidden /> GitHub
          </ExternalLink>
          <ExternalLink
            href={LINKEDIN_URL}
            newTabLabel={common.links.opensNewTab}
            data-analytics="external_linkedin"
            className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm text-muted"
          >
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </ExternalLink>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
        <div className="absolute -left-4 top-12 h-24 w-px bg-accent/60" aria-hidden />
        <div className="relative aspect-[4/5] overflow-hidden border border-edge-strong bg-surface">
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            fill
            priority
            sizes="(max-width: 1023px) 384px, 32vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-canvas/90 to-transparent px-4 pb-4 pt-16 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary" aria-hidden>
            <span>{portraitAnnotation.location}</span>
            <span>{portraitAnnotation.availability}</span>
          </div>
        </div>
        <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {portraitAnnotation.source}
        </p>
      </div>
    </section>
  );
}
