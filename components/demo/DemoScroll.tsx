"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import DemoStatic from "./DemoStatic";
import DemoStep from "./DemoStep";
import { DEMO_STEPS } from "./demo-steps";

/**
 * "Un día en tu consultorio": el scroll de la landing ES el demo del producto.
 *
 * El marco queda quieto en pantalla y lo que cambia es la pantalla de adentro —
 * entra un turno, se abre la ficha, se marca el odontograma, se cobra — al
 * ritmo del visitante.
 *
 * Nada de scroll-jacking: es `position: sticky` de CSS más el avance que
 * reporta `useScroll`. Si el visitante empuja fuerte, pasa de largo, y eso está
 * bien. Nunca se le saca el control del scroll.
 *
 * Con movimiento reducido devuelve `DemoStatic`: los cuatro pasos como
 * documento, con toda la información. Y como todo el contenido de los pasos
 * vive en el HTML servido, un lector de pantalla también los recorre.
 */

/**
 * Alto de la sección: cuánto scroll hace falta para recorrer los cuatro pasos.
 * Va literal y no interpolado — Tailwind lee las clases del código fuente y una
 * clase armada con template string no la genera nunca.
 */
const ALTO = "h-[300vh] md:h-[400vh]";

export default function DemoScroll() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const encabezado = (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <p className="font-mono text-mint-600 text-xs uppercase tracking-widest">
        Un día en tu consultorio
      </p>
      <h2 className="mt-2 font-semibold text-2xl text-navy-700 md:text-3xl">
        Así se ve Dentidad trabajando
      </h2>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section className="bg-bg py-16 md:py-24" id="demo">
        {encabezado}
        <div className="mt-10">
          <DemoStatic />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg" id="demo">
      {/* El contenedor alto es el que da recorrido; el sticky de adentro es lo
          que deja el marco quieto mientras se scrollea. */}
      <div className={`relative ${ALTO}`} ref={ref}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-5 py-10 md:gap-8">
          <Reveal>{encabezado}</Reveal>

          {/* Marco desktop: proporción fija, así el fundido entre pasos no salta. */}
          <div className="hidden w-full max-w-5xl px-4 md:block">
            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-bg-card shadow-xl"
              data-demo-frame="desktop"
            >
              {DEMO_STEPS.map((paso, i) => (
                <DemoStep
                  indice={i}
                  key={paso.id}
                  paso={paso}
                  prioritaria={i === 0}
                  progreso={scrollYProgress}
                  total={DEMO_STEPS.length}
                  variante="desktop"
                />
              ))}
            </div>
          </div>

          {/* Marco mobile: el suyo, no el de desktop achicado. Las capturas son
              verticales y salen de la app en su layout de teléfono. */}
          <div className="w-full px-6 md:hidden">
            <div
              className="relative mx-auto aspect-[1/2] w-full max-w-[300px] overflow-hidden rounded-[28px] border-4 border-navy-800 bg-bg-card shadow-xl"
              data-demo-frame="mobile"
            >
              {DEMO_STEPS.map((paso, i) => (
                <DemoStep
                  indice={i}
                  key={paso.id}
                  paso={paso}
                  prioritaria={i === 0}
                  progreso={scrollYProgress}
                  total={DEMO_STEPS.length}
                  variante="mobile"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* El contenido real de los pasos, para lectores de pantalla y para quien
          llegue sin JavaScript: la animación de arriba es `aria-hidden`. */}
      <div className="sr-only">
        <h3>Los cuatro pasos del demo</h3>
        <ol>
          {DEMO_STEPS.map((paso) => (
            <li key={paso.id}>
              {paso.etiqueta}. {paso.detalle} {paso.alt}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
