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
  /** Show prev/next arrows on desktop */
  showArrows?: boolean;
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
  className = "",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-[#063760] hover:bg-[#B7F2E5] transition"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => emblaApi.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-[#063760] hover:bg-[#B7F2E5] transition"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
