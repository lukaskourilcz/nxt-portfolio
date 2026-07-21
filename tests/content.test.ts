import { describe, expect, it } from "vitest";
import { getAllContent, getCaseStudySlugs, siteContentSchema, validateLocaleParity } from "@/lib/content";

describe("localized portfolio content", () => {
  const content = getAllContent();

  it("matches the shared schema", () => {
    expect(siteContentSchema.safeParse(content.en).success).toBe(true);
    expect(siteContentSchema.safeParse(content.cs).success).toBe(true);
  });

  it("keeps English and Czech structures aligned", () => {
    expect(validateLocaleParity(content.en, content.cs)).toEqual([]);
  });

  it("has three localized flagship case studies with unique slugs", () => {
    expect(getCaseStudySlugs()).toEqual([
      "banking-modernization",
      "ersilia-ai-tooling",
      "devshark",
    ]);
  });

  it("does not expose empty public strings", () => {
    const visit = (value: unknown): void => {
      if (typeof value === "string") expect(value.trim()).not.toBe("");
      else if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object") Object.values(value).forEach(visit);
    };
    visit(content);
  });

  it("accepts only publishable testimonials tied to featured work", () => {
    const testimonial = {
      id: "verified-recommendation",
      quote: "Verified recommendation text.",
      name: "Example Person",
      role: "Engineering Manager",
      company: "Example Company",
      permissionToPublish: true as const,
      workId: "devshark",
    };
    const localized = { ...content.en, testimonials: [testimonial] };

    expect(siteContentSchema.safeParse(localized).success).toBe(true);
    expect(validateLocaleParity(localized, { ...content.cs, testimonials: [testimonial] })).toEqual([]);
    expect(
      validateLocaleParity(
        { ...localized, testimonials: [{ ...testimonial, workId: "missing-work" }] },
        { ...content.cs, testimonials: [testimonial] },
      ),
    ).toContain("en: testimonial verified-recommendation must reference featured work");
    expect(siteContentSchema.safeParse({
      ...localized,
      testimonials: [{ ...testimonial, permissionToPublish: false }],
    }).success).toBe(false);
  });
});
