"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * La columna derecha del hero: un iPad y un iPhone reproduciendo Dentidad de
 * verdad.
 *
 * Los videos se grabaron de la demo de la app (pacientes inventados), con el
 * diseño actual, en `public/hero/`:
 * - tablet-demo.mp4 (1640×1140, viewport 1180×820 = pantalla de iPad Air 11"):
 *   inicio → agenda → pacientes → ficha → odontograma.
 * - celular-demo.mp4 (900×1764, viewport 390×764): inicio → turnos → paciente
 *   → evoluciones. Son los 852 pt de alto del iPhone menos la barra de estado
 *   (54) y la zona de la rayita de inicio (34): esas dos las dibuja el marco,
 *   así las esquinas redondeadas recortan la barra y no el sistema.
 *
 * Los marcos son CSS, con medidas proporcionales a los equipos reales. Todo va
 * en `cqw` (porcentaje del ancho del propio equipo), así se ven iguales en
 * cualquier tamaño.
 *
 * Arrancan solos, sin sonido y en loop; un solo botón pausa los dos. Se frenan
 * cuando el hero sale de la pantalla, y con "reducir movimiento" activado no
 * arrancan solos.
 */
type Device = "ipad" | "phone";

export default function DeviceShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Lo que eligió la persona con el botón. null = todavía no tocó nada.
  const [userChoice, setUserChoice] = useState<"play" | "pause" | null>(null);
  const [playing, setPlaying] = useState(false);
  // El equipo destacado: con el mouse encima, o tocado en pantallas táctiles.
  const [focus, setFocus] = useState<Device | null>(null);
  const lastPointer = useRef<string>("mouse");

  function focusHandlers(device: Device) {
    return {
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") setFocus(device);
      },
      onPointerLeave: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") setFocus(null);
      },
      onPointerDown: (e: React.PointerEvent) => {
        lastPointer.current = e.pointerType;
      },
      // Sin mouse no hay "pasar por encima": tocar destaca, volver a tocar suelta.
      onClick: () => {
        if (lastPointer.current !== "mouse") {
          setFocus((actual) => (actual === device ? null : device));
        }
      },
    };
  }

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.15,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wantsPlay =
    userChoice === "play" || (userChoice === null && !reducedMotion);

  useEffect(() => {
    for (const video of [tabletRef.current, phoneRef.current]) {
      if (!video) continue;
      if (visible && wantsPlay) {
        // Algunos navegadores rechazan el play() (ahorro de batería): queda el póster.
        video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    }
  }, [visible, wantsPlay]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
    >
      {/* Brillo detrás de los equipos: respira todo el tiempo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-[8%] h-[70%] rounded-full bg-mint/20 blur-3xl will-change-transform motion-safe:animate-breathe"
      />

      <div className="relative pb-[16%]">
        {/* iPad: flota (capa de afuera) y reacciona al mouse (capa de adentro) */}
        <div
          className={`relative w-[88%] motion-safe:animate-float-slow ${
            focus === "ipad" ? "z-30" : "z-10"
          }`}
        >
          <div
            {...focusHandlers("ipad")}
            className={`transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
              focus === "ipad"
                ? "scale-[1.03]"
                : focus === "phone"
                  ? "scale-[0.97]"
                  : ""
            }`}
          >
            <IpadFrame dim={focus === "phone"}>
              <DeviceVideo
                videoRef={tabletRef}
                src="/hero/tablet-demo.mp4"
                poster="/hero/tablet-demo-poster.jpg"
                label="Dentidad en una tablet: agenda del día, pacientes y odontograma"
                onPlayingChange={setPlaying}
              />
            </IpadFrame>
          </div>
        </div>

        {/* El iPhone, apoyado sobre la esquina del iPad. Con el mouse encima
            crece desde su esquina y tapa buena parte del iPad. */}
        <div className="absolute bottom-0 right-[1%] z-20 w-[27%] motion-safe:animate-float-fast">
          <div
            {...focusHandlers("phone")}
            className={`origin-bottom-right transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
              focus === "phone"
                ? "scale-[1.45]"
                : focus === "ipad"
                  ? "translate-x-[10%] translate-y-[4%] scale-[0.9]"
                  : ""
            }`}
          >
            <IphoneFrame dim={focus === "ipad"}>
              <DeviceVideo
                videoRef={phoneRef}
                src="/hero/celular-demo.mp4"
                poster="/hero/celular-demo-poster.jpg"
                label="Dentidad en el celular: turnos de hoy y ficha del paciente"
              />
            </IphoneFrame>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center lg:text-left">
        <button
          type="button"
          onClick={() => setUserChoice(playing ? "pause" : "play")}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          {playing ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
          {playing ? "Pausar videos" : "Reproducir videos"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── iPad Air 11", apaisado ─────────────────────────── */

/**
 * Proporciones del iPad Air 11": cuerpo 247,6 × 178,5 mm, pantalla 1180 × 820 pt
 * con esquinas de 18 pt. Borde de aluminio + bisel negro parejo + cámara en el
 * lado largo (arriba, apaisado).
 */
function IpadFrame({
  children,
  dim,
}: {
  children: React.ReactNode;
  /** El otro equipo está destacado: este se oscurece un poco. */
  dim: boolean;
}) {
  return (
    <div className="[container-type:inline-size]">
      <div className="rounded-[4.6cqw] bg-gradient-to-br from-[#8b93a1] via-[#3a404b] to-[#6b7280] p-[0.45cqw] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)]">
        <div className="relative rounded-[4.2cqw] bg-[#0a0b0d] p-[3.1cqw] ring-1 ring-inset ring-white/5">
          {/* Cámara frontal */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[1.25cqw] h-[0.75cqw] w-[0.75cqw] -translate-x-1/2 rounded-full bg-[#1c2230] ring-[0.15cqw] ring-[#11151d]"
          />
          <div className="relative aspect-[1180/820] overflow-hidden rounded-[1.5cqw] bg-navy">
            {children}
            <ScreenEffects dim={dim} shine="motion-safe:animate-shine" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── iPhone 15 Pro ──────────────────────────────── */

/**
 * Proporciones del iPhone 15 Pro: pantalla 393 × 852 pt con esquinas de 55 pt,
 * barra de estado de 54 pt, Dynamic Island de 126 × 37 pt y rayita de inicio de
 * 134 × 5 pt. La barra de estado va en navy: es el `themeColor` de la app, el
 * color que pinta el teléfono cuando Dentidad está instalada.
 *
 * En `cqw` del ancho del cuerpo: marco de titanio 1,1 + bisel 3 = pantalla de
 * 91,8 de ancho. Un punto de pantalla = 91,8 / 393 = 0,2336 cqw.
 */
function IphoneFrame({
  children,
  dim,
}: {
  children: React.ReactNode;
  /** El otro equipo está destacado: este se oscurece un poco. */
  dim: boolean;
}) {
  return (
    <div className="relative [container-type:inline-size]">
      {/* Botones laterales: acción y volumen a la izquierda, encendido a la derecha */}
      <span
        aria-hidden="true"
        className="absolute -left-[0.9cqw] top-[15%] h-[4.5%] w-[1.3cqw] rounded-l-[0.6cqw] bg-[#5b616d]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[0.9cqw] top-[23%] h-[8.5%] w-[1.3cqw] rounded-l-[0.6cqw] bg-[#5b616d]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[0.9cqw] top-[33.5%] h-[8.5%] w-[1.3cqw] rounded-l-[0.6cqw] bg-[#5b616d]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[0.9cqw] top-[26%] h-[13%] w-[1.3cqw] rounded-r-[0.6cqw] bg-[#5b616d]"
      />

      <div className="relative rounded-[17cqw] bg-gradient-to-br from-[#9aa1ad] via-[#454b56] to-[#7c8390] p-[1.1cqw] shadow-[0_40px_70px_-15px_rgba(0,0,0,0.7)]">
        <div className="rounded-[15.9cqw] bg-[#0a0b0d] p-[3cqw]">
          <div className="relative overflow-hidden rounded-[12.85cqw] bg-white">
            {/* Barra de estado: 54 pt */}
            <div className="relative flex h-[12.6cqw] items-center justify-between bg-navy px-[7.2cqw] pt-[0.6cqw] text-white">
              <span className="text-[3.9cqw] font-semibold leading-none tracking-tight">
                9:41
              </span>
              <StatusIcons />
              {/* Dynamic Island */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[2.55cqw] h-[8.65cqw] w-[29.4cqw] -translate-x-1/2 rounded-full bg-black"
              />
            </div>

            {/* La app: 390 × 764 */}
            <div className="relative aspect-[390/764]">{children}</div>

            {/* Zona de la rayita de inicio: 34 pt */}
            <div className="flex h-[7.95cqw] items-end justify-center bg-white pb-[1.9cqw]">
              <span
                aria-hidden="true"
                className="h-[1.2cqw] w-[31.3cqw] rounded-full bg-ink"
              />
            </div>
            <ScreenEffects dim={dim} shine="motion-safe:animate-shine-late" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Encima de cada pantalla: un reflejo de luz que la cruza cada tantos segundos
 * (el del iPhone desfasado del iPad) y una capa oscura para cuando el otro
 * equipo está destacado. Solo transform/opacity.
 */
function ScreenEffects({ dim, shine }: { dim: boolean; shine: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className={`absolute inset-y-0 left-0 w-[35%] -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent will-change-transform ${shine}`}
        />
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-navy-900 transition-opacity duration-500 ${
          dim ? "opacity-40" : "opacity-0"
        }`}
      />
    </>
  );
}

/** Señal, wifi y batería, como en la barra de estado de iOS. */
function StatusIcons() {
  return (
    <span aria-hidden="true" className="flex items-center gap-[1.4cqw]">
      <svg
        viewBox="0 0 18 12"
        className="h-[2.75cqw] w-auto"
        fill="currentColor"
      >
        <rect x="0" y="8" width="3" height="4" rx="0.8" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
        <rect x="10" y="3" width="3" height="9" rx="0.8" />
        <rect x="15" y="0" width="3" height="12" rx="0.8" />
      </svg>
      <svg
        viewBox="0 0 16 12"
        className="h-[2.75cqw] w-auto"
        fill="currentColor"
      >
        <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3C13.4 1.4 10.8.4 8 .4S2.6 1.4.5 3.4l1.2 1.3C3.4 3.1 5.6 2.2 8 2.2z" />
        <path d="M8 5.7c1.5 0 2.8.5 3.9 1.5l1.2-1.3C11.7 4.6 9.9 3.9 8 3.9s-3.7.7-5.1 2l1.2 1.3C5.2 6.2 6.5 5.7 8 5.7z" />
        <path d="M8 9.1c.6 0 1.1.2 1.5.6L8 11.4 6.5 9.7c.4-.4.9-.6 1.5-.6z" />
      </svg>
      <svg viewBox="0 0 27 13" className="h-[2.9cqw] w-auto">
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="12"
          rx="3.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <rect x="2" y="2" width="20" height="9" rx="2.2" fill="currentColor" />
        <path
          d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </svg>
    </span>
  );
}

/* ─────────────────────────────────── Video ──────────────────────────────────── */

function DeviceVideo({
  videoRef,
  src,
  poster,
  label,
  onPlayingChange,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  poster: string;
  label: string;
  /** Solo uno de los dos videos avisa, para el texto del botón. */
  onPlayingChange?: (playing: boolean) => void;
}) {
  return (
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
      onPlay={() => onPlayingChange?.(true)}
      onPause={() => onPlayingChange?.(false)}
    />
  );
}
