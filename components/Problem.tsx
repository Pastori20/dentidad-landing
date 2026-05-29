"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import MobileCarousel from "./MobileCarousel";
import DraggableScrollRow from "./DraggableScrollRow";

type PainPoint = {
  title: string;
  description: string;
  icon: React.ReactNode;
  // Accent palette for the card
  accent: {
    tint: string; // background tint class
    iconBg: string;
    iconColor: string;
    glow: string; // hover glow color
    badge: string;
    titleColor: string;
    descColor: string;
  };
};

const painPoints: PainPoint[] = [
  {
    title: "La agenda vive en un cuaderno o en WhatsApp.",
    description:
      "Reprogramar un turno significa borrar, llamar, anotar en otro lado.",
    accent: {
      tint: "from-[#E8F0FA] to-[#D4E4FB]",
      iconBg: "bg-white/70",
      iconColor: "text-[#1D4ED8]",
      glow: "shadow-[0_20px_50px_-15px_rgba(29,78,216,.25)]",
      badge: "bg-[#1D4ED8] text-white",
      titleColor: "text-navy",
      descColor: "text-ink-2",
    },
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h12a2 2 0 012 2v14H6a2 2 0 01-2-2V4z" />
        <path d="M4 4v14a2 2 0 002 2" />
        <path d="M8 8h6M8 12h6M8 16h4" />
      </svg>
    ),
  },
  {
    title: "Cada paciente está repartido entre planillas, fotos y papeles.",
    description: "Cuando lo necesitás, no aparece.",
    accent: {
      tint: "from-navy via-[#0a4978] to-[#0f5e95]",
      iconBg: "bg-white/15",
      iconColor: "text-mint-soft",
      glow: "shadow-[0_20px_50px_-15px_rgba(6,55,96,.5)]",
      badge: "bg-mint text-navy",
      titleColor: "text-white",
      descColor: "text-mint-soft/85",
    },
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        <path d="M7 12h10M7 15h6" />
      </svg>
    ),
  },
  {
    title: "Los cobros no cuadran a fin de mes.",
    description:
      "¿Quién debe? ¿Cuánto se cobró? ¿En qué medio? Las cuentas se hacen en la cabeza.",
    accent: {
      tint: "from-[#B7F2E5] via-[#D2F7EB] to-[#E8FBF4]",
      iconBg: "bg-white/70",
      iconColor: "text-mint-deep",
      glow: "shadow-[0_20px_50px_-15px_rgba(0,201,167,.35)]",
      badge: "bg-mint text-navy",
      titleColor: "text-navy",
      descColor: "text-ink-2",
    },
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 10c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 2-3 2-3 .9-3 2 1.3 2 3 2 3-.9 3-2" />
      </svg>
    ),
  },
];

function PainCard({ p, index }: { p: PainPoint; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative h-full overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br ${p.accent.tint} p-6 md:p-7 transition-shadow duration-300 hover:${p.accent.glow}`}
    >
      {/* Numbered badge */}
      <div
        className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full ${p.accent.badge} text-xs font-bold tracking-wide`}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div
          className={`w-14 h-14 rounded-2xl ${p.accent.iconBg} ${p.accent.iconColor} flex items-center justify-center`}
        >
          {p.icon}
        </div>
        <h3 className={`text-lg md:text-xl font-bold leading-snug text-balance pr-12 ${p.accent.titleColor}`}>
          {p.title}
        </h3>
        <p className={`leading-relaxed text-sm md:text-[15px] ${p.accent.descColor}`}>
          {p.description}
        </p>
      </div>

      {/* Decorative arc */}
      <svg
        className="absolute -right-12 -bottom-12 w-40 h-40 opacity-10"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="48" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="bg-bg-tint py-14 md:py-28 border-b border-border"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">El problema</p>
            <h2
              id="problema-title"
              className="section-title mt-3 text-balance"
            >
              El día a día del consultorio se va en lo que no es atender pacientes.
            </h2>
          </div>
        </FadeInSection>

        {/* MOBILE: swipeable carousel */}
        <div className="mt-8 md:hidden">
          <MobileCarousel slideClassName="min-w-[88%] pl-4 first:pl-0">
            {painPoints.map((p, i) => (
              <PainCard key={p.title} p={p} index={i} />
            ))}
          </MobileCarousel>
          <p className="mt-3 text-center text-xs text-ink-3">
            Deslizá para ver los 3 problemas
          </p>
        </div>

        {/* DESKTOP: single horizontal scroll row con drag-to-scroll.
            Mismo patrón que "Todo lo que incluye" para consistencia visual. */}
        <div className="hidden md:block mt-12 -mx-6">
          <FadeInSection>
            <DraggableScrollRow className="scroll-row-mint flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 py-4 scroll-smooth select-none">
              {painPoints.map((p, i) => (
                <li
                  key={p.title}
                  className="flex-shrink-0 w-[380px] lg:w-[420px] snap-start list-none"
                >
                  <PainCard p={p} index={i} />
                </li>
              ))}
            </DraggableScrollRow>
          </FadeInSection>
          <p className="mt-2 text-center text-xs text-ink-3">
            ← Arrastrá las tarjetas para ver todo →
          </p>
        </div>
      </div>
    </section>
  );
}
