"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { CONTENT_BY_LANG, type SiteContent } from "@/lib/content";
import { UI, type Language, type UIStrings } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  // Section copy for the active language.
  content: SiteContent;
  // Fixed UI chrome strings for the active language.
  t: UIStrings;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "lang";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "cs";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English so the first client render matches the server-rendered
  // (English) HTML — avoids a hydration mismatch. A stored Czech preference is
  // applied right after mount.
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) setLangState(stored);
  }, []);

  // Keep the document language in sync for accessibility and correct hyphenation.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((current) => {
      const next = current === "en" ? "cs" : "en";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle,
      content: CONTENT_BY_LANG[lang],
      t: UI[lang],
    }),
    [lang, setLang, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
