import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const SITE_URL = "https://lukaskouril.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lukas Kouril — Software Engineer",
    template: "%s — Lukas Kouril",
  },
  description:
    "Software Engineer from the Czech Republic building clean, user-friendly web applications with TypeScript, React and Node.js.",
  keywords: [
    "Lukas Kouril",
    "Software Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Lukas Kouril", url: SITE_URL }],
  creator: "Lukas Kouril",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lukas Kouril — Software Engineer",
    description:
      "Software Engineer building clean, user-friendly web applications with TypeScript, React and Node.js.",
    url: SITE_URL,
    siteName: "Lukas Kouril",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukas Kouril — Software Engineer",
    description:
      "Software Engineer building clean, user-friendly web applications with TypeScript, React and Node.js.",
  },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#09090b",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lukas Kouril",
  jobTitle: "Software Engineer",
  url: SITE_URL,
  email: "kouril.lukas@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Prague",
    addressCountry: "CZ",
  },
  sameAs: [
    "https://github.com/lukaskourilcz",
    "https://linkedin.com/in/lukas-kouril/",
  ],
  knowsAbout: ["TypeScript", "React", "Next.js", "Node.js"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-zinc-900"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
