import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getCaseStudy, isLocale } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const work = getCaseStudy(locale, slug);
  if (!work) notFound();
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#09090b", color: "#fafafa", padding: "78px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#34d399", fontFamily: "monospace", fontSize: 24 }}>{work.contextLabel}</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <div style={{ display: "flex", fontSize: 70, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-2px" }}>{work.title}</div>
        <div style={{ display: "flex", marginTop: 28, color: "#a1a1aa", fontSize: 28 }}>{work.role}{work.organization ? ` · ${work.organization}` : ""}</div>
      </div>
      <div style={{ display: "flex", color: "#71717a", fontFamily: "monospace", fontSize: 22 }}>lukaskouril.dev</div>
    </div>,
    size
  );
}
