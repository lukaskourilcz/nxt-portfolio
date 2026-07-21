import type { Locale } from "@/lib/content-schema";

export const DEFAULT_LOCALE: Locale = "en";

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "cs") parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "cs" : "en";
}
