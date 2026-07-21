import { z } from "zod";

export const LOCALES = ["en", "cs"] as const;
export const localeSchema = z.enum(LOCALES);
export type Locale = z.infer<typeof localeSchema>;

const nonEmpty = z.string().trim().min(1);
const internalPath = z.string().startsWith("/");
const optionalUrl = z.string().url().optional();

const imageSchema = z.object({
  src: internalPath,
  alt: nonEmpty,
});

const linkLabelsSchema = z.object({
  backHome: nonEmpty,
  backToWork: nonEmpty,
  caseStudy: nonEmpty,
  externalProduct: nonEmpty,
  repository: nonEmpty,
  downloadCv: nonEmpty,
  contact: nonEmpty,
  email: nonEmpty,
  location: nonEmpty,
  privacy: nonEmpty,
  github: nonEmpty,
  linkedin: nonEmpty,
  opensNewTab: nonEmpty,
  pdfLabel: nonEmpty,
});

const caseStudyDecisionSchema = z.object({
  title: nonEmpty,
  context: nonEmpty,
  decision: nonEmpty,
  tradeoff: nonEmpty.optional(),
  outcome: nonEmpty.optional(),
});

const caseStudyDetailSchema = z.object({
  confidentialityNote: nonEmpty.optional(),
  overview: z.array(z.object({ label: nonEmpty, value: nonEmpty })).min(2),
  problem: z.array(nonEmpty).optional(),
  constraints: z.array(nonEmpty).optional(),
  responsibilities: z.array(nonEmpty).optional(),
  approach: z.array(nonEmpty).optional(),
  decisions: z.array(caseStudyDecisionSchema).optional(),
  outcomes: z.array(nonEmpty).optional(),
  reflection: z.array(nonEmpty).optional(),
});

export const workSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  featured: z.boolean(),
  group: z.enum(["professional", "product", "client", "experiment"]),
  title: nonEmpty,
  contextLabel: nonEmpty,
  organization: nonEmpty.optional(),
  period: nonEmpty.optional(),
  year: nonEmpty.optional(),
  role: nonEmpty,
  summary: nonEmpty,
  capabilities: z.array(nonEmpty).min(2).max(4),
  technologies: z.array(nonEmpty).max(5),
  image: imageSchema.optional(),
  externalUrl: optionalUrl,
  repositoryUrl: optionalUrl,
  confidentiality: z.enum(["public", "limited", "confidential"]),
  detail: caseStudyDetailSchema.optional(),
});

const experienceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  phase: z.enum(["engineering", "earlier"]),
  company: nonEmpty,
  logo: internalPath,
  logoAlt: nonEmpty,
  role: nonEmpty,
  period: nonEmpty,
  location: nonEmpty,
  summary: nonEmpty,
  contributions: z.array(nonEmpty).min(2).max(5),
  capabilities: z.array(nonEmpty).min(2).max(6),
  caseStudySlug: z.string().regex(/^[a-z0-9-]+$/).optional(),
});

const educationSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: nonEmpty,
  field: nonEmpty,
  period: nonEmpty,
  url: z.string().url(),
  description: nonEmpty,
  skills: z.array(nonEmpty).min(2),
  image: imageSchema,
});

const testimonialSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  quote: nonEmpty,
  name: nonEmpty,
  role: nonEmpty,
  company: nonEmpty,
  permissionToPublish: z.literal(true),
  sourceUrl: z.string().url().optional(),
  workId: z.string().regex(/^[a-z0-9-]+$/),
});

export const siteContentSchema = z.object({
  locale: localeSchema,
  metadata: z.object({
    homeTitle: nonEmpty,
    homeDescription: nonEmpty,
    ogLocale: nonEmpty,
    ogAlternateLocale: nonEmpty,
  }),
  common: z.object({
    skipToContent: nonEmpty,
    menuOpen: nonEmpty,
    menuClose: nonEmpty,
    switchLanguage: nonEmpty,
    primaryNavigation: nonEmpty,
    breadcrumb: nonEmpty,
    coreCapabilities: nonEmpty,
    capabilitiesLabel: nonEmpty,
    transferableCapabilities: nonEmpty,
    organizationLabel: nonEmpty,
    roleLabel: nonEmpty,
    periodLabel: nonEmpty,
    present: nonEmpty,
    confidential: nonEmpty,
    selectedWork: nonEmpty,
    additionalWork: nonEmpty,
    productAndExperimental: nonEmpty,
    clientAndEarlier: nonEmpty,
    beforeEngineering: nonEmpty,
    alsoWorkedWith: nonEmpty,
    analyticsSettings: nonEmpty,
    links: linkLabelsSchema,
  }),
  nav: z.array(
    z.object({
      id: z.enum([
        "work",
        "experience",
        "approach",
        "additional-work",
        "capabilities",
        "education",
        "contact",
      ]),
      label: nonEmpty,
    })
  ).length(6),
  hero: z.object({
    eyebrow: nonEmpty,
    headline: nonEmpty,
    subheadline: nonEmpty,
    supporting: nonEmpty,
    proof: z.array(nonEmpty).min(4),
    availability: nonEmpty,
    portrait: imageSchema,
    primaryAction: nonEmpty,
    cvAction: nonEmpty,
    contactAction: nonEmpty,
  }),
  sectionCopy: z.object({
    work: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    experience: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    approach: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    additionalWork: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    capabilities: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    education: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
    contact: z.object({ eyebrow: nonEmpty, title: nonEmpty, intro: nonEmpty }),
  }),
  work: z.array(workSchema).min(3),
  experience: z.array(experienceSchema).min(1),
  earlierCareerIntro: nonEmpty,
  approach: z.array(
    z.object({ id: z.string().regex(/^[a-z0-9-]+$/), title: nonEmpty, body: nonEmpty })
  ).length(4),
  capabilities: z.object({
    groups: z.array(
      z.object({ id: z.string().regex(/^[a-z0-9-]+$/), title: nonEmpty, items: z.array(nonEmpty).min(4) })
    ).length(4),
    additionalTools: z.array(nonEmpty).min(4),
  }),
  education: z.array(educationSchema).min(1),
  contact: z.object({
    body: nonEmpty,
    availability: nonEmpty,
  }),
  footer: z.object({
    role: nonEmpty,
    location: nonEmpty,
    copyright: nonEmpty,
    backToTop: nonEmpty,
  }),
  caseStudyLabels: z.object({
    context: nonEmpty,
    problem: nonEmpty,
    constraints: nonEmpty,
    responsibility: nonEmpty,
    approach: nonEmpty,
    decisions: nonEmpty,
    outcomes: nonEmpty,
    reflection: nonEmpty,
    testimonial: nonEmpty,
    related: nonEmpty,
    contactHeading: nonEmpty,
    contactBody: nonEmpty,
  }),
  privacy: z.object({
    title: nonEmpty,
    description: nonEmpty,
    updated: nonEmpty,
    sections: z.array(z.object({ id: nonEmpty, title: nonEmpty, paragraphs: z.array(nonEmpty).min(1) })).min(4),
  }),
  consent: z.object({
    title: nonEmpty,
    body: nonEmpty,
    accept: nonEmpty,
    decline: nonEmpty,
    close: nonEmpty,
    dnt: nonEmpty,
  }),
  notFound: z.object({
    eyebrow: nonEmpty,
    title: nonEmpty,
    body: nonEmpty,
    action: nonEmpty,
  }),
  testimonials: z.array(testimonialSchema).max(3).default([]),
  cvUpdatedAt: z.string().date().optional(),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type Work = z.infer<typeof workSchema>;
export type Experience = z.infer<typeof experienceSchema>;

function structuralShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(structuralShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, structuralShape(child)])
    );
  }
  return typeof value;
}

function idsAt<T extends { id: string }>(items: T[]): string[] {
  return items.map(({ id }) => id);
}

export function validateLocaleParity(en: SiteContent, cs: SiteContent): string[] {
  const errors: string[] = [];
  if (JSON.stringify(structuralShape(en)) !== JSON.stringify(structuralShape(cs))) {
    errors.push("English and Czech content structures differ");
  }

  const pairs: Array<[string, string[], string[]]> = [
    ["navigation", idsAt(en.nav), idsAt(cs.nav)],
    ["work", idsAt(en.work), idsAt(cs.work)],
    ["experience", idsAt(en.experience), idsAt(cs.experience)],
    ["approach", idsAt(en.approach), idsAt(cs.approach)],
    ["capability groups", idsAt(en.capabilities.groups), idsAt(cs.capabilities.groups)],
    ["education", idsAt(en.education), idsAt(cs.education)],
    ["testimonials", en.testimonials.map((item) => `${item.id}:${item.workId}`), cs.testimonials.map((item) => `${item.id}:${item.workId}`)],
  ];

  for (const [label, a, b] of pairs) {
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      errors.push(`${label} identifiers differ between locales`);
    }
  }

  for (const locale of [en, cs]) {
    const ids = idsAt(locale.work);
    if (new Set(ids).size !== ids.length) errors.push(`${locale.locale}: duplicate work id`);
    const slugs = locale.work.flatMap((item) => (item.slug ? [item.slug] : []));
    if (new Set(slugs).size !== slugs.length) errors.push(`${locale.locale}: duplicate case-study slug`);
    for (const item of locale.work) {
      if (item.featured && (!item.slug || !item.detail || !item.period)) {
        errors.push(`${locale.locale}: featured work ${item.id} needs a slug, period, and detail`);
      }
    }
    const featuredIds = new Set(locale.work.filter((item) => item.featured).map((item) => item.id));
    for (const testimonial of locale.testimonials) {
      if (!featuredIds.has(testimonial.workId)) {
        errors.push(`${locale.locale}: testimonial ${testimonial.id} must reference featured work`);
      }
    }
  }

  return errors;
}
