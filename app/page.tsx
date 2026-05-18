import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Roadmap from "@/components/Roadmap";
import Differentiation from "@/components/Differentiation";
import Audience from "@/components/Audience";
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
        <Roadmap />
        <Differentiation />
        <Audience />
        <FAQ />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
