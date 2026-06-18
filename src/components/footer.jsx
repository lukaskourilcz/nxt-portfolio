import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { SOCIALS_WITH_EMAIL } from "@/lib/socials";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-zinc-400">
            <span className="text-emerald-400">$</span> built with Next.js,
            Tailwind &amp; Framer Motion
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS_WITH_EMAIL.map(({ href, label, Icon }) => (
              <ExternalLink
                key={label}
                href={href}
                aria-label={label}
                className="-m-2 p-2 text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <Icon className="h-4 w-4" />
              </ExternalLink>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] text-zinc-500">
            © 2026 Lukas Kouril — designed &amp; built in Prague.
          </p>
          <Link
            href="#top"
            className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-zinc-500 transition-colors hover:text-emerald-400"
          >
            back to top <ArrowUp className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
