const painPoints = [
  {
    title: "La agenda vive en un cuaderno o en WhatsApp.",
    description:
      "Reprogramar un turno significa borrar, llamar, anotar en otro lado.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h12a2 2 0 012 2v14H6a2 2 0 01-2-2V4z" />
        <path d="M4 4v14a2 2 0 002 2" />
        <path d="M8 8h6M8 12h6M8 16h4" />
      </svg>
    ),
  },
  {
    title: "Cada paciente está repartido entre planillas, fotos y papeles.",
    description: "Cuando lo necesitás, no aparece.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    ),
  },
  {
    title: "Los cobros no cuadran a fin de mes.",
    description:
      "¿Quién debe? ¿Cuánto se cobró? ¿En qué medio? Las cuentas se hacen en la cabeza.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="bg-bg-tint py-14 md:py-28 border-b border-border"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <h2
            id="problema-title"
            className="section-title text-balance"
          >
            El día a día del consultorio se va en lo que no es atender pacientes.
          </h2>
        </div>

        <div className="mt-8 md:mt-16 grid gap-4 md:gap-6 md:grid-cols-3">
          {painPoints.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 md:gap-4 rounded-md bg-bg-card border border-border/70 p-5 md:p-7 hover:border-navy-200 transition-colors"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-sm bg-navy/5 text-navy flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-navy leading-snug text-balance">
                {p.title}
              </h3>
              <p className="text-ink-2 leading-relaxed text-sm md:text-[15px]">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
