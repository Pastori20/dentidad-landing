"use client";

import { motion } from "framer-motion";
import MobileCarousel from "./MobileCarousel";
import FadeInSection from "./FadeInSection";

type Row = {
  topic: string;
  before: string;
  after: string;
  emoji: string;
};

const rows: Row[] = [
  {
    topic: "Agenda del día",
    emoji: "📅",
    before: "Cuaderno o planilla. Reprogramar es borrar y volver a anotar.",
    after: "Vista de día y semana con estados de turno claros.",
  },
  {
    topic: "Recordatorios",
    emoji: "💬",
    before: "Llamar paciente por paciente la tarde anterior.",
    after: "WhatsApp y email automáticos.",
  },
  {
    topic: "Ficha del paciente",
    emoji: "📋",
    before:
      "Carpetas físicas o planillas separadas que nunca están todas juntas.",
    after: "Datos, obra social, antecedentes y anamnesis en una pantalla.",
  },
  {
    topic: "Odontograma",
    emoji: "🦷",
    before: "Dibujado a mano en un formulario que se pierde.",
    after: "Digital, doble vista inicial y actual, exportable a PDF.",
  },
  {
    topic: "Evoluciones",
    emoji: "📝",
    before: "Anotaciones sueltas que con el tiempo no se entienden.",
    after: "Cada prestación queda anclada a la pieza y la cara.",
  },
  {
    topic: "Estudios y fotos",
    emoji: "📸",
    before: "Mezcladas con tus fotos personales en el celular.",
    after: "Organizadas por paciente: fotos, Rx e informes.",
  },
  {
    topic: "Cobros y saldos",
    emoji: "💰",
    before: "Cuentas en la cabeza o en otra planilla aparte.",
    after: "Caja diaria con desglose por medio de pago.",
  },
  {
    topic: "Acceso",
    emoji: "📱",
    before: "Solo desde la computadora del consultorio.",
    after: "Desde computadora, tablet o celular.",
  },
  {
    topic: "Backup",
    emoji: "🛡️",
    before: "Si pasa algo, perdés todo.",
    after: "Backup automático, datos protegidos.",
  },
];

function FlipCard({ row, index }: { row: Row; index: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative h-full rounded-3xl overflow-hidden bg-white border border-border/40 shadow-lg"
    >
      {/* Topic header with emoji */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3 border-b border-border/40">
        <span className="text-2xl" aria-hidden="true">{row.emoji}</span>
        <div className="flex-1">
          <p className="text-[10px] font-mono uppercase tracking-[1.5px] text-ink-3">
            Tema {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="text-base font-bold text-navy leading-tight">{row.topic}</h3>
        </div>
      </div>

      {/* Hoy panel */}
      <div className="px-5 py-4 bg-gradient-to-br from-[#FFF1EE] to-[#FFE3DC] border-b border-border/40 relative">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#DC2626]/15 text-[#DC2626] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-mono uppercase tracking-[1.5px] text-[#DC2626] font-bold">
              Hoy
            </p>
            <p className="mt-1 text-[13.5px] text-ink-2 leading-snug">{row.before}</p>
          </div>
        </div>
      </div>

      {/* Arrow transition */}
      <div className="flex justify-center -mt-3.5 relative z-10">
        <div className="w-7 h-7 rounded-full bg-navy text-mint-soft flex items-center justify-center shadow-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Con Dentidad panel */}
      <div className="px-5 pt-5 pb-5 bg-gradient-to-br from-mint-soft/40 to-mint/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-mint/20 text-mint-deep flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-mono uppercase tracking-[1.5px] text-mint-deep font-bold">
              Con Dentidad
            </p>
            <p className="mt-1 text-[13.5px] text-ink leading-snug font-medium">{row.after}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Differentiation() {
  return (
    <section
      id="diferencias"
      aria-labelledby="diff-title"
      className="py-14 md:py-28 border-b border-border bg-bg-card"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">Por qué Dentidad</p>
            <h2 id="diff-title" className="section-title mt-3 text-balance">
              De Excel y cuaderno a un solo lugar.
            </h2>
            <p className="section-lead">
              Si hoy tu consultorio funciona con planillas, cuadernos y fotos
              sueltas en el celular, este es el cambio.
            </p>
          </div>
        </FadeInSection>

        {/* Desktop: real table with headers visible from row 1 */}
        <div className="mt-12 md:mt-14 overflow-hidden rounded-lg border border-border bg-bg-card hidden md:block">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Comparación entre el flujo con Excel, cuaderno y WhatsApp y el
              flujo con Dentidad.
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[22%] px-6 py-5 text-left text-xs font-mono uppercase tracking-[2px] text-ink-3 bg-bg/60 border-b border-border"
                >
                  Tema
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-sm font-bold text-ink-2 bg-bg border-b border-border"
                >
                  Excel, cuaderno y WhatsApp
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-sm font-bold text-navy bg-mint-soft/40 border-b border-border"
                >
                  Con Dentidad
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.topic}
                  className={idx % 2 === 0 ? "" : "bg-bg/30"}
                >
                  <th
                    scope="row"
                    className="px-6 py-5 align-top text-left font-bold text-navy border-t border-border/70"
                  >
                    {r.topic}
                  </th>
                  <td className="px-6 py-5 align-top text-ink-2 leading-relaxed border-t border-border/70">
                    <span className="flex items-start gap-2">
                      <XMark />
                      <span>{r.before}</span>
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top text-ink leading-relaxed bg-mint-soft/20 border-t border-border/70">
                    <span className="flex items-start gap-2">
                      <Check />
                      <span>{r.after}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: carousel — swipe through 9 comparisons one at a time */}
        <div className="mt-8 md:hidden">
          <MobileCarousel slideClassName="min-w-[86%] pl-4 first:pl-0">
            {rows.map((r, i) => (
              <FlipCard key={r.topic} row={r} index={i} />
            ))}
          </MobileCarousel>
          <p className="mt-4 text-center text-xs text-ink-3">
            Deslizá para ver las {rows.length} diferencias
          </p>
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <p className="text-ink-2">
            ¿Te suena familiar la columna de la izquierda?
          </p>
          <a href="#cta" className="btn-primary mt-5 inline-flex">
            Solicitar acceso
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00A085"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5 text-ink-3"
    >
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}
