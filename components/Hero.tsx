export default function Hero() {
  return (
    <section
      id="top"
      className="gradient-hero text-white relative overflow-hidden pt-24 md:pt-36 lg:pt-40 pb-14 md:pb-24"
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
        {/* Hero copy — centered, vertical layout, no right column */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs font-medium tracking-[2px] uppercase text-mint">
            Software dental para Argentina
          </p>

          <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight text-balance">
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

          <p className="mt-6 md:mt-8 text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Dentidad reúne agenda, ficha clínica, odontograma y cobros en una
            sola plataforma pensada para odontólogos en Argentina. Sin papel,
            sin Excel, sin software de hace 20 años.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#cta" className="btn-primary text-base">
              Probar 14 días gratis
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
            className="mt-7 md:mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/75"
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

        {/* FULL-WIDTH product showcase — placeholder con la imagen
            multi-dispositivos hasta que el usuario pase la screenshot completa
            del sistema. Cuando esté lista, reemplazar src por
            /screens/hero-overview.png y sacar el wrapper transparente. */}
        <div className="mt-14 md:mt-20 relative">
          {/* Glow behind the screenshot */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -inset-y-12 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,201,167,.18), transparent 70%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/multidispositivos.png"
              alt="Dentidad funcionando en computadora, tablet y celular — vista completa del sistema."
              className="block w-full h-auto drop-shadow-2xl"
              loading="eager"
            />
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
