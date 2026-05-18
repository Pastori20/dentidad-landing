import Logo from "./Logo";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  htmlContent,
}: {
  title: string;
  htmlContent: string;
}) {
  return (
    <>
      {/* Simplified header for legal pages — just logo + back to home */}
      <header className="bg-bg border-b border-border">
        <div className="container-x h-16 md:h-18 flex items-center justify-between">
          <a
            href="/"
            aria-label="Dentidad — Volver al inicio"
            className="flex items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Logo size="sm" />
          </a>
          <a
            href="/"
            className="text-sm font-medium text-ink-2 hover:text-navy transition-colors inline-flex items-center gap-1.5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="bg-bg py-14 md:py-20">
        <article className="container-x max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-navy text-balance">
            {title}
          </h1>
          <div
            className="legal-prose mt-10"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>

      <Footer />
    </>
  );
}
