import ScreenTile from "./ScreenTile";
import MobileCarousel from "./MobileCarousel";
import FadeInSection from "./FadeInSection";
import type { CSSProperties, ReactNode } from "react";

// La category sigue en el data por compatibilidad con código existente, pero
// ya no se usa para dividir features en tabs.
type FeatureCategory = "diaadia" | "clinica" | "escalar";

type TileSpec = {
  // Pre-cropped screenshot rendered at its natural aspect ratio.
  kind: "tile";
  src: string;
  alt: string;
};

type PlaceholderSpec = {
  kind: "placeholder";
  filename: string;
  aspect: string;
  hint?: string;
};

type StackSpec = {
  kind: "stack";
  // Vertical stack of tiles (one on top of the other)
  tiles: Array<TileSpec | PlaceholderSpec>;
  gap?: string;
  // Index of the tile to show on mobile (others are hidden via md:block).
  // Defaults to 0 (first tile).
  mobileShowIndex?: number;
};

type SideBySideSpec = {
  kind: "side";
  // Two tiles side by side (good for "two snippets" of the same screen)
  left: TileSpec | PlaceholderSpec;
  right: TileSpec | PlaceholderSpec;
};

type IllustrationSpec = {
  // Inline SVG/React illustration — for features without a real screenshot
  // (e.g. multi-sede, where the visual idea is a relationship diagram
  // rather than a screen).
  kind: "illustration";
  name: "multisede" | "reportes";
  alt: string;
};

type Visual =
  | TileSpec
  | PlaceholderSpec
  | StackSpec
  | SideBySideSpec
  | IllustrationSpec;

type FeatureBlock = {
  id: string;
  category: FeatureCategory;
  title: string;
  body: string;
  bullets: string[];
  visual: Visual;
};

const features: FeatureBlock[] = [
  {
    id: "feature-odontograma",
    category: "clinica",
    title: "Odontograma profesional",
    body: "Vista doble inicial y actual, permanente y temporario. Cinco caras por pieza, ocho procedimientos clínicos. Cada evolución queda anclada a la pieza y la cara específica, así no perdés trazabilidad.",
    bullets: [
      "Permanente y temporario en una sola pantalla",
      "Cinco caras por pieza, ocho procedimientos",
      "Exportable a PDF para imprimir o adjuntar",
    ],
    visual: {
      kind: "stack",
      gap: "gap-4",
      tiles: [
        {
          kind: "tile",
          src: "/screens/odo-completo.png",
          alt: "Odontograma de Dentidad con arcadas superior e inferior permanente, dientes temporarios y panel lateral con la pieza seleccionada.",
        },
        {
          kind: "tile",
          src: "/screens/odo-procedimientos.png",
          alt: "Barra de procedimientos clínicos del odontograma de Dentidad: restauración, sellador, corona, endodoncia, extracción, implante, ausente y prótesis.",
        },
      ],
    },
  },
  {
    id: "feature-agenda",
    category: "diaadia",
    title: "Agenda con recordatorios inteligentes por WhatsApp",
    body: "Mandá recordatorios por WhatsApp con un link interactivo: el paciente confirma asistencia o avisa ausencia desde el mensaje, y el estado del turno se actualiza solo en tu agenda. Cero llamadas perdidas, cero idas y vueltas.",
    bullets: [
      "Link de confirmación / ausencia en cada WhatsApp",
      "Estado del turno se actualiza automáticamente cuando el paciente responde",
      "Día y semana, con bloqueos por franja horaria",
      "Cinco estados claros: confirmado, con recordatorio, pendiente, ausente con o sin aviso",
    ],
    visual: {
      kind: "stack",
      gap: "gap-4",
      mobileShowIndex: 1,
      tiles: [
        {
          kind: "tile",
          src: "/screens/agenda-header.png",
          alt: "Cabecera de la agenda de Dentidad con el día activo, métricas de turnos visibles, pendientes y bloqueos, y selector de día o semana.",
        },
        {
          kind: "tile",
          src: "/screens/agenda-turnos.png",
          alt: "Vista de la agenda diaria de Dentidad con turnos consecutivos y un bloqueo horario de agenda cerrada.",
        },
      ],
    },
  },
  {
    id: "feature-ficha",
    category: "clinica",
    title: "Ficha clínica completa",
    body: "Datos personales, obra social y antecedentes médicos con chips visuales. Todo el paciente en una sola pantalla, sin saltar entre planillas.",
    bullets: [
      "Datos personales, obra social y plan",
      "Antecedentes médicos con chips visuales (alergias, medicación, cirugías, enfermedades)",
      "Notas y observaciones por paciente",
    ],
    visual: {
      kind: "stack",
      gap: "gap-4",
      tiles: [
        {
          kind: "tile",
          src: "/screens/ficha-paciente.png",
          alt: "Cabecera del paciente seleccionado en Dentidad: nombre, edad, DNI, fecha de nacimiento y obra social, con accesos a editar ficha y nuevo turno.",
        },
        {
          kind: "tile",
          src: "/screens/ficha-datos.png",
          alt: "Bloque Datos personales en la ficha del paciente: apellido y nombre, fecha de nacimiento, DNI, teléfono, email y contacto de emergencia.",
        },
        {
          kind: "tile",
          src: "/screens/ficha-antecedentes.png",
          alt: "Bloque Antecedentes médicos en la ficha del paciente en Dentidad: alergias, medicación, cirugías y enfermedades con chips visuales.",
        },
      ],
    },
  },
  {
    id: "feature-anamnesis",
    category: "clinica",
    title: "Anamnesis con dos formularios",
    body: "Dos cuestionarios separados: uno para pacientes adultos y otro para odontopediatría. Cada respuesta queda asociada al paciente como antecedente clínico ordenado.",
    bullets: [
      "Cuestionario adulto y odontopediátrico bien diferenciados",
      "Respuestas Sí / No por ítem con detalle libre cuando corresponde",
      "Queda guardado dentro de la ficha del paciente",
    ],
    visual: {
      kind: "tile",
      src: "/screens/ficha-anamnesis.png",
      alt: "Cuestionario de anamnesis en Dentidad con selector Adulto / Odontopediátrica y preguntas con respuestas Sí / No por categoría: alergias, enfermedades, medicación y hábitos.",
    },
  },
  {
    id: "feature-evoluciones",
    category: "clinica",
    title: "Evoluciones ancladas a la pieza",
    body: "Registrá cada prestación clínica del día y, si corresponde, vinculala al odontograma actual. Cada evolución queda anclada a la pieza y cara afectada, así la bitácora del paciente nunca pierde trazabilidad.",
    bullets: [
      "Bitácora con fecha, prestación y código",
      "Vinculación opcional al odontograma del paciente",
      "Cada entrada queda anclada a la pieza y cara afectada",
    ],
    visual: {
      kind: "tile",
      src: "/screens/evoluciones.png",
      alt: "Lista de evoluciones anteriores del paciente en Dentidad: extracción de piezas 14 y 24 y restauración vestibular en pieza 26, con chips de odontograma actual, pieza y cara.",
    },
  },
  {
    id: "feature-caja",
    category: "diaadia",
    title: "Caja diaria y comprobantes",
    body: "Presupuestos y pagos por paciente con saldo siempre actualizado. Caja diaria con desglose por medio de pago. Recibos numerados con PDF imprimible.",
    bullets: [
      "Caja diaria con desglose por medio de pago",
      "Presupuestos y pagos por paciente con saldo",
      "Recibos numerados con PDF imprimible",
    ],
    visual: {
      kind: "stack",
      gap: "gap-4",
      tiles: [
        {
          kind: "tile",
          src: "/screens/caja-paciente.png",
          alt: "Tarjeta navy del paciente seleccionado en la caja de Dentidad: nombre, estado de pago, monto pagado, saldo y referencias de último pago, presupuesto y movimientos.",
        },
        {
          kind: "tile",
          src: "/screens/caja-movimientos.png",
          alt: "Tabla Movimientos reales de la caja de Dentidad con filtros por paciente, tipo, estado y fecha, y columnas recibo, tipo, concepto, medio, fecha, importe, saldo, estado y acciones.",
        },
      ],
    },
  },
  {
    id: "feature-galeria",
    category: "clinica",
    title: "Galería de estudios por paciente",
    body: "Subí fotos clínicas, radiografías e informes y dejá todo organizado por paciente. Filtros rápidos para encontrar lo que necesitás sin revolver el celular.",
    bullets: [
      "Filtros por tipo: fotos, Rx e informes",
      "Vista previa con miniatura y fecha de carga",
      "Descarga y eliminación con un click",
    ],
    visual: {
      kind: "tile",
      src: "/screens/galeria.png",
      alt: "Galería de estudios por paciente en Dentidad con tabs por tipo de archivo y tarjetas para una foto intraoral y una radiografía panorámica.",
    },
  },
  {
    id: "feature-reportes",
    category: "escalar",
    title: "Reportes clínicos y financieros",
    body: "Toda la información de tu consultorio en tablas y gráficos sin armar nada en Excel. Cobros, turnos, pacientes y performance — actualizados en vivo y exportables a PDF.",
    bullets: [
      "Cobros por período, paciente y medio de pago",
      "Turnos del mes: confirmados, cancelados, ausentes",
      "Performance por profesional (clínicas con asociados)",
      "Todo exportable a PDF para imprimir o compartir",
    ],
    visual: {
      kind: "illustration",
      name: "reportes",
      alt: "Vista de reportes en Dentidad: barras mostrando cobros mensuales, métricas de turnos y línea de tendencia.",
    },
  },
  {
    id: "feature-multidispositivos",
    category: "escalar",
    title: "Funciona en cualquier dispositivo",
    body: "Computadora, tablet o celular. Mismo Dentidad, misma información, sincronizado en vivo desde el navegador.",
    bullets: [
      "Sin instalar nada — corre desde el navegador",
      "Mismo login en compu, tablet y celular",
      "Sincronización en vivo — empezás un turno en la PC, terminás en el celu",
      "Diseñado mobile-first para usar entre pacientes",
    ],
    visual: {
      kind: "tile",
      src: "/screens/multidispositivos.png",
      alt: "Dentidad funcionando en computadora, tablet y celular simultáneamente con la misma información sincronizada.",
    },
  },
  {
    id: "feature-multisede",
    category: "escalar",
    title: "Multi-sede en una sola cuenta",
    body: "Si tu clínica tiene más de un consultorio, gestionalos todos desde la misma cuenta. Cada sede con su agenda, sus profesionales y su caja — sin pagar usuarios extra ni cambiar de sistema cuando abras una nueva.",
    bullets: [
      "Agenda y profesionales independientes por sede",
      "Vista consolidada o filtrada por sede en un click",
      "Caja, reportes y permisos separados por sede",
      "Sumá nuevas sedes sin migrar de sistema",
    ],
    visual: {
      kind: "illustration",
      name: "multisede",
      alt: "Diagrama: una cuenta de Dentidad gestiona tres sedes (Centro, Norte y Sur), cada una con su agenda, caja y profesionales por separado.",
    },
  },
];

type IncluyeItem = {
  title: string;
  blurb?: string;
  icon: ReactNode;
  size: "small" | "spotlight";
  theme: "mint" | "navy" | "sky";
  /** Only used when size === "spotlight" */
  spotlight?: boolean;
};

const inclusos: IncluyeItem[] = [
  {
    title: "Evoluciones vinculadas al odontograma",
    size: "small",
    theme: "mint",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="20" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Fotos, Rx e informes por paciente",
    size: "small",
    theme: "sky",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 16l5-5 4 4 3-3 6 6" />
        <circle cx="9" cy="10" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Alertas del día en el dashboard",
    size: "small",
    theme: "navy",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" />
        <path d="M10 18a2 2 0 004 0" />
      </svg>
    ),
  },
  {
    title: "Sumá tu equipo",
    blurb: "Secretaria, asistente, asociados.",
    size: "small",
    theme: "mint",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Roles y permisos",
    blurb: "Administrador, profesional, recepción — cada uno ve lo que tiene que ver.",
    size: "small",
    theme: "sky",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
    ),
  },
  {
    title: "Backup automático de tus datos",
    size: "small",
    theme: "navy",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    title: "Obras sociales argentinas",
    blurb: "OSDE, Swiss, Federada, IOMA, PAMI y más, precargadas.",
    size: "small",
    theme: "mint",
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 11h.01" />
      </svg>
    ),
  },
];

const themeStyles: Record<IncluyeItem["theme"], { bg: string; iconBg: string; iconColor: string; titleColor: string; blurbColor: string; blob: string }> = {
  mint: {
    bg: "bg-gradient-to-br from-[#B7F2E5] via-[#D2F7EB] to-[#E8FBF4]",
    iconBg: "bg-white/70",
    iconColor: "text-mint-deep",
    titleColor: "text-navy",
    blurbColor: "text-ink-2",
    blob: "bg-mint/30",
  },
  navy: {
    bg: "bg-gradient-to-br from-navy via-[#0a4978] to-[#0f5e95]",
    iconBg: "bg-white/15",
    iconColor: "text-mint-soft",
    titleColor: "text-white",
    blurbColor: "text-mint-soft/85",
    blob: "bg-mint/20",
  },
  sky: {
    bg: "bg-gradient-to-br from-[#DCEEFF] via-[#C5E1FA] to-[#A8D3F5]",
    iconBg: "bg-white/70",
    iconColor: "text-[#1D4ED8]",
    titleColor: "text-navy",
    blurbColor: "text-ink-2",
    blob: "bg-[#3B82F6]/30",
  },
};

// Slide para el carousel desktop — phone (iPhone mobile screenshot) a la
// izquierda, texto a la derecha. Mismo layout que tenía el desktop antes pero
// dentro de un carousel y usando los iPhone screenshots que quedan más lindos.
function DesktopFeatureSlide({ feature }: { feature: FeatureBlock }) {
  return (
    <article
      id={`${feature.id}-desktop`}
      aria-labelledby={`${feature.id}-title-desktop`}
      className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center px-4 lg:px-16 py-4"
    >
      {/* Visual — iPhone screenshot cuando existe, fallback al desktop tile */}
      <div className="flex justify-center">
        <DesktopFeatureVisual feature={feature} />
      </div>
      {/* Texto */}
      <div className="max-w-xl">
        <h3
          id={`${feature.id}-title-desktop`}
          className="text-2xl lg:text-3xl font-extrabold text-navy tracking-tight text-balance"
        >
          {feature.title}
        </h3>
        <p className="mt-4 text-ink-2 text-[16px] lg:text-[17px] leading-relaxed">
          {feature.body}
        </p>
        <ul className="mt-5 space-y-2.5">
          {feature.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-ink leading-relaxed"
            >
              <CheckMark />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// Para el carousel desktop usamos los iPhone screenshots cuando existen — son
// más lindos y consistentes con el mobile. Si no hay screenshot mobile para
// esa feature, caemos al FeatureVisual tradicional (SVG illustrations, etc.)
function DesktopFeatureVisual({ feature }: { feature: FeatureBlock }) {
  const mobileSrc = MOBILE_SCREENSHOTS_DESKTOP[feature.id];
  if (mobileSrc) {
    const isHorizontal = feature.id === "feature-odontograma";
    return (
      <img
        src={mobileSrc}
        alt={feature.title}
        className={
          isHorizontal
            ? "w-full max-w-[440px] h-auto drop-shadow-2xl"
            : "w-auto max-h-[440px] drop-shadow-2xl"
        }
        loading="lazy"
      />
    );
  }
  // Fallback al FeatureVisual original (SVG illustrations, screenshots desktop)
  return (
    <div className="w-full max-w-[500px]">
      <FeatureVisual visual={feature.visual} />
    </div>
  );
}

const MOBILE_SCREENSHOTS_DESKTOP: Record<string, string> = {
  "feature-agenda": "/screens/mobile/agenda-mobile.png",
  "feature-ficha": "/screens/mobile/ficha-mobile.png",
  "feature-odontograma": "/screens/mobile/odontograma-mobile.png",
  "feature-caja": "/screens/mobile/caja-mobile.png",
};

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">Funcionalidades</p>
            <h2 id="features-title" className="section-title mt-3 text-balance">
              Todo lo que necesita tu consultorio, sin software accesorio.
            </h2>
            <p className="section-lead">
              Una sola plataforma para agenda, ficha clínica, odontograma y cobros.
              Pensada para el día a día del consultorio.
            </p>
          </div>
        </FadeInSection>

        {/* MOBILE: carousel — one feature per slide, compact card */}
        <div className="mt-8 md:hidden">
          <MobileCarousel slideClassName="min-w-[88%] pl-4 first:pl-0">
            {features.map((f) => (
              <article
                key={f.id}
                id={`${f.id}-mobile`}
                aria-labelledby={`${f.id}-title-mobile`}
                className="bg-gradient-to-br from-white to-mint-soft/20 border border-border rounded-2xl p-5 h-full flex flex-col shadow-sm"
              >
                {/* Compact visual area — fixed height so cards align */}
                <div className="mb-4 flex items-center justify-center min-h-[180px] max-h-[220px] overflow-hidden">
                  <FeatureMobileVisual feature={f} />
                </div>
                <h3
                  id={`${f.id}-title-mobile`}
                  className="text-lg font-extrabold text-navy tracking-tight text-balance leading-tight"
                >
                  {f.title}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {f.bullets.slice(0, 3).map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-ink leading-snug text-[13px]"
                    >
                      <CheckMark />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </MobileCarousel>
          <p className="mt-3 text-center text-xs text-ink-3">
            Deslizá para ver todas las funcionalidades
          </p>
        </div>

        {/* DESKTOP: carousel único con TODAS las features, side-by-side
            (iPhone screenshot a la izquierda, texto a la derecha). */}
        <div className="hidden md:block mt-16">
          <MobileCarousel
            slideClassName="min-w-full"
            align="center"
            showArrows
          >
            {features.map((f) => (
              <DesktopFeatureSlide key={f.id} feature={f} />
            ))}
          </MobileCarousel>
          <p className="mt-2 text-center text-xs text-ink-3">
            Usá las flechas o los dots para ver todas las funcionalidades
          </p>
        </div>

        <FadeInSection>
          <div className="mt-16 md:mt-32">
            <div className="max-w-3xl">
              <p className="eyebrow">El paquete completo</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mt-3">
                Todo lo que incluye
              </h3>
            </div>

            <BentoIncluye items={inclusos} />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function FeatureVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "illustration") {
    if (visual.name === "multisede") {
      return <MultiSedeIllustration alt={visual.alt} />;
    }
    if (visual.name === "reportes") {
      return <ReportesIllustration alt={visual.alt} />;
    }
    return null;
  }

  if (visual.kind === "tile") {
    return <ScreenTile src={visual.src} alt={visual.alt} />;
  }

  if (visual.kind === "placeholder") {
    return (
      <PlaceholderTile
        filename={visual.filename}
        aspect={visual.aspect}
        hint={visual.hint}
      />
    );
  }

  if (visual.kind === "side") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <SingleTile spec={visual.left} />
        <SingleTile spec={visual.right} />
      </div>
    );
  }

  // stack
  const mobileIdx = visual.mobileShowIndex ?? 0;
  return (
    <div className={`flex flex-col ${visual.gap ?? "gap-3"}`}>
      {visual.tiles.map((spec, i) => (
        <div key={i} className={i === mobileIdx ? "" : "hidden md:block"}>
          <SingleTile spec={spec} />
        </div>
      ))}
    </div>
  );
}

function MultiSedeIllustration({ alt }: { alt: string }) {
  return (
    <div className="rounded-md overflow-hidden border border-border bg-bg-card shadow-sm">
      <svg
        viewBox="0 0 600 460"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
        className="w-full h-auto block"
      >
        <rect width="600" height="460" fill="#E8F0FA" />

        {/* Parent: Dentidad account */}
        <rect x="200" y="36" width="200" height="92" rx="12" fill="#063760" />
        <rect x="216" y="54" width="56" height="56" rx="12" fill="#FFFFFF" />
        <text x="244" y="100" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="900" fontSize="46" fill="#063760" textAnchor="middle">d</text>
        <circle cx="265" cy="62" r="6" fill="#00C9A7" />
        <text x="290" y="80" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">Dentidad</text>
        <text x="290" y="104" fontFamily="DM Sans, system-ui, sans-serif" fontSize="13" fill="#B7F2E5">Una cuenta</text>

        {/* Connectors */}
        <path d="M300 128 V170 H 115 V210" stroke="#185FA5" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M300 128 V210" stroke="#185FA5" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M300 128 V170 H 485 V210" stroke="#185FA5" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Sede Centro */}
        <rect x="30" y="210" width="170" height="220" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="58" cy="244" r="15" fill="#B7F2E5" />
        <path d="M58 236.5 a6 6 0 0 1 6 6 c0 4 -6 9.5 -6 9.5 s-6 -5.5 -6 -9.5 a6 6 0 0 1 6 -6 z" fill="#00A085" />
        <circle cx="58" cy="242" r="2" fill="#FFFFFF" />
        <text x="86" y="248" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#063760">Sede Centro</text>
        <text x="86" y="266" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#9CA3AF">12 turnos hoy</text>
        <rect x="48" y="290" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="115" y="308" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">Agenda propia</text>
        <rect x="48" y="326" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="115" y="344" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">Caja propia</text>
        <rect x="48" y="362" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="115" y="380" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">3 profesionales</text>

        {/* Sede Norte (active) */}
        <rect x="215" y="210" width="170" height="220" rx="12" fill="#FFFFFF" stroke="#00C9A7" strokeWidth="2.5" />
        <rect x="328" y="218" width="50" height="16" rx="8" fill="#00A085" />
        <text x="353" y="229" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#FFFFFF" textAnchor="middle" letterSpacing="1.2">ACTIVA</text>
        <circle cx="245" cy="244" r="15" fill="#00C9A7" />
        <path d="M245 236.5 a6 6 0 0 1 6 6 c0 4 -6 9.5 -6 9.5 s-6 -5.5 -6 -9.5 a6 6 0 0 1 6 -6 z" fill="#FFFFFF" />
        <circle cx="245" cy="242" r="2" fill="#00A085" />
        <text x="271" y="248" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#063760">Sede Norte</text>
        <text x="271" y="266" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#9CA3AF">8 turnos hoy</text>
        <rect x="233" y="290" width="134" height="28" rx="6" fill="#B7F2E5" />
        <text x="300" y="308" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#00A085" textAnchor="middle">Agenda propia</text>
        <rect x="233" y="326" width="134" height="28" rx="6" fill="#B7F2E5" />
        <text x="300" y="344" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#00A085" textAnchor="middle">Caja propia</text>
        <rect x="233" y="362" width="134" height="28" rx="6" fill="#B7F2E5" />
        <text x="300" y="380" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#00A085" textAnchor="middle">2 profesionales</text>

        {/* Sede Sur */}
        <rect x="400" y="210" width="170" height="220" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="428" cy="244" r="15" fill="#B7F2E5" />
        <path d="M428 236.5 a6 6 0 0 1 6 6 c0 4 -6 9.5 -6 9.5 s-6 -5.5 -6 -9.5 a6 6 0 0 1 6 -6 z" fill="#00A085" />
        <circle cx="428" cy="242" r="2" fill="#FFFFFF" />
        <text x="456" y="248" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#063760">Sede Sur</text>
        <text x="456" y="266" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#9CA3AF">15 turnos hoy</text>
        <rect x="418" y="290" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="485" y="308" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">Agenda propia</text>
        <rect x="418" y="326" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="485" y="344" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">Caja propia</text>
        <rect x="418" y="362" width="134" height="28" rx="6" fill="#F4F6F8" />
        <text x="485" y="380" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#475569" textAnchor="middle">4 profesionales</text>
      </svg>
    </div>
  );
}

function ReportesIllustration({ alt }: { alt: string }) {
  return (
    <div className="rounded-md overflow-hidden border border-border bg-bg-card shadow-sm">
      <svg
        viewBox="0 0 600 460"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
        className="w-full h-auto block"
      >
        {/* Background */}
        <rect width="600" height="460" fill="#E8F0FA" />

        {/* Window chrome */}
        <rect x="30" y="30" width="540" height="400" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="30" y="30" width="540" height="34" rx="14" fill="#063760" />
        <circle cx="50" cy="47" r="4" fill="#FF5F57" />
        <circle cx="66" cy="47" r="4" fill="#FEBC2E" />
        <circle cx="82" cy="47" r="4" fill="#28C840" />
        <text x="290" y="52" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="600" fontSize="13" fill="#B7F2E5" textAnchor="middle">Reportes — Mayo 2026</text>

        {/* Top KPI row */}
        <rect x="50" y="84" width="115" height="68" rx="10" fill="#F4F6F8" />
        <text x="64" y="106" fontFamily="DM Sans, system-ui, sans-serif" fontSize="10" fill="#6B7280" letterSpacing="1">COBRADO</text>
        <text x="64" y="135" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#063760">$ 387.250</text>

        <rect x="175" y="84" width="115" height="68" rx="10" fill="#F4F6F8" />
        <text x="189" y="106" fontFamily="DM Sans, system-ui, sans-serif" fontSize="10" fill="#6B7280" letterSpacing="1">TURNOS</text>
        <text x="189" y="135" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#063760">142</text>

        <rect x="300" y="84" width="115" height="68" rx="10" fill="#F4F6F8" />
        <text x="314" y="106" fontFamily="DM Sans, system-ui, sans-serif" fontSize="10" fill="#6B7280" letterSpacing="1">PACIENTES</text>
        <text x="314" y="135" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#063760">68</text>

        <rect x="425" y="84" width="115" height="68" rx="10" fill="#B7F2E5" />
        <text x="439" y="106" fontFamily="DM Sans, system-ui, sans-serif" fontSize="10" fill="#00A085" letterSpacing="1" fontWeight="700">CONFIRMADOS</text>
        <text x="439" y="135" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="20" fill="#063760">86%</text>

        {/* Bar chart */}
        <text x="50" y="190" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="13" fill="#063760">Cobros por mes</text>
        <text x="50" y="206" fontFamily="DM Sans, system-ui, sans-serif" fontSize="10" fill="#9CA3AF">Últimos 6 meses</text>

        {/* Bars */}
        <rect x="58" y="320" width="36" height="55" rx="4" fill="#E5E7EB" />
        <rect x="106" y="295" width="36" height="80" rx="4" fill="#E5E7EB" />
        <rect x="154" y="270" width="36" height="105" rx="4" fill="#E5E7EB" />
        <rect x="202" y="285" width="36" height="90" rx="4" fill="#E5E7EB" />
        <rect x="250" y="248" width="36" height="127" rx="4" fill="#063760" />
        <rect x="298" y="220" width="36" height="155" rx="4" fill="#00C9A7" />

        {/* Month labels */}
        <text x="76" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">Dic</text>
        <text x="124" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">Ene</text>
        <text x="172" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">Feb</text>
        <text x="220" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">Mar</text>
        <text x="268" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">Abr</text>
        <text x="316" y="395" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fontWeight="700" fill="#00A085" textAnchor="middle">May</text>

        {/* Right side - donut + legend */}
        <text x="370" y="190" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="13" fill="#063760">Estado de turnos</text>

        {/* Donut */}
        <circle cx="430" cy="280" r="50" fill="none" stroke="#E5E7EB" strokeWidth="16" />
        <circle cx="430" cy="280" r="50" fill="none" stroke="#00C9A7" strokeWidth="16" strokeDasharray="270 50" strokeDashoffset="0" transform="rotate(-90 430 280)" />
        <text x="430" y="277" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#063760" textAnchor="middle">86%</text>
        <text x="430" y="293" fontFamily="DM Sans, system-ui, sans-serif" fontSize="9" fill="#6B7280" textAnchor="middle">asistencia</text>

        {/* Legend */}
        <circle cx="496" cy="218" r="4" fill="#00C9A7" />
        <text x="506" y="222" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#063760">Confirmados</text>
        <circle cx="496" cy="240" r="4" fill="#185FA5" />
        <text x="506" y="244" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#063760">Pendientes</text>
        <circle cx="496" cy="262" r="4" fill="#FBBF24" />
        <text x="506" y="266" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#063760">Ausentes</text>

        {/* Export button */}
        <rect x="486" y="346" width="64" height="26" rx="13" fill="#063760" />
        <text x="518" y="363" fontFamily="DM Sans, system-ui, sans-serif" fontWeight="700" fontSize="10" fill="#B7F2E5" textAnchor="middle">↓ PDF</text>
      </svg>
    </div>
  );
}

function SingleTile({
  spec,
}: {
  spec: TileSpec | PlaceholderSpec;
}) {
  if (spec.kind === "tile") {
    return <ScreenTile src={spec.src} alt={spec.alt} />;
  }
  return (
    <PlaceholderTile
      filename={spec.filename}
      aspect={spec.aspect}
      hint={spec.hint}
    />
  );
}

function PlaceholderTile({
  filename,
  aspect,
  hint,
  style,
}: {
  filename: string;
  aspect: string;
  hint?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={`Pendiente: ${filename}`}
      className={`relative ${aspect} rounded-md border-2 border-dashed border-navy/20 bg-navy/5 flex items-center justify-center text-center p-6`}
      style={style}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[2px] text-navy/60">
          Screenshot pendiente
        </p>
        <p className="mt-2 font-mono text-sm text-navy/80 break-all">
          {filename}
        </p>
        {hint && (
          <p className="mt-2 text-xs text-ink-2 max-w-[28ch] mx-auto">{hint}</p>
        )}
        <p className="mt-2 text-[11px] text-ink-3">
          Va en <code className="font-mono">/public/screens/</code>
        </p>
      </div>
    </div>
  );
}

// Mapping of feature id → mobile iPhone screenshot. For features without a
// dedicated mobile screen we fall back to the desktop visual (scaled down).
const MOBILE_SCREENSHOTS: Record<string, string> = {
  "feature-agenda": "/screens/mobile/agenda-mobile.png",
  "feature-ficha": "/screens/mobile/ficha-mobile.png",
  "feature-odontograma": "/screens/mobile/odontograma-mobile.png",
  "feature-caja": "/screens/mobile/caja-mobile.png",
};

function FeatureMobileVisual({ feature }: { feature: FeatureBlock }) {
  const mobileSrc = MOBILE_SCREENSHOTS[feature.id];
  if (mobileSrc) {
    // Horizontal iPhone (odontograma in landscape) — render wider, less tall
    const isHorizontal = feature.id === "feature-odontograma";
    return (
      <img
        src={mobileSrc}
        alt={feature.title}
        className={
          isHorizontal
            ? "w-full max-w-[280px] h-auto drop-shadow-md"
            : "w-auto max-h-[200px] drop-shadow-md"
        }
        loading="lazy"
      />
    );
  }
  // Fallback: scale down desktop visual
  return (
    <div className="w-full max-w-[260px]">
      <FeatureVisual visual={feature.visual} />
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00A085"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-1"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BentoIncluye({ items }: { items: IncluyeItem[] }) {
  // Unificamos todos los items (sin distinción spotlight/normal) — ahora todos
  // son cards iguales y compactos para que entren parejo en el carousel.
  const allItems = items;

  return (
    <div className="mt-8 md:mt-12">
      {/* MOBILE: carousel compacto con dots */}
      <div className="md:hidden">
        <MobileCarousel slideClassName="min-w-[78%] pl-3 first:pl-3 last:pr-3">
          {allItems.map((item) => (
            <CompactIncluyeCard key={item.title} item={item} />
          ))}
        </MobileCarousel>
      </div>

      {/* DESKTOP: grid 3 columnas con cards compactos */}
      <ul
        role="list"
        className="hidden md:grid grid-cols-3 gap-4 auto-rows-fr"
      >
        {allItems.map((item) => (
          <li key={item.title}>
            <CompactIncluyeCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompactIncluyeCard({ item }: { item: IncluyeItem }) {
  const t = themeStyles[item.theme];
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl ${t.bg} p-4 md:p-5 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl`}
    >
      <div
        aria-hidden="true"
        className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-2xl ${t.blob} group-hover:scale-110 transition-transform duration-500`}
      />
      <div className="relative z-10 flex flex-col h-full gap-2.5">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.iconBg} ${t.iconColor}`}
        >
          {item.icon}
        </span>
        <h4
          className={`text-[14px] md:text-[15px] font-bold leading-tight ${t.titleColor}`}
        >
          {item.title}
        </h4>
        {item.blurb && (
          <p
            className={`text-[12px] md:text-[13px] leading-snug ${t.blurbColor}`}
          >
            {item.blurb}
          </p>
        )}
      </div>
    </div>
  );
}
