"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Wrapper client-only para un row horizontal con scroll. Le agrega
 * drag-to-scroll en desktop (clic+arrastrar las cards para desplazar el row).
 * En mobile sigue funcionando el swipe nativo del browser sin tocar nada.
 *
 * Se renderiza como un <ul> y recibe `children` (los <li>) desde el server
 * component padre — así Features.tsx puede seguir siendo server.
 */
export default function DraggableScrollRow({ children, className = "" }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const state = useRef({
    isDown: false,
    hasMoved: false,
    startX: 0,
    scrollLeft: 0,
  });

  function onMouseDown(e: React.MouseEvent) {
    if (!ref.current) return;
    state.current.isDown = true;
    state.current.hasMoved = false;
    state.current.startX = e.pageX - ref.current.offsetLeft;
    state.current.scrollLeft = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
  }

  function onMouseUp() {
    if (!ref.current) return;
    state.current.isDown = false;
    ref.current.style.cursor = "grab";
    ref.current.style.removeProperty("user-select");
  }

  function onMouseLeave() {
    if (!ref.current) return;
    state.current.isDown = false;
    ref.current.style.cursor = "grab";
    ref.current.style.removeProperty("user-select");
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!state.current.isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - state.current.startX) * 1.6; // multiplicador para sentir el drag responsive
    if (Math.abs(walk) > 5) state.current.hasMoved = true;
    ref.current.scrollLeft = state.current.scrollLeft - walk;
  }

  function onClickCapture(e: React.MouseEvent) {
    // Si el usuario arrastró, cancelamos cualquier click que pudiera dispararse
    // en una card o link interno (evita navegación accidental al soltar)
    if (state.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <ul
      ref={ref}
      role="list"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClickCapture={onClickCapture}
      style={{ cursor: "grab" }}
      className={className}
    >
      {children}
    </ul>
  );
}
