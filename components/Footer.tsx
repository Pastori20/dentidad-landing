import Logo from "./Logo";

const EMAIL = "info.dentidad@gmail.com";
const WHATSAPP_NUMBER = "5493571549321";

const productLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Próximamente", href: "#proximamente" },
  { label: "Planes", href: "#planes" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

const legalLinks = [
  { label: "Términos y Condiciones", href: "/terminos" },
  { label: "Política de Privacidad", href: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-5 text-white/70 leading-relaxed max-w-xs">
              Gestión clínica para odontólogos independientes.
            </p>
          </div>

          {/* Col 2 — Producto */}
          <FooterColumn title="Producto">
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Col 3 — Contacto */}
          <FooterColumn title="Contacto">
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-white transition-colors break-all"
                >
                  Email: {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {WHATSAPP_NUMBER}
                </a>
              </li>
              <li className="text-white/60">
                Río Tercero, Córdoba — Argentina
              </li>
            </ul>
          </FooterColumn>

          {/* Col 4 — Legales */}
          <FooterColumn title="Legales">
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-sm text-white/50">
            © 2026 Dentidad — Un producto de Solvianweb · Hecho en Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-[2px] text-mint">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}
