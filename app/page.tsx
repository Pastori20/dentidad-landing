import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Differentiation from "@/components/Differentiation";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        {/* Pricing arriba — después de ver features, mostrar precio.
            Promo de 14 días gratis bien visible sin scroll eterno. */}
        <Pricing />
        <FAQ />
        {/* Differentiation como refuerzo final antes del CTA */}
        <Differentiation />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
