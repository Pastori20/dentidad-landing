"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

type DeviceId = "mac" | "ipad" | "iphone";

type Device = {
  id: DeviceId;
  label: string;
  image: string;
  video: string;
  /** Si necesita que le ponga el frame de browser Mac (los otros vienen con frame nativo de la extensión) */
  needsBrowserFrame: boolean;
};

// Mac y iPad comparten el mismo video (el sistema corriendo en desktop).
// iPhone usa su propio video con frame de iPhone nativo de la extensión.
const devices: Device[] = [
  {
    id: "mac",
    label: "Computadora",
    image: "/hero/mac.png",
    video: "/hero/mac-video.mp4",
    needsBrowserFrame: true,
  },
  {
    id: "ipad",
    label: "Tablet",
    image: "/hero/ipad.png",
    video: "/hero/mac-video.mp4",
    needsBrowserFrame: false,
  },
  {
    id: "iphone",
    label: "Celular",
    image: "/hero/iphone.png",
    video: "/hero/iphone-video.mp4",
    needsBrowserFrame: false,
  },
];

const SPRING = { type: "spring", stiffness: 220, damping: 28 } as const;

/**
 * Hero showcase con 3 dispositivos. Default: grid 3-up con imágenes estáticas.
 * Click en uno → ese se expande grande y reproduce su video. Los otros 2 quedan
 * abajo como mini thumbs clickables. Click "Volver" → vuelve al grid 3-up.
 */
export default function DeviceShowcase() {
  const [activeId, setActiveId] = useState<DeviceId | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-12 md:mt-14 max-w-6xl md:max-w-2xl lg:max-w-2xl mx-auto">
      {/* Hint label sobre el grid — desaparece cuando hay uno expandido */}
      <motion.p
        animate={{ opacity: activeId ? 0 : 0.8, y: activeId ? -8 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-[11px] md:text-xs font-mono uppercase tracking-[2px] text-mint mb-6 md:mb-8 select-none"
      >
        ↓ Tocá un dispositivo para verlo en acción
      </motion.p>

      <AnimatePresence mode="wait" initial={false}>
        {!activeId ? (
          <GridView
            key="grid"
            onSelect={setActiveId}
            disableAnim={!!prefersReducedMotion}
          />
        ) : (
          <ExpandedView
            key="expanded"
            activeId={activeId}
            onSelect={setActiveId}
            onClose={() => setActiveId(null)}
            disableAnim={!!prefersReducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── GRID VIEW (3 cards alineadas) ──────────────────── */

function GridView({
  onSelect,
  disableAnim,
}: {
  onSelect: (id: DeviceId) => void;
  disableAnim: boolean;
}) {
  return (
    <motion.div
      initial={disableAnim ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-12 gap-3 md:gap-6 md:items-center"
    >
      {/* DESKTOP: Mac arriba-izquierda, iPad abajo-izquierda, iPhone al costado
          derecho ocupando ambas rows. MOBILE: stack vertical original. */}

      {/* Mac — top left en desktop, full width en mobile */}
      <DeviceTile
        device={devices[0]}
        onClick={() => onSelect("mac")}
        className="col-span-12 md:col-span-7 md:col-start-1 md:row-start-1"
      />
      {/* iPad — bottom left en desktop, half-row en mobile */}
      <DeviceTile
        device={devices[1]}
        onClick={() => onSelect("ipad")}
        className="col-span-7 md:col-span-7 md:col-start-1 md:row-start-2"
      />
      {/* iPhone — right column spanning both rows en desktop (col-span-5 para
          que el alto del iPhone se aproxime al alto combinado de Mac+iPad), en
          mobile queda al lado del iPad. self-center balancea vertical. */}
      <DeviceTile
        device={devices[2]}
        onClick={() => onSelect("iphone")}
        className="col-span-5 md:col-span-5 md:col-start-8 md:row-start-1 md:row-span-2 md:self-center"
      />
    </motion.div>
  );
}

function DeviceTile({
  device,
  onClick,
  className = "",
}: {
  device: Device;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className={`group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-navy rounded-2xl ${className}`}
      aria-label={`Ver Dentidad en ${device.label}`}
    >
      <DeviceMedia device={device} showVideo={false} />
      <p className="mt-3 md:mt-4 text-center text-[11px] md:text-xs font-mono uppercase tracking-[1.5px] text-white/70 group-hover:text-mint transition-colors">
        {device.label}
      </p>
      {/* Hover badge sutil */}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-mint/90 text-navy text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg"
      >
        ▶ Ver demo
      </motion.span>
    </motion.button>
  );
}

/* ───────────────────────── EXPANDED VIEW (1 grande + 2 thumbs) ────────────── */

function ExpandedView({
  activeId,
  onSelect,
  onClose,
  disableAnim,
}: {
  activeId: DeviceId;
  onSelect: (id: DeviceId) => void;
  onClose: () => void;
  disableAnim: boolean;
}) {
  const active = devices.find((d) => d.id === activeId)!;
  const inactive = devices.filter((d) => d.id !== activeId);

  return (
    <motion.div
      initial={disableAnim ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Active device — grande, reproduce video. Para el iPhone limitamos
          por ALTURA (max-h) además del ancho, así nunca queda más alto que
          el viewport del usuario (mobile chico). */}
      <div
        className={`mx-auto ${
          active.id === "iphone"
            ? "w-full max-w-[260px] sm:max-w-[290px] md:max-w-[320px] max-h-[70vh] md:max-h-[75vh] [&_video]:max-h-[70vh] md:[&_video]:max-h-[75vh] [&_img]:max-h-[70vh] md:[&_img]:max-h-[75vh]"
            : "max-w-4xl"
        }`}
      >
        <DeviceMedia device={active} showVideo />
      </div>

      {/* Footer: thumbs de los otros 2 + botón cerrar */}
      <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-5 flex-wrap">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs md:text-sm font-mono uppercase tracking-[1.5px] transition-colors"
        >
          ← Volver
        </button>

        <div className="flex items-center gap-3 md:gap-4">
          {inactive.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onSelect(d.id)}
              className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-lg p-1 transition-transform hover:scale-105"
              aria-label={`Cambiar a ${d.label}`}
            >
              <div
                className={`overflow-hidden rounded-lg ring-2 ring-transparent group-hover:ring-mint/60 transition-all ${
                  d.id === "iphone" ? "w-12 md:w-14" : "w-20 md:w-24"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt=""
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[1.5px] text-white/60 group-hover:text-mint transition-colors">
                {d.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── MEDIA (image OR video, con frame opcional) ────── */

function DeviceMedia({
  device,
  showVideo,
}: {
  device: Device;
  showVideo: boolean;
}) {
  const media = showVideo ? (
    <video
      key={`${device.id}-video`}
      src={device.video}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="block w-full h-auto"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={`${device.id}-img`}
      src={device.image}
      alt={`Dentidad en ${device.label}`}
      className="block w-full h-auto"
      loading="eager"
    />
  );

  if (device.needsBrowserFrame) {
    return <MacDisplay>{media}</MacDisplay>;
  }

  // iPhone: cuando mostramos el VIDEO, el archivo MP4 tiene fondo gris en las
  // esquinas curvas del marco (MP4 no soporta alpha como sí la PNG estática).
  // Medido en el video real: el gris se extiende hasta ~16% horizontal × ~8%
  // vertical en cada esquina. Usamos border-radius elíptico via STYLE (no via
  // Tailwind porque el slash en Tailwind es para opacity y no genera CSS
  // elíptico). Valores 22%/11% para cubrir con margen de seguridad.
  if (device.id === "iphone" && showVideo) {
    return (
      <div
        className="drop-shadow-2xl overflow-hidden"
        style={{ borderRadius: "22% / 11%" }}
      >
        {media}
      </div>
    );
  }

  // Otros devices con frame propio (iPad, iPhone estático) — solo sombra
  return <div className="drop-shadow-2xl">{media}</div>;
}

/* ───────────────────────── MAC DISPLAY (bezel + browser chrome) ────────────── */

/**
 * Display tipo MacBook/iMac: bezel negro grueso alrededor + browser chrome
 * adentro. Da sensación de pantalla "real" en vez de solo una captura web.
 */
function MacDisplay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Bezel negro exterior — simula el marco del display de un MacBook */}
      <div className="rounded-[14px] md:rounded-[18px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-1.5 md:p-2 shadow-2xl ring-1 ring-white/5">
        {/* Browser chrome */}
        <div className="rounded-[8px] md:rounded-[10px] overflow-hidden bg-white">
          {/* Top bar tipo macOS — fina, no roba mucho espacio vertical */}
          <div className="flex items-center gap-1 px-2.5 py-1 md:py-1.5 bg-gradient-to-b from-[#e9e9e9] to-[#d8d8d8] border-b border-black/10">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff5f57] ring-1 ring-black/5" />
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#febc2e] ring-1 ring-black/5" />
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#28c840] ring-1 ring-black/5" />
            <div className="ml-2 flex-1 max-w-[220px] px-2.5 py-[1px] md:py-0.5 bg-white/80 rounded text-[8px] md:text-[9px] text-gray-500 font-mono text-center truncate leading-tight">
              app.dentidad.com
            </div>
            <div className="w-8" />
          </div>
          {children}
        </div>
      </div>
      {/* Pie/base sutil — pequeña sombra extendida que simula la base del MacBook */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[60%] h-2 rounded-full bg-black/30 blur-md"
      />
    </div>
  );
}
