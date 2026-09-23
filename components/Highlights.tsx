import type { ReactNode } from "react";
import FadeInSection from "./FadeInSection";
import HighlightsStories from "./HighlightsStories";
import { REGISTER_URL } from "@/lib/config";

/**
 * Lo que más mueve la aguja, apenas se entra.
 *
 * Va arriba de todo (después del hero) porque las cuatro cosas de acá son las
 * que deciden la compra y, hasta el 22/9/2026, la landing no contaba ninguna:
 * la reserva online, la seña por Mercado Pago y la facturación ARCA ya estaban
 * funcionando en producción y la página seguía anunciándolas como futuras.
 *
 * Cada tarjeta arranca con una frase que se sostiene sola —nombra Dentidad y
 * dice el hecho concreto— porque es el formato que un asistente de IA puede
 * levantar sin el resto de la página al lado.
 */

type Highlight = {
  /** El área, en la etiqueta de arriba de la tarjeta. */
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  icon: ReactNode;
};

const highlights: Highlight[] = [
  {
    tag: "Turnos",
    title: "Turnos online y recordatorios que se responden",
    body: "Dentidad le da a tu consultorio un link público para que el paciente saque turno solo, y manda los recordatorios por WhatsApp y por email.",
    bullets: [
      "El paciente elige profesional, día y horario",
      "Confirma o avisa que no viene desde el mismo mensaje",
      "Si avisa, ese horario vuelve a estar disponible",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
        <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
        <path d="M9 14.5l2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: "Turnos",
    title: "Seña del turno con Mercado Pago",
    body: "Dentidad cobra una seña al reservar, con tu propia cuenta de Mercado Pago: la plata entra directo a vos.",
    bullets: [
      "Elegís qué prestaciones llevan seña y de cuánto",
      "El turno se libera solo si no la pagan a tiempo",
      "Menos ausencias en los turnos largos",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
        <path d="M2.5 10h19" />
        <path d="M6.5 14.5h4" />
      </svg>
    ),
  },
  {
    tag: "Clínica",
    title: "Historia clínica y odontograma",
    body: "Dentidad guarda la ficha completa de cada paciente: antecedentes, anamnesis, evoluciones y odontograma digital.",
    bullets: [
      "Doble vista inicial y actual, permanente y temporario",
      "Cada evolución anclada a la pieza y la cara",
      "Fotos, radiografías e informes por paciente",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 3.5c-2.5 0-4 2-4 4.5 0 3 1 4.5 1.5 7 .4 2 .8 4 2 4s1.3-2.5 2-4.5c.3-.9.7-1.5 2-1.5s1.7.6 2 1.5c.7 2 .8 4.5 2 4.5s1.6-2 2-4c.5-2.5 1.5-4 1.5-7 0-2.5-1.5-4.5-4-4.5-1.5 0-2.3.7-3.5.7s-2-.7-3.5-.7z" />
      </svg>
    ),
  },
  {
    tag: "Cobros",
    title: "Cobros, presupuestos y factura ARCA",
    body: "Dentidad arma el presupuesto tratamiento por tratamiento, con precio de contado y cuotas, y emite la Factura C electrónica de ARCA.",
    bullets: [
      "Caja diaria por medio de pago, con historial",
      "Presupuesto al paciente por WhatsApp o email",
      "Factura C con CAE real y PDF con código QR",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2.5h12v19l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" />
        <path d="M9 7.5h6M9 11.5h6M9 15.5h3" />
      </svg>
    ),
  },
  {
    // La objeción que más frena a cambiar de sistema: perder lo que ya está
    // cargado. Es lo primero que pregunta quien viene de otro software.
    tag: "Migración",
    title: "Cambiate sin perder nada",
    body: "Dentidad importa tus pacientes desde Excel o desde el sistema que usás hoy, y te acompaña en el pase.",
    bullets: [
      "Importación desde Excel o CSV, con vista previa",
      "Migración asistida desde otro sistema",
      "Tus datos se exportan cuando quieras",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 7.5h13l-3.5-3.5" />
        <path d="M20 16.5H7l3.5 3.5" />
      </svg>
    ),
  },
  {
    tag: "Pacientes",
    title: "Portal del paciente y ficha previa",
    body: "Dentidad le da a cada paciente su propio link, sin contraseña, para completar sus datos y ver sus turnos y comprobantes.",
    bullets: [
      "Ficha y anamnesis desde el celular, antes de llegar",
      "QR en la sala de espera para completarla ahí",
      "Turnos, comprobantes y presupuestos en PDF",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
        <path d="M9 8.5h6M9 12h6M9 15.5h3" />
      </svg>
    ),
  },
];

export default function Highlights() {
  return (
    <section
      id="destacadas"
      aria-labelledby="highlights-title"
      className="py-14 md:py-20 border-b border-border bg-bg"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">Lo que más usan los consultorios</p>
            <h2 id="highlights-title" className="section-title mt-3 text-balance">
              Todo lo que tu consultorio necesita, funcionando hoy
            </h2>
            <p className="section-lead">
              Dentidad es el software de gestión para consultorios odontológicos
              de Argentina: turnos, historia clínica, cobros y facturación en un
              solo lugar.
            </p>
          </div>
        </FadeInSection>

        {/* Celular: carrusel tipo historias (se desliza o se toca para pasar). */}
        <div className="mt-8 md:hidden">
          <HighlightsStories labels={highlights.map((item) => item.title)}>
            {highlights.map((item, index) => (
              <HighlightCard key={item.title} item={item} index={index} />
            ))}
          </HighlightsStories>
        </div>

        {/* Tablet y escritorio: grilla, 2 columnas y después 3. */}
        <div className="mt-12 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <FadeInSection key={item.title} delay={index * 0.08}>
              <HighlightCard item={item} index={index} />
            </FadeInSection>
          ))}
        </div>

        {/* El cierre del bloque: franja del mismo ancho que las tarjetas. Suelto
            a la izquierda, el botón quedaba colgado. */}
        <FadeInSection>
          <div className="mt-4 md:mt-5 flex flex-col gap-4 rounded-2xl border border-mint/40 bg-mint-soft/30 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-[15px] md:text-base font-bold text-navy">
                Probalo con tus propios pacientes durante 14 días
              </p>
              <p className="mt-1 text-sm text-ink-2">
                Sin tarjeta · Sin permanencia · Migración asistida
              </p>
            </div>
            <a href={REGISTER_URL} className="btn-primary-deep w-full md:w-auto shrink-0">
              Probar 14 días gratis
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/**
 * Una tarjeta destacada. La usan el carrusel del celular y la grilla.
 *
 * Alternadas navy / blanca (pedido de Bautista): en 3 columnas queda un tablero
 * (navy-blanca-navy / blanca-navy-blanca) y en el carrusel se intercalan. La
 * primera, la que más vende, arranca en navy.
 */
function HighlightCard({ item, index }: { item: Highlight; index: number }) {
  const featured = index % 2 === 0;
  const numero = String(index + 1).padStart(2, "0");
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border p-6 md:p-7 transition-all duration-300 md:hover:-translate-y-1 ${
        featured
          ? "border-mint/30 bg-gradient-to-br from-navy via-[#0a4978] to-[#0f5e95] text-white shadow-xl shadow-navy/20 hover:shadow-2xl hover:shadow-navy/30"
          : "border-border bg-bg-card hover:border-mint/60 hover:shadow-xl hover:shadow-navy/10"
      }`}
    >
      {/* Brillo menta en la esquina: se enciende al pasar el mouse. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500 ${
          featured ? "bg-mint/30 opacity-80 group-hover:opacity-100" : "bg-mint/25 opacity-0 group-hover:opacity-100"
        }`}
      />
      {/* El número grande, casi transparente, de fondo. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-6 right-3 select-none text-[7.5rem] font-extrabold leading-none tracking-tighter ${
          featured ? "text-white/[0.06]" : "text-navy/[0.045]"
        }`}
      >
        {numero}
      </span>

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 [&>svg]:h-6 [&>svg]:w-6 ${
              featured
                ? "bg-mint text-navy shadow-lg shadow-mint/30"
                : "bg-navy text-mint shadow-md shadow-navy/20"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${
              featured ? "bg-white/10 text-mint" : "bg-mint-soft/60 text-mint-deep"
            }`}
          >
            {item.tag}
          </span>
        </div>

        <h3
          className={`mt-5 text-lg md:text-xl font-extrabold tracking-tight text-balance ${
            featured ? "text-white" : "text-navy"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-2 text-[15px] leading-relaxed ${
            featured ? "text-white/75" : "text-ink-2"
          }`}
        >
          {item.body}
        </p>

        <ul
          className={`mt-5 space-y-2.5 border-t pt-4 ${
            featured ? "border-white/15" : "border-border"
          }`}
        >
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className={`flex items-start gap-2.5 text-[14px] leading-snug ${
                featured ? "text-white/90" : "text-ink"
              }`}
            >
              <Check light={featured} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={light ? "#00C9A7" : "#00A085"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 flex-shrink-0"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
