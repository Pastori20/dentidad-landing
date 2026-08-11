import DemoScroll from "@/components/demo/DemoScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Differentiation from "@/components/Differentiation";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import PromoBanner from "@/components/PromoBanner";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        {/* Promo banner full-width entre Problem y Features —
            el usuario ya vio el dolor, le mostramos el incentivo antes de
            que explore las features */}
        <PromoBanner fullWidth />
        {/* El demo va ANTES de Features: primero se ve el producto trabajando,
            después el detalle funcionalidad por funcionalidad. */}
        <DemoScroll />
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
