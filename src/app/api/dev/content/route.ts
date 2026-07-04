import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_PATH = path.join(process.cwd(), "src/content/site-content.json");

// Dev-only: persists edits from /dev back into site-content.json, which
// hot-reloads the site. In production this route does not exist (404).
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const body = await req.json();
  const looksValid =
    body &&
    typeof body === "object" &&
    body.hero &&
    Array.isArray(body.projects) &&
    Array.isArray(body.experience) &&
    Array.isArray(body.education) &&
    body.contact;
  if (!looksValid) {
    return Response.json({ error: "Malformed content" }, { status: 400 });
  }

  await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n");
  return Response.json({ ok: true });
}
