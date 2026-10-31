import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Differentiation from "@/components/Differentiation";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import PromoBanner from "@/components/PromoBanner";
import CTA from "@/components/CTA";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Lo más fuerte arriba de todo: turnos online, seña, historia clínica
            y facturación. Antes había que bajar hasta Features para enterarse. */}
        <Highlights />
        <Problem />
        {/* Promo banner full-width entre Problem y Features —
            el usuario ya vio el dolor, le mostramos el incentivo antes de
            que explore las features */}
        <PromoBanner fullWidth />
        <Features />
        <Pricing />
        <FAQ />
        <Differentiation />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
