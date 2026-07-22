import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";
import { getAllContent } from "@/lib/content";
import { ALLOWED_UPLOAD_DIRS, isTrustedDevRequest, MAX_CONTENT_BYTES, MAX_UPLOAD_BYTES, safeAssetBase } from "@/lib/dev-security";
import { POSTHOG_EU_HOST, resolvePostHogHost } from "@/lib/site";

function uploadRequest(file: Blob, filename: string, dir = "uploads") {
  const form = new FormData();
  form.set("file", file, filename);
  form.set("dir", dir);
  return new Request("http://localhost/api/dev/upload", { method: "POST", body: form });
}

describe("development editor security", () => {
  it("normalizes filenames without path components", () => {
    expect(safeAssetBase("../../My portrait (final).PNG")).toBe("my-portrait-final");
  });

  it("keeps the upload directory allowlist narrow", () => {
    expect([...ALLOWED_UPLOAD_DIRS]).toEqual(["projects", "logos", "education", "uploads"]);
    expect(ALLOWED_UPLOAD_DIRS.has("../src")).toBe(false);
  });

  it("accepts development mutations only from the same loopback origin", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isTrustedDevRequest(new Request("http://localhost/api/dev/content"))).toBe(true);
    expect(isTrustedDevRequest(new Request("http://127.0.0.1/api/dev/content", { headers: { origin: "http://127.0.0.1" } }))).toBe(true);
    expect(isTrustedDevRequest(new Request("http://localhost/api/dev/content", { headers: { origin: "https://example.com" } }))).toBe(false);
    expect(isTrustedDevRequest(new Request("http://192.168.1.50/api/dev/content"))).toBe(false);
    vi.unstubAllEnvs();
  });

  it("keeps optional analytics on the documented EU endpoint", () => {
    expect(resolvePostHogHost()).toBe(POSTHOG_EU_HOST);
    expect(resolvePostHogHost(POSTHOG_EU_HOST)).toBe(POSTHOG_EU_HOST);
    expect(() => resolvePostHogHost("https://example.com")).toThrow(/must remain/);
  });

  it("returns 404 from the content route outside development", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { POST } = await import("@/app/api/dev/content/route");
    const response = await POST(new Request("http://localhost/api/dev/content?locale=en", { method: "POST", body: "{}" }));
    expect(response.status).toBe(404);
    vi.unstubAllEnvs();
  });

  it("returns 404 from unsupported API methods outside development", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const [{ GET: contentGet }, { GET: uploadGet }] = await Promise.all([
      import("@/app/api/dev/content/route"),
      import("@/app/api/dev/upload/route"),
    ]);
    expect((await contentGet()).status).toBe(404);
    expect((await uploadGet()).status).toBe(404);
    vi.unstubAllEnvs();
  });

  it("rejects oversized content before parsing", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/content/route");
    const response = await POST(new Request("http://localhost/api/dev/content?locale=en", { method: "POST", headers: { "content-length": String(MAX_CONTENT_BYTES + 1) }, body: "{}" }));
    expect(response.status).toBe(413);
    vi.unstubAllEnvs();
  });

  it("rejects malformed JSON content", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/content/route");
    const response = await POST(new Request("http://localhost/api/dev/content?locale=en", { method: "POST", body: "{" }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Malformed JSON" });
    vi.unstubAllEnvs();
  });

  it("rejects an untrusted development origin", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/content/route");
    const response = await POST(new Request("http://localhost/api/dev/content", {
      method: "POST",
      headers: { origin: "https://example.com" },
      body: "{}",
    }));
    expect(response.status).toBe(403);
    vi.unstubAllEnvs();
  });

  it("validates both locales before a structural save", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/content/route");
    const content = structuredClone(getAllContent());
    content.en.work.push(structuredClone(content.en.work[0]));
    const response = await POST(new Request("http://localhost/api/dev/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    }));
    expect(response.status).toBe(400);
    expect((await response.json() as { error: string }).error).toMatch(/structures differ|duplicate work id/);
    vi.unstubAllEnvs();
  });

  it("rejects MIME-spoofed and oversized uploads", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/upload/route");
    const spoofed = await POST(uploadRequest(new Blob(["not an image"], { type: "image/png" }), "fake.png"));
    const oversized = await POST(uploadRequest(new Blob([new Uint8Array(MAX_UPLOAD_BYTES + 1)], { type: "image/png" }), "large.png"));
    expect(spoofed.status).toBe(400);
    expect(oversized.status).toBe(413);
    vi.unstubAllEnvs();
  });

  it("decodes and normalizes valid uploads without overwriting", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { POST } = await import("@/app/api/dev/upload/route");
    const source = await fs.readFile(path.join(process.cwd(), "public/profile.png"));
    const response = await POST(uploadRequest(new Blob([source], { type: "image/png" }), "Profile Final.PNG"));
    const result = await response.json() as { path: string };
    expect(response.status).toBe(200);
    expect(result.path).toMatch(/^\/uploads\/profile-final-[a-f0-9-]+\.webp$/);

    const outputPath = path.join(process.cwd(), "public", result.path);
    try {
      const metadata = await sharp(outputPath).metadata();
      expect(metadata.format).toBe("webp");
      expect(metadata.orientation).toBeUndefined();
    } finally {
      await fs.rm(outputPath, { force: true });
    }
    vi.unstubAllEnvs();
  });
});
