import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { BackgroundGrid } from "@/components/background-grid";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PostHog } from "@/components/posthog";
import { getContent, isLocale, LOCALES } from "@/lib/content";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, resolvePostHogHost, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Lukas Kouril", url: SITE_URL }],
  creator: "Lukas Kouril",
  keywords: ["Lukas Kouril", "Senior Software Engineer", "TypeScript", "React", "Next.js", "Accessibility", "BFF"],
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090b",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const content = getContent(value);
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = resolvePostHogHost(process.env.NEXT_PUBLIC_POSTHOG_HOST);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: value,
    url: `${SITE_URL}/${value}`,
    mainEntity: {
      "@type": "Person",
      name: "Lukas Kouril",
      jobTitle: content.footer.role,
      url: SITE_URL,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
      worksFor: { "@type": "Organization", name: "Web Integrator" },
      alumniOf: content.education.map((entry) => ({ "@type": "EducationalOrganization", name: entry.name, url: entry.url })),
      sameAs: [GITHUB_URL, LINKEDIN_URL],
      knowsAbout: content.capabilities.groups.flatMap((group) => group.items).slice(0, 16),
    },
  };

  return (
    <html lang={value} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <a href="#main" className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:not-sr-only focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:text-canvas">
          {content.common.skipToContent}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
        <BackgroundGrid />
        <Nav locale={value} content={content} />
        {children}
        <Footer locale={value} content={content} analyticsEnabled={Boolean(posthogKey)} />
        {posthogKey ? <PostHog apiKey={posthogKey} apiHost={posthogHost} content={content} /> : null}
      </body>
    </html>
  );
}
