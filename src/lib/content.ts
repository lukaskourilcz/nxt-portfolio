import raw from "@/content/site-content.json";

// All user-facing copy and image paths for the page sections live in
// src/content/site-content.json, so they can be edited from the /dev
// editor (dev mode only) without touching component code.

export type TerminalLine = {
  command: string;
  outputs: string[];
};

export type HeroContent = {
  availability: string;
  eyebrow: string;
  name: string;
  title: string;
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

export const CONTENT = raw as SiteContent;
