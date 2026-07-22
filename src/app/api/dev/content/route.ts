import { randomUUID } from "node:crypto";
import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { siteContentSchema, validateLocaleParity, type Locale, type SiteContent } from "@/lib/content-schema";
import { contentFilename, devRequestDeniedResponse, devRouteMethodResponse, MAX_CONTENT_BYTES } from "@/lib/dev-security";

export const runtime = "nodejs";

export const GET = devRouteMethodResponse;
export const PUT = devRouteMethodResponse;
export const PATCH = devRouteMethodResponse;
export const DELETE = devRouteMethodResponse;
export const OPTIONS = devRouteMethodResponse;

const bilingualContentSchema = z.object({
  en: siteContentSchema,
  cs: siteContentSchema,
}).superRefine((value, context) => {
  if (value.en.locale !== "en") context.addIssue({ code: "custom", path: ["en", "locale"], message: "Expected English content" });
  if (value.cs.locale !== "cs") context.addIssue({ code: "custom", path: ["cs", "locale"], message: "Expected Czech content" });
});

function contentPath(locale: Locale): string {
  return path.join(process.cwd(), "src/content", contentFilename(locale));
}

async function writeBilingualContent(content: Record<Locale, SiteContent>) {
  const transactionId = randomUUID();
  const locales: Locale[] = ["en", "cs"];
  const staged = new Map<Locale, string>();
  const backups = new Map<Locale, string>();

  try {
    for (const locale of locales) {
      const target = contentPath(locale);
      const temporary = path.join(path.dirname(target), `.${contentFilename(locale)}.${transactionId}.tmp`);
      const backup = path.join(path.dirname(target), `.${contentFilename(locale)}.${transactionId}.bak`);
      await fs.writeFile(temporary, `${JSON.stringify(content[locale], null, 2)}\n`, { encoding: "utf8", flag: "wx" });
      await fs.copyFile(target, backup, constants.COPYFILE_EXCL);
      staged.set(locale, temporary);
      backups.set(locale, backup);
    }

    const replaced: Locale[] = [];
    try {
      for (const locale of locales) {
        await fs.rename(staged.get(locale)!, contentPath(locale));
        replaced.push(locale);
      }
    } catch (error) {
      for (const locale of replaced) await fs.rename(backups.get(locale)!, contentPath(locale));
      throw error;
    }
  } finally {
    await Promise.all(
      [...staged.values(), ...backups.values()].map((file) => fs.rm(file, { force: true }))
    );
  }
}

export async function POST(request: Request) {
  const denied = devRequestDeniedResponse(request);
  if (denied) return denied;

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_CONTENT_BYTES) {
    return Response.json({ error: "Content request is too large" }, { status: 413 });
  }

  try {
    const bytes = Buffer.from(await request.arrayBuffer());
    if (bytes.byteLength > MAX_CONTENT_BYTES) {
      return Response.json({ error: "Content request is too large" }, { status: 413 });
    }

    let json: unknown;
    try {
      json = JSON.parse(bytes.toString("utf8"));
    } catch {
      return Response.json({ error: "Malformed JSON" }, { status: 400 });
    }

    const result = bilingualContentSchema.safeParse(json);
    if (!result.success) {
      const issue = result.error.issues[0];
      return Response.json({ error: `${issue.path.join(".") || "content"}: ${issue.message}` }, { status: 400 });
    }

    const parityErrors = validateLocaleParity(result.data.en, result.data.cs);
    if (parityErrors.length) return Response.json({ error: parityErrors.join("; ") }, { status: 400 });

    await writeBilingualContent(result.data);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to validate or save content" }, { status: 500 });
  }
}
