const EMAIL = "info.dentidad@gmail.com";
// Formato internacional sin '+': 54 (Argentina) + 9 (móvil) + 3571 (área Río Tercero) + número
const WHATSAPP_NUMBER = "5493571549321";

const MAILTO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Quiero conocer Dentidad"
)}`;
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero conocer más sobre Dentidad"
)}`;

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

      <div className="container-x relative z-10 max-w-3xl">
        <h2
          id="cta-title"
          className="text-[2rem] md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance"
        >
          Empezá a ordenar tu consultorio.
        </h2>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
          Dentidad reúne agenda, ficha clínica, odontograma y cobros en un solo
          lugar. Hecho para odontólogos en Argentina.
        </p>

        <div className="mt-6 md:mt-9 flex flex-col sm:flex-row gap-3">
          <a href={MAILTO_HREF} className="btn-primary text-base">
            Solicitar acceso
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy-700"
          >
            <WhatsAppIcon />
            Hablar por WhatsApp
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
    </section>
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
