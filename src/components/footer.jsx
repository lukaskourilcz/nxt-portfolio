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
    <footer className="border-t border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-zinc-400">
            <span className="text-emerald-400">$</span> built with Next.js,
            Tailwind &amp; Framer Motion
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
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
