export default function Pricing() {
  return (
    <section
      id="planes"
      aria-labelledby="pricing-title"
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Planes</p>
          <h2 id="pricing-title" className="section-title mt-3 text-balance">
            Planes que se acomodan a tu consultorio.
          </h2>
        </div>

        <div className="mt-8 md:mt-14 max-w-2xl">
          <div className="relative rounded-lg border border-border bg-bg-card p-6 md:p-10 shadow-sm">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 border border-amber-200/70"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Próximamente
            </span>

            <p className="text-ink-2 text-base md:text-lg leading-relaxed">
              Estamos terminando de definir los planes y precios. Mientras
              tanto, podés sumarte a la lista de acceso anticipado y te
              contactamos en cuanto estén listos.
            </p>

            <a href="#cta" className="btn-primary mt-5 md:mt-7 inline-flex">
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
          </div>
        </div>
      </div>
    </section>
  );
}
