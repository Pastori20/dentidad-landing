"use client";

import { useState, FormEvent } from "react";

type Props = {
  /** Default plan selection — passed from the pricing card the user clicked */
  defaultPlan?: "Esencial" | "Clínica" | "Multi-sede";
  /** Compact mode for embedding in CTA section */
  compact?: boolean;
};

export default function SignupForm({ defaultPlan = "Clínica", compact = false }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      nombre: String(formData.get("nombre") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      consultorio: String(formData.get("consultorio") || "").trim(),
      ciudad: String(formData.get("ciudad") || "").trim(),
      cantidadDentistas: String(formData.get("cantidadDentistas") || "").trim(),
      plan: String(formData.get("plan") || "").trim(),
      telefono: String(formData.get("telefono") || "").trim(),
      mensaje: String(formData.get("mensaje") || "").trim(),
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Algo salió mal. Intentalo de nuevo.");
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className={`rounded-2xl ${compact ? "bg-white/10 backdrop-blur-sm border border-white/20" : "bg-mint-soft border border-mint"} p-6 md:p-8 text-center`}>
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-mint">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#063760" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`mt-4 text-xl md:text-2xl font-extrabold ${compact ? "text-white" : "text-navy"}`}>
          ¡Listo! Recibimos tu pedido.
        </h3>
        <p className={`mt-2 ${compact ? "text-white/80" : "text-ink-2"} leading-relaxed`}>
          Te enviamos un mail de confirmación. En menos de 24 horas te creamos tu cuenta y te mandamos las credenciales para arrancar el trial de 14 días.
        </p>
      </div>
    );
  }

  // Style helpers depending on context
  const labelClass = compact
    ? "text-white/90 text-sm font-semibold"
    : "text-navy text-sm font-semibold";
  const inputClass = compact
    ? "w-full mt-1.5 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-lg px-4 py-3 outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition"
    : "w-full mt-1.5 bg-white border border-border text-ink rounded-lg px-4 py-3 outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre del odontólogo <span className="text-mint">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Dr. María González"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-mint">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="maria@consultorio.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="consultorio" className={labelClass}>
            Nombre del consultorio <span className="text-mint">*</span>
          </label>
          <input
            type="text"
            id="consultorio"
            name="consultorio"
            required
            placeholder="Consultorio Centro"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ciudad" className={labelClass}>
            Ciudad / Provincia <span className="text-mint">*</span>
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            required
            placeholder="Córdoba, Argentina"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="cantidadDentistas" className={labelClass}>
            ¿Cuántos dentistas trabajan? <span className="text-mint">*</span>
          </label>
          <select
            id="cantidadDentistas"
            name="cantidadDentistas"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled className="text-ink-3 bg-white">Elegí una opción</option>
            <option value="1" className="text-navy bg-white">Solo yo</option>
            <option value="2-3" className="text-navy bg-white">2 a 3</option>
            <option value="4-10" className="text-navy bg-white">4 a 10</option>
            <option value="10+" className="text-navy bg-white">Más de 10</option>
          </select>
        </div>
        <div>
          <label htmlFor="plan" className={labelClass}>
            Plan que te interesa <span className="text-mint">*</span>
          </label>
          <select
            id="plan"
            name="plan"
            required
            defaultValue={defaultPlan}
            className={inputClass}
          >
            <option value="Esencial" className="text-navy bg-white">Esencial — $50.000/mes</option>
            <option value="Clínica" className="text-navy bg-white">Clínica — $85.000/mes</option>
            <option value="Multi-sede" className="text-navy bg-white">Multi-sede — $300.000/mes</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="telefono" className={labelClass}>
          Teléfono / WhatsApp <span className={compact ? "text-white/50" : "text-ink-3"}>(opcional)</span>
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="+54 9 351 555 0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>
          Algo que quieras contarnos <span className={compact ? "text-white/50" : "text-ink-3"}>(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Hoy uso Excel y... / Tengo X pacientes... / etc."
          className={inputClass}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-4 font-bold text-base transition-all ${
          compact
            ? "bg-mint text-navy hover:bg-mint/90 disabled:bg-mint/50"
            : "bg-navy text-white hover:bg-navy/90 disabled:bg-navy/50"
        } disabled:cursor-not-allowed`}
      >
        {submitting ? (
          <>
            <Spinner /> Enviando...
          </>
        ) : (
          "Empezar prueba de 14 días gratis →"
        )}
      </button>

      <p className={`text-xs leading-relaxed text-center ${compact ? "text-white/60" : "text-ink-3"}`}>
        Sin tarjeta. Sin permanencia. Te creamos la cuenta en menos de 24hs.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
