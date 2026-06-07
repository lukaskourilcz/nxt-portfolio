import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const CONTACTS = [
  {
    label: "email",
    href: "mailto:kouril.lukas@gmail.com",
    value: "kouril.lukas@gmail.com",
    Icon: Mail,
  },
  {
    label: "phone",
    href: "tel:+420737875367",
    value: "+420 737 875 367",
    Icon: Phone,
  },
  {
    label: "location",
    href: null,
    value: "Prague, Czech Republic",
    Icon: MapPin,
  },
];

const SOCIALS = [
  { href: "https://github.com/lukaskourilcz", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/lukas-kouril",
    label: "LinkedIn",
    Icon: Linkedin,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="04" command="contact" title="Get in touch" />

      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
            $ ./say-hello.sh
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Are you hiring or have a project in mind? My inbox is always open —
            whether it&apos;s a question, an opportunity, or just to say hi, I
            will get back to you.
          </p>

          <a
            href="mailto:kouril.lukas@gmail.com"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-emerald-400 dark:hover:text-zinc-900"
          >
            <Mail className="h-4 w-4" /> Say hello
          </a>

          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-3">
          {CONTACTS.map(({ label, href, value, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {label}
                </p>
                {href ? (
                  <Link
                    href={href}
                    className="truncate text-sm text-zinc-800 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
                  >
                    {value}
                  </Link>
                ) : (
                  <span className="text-sm text-zinc-800 dark:text-zinc-200">
                    {value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
