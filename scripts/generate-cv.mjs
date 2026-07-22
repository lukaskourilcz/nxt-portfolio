import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const root = process.cwd();
const contentPath = path.join(root, "src/content/site-content.json");
const outputDirectory = path.join(root, "output/pdf");
const outputPath = path.join(
  outputDirectory,
  "lukas-kouril-senior-software-engineer-cv.pdf",
);
const publicPath = path.join(
  root,
  "public/pdf/lukas-kouril-senior-software-engineer-cv.pdf",
);
const temporaryDirectory = path.join(root, "tmp/pdfs");
const temporaryHtml = path.join(temporaryDirectory, "cv.html");
const shouldPublish = process.argv.includes("--publish");

const content = JSON.parse(await fs.readFile(contentPath, "utf8"));
const engineering = content.experience.filter(
  (entry) => entry.phase === "engineering",
);
const earlier = content.experience.filter((entry) => entry.phase === "earlier");
const devShark = content.work.find((entry) => entry.id === "devshark");

if (!devShark || engineering.length === 0 || earlier.length === 0) {
  throw new Error("CV source content is incomplete.");
}

const normalize = (value) =>
  String(value)
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("‑", "-");

const escapeHtml = (value) =>
  normalize(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const experienceEntry = (entry, contributionCount) => `
  <article class="experience-entry">
    <header class="experience-heading">
      <div>
        <h3>${escapeHtml(entry.company)}</h3>
        <p class="role">${escapeHtml(entry.role)}</p>
      </div>
      <p class="meta">${escapeHtml(entry.period)}<br>${escapeHtml(entry.location)}</p>
    </header>
    <p>${escapeHtml(entry.summary)}</p>
    <ul>
      ${entry.contributions
        .slice(0, contributionCount)
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}
    </ul>
  </article>`;

const capabilityGroups = content.capabilities.groups
  .map(
    (group) => `
      <section class="sidebar-section">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${group.items.map(escapeHtml).join(" · ")}</p>
      </section>`,
  )
  .join("");

const education = content.education
  .map(
    (entry) => `
      <article class="education-entry">
        <h3>${escapeHtml(entry.name)}</h3>
        <p>${escapeHtml(entry.field)}</p>
        <p class="meta">${escapeHtml(entry.period)}</p>
      </article>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Lukas Kouril - Senior Software Engineer CV</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        color: #172330;
        background: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 8.4pt;
        line-height: 1.42;
      }
      a { color: inherit; text-decoration: none; }
      .page {
        position: relative;
        width: 210mm;
        height: 297mm;
        overflow: hidden;
        padding: 13mm 14mm 12mm;
        page-break-after: always;
      }
      .page:last-child { page-break-after: auto; }
      .masthead {
        margin: -13mm -14mm 10mm;
        padding: 14mm 14mm 10mm;
        color: #f5f8f7;
        background: #08131d;
        border-bottom: 1.8mm solid #74d59a;
      }
      .masthead-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 62mm;
        gap: 12mm;
        align-items: end;
      }
      .eyebrow, .section-label, .meta, .page-number {
        font-family: "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace;
        letter-spacing: .06em;
      }
      .eyebrow {
        margin: 0 0 3mm;
        color: #74d59a;
        font-size: 7.4pt;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 29pt;
        line-height: .96;
        letter-spacing: -.045em;
      }
      .title {
        margin: 3mm 0 0;
        color: #dce5e3;
        font-size: 12pt;
        font-weight: 600;
      }
      .profile {
        margin: 0;
        color: #b9c6c5;
        font-size: 8.3pt;
        line-height: 1.5;
      }
      .contact-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 2.2mm 6mm;
        margin-top: 8mm;
        padding-top: 4mm;
        border-top: .2mm solid #35505a;
        color: #dce5e3;
        font-size: 7.7pt;
      }
      .contact-strip a::after { content: " ↗"; color: #74d59a; }
      h2 {
        margin: 0;
        color: #08131d;
        font-size: 15pt;
        line-height: 1.1;
        letter-spacing: -.025em;
      }
      h3, p { margin-top: 0; }
      .section-heading {
        display: grid;
        grid-template-columns: 27mm 1fr;
        gap: 5mm;
        align-items: baseline;
        margin: 0 0 5mm;
        padding-bottom: 2.5mm;
        border-bottom: .3mm solid #172330;
      }
      .section-label {
        color: #387a56;
        font-size: 7.2pt;
        text-transform: uppercase;
      }
      .experience-entry {
        margin-bottom: 4.5mm;
        padding-bottom: 4mm;
        border-bottom: .2mm solid #d9e0de;
        break-inside: avoid;
      }
      .experience-entry:last-child { margin-bottom: 0; border-bottom: 0; }
      .experience-heading {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 50mm;
        gap: 6mm;
        margin-bottom: 1.4mm;
      }
      .experience-heading h3 {
        margin: 0;
        color: #08131d;
        font-size: 10.2pt;
      }
      .role { margin: .2mm 0 0; color: #387a56; font-weight: 700; }
      .meta { color: #53626d; font-size: 6.9pt; line-height: 1.45; }
      .experience-heading .meta { margin: 0; text-align: right; }
      .experience-entry > p { margin-bottom: 1.3mm; color: #344450; }
      ul { margin: 0; padding-left: 4mm; }
      li { margin-bottom: .6mm; padding-left: .5mm; }
      li::marker { color: #4e9f6c; }
      .page-two-header {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 8mm;
        padding-bottom: 4mm;
        border-bottom: 1.2mm solid #74d59a;
      }
      .page-two-header h1 { font-size: 19pt; }
      .page-two-header p { margin: 0; color: #53626d; }
      .two-column {
        display: grid;
        grid-template-columns: minmax(0, 1.65fr) minmax(0, .85fr);
        gap: 10mm;
      }
      .sidebar {
        padding-left: 6mm;
        border-left: .3mm solid #9cb0aa;
      }
      .compact .experience-entry { margin-bottom: 4mm; padding-bottom: 3.5mm; }
      .compact .experience-heading { grid-template-columns: minmax(0, 1fr) 30mm; }
      .compact .experience-entry ul { display: none; }
      .ownership {
        margin-top: 7mm;
        padding: 5mm 0;
        border-top: .6mm solid #172330;
        border-bottom: .2mm solid #9cb0aa;
      }
      .ownership h3 { margin: 1.5mm 0; font-size: 12pt; }
      .ownership p { margin-bottom: 0; }
      .sidebar-title {
        margin: 0 0 4mm;
        color: #08131d;
        font-size: 11pt;
      }
      .sidebar-section, .education-entry {
        margin-bottom: 5mm;
        padding-bottom: 4mm;
        border-bottom: .2mm solid #d9e0de;
      }
      .sidebar-section h3, .education-entry h3 {
        margin: 0 0 1mm;
        color: #387a56;
        font-size: 8.2pt;
      }
      .sidebar-section p, .education-entry p { margin-bottom: 1mm; }
      .footer {
        position: absolute;
        right: 14mm;
        bottom: 7mm;
        left: 14mm;
        display: flex;
        justify-content: space-between;
        padding-top: 2mm;
        border-top: .2mm solid #d9e0de;
        color: #65737c;
        font-size: 6.7pt;
      }
      .page-number { color: #387a56; }
    </style>
  </head>
  <body>
    <main>
      <section class="page" aria-labelledby="cv-name">
        <header class="masthead">
          <div class="masthead-grid">
            <div>
              <p class="eyebrow">Senior engineering / product responsibility</p>
              <h1 id="cv-name">Lukas Kouril</h1>
              <p class="title">Senior Software Engineer</p>
            </div>
            <p class="profile">${escapeHtml(content.hero.subheadline)} ${escapeHtml(content.hero.supporting)}</p>
          </div>
          <nav class="contact-strip" aria-label="Contact links">
            <a href="mailto:kouril.lukas@gmail.com">kouril.lukas@gmail.com</a>
            <a href="tel:+420737875367">+420 737 875 367</a>
            <a href="https://lukaskouril.dev">lukaskouril.dev</a>
            <a href="https://linkedin.com/in/lukas-kouril/">LinkedIn</a>
            <a href="https://github.com/lukaskourilcz">GitHub</a>
            <span>Prague, Czech Republic</span>
          </nav>
        </header>

        <section aria-labelledby="engineering-heading">
          <header class="section-heading">
            <p class="section-label">01 / experience</p>
            <h2 id="engineering-heading">Engineering experience</h2>
          </header>
          ${engineering
            .map((entry, index) => experienceEntry(entry, index < 3 ? 2 : 1))
            .join("")}
        </section>
        <footer class="footer"><span>lukaskouril.dev · Updated July 2026</span><span class="page-number">01 / 02</span></footer>
      </section>

      <section class="page" aria-labelledby="experience-beyond-code">
        <header class="page-two-header">
          <div><p class="eyebrow">Operational context / independent delivery</p><h1>Lukas Kouril</h1></div>
          <p>Senior Software Engineer · Prague</p>
        </header>
        <div class="two-column">
          <div>
            <section class="compact" aria-labelledby="experience-beyond-code">
              <header class="section-heading">
                <p class="section-label">02 / context</p>
                <h2 id="experience-beyond-code">Experience beyond code</h2>
              </header>
              ${earlier.map((entry) => experienceEntry(entry, 0)).join("")}
            </section>
            <section class="ownership" aria-labelledby="ownership-heading">
              <p class="section-label">03 / independent product</p>
              <h3 id="ownership-heading">${escapeHtml(devShark.title)}</h3>
              <p>${escapeHtml(devShark.summary)}</p>
            </section>
            <section class="ownership" aria-labelledby="working-principles-heading">
              <p class="section-label">04 / working principles</p>
              <h3 id="working-principles-heading">Boundaries, evidence, maintainability</h3>
              <p>Keep downstream complexity behind explicit contracts. Treat accessibility and testing as delivery requirements. Investigate failure modes, communicate tradeoffs, and validate AI-assisted work before it reaches people or repositories.</p>
            </section>
          </div>
          <aside class="sidebar" aria-label="Capabilities and education">
            <h2 class="sidebar-title">Core capabilities</h2>
            ${capabilityGroups}
            <section class="sidebar-section">
              <h3>Selected tools</h3>
              <p>${content.capabilities.additionalTools.map(escapeHtml).join(" · ")}</p>
            </section>
            <h2 class="sidebar-title">Education</h2>
            ${education}
            <section class="sidebar-section">
              <h3>Languages</h3>
              <p>Czech (native) · English · Spanish (B2)</p>
            </section>
          </aside>
        </div>
        <footer class="footer"><span>Detailed case studies: lukaskouril.dev/en#work</span><span class="page-number">02 / 02</span></footer>
      </section>
    </main>
  </body>
</html>`;

await fs.mkdir(outputDirectory, { recursive: true });
await fs.mkdir(temporaryDirectory, { recursive: true });
await fs.writeFile(temporaryHtml, html, "utf8");

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(`file://${temporaryHtml}`, { waitUntil: "load" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
} finally {
  await browser.close();
}

if (shouldPublish) {
  await fs.copyFile(outputPath, publicPath);
}

await fs.rm(temporaryHtml, { force: true });
console.log(`Generated ${path.relative(root, outputPath)}`);
if (shouldPublish) {
  console.log(`Published ${path.relative(root, publicPath)}`);
}
