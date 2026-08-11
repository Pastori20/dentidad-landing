"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { DemoStepData } from "./demo-steps";

/**
 * Un paso del demo: la captura, su etiqueta y la notificación, todo como una
 * capa que se funde sobre la anterior dentro de un marco que no se mueve.
 *
 * El reparto del avance dentro del paso es entrada 0-20%, **meseta 20-70%** y
 * salida 70-100%. La meseta es lo que hace que se pueda leer: sin ella el paso
 * cambia todo el tiempo mientras el visitante scrollea y no se entiende nada.
 *
 * Solo se anima `opacity` y `transform`, nunca medidas ni filtros.
 */

type Props = {
  paso: DemoStepData;
  indice: number;
  total: number;
  progreso: MotionValue<number>;
  variante: "desktop" | "mobile";
  /** La primera captura se precarga; el resto va lazy. */
  prioritaria?: boolean;
};

export default function DemoStep({
  paso,
  indice,
  total,
  progreso,
  variante,
  prioritaria = false,
}: Props) {
  const largo = 1 / total;
  const inicio = indice * largo;
  const salida = inicio + 0.7 * largo;
  const fin = inicio + largo;

  /**
   * La entrada arranca ANTES del tramo propio, justo cuando el paso anterior
   * empieza a irse. Así los dos se cruzan y el marco nunca queda en blanco:
   * con la entrada pegada al final de la salida anterior había un instante con
   * las cuatro capas en cero, y se veía un parpadeo.
   */
  const entradaIni = inicio - 0.3 * largo;

  // El primero arranca visible (si no, la sección empieza en blanco) y el
  // último se queda hasta el final (si no, termina en blanco).
  const esPrimero = indice === 0;
  const esUltimo = indice === total - 1;

  /**
   * Cuánto se ve este paso, entre 0 y 1, según el avance del scroll.
   *
   * Va como función y no como el mapa de arreglos de `useTransform`: con el
   * mapa, el paso 1 se desvanecía bien y después **reaparecía** de a poco hasta
   * taparlo todo al final del recorrido — un fantasma encima del último paso.
   * Se veía en la medición del DOM (su opacidad subía linealmente a 1) aunque
   * el `y` del mismo arreglo sí quedaba fijo. Escrita a mano la curva es
   * explícita, y de paso se lee dónde está la meseta.
   */
  const cuantoSeVe = (v: number): number => {
    if (esPrimero && v <= salida) return 1; // arranca visible: nada de sección en blanco
    if (v <= entradaIni) return 0;
    if (v < inicio) return (v - entradaIni) / (inicio - entradaIni); // entrada
    if (v <= salida) return 1; // MESETA: acá se queda quieto y se puede leer
    if (esUltimo) return 1; // el último no se va: si no, termina en blanco
    if (v >= fin) return 0;
    return 1 - (v - salida) / (fin - salida); // salida
  };

  const opacity = useTransform(progreso, cuantoSeVe);
  // Un empujoncito de 12px acompañando el fundido. Solo `transform`.
  const y = useTransform(progreso, (v) => {
    if (v < inicio) return esPrimero ? 0 : 12 * (1 - cuantoSeVe(v));
    if (v <= salida || esUltimo) return 0;
    return -12 * (1 - cuantoSeVe(v));
  });

  const esBandaDeEscritorio = variante === "mobile" && paso.mobileEsEscritorio;
  const src = variante === "desktop" ? paso.desktop : paso.mobile;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ opacity, y }}
    >
      <div className="relative h-full w-full">
        <Image
          alt=""
          className={
            esBandaDeEscritorio
              ? "h-full w-full object-contain p-3"
              : "h-full w-full object-cover object-top"
          }
          fill={false}
          height={variante === "desktop" ? 1800 : 1200}
          priority={prioritaria}
          sizes={variante === "desktop" ? "(max-width: 1024px) 100vw, 960px" : "320px"}
          src={src}
          width={variante === "desktop" ? 2880 : 1000}
        />
      </div>

      {/* Notificación con el lenguaje real de la app. */}
      <div className="absolute top-3 right-3 left-3 flex justify-end md:top-5 md:right-5 md:left-auto">
        <p className="max-w-full truncate rounded-full border border-mint-100 bg-white/95 px-3 py-1.5 font-medium text-[11px] text-navy-700 shadow-sm md:text-xs">
          {paso.notificacion}
        </p>
      </div>

      {/* Etiqueta abajo, sobre un degradado alto y opaco: la captura de atrás
          tiene texto oscuro sobre blanco, y con un velo suave las dos capas de
          texto se mezclaban y no se leía ninguna. */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-navy-900 from-40% via-navy-900/85 to-transparent px-4 pt-16 pb-4 md:px-6 md:pt-20 md:pb-5">
        <p className="font-mono text-[10px] text-mint-200 uppercase tracking-widest md:text-xs">
          Paso {indice + 1} de {total} · {paso.etiqueta}
        </p>
        <p className="mt-1 text-[13px] text-white md:text-base">{paso.detalle}</p>
        {esBandaDeEscritorio ? (
          <p className="mt-1 text-[10px] text-navy-100 md:text-xs">
            El odontograma completo se trabaja desde la computadora.
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
