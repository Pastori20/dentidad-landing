"use client";

import { useEffect, useRef, useState } from "react";

/**
 * La columna derecha del hero: una tablet y un celular reproduciendo Dentidad
 * de verdad.
 *
 * Los videos se grabaron de la demo de la app (pacientes inventados), con el
 * diseño actual, en `public/hero/`:
 * - tablet-demo.mp4 (1400×972): inicio → agenda → pacientes → ficha → odontograma.
 * - celular-demo.mp4 (720×1558): inicio → turnos → paciente → evoluciones.
 *
 * La computadora de la versión anterior se sacó a pedido de Bautista ("la más
 * fea"). Los marcos son CSS: los videos vienen sin carcasa.
 *
 * Arrancan solos, sin sonido y en loop. Cada uno tiene su botón de pausa, y se
 * frenan cuando el hero sale de la pantalla para no gastar batería. Con
 * "reducir movimiento" activado no arrancan solos: se ve el póster y el botón.
 */
export default function DeviceShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[640px] pb-[14%] lg:max-w-none">
      {/* Brillo detrás de los equipos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-[10%] h-[70%] rounded-full bg-mint/20 blur-3xl"
      />

      {/* Tablet, apaisada */}
      <div className="relative w-[90%] rounded-[1.6rem] bg-navy-900 p-[2.2%] shadow-2xl shadow-black/40 ring-1 ring-white/15">
        <DeviceVideo
          src="/hero/tablet-demo.mp4"
          poster="/hero/tablet-demo-poster.jpg"
          label="Dentidad en una tablet: agenda del día, pacientes y odontograma"
          aspect="aspect-[1400/972]"
          rounded="rounded-[1rem]"
          active={visible}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Celular, montado sobre la esquina de la tablet */}
      <div className="absolute bottom-0 right-0 w-[29%] rounded-[1.9rem] bg-navy-900 p-[1.6%] shadow-2xl shadow-black/50 ring-1 ring-white/20 sm:rounded-[2.3rem]">
        <DeviceVideo
          src="/hero/celular-demo.mp4"
          poster="/hero/celular-demo-poster.jpg"
          label="Dentidad en el celular: turnos de hoy y ficha del paciente"
          aspect="aspect-[720/1558]"
          rounded="rounded-[1.6rem] sm:rounded-[2rem]"
          active={visible}
          reducedMotion={reducedMotion}
          small
        />
      </div>
    </div>
  );
}

function DeviceVideo({
  src,
  poster,
  label,
  aspect,
  rounded,
  active,
  reducedMotion,
  small = false,
}: {
  src: string;
  poster: string;
  label: string;
  aspect: string;
  rounded: string;
  /** El hero está en pantalla. */
  active: boolean;
  reducedMotion: boolean;
  small?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lo que eligió la persona con el botón. null = todavía no tocó nada.
  const [userChoice, setUserChoice] = useState<"play" | "pause" | null>(null);
  const [playing, setPlaying] = useState(false);

  const wantsPlay = userChoice === "play" || (userChoice === null && !reducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && wantsPlay) {
      // Algunos navegadores rechazan el play() (ahorro de batería): queda el póster.
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [active, wantsPlay]);

  function toggle() {
    setUserChoice(playing ? "pause" : "play");
  }

  return (
    <div className={`group relative overflow-hidden bg-navy-800 ${rounded} ${aspect}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar video" : "Reproducir video"}
        className={`absolute flex items-center justify-center rounded-full bg-navy/80 text-white shadow-lg ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
          small ? "bottom-2 right-2 h-8 w-8" : "bottom-3 right-3 h-10 w-10"
        } ${playing ? "opacity-60 group-hover:opacity-100 focus-visible:opacity-100" : "opacity-100"}`}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
