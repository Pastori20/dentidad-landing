"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import MobileCarousel from "./MobileCarousel";
import PromoBanner from "./PromoBanner";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

type PlanTheme = "sky" | "mint" | "navy";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceArs: number;
  priceUsd: number;
  highlight: boolean;
  cta: string;
  /** Color theme — each card has its own gradient bg for visual variety */
  theme: PlanTheme;
  /** What makes THIS plan different (assume common features are listed above) */
  highlights: string[];
  /** Features futuras INCLUIDAS en este tier cuando se lancen (sin upgrade) */
  upcoming: string[];
};

// Gradient + border styles per theme. La carga visual de "destacado" se aplica
// aparte con `isHighlight`, así cualquier theme puede ser el highlight.
const planThemeStyles: Record<PlanTheme, { bg: string; border: string; cta: string }> = {
  // Sky — degradado azul de verdad, SIN blanco en el medio, edges más saturados
  sky: {
    bg: "bg-gradient-to-br from-[#C5DCFA] via-[#DCEEFF] to-[#B5D0F2]",
    border: "border border-[#3B82F6]/30",
    cta: "bg-navy text-white hover:bg-navy/90",
  },
  // Mint — degradado verde-menta lleno, sin blanco, full color brand
  mint: {
    bg: "bg-gradient-to-br from-[#A8EBD8] via-[#C5F1E3] to-[#8FE0CA]",
    border: "border border-mint/50",
    cta: "bg-mint-deep text-white hover:bg-mint hover:text-navy",
  },
  // Navy theme — el del medio (Clínica destacada) tipo Webflow Pro card:
  // fondo navy con accents mint, texto blanco.
  navy: {
    bg: "bg-gradient-to-br from-navy via-[#0a4978] to-[#0f5e95] text-white",
    border: "border border-mint/30",
    cta: "bg-mint text-navy hover:bg-mint-soft",
  },
};

const formatArs = (n: number) =>
  new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);

// Features que TODOS los planes incluyen — se muestran arriba de los cards
// para no repetirlas 3 veces y dejar cada card más liviano.
const sharedFeatures = [
  "Agenda + recordatorios WhatsApp con link",
  "Ficha clínica completa + odontograma",
  "Anamnesis adulto y odontopediátrico",
  "Acceso desde compu, tablet y celular",
  "Backup automático en la nube",
  "Sin permanencia · Migración asistida",
];

const plans: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    tagline: "Para arrancar a digitalizar.",
    priceArs: 50000,
    priceUsd: 40,
    highlight: false,
    theme: "sky",
    cta: "Probar 14 días gratis",
    highlights: [
      "1 dentista",
      "Galería hasta 500 archivos",
      "Soporte por email",
    ],
    upcoming: ["Portal del paciente"],
  },
  {
    id: "clinica",
    name: "Clínica",
    tagline: "Para consultorios con equipo.",
    priceArs: 85000,
    priceUsd: 65,
    highlight: true,
    theme: "navy",
    cta: "Probar 14 días gratis",
    highlights: [
      "Hasta 3 dentistas + recepción",
      "Reportes financieros y clínicos",
      "Caja diaria + recibos PDF",
      "Roles y permisos del equipo",
      "Soporte WhatsApp Business",
    ],
    upcoming: ["Portal del paciente", "Firma de consentimientos"],
  },
  {
    id: "multisede",
    name: "Multi-sede",
    tagline: "Para cadenas multi-sucursal.",
    priceArs: 300000,
    priceUsd: 230,
    highlight: false,
    theme: "mint",
    cta: "Probar 14 días gratis",
    highlights: [
      "Sedes ilimitadas",
      "Hasta 10 dentistas",
      "Reportes por sede",
      "Soporte directo del fundador",
    ],
    upcoming: [
      "Portal del paciente",
      "Firma de consentimientos",
      "Facturación electrónica ARCA",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="planes"
      aria-labelledby="pricing-title"
      className="relative py-10 md:py-20 border-b border-border bg-gradient-to-b from-mint-soft/20 via-bg to-mint-soft/30"
    >
      {/* Decoración de fondo — blobs animados */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-mint/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-32 w-[450px] h-[450px] rounded-full bg-[#1D4ED8]/10 blur-3xl"
        />
      </div>

      <div className="container-x relative z-10">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge animado flotante */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-mint to-mint-deep text-navy px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-mint/30 mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🔥
              </motion.span>
              <span>PROMO DE LANZAMIENTO ACTIVA</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-2 h-2 rounded-full bg-red-500"
              />
            </motion.div>

            <h2 id="pricing-title" className="section-title text-balance">
              Precios claros. Sin sorpresas.
            </h2>
            <p className="section-lead mx-auto">
              Elegí el plan que se adapta a tu consultorio. Cambialo cuando
              quieras. Sin permanencia, sin contratos eternos.
            </p>
          </div>
        </FadeInSection>

        {/* Promo banner FULL-WIDTH — rompe el container con w-screen para que
            ocupe edge-to-edge, igual que el banner que está entre Problem y
            Features. Margen vertical chico para no perder ritmo. */}
        <FadeInSection>
          <div className="mt-6 md:mt-8">
            <PromoBanner fullWidth />
          </div>
        </FadeInSection>

        {/* SHARED features — what every plan includes */}
        <FadeInSection>
          <div className="mt-6 md:mt-8 rounded-2xl bg-mint-soft/30 border border-mint/30 p-5 md:p-7">
            <p className="text-xs font-mono uppercase tracking-[2px] text-mint-deep font-bold flex items-center gap-2">
              <SparkleIcon />
              Todos los planes incluyen
            </p>
            <ul className="mt-4 grid gap-2.5 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sharedFeatures.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm md:text-[15px] text-ink leading-snug"
                >
                  <Check />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInSection>

        {/* MOBILE: pricing carousel — Clínica centered. Cards al 94% para que
            se vean bien anchos, con un mini peek del próximo a cada lado que
            invita a deslizar. */}
        <div className="mt-10 md:hidden -mx-4">
          <MobileCarousel
            slideClassName="min-w-[94%] px-2"
            startIndex={1}
            align="center"
            showArrows
          >
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </MobileCarousel>
          <p className="mt-4 text-center text-xs text-ink-3">
            ← Deslizá para comparar planes →
          </p>
        </div>

        {/* DESKTOP: 3-col grid */}
        <div className="hidden md:grid mt-12 md:mt-14 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeInSection key={plan.id} delay={i * 0.1}>
              <PricingCard plan={plan} />
            </FadeInSection>
          ))}
        </div>

        {/* Closing notes */}
        <FadeInSection>
          <div className="mt-10 md:mt-14 text-center max-w-2xl mx-auto">
            <p className="text-sm md:text-[15px] text-ink-2 leading-relaxed">
              Precios en pesos argentinos · IVA incluido · Sin permanencia
            </p>
            <p className="mt-3 text-xs text-ink-3">
              ¿Necesitás algo distinto? Escribinos a{" "}
              <a
                href="mailto:info.dentidad@gmail.com"
                className="text-mint-deep font-semibold hover:underline"
              >
                info.dentidad@gmail.com
              </a>
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  const t = planThemeStyles[plan.theme];
  // Para tier navy (ahora Clínica destacada) usamos texto blanco/mint
  const isNavyTheme = plan.theme === "navy";
  const titleColor = isNavyTheme ? "text-white" : "text-navy";
  const taglineColor = isNavyTheme ? "text-mint-soft/80" : "text-ink-2";
  const ftrColor = isNavyTheme ? "text-mint-soft/90" : "text-ink";
  const dashedBorderColor = isNavyTheme ? "border-mint-soft/30" : "border-border/80";

  // Estado del toggle del "Próximamente" — colapsado por defecto
  const [showUpcoming, setShowUpcoming] = useState(false);

  return (
    <div
      className={`relative h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${t.bg} ${t.border} ${
        isHighlight
          ? // Highlight card "sobresale": scale + translate up + z-index para
            // que el shadow no quede tapado por los siblings, + ring mint para
            // hacerlo destacar independiente del theme color
            "lg:scale-[1.06] lg:-translate-y-3 lg:z-10 hover:-translate-y-4 ring-4 ring-mint/25 shadow-2xl shadow-mint/30"
          : "hover:-translate-y-1"
      }`}
    >
      {/* Ribbon "Más elegido" — INSIDE the card, no overflow + pulse subtle */}
      {isHighlight && (
        <motion.div
          animate={{
            backgroundColor: ["#00C9A7", "#00A085", "#00C9A7"],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-navy text-[11px] font-bold tracking-wider uppercase text-center py-2 shadow-sm relative overflow-hidden"
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
          />
          <span className="relative z-10">⭐ Más elegido</span>
        </motion.div>
      )}

      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Plan name + tagline */}
        <div>
          <h3 className={`text-xl md:text-2xl font-extrabold ${titleColor}`}>
            {plan.name}
          </h3>
          <p className={`mt-1 text-[13px] md:text-sm leading-snug ${taglineColor}`}>
            {plan.tagline}
          </p>
        </div>

        {/* Price block COMPACT — promo price big, regular strikethrough inline */}
        <div className="mt-4">
          {/* Big promo price */}
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl md:text-4xl font-extrabold ${titleColor}`}>
              ${formatArs(plan.priceArs / 2)}
            </span>
            <span className={`text-sm ${taglineColor}`}>/mes</span>
          </div>
          {/* Strikethrough + promo context */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`text-sm line-through ${isNavyTheme ? "text-mint-soft/55" : "text-ink-3"}`}>
              ${formatArs(plan.priceArs)}
            </span>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isNavyTheme ? "bg-mint/20 text-mint" : "bg-mint/15 text-mint-deep"}`}>
              50% OFF · 3 meses
            </span>
          </div>
          <p className={`mt-2 text-[12px] ${taglineColor}`}>
            14 días gratis para arrancar · sin tarjeta
          </p>
        </div>

        {/* CTA — movido arriba (después del precio) para que se vea sin scroll
            como en Vercel/Stripe. Decisión rápida del usuario */}
        <a
          href="#cta"
          className={`mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold text-[14px] md:text-[15px] transition-colors ${t.cta}`}
        >
          {plan.cta}
        </a>

        {/* Differentiator features — sin eyebrow, más compacto */}
        <ul className="mt-5 space-y-2">
          {plan.highlights.map((feat) => (
            <li
              key={feat}
              className={`flex items-start gap-2 text-[13.5px] leading-snug ${ftrColor}`}
            >
              <Check navy={isNavyTheme} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Upcoming features — COLAPSABLE: arrow toggle */}
        {plan.upcoming.length > 0 && (
          <div className={`mt-4 pt-3 border-t border-dashed ${dashedBorderColor} flex-1`}>
            <button
              type="button"
              onClick={() => setShowUpcoming(!showUpcoming)}
              aria-expanded={showUpcoming}
              aria-controls={`upcoming-${plan.id}`}
              className={`w-full flex items-center justify-between gap-2 text-left group transition-opacity hover:opacity-80 ${
                isNavyTheme ? "text-mint" : "text-mint-deep"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-[1.5px] flex items-center gap-1.5">
                <ClockIcon />
                Próximamente · {plan.upcoming.length}
              </span>
              <motion.span
                animate={{ rotate: showUpcoming ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <ChevronDownIcon />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {showUpcoming && (
                <motion.ul
                  id={`upcoming-${plan.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden space-y-1.5"
                >
                  <li className="h-1" aria-hidden="true" />
                  {plan.upcoming.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-start gap-2 text-[12.5px] leading-snug ${isNavyTheme ? "text-mint-soft/85" : "text-ink-2"}`}
                    >
                      <SoonDot />
                      <span>{feat}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function Check({ navy = false }: { navy?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={navy ? "#00C9A7" : "#00A085"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function SoonDot() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-1"
    >
      <circle cx="8" cy="8" r="6" fill="#00C9A7" fillOpacity="0.18" />
      <circle cx="8" cy="8" r="3" fill="#00C9A7" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5L12 0z" />
    </svg>
  );
}
