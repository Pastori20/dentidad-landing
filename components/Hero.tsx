import DeviceShowcase from "./DeviceShowcase";
import { REGISTER_URL } from "@/lib/config";

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

      <div className="container-x relative z-10 grid items-center gap-12 lg:max-w-7xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">
        {/* Izquierda: el título. En el celular va arriba y centrado. */}
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs font-medium tracking-[2px] uppercase text-mint">
            Software dental para Argentina
          </p>

          <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem] font-extrabold tracking-tight text-balance">
            Tu consultorio,{" "}
            <span className="relative inline-block">
              <span className="text-mint">ordenado al detalle</span>.
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
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Dentidad reúne agenda, ficha clínica, odontograma y cobros en una
            sola plataforma pensada para odontólogos en Argentina. Sin papel,
            sin Excel, sin software de hace 20 años.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
            <a href={REGISTER_URL} className="btn-primary text-base whitespace-nowrap">
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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy-700"
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
            className="mt-7 md:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-white/75"
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

        {/* Derecha: tablet + celular con Dentidad funcionando en video. */}
        <DeviceShowcase />
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
