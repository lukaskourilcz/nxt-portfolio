import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const schemaUrl = pathToFileURL(path.join(root, "src/lib/content-schema.ts"));
const { siteContentSchema, validateLocaleParity } = await import(schemaUrl.href);

const readJson = async (name) =>
  JSON.parse(await fs.readFile(path.join(root, "src/content", name), "utf8"));

const en = siteContentSchema.parse(await readJson("site-content.json"));
const cs = siteContentSchema.parse(await readJson("site-content.cs.json"));
const errors = validateLocaleParity(en, cs);

function collectAssetPaths(value) {
  if (Array.isArray(value)) return value.flatMap((item) => collectAssetPaths(item));
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([childKey, child]) => {
    if ((childKey === "src" || childKey === "logo") && typeof child === "string") return [child];
    return collectAssetPaths(child, childKey);
  });
}

const assetPaths = [...new Set([...collectAssetPaths(en), ...collectAssetPaths(cs)])];
const allowedAssetRoots = ["/profile.png", "/projects/", "/education/", "/logos/", "/uploads/"];

for (const assetPath of assetPaths) {
  if (assetPath.includes("..") || !allowedAssetRoots.some((allowed) => assetPath === allowed || assetPath.startsWith(allowed))) {
    errors.push(`Content asset uses a disallowed path: ${assetPath}`);
    continue;
  }
  try {
    await fs.access(path.join(root, "public", assetPath));
  } catch {
    errors.push(`Content asset does not exist: ${assetPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${en.work.length} work items, ${en.experience.length} roles, ${assetPaths.length} assets, and English/Czech parity.`);
