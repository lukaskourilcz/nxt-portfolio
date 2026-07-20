"use client";

import { Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/language-provider";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, LOCATION } from "@/lib/site";

type ContactItem = {
  label: string;
  href: string | null;
  value: string;
};

export default function ContactSection() {
  const { content, t } = useI18n();

  const contacts: ContactItem[] = [
    { label: t.contact.email, href: EMAIL_HREF, value: EMAIL },
    { label: t.contact.phone, href: PHONE_HREF, value: PHONE },
    { label: t.contact.location, href: null, value: LOCATION },
  ];

  return (
    <Section id="contact" mesh="right">
      <SectionHeading
        index="05"
        command={t.sections.contact.command}
        title={t.sections.contact.title}
      />

      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-emerald-400">
            {content.contact.prompt}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg">
            {content.contact.blurb}
          </p>

          <Button asChild className="mt-6">
            <a href={EMAIL_HREF}>
              <Mail className="h-4 w-4" /> {t.contact.sayHello}
            </a>
          </Button>
        </div>

        <div className="border-t border-zinc-800">
          {contacts.map(({ label, href, value }) => {
            const row = (
              <>
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500">
                  {label}
                </span>
                <span className="min-w-0 truncate text-sm text-zinc-200">
                  {value}
                </span>
              </>
            );
            const rowClass =
              "flex items-center justify-between gap-4 border-b border-zinc-800 py-4";
            return href ? (
              <a
                key={label}
                href={href}
                className={`${rowClass} transition-colors hover:bg-white/[0.02]`}
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
