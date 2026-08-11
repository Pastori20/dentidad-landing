"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, ReactNode } from "react";
import { REVEAL_DURATION, REVEAL_EASE } from "./Reveal";

/**
 * Entrada escalonada: revela a los hijos uno detrás del otro, con un retardo
 * corto entre cada uno. Sirve para grillas de tarjetas, donde revelarlas todas
 * juntas se siente plano y revelarlas de a una con `Reveal delay=` obliga a
 * calcular el retardo a mano en cada llamador.
 *
 * Mismas reglas que `Reveal`: solo `transform` y `opacity`, una sola vez, y con
 * movimiento reducido queda todo visible sin animar.
 */

/** Retardo entre un hijo y el siguiente. Corto: escalonar de más se siente lento. */
export const STAGGER_SECONDS = 0.07;

type Props = {
  children: ReactNode;
  className?: string;
  /** Clases de cada hijo (el wrapper que agrega este componente). */
  itemClassName?: string;
  y?: number;
};

export default function RevealGroup({
  children,
  className = "",
  itemClassName = "",
  y = 24,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const items = Children.toArray(children);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: STAGGER_SECONDS } },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          className={itemClassName}
          // biome-ignore lint/suspicious/noArrayIndexKey: el orden es el escalonado
          key={i}
          variants={{
            oculto: { opacity: 0, y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
