"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Scroll con inercia (Lenis) en toda la página.
 *
 * - Solo afecta la rueda y el trackpad: en el celular queda el scroll táctil
 *   nativo, que ya es suave (suavizarlo encima se siente "pesado").
 * - Si la persona pidió menos movimiento en su sistema, no se activa.
 * - Los links a anclas (#features, #planes…) llegan suave y compensan el
 *   header fijo, así el título de la sección no queda tapado.
 *
 * Va como hermano del contenido, no envolviéndolo: así prenderlo o apagarlo
 * no vuelve a montar toda la página.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const m = window.matchMedia(QUERY);
  m.addEventListener("change", avisar);
  return () => m.removeEventListener("change", avisar);
}

export default function SmoothScroll() {
  const menosMovimiento = useSyncExternalStore(
    suscribir,
    () => window.matchMedia(QUERY).matches,
    () => true, // en el servidor no se sabe: arranca apagado y se prende en el navegador
  );

  if (menosMovimiento) return null;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        anchors: { offset: -96 },
      }}
    />
  );
}
