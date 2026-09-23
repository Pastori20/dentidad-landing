"use client";

import { useState } from "react";
// Mismo texto que el FAQPage del JSON-LD: Google exige que lo marcado sea
// idéntico a lo visible (ver lib/faq-data.ts).
import { faqs } from "@/lib/faq-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        {/* Desktop: centrado horizontal con mx-auto + text-center.
            Mobile: left-aligned como antes (más natural en pantalla angosta). */}
        <div className="max-w-3xl md:mx-auto md:text-center">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title" className="section-title mt-3 text-balance">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mt-8 md:mt-12 max-w-3xl md:mx-auto space-y-3">
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
