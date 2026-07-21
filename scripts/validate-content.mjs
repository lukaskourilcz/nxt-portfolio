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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${en.work.length} work items, ${en.experience.length} roles, and English/Czech parity.`);
