"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { alternateLocale, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/content-schema";

export function LanguageToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const nextLocale = alternateLocale(locale);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <Link
      href={`${switchLocalePath(pathname, nextLocale)}${hash}`}
      lang={nextLocale}
      hrefLang={nextLocale}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-mono text-xs text-muted transition-colors hover:bg-subtle hover:text-primary"
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span aria-hidden>{nextLocale.toUpperCase()}</span>
    </Link>
  );
}
