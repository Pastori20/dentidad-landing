import SignupForm from "./SignupForm";
import FadeInSection from "./FadeInSection";

export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="py-14 md:py-28 gradient-hero text-white relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,201,167,.22), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(24,95,165,.30), transparent 65%)",
        }}
      />

      <div className="container-x relative z-10 grid gap-10 lg:gap-16 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* LEFT: copy */}
        <FadeInSection>
          <div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-[2px] text-mint">
              Empezá hoy
            </p>
            <h2
              id="cta-title"
              className="mt-3 text-[2rem] md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance"
            >
              Probá Dentidad 14 días gratis.
            </h2>
            <p className="mt-4 md:mt-5 text-base md:text-lg text-white/80 leading-relaxed">
              Sin tarjeta. Sin permanencia. Te creamos la cuenta y te ayudamos a migrar tus pacientes.
            </p>

            <ul className="mt-6 md:mt-8 space-y-3">
              <BulletItem text="14 días gratis para que pruebes todo" />
              <BulletItem text="Después: 50% OFF los primeros 3 meses" />
              <BulletItem text="Migración asistida sin costo extra" />
              <BulletItem text="Soporte directo del fundador" />
            </ul>

            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="text-sm text-white/70 mb-1">¿Preferís hablar primero?</p>
              <a
                href="https://wa.me/5493571549321?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20Dentidad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-mint hover:text-mint-soft font-semibold transition-colors"
              >
                <WhatsAppIcon /> Hablanos por WhatsApp →
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* RIGHT: signup form */}
        <FadeInSection delay={0.15}>
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 shadow-2xl">
            <SignupForm compact />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-white/90 leading-relaxed">
      <span
        aria-hidden="true"
        className="flex-shrink-0 w-6 h-6 rounded-full bg-mint/20 text-mint flex items-center justify-center mt-0.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span>{text}</span>
    </li>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 00-8.6 15.05L2 22l5.06-1.33A10 10 0 1012 2zm5.2 14.18c-.22.62-1.27 1.18-1.78 1.25-.45.06-1.04.09-1.68-.1-.39-.12-.88-.28-1.52-.55-2.68-1.16-4.42-3.86-4.56-4.04-.13-.18-1.08-1.44-1.08-2.74 0-1.3.68-1.94.92-2.2.24-.28.53-.34.71-.34.18 0 .35 0 .51.01.16.01.38-.06.59.45.22.55.74 1.92.81 2.06.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.29.36-.41.49-.13.13-.27.28-.12.55.16.27.7 1.16 1.5 1.88 1.04.93 1.92 1.21 2.18 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.6-.13.24.09 1.52.72 1.78.85.27.13.45.2.51.31.07.11.07.62-.16 1.24z" />
    </svg>
  );
}
