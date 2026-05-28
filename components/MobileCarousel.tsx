"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode[];
  /**
   * Tailwind class applied to each slide wrapper. Default makes each slide
   * occupy nearly full viewport width with a small peek of the next.
   */
  slideClassName?: string;
  /** Show pagination dots */
  showDots?: boolean;
  /** Show prev/next arrows. When true, arrows are visible on all viewports. */
  showArrows?: boolean;
  /** Slide index to start at (0-based). Useful to center a "recommended" slide. */
  startIndex?: number;
  /** Embla align option. "center" makes the focused slide centered. */
  align?: "start" | "center" | "end";
  /** Extra Tailwind class on the outer wrapper */
  className?: string;
};

/**
 * Mobile-first carousel using Embla. Snaps each slide and exposes pagination
 * dots. Designed to be wrapped in a `md:hidden` container so desktop keeps
 * the original layout untouched.
 */
export default function MobileCarousel({
  children,
  slideClassName = "min-w-[88%] pl-3 first:pl-0",
  showDots = true,
  showArrows = false,
  startIndex = 0,
  align = "start",
  className = "",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    loop: false,
    containScroll: "trimSnaps",
    startIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  return (
    <div className={`relative ${className}`}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {children.map((child, i) => (
            <div key={i} className={slideClassName}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-[#00C9A7]"
                  : "w-2 bg-[#063760]/20 hover:bg-[#063760]/40"
              }`}
            />
          ))}
        </div>
      )}

      {showArrows && emblaApi && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => emblaApi.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg text-[#063760] hover:bg-[#B7F2E5] active:scale-95 transition text-2xl font-bold"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => emblaApi.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg text-[#063760] hover:bg-[#B7F2E5] active:scale-95 transition text-2xl font-bold"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
