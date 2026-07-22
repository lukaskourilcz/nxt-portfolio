"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Locale, SiteContent } from "@/lib/content-schema";

type JsonObject = Record<string, unknown>;
type SaveStatus = "idle" | "saving" | "saved" | "error";

function titleFor(value: unknown, index: number): string {
  if (value && typeof value === "object") {
    const item = value as JsonObject;
    for (const key of ["title", "name", "company", "id", "slug"]) {
      if (typeof item[key] === "string") return String(item[key]);
    }
  }
  return `Item ${index + 1}`;
}

function labelFor(key: string): string {
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ");
}

function uploadDirectory(path: string[]): string {
  const joined = path.join(".");
  if (joined.includes("education")) return "education";
  if (joined.includes("experience")) return "logos";
  if (joined.includes("work")) return "projects";
  return "uploads";
}

function StringField({
  fieldKey,
  path,
  value,
  onChange,
}: {
  fieldKey: string;
  path: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const fieldId = useId();
  const uploadId = useId();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const isAsset = (fieldKey === "src" || fieldKey === "logo") && value.startsWith("/");
  const multiline = value.length > 100 || ["body", "summary", "description", "supporting", "subheadline"].includes(fieldKey);
  const contextualLabel = path.map(labelFor).join(" ");

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const form = new FormData();
    form.set("file", file);
    form.set("dir", uploadDirectory(path));

    try {
      const response = await fetch("/api/dev/upload", { method: "POST", body: form });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.path) onChange(result.path);
      else setUploadError(result.error ?? "Upload failed");
    } catch {
      setUploadError("Upload failed. Check that the local development server is available.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{labelFor(fieldKey)}</label>
      {isAsset ? (
        <div className="mb-3 grid gap-3 sm:grid-cols-[6rem_1fr] sm:items-center">
          <span className="relative h-16 w-24 overflow-hidden rounded-md border border-edge bg-surface">
            <Image src={value} alt="" fill sizes="96px" className="object-contain" />
          </span>
          <div>
            <label htmlFor={uploadId} className="mb-1 block text-xs text-secondary">Replace {contextualLabel}</label>
            <input
              id={uploadId}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              disabled={uploading}
              onChange={(event) => upload(event.target.files?.[0])}
              className="block min-h-11 w-full rounded-md border border-edge-strong bg-canvas text-xs text-secondary file:mr-3 file:min-h-11 file:border-0 file:border-r file:border-edge file:bg-subtle file:px-3 file:text-xs file:text-primary hover:file:bg-interactive disabled:opacity-50"
            />
            {uploading ? <p className="mt-1 text-xs text-info" role="status">Decoding and normalizing image…</p> : null}
            {uploadError ? <p className="mt-1 text-xs text-danger" role="alert">{uploadError}</p> : null}
          </div>
        </div>
      ) : null}
      {multiline ? (
        <textarea id={fieldId} value={value} rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))} onChange={(event) => onChange(event.target.value)} className="w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm leading-6 text-secondary" />
      ) : (
        <input id={fieldId} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm text-secondary" />
      )}
    </div>
  );
}

function ValueEditor({
  fieldKey,
  path,
  value,
  onChange,
}: {
  fieldKey: string;
  path: string[];
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (typeof value === "string") {
    return <StringField fieldKey={fieldKey} path={path} value={value} onChange={onChange} />;
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex min-h-11 items-center gap-3 text-sm text-secondary">
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
        {labelFor(fieldKey)}
      </label>
    );
  }
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return (
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{labelFor(fieldKey)} (one per line)</span>
          <textarea value={value.join("\n")} rows={Math.min(10, Math.max(3, value.length))} onChange={(event) => onChange(event.target.value.split("\n").filter(Boolean))} className="w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm leading-6 text-secondary" />
        </label>
      );
    }
    return (
      <fieldset className="space-y-3 border border-edge p-3">
        <legend className="px-1 font-mono text-xs text-accent">{labelFor(fieldKey)}</legend>
        {value.map((item, index) => {
          const itemTitle = titleFor(item, index);
          return (
            <details key={`${itemTitle}-${index}`} open={value.length < 5} className="border border-edge bg-subtle">
              <summary className="min-h-11 px-3 py-3 text-sm text-secondary">{itemTitle}</summary>
              <div className="space-y-3 border-t border-edge p-3">
                <ValueEditor fieldKey={String(index)} path={[...path, String(index)]} value={item} onChange={(next) => onChange(value.map((entry, itemIndex) => itemIndex === index ? next : entry))} />
                <div className="flex flex-wrap gap-4 border-t border-edge pt-3">
                  <button type="button" aria-label={`Remove ${itemTitle}`} onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="min-h-11 text-xs text-danger underline underline-offset-4">remove</button>
                  <button type="button" aria-label={`Duplicate ${itemTitle}`} onClick={() => onChange([...value.slice(0, index + 1), structuredClone(item), ...value.slice(index + 1)])} className="min-h-11 text-xs text-secondary underline underline-offset-4">duplicate</button>
                </div>
              </div>
            </details>
          );
        })}
      </fieldset>
    );
  }
  if (value && typeof value === "object") {
    const object = value as JsonObject;
    return (
      <div className="space-y-4">
        {Object.entries(object).map(([key, child]) => (
          <ValueEditor
            key={key}
            fieldKey={key}
            path={[...path, key]}
            value={child}
            onChange={(next) => onChange({ ...object, [key]: next })}
          />
        ))}
      </div>
    );
  }
  return null;
}

function AdvancedJson({ locale, value, onApply }: { locale: Locale; value: SiteContent; onApply: (value: SiteContent) => void }) {
  const editorId = useId();
  const errorId = useId();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
    setError("");
  }, [locale, value]);

  function apply() {
    try {
      onApply(JSON.parse(draft));
      setError("");
    } catch {
      setError("Invalid JSON. Fix the syntax before applying it to the form.");
      window.requestAnimationFrame(() => editorRef.current?.focus());
    }
  }

  return (
    <div className="border-t border-edge p-5">
      <label htmlFor={editorId} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        JSON document / {locale.toUpperCase()}
      </label>
      <textarea ref={editorRef} id={editorId} value={draft} onChange={(event) => setDraft(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} rows={30} className="w-full rounded-md border border-edge bg-canvas p-4 font-mono text-xs leading-5 text-secondary" />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id={errorId} className="text-xs text-danger" role={error ? "alert" : undefined}>{error}</p>
        <button type="button" onClick={apply} className="min-h-11 rounded-md border border-edge-strong px-4 text-sm text-primary hover:bg-interactive">Apply JSON to {locale.toUpperCase()}</button>
      </div>
    </div>
  );
}

export default function DevEditor({ initial }: { initial: Record<Locale, SiteContent> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [allContent, setAllContent] = useState(initial);
  const [dirty, setDirty] = useState<Record<Locale, boolean>>({ en: false, cs: false });
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const content = allContent[locale];
  const hasChanges = dirty.en || dirty.cs;
  const sectionKeys = useMemo(() => Object.keys(content), [content]);

  useEffect(() => {
    if (!hasChanges) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasChanges]);

  function update(next: unknown) {
    setAllContent((current) => ({ ...current, [locale]: next as SiteContent }));
    setDirty((current) => ({ ...current, [locale]: true }));
    setStatus("idle");
    setError("");
  }

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/dev/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allContent),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        setError(result.error ?? "Save failed");
        requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }
      setStatus("saved");
      setDirty({ en: false, cs: false });
    } catch {
      setStatus("error");
      setError("Save failed. Check that the local development server is available.");
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  return (
    <main className="page-shell pb-32 pt-10">
      <header className="grid gap-6 border-b border-edge pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-xs text-accent">local development only / bilingual transaction</p>
          <h1 className="mt-2 text-2xl font-semibold text-primary">Portfolio content editor</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary">Edit either locale, replace supported raster images, then validate and save both content files together. Structural changes must be mirrored before saving.</p>
        </div>
        <div className="flex gap-2" aria-label="Content locale">
          {(["en", "cs"] as Locale[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={locale === item}
              onClick={() => setLocale(item)}
              className={`relative min-h-11 rounded-md px-4 font-mono text-sm ${locale === item ? "bg-primary text-canvas" : "border border-edge-strong text-secondary hover:bg-interactive"}`}
            >
              {item.toUpperCase()}
              {dirty[item] ? <span aria-label="unsaved changes" className="absolute right-1 top-1 h-1.5 w-1.5 bg-warning" /> : null}
            </button>
          ))}
        </div>
      </header>

      <nav className="mt-5 border-b border-edge pb-5" aria-label="Editor sections">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {sectionKeys.map((key) => (
            <li key={key}><a href={`#editor-${key}`} className="editorial-link inline-flex min-h-11 items-center font-mono text-xs">{labelFor(key)}</a></li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-4">
        {Object.entries(content).map(([key, value]) => (
          <details id={`editor-${key}`} key={key} className="scroll-mt-4 border border-edge bg-subtle" open={["hero", "work"].includes(key)}>
            <summary className="min-h-12 px-5 py-4 font-mono text-sm text-secondary"><span className="text-accent">$</span> edit {labelFor(key)}</summary>
            <div className="border-t border-edge p-5">
              <ValueEditor fieldKey={key} path={[key]} value={value} onChange={(next) => update({ ...content, [key]: next })} />
            </div>
          </details>
        ))}
      </div>

      <details className="mt-5 border border-edge">
        <summary className="min-h-12 px-5 py-4 font-mono text-sm text-secondary">advanced JSON / {locale.toUpperCase()}</summary>
        <AdvancedJson locale={locale} value={content} onApply={update} />
      </details>

      <div className="sticky bottom-3 mt-8 grid gap-3 rounded-md border border-edge-strong bg-[var(--overlay)] p-4 shadow-2xl backdrop-blur sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          {error ? (
            <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-md border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
              <p className="font-semibold">Content was not saved</p>
              <p className="mt-1 break-words text-xs leading-5">{error}</p>
            </div>
          ) : (
            <p className="font-mono text-xs text-muted" role="status" aria-live="polite">
              {status === "saved" ? "English and Czech content saved" : hasChanges ? "Unsaved local changes · schema and parity checked on save" : "No unsaved changes"}
            </p>
          )}
        </div>
        <button type="button" disabled={status === "saving" || !hasChanges} onClick={save} className="min-h-11 rounded-md bg-accent px-5 text-sm font-semibold text-canvas hover:bg-accent-hover disabled:opacity-50">
          {status === "saving" ? "Validating and saving…" : "Save both locales"}
        </button>
      </div>
    </main>
  );
}
