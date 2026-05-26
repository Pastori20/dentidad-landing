import ScreenTile from "./ScreenTile";
import MobileCarousel from "./MobileCarousel";
import FadeInSection from "./FadeInSection";
import type { CSSProperties, ReactNode } from "react";

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
  name: "multisede";
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
  title: string;
  body: string;
  bullets: string[];
  visual: Visual;
};

const features: FeatureBlock[] = [
  {
    id: "feature-odontograma",
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
    title: "Agenda con recordatorios automáticos",
    body: "Vista de día y semana, con bloqueos de horario y cinco estados de turno claros. Mandá recordatorios por WhatsApp y email sin salir de la plataforma.",
    bullets: [
      "Día y semana, con bloqueos por franja horaria",
      "Cinco estados: confirmado, con recordatorio, pendiente, ausente con o sin aviso",
      "Recordatorios por WhatsApp y email",
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
    id: "feature-multisede",
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

const inclusos: Array<{ icon: ReactNode; title: string }> = [
  {
    title: "Evoluciones vinculadas al odontograma",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="20" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Fotos, radiografías e informes por paciente",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 16l5-5 4 4 3-3 6 6" />
        <circle cx="9" cy="10" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Alertas del día en el dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" />
        <path d="M10 18a2 2 0 004 0" />
      </svg>
    ),
  },
  {
    title: "Sumá a tu secretaria o asistente",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Funciona desde celular, tablet y PC",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <rect x="14" y="10" width="7" height="11" rx="1.5" />
        <path d="M3 16l4 4" />
      </svg>
    ),
  },
  {
    title: "Backup automático de tus datos",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    title: "Obras sociales argentinas precargadas",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 11h.01" />
      </svg>
    ),
  },
];

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

        {/* MOBILE: carousel — one feature per slide, swipeable */}
        <div className="mt-8 md:hidden">
          <MobileCarousel slideClassName="min-w-[90%] pl-4 first:pl-0">
            {features.map((f) => (
              <article
                key={f.id}
                id={`${f.id}-mobile`}
                aria-labelledby={`${f.id}-title-mobile`}
                className="bg-bg-card border border-border rounded-lg p-5 h-full flex flex-col"
              >
                <div className="mb-4">
                  <FeatureVisual visual={f.visual} />
                </div>
                <h3
                  id={`${f.id}-title-mobile`}
                  className="text-xl font-extrabold text-navy tracking-tight text-balance"
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-ink-2 text-[15px] leading-relaxed">
                  {f.body}
                </p>
                <ul className="mt-3 space-y-2">
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-ink leading-relaxed text-[14px]"
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

        {/* DESKTOP: original alternating layout */}
        <div className="hidden md:block mt-20 space-y-28">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <FadeInSection key={f.id} delay={0}>
                <article
                  id={f.id}
                  aria-labelledby={`${f.id}-title`}
                  className={`grid gap-10 lg:gap-14 lg:grid-cols-2 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <FeatureVisual visual={f.visual} />
                  </div>
                  <div className="max-w-xl">
                    <h3
                      id={`${f.id}-title`}
                      className="text-3xl font-extrabold text-navy tracking-tight text-balance"
                    >
                      {f.title}
                    </h3>
                    <p className="mt-4 text-ink-2 text-[17px] leading-relaxed">
                      {f.body}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {f.bullets.map((b) => (
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
              </FadeInSection>
            );
          })}
        </div>

        <FadeInSection>
          <div className="mt-16 md:mt-32">
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
                Todo lo que incluye
              </h3>
            </div>

            <ul className="mt-6 md:mt-10 grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inclusos.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 md:gap-4 rounded-md bg-bg-card border border-border/70 p-4 md:p-5 hover:border-mint hover:shadow-sm transition-all"
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-sm bg-mint/10 text-mint-deep flex items-center justify-center"
                  >
                    {item.icon}
                  </span>
                  <span className="text-navy font-semibold leading-snug pt-1 md:pt-1.5 text-[15px] md:text-base">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
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
