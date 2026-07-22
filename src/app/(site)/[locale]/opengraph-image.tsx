import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/lib/content";

export const alt = "Lukas Kouril — senior software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return new ImageResponse(
    <div style={{ height: "100%", width: "100%", display: "flex", position: "relative", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", background: "#07101d", color: "#f3f6f9", padding: "76px 84px" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)", backgroundSize: "64px 64px", opacity: 0.55 }} />
      <div style={{ position: "absolute", left: 84, top: 0, width: 2, height: 138, display: "flex", background: "#4bd58a" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", position: "relative", alignItems: "center", justifyContent: "center", width: 56, height: 56, border: "1px solid rgba(255,255,255,.24)", background: "#0d1928", fontFamily: "monospace", fontSize: 18, fontWeight: 700 }}>
          LK
          <span style={{ position: "absolute", left: -1, top: 14, display: "flex", width: 2, height: 18, background: "#4bd58a" }} />
        </div>
        <span style={{ display: "flex", color: "#4bd58a", fontFamily: "monospace", fontSize: 23 }}>{content.hero.eyebrow}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 0.98, fontWeight: 650, letterSpacing: "-4px" }}>Lukas Kouril</div>
        <div style={{ display: "flex", maxWidth: 980, marginTop: 20, color: "#bdc7d2", fontSize: 39, lineHeight: 1.15 }}>{content.footer.role}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.14)", color: "#8b99a8", fontFamily: "monospace", fontSize: 20 }}>
        <span style={{ display: "flex" }}>lukaskouril.dev</span>
        <span style={{ display: "flex" }}>{content.footer.location}</span>
      </div>
    </div>,
    size
  );
}
