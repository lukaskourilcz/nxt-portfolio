import { Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, LOCATION } from "@/lib/site";
import { SOCIALS } from "@/lib/socials";
import { CONTENT } from "@/lib/content";

type ContactItem = {
  label: string;
  href: string | null;
  value: string;
};

const CONTACTS: ContactItem[] = [
  { label: "email", href: EMAIL_HREF, value: EMAIL },
  { label: "phone", href: PHONE_HREF, value: PHONE },
  { label: "location", href: null, value: LOCATION },
];

export default function ContactSection() {
  return (
    <Section id="contact" mesh="right">
      <SectionHeading index="05" command="contact" title="Get in touch" />

      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-emerald-400 light:text-emerald-600">
            {CONTENT.contact.prompt}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300 light:text-zinc-700 sm:text-lg">
            {CONTENT.contact.blurb}
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
                className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100 light:border-zinc-300 light:text-zinc-500 light:hover:border-zinc-500 light:hover:text-zinc-900"
              >
                <Icon className="h-5 w-5" />
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 light:border-zinc-200">
          {CONTACTS.map(({ label, href, value }) => {
            const row = (
              <>
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
                  {label}
                </span>
                <span className="min-w-0 truncate text-sm text-zinc-200 light:text-zinc-800">
                  {value}
                </span>
              </>
            );
            const rowClass =
              "flex items-center justify-between gap-4 border-b border-zinc-800 py-4 light:border-zinc-200";
            return href ? (
              <a
                key={label}
                href={href}
                className={`${rowClass} transition-colors hover:bg-white/[0.02] light:hover:bg-black/[0.02]`}
              >
                {row}
              </a>
            ) : (
              <div key={label} className={rowClass}>
                {row}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
