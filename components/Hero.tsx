import ScreenTile from "./ScreenTile";

export default function Hero() {
  return (
    <section
      id="top"
      className="gradient-hero text-white relative overflow-hidden pt-24 md:pt-36 lg:pt-40 pb-14 md:pb-28"
    >
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,201,167,.18), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(24,95,165,.25), transparent 65%)",
        }}
      />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 md:gap-12 lg:gap-16 items-center">
          {/* LEFT: copy + CTAs */}
          <div>
            <p className="font-mono text-xs font-medium tracking-[2px] uppercase text-mint">
              Software dental para Argentina
            </p>

            <h1 className="mt-5 text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl font-extrabold tracking-tight sm:leading-[1.05] text-balance">
              Tu consultorio,{" "}
              <span className="relative inline-block">
                <span className="text-mint">ordenado al detalle</span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7 Q 50 2, 100 5 T 198 4"
                    stroke="#00C9A7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-5 text-base md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Dentidad reúne agenda, ficha clínica, odontograma y cobros en una
              sola plataforma pensada para odontólogos en Argentina. Sin papel,
              sin Excel, sin software de hace 20 años.
            </p>

            <div className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="btn-primary text-base">
                Solicitar acceso
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy-700"
              >
                Ver cómo funciona
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <ul
              role="list"
              className="mt-6 md:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75"
            >
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span>Equipo argentino</span>
              </li>
              <li aria-hidden="true" className="text-white/30 hidden sm:inline">
                ·
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span>Acceso desde cualquier dispositivo</span>
              </li>
              <li aria-hidden="true" className="text-white/30 hidden sm:inline">
                ·
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                <span>Obras sociales locales</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: 3 dashboard tiles — KPIs, agenda, alerts */}
          <div className="relative lg:pl-4">
            {/* Subtle decorative glow behind */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 lg:-inset-10 rounded-lg pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0,201,167,.18), transparent 60%)",
              }}
            />
            {/* Two pre-cropped screenshots stacked vertically. Each one is
                shown at its natural aspect ratio — no CSS cropping. The agenda
                tile uses the full column width so names, times and statuses
                are readable. */}
            <div className="relative space-y-4">
              {/* MOBILE: iPhone screenshot showing the real mobile experience
                  on app.dentidad.com. Hidden on desktop where we show the
                  larger desktop tiles. */}
              <div className="md:hidden flex justify-center">
                <img
                  src="/screens/mobile-hero.png"
                  alt="Dentidad en mobile: agenda del día con turnos, profesional seleccionado y estados de recordatorio."
                  className="w-full max-w-[280px] h-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>

              {/* DESKTOP only: KPIs + Agenda tiles stacked */}
              <div className="hidden md:block space-y-4">
                <ScreenTile
                  src="/screens/hero-kpis.png"
                  alt="Panel del día de Dentidad: turnos de hoy, pacientes, pendiente de cobro y pagado este mes."
                  hint="Recorte: fila de KPIs del dashboard"
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
                <ScreenTile
                  src="/screens/hero-agenda.png"
                  alt="Agenda de hoy con los próximos turnos: nombre del paciente, horario y estado del turno."
                  hint="Recorte: agenda de hoy"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00C9A7"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
