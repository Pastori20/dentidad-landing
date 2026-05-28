import FadeInSection from "./FadeInSection";

type PlanFeature = { label: string; included: boolean | string };

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceArs: number;
  priceUsd: number;
  highlight: boolean;
  cta: string;
  features: PlanFeature[];
  /** Features futuras INCLUIDAS en este tier cuando se lancen (sin upgrade) */
  upcoming: string[];
};

const formatArs = (n: number) =>
  new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);

const plans: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    tagline: "Para arrancar a digitalizar tu consultorio.",
    priceArs: 50000,
    priceUsd: 40,
    highlight: false,
    cta: "Empezar prueba gratis",
    features: [
      { label: "1 dentista", included: true },
      { label: "Agenda + recordatorios WhatsApp con link", included: true },
      { label: "Ficha clínica + odontograma digital", included: true },
      { label: "Anamnesis adulto y odontopediátrico", included: true },
      { label: "Galería: hasta 500 archivos", included: "500" },
      { label: "Acceso desde compu, tablet y celular", included: true },
      { label: "Backup automático en la nube", included: true },
      { label: "Soporte por email", included: true },
      { label: "Multi-usuario simultáneo", included: false },
      { label: "Reportes", included: false },
      { label: "Multi-sede", included: false },
    ],
    upcoming: ["Portal del paciente"],
  },
  {
    id: "clinica",
    name: "Clínica",
    tagline: "Para consultorios con equipo de trabajo.",
    priceArs: 85000,
    priceUsd: 65,
    highlight: true,
    cta: "Empezar prueba gratis",
    features: [
      { label: "Hasta 3 dentistas + 1 recepción", included: "3 + 1" },
      { label: "Agenda + recordatorios WhatsApp con link", included: true },
      { label: "Ficha clínica + odontograma digital", included: true },
      { label: "Anamnesis adulto y odontopediátrico", included: true },
      { label: "Galería: hasta 5.000 archivos", included: "5.000" },
      { label: "Acceso desde compu, tablet y celular", included: true },
      { label: "Backup automático en la nube", included: true },
      { label: "Multi-usuario simultáneo", included: true },
      { label: "Roles y permisos (admin / pro / recepción)", included: true },
      { label: "Caja diaria + recibos PDF personalizados", included: true },
      { label: "Reportes financieros y clínicos", included: true },
      { label: "Soporte WhatsApp Business", included: true },
      { label: "Onboarding + 1 sesión de capacitación", included: true },
      { label: "Multi-sede", included: false },
    ],
    upcoming: ["Portal del paciente", "Firma digital de consentimientos"],
  },
  {
    id: "multisede",
    name: "Multi-sede",
    tagline: "Para clínicas con múltiples sucursales.",
    priceArs: 300000,
    priceUsd: 230,
    highlight: false,
    cta: "Hablar con el fundador",
    features: [
      { label: "Sedes ilimitadas", included: "∞" },
      { label: "Hasta 10 dentistas", included: "10" },
      { label: "Usuarios de recepción ilimitados", included: "∞" },
      { label: "Vista consolidada o filtrada por sede", included: true },
      { label: "Reportería avanzada por sede", included: true },
      { label: "Caja, recibos y reportes por sede", included: true },
      { label: "Roles y permisos por sede", included: true },
      { label: "Galería ilimitada", included: "∞" },
      { label: "Onboarding + 3 sesiones de capacitación", included: true },
      { label: "Soporte directo del fundador (WhatsApp)", included: true },
      { label: "Acceso anticipado a nuevas features", included: true },
    ],
    upcoming: [
      "Portal del paciente",
      "Firma digital de consentimientos",
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
              Elegí el plan que se adapta a tu consultorio. Cambialo cuando quieras.
              Sin permanencia, sin contratos eternos.
            </p>
          </div>
        </FadeInSection>

        {/* Promo banner — trial + 3 meses al 50% */}
        <FadeInSection>
          <div className="mt-8 md:mt-10 rounded-2xl bg-gradient-to-r from-navy via-[#0a4978] to-[#0f5e95] p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center gap-4 md:gap-8 shadow-lg">
            <div className="flex-shrink-0 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-mint/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00C9A7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm font-mono uppercase tracking-[2px] text-mint-soft">
                Promo de lanzamiento
              </p>
              <h3 className="mt-1 text-xl md:text-2xl font-extrabold leading-tight">
                14 días gratis · Después 50% OFF los primeros 3 meses
              </h3>
              <p className="mt-2 text-sm md:text-[15px] text-mint-soft/85 leading-relaxed">
                Sin tarjeta. Sin permanencia. Migración asistida incluida.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Pricing cards */}
        <div className="mt-10 md:mt-14 grid gap-5 md:gap-6 md:grid-cols-3">
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
              Precios en pesos argentinos · IVA incluido · Sin contratos de
              permanencia · Migración de tus pacientes incluida en el onboarding
            </p>
            <p className="mt-4 text-xs text-ink-3">
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
      className={`relative h-full rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isHighlight
          ? "bg-gradient-to-br from-mint-soft/40 to-white border-2 border-mint shadow-lg"
          : "bg-bg-card border border-border/70 hover:border-mint/60"
      }`}
    >
      {isHighlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint text-navy text-[11px] font-bold tracking-wide uppercase px-3 py-1 shadow-md">
            ⭐ Más elegido
          </span>
        </div>
      )}

      {/* Plan name + tagline */}
      <div>
        <h3 className="text-2xl font-extrabold text-navy">{plan.name}</h3>
        <p className="mt-1 text-sm text-ink-2 leading-snug">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-ink-3">ARS</span>
          <span className="text-4xl font-extrabold text-navy">
            ${formatArs(plan.priceArs)}
          </span>
        </div>
        <p className="text-xs text-ink-3 mt-1">
          por mes · ≈ USD ${plan.priceUsd}
        </p>
        {/* Promo line — strikethrough on regular, show effective */}
        <div className="mt-3 rounded-lg bg-mint-soft/40 px-3 py-2">
          <p className="text-[11px] font-mono uppercase tracking-[1.5px] text-mint-deep">
            Con promo
          </p>
          <p className="text-sm font-bold text-navy">
            14 días gratis · luego ${formatArs(plan.priceArs / 2)}/mes (3 meses)
          </p>
        </div>
      </div>

      {/* Features list */}
      <ul className="mt-6 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-start gap-2.5 text-sm leading-snug ${
              f.included === false ? "text-ink-3" : "text-ink"
            }`}
          >
            {f.included === false ? (
              <XMark />
            ) : (
              <Check />
            )}
            <span>
              {f.label}
              {typeof f.included === "string" && (
                <span className="ml-1.5 inline-flex items-center rounded-md bg-mint-soft/60 px-1.5 py-0.5 text-[11px] font-bold text-mint-deep">
                  {f.included}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* "Próximamente en este plan" — features futuras incluidas sin upgrade */}
      {plan.upcoming.length > 0 && (
        <div className="mt-6 pt-5 border-t border-dashed border-border/80 flex-1">
          <p className="text-[11px] font-mono uppercase tracking-[1.5px] text-mint-deep flex items-center gap-1.5">
            <ClockIcon />
            Próximamente en este plan
          </p>
          <ul className="mt-3 space-y-2">
            {plan.upcoming.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 text-sm leading-snug text-ink-2"
              >
                <SoonDot />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-ink-3 italic">
            Ya incluido cuando esté disponible. Sin pagar de nuevo.
          </p>
        </div>
      )}

      {/* CTA */}
      <a
        href="#cta"
        className={`mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold text-[15px] transition-colors ${
          isHighlight
            ? "bg-mint text-navy hover:bg-mint-deep hover:text-white"
            : "bg-navy text-white hover:bg-navy/90"
        }`}
      >
        {plan.cta}
      </a>
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

function XMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5 text-ink-3/60"
    >
      <path d="M6 6l12 12M6 18L18 6" />
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
      width="16"
      height="16"
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
