"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, FileText } from "lucide-react";
import { ResumeButton } from "@/components/resume-button";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useElementOnScreen } from "@/hooks/useElementOnScreen";
import { EMAIL, EMAIL_HREF } from "@/lib/site";

type NavSection = { id: string; label: string; index: string };

const SECTIONS: NavSection[] = [
  { id: "stack", label: "stack", index: "01" },
  { id: "projects", label: "projects", index: "02" },
  { id: "experience", label: "experience", index: "03" },
  { id: "education", label: "education", index: "04" },
  { id: "contact", label: "contact", index: "05" },
];
const SECTION_IDS = SECTIONS.map((section) => section.id);

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  const scrolled = useScrolled(8);
  const activeSection = useActiveSection(SECTION_IDS);

  // Show "LK" while the hero avatar is on screen, then swap to the photo once
  // it scrolls under the navbar.
  const heroAvatarOnScreen = useElementOnScreen("hero-avatar", {
    rootMargin: "-64px 0px 0px 0px",
  });
  const showPhoto = !heroAvatarOnScreen;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-5xl grid-cols-[minmax(0,auto)_1fr_auto] items-center px-6 py-4">
        {/* The outward -ml/-mr offsets only fit once the viewport is wider than
            the 5xl container + 2×50px; below that they'd clip off-screen. */}
        <a
          href={EMAIL_HREF}
          className="group flex min-w-0 items-center gap-2 font-mono text-xs font-semibold text-zinc-100 transition-colors hover:text-white sm:text-sm min-[1130px]:-ml-[50px]"
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
              className="absolute inset-0 flex items-center justify-center rounded-md bg-white text-[0.7rem] text-zinc-900"
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
            </motion.span>
          </span>
          <span className="truncate">{EMAIL}</span>
        </a>

        {/* Nav links, centered in the space between the email and the resume button. */}
        <div className="hidden items-center justify-center gap-4 md:flex lg:gap-6">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              aria-current={
                activeSection === section.id ? "location" : undefined
              }
              className="group whitespace-nowrap font-mono text-sm transition-colors"
            >
              <span className="text-emerald-400">{section.index}.</span>{" "}
              <span
                className={
                  activeSection === section.id
                    ? "text-zinc-100"
                    : "text-zinc-500 group-hover:text-zinc-200"
                }
              >
                {section.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-2">
          <ResumeButton
            size="sm"
            className="hidden md:inline-flex min-[1130px]:-mr-[50px]"
          >
            <FileText className="h-3.5 w-3.5" /> resume
          </ResumeButton>

          <button
            className="text-zinc-300 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                  className={`py-2 font-mono text-sm ${
                    activeSection === section.id
                      ? "text-zinc-100"
                      : "text-zinc-400"
                  }`}
                >
                  <span className="text-emerald-400">{section.index}.</span>{" "}
                  {section.label}
                </Link>
              ))}
              <ResumeButton size="sm" className="mt-2 w-fit">
                <FileText className="h-3.5 w-3.5" /> resume
              </ResumeButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
