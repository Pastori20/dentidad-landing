import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL = "https://www.dentidad.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dentidad — Software dental para Argentina",
    template: "%s · Dentidad",
  },
  description:
    "Software web de gestión clínica para odontólogos: agenda, ficha clínica, odontograma y cobros en un solo lugar. Pensado para Argentina.",
  keywords: [
    "software dental",
    "gestión clínica dental",
    "odontograma digital",
    "ficha clínica odontológica",
    "agenda turnos odontólogo",
    "software odontólogo Argentina",
    "consultorio odontológico",
    "Dentidad",
    "Solvianweb",
  ],
  authors: [{ name: "Solvianweb" }],
  creator: "Solvianweb",
  publisher: "Solvianweb",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Dentidad",
    title: "Dentidad — Software dental para Argentina",
    description:
      "Agenda, ficha clínica, odontograma y cobros en una sola plataforma para odontólogos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dentidad — Software dental para Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentidad — Software dental para Argentina",
    description:
      "Agenda, ficha clínica, odontograma y cobros en una sola plataforma para odontólogos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    // Verificación de dominio para Meta Business — desbloquea ads sin
    // restricciones y permite controlar previews de OG cuando alguien
    // comparte el link en Facebook/Instagram.
    other: {
      "facebook-domain-verification": "vt6scr14psvkcmckxxixz02eoqgshd",
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dentidad",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Healthcare Practice Management Software",
  operatingSystem: "Web",
  description:
    "Software de gestión clínica para consultorios odontológicos en Argentina: agenda, ficha clínica, odontograma y cobros.",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "Solvianweb",
    url: SITE_URL,
  },
  inLanguage: "es-AR",
  featureList: [
    "Agenda de turnos",
    "Ficha clínica",
    "Odontograma digital",
    "Caja diaria y comprobantes",
    "Galería de fotos e informes",
    "Roles de equipo (administrador, profesional, recepción)",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
