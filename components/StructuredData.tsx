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
    "Sistema de gestión odontológica para clínicas en Argentina. Agenda con recordatorios por WhatsApp, ficha clínica, odontograma digital, caja diaria, reportes y acceso multidispositivo en una sola plataforma.",
  inLanguage: "es-AR",
  countriesSupported: "AR",
  featureList: [
    "Agenda con recordatorios automáticos por WhatsApp",
    "Ficha clínica completa y anamnesis adulto/odontopediátrico",
    "Odontograma digital con doble vista inicial/actual",
    "Galería de fotos, radiografías e informes por paciente",
    "Caja diaria con desglose por medio de pago",
    "Reportes financieros y clínicos",
    "Acceso desde computadora, tablet y celular",
    "Backup automático en la nube",
    "Multi-sede para cadenas odontológicas",
    "Sin permanencia, migración asistida",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Esencial",
      description: "Plan para arrancar a digitalizar el consultorio (1 dentista).",
      price: "25000",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "25000",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "50% OFF los primeros 3 meses durante la promo de lanzamiento. Precio regular $50.000/mes.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "AR" },
    },
    {
      "@type": "Offer",
      name: "Clínica",
      description:
        "Plan para consultorios con equipo (hasta 3 dentistas + recepción).",
      price: "42500",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "42500",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "50% OFF los primeros 3 meses durante la promo de lanzamiento. Precio regular $85.000/mes.",
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "AR" },
    },
    {
      "@type": "Offer",
      name: "Multi-sede",
      description:
        "Plan para cadenas multi-sucursal (sedes ilimitadas, hasta 10 dentistas).",
      price: "150000",
      priceCurrency: "ARS",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "150000",
        priceCurrency: "ARS",
        billingDuration: "P1M",
        valueAddedTaxIncluded: true,
        description:
          "50% OFF los primeros 3 meses durante la promo de lanzamiento. Precio regular $300.000/mes.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta Dentidad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dentidad tiene 3 planes: Esencial ($50.000/mes para 1 dentista), Clínica ($85.000/mes hasta 3 dentistas + recepción) y Multi-sede ($300.000/mes para cadenas). Todos con 50% OFF los primeros 3 meses durante la promo de lanzamiento + 14 días gratis para probar sin tarjeta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo probar Dentidad gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, ofrecemos 14 días gratis para probar el sistema completo sin pedirte tarjeta de crédito. Si no te convence, no pagás nada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funciona en mi celular y tablet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, Dentidad es 100% web — funciona en cualquier dispositivo con navegador: computadora, tablet o celular. La interfaz se adapta a cada pantalla.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tiene odontograma digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El odontograma es 100% digital con doble vista (inicial y actual), permite registrar prestaciones por pieza y cara, y se exporta a PDF.",
      },
    },
    {
      "@type": "Question",
      name: "¿Manda recordatorios por WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Los recordatorios se envían automáticamente por WhatsApp con un link interactivo donde el paciente puede confirmar el turno o avisar ausencia. La agenda se actualiza sola.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay permanencia o contrato a largo plazo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Dentidad es sin permanencia. Pagás mes a mes y podés dar de baja cuando quieras. También hacemos migración asistida si venís de Excel, planillas o otro sistema.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funciona para clínicas con varias sedes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El plan Multi-sede permite gestionar sedes ilimitadas con reportes consolidados por sede, hasta 10 dentistas y soporte directo del fundador.",
      },
    },
  ],
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
