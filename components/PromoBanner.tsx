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

  const bannerClass = fullWidth
    ? "relative bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] py-5 md:py-7 text-white overflow-hidden border-y border-mint/30 shadow-xl"
    : "relative rounded-2xl bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] p-5 md:p-7 text-white overflow-hidden shadow-2xl shadow-navy/30 border border-mint/20";

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
          className={`relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 ${
            fullWidth ? "container-x" : ""
          }`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-mint/20"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00C9A7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </motion.div>

          <div className="flex-1">
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
