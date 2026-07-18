import raw from "@/content/site-content.json";

// All user-facing copy and image paths for the page sections live in
// src/content/site-content.json, so they can be edited from the /dev
// editor (dev mode only) without touching component code.

export type TerminalLine = {
  command: string;
  outputs: string[];
};

// A single hero proof-strip metric (e.g. "10" / "projects shipped").
export type HeroMetric = {
  value: string;
  label: string;
};

// The "Currently … at … , …" context line under the hero subtitle.
export type HeroRoleContext = {
  role: string;
  company: string;
  // In-page anchor the company name links to (e.g. "#experience").
  companyHref: string;
  location: string;
};

export type HeroContent = {
  // Copy for the availability pill next to the portrait.
  availability: string;
  eyebrow: string;
  name: string;
  title: string;
  // Mono specialization line under the subtitle.
  specialization: string;
  roleContext: HeroRoleContext;
  // Plain text; **word** renders highlighted.
  intro: string;
  metrics: HeroMetric[];
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

export const CONTENT = raw as SiteContent;
