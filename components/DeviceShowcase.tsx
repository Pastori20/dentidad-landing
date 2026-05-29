"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

type DeviceId = "mac" | "ipad" | "iphone";

type Device = {
  id: DeviceId;
  label: string;
  image: string;
  /** MP4 H.264 — fallback universal (Safari iOS) */
  video: string;
  /** WEBM VP9 con alpha — preferido en Chrome/Firefox/Edge, corners transparentes */
  videoWebm?: string;
};

// Mac y iPad comparten el mismo video (el sistema corriendo en desktop).
// iPhone usa su propio video con frame de iPhone nativo de la extensión.
// El handling de chassis CSS es por-device en DeviceMedia abajo.
const devices: Device[] = [
  {
    id: "mac",
    label: "Computadora",
    image: "/hero/mac.png",
    video: "/hero/mac-video.mp4",
  },
  {
    id: "ipad",
    label: "Tablet",
    image: "/hero/ipad.png",
    video: "/hero/mac-video.mp4",
  },
  {
    id: "iphone",
    label: "Celular",
    image: "/hero/iphone.png",
    video: "/hero/iphone-video.mp4",
    // WEBM con VP9 alpha — corners transparentes reales (Chrome/Firefox/Edge).
    // Safari iOS cae al .mp4 que tiene corners en negro.
    videoWebm: "/hero/iphone-video.webm",
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
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="block w-full h-auto"
    >
      {/* WEBM con VP9+alpha primero — Chrome/Firefox/Edge tienen corners
          transparentes reales. Si no soporta (Safari iOS), cae al MP4. */}
      {device.videoWebm && (
        <source src={device.videoWebm} type="video/webm" />
      )}
      <source src={device.video} type="video/mp4" />
    </video>
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

  // Render directo SIN ningún efecto, clip, ni manipulación de colores.
  // Los assets (PNG e MP4) vienen tal cual del WEBM/PNG original de la
  // extensión de Chrome — el usuario quiere los videos exactos como los
  // generó la extensión, con chassis baked-in y fondos originales.
  return <div className="drop-shadow-2xl">{media}</div>;
}

/* MacBookChassis CSS wrapper REMOVIDO: el video del Mac ahora viene con el
   chassis MacBook Air baked-in (igual que iPad e iPhone). Ya no necesitamos
   un wrapper CSS para simular el laptop. */
