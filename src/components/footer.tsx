import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import { BrandMark } from "@/components/brand-mark";
import { PrivacyPreferencesButton } from "@/components/privacy-preferences-button";
import { EMAIL, EMAIL_HREF, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import type { Locale, SiteContent } from "@/lib/content-schema";

export function Footer({
  locale,
  content,
  analyticsEnabled,
}: {
  locale: Locale;
  content: SiteContent;
  analyticsEnabled: boolean;
}) {
  const newTab = content.common.links.opensNewTab;
  return (
    <footer className="border-t border-edge bg-elevated/50">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <BrandMark />
          <div>
            <p className="font-semibold text-primary">Lukas Kouril</p>
            <p className="mt-1 text-sm text-muted">{content.footer.role} · {content.footer.location}</p>
            <a href={EMAIL_HREF} className="editorial-link mt-2 inline-flex min-h-11 items-center text-sm">{EMAIL}</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          <ExternalLink href={GITHUB_URL} newTabLabel={newTab} data-analytics="external_github" className="editorial-link min-h-11 content-center text-muted">GitHub</ExternalLink>
          <ExternalLink href={LINKEDIN_URL} newTabLabel={newTab} data-analytics="external_linkedin" className="editorial-link min-h-11 content-center text-muted">LinkedIn</ExternalLink>
          <Link href={localizedPath(locale, "/privacy")} className="editorial-link min-h-11 content-center text-muted">{content.common.links.privacy}</Link>
          {analyticsEnabled ? <PrivacyPreferencesButton label={content.common.analyticsSettings} /> : null}
          <Link href={`${localizedPath(locale)}#top`} className="editorial-link min-h-11 content-center text-muted">{content.footer.backToTop}</Link>
        </div>
        <p className="text-xs text-muted md:col-span-2">{content.footer.copyright}</p>
      </div>
    </footer>
  );
}
