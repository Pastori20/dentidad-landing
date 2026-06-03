"use client";

import { motion } from "framer-motion";

type Props = {
  /** Si true, ocupa todo el ancho del viewport sin container ni border-radius */
  fullWidth?: boolean;
  /** Tailwind class extra para el wrapper externo */
  className?: string;
};

/**
 * Promo banner reutilizable — el "14 días gratis + 50% off 3 meses".
 * - fullWidth: rompe el container y se extiende edge-to-edge
 * - shimmer mucho más visible que la versión anterior (white/40, frecuencia 2s)
 */
export default function PromoBanner({ fullWidth = false, className = "" }: Props) {
  const wrapperClass = fullWidth
    ? `relative w-screen left-1/2 -translate-x-1/2 ${className}`
    : `relative ${className}`;

  // Mobile: padding vertical reducido (py-3) para línea más fina.
  // Desktop: mantenemos py-5/py-7 para presencia visual.
  const bannerClass = fullWidth
    ? "relative bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] py-3 md:py-7 text-white overflow-hidden border-y border-mint/30 shadow-xl"
    : "relative rounded-2xl bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] py-3 px-4 md:p-7 text-white overflow-hidden shadow-2xl shadow-navy/30 border border-mint/20";

  return (
    <div className={wrapperClass}>
      <div className={bannerClass}>
        {/* SHIMMER mucho más visible — barra de luz blanca/40 con
            mayor ancho (1/2 en vez de 1/3) y frecuencia más alta */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-100%", "250%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
        />
        {/* Segundo shimmer en delay diferente para que siempre haya brillo cruzando */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-100%", "250%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-mint/25 to-transparent -skew-x-12 pointer-events-none"
        />

        <div
          className={`relative z-10 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 ${
            fullWidth ? "container-x" : ""
          }`}
        >
          {/* Icono giratorio REMOVIDO (decisión Bauti 2/6) — la línea queda
              más fina sin ocupar tanto espacio vertical en mobile. */}

          <div className="flex-1">
            {/* MOBILE: una sola línea consolidada "PROMO LANZAMIENTO · 14 días gratis" */}
            <div className="md:hidden flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-mint-soft font-bold">
                Promo lanzamiento
              </span>
              <span className="text-mint" aria-hidden="true">·</span>
              <span className="text-base font-extrabold text-white">
                14 días gratis
              </span>
            </div>

            {/* DESKTOP: versión completa con eyebrow + título largo + subtítulo */}
            <div className="hidden md:block">
              <p className="text-xs md:text-sm font-mono uppercase tracking-[2px] text-mint-soft">
                Promo de lanzamiento
              </p>
              <h3 className="mt-1 text-lg md:text-2xl font-extrabold leading-tight">
                14 días gratis · Después 50% OFF los primeros 3 meses
              </h3>
              <p className="mt-1.5 text-sm md:text-[15px] text-mint-soft/85 leading-relaxed">
                Sin tarjeta · Sin permanencia · Migración asistida incluida
              </p>
            </div>
          </div>

          {fullWidth && (
            <a
              href="#planes"
              className="hidden md:inline-flex items-center gap-2 bg-mint text-navy font-bold px-5 py-2.5 rounded-lg hover:bg-mint-soft transition-colors whitespace-nowrap"
            >
              Ver planes →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
