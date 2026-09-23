import type { ReactNode } from "react";
import FadeInSection from "./FadeInSection";
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
  title: string;
  body: string;
  bullets: string[];
  icon: ReactNode;
};

const highlights: Highlight[] = [
  {
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

        <div className="mt-8 md:mt-12 grid gap-4 md:gap-5 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <FadeInSection key={item.title} delay={index * 0.08}>
              <article className="h-full rounded-2xl border border-border bg-bg-card p-5 md:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-mint hover:shadow">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft text-mint-deep [&>svg]:h-6 [&>svg]:w-6">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg md:text-xl font-extrabold text-navy tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] md:text-base text-ink-2 leading-relaxed">
                  {item.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-ink leading-snug">
                      <Check />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
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

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00A085"
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
