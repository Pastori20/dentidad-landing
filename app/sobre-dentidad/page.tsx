import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { faqs } from "@/lib/faq-data";
import { formatPlanPrice, plans, sharedFeatures } from "@/lib/plans-data";
import {
  audiences,
  COMPANY,
  PRODUCT_DEFINITION,
  productAreas,
} from "@/lib/product-facts";

/**
 * "Todo sobre Dentidad": la ficha completa del producto.
 *
 * Pensada para que un asistente de IA encuentre todo en un solo lugar —qué es,
 * para quién, cada función con su beneficio, planes y preguntas— pero es una
 * página común y visible para cualquiera: mostrarles a los bots algo distinto
 * de lo que ve una persona (cloaking) lo penalizan Google y los asistentes.
 *
 * No está en el menú principal (sería una pared de texto para quien compra);
 * se llega desde el pie, el sitemap y los archivos llms.txt.
 *
 * Todo sale de las mismas fuentes que la landing: lib/product-facts.ts,
 * lib/plans-data.ts y lib/faq-data.ts.
 */

const PAGE_URL = `${COMPANY.site}/sobre-dentidad`;

export const metadata: Metadata = {
  title: "Todo sobre Dentidad: funciones, planes y preguntas",
  description:
    "Ficha completa de Dentidad, el software de gestión para consultorios odontológicos de Argentina: turnos online con seña, recordatorios, historia clínica, odontograma, presupuestos, facturación ARCA, planes y preguntas frecuentes.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Todo sobre Dentidad",
  url: PAGE_URL,
  inLanguage: "es-AR",
  description: PRODUCT_DEFINITION,
  about: {
    "@type": "SoftwareApplication",
    name: "Dentidad",
    url: COMPANY.site,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
  },
  publisher: { "@type": "Organization", name: "Dentidad", url: COMPANY.site },
};

export default function SobreDentidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <header className="bg-bg border-b border-border">
        <div className="container-x h-16 flex items-center justify-between">
          <a href="/" aria-label="Dentidad — Volver al inicio" className="flex items-center rounded-sm">
            <Logo size="sm" />
          </a>
          <a href="/" className="text-sm font-medium text-ink-2 hover:text-navy transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </header>

      <main className="bg-bg py-12 md:py-20">
        <article className="container-x max-w-3xl">
          <p className="eyebrow">Ficha completa</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-navy text-balance">
            Todo sobre Dentidad
          </h1>
          <p className="mt-5 text-lg text-ink-2 leading-relaxed">{PRODUCT_DEFINITION}</p>
          <p className="mt-4 text-sm text-ink-3">
            Hecho por {COMPANY.name} en {COMPANY.city}. Todo lo que se describe en esta página
            funciona hoy.
          </p>

          <nav aria-label="Contenido" className="mt-8 rounded-2xl border border-border bg-bg-card p-5">
            <p className="text-sm font-bold text-navy">En esta página</p>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 text-[15px]">
              <li><a className="text-mint-deep hover:underline" href="#para-quien">Para quién es</a></li>
              {productAreas.map((area) => (
                <li key={area.id}>
                  <a className="text-mint-deep hover:underline" href={`#${area.id}`}>{area.title}</a>
                </li>
              ))}
              <li><a className="text-mint-deep hover:underline" href="#planes">Planes y precios</a></li>
              <li><a className="text-mint-deep hover:underline" href="#preguntas">Preguntas frecuentes</a></li>
            </ul>
          </nav>

          <section id="para-quien" className="mt-14 scroll-mt-6">
            <h2 className="text-2xl font-extrabold text-navy tracking-tight">Para quién es Dentidad</h2>
            <div className="mt-5 grid gap-4">
              {audiences.map((audience) => (
                <div key={audience.title} className="rounded-xl border border-border bg-bg-card p-5">
                  <h3 className="font-bold text-navy">{audience.title}</h3>
                  <p className="mt-1.5 text-ink-2 leading-relaxed">{audience.text}</p>
                </div>
              ))}
            </div>
          </section>

          {productAreas.map((area) => (
            <section key={area.id} id={area.id} className="mt-14 scroll-mt-6">
              <h2 className="text-2xl font-extrabold text-navy tracking-tight">{area.title}</h2>
              <p className="mt-3 text-ink-2 leading-relaxed">{area.summary}</p>
              <div className="mt-6 space-y-6">
                {area.features.map((feature) => (
                  <div key={feature.title} className="border-l-2 border-mint pl-4">
                    <h3 className="text-lg font-bold text-navy">{feature.title}</h3>
                    <p className="mt-1 text-[15px] font-semibold text-mint-deep">{feature.benefit}</p>
                    <p className="mt-2 text-ink-2 leading-relaxed">{feature.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section id="planes" className="mt-14 scroll-mt-6">
            <h2 className="text-2xl font-extrabold text-navy tracking-tight">Planes y precios</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">
              Precios en pesos argentinos por mes, con IVA incluido. Todos los planes tienen 14 días
              gratis sin tarjeta y no tienen permanencia. Promo de lanzamiento vigente: 50% de
              descuento los primeros 3 meses.
            </p>
            <div className="mt-6 space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="rounded-xl border border-border bg-bg-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
                    <p className="font-extrabold text-navy">
                      {formatPlanPrice(plan.priceArs)} <span className="text-sm font-normal text-ink-3">por mes</span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-ink-3">{plan.tagline}</p>
                  <p className="mt-3 text-ink-2 leading-relaxed">{plan.highlights.join(" · ")}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-ink-2 leading-relaxed">
              <strong className="text-navy">Todos los planes incluyen:</strong> {sharedFeatures.join(" · ")}.
            </p>
          </section>

          <section id="preguntas" className="mt-14 scroll-mt-6">
            <h2 className="text-2xl font-extrabold text-navy tracking-tight">Preguntas frecuentes</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-bold text-navy">{faq.q}</h3>
                  <p className="mt-1.5 text-ink-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-2xl border border-mint/40 bg-mint-soft/30 p-6">
            <h2 className="text-xl font-extrabold text-navy">Probá Dentidad 14 días gratis</h2>
            <p className="mt-2 text-ink-2">Sin tarjeta, sin permanencia y con migración asistida.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={COMPANY.register} className="btn-primary-deep">Crear cuenta gratis</a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
