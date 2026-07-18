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
import { LANG_COOKIE, UI, type Language, type UIStrings } from "@/lib/i18n";

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

// The preference lives in a cookie (not localStorage) so the server can read
// it and render the correct language into the HTML. That avoids the flash of
// English content that a client-only (localStorage) approach causes on reload
// for visitors who picked Czech. The cookie name lives in lib/i18n so the
// server component reading it doesn't import from this "use client" module.
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function persist(lang: Language) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

export function LanguageProvider({
  // Resolved on the server from the cookie so the first paint already matches
  // the visitor's choice — no post-hydration language swap.
  initialLang = "en",
  children,
}: {
  initialLang?: Language;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  // Keep the document language in sync for accessibility and correct hyphenation.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((current) => {
      const next = current === "en" ? "cs" : "en";
      persist(next);
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
