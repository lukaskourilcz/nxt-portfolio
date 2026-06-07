import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";

export const metadata = {
  metadataBase: new URL("https://lukaskouril.vercel.app"),
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
  authors: [{ name: "Lukas Kouril" }],
  openGraph: {
    title: "Lukas Kouril — Software Engineer",
    description:
      "Software Engineer building clean, user-friendly web applications with TypeScript, React and Node.js.",
    url: "https://lukaskouril.vercel.app",
    siteName: "Lukas Kouril",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
