import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { loadLegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de uso de Dentidad, plataforma de gestión clínica para consultorios odontológicos provista por Solvianweb.",
  robots: { index: true, follow: true },
};

export default async function TerminosPage() {
  const { title, html } = await loadLegalDoc("terminos-y-condiciones.md");
  return <LegalLayout title={title} htmlContent={html} />;
}
