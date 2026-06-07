import { ImageResponse } from "next/og";

export const alt = "Lukas Kouril — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fafafa",
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
              background: "#09090b",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            LK
          </div>
          <div style={{ display: "flex", color: "#059669", fontSize: "30px" }}>
            $ whoami
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#09090b",
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
            color: "#3f3f46",
            fontSize: "44px",
            marginTop: "10px",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            color: "#71717a",
            fontSize: "28px",
            marginTop: "40px",
          }}
        >
          TypeScript · React · Node.js · Next.js
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
