import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

for (const locale of ["en", "cs"] as const) {
  test(`${locale} homepage is localized and accessible @a11y`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoAxeViolations(page);
  });

  test(`${locale} privacy page is localized and accessible @a11y`, async ({ page }) => {
    await page.goto(`/${locale}/privacy`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoAxeViolations(page);
  });
}

for (const slug of ["banking-modernization", "ersilia-ai-tooling", "devshark"] as const) {
  test(`${slug} case study is static and accessible @a11y`, async ({ page }) => {
    const response = await page.goto(`/en/work/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoAxeViolations(page);
  });
}

test("language switch preserves case-study paths and homepage sections", async ({ page }) => {
  await page.goto("/en/work/devshark");
  await page.getByRole("link", { name: "Switch to Czech" }).click();
  await expect(page).toHaveURL(/\/cs\/work\/devshark$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");

  await page.goto("/en#experience");
  await page.getByRole("link", { name: "Switch to Czech" }).click();
  await expect(page).toHaveURL(/\/cs#experience$/);
});

test("mobile navigation restores focus after Escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/en");
  const trigger = page.locator('button[aria-controls="mobile-navigation"]');
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const experience = page.getByRole("link", { name: "Experience", exact: true });
  await experience.focus();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("critical routes reflow without horizontal overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ["/en", "/cs", "/en/work/banking-modernization", "/en/work/ersilia-ai-tooling", "/en/work/devshark", "/en/privacy"]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});

test("all localized flagship routes render", async ({ request }) => {
  for (const locale of ["en", "cs"]) {
    for (const slug of ["banking-modernization", "ersilia-ai-tooling", "devshark"]) {
      expect((await request.get(`/${locale}/work/${slug}`)).status()).toBe(200);
    }
  }
});

test("localized metadata exposes canonical and alternate routes", async ({ page }) => {
  await page.goto("/cs/work/ersilia-ai-tooling");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://lukaskouril.dev/cs/work/ersilia-ai-tooling");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://lukaskouril.dev/en/work/ersilia-ai-tooling");
});

test("default route redirects without locale guessing", async ({ request }) => {
  const response = await request.get("/", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/en");
});

test("development surfaces return 404 in production", async ({ page, request }) => {
  expect((await page.goto("/dev"))?.status()).toBe(404);
  expect((await request.get("/api/dev/content")).status()).toBe(404);
  expect((await request.post("/api/dev/content", { data: {} })).status()).toBe(404);
  expect((await request.get("/api/dev/upload")).status()).toBe(404);
  expect((await request.post("/api/dev/upload")).status()).toBe(404);
});

test("analytics stays absent when no key is configured", async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("posthog")) analyticsRequests.push(request.url());
  });
  await page.goto("/en");
  await expect(page.locator('script[src*="posthog"]')).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Analytics preferences" })).toHaveCount(0);
  expect(analyticsRequests).toEqual([]);
});

test("content remains visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.getByText("Work where responsibility mattered")).toBeVisible();
});

test("unknown case-study slug returns a localized 404", async ({ page }) => {
  const response = await page.goto("/en/work/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("does not exist");
});

test("critical routes do not emit browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of ["/en", "/cs", "/en/work/banking-modernization", "/en/work/ersilia-ai-tooling", "/en/work/devshark", "/en/privacy", "/cs/privacy"]) {
    await page.goto(route);
  }
  expect(errors).toEqual([]);
});
