"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Children, useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Las destacadas en el celular, como historias de Instagram.
 *
 * - Se deslizan con el dedo para los dos lados, para avanzar o volver.
 * - Tocar la parte derecha de la tarjeta pasa a la siguiente; la izquierda
 *   vuelve a la anterior.
 * - Arriba, las rayitas de progreso marcan en cuál estás y sirven para saltar.
 *
 * Usa Embla, el mismo motor que el carrusel de precios. La primera versión
 * usaba el scroll nativo del navegador (scroll-snap) y en el celular de
 * Bautista no se deslizaba; Embla ya estaba probado en la landing. Además
 * `clickAllowed()` distingue un toque de un arrastre, así que deslizar nunca
 * cuenta como toque.
 *
 * Sin avance automático a propósito: son tarjetas para leer.
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const goTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  function handleTap(event: React.MouseEvent<HTMLDivElement>, index: number) {
    // Si fue un arrastre (deslizar), Embla ya movió el carrusel: no es un toque.
    if (!emblaApi || !emblaApi.clickAllowed()) return;
    // Tocar una tarjeta que asoma al costado la trae.
    if (index !== active) {
      emblaApi.scrollTo(index);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const tocoALaDerecha = event.clientX - rect.left > rect.width * 0.35;
    if (tocoALaDerecha) emblaApi.scrollNext();
    else emblaApi.scrollPrev();
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
            className="flex-1 py-2"
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

      <div ref={emblaRef} className="mt-2 overflow-hidden">
        <div className="-ml-3 flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={labels[index] ?? index}
              onClick={(event) => handleTap(event, index)}
              className="min-w-0 shrink-0 grow-0 basis-[88%] cursor-pointer select-none pl-3"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-ink-3">
        Deslizá para los costados o tocá la tarjeta · {active + 1} de {slides.length}
      </p>
    </div>
  );
}
