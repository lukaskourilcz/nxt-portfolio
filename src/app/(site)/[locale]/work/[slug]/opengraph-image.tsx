import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getCaseStudy, isLocale } from "@/lib/content";

export const alt = "Lukas Kouril portfolio case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const work = getCaseStudy(locale, slug);
  if (!work) notFound();

  const signal = work.id === "banking-modernization" ? "#aab7cd" : work.id === "ersilia-ai-tooling" ? "#62d79a" : "#8de1b4";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", background: "#07101d", color: "#f3f6f9", padding: "72px 80px" }}>
      <div style={{ position: "absolute", right: 90, top: 0, width: 1, height: "100%", display: "flex", background: "rgba(255,255,255,.12)" }} />
      <div style={{ position: "absolute", right: 0, top: 118, width: 260, height: 1, display: "flex", background: signal }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "monospace", fontSize: 21 }}>
        <span style={{ display: "flex", color: signal }}>{work.contextLabel}</span>
        <span style={{ display: "flex", color: "#8b99a8" }}>case study / {work.id}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
        <div style={{ display: "flex", fontSize: work.title.length > 38 ? 66 : 76, lineHeight: 1.04, fontWeight: 650, letterSpacing: "-3px" }}>{work.title}</div>
        <div style={{ display: "flex", marginTop: 28, color: "#bdc7d2", fontSize: 27 }}>{work.role}{work.organization ? ` · ${work.organization}` : ""}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.14)", color: "#8b99a8", fontFamily: "monospace", fontSize: 19 }}>
        <span style={{ display: "flex" }}>Lukas Kouril / senior software engineer</span>
        <span style={{ display: "flex" }}>{work.period}</span>
      </div>
    </div>,
    size
  );
}
