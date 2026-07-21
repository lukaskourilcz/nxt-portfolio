"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { ResumeButton } from "@/components/resume-button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { localizedPath } from "@/lib/i18n";
import type { Locale, SiteContent } from "@/lib/content-schema";

export function Nav({ locale, content }: { locale: Locale; content: SiteContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(12);
  const sectionIds = content.nav.map(({ id }) => id);
  const activeSection = useActiveSection(sectionIds);
  const home = localizedPath(locale);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-zinc-800/90 bg-zinc-950/90 backdrop-blur-xl"
          : "border-transparent bg-zinc-950/35 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label={content.common.primaryNavigation}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href={home}
          className="inline-flex min-h-11 items-center gap-3 font-mono text-sm font-semibold text-zinc-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-xs text-zinc-950">
            LK
          </span>
          <span className="hidden sm:inline">Lukas Kouril</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {content.nav.map(({ id, label }) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className={`relative py-5 text-sm transition-colors after:absolute after:inset-x-0 after:bottom-3 after:h-px after:bg-emerald-400 after:transition-transform ${
                activeSection === id
                  ? "text-zinc-100 after:scale-x-100"
                  : "text-zinc-500 after:scale-x-0 hover:text-zinc-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ResumeButton size="sm" className="hidden md:inline-flex">
            <FileText className="h-3.5 w-3.5" aria-hidden />
            {content.common.links.downloadCv}
          </ResumeButton>
          <LanguageToggle locale={locale} label={content.common.switchLanguage} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? content.common.menuClose : content.common.menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-900 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-zinc-800 bg-zinc-950 px-5 pb-5 pt-3 lg:hidden"
      >
        <div className="mx-auto flex max-w-6xl flex-col">
          {content.nav.map(({ id, label }) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === id ? "location" : undefined}
              className={`border-b border-zinc-900 py-3 text-sm ${
                activeSection === id ? "text-zinc-100" : "text-zinc-400"
              }`}
            >
              {label}
              {activeSection === id ? <span className="ml-2 text-emerald-400" aria-hidden>●</span> : null}
            </Link>
          ))}
          <ResumeButton size="sm" className="mt-4 w-fit">
            <FileText className="h-3.5 w-3.5" aria-hidden />
            {content.common.links.downloadCv}
          </ResumeButton>
        </div>
      </div>
    </header>
  );
}
