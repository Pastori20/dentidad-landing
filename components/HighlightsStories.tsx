"use client";

import { Children, useCallback, useRef, useState, type ReactNode } from "react";

/**
 * Las destacadas en el celular, como historias de Instagram.
 *
 * - Se deslizan para los dos lados, de a una, para avanzar o volver
 *   (scroll-snap nativo: el gesto lo maneja el navegador, sin librerías).
 * - Tocar la parte derecha de la tarjeta pasa a la siguiente; la izquierda
 *   vuelve a la anterior.
 * - Arriba, las rayitas de progreso marcan en cuál estás y sirven para saltar.
 *
 * Sin avance automático a propósito: son tarjetas para leer, y que se pasen
 * solas mientras alguien lee los puntos es peor que no tener carrusel.
 *
 * En escritorio no se usa: ahí va la grilla de 3 columnas.
 */
export default function HighlightsStories({
  children,
  labels,
}: {
  children: ReactNode;
  /** Un nombre por tarjeta, para los botones de las rayitas (accesibilidad). */
  labels: string[];
}) {
  const slides = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /** Ancho de un paso: la tarjeta más el espacio entre tarjetas. */
  const stepWidth = useCallback(() => {
    const scroller = scrollerRef.current;
    const first = scroller?.firstElementChild as HTMLElement | null;
    if (!scroller || !first) return 0;
    const second = first.nextElementSibling as HTMLElement | null;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const clamped = Math.max(0, Math.min(slides.length - 1, index));
      scroller.scrollTo({ left: clamped * stepWidth(), behavior: "smooth" });
      setActive(clamped);
    },
    [slides.length, stepWidth],
  );

  function handleScroll() {
    const scroller = scrollerRef.current;
    const step = stepWidth();
    if (!scroller || step === 0) return;
    const index = Math.round(scroller.scrollLeft / step);
    if (index !== active) setActive(Math.max(0, Math.min(slides.length - 1, index)));
  }

  /*
    Dónde apoyó el dedo. Si se movió más de unos píxeles, fue un deslizamiento
    (para adelante o para atrás) y NO un toque: sin esto, al deslizar para
    volver, el final del gesto podía contar como toque y mandarlo para adelante.
  */
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function handleTap(event: React.MouseEvent<HTMLDivElement>, index: number) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
      return;
    }
    // Tocar una tarjeta que asoma al costado la trae al centro.
    if (index !== active) {
      goTo(index);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const tocoALaDerecha = event.clientX - rect.left > rect.width * 0.35;
    goTo(tocoALaDerecha ? active + 1 : active - 1);
  }

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Funciones destacadas">
      {/* Rayitas de progreso, como en las historias. */}
      <div className="flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={labels[index] ?? index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver ${labels[index] ?? `tarjeta ${index + 1}`}`}
            aria-current={index === active ? "true" : undefined}
            className="group flex-1 py-2"
          >
            <span className="block h-1 overflow-hidden rounded-full bg-navy/10">
              <span
                className={`block h-full rounded-full bg-mint-deep transition-all duration-300 ${
                  index <= active ? "w-full" : "w-0"
                }`}
              />
            </span>
          </button>
        ))}
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="-mx-6 mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={labels[index] ?? index}
            onPointerDown={handlePointerDown}
            onClick={(event) => handleTap(event, index)}
            className="w-[86%] shrink-0 cursor-pointer snap-start select-none"
          >
            {slide}
          </div>
        ))}
      </div>

      <p className="mt-1 text-center text-xs text-ink-3">
        Deslizá para los costados o tocá la tarjeta · {active + 1} de {slides.length}
      </p>
    </div>
  );
}
