"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Necesito instalar algo en mi computadora?",
    a: "No. Dentidad funciona desde el navegador. Lo abrís desde la computadora del consultorio, desde tu tablet o desde el celular sin instalar nada.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Los datos viajan encriptados, se guardan en infraestructura profesional de nube y se hacen backups automáticos. Ningún dato queda en la computadora del consultorio: si se rompe o la cambiás, todo sigue en su lugar.",
  },
  {
    q: "¿Qué pasa si se va internet en el consultorio?",
    a: "Hoy Dentidad requiere conexión a internet para funcionar. Estamos trabajando en un modo offline para sumar más adelante.",
  },
  {
    q: "¿Puedo darle acceso a mi secretaria o a otro profesional?",
    a: "Sí. Podés sumar usuarios con roles diferenciados: profesional, recepción o administrador. Cada uno ve y edita lo que le corresponde según su rol.",
  },
  {
    q: "¿Las obras sociales argentinas ya vienen cargadas?",
    a: "Sí. Federada Salud, Swiss Medical, Prevención Salud, APROSS, Unimed, SanCor Salud, Galeno, JS Jerárquicos, Medifé, Integral, Omint y Particular. Si te falta alguna, la sumamos.",
  },
  {
    q: "¿Dentidad emite facturas de ARCA?",
    a: 'Por ahora no. Dentidad genera comprobantes y recibos internos imprimibles con tus datos y matrícula, ideales para entregar al paciente. Para la facturación electrónica fiscal seguís usando "Comprobantes en Línea" de ARCA y podés guardar el número en Dentidad. La integración con ARCA está en planes.',
  },
  {
    q: "¿Cómo migro mis datos de Excel o de mi sistema actual?",
    a: "Si tenés tu información en Excel, planillas o un sistema anterior, te podemos dar una mano para importarla al inicio. Escribinos y vemos cómo arrancar con todo cargado de entrada.",
  },
  {
    q: "¿Qué pasa si quiero dejar de usar Dentidad?",
    a: "Tus datos son tuyos. Podés exportar toda tu información en cualquier momento y cancelar cuando quieras.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title" className="section-title mt-3 text-balance">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mt-8 md:mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={f.q}
                className="bg-bg-card border border-border rounded-md overflow-hidden"
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-bg/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-inset"
                  >
                    <span className="font-bold text-navy text-[15px] md:text-[17px] leading-snug">
                      {f.q}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                      className={`flex-shrink-0 text-ink-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-4 md:px-5 pb-4 md:pb-5 text-ink-2 leading-relaxed border-t border-border/70 pt-3 md:pt-4 text-[15px] md:text-base"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
