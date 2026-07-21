import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/lib/content";

export const alt = "Lukas Kouril portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#09090b",
          padding: "90px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#10b981",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            LK
          </div>
          <div style={{ display: "flex", color: "#34d399", fontSize: "30px" }}>
            $ whoami
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#fafafa",
            fontSize: "92px",
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
        >
          Lukas Kouril
        </div>
        <div
          style={{
            display: "flex",
            color: "#d4d4d8",
            fontSize: "44px",
            marginTop: "10px",
          }}
        >
          {content.footer.role}
        </div>
        <div
          style={{
            display: "flex",
            color: "#a1a1aa",
            fontSize: "28px",
            marginTop: "40px",
          }}
        >
          {content.footer.location}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "44px",
            width: "220px",
            height: "10px",
            background: "#10b981",
            borderRadius: "9999px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
