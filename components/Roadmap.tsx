import type { ReactNode } from "react";

type Item = { title: string; icon: ReactNode };

const items: Item[] = [
  {
    title: "Facturación electrónica ARCA (ex-AFIP)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v3h3" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
  },
  // (Impresión 3D moved to the end of the array — see below)
  {
    title: "Portal del paciente",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </svg>
    ),
  },
  {
    title: "Consentimientos informados digitales",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 3h11l3 3v15H5z" />
        <path d="M8 12c2 1 4-1 6 0s4-1 5 0" />
        <path d="M8 17h8" />
      </svg>
    ),
  },
  {
    title: "Reportes y analíticas",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" />
        <rect x="12" y="8" width="3" height="10" />
        <rect x="17" y="5" width="3" height="13" />
      </svg>
    ),
  },
  {
    title: "Impresión 3D de piezas dentales",
    icon: (
      // Tooth silhouette — communicates "dental piece" directly. The
      // "3D" angle is carried by the item title rather than the icon.
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4c-3.5 0-6 2.5-6 5.5 0 2 .8 3.3 1.3 5 .5 1.7.8 4 2 4s1.7-2.5 2.2-2.5.8 2.5 2.2 2.5 1.5-2.3 2-4c.5-1.7 1.3-3 1.3-5C18 6.5 15.5 4 12 4z" />
      </svg>
    ),
  },
];

export default function Roadmap() {
  return (
    <section
      id="proximamente"
      aria-labelledby="roadmap-title"
      className="py-14 md:py-28 border-b border-border bg-mint-soft/30"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Roadmap</p>
          <h2 id="roadmap-title" className="section-title mt-3 text-balance">
            En lo que estamos trabajando.
          </h2>
          <p className="section-lead">
            Estas funcionalidades están en desarrollo y se irán liberando en
            próximas versiones de Dentidad.
          </p>
        </div>

        <ul
          role="list"
          className="mt-8 md:mt-14 grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="relative rounded-md bg-bg-card border border-border/70 p-4 md:p-5 flex md:flex-col items-center md:items-stretch gap-3 md:gap-4 hover:border-mint-deep/40 transition-colors"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-sm bg-mint/15 text-mint-deep flex items-center justify-center">
                {item.icon}
              </span>
              <div className="flex-1 md:flex md:flex-col md:gap-3">
                <span className="hidden md:inline-flex items-center gap-1.5 self-start rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold tracking-[1.5px] uppercase px-2 py-1 border border-amber-200/70">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Próximamente
                </span>
                <p className="text-navy font-semibold leading-snug text-[14px] md:text-[15px]">
                  {item.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
