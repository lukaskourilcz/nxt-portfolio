import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const SOCIALS = [
  { href: "https://github.com/lukaskourilcz", label: "GitHub", Icon: Github },
  {
    href: "https://linkedin.com/in/lukas-kouril/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "mailto:kouril.lukas@gmail.com", label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-emerald-600 dark:text-emerald-400">$</span>{" "}
            built with Next.js, Tailwind &amp; Framer Motion
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="text-zinc-400 transition-colors hover:text-emerald-600 dark:text-zinc-500 dark:hover:text-emerald-400"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <p className="font-mono text-[0.7rem] text-zinc-400 dark:text-zinc-500">
            © 2026 Lukas Kouril — designed &amp; built in Prague.
          </p>
          <Link
            href="#top"
            className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-zinc-400 transition-colors hover:text-emerald-600 dark:text-zinc-500 dark:hover:text-emerald-400"
          >
            back to top <ArrowUp className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
