import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ALLOWED_UPLOAD_DIRS, devRequestDeniedResponse, devRouteMethodResponse, MAX_IMAGE_DIMENSION, MAX_UPLOAD_BYTES, MAX_UPLOAD_REQUEST_BYTES, safeAssetBase } from "@/lib/dev-security";

export const runtime = "nodejs";

export const GET = devRouteMethodResponse;
export const PUT = devRouteMethodResponse;
export const PATCH = devRouteMethodResponse;
export const DELETE = devRouteMethodResponse;
export const OPTIONS = devRouteMethodResponse;

export async function POST(request: Request) {
  const denied = devRequestDeniedResponse(request);
  if (denied) return denied;

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_UPLOAD_REQUEST_BYTES) {
    return Response.json({ error: "Upload request is too large" }, { status: 413 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const dir = String(form.get("dir") ?? "uploads");
    if (!(file instanceof Blob) || typeof (file as File).name !== "string") {
      return Response.json({ error: "No image was provided" }, { status: 400 });
    }
    const uploadedFile = file as File;
    if (!ALLOWED_UPLOAD_DIRS.has(dir)) return Response.json({ error: "Invalid upload directory" }, { status: 400 });
    if (uploadedFile.size > MAX_UPLOAD_BYTES) return Response.json({ error: "Image exceeds the 5 MB limit" }, { status: 413 });

    const input = Buffer.from(await uploadedFile.arrayBuffer());
    const image = sharp(input, { failOn: "error", limitInputPixels: 40_000_000 });
    const metadata = await image.metadata();
    if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
      return Response.json({ error: "Only decodable PNG, JPEG, and WebP images are allowed" }, { status: 415 });
    }
    if (!metadata.width || !metadata.height || metadata.width > MAX_IMAGE_DIMENSION || metadata.height > MAX_IMAGE_DIMENSION) {
      return Response.json({ error: "Image dimensions are invalid or too large" }, { status: 400 });
    }

    const output = await image.rotate().webp({ quality: 82, effort: 4 }).toBuffer();
    const name = `${safeAssetBase(uploadedFile.name)}-${randomUUID().slice(0, 12)}.webp`;
    const publicDir = path.resolve(process.cwd(), "public");
    const targetDir = path.resolve(publicDir, dir);
    if (!targetDir.startsWith(`${publicDir}${path.sep}`)) return Response.json({ error: "Invalid upload path" }, { status: 400 });
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(path.join(targetDir, name), output, { flag: "wx" });
    return Response.json({ path: `/${dir}/${name}` });
  } catch {
    return Response.json({ error: "The image could not be decoded or saved" }, { status: 400 });
  }
}
