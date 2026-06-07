"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";

const LINKS = [
  { id: "stack", label: "stack", index: "01" },
  { id: "experience", label: "experience", index: "02" },
  { id: "projects", label: "projects", index: "03" },
  { id: "contact", label: "contact", index: "04" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="mailto:kouril.lukas@gmail.com"
          className="group flex items-center gap-2 font-mono text-xs font-semibold text-zinc-100 transition-colors hover:text-emerald-400 sm:text-sm"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[0.7rem] text-zinc-900 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
            LK
          </span>
          <span>kouril.lukas@gmail.com</span>
        </a>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className="group font-mono text-sm transition-colors"
              >
                <span className="text-emerald-400">{l.index}.</span>{" "}
                <span
                  className={
                    active === l.id
                      ? "text-zinc-100"
                      : "text-zinc-500 group-hover:text-zinc-200"
                  }
                >
                  {l.label}
                </span>
              </Link>
            ))}
            <a
              href="/pdf/cv_lukaskouril.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              <Download className="h-3.5 w-3.5" /> resume
            </a>
          </div>

          <button
            className="text-zinc-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="py-2 font-mono text-sm text-zinc-400"
              >
                <span className="text-emerald-400">{l.index}.</span> {l.label}
              </Link>
            ))}
            <a
              href="/pdf/cv_lukaskouril.pdf"
              download
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-300"
            >
              <Download className="h-3.5 w-3.5" /> resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
