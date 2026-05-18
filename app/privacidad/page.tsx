import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { loadLegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de Dentidad: qué datos recolectamos, cómo los protegemos y los derechos de Usuarios profesionales y Pacientes.",
  robots: { index: true, follow: true },
};

export default async function PrivacidadPage() {
  const { title, html } = await loadLegalDoc("politica-de-privacidad.md");
  return <LegalLayout title={title} htmlContent={html} />;
}
