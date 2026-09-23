/**
 * JSON-LD Structured Data — Schema.org markup para Google/AI search engines.
 *
 * Permite que:
 *  - Google muestre rich results (precios, rating, FAQ inline en SERPs)
 *  - ChatGPT/Perplexity/Google AI entiendan QUÉ es Dentidad y respondan
 *    preguntas como "qué software dental hay en Argentina" con tus datos
 *  - Knowledge Graph asocie el brand correctamente
 *
 * Se renderea en <head> via Next.js script.
 */

import { faqs } from "@/lib/faq-data";

const SITE_URL = "https://www.dentidad.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dentidad",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description:
    "Software web de gestión clínica para odontólogos en Argentina.",
  foundingDate: "2025",
  founders: [
    {
      "@type": "Person",
      name: "Bautista Pastori",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "info.dentidad@gmail.com",
    areaServed: "AR",
    availableLanguage: ["Spanish"],
  },
  sameAs: [
    "https://www.instagram.com/dentidad",
    "https://www.facebook.com/dentidad",
  ],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dentidad",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Dental Practice Management Software",
  operatingSystem: "Web Browser",
  url: SITE_URL,
  description:
    "Sistema de gestión odontológica para clínicas y consultorios de Argentina. Reserva de turnos online con seña por Mercado Pago, agenda con recordatorios automáticos por WhatsApp y email, ficha clínica, odontograma digital, caja diaria, presupuestos, facturación electrónica ARCA y portal del paciente, en una sola plataforma accesible desde computadora, tablet y celular.",
  inLanguage: "es-AR",
  countriesSupported: "AR",
  /*
    Lo que Dentidad hace HOY en producción. Nada de "próximamente": una función
    anunciada que no existe hace más daño que una función ausente, porque la
    desmiente el producto.
  */
  featureList: [
    "Reserva de turnos online con link público para pacientes",
    "Seña del turno con Mercado Pago, a la cuenta del consultorio",
    "Recordatorios automáticos por WhatsApp y por email, con confirmación del paciente",
    "El horario se libera cuando el paciente avisa que no puede asistir",
    "Ficha clínica completa y anamnesis adulto/odontopediátrico",
    "Odontograma digital con doble vista inicial/actual, exportable a PDF",
    "Evoluciones ancladas a la pieza y la cara tratadas",
    "Galería de fotos, radiografías e informes por paciente",
    "Caja diaria con desglose por medio de pago e historial por día",
    "Presupuestos por tratamiento con precio de contado y planes de cuotas",
    "Nomenclador de tratamientos con honorarios y comisiones a derivadores",
    "Facturación electrónica ARCA (ex AFIP): Factura C con CAE y PDF con QR",
    "Portal del paciente con turnos, comprobantes y ficha previa por QR",
    "Consentimientos informados digitales, editables por el consultorio",
    "Importación de pacientes desde Excel o CSV",
    "Reportes financieros y clínicos",
    "Roles y permisos para profesional, recepción y administrador",
    "Notificaciones al celular y app instalable desde el navegador",
    "Obras sociales argentinas precargadas",
    "Acceso desde computadora, tablet y celular, con backup automático en la nube",
    "Multi-sede para cadenas odontológicas",
    "Sin permanencia, migración asistida",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Esencial",
      description: "Plan para arrancar a digitalizar el consultorio (1 dentista).",
      price: "50000",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "50000",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "Precio de lista. Promo de lanzamiento vigente: 50% OFF los primeros 3 meses ($25.000/mes). Incluye 14 días gratis sin tarjeta.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "AR" },
    },
    {
      "@type": "Offer",
      name: "Clínica",
      description:
        "Plan para consultorios con equipo (hasta 3 dentistas + recepción).",
      price: "85000",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "85000",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "Precio de lista. Promo de lanzamiento vigente: 50% OFF los primeros 3 meses ($42.500/mes). Incluye 14 días gratis sin tarjeta.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "AR" },
    },
    {
      "@type": "Offer",
      name: "Multi-sede",
      description:
        "Plan para cadenas multi-sucursal (sedes ilimitadas, hasta 10 dentistas).",
      price: "300000",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "300000",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "Precio de lista. Promo de lanzamiento vigente: 50% OFF los primeros 3 meses ($150.000/mes). Incluye 14 días gratis sin tarjeta.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "AR" },
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "Dentidad",
    url: SITE_URL,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dentidad — Software dental para Argentina",
  url: SITE_URL,
  inLanguage: "es-AR",
  publisher: {
    "@type": "Organization",
    name: "Dentidad",
    url: SITE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/*
  El FAQPage sale del MISMO array que renderiza la sección visible. Google pide
  que el texto marcado sea idéntico al que ve la persona; antes acá había un
  juego de preguntas distinto del de la página.
*/
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function StructuredData() {
  const schemas = [
    organizationSchema,
    softwareApplicationSchema,
    websiteSchema,
    faqSchema,
  ];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
