"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-5xl grid-cols-[minmax(0,auto)_1fr_auto] items-center px-6 py-4">
        <a
          href={EMAIL_HREF}
          className="group flex min-w-0 items-center gap-2 font-mono text-xs font-semibold text-zinc-100 transition-colors hover:text-emerald-400 sm:text-sm md:-ml-[50px]"
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
          <span className="truncate">{EMAIL}</span>
        </a>

        {/* Nav links, centered in the space between the email and the resume button. */}
        <div className="hidden items-center justify-center gap-4 md:flex lg:gap-6">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? "true" : undefined}
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
          <ResumeButton size="sm" className="hidden md:inline-flex md:-mr-[50px]">
            <FileText className="h-3.5 w-3.5" /> resume
          </ResumeButton>

          <button
            className="text-zinc-300 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className="py-2 font-mono text-sm text-zinc-400"
              >
                <span className="text-emerald-400">{section.index}.</span>{" "}
                {section.label}
              </Link>
            ))}
            <ResumeButton size="sm" className="mt-2 w-fit">
              <FileText className="h-3.5 w-3.5" /> resume
            </ResumeButton>
          </div>
        </div>
      )}
    </header>
  );
}
