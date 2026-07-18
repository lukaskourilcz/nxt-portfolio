import raw from "@/content/site-content.json";
import rawCs from "@/content/site-content.cs.json";
import type { Language } from "@/lib/i18n";

// All user-facing copy and image paths for the page sections live in
// src/content/site-content.json (English, the default) and its Czech
// counterpart site-content.cs.json. English can be edited from the /dev
// editor (dev mode only) without touching component code; the Czech file
// mirrors the same structure.

export type TerminalLine = {
  command: string;
  outputs: string[];
};

export type HeroContent = {
  // Copy for the availability pill next to the portrait.
  availability: string;
  eyebrow: string;
  name: string;
  title: string;
  // Mono specialization line under the subtitle.
  specialization: string;
  // Plain text; **word** renders highlighted.
  intro: string;
  terminal: TerminalLine[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  vercel?: string;
  note?: string;
};

export type Experience = {
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  tags: string[];
};

export type AcademyPhoto = {
  src: string;
  alt: string;
};

export type Academy = {
  name: string;
  field: string;
  period: string;
  url?: string;
  description: string;
  skills: string[];
  photos: AcademyPhoto[];
};

export type ContactContent = {
  prompt: string;
  blurb: string;
};

export type SiteContent = {
  hero: HeroContent;
  projects: Project[];
  experience: Experience[];
  education: Academy[];
  contact: ContactContent;
};

// English content — the default used for server rendering, metadata, and the
// /dev editor.
export const CONTENT = raw as SiteContent;

// Full content set keyed by language, consumed at runtime by the language
// provider so the page can switch without a reload.
export const CONTENT_BY_LANG: Record<Language, SiteContent> = {
  en: raw as SiteContent,
  cs: rawCs as SiteContent,
};
