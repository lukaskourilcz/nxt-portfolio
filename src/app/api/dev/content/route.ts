import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { localeSchema, siteContentSchema, validateLocaleParity, type Locale } from "@/lib/content-schema";
import { contentFilename, devRouteMethodResponse, isDevelopment, MAX_CONTENT_BYTES } from "@/lib/dev-security";

export const runtime = "nodejs";

export const GET = devRouteMethodResponse;
export const PUT = devRouteMethodResponse;
export const PATCH = devRouteMethodResponse;
export const DELETE = devRouteMethodResponse;
export const OPTIONS = devRouteMethodResponse;

async function readLocale(locale: Locale) {
  const file = path.join(process.cwd(), "src/content", contentFilename(locale));
  return siteContentSchema.parse(JSON.parse(await fs.readFile(file, "utf8")));
}

export async function POST(request: Request) {
  if (!isDevelopment()) return new Response(null, { status: 404 });
  const localeResult = localeSchema.safeParse(new URL(request.url).searchParams.get("locale"));
  if (!localeResult.success) return Response.json({ error: "Invalid locale" }, { status: 400 });

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_CONTENT_BYTES) return Response.json({ error: "Content request is too large" }, { status: 413 });

  try {
    const bytes = Buffer.from(await request.arrayBuffer());
    if (bytes.byteLength > MAX_CONTENT_BYTES) return Response.json({ error: "Content request is too large" }, { status: 413 });

    let json: unknown;
    try {
      json = JSON.parse(bytes.toString("utf8"));
    } catch {
      return Response.json({ error: "Malformed JSON" }, { status: 400 });
    }

    const result = siteContentSchema.safeParse(json);
    if (!result.success) {
      const issue = result.error.issues[0];
      return Response.json({ error: `${issue.path.join(".") || "content"}: ${issue.message}` }, { status: 400 });
    }
    if (result.data.locale !== localeResult.data) return Response.json({ error: "Locale does not match content" }, { status: 400 });

    const otherLocale: Locale = localeResult.data === "en" ? "cs" : "en";
    const other = await readLocale(otherLocale);
    const errors = localeResult.data === "en"
      ? validateLocaleParity(result.data, other)
      : validateLocaleParity(other, result.data);
    if (errors.length) return Response.json({ error: errors.join("; ") }, { status: 400 });

    const contentDir = path.join(process.cwd(), "src/content");
    const target = path.join(contentDir, contentFilename(localeResult.data));
    const temporary = path.join(contentDir, `.${contentFilename(localeResult.data)}.${randomUUID()}.tmp`);
    await fs.writeFile(temporary, `${JSON.stringify(result.data, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
    try {
      await fs.rename(temporary, target);
    } catch (error) {
      await fs.rm(temporary, { force: true });
      throw error;
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to validate or save content" }, { status: 500 });
  }
}
