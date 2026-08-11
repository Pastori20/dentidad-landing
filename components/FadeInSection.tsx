"use client";

/**
 * Alias de `Reveal`, la primitiva canónica de entrada.
 *
 * La lógica se mudó a `components/motion/Reveal.tsx` para que la comparta la
 * sección demo. Este archivo queda con la misma firma para no tocar a los
 * llamadores que ya existen (Audience, CTA, Features…). En código nuevo,
 * importar `Reveal` directamente.
 */
export { default } from "./motion/Reveal";
