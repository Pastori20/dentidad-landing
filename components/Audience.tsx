import type { ReactNode } from "react";
import MobileCarousel from "./MobileCarousel";
import FadeInSection from "./FadeInSection";

type Card = {
  icon: ReactNode;
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    title: "Para el que arranca su consultorio",
    description:
      "Querés ordenarlo bien desde el principio, sin pelearte con software corporativo pensado para cadenas grandes ni con planillas que se vuelven inmanejables a los seis meses.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4c-3.5 0-6 2.5-6 5.5 0 2 .8 3.3 1.3 5 .5 1.7.8 4 2 4s1.7-2.5 2.2-2.5.8 2.5 2.2 2.5 1.5-2.3 2-4c.5-1.7 1.3-3 1.3-5C18 6.5 15.5 4 12 4z" />
        <path d="M9 8.5c0-.8.8-1.5 3-1.5s3 .7 3 1.5" />
      </svg>
    ),
  },
  {
    title: "Para el que viene de Excel, cuadernos y planillas",
    description:
      "Tenés tu manera de trabajar y funciona, pero ya no da más. Querés digitalizar sin migración eterna ni reentrenarte en algo complicado.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h6M9 19h3" />
      </svg>
    ),
  },
  {
    title: "Para el que valora la parte clínica",
    description:
      "No buscás un CRM con dientes pintados. Buscás un odontograma serio, evoluciones ancladas a la pieza, anamnesis adulta y odontopediátrica bien diferenciadas.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3l1.8 4 4.4.4-3.3 3 1 4.3L12 12.7l-3.9 2L9 10.4l-3.3-3 4.4-.4z" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
];

function AudienceCard({ card }: { card: Card }) {
  return (
    <div className="flex flex-col gap-3 md:gap-5 rounded-md bg-bg-card border border-border/70 p-5 md:p-7 hover:border-mint transition-colors h-full">
      <div
        aria-hidden="true"
        className="w-12 h-12 md:w-14 md:h-14 rounded-sm bg-mint/10 text-mint-deep flex items-center justify-center"
      >
        {card.icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-navy text-balance leading-snug">
        {card.title}
      </h3>
      <p className="text-ink-2 leading-relaxed text-sm md:text-[15px]">
        {card.description}
      </p>
    </div>
  );
}

export default function Audience() {
  return (
    <section
      id="audiencia"
      aria-labelledby="audience-title"
      className="py-14 md:py-28 border-b border-border bg-bg"
    >
      <div className="container-x">
        <FadeInSection>
          <div className="max-w-3xl">
            <p className="eyebrow">¿Para quién es Dentidad?</p>
            <h2
              id="audience-title"
              className="section-title mt-3 text-balance"
            >
              Pensado para el odontólogo, no para la cadena.
            </h2>
          </div>
        </FadeInSection>

        {/* MOBILE: swipeable carousel */}
        <div className="mt-8 md:hidden">
          <MobileCarousel slideClassName="min-w-[88%] pl-4 first:pl-0">
            {cards.map((card) => (
              <AudienceCard key={card.title} card={card} />
            ))}
          </MobileCarousel>
        </div>

        {/* DESKTOP: 3-col grid */}
        <ul role="list" className="hidden md:grid mt-14 gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <FadeInSection>
                <AudienceCard card={card} />
              </FadeInSection>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
