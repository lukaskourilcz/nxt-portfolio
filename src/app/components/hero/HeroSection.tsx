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
      className="relative isolate overflow-hidden"
    >
      {/* Portrait composited into the hero background: anchored to the right,
          bled to the section edge, and faded into the page canvas on its left
          and bottom so the left-hand copy always sits on solid canvas. The
          canvas stops are theme-aware, so the dark studio background of the
          photo blends into the dark theme and softens under the light one. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full sm:w-[64%] lg:w-[56%] xl:w-[52%]">
        <Image
          src={hero.portrait.src}
          alt={hero.portrait.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 56vw"
          className="object-cover object-[center_18%]"
        />
        {/* On narrow screens the portrait sits behind the whole column, so a flat
            canvas scrim keeps the copy readable; desktop keeps the clean fade. */}
        <div className="absolute inset-0 bg-canvas/55 sm:bg-transparent" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-canvas/45 to-transparent" aria-hidden />
      </div>

      <div className="page-shell grid min-h-[min(880px,100svh)] items-center pb-20 pt-28 sm:pt-32">
        <div className="max-w-2xl hero-enter">
          <p className="font-mono text-sm text-accent">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(2.55rem,8.5vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-primary"
          >
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-[54ch] text-lg leading-8 text-secondary sm:text-xl sm:leading-9">
            {hero.subheadline}
          </p>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted">
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

          <p className="mt-6 max-w-[58ch] border-l border-accent/50 pl-4 text-sm leading-6 text-secondary">
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
      </div>
    </section>
  );
}
