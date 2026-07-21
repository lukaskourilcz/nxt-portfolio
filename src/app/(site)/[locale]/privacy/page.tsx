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
        <Link href={localizedPath(locale)} className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">
          <ArrowLeft className="h-4 w-4" aria-hidden /> {content.common.links.backHome}
        </Link>
        <header className="mt-10 border-b border-zinc-800 pb-9">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">{content.privacy.title}</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-400">{content.privacy.description}</p>
          <p className="mt-4 font-mono text-xs text-zinc-600">{content.privacy.updated}</p>
        </header>
        {content.privacy.sections.map((section) => (
          <section key={section.id} className="border-b border-zinc-800 py-8">
            <h2 className="text-xl font-semibold text-zinc-100">{section.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-zinc-400">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
