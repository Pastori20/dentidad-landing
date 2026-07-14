"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { REGISTER_URL, APP_URL } from "@/lib/config";

const navItems = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#diferencias", label: "Diferencias" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#planes", label: "Planes" },
];

const WHATSAPP_HREF =
  "https://wa.me/5493571549321?text=Hola!%20Vi%20Dentidad%20y%20quer%C3%ADa%20saber%20m%C3%A1s%20sobre%20la%20prueba%20de%2014%20d%C3%ADas.";

function WhatsappGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto w-full max-w-6xl px-3 animate-fade-up sm:px-6 lg:px-8">
        {/* Cápsula flotante con glass — visible desde el arranque, sobre el hero oscuro */}
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border pl-3 pr-2 transition-all duration-300 ${
            scrolled
              ? "border-border bg-white/85 py-1.5 shadow-lg backdrop-blur-xl"
              : "border-white/50 bg-white/70 py-2 shadow backdrop-blur-md"
          }`}
        >
          {/* IZQUIERDA — logo */}
          <a
            href="#top"
            aria-label="Dentidad — Inicio"
            className="flex items-center rounded-lg px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <Logo size="sm" />
          </a>

          {/* CENTRO — nav con highlight pill en hover */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-navy-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* DERECHA — acciones */}
          <div className="hidden items-center gap-1.5 md:flex">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mint-deep transition-colors hover:bg-mint-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
            >
              <WhatsappGlyph />
            </a>
            <a
              href={APP_URL}
              className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Ingresar
            </a>
            <a
              href={REGISTER_URL}
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-navy shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-mint-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Probar 14 días gratis
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* MOBILE — hamburguesa */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* MENÚ MOBILE — card flotante a juego con la cápsula */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="mt-2 overflow-hidden rounded-2xl border border-border bg-white/95 shadow-lg backdrop-blur-xl animate-fade-in md:hidden"
          >
            <div className="flex flex-col p-2.5">
              {/* Links de navegación — con aire + chevron sutil */}
              <div className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex min-h-[52px] items-center justify-between rounded-xl px-3.5 text-[15px] font-medium text-ink-2 transition-colors hover:bg-navy-50 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    <span>{item.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-mint-deep"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Acciones — jerarquía: probar (primario) → ingresar (secundario) */}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href={REGISTER_URL}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[50px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-mint px-4 text-sm font-bold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:bg-mint-300 hover:shadow"
                >
                  Probar 14 días gratis
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href={APP_URL}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[50px] w-full items-center justify-center whitespace-nowrap rounded-full border border-navy/20 px-4 text-sm font-semibold text-navy transition-colors hover:bg-navy-50"
                >
                  Ingresar
                </a>
              </div>

              {/* WhatsApp — discreto, como línea de contacto */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-1.5 py-1 text-[13px] font-medium text-ink-2 transition-colors hover:text-mint-deep"
              >
                <span className="text-mint-deep">
                  <WhatsappGlyph size={15} />
                </span>
                ¿Dudas? Escribinos por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
