import type { Metadata } from "next";
import { alternateLocale, localizedPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import type { Locale, SiteContent, Work } from "@/lib/content-schema";

export function localeAlternates(locale: Locale, path = "") {
  const alternate = alternateLocale(locale);
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: localizedPath("en", path),
      cs: localizedPath("cs", path),
      "x-default": localizedPath("en", path),
      [alternate]: localizedPath(alternate, path),
    },
  };
}

export function homeMetadata(locale: Locale, content: SiteContent): Metadata {
  const url = `${SITE_URL}${localizedPath(locale)}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: content.metadata.homeTitle,
    description: content.metadata.homeDescription,
    alternates: localeAlternates(locale),
    openGraph: {
      title: content.metadata.homeTitle,
      description: content.metadata.homeDescription,
      url,
      siteName: "Lukas Kouril",
      type: "profile",
      locale: content.metadata.ogLocale,
      alternateLocale: content.metadata.ogAlternateLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.homeTitle,
      description: content.metadata.homeDescription,
    },
  };
}

export function caseStudyMetadata(locale: Locale, content: SiteContent, work: Work): Metadata {
  const path = `/work/${work.slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${work.title} | Lukas Kouril`,
    description: work.summary,
    alternates: localeAlternates(locale, path),
    openGraph: {
      title: work.title,
      description: work.summary,
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      siteName: "Lukas Kouril",
      type: "article",
      locale: content.metadata.ogLocale,
      alternateLocale: content.metadata.ogAlternateLocale,
    },
    twitter: { card: "summary_large_image", title: work.title, description: work.summary },
  };
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
