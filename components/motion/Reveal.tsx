"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Primitiva de entrada: el elemento aparece y sube unos píxeles cuando entra en
 * pantalla, una sola vez.
 *
 * Solo se anima `transform` y `opacity` — nada de desenfoques, sombras ni
 * medidas: eso re-rasteriza y produce tirones en el celular, que es de donde
 * llega la mayoría del tráfico de la landing.
 *
 * Con movimiento reducido no envuelve nada raro: devuelve el contenido tal
 * cual, visible. Nunca se esconde contenido detrás de una animación.
 */

export const REVEAL_DURATION = 0.6;
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  /** Clases del contenedor. */
  className?: string;
  /** Retardo en segundos (para escalonar a mano). */
  delay?: number;
  /** Cuántos píxeles sube al entrar. */
  y?: number;
};

export default function Reveal({ children, className = "", delay = 0, y = 24 }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: REVEAL_DURATION, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
