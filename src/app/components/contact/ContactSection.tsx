import { FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { ResumeButton } from "@/components/resume-button";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { EMAIL, EMAIL_HREF, GITHUB_URL, LINKEDIN_URL, LOCATION } from "@/lib/site";
import type { SiteContent } from "@/lib/content-schema";

export default function ContactSection({ content }: { content: SiteContent }) {
  const newTabLabel = content.common.links.opensNewTab;

  return (
    <Section id="contact" className="pb-24 sm:pb-32">
      <SectionHeading id="contact" {...content.sectionCopy.contact} />
      <div className="grid gap-10 border-y border-edge bg-subtle px-5 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="max-w-[62ch] text-base leading-7 text-secondary">{content.contact.body}</p>
          <p className="mt-4 max-w-[62ch] text-sm leading-6 text-muted">{content.contact.availability}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            <a href={EMAIL_HREF} className="editorial-link inline-flex min-h-11 items-center gap-2 text-primary decoration-accent/60">
              <Mail className="h-4 w-4" aria-hidden /> {EMAIL}
            </a>
            <ExternalLink href={LINKEDIN_URL} newTabLabel={newTabLabel} data-analytics="external_linkedin" className="editorial-link inline-flex min-h-11 items-center gap-2">
              <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
            </ExternalLink>
            <ExternalLink href={GITHUB_URL} newTabLabel={newTabLabel} data-analytics="external_github" className="editorial-link inline-flex min-h-11 items-center gap-2">
              <Github className="h-4 w-4" aria-hidden /> GitHub
            </ExternalLink>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted"><MapPin className="h-4 w-4" aria-hidden /> {LOCATION}</p>
        </div>
        <ResumeButton>
          <FileText className="h-4 w-4" aria-hidden /> {content.common.links.downloadCv}
          <span className="font-mono text-[10px] text-muted">PDF</span>
        </ResumeButton>
      </div>
    </Section>
  );
}
