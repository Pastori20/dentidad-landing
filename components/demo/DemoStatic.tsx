import Image from "next/image";
import { DEMO_STEPS } from "./demo-steps";

/**
 * La sección demo como documento estático: los cuatro pasos uno debajo del
 * otro, con su etiqueta y su captura. Sin sticky, sin transformaciones.
 *
 * Es lo que ve quien tiene el movimiento reducido activado. No es una versión
 * degradada con menos información: está TODO, solo que quieto.
 */
export default function DemoStatic() {
  return (
    <ol className="mx-auto grid max-w-5xl gap-10 px-4">
      {DEMO_STEPS.map((paso, i) => (
        <li className="grid gap-4" key={paso.id}>
          <div>
            <p className="font-mono text-mint-600 text-xs uppercase tracking-widest">
              Paso {i + 1} · {paso.etiqueta}
            </p>
            <p className="mt-1 text-ink-2">{paso.detalle}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-bg-card">
            <Image
              alt={paso.alt}
              className="h-auto w-full"
              height={900}
              src={paso.desktop}
              width={1440}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
