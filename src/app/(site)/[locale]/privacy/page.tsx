import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContent, isLocale } from "@/lib/content";
import { localeAlternates } from "@/lib/metadata";
import { localizedPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const title = `${content.privacy.title} | Lukas Kouril`;
  const url = `${SITE_URL}${localizedPath(locale, "/privacy")}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: content.privacy.description,
    alternates: localeAlternates(locale, "/privacy"),
    openGraph: {
      title,
      description: content.privacy.description,
      url,
      siteName: "Lukas Kouril",
      type: "website",
      locale: content.metadata.ogLocale,
      alternateLocale: content.metadata.ogAlternateLocale,
    },
    twitter: { card: "summary_large_image", title, description: content.privacy.description },
  };
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link href={localizedPath(locale)} className="editorial-link inline-flex min-h-11 items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden /> {content.common.links.backHome}
        </Link>
        <header className="mt-10 border-b border-edge pb-9">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">policy / privacy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-primary sm:text-5xl">{content.privacy.title}</h1>
          <p className="mt-4 text-lg leading-8 text-secondary">{content.privacy.description}</p>
          <p className="mt-4 font-mono text-xs text-muted">{content.privacy.updated}</p>
        </header>
        {content.privacy.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-edge py-8">
            <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-secondary">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
