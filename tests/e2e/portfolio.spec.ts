import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "cs"] as const) {
  test(`${locale} homepage is localized and accessible @a11y`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(serious).toEqual([]);
  });
}

test("flagship case study is static, localized, and accessible @a11y", async ({ page }) => {
  const response = await page.goto("/en/work/banking-modernization");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Online-banking modernization");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

test("language switch preserves the case-study path", async ({ page }) => {
  await page.goto("/en/work/devshark");
  await page.getByRole("link", { name: "Switch to Czech" }).click();
  await expect(page).toHaveURL(/\/cs\/work\/devshark$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
});

test("mobile navigation is keyboard-accessible", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/en");
  const trigger = page.locator('button[aria-controls="mobile-navigation"]');
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Experience", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("all localized flagship routes render", async ({ request }) => {
  for (const locale of ["en", "cs"]) {
    for (const slug of ["banking-modernization", "ersilia-ai-tooling", "devshark"]) {
      expect((await request.get(`/${locale}/work/${slug}`)).status()).toBe(200);
    }
  }
});

test("privacy pages are localized and accessible @a11y", async ({ page }) => {
  await page.goto("/cs/privacy");
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Soukromí");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

test("default route redirects without locale guessing", async ({ request }) => {
  const response = await request.get("/", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/en");
});

test("development surfaces return 404 in production", async ({ page, request }) => {
  expect((await page.goto("/dev"))?.status()).toBe(404);
  expect((await request.get("/api/dev/content")).status()).toBe(404);
  expect((await request.post("/api/dev/content?locale=en", { data: {} })).status()).toBe(404);
  expect((await request.get("/api/dev/upload")).status()).toBe(404);
  expect((await request.post("/api/dev/upload")).status()).toBe(404);
});

test("analytics stays absent when no key is configured", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('script[src*="posthog"]')).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Analytics preferences" })).toHaveCount(0);
});

test("content remains visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.getByText("Work where responsibility mattered")).toBeVisible();
});

test("unknown case-study slug returns 404", async ({ page }) => {
  const response = await page.goto("/en/work/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("does not exist");
});
