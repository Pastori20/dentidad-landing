import { ImageResponse } from "next/og";

// OG image generated at request time and cached by Next.js.
// Renders at 1200×630, the standard Open Graph size used by WhatsApp,
// Facebook, LinkedIn and X for link previews.
//
// To iterate the design: edit the JSX below and push. The next deploy
// regenerates the image automatically.
//
// Notes on fonts: ImageResponse only supports a handful of font weights at
// a time and Google Fonts URLs are fragile (the hash in the URL changes).
// We use system sans-serif fallbacks instead — same visual weight, zero
// network dependency at render time.

export const runtime = "edge";
export const alt = "Dentidad — Software dental para Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SYSTEM_SANS =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          position: "relative",
          fontFamily: SYSTEM_SANS,
          backgroundColor: "#063760",
          // Approximation of the .gradient-hero from globals.css:
          // mint glow + navy glow + dark navy base.
          backgroundImage: [
            "radial-gradient(circle at 18% 12%, rgba(0,201,167,0.30), transparent 55%)",
            "radial-gradient(circle at 85% 78%, rgba(24,95,165,0.45), transparent 55%)",
            "linear-gradient(180deg, #063760 0%, #051f36 100%)",
          ].join(", "),
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* Decorative orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 600,
            background:
              "radial-gradient(circle, rgba(0,201,167,0.22), transparent 65%)",
          }}
        />
        {/* Decorative orb bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 500,
            height: 500,
            borderRadius: 500,
            background:
              "radial-gradient(circle, rgba(24,95,165,0.35), transparent 65%)",
          }}
        />

        {/* TOP: eyebrow + wordmark + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#00C9A7",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Software dental para Argentina
          </div>

          {/* Wordmark — Dent in white, idad in mint */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 160,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 1,
              marginBottom: 36,
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Dent</span>
            <span style={{ color: "#00C9A7" }}>idad</span>
            <span style={{ color: "#00C9A7" }}>.</span>
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 920,
              marginBottom: 18,
            }}
          >
            Tu consultorio, ordenado al detalle.
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: 0.3,
            }}
          >
            Agenda · Ficha clínica · Odontograma · Caja diaria
          </div>
        </div>

        {/* BOTTOM: URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            dentidad.com
            {/* arrow */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00C9A7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
