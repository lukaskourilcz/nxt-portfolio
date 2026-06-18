import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, LOCATION } from "@/lib/site";
import { SOCIALS } from "@/lib/socials";
import type { IconComponent } from "@/lib/types";

type ContactItem = {
  label: string;
  href: string | null;
  value: string;
  Icon: IconComponent;
};

const CONTACTS: ContactItem[] = [
  { label: "email", href: EMAIL_HREF, value: EMAIL, Icon: Mail },
  { label: "phone", href: PHONE_HREF, value: PHONE, Icon: Phone },
  { label: "location", href: null, value: LOCATION, Icon: MapPin },
];

export default function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading index="05" command="contact" title="Get in touch" />

      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">$ ./say-hello.sh</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg">
            Hiring, or have a project in mind? Drop me a line — I&apos;ll get
            back to you.
          </p>

          <Button asChild className="mt-6">
            <a href={EMAIL_HREF}>
              <Mail className="h-4 w-4" /> Say hello
            </a>
          </Button>

          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <ExternalLink
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors hover:border-emerald-500 hover:text-emerald-400"
              >
                <Icon className="h-5 w-5" />
              </ExternalLink>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-3">
          {CONTACTS.map(({ label, href, value, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-card transition-colors hover:border-emerald-500/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
                  {label}
                </p>
                {href ? (
                  <Link
                    href={href}
                    className="truncate text-sm text-zinc-200 transition-colors hover:text-emerald-400"
                  >
                    {value}
                  </Link>
                ) : (
                  <span className="text-sm text-zinc-200">{value}</span>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
