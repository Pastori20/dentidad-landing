"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, MouseEvent } from "react";

/**
 * Imagen overview del hero con hover animation premium.
 * - Lift + scale sutiles
 * - Glow se intensifica
 * - 3D tilt sutil basado en posición del mouse (estilo Apple/Linear)
 * - Respeta prefers-reduced-motion
 */
export default function HeroOverviewImage() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for the 3D tilt — solo cuando NO hay reduced motion
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Aplicar transformación 3D sutil — máx 3deg de tilt
    const rotateY = x * 6;
    const rotateX = -y * 4;
    ref.current.style.setProperty("--tilt-x", `${rotateX}deg`);
    ref.current.style.setProperty("--tilt-y", `${rotateY}deg`);
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.setProperty("--tilt-x", "0deg");
    ref.current.style.setProperty("--tilt-y", "0deg");
  }

  if (prefersReducedMotion) {
    // Sin animación — solo render plano
    return (
      <div className="mt-14 md:mt-20 relative">
        <div className="relative max-w-6xl mx-auto">
          <img
            src="/screens/multidispositivos.png"
            alt="Dentidad funcionando en computadora, tablet y celular — vista completa del sistema."
            className="block w-full h-auto drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="mt-14 md:mt-20 relative group"
      style={{
        perspective: "1200px",
      }}
    >
      {/* GLOW que crece y se intensifica en hover */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0.5, scale: 1 },
          hover: { opacity: 1, scale: 1.15 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute -inset-x-8 -inset-y-12 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,201,167,.25), transparent 70%)",
        }}
      />

      {/* GLOW secundario que aparece solo en hover, más profundo */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0, scale: 0.95 },
          hover: { opacity: 1, scale: 1.2 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute -inset-x-16 -inset-y-20 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(24,95,165,.3), transparent 65%)",
        }}
      />

      {/* IMAGEN con tilt 3D + lift + scale */}
      <motion.div
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -10, scale: 1.025 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative max-w-6xl mx-auto"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/multidispositivos.png"
          alt="Dentidad funcionando en computadora, tablet y celular — vista completa del sistema."
          className="block w-full h-auto drop-shadow-2xl"
          loading="eager"
        />

        {/* SHINE — barra de luz que cruza la imagen en hover */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { x: "-100%", opacity: 0 },
            hover: { x: "150%", opacity: 1 },
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>

      {/* Hint sutil — "interactive" feeling, aparece solo si no hovered */}
      <motion.p
        variants={{
          rest: { opacity: 0.6, y: 0 },
          hover: { opacity: 0, y: -8 },
        }}
        transition={{ duration: 0.3 }}
        className="hidden md:block mt-6 text-center text-xs font-mono uppercase tracking-[2px] text-mint/70"
      >
        ↑ Pasá el mouse para ver el detalle
      </motion.p>
    </motion.div>
  );
}
