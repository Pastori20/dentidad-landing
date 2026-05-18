"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const navItems = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#diferencias", label: "Diferencias" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#planes", label: "Planes" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-18">
        <a
          href="#top"
          aria-label="Dentidad — Inicio"
          className="flex items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Logo size="sm" />
        </a>

        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-2 hover:text-navy transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href="#cta"
            className="btn-primary text-sm py-2.5 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Solicitar acceso
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-navy p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-bg border-b border-border animate-fade-in"
        >
          <div className="container-x py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 min-h-[44px] flex items-center text-base font-medium text-ink-2 hover:text-navy rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border">
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Solicitar acceso
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
