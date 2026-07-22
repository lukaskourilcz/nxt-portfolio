"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { ResumeButton } from "@/components/resume-button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { localizedPath } from "@/lib/i18n";
import type { Locale, SiteContent } from "@/lib/content-schema";

export function Nav({ locale, content }: { locale: Locale; content: SiteContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled(12);
  const sectionIds = [...content.nav.map(({ id }) => id), "additional-work"];
  const observedSection = useActiveSection(sectionIds);
  const activeSection = observedSection === "additional-work" ? "work" : observedSection;
  const home = localizedPath(locale);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || menuOpen
          ? "border-edge bg-[var(--overlay)] backdrop-blur-xl"
          : "border-transparent bg-canvas/40 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label={content.common.primaryNavigation}
        className="page-shell flex h-16 items-center justify-between gap-4"
      >
        <Link
          href={home}
          className="inline-flex min-h-11 items-center gap-3 font-mono text-sm font-semibold text-primary"
        >
          <BrandMark />
          <span className="hidden sm:inline">Lukas Kouril</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {content.nav.map(({ id, label }) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className={`relative py-5 text-sm transition-colors after:absolute after:inset-x-0 after:bottom-3 after:h-px after:bg-accent after:transition-transform ${
                activeSection === id
                  ? "text-primary after:scale-x-100"
                  : "text-muted after:scale-x-0 hover:text-primary"
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
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? content.common.menuClose : content.common.menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-secondary hover:bg-interactive hover:text-primary lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-edge bg-canvas px-5 pb-5 pt-3 lg:hidden"
      >
        <div className="mx-auto flex max-w-[var(--content-max)] flex-col">
          {content.nav.map(({ id, label }) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              onClick={() => {
                setMenuOpen(false);
                requestAnimationFrame(() => menuButtonRef.current?.focus());
              }}
              aria-current={activeSection === id ? "location" : undefined}
              className={`border-b border-edge py-3 text-sm ${
                activeSection === id ? "text-primary" : "text-secondary"
              }`}
            >
              {label}
              {activeSection === id ? <span className="ml-2 text-accent" aria-hidden>●</span> : null}
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
