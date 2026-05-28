import FadeInSection from "./FadeInSection";
import MobileCarousel from "./MobileCarousel";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceArs: number;
  priceUsd: number;
  highlight: boolean;
  cta: string;
  /** What makes THIS plan different (assume common features are listed above) */
  highlights: string[];
  /** Features futuras INCLUIDAS en este tier cuando se lancen (sin upgrade) */
  upcoming: string[];
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
    cta: "Empezar prueba gratis",
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
    cta: "Empezar prueba gratis",
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
    cta: "Hablar con el fundador",
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
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">Planes</p>
            <h2 id="pricing-title" className="section-title mt-3 text-balance">
              Precios claros. Sin sorpresas.
            </h2>
            <p className="section-lead">
              Elegí el plan que se adapta a tu consultorio. Cambialo cuando
              quieras. Sin permanencia, sin contratos eternos.
            </p>
          </div>
        </FadeInSection>

        {/* Promo banner */}
        <FadeInSection>
          <div className="mt-8 md:mt-10 rounded-2xl bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] p-5 md:p-8 text-white flex flex-col md:flex-row md:items-center gap-4 md:gap-8 shadow-lg">
            <div className="flex-shrink-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-mint/20">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C9A7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm font-mono uppercase tracking-[2px] text-mint-soft">
                Promo de lanzamiento
              </p>
              <h3 className="mt-1 text-lg md:text-2xl font-extrabold leading-tight">
                14 días gratis · Después 50% OFF los primeros 3 meses
              </h3>
              <p className="mt-1.5 text-sm md:text-[15px] text-mint-soft/85 leading-relaxed">
                Sin tarjeta · Sin permanencia · Migración asistida incluida
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* SHARED features — what every plan includes */}
        <FadeInSection>
          <div className="mt-8 md:mt-10 rounded-2xl bg-mint-soft/30 border border-mint/30 p-5 md:p-7">
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

        {/* MOBILE: pricing carousel — Clínica centered with side arrows */}
        <div className="mt-10 md:hidden">
          <MobileCarousel
            slideClassName="min-w-[82%] px-2"
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
  return (
    <div
      className={`relative h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isHighlight
          ? "bg-gradient-to-br from-mint-soft/40 to-white border-2 border-mint shadow-lg"
          : "bg-bg-card border border-border/70 hover:border-mint/60"
      }`}
    >
      {/* Ribbon "Más elegido" — INSIDE the card, no overflow */}
      {isHighlight && (
        <div className="bg-mint text-navy text-[11px] font-bold tracking-wider uppercase text-center py-1.5 shadow-sm">
          ⭐ Más elegido
        </div>
      )}

      <div className="p-5 md:p-7 flex flex-col h-full">
        {/* Plan name + tagline */}
        <div>
          <h3 className="text-2xl font-extrabold text-navy">{plan.name}</h3>
          <p className="mt-1 text-sm text-ink-2 leading-snug">{plan.tagline}</p>
        </div>

      {/* Price */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-ink-3">ARS</span>
          <span className="text-3xl md:text-4xl font-extrabold text-navy">
            ${formatArs(plan.priceArs)}
          </span>
        </div>
        <p className="text-xs text-ink-3 mt-1">
          por mes · ≈ USD ${plan.priceUsd}
        </p>
        <div className="mt-3 rounded-lg bg-mint-soft/40 px-3 py-2">
          <p className="text-[11px] font-mono uppercase tracking-[1.5px] text-mint-deep">
            Con promo
          </p>
          <p className="text-sm font-bold text-navy">
            14 días gratis · luego ${formatArs(plan.priceArs / 2)}/mes (3 meses)
          </p>
        </div>
      </div>

      {/* Differentiator features only */}
      <div className="mt-5">
        <p className="text-[10px] font-mono uppercase tracking-[1.5px] text-ink-3">
          Incluido en este plan
        </p>
        <ul className="mt-3 space-y-2.5">
          {plan.highlights.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2.5 text-[14px] leading-snug text-ink"
            >
              <Check />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming features */}
      {plan.upcoming.length > 0 && (
        <div className="mt-5 pt-4 border-t border-dashed border-border/80 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-[1.5px] text-mint-deep flex items-center gap-1.5">
            <ClockIcon />
            Próximamente en este plan
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {plan.upcoming.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2 text-[13px] leading-snug text-ink-2"
              >
                <SoonDot />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-ink-3 italic">
            Sin pagar de nuevo cuando se lance.
          </p>
        </div>
      )}

        {/* CTA */}
        <a
          href="#cta"
          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold text-[15px] transition-colors ${
            isHighlight
              ? "bg-mint text-navy hover:bg-mint-deep hover:text-white"
              : "bg-navy text-white hover:bg-navy/90"
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </div>
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
