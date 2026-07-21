"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import type { Locale, SiteContent } from "@/lib/content-schema";

type JsonObject = Record<string, unknown>;

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
  const isAsset = (fieldKey === "src" || fieldKey === "logo") && value.startsWith("/");
  const multiline = value.length > 100 || ["body", "summary", "description", "supporting", "subheadline"].includes(fieldKey);
  const contextualLabel = path.map(labelFor).join(" ");

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.set("file", file);
    form.set("dir", uploadDirectory(path));
    const response = await fetch("/api/dev/upload", { method: "POST", body: form });
    const result = await response.json();
    setUploading(false);
    if (response.ok && result.path) onChange(result.path);
    else window.alert(result.error ?? "Upload failed");
  }

  return (
    <div className="block">
      <label htmlFor={fieldId} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500">{labelFor(fieldKey)}</label>
      {isAsset ? (
        <div className="mb-2 flex items-center gap-3">
          <span className="relative h-16 w-24 overflow-hidden rounded border border-zinc-800 bg-zinc-900">
            <Image src={value} alt="" fill sizes="96px" className="object-contain" />
          </span>
          <label htmlFor={uploadId} className="cursor-pointer rounded border border-zinc-700 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-zinc-500">
            {uploading ? "uploading…" : "replace image"}
            <input id={uploadId} aria-label={`Replace ${contextualLabel} image`} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => upload(event.target.files?.[0])} />
          </label>
        </div>
      ) : null}
      {multiline ? (
        <textarea id={fieldId} value={value} rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))} onChange={(event) => onChange(event.target.value)} className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm leading-6 text-zinc-200" />
      ) : (
        <input id={fieldId} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200" />
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
      <label className="flex items-center gap-3 text-sm text-zinc-300">
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
        {labelFor(fieldKey)}
      </label>
    );
  }
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "string")) {
      return (
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500">{labelFor(fieldKey)} (one per line)</span>
          <textarea value={value.join("\n")} rows={Math.min(10, Math.max(3, value.length))} onChange={(event) => onChange(event.target.value.split("\n").filter(Boolean))} className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm leading-6 text-zinc-200" />
        </label>
      );
    }
    return (
      <fieldset className="space-y-3 rounded border border-zinc-800 p-3">
        <legend className="px-1 font-mono text-xs text-emerald-400">{labelFor(fieldKey)}</legend>
        {value.map((item, index) => (
          <details key={`${titleFor(item, index)}-${index}`} open={value.length < 5} className="rounded border border-zinc-800 bg-zinc-900/40">
            <summary className="cursor-pointer px-3 py-2 text-sm text-zinc-300">{titleFor(item, index)}</summary>
            <div className="space-y-3 border-t border-zinc-800 p-3">
              <ValueEditor fieldKey={String(index)} path={[...path, String(index)]} value={item} onChange={(next) => onChange(value.map((entry, itemIndex) => itemIndex === index ? next : entry))} />
              <div className="flex gap-4">
                <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="text-xs text-red-400 underline underline-offset-4">remove</button>
                <button type="button" onClick={() => onChange([...value.slice(0, index + 1), structuredClone(item), ...value.slice(index + 1)])} className="text-xs text-zinc-400 underline underline-offset-4">duplicate</button>
              </div>
            </div>
          </details>
        ))}
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

export default function DevEditor({ initial }: { initial: Record<Locale, SiteContent> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [allContent, setAllContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const content = allContent[locale];
  const json = useMemo(() => JSON.stringify(content, null, 2), [content]);

  function update(next: unknown) {
    setAllContent((current) => ({ ...current, [locale]: next as SiteContent }));
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    const response = await fetch(`/api/dev/content?locale=${locale}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(response.ok ? "saved" : "error");
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      window.alert(result.error ?? "Save failed");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-32 pt-12 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-zinc-800 pb-7">
        <div>
          <p className="font-mono text-xs text-emerald-400">local development only</p>
          <h1 className="mt-2 text-2xl font-semibold">Portfolio content editor</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Edit either locale, replace raster images, then save to the validated local JSON file. Structural changes must be mirrored in both languages.</p>
        </div>
        <div className="flex gap-2">
          {(["en", "cs"] as Locale[]).map((item) => (
            <button key={item} type="button" onClick={() => setLocale(item)} className={`min-h-11 rounded px-4 font-mono text-sm ${locale === item ? "bg-zinc-100 text-zinc-950" : "border border-zinc-700 text-zinc-300"}`}>{item.toUpperCase()}</button>
          ))}
        </div>
      </header>

      <div className="mt-8 space-y-4">
        {Object.entries(content).map(([key, value]) => (
          <details key={key} className="rounded-lg border border-zinc-800 bg-zinc-900/30" open={["hero", "work"].includes(key)}>
            <summary className="cursor-pointer px-5 py-4 font-mono text-sm text-zinc-200"><span className="text-emerald-400">$</span> edit {labelFor(key)}</summary>
            <div className="border-t border-zinc-800 p-5">
              <ValueEditor fieldKey={key} path={[key]} value={value} onChange={(next) => update({ ...content, [key]: next })} />
            </div>
          </details>
        ))}
      </div>

      <details className="mt-5 rounded-lg border border-zinc-800">
        <summary className="cursor-pointer px-5 py-4 font-mono text-sm text-zinc-300">advanced JSON</summary>
        <div className="border-t border-zinc-800 p-5">
          <textarea key={`${locale}-${json}`} defaultValue={json} rows={30} onBlur={(event) => { try { update(JSON.parse(event.target.value)); } catch { window.alert("Invalid JSON"); } }} className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-xs leading-5 text-zinc-300" />
        </div>
      </details>

      <div className="sticky bottom-4 mt-8 flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur">
        <p className="font-mono text-xs text-zinc-500">{status === "saved" ? `${locale.toUpperCase()} saved` : status === "error" ? "save failed" : "schema + parity checked on save"}</p>
        <button type="button" disabled={status === "saving"} onClick={save} className="min-h-11 rounded bg-emerald-400 px-5 text-sm font-semibold text-emerald-950 disabled:opacity-50">{status === "saving" ? "Saving…" : `Save ${locale.toUpperCase()}`}</button>
      </div>
    </main>
  );
}
