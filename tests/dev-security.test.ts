import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";
import { ALLOWED_UPLOAD_DIRS, MAX_CONTENT_BYTES, MAX_UPLOAD_BYTES, safeAssetBase } from "@/lib/dev-security";

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
