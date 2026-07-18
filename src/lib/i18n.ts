// Language support for the site. English is the default (server-rendered);
// Czech is an opt-in switch driven client-side from the navbar flag toggle.
//
// Section CONTENT (hero, projects, experience, …) lives in the per-language
// site-content JSON files. The UI dictionary below covers the fixed chrome
// strings baked into the components (button labels, badges, section titles).

export type Language = "en" | "cs";

export const LANGUAGES: Language[] = ["en", "cs"];

// The five in-page sections, in nav order. `command` is the mono token shown
// in the navbar and section heading; `title` is the large section heading.
type SectionStrings = {
  command: string;
  title: string;
};

export type UIStrings = {
  // Per-section labels, keyed by section id (also the anchor id).
  sections: Record<
    "stack" | "projects" | "experience" | "education" | "contact",
    SectionStrings
  >;
  // Extra copy for the stack section's intro paragraph.
  stackIntro: string;
  hero: {
    getInTouch: string;
    viewCV: string;
  };
  nav: {
    resume: string;
  };
  projects: {
    featured: string;
    visitSite: string;
    notPublic: string;
  };
  experience: {
    present: string;
    earlierCareer: string;
    earlierPeriod: string;
  };
  contact: {
    sayHello: string;
    email: string;
    phone: string;
    location: string;
  };
  footer: {
    builtWith: string;
    backToTop: string;
  };
  // Accessible label for the language toggle, describing the language it
  // switches TO.
  switchTo: string;
};

export const UI: Record<Language, UIStrings> = {
  en: {
    sections: {
      stack: { command: "stack", title: "Tech Stack" },
      projects: { command: "projects", title: "Projects" },
      experience: { command: "experience", title: "Experience" },
      education: { command: "education", title: "Education" },
      contact: { command: "contact", title: "Get in touch" },
    },
    stackIntro:
      "The tools I reach for day to day — grouped by where they sit in the stack. Hover the constellation to explore.",
    hero: {
      getInTouch: "Get in touch",
      viewCV: "View CV",
    },
    nav: {
      resume: "resume",
    },
    projects: {
      featured: "Featured",
      visitSite: "Visit site",
      notPublic: "not public",
    },
    experience: {
      present: "Present",
      earlierCareer: "Earlier career · pre-engineering",
      earlierPeriod: "2015 – 2024",
    },
    contact: {
      sayHello: "Say hello",
      email: "email",
      phone: "phone",
      location: "location",
    },
    footer: {
      builtWith: "built with Next.js",
      backToTop: "back to top",
    },
    switchTo: "Switch to Czech",
  },
  cs: {
    sections: {
      stack: { command: "technologie", title: "Technologie" },
      projects: { command: "projekty", title: "Projekty" },
      experience: { command: "zkušenosti", title: "Zkušenosti" },
      education: { command: "vzdělání", title: "Vzdělání" },
      contact: { command: "kontakt", title: "Napište mi" },
    },
    stackIntro:
      "Nástroje, po kterých denně sahám — seskupené podle toho, kde ve stacku sedí. Najeďte myší na souhvězdí a prozkoumejte ho.",
    hero: {
      getInTouch: "Napište mi",
      viewCV: "Zobrazit CV",
    },
    nav: {
      resume: "CV",
    },
    projects: {
      featured: "Doporučeno",
      visitSite: "Otevřít web",
      notPublic: "neveřejné",
    },
    experience: {
      present: "současnost",
      earlierCareer: "Dřívější kariéra · před programováním",
      earlierPeriod: "2015 – 2024",
    },
    contact: {
      sayHello: "Napsat e-mail",
      email: "e-mail",
      phone: "telefon",
      location: "lokalita",
    },
    footer: {
      builtWith: "postaveno v Next.js",
      backToTop: "zpět nahoru",
    },
    switchTo: "Switch to English",
  },
};
