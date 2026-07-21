import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
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
    <footer className="border-t border-zinc-800 bg-zinc-950/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-semibold text-zinc-100">Lukas Kouril</p>
          <p className="mt-1 text-sm text-zinc-500">{content.footer.role} · {content.footer.location}</p>
          <a href={EMAIL_HREF} className="mt-3 inline-flex min-h-11 items-center text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">{EMAIL}</a>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          <ExternalLink href={GITHUB_URL} newTabLabel={newTab} data-analytics="external_github" className="min-h-11 content-center text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">GitHub</ExternalLink>
          <ExternalLink href={LINKEDIN_URL} newTabLabel={newTab} data-analytics="external_linkedin" className="min-h-11 content-center text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">LinkedIn</ExternalLink>
          <Link href={localizedPath(locale, "/privacy")} className="min-h-11 content-center text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">{content.common.links.privacy}</Link>
          {analyticsEnabled ? <PrivacyPreferencesButton label={content.common.analyticsSettings} /> : null}
          <Link href={`${localizedPath(locale)}#top`} className="min-h-11 content-center text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-zinc-200">{content.footer.backToTop}</Link>
        </div>
        <p className="text-xs text-zinc-600 md:col-span-2">{content.footer.copyright}</p>
      </div>
    </footer>
  );
}
