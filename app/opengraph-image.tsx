import { ImageResponse } from "next/og"

export const alt = "PostCraft — Write Social Posts That Get Engagement"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: "white",
          }}
        >
          ✦
        </div>
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          PostCraft
        </span>
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        Write Social Posts That Get Engagement
      </div>
      <div
        style={{
          fontSize: 20,
          color: "#94a3b8",
          marginTop: 20,
        }}
      >
        3 AI-written variants · Ranked by engagement score
      </div>
    </div>,
    { ...size }
  )
}
