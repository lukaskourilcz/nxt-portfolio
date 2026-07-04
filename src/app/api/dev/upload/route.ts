import fs from "node:fs/promises";
import path from "node:path";

const ALLOWED_DIRS = new Set(["projects", "logos", "education", "uploads"]);
const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);

// Dev-only: saves an uploaded image into /public/<dir>/ and returns its
// public path. In production this route does not exist (404).
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const dir = String(form.get("dir") ?? "uploads");

  if (!(file instanceof File)) {
    return Response.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED_DIRS.has(dir)) {
    return Response.json({ error: "Bad target dir" }, { status: 400 });
  }
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return Response.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const base = path
    .basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const name = `${base || "image"}-${Date.now()}${ext}`;

  const targetDir = path.join(process.cwd(), "public", dir);
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(
    path.join(targetDir, name),
    Buffer.from(await file.arrayBuffer())
  );

  return Response.json({ path: `/${dir}/${name}` });
}
