"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Tailwind classes for the wrapper */
  className?: string;
  /** Animation delay in seconds (useful for stagger) */
  delay?: number;
  /** Distance in px the element travels up on enter */
  y?: number;
};

/**
 * Subtle fade-in + slide-up when the element enters the viewport.
 * Respects prefers-reduced-motion. Triggers once.
 */
export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  y = 24,
}: Props) {
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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
