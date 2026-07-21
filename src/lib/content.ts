import enRaw from "@/content/site-content.json";
import csRaw from "@/content/site-content.cs.json";
import {
  LOCALES,
  localeSchema,
  siteContentSchema,
  validateLocaleParity,
  type Locale,
  type SiteContent,
  type Work,
} from "@/lib/content-schema";

const parsed = {
  en: siteContentSchema.parse(enRaw),
  cs: siteContentSchema.parse(csRaw),
} satisfies Record<Locale, SiteContent>;

const parityErrors = validateLocaleParity(parsed.en, parsed.cs);
if (parityErrors.length) {
  throw new Error(`Localized content validation failed:\n${parityErrors.join("\n")}`);
}

export function isLocale(value: string): value is Locale {
  return localeSchema.safeParse(value).success;
}

export function getContent(locale: Locale): SiteContent {
  return parsed[locale];
}

export function getAllContent(): Record<Locale, SiteContent> {
  return parsed;
}

export function getFeaturedWork(locale: Locale): Work[] {
  return parsed[locale].work.filter((item) => item.featured);
}

export function getAdditionalWork(locale: Locale): Work[] {
  return parsed[locale].work.filter((item) => !item.featured);
}

export function getCaseStudy(locale: Locale, slug: string): Work | undefined {
  return parsed[locale].work.find(
    (item) => item.featured && item.slug === slug && item.detail
  );
}

export function getCaseStudySlugs(): string[] {
  return parsed.en.work.flatMap((item) =>
    item.featured && item.slug ? [item.slug] : []
  );
}

export { LOCALES, siteContentSchema, validateLocaleParity };
export type { Locale, SiteContent, Work };
