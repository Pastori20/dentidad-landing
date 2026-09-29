import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dentidad brand palette
        navy: {
          DEFAULT: "#063760",
          50: "#E8EEF5",
          100: "#CAD7E8",
          200: "#94B0D2",
          300: "#5E89BC",
          400: "#3B6E9F",
          500: "#185FA5",
          600: "#0F4D86",
          700: "#063760",
          800: "#03253F",
          900: "#021627",
        },
        mint: {
          DEFAULT: "#00C9A7",
          deep: "#00A085",
          soft: "#B7F2E5",
          50: "#E6FBF5",
          100: "#B7F2E5",
          200: "#7EE7CD",
          300: "#3FD9B4",
          400: "#00C9A7",
          500: "#00A085",
          600: "#00876F",
          700: "#006C58",
          800: "#005243",
          900: "#003A2F",
        },
        bg: {
          DEFAULT: "#F4F6F8",
          card: "#FFFFFF",
          tint: "#E8F0FA",
        },
        ink: {
          DEFAULT: "#111827",
          2: "#475569",
          3: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: [
          '"DM Sans"',
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "sans-serif",
        ],
        mono: ['"DM Mono"', "ui-monospace", '"SF Mono"', "Menlo", "monospace"],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(6,55,96,.06)",
        DEFAULT: "0 4px 12px rgba(6,55,96,.08)",
        lg: "0 12px 32px rgba(6,55,96,.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(.4, 0, .2, 1)",
        "fade-in": "fadeIn 0.4s cubic-bezier(.4, 0, .2, 1)",
        // Hero: los equipos flotan desfasados, el brillo respira y un reflejo
        // cruza las pantallas. Solo transform/opacity (sin tirones).
        "float-slow": "float 7s ease-in-out infinite",
        "float-fast": "float 5.5s ease-in-out -2s infinite",
        breathe: "breathe 6s ease-in-out infinite",
        shine: "shine 9s ease-in-out infinite",
        "shine-late": "shine 9s ease-in-out 4.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -2.2%, 0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.55", transform: "scale(0.96)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        shine: {
          "0%": { transform: "translate3d(-120%, 0, 0) skewX(-18deg)" },
          "22%, 100%": { transform: "translate3d(260%, 0, 0) skewX(-18deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
