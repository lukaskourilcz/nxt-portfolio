import type { MetadataRoute } from "next";
import { getCaseStudySlugs, LOCALES } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = LOCALES.flatMap((locale) => [
    { path: localizedPath(locale), priority: 1, changeFrequency: "monthly" as const },
    { path: localizedPath(locale, "/privacy"), priority: 0.3, changeFrequency: "yearly" as const },
    ...getCaseStudySlugs().map((slug) => ({
      path: localizedPath(locale, `/work/${slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ]);
  return routes.map(({ path, ...entry }) => ({ url: `${SITE_URL}${path}`, ...entry }));
}
