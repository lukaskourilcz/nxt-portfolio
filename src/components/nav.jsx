"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const LINKS = [
  { id: "stack", label: "stack", index: "01" },
  { id: "projects", label: "projects", index: "02" },
  { id: "experience", label: "experience", index: "03" },
  { id: "education", label: "education", index: "04" },
  { id: "contact", label: "contact", index: "05" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [heroAvatarVisible, setHeroAvatarVisible] = useState(true);
  const reduce = useReducedMotion();
  const showPhoto = heroAvatarVisible;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Morph the nav mark between the hero photo and the LK logo as the hero
  // avatar crosses under the sticky navbar.
  useEffect(() => {
    const el = document.getElementById("hero-avatar");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroAvatarVisible(entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
          <span className="relative block h-7 w-7 shrink-0">
            <motion.span
              aria-hidden
              initial={false}
              animate={{
                opacity: showPhoto ? 0 : 1,
                scale: showPhoto ? 0.5 : 1,
                rotate: reduce ? 0 : showPhoto ? -90 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center rounded-md bg-white text-[0.7rem] text-zinc-900 transition-colors group-hover:bg-emerald-500 group-hover:text-white"
            >
              LK
            </motion.span>
            <motion.span
              aria-hidden
              initial={false}
              animate={{
                opacity: showPhoto ? 1 : 0,
                scale: showPhoto ? 1 : 0.5,
                rotate: reduce ? 0 : showPhoto ? 0 : 90,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/profile.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-md object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full border border-zinc-950 bg-emerald-500" />
              </span>
            </motion.span>
          </span>
          <span>kouril.lukas@gmail.com</span>
        </a>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-6 lg:flex">
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
            className="text-zinc-300 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md lg:hidden">
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
