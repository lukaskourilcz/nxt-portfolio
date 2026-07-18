"use client";

import { useI18n } from "@/components/language-provider";

// Small inline flag glyphs — self-contained SVGs (no external assets, no
// icon-font) so they render crisply at ~18px in the navbar. The outer <svg>
// viewport clips the Union Jack's overhanging diagonals for free.

function CzechFlag() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden className="h-full w-full">
      <rect width="60" height="20" fill="#ffffff" />
      <rect y="20" width="60" height="20" fill="#d7141a" />
      <path d="M0 0 L30 20 L0 40 Z" fill="#11457e" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden className="h-full w-full">
      <rect width="60" height="40" fill="#012169" />
      {/* White diagonals */}
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="8" />
      {/* Red diagonals */}
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" strokeWidth="4" />
      {/* White cross */}
      <rect x="24" width="12" height="40" fill="#ffffff" />
      <rect y="14" width="60" height="12" fill="#ffffff" />
      {/* Red cross */}
      <rect x="26" width="8" height="40" fill="#c8102e" />
      <rect y="16" width="60" height="8" fill="#c8102e" />
    </svg>
  );
}

// Navbar language switch. Shows the flag of the language it will switch TO:
// the Czech flag while English is active, the UK flag while Czech is active.
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchTo}
      title={t.switchTo}
      className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-[3px] border border-zinc-700 opacity-80 transition-all hover:opacity-100 hover:border-zinc-500 ${
        className ?? ""
      }`}
    >
      <span className="block h-3 w-[18px] overflow-hidden rounded-[1px]">
        {lang === "en" ? <CzechFlag /> : <UkFlag />}
      </span>
    </button>
  );
}
