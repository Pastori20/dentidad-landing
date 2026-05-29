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
    <div className="mt-12 md:mt-16 max-w-6xl mx-auto">
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
      className="grid grid-cols-12 gap-3 md:gap-5 items-end"
    >
      {/* Mac — más ancho (formato horizontal) */}
      <DeviceTile
        device={devices[0]}
        onClick={() => onSelect("mac")}
        className="col-span-12 md:col-span-5"
      />
      {/* iPad — medio (horizontal pero más cuadrado) */}
      <DeviceTile
        device={devices[1]}
        onClick={() => onSelect("ipad")}
        className="col-span-7 md:col-span-4"
      />
      {/* iPhone — angosto (vertical) */}
      <DeviceTile
        device={devices[2]}
        onClick={() => onSelect("iphone")}
        className="col-span-5 md:col-span-3"
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
      {/* Active device — grande, reproduce video */}
      <div
        className={`mx-auto ${
          active.id === "iphone" ? "max-w-[340px] md:max-w-[400px]" : "max-w-4xl"
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
    return <BrowserFrame>{media}</BrowserFrame>;
  }

  // Devices con frame propio (iPad, iPhone) — solo sombra
  return <div className="drop-shadow-2xl">{media}</div>;
}

/* ───────────────────────── BROWSER CHROME para el Mac ─────────────────────── */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
      {/* Top bar tipo macOS */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-b from-[#e7e7e7] to-[#dadada] border-b border-black/10">
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57] ring-1 ring-black/5" />
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e] ring-1 ring-black/5" />
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840] ring-1 ring-black/5" />
        {/* URL pill */}
        <div className="ml-3 flex-1 max-w-[260px] px-3 py-0.5 md:py-1 bg-white/80 rounded-md text-[9px] md:text-[10px] text-gray-500 font-mono text-center truncate">
          app.dentidad.com
        </div>
        <div className="w-12" />
      </div>
      {/* Content */}
      {children}
    </div>
  );
}
