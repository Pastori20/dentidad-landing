/**
 * Los planes de Dentidad: precio y qué incluye cada uno.
 *
 * Una sola fuente para la sección de precios, la página /sobre-dentidad y los
 * archivos para asistentes de IA (/llms.txt y /llms-full.txt). Antes los
 * precios estaban escritos a mano en tres lugares y quedaban desfasados.
 *
 * Es data pura, sin JSX: por eso vive fuera del componente de precios, que es
 * "use client" (un módulo "use client" no puede exportar valores a uno de
 * servidor).
 */

export type PlanTheme = "sky" | "mint" | "navy";

export type Plan = {
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

// Features que TODOS los planes incluyen — se muestran arriba de los cards
// para no repetirlas 3 veces y dejar cada card más liviano.
export const sharedFeatures = [
  "Agenda + recordatorios WhatsApp con link",
  "Ficha clínica completa + odontograma",
  "Anamnesis adulto y odontopediátrico",
  "Acceso desde compu, tablet y celular",
  "Backup automático en la nube",
  "Sin permanencia · Migración asistida",
];

export const plans: Plan[] = [
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
      "Portal del paciente",
      "Galería hasta 500 archivos",
      "Soporte por email",
    ],
    upcoming: [],
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
      "Recordatorios automáticos por email",
      "Reserva de turnos online",
      "Nomenclador + comisiones a derivadores",
      "Historial de cajas día por día",
      "Portal del paciente",
      "Firma de consentimientos",
      "Reportes financieros y clínicos",
      "Caja diaria + recibos PDF",
      "Roles y permisos del equipo",
      "Soporte WhatsApp Business",
    ],
    upcoming: [],
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
      "Todo lo del plan Clínica",
      "Sedes ilimitadas",
      "Hasta 10 dentistas",
      "Portal del paciente",
      "Firma de consentimientos",
      "Facturación electrónica ARCA",
      "Reportes por sede",
      "Soporte directo del fundador",
    ],
    upcoming: [],
  },
];

/** "$50.000" — formato argentino, sin decimales. */
export function formatPlanPrice(priceArs: number): string {
  return `$${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(priceArs)}`;
}
