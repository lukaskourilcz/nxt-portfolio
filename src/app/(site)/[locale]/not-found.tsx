"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import en from "@/content/site-content.json";
import cs from "@/content/site-content.cs.json";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/cs") ? "cs" : "en";
  const copy = locale === "cs" ? cs.notFound : en.notFound;
  return (
    <main id="main" tabIndex={-1} className="mx-auto flex min-h-[75svh] max-w-3xl flex-col justify-center px-5 pb-20 pt-28 outline-none sm:px-8">
      <p className="font-mono text-sm text-accent">{copy.eyebrow}</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-primary">{copy.title}</h1>
      <p className="mt-5 max-w-[60ch] text-base leading-7 text-secondary">{copy.body}</p>
      <Link href={`/${locale}`} className="mt-8 inline-flex min-h-11 w-fit items-center rounded-md bg-accent px-5 text-sm font-medium text-canvas hover:bg-accent-hover">{copy.action}</Link>
    </main>
  );
}
