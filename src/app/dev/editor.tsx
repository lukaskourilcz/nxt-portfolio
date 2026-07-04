"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";

/* ---------- small form primitives ---------- */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500";

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  );
}

// Edits a string[] as a textarea with one item per line.
function LinesArea({
  value,
  onChange,
  rows = 5,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value.join("\n")}
      rows={rows}
      onChange={(e) => onChange(e.target.value.split("\n"))}
      onBlur={(e) =>
        onChange(
          e.target.value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        )
      }
      className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
    />
  );
}

// Edits a string[] as comma-separated text (for short lists like tech/tags).
function CsvInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [text, setText] = useState(value.join(", "));
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(
          e.target.value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        );
      }}
      className={`${inputClass} font-mono text-xs`}
    />
  );
}

// Image path + preview + replace-by-upload. Uploads land in /public/<dir>/.
function ImageField({
  label,
  value,
  dir,
  onChange,
}: {
  label: string;
  value: string;
  dir: "projects" | "logos" | "education" | "uploads";
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("dir", dir);
      const res = await fetch("/api/dev/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.path) onChange(data.path);
      else alert(data.error ?? "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        {value ? (
          <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-md border border-zinc-700 bg-white">
            <Image
              src={value}
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </span>
        ) : (
          <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-zinc-700 font-mono text-[0.6rem] text-zinc-600">
            none
          </span>
        )}
        <div className="min-w-0 flex-1 space-y-1.5">
          <TextInput value={value} onChange={onChange} placeholder="/path/in/public.png" />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="rounded-md border border-zinc-700 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 disabled:opacity-50"
          >
            {busy ? "uploading…" : "upload replacement"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,.svg"
            className="hidden"
            onChange={upload}
          />
        </div>
      </div>
    </Field>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="rounded-md border border-zinc-800 bg-zinc-900/60" open>
      <summary className="cursor-pointer select-none px-5 py-4 font-mono text-sm text-zinc-200">
        <span className="text-emerald-400">$</span> edit {title}
      </summary>
      <div className="space-y-5 border-t border-zinc-800 p-5">{children}</div>
    </details>
  );
}

function ItemCard({
  heading,
  onRemove,
  children,
}: {
  heading: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-md border border-zinc-800 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="truncate font-mono text-xs text-zinc-400">{heading}</p>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
        >
          remove
        </button>
      </div>
      {children}
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-dashed border-zinc-700 px-3 py-2 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100"
    >
      + {label}
    </button>
  );
}

/* ---------- the editor ---------- */

export default function DevEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  // Clone-and-mutate helper so nested updates stay terse.
  function update(mutate: (draft: SiteContent) => void) {
    setContent((current) => {
      const draft = structuredClone(current);
      mutate(draft);
      return draft;
    });
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    try {
      const res = await fetch("/api/dev/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-16">
      <h1 className="font-mono text-lg text-zinc-100">
        <span className="text-emerald-400">$</span> vim portfolio-content
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Edits write to <code className="text-zinc-300">src/content/site-content.json</code>{" "}
        and hot-reload the site. Commit and push the changed file (plus any
        uploaded images) to deploy. This page only exists in dev mode.
      </p>

      <div className="mt-8 space-y-4">
        <SectionCard title="hero">
          <Field label="availability line">
            <TextInput
              value={content.hero.availability}
              onChange={(v) => update((d) => void (d.hero.availability = v))}
            />
          </Field>
          <Field label="eyebrow">
            <TextInput
              value={content.hero.eyebrow}
              onChange={(v) => update((d) => void (d.hero.eyebrow = v))}
            />
          </Field>
          <Field label="name">
            <TextInput
              value={content.hero.name}
              onChange={(v) => update((d) => void (d.hero.name = v))}
            />
          </Field>
          <Field label="title">
            <TextInput
              value={content.hero.title}
              onChange={(v) => update((d) => void (d.hero.title = v))}
            />
          </Field>
          <Field label="intro (**word** = highlighted)">
            <TextArea
              value={content.hero.intro}
              rows={4}
              onChange={(v) => update((d) => void (d.hero.intro = v))}
            />
          </Field>

          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
            terminal script
          </p>
          {content.hero.terminal.map((line, i) => (
            <ItemCard
              key={i}
              heading={`command ${i + 1}`}
              onRemove={() => update((d) => void d.hero.terminal.splice(i, 1))}
            >
              <Field label="command">
                <TextInput
                  value={line.command}
                  onChange={(v) =>
                    update((d) => void (d.hero.terminal[i].command = v))
                  }
                />
              </Field>
              <Field label="output (one line per row)">
                <LinesArea
                  value={line.outputs}
                  rows={3}
                  onChange={(v) =>
                    update((d) => void (d.hero.terminal[i].outputs = v))
                  }
                />
              </Field>
            </ItemCard>
          ))}
          <AddButton
            label="command"
            onClick={() =>
              update((d) =>
                d.hero.terminal.push({ command: "echo hello", outputs: [] })
              )
            }
          />
        </SectionCard>

        <SectionCard title="projects">
          {content.projects.map((proj, i) => (
            <ItemCard
              key={i}
              heading={proj.title || `project ${i + 1}`}
              onRemove={() => update((d) => void d.projects.splice(i, 1))}
            >
              <Field label="title">
                <TextInput
                  value={proj.title}
                  onChange={(v) => update((d) => void (d.projects[i].title = v))}
                />
              </Field>
              <Field label="description">
                <TextArea
                  value={proj.description}
                  onChange={(v) =>
                    update((d) => void (d.projects[i].description = v))
                  }
                />
              </Field>
              <Field label="tech (comma separated)">
                <CsvInput
                  value={proj.tech}
                  onChange={(v) => update((d) => void (d.projects[i].tech = v))}
                />
              </Field>
              <Field label="live URL (empty = no link)">
                <TextInput
                  value={proj.vercel ?? ""}
                  onChange={(v) =>
                    update((d) => void (d.projects[i].vercel = v || undefined))
                  }
                />
              </Field>
              <ImageField
                label="screenshot"
                dir="projects"
                value={proj.image ?? ""}
                onChange={(v) =>
                  update((d) => void (d.projects[i].image = v || undefined))
                }
              />
              <Field label="note (optional italic aside)">
                <TextInput
                  value={proj.note ?? ""}
                  onChange={(v) =>
                    update((d) => void (d.projects[i].note = v || undefined))
                  }
                />
              </Field>
            </ItemCard>
          ))}
          <AddButton
            label="project"
            onClick={() =>
              update((d) =>
                d.projects.push({ title: "", description: "", tech: [] })
              )
            }
          />
        </SectionCard>

        <SectionCard title="experience">
          {content.experience.map((exp, i) => (
            <ItemCard
              key={i}
              heading={`${exp.company || `entry ${i + 1}`} · ${exp.role}`}
              onRemove={() => update((d) => void d.experience.splice(i, 1))}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="company">
                  <TextInput
                    value={exp.company}
                    onChange={(v) =>
                      update((d) => void (d.experience[i].company = v))
                    }
                  />
                </Field>
                <Field label="role">
                  <TextInput
                    value={exp.role}
                    onChange={(v) =>
                      update((d) => void (d.experience[i].role = v))
                    }
                  />
                </Field>
                <Field label="period">
                  <TextInput
                    value={exp.period}
                    onChange={(v) =>
                      update((d) => void (d.experience[i].period = v))
                    }
                  />
                </Field>
                <Field label="location">
                  <TextInput
                    value={exp.location}
                    onChange={(v) =>
                      update((d) => void (d.experience[i].location = v))
                    }
                  />
                </Field>
              </div>
              <ImageField
                label="logo"
                dir="logos"
                value={exp.logo}
                onChange={(v) => update((d) => void (d.experience[i].logo = v))}
              />
              <Field label="bullets (one per line)">
                <LinesArea
                  value={exp.responsibilities}
                  onChange={(v) =>
                    update((d) => void (d.experience[i].responsibilities = v))
                  }
                />
              </Field>
              <Field label="tags (comma separated)">
                <CsvInput
                  value={exp.tags}
                  onChange={(v) => update((d) => void (d.experience[i].tags = v))}
                />
              </Field>
            </ItemCard>
          ))}
          <AddButton
            label="experience entry"
            onClick={() =>
              update((d) =>
                d.experience.push({
                  company: "",
                  role: "",
                  period: "",
                  location: "",
                  logo: "",
                  responsibilities: [],
                  tags: [],
                })
              )
            }
          />
        </SectionCard>

        <SectionCard title="education">
          {content.education.map((academy, i) => (
            <ItemCard
              key={i}
              heading={academy.name || `academy ${i + 1}`}
              onRemove={() => update((d) => void d.education.splice(i, 1))}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="name">
                  <TextInput
                    value={academy.name}
                    onChange={(v) =>
                      update((d) => void (d.education[i].name = v))
                    }
                  />
                </Field>
                <Field label="field">
                  <TextInput
                    value={academy.field}
                    onChange={(v) =>
                      update((d) => void (d.education[i].field = v))
                    }
                  />
                </Field>
                <Field label="period">
                  <TextInput
                    value={academy.period}
                    onChange={(v) =>
                      update((d) => void (d.education[i].period = v))
                    }
                  />
                </Field>
                <Field label="URL">
                  <TextInput
                    value={academy.url ?? ""}
                    onChange={(v) =>
                      update((d) => void (d.education[i].url = v || undefined))
                    }
                  />
                </Field>
              </div>
              <Field label="description">
                <TextArea
                  value={academy.description}
                  rows={4}
                  onChange={(v) =>
                    update((d) => void (d.education[i].description = v))
                  }
                />
              </Field>
              <Field label="skills (comma separated)">
                <CsvInput
                  value={academy.skills}
                  onChange={(v) =>
                    update((d) => void (d.education[i].skills = v))
                  }
                />
              </Field>

              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
                photos
              </p>
              {academy.photos.map((photo, j) => (
                <ItemCard
                  key={j}
                  heading={`photo ${j + 1}`}
                  onRemove={() =>
                    update((d) => void d.education[i].photos.splice(j, 1))
                  }
                >
                  <ImageField
                    label="image"
                    dir="education"
                    value={photo.src}
                    onChange={(v) =>
                      update((d) => void (d.education[i].photos[j].src = v))
                    }
                  />
                  <Field label="alt text">
                    <TextInput
                      value={photo.alt}
                      onChange={(v) =>
                        update((d) => void (d.education[i].photos[j].alt = v))
                      }
                    />
                  </Field>
                </ItemCard>
              ))}
              <AddButton
                label="photo"
                onClick={() =>
                  update((d) =>
                    d.education[i].photos.push({ src: "", alt: "" })
                  )
                }
              />
            </ItemCard>
          ))}
          <AddButton
            label="academy"
            onClick={() =>
              update((d) =>
                d.education.push({
                  name: "",
                  field: "",
                  period: "",
                  description: "",
                  skills: [],
                  photos: [],
                })
              )
            }
          />
        </SectionCard>

        <SectionCard title="contact">
          <Field label="prompt line">
            <TextInput
              value={content.contact.prompt}
              onChange={(v) => update((d) => void (d.contact.prompt = v))}
            />
          </Field>
          <Field label="blurb">
            <TextArea
              value={content.contact.blurb}
              onChange={(v) => update((d) => void (d.contact.blurb = v))}
            />
          </Field>
        </SectionCard>
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <p className="font-mono text-xs text-zinc-500">
            {status === "idle" && "unsaved changes stay in this tab until you save"}
            {status === "saving" && "writing site-content.json…"}
            {status === "saved" && (
              <span className="text-emerald-400">saved — site hot-reloaded</span>
            )}
            {status === "error" && (
              <span className="text-red-400">save failed, check the dev server log</span>
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
}
