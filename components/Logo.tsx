type LogoProps = {
  variant?: "primary" | "light";
  withIsotype?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * Contorno exacto de la "d" de DM Sans 900 en el cuadrado de 200 (copiado de
 * odonto-next/src/components/brand/dentidad-mark.ts, donde está la explicación).
 * Si cambia allá, se copia acá.
 */
const DENTIDAD_D_PATH =
  "M95.13 162.04Q83.74 162.04 74.47 156.26Q65.21 150.48 59.86 140.37Q54.50 130.25 54.50 117.33Q54.50 104.24 59.94 94.13Q65.38 84.01 74.81 78.14Q84.25 72.28 95.81 72.28Q104.65 72.28 111.28 75.42Q117.91 78.57 122.16 84.52L122.16 37.60L147.66 37.60L147.66 160L125.05 160L122.16 148.95Q119.61 152.52 115.95 155.50Q112.30 158.47 107.20 160.25Q102.10 162.04 95.13 162.04M101.76 139.77Q108.05 139.77 112.90 136.88Q117.74 133.99 120.38 128.89Q123.01 123.79 123.01 117.16Q123.01 110.53 120.38 105.43Q117.74 100.33 112.90 97.44Q108.05 94.55 101.76 94.55Q95.64 94.55 90.80 97.44Q85.95 100.33 83.23 105.43Q80.51 110.53 80.51 116.99Q80.51 123.62 83.23 128.81Q85.95 133.99 90.80 136.88Q95.64 139.77 101.76 139.77";

const sizeMap = {
  sm: { iso: 28, text: "text-lg" },
  md: { iso: 36, text: "text-2xl" },
  lg: { iso: 56, text: "text-4xl" },
};

export default function Logo({
  variant = "primary",
  withIsotype = true,
  className = "",
  size = "md",
}: LogoProps) {
  const isoSize = sizeMap[size].iso;
  const textSize = sizeMap[size].text;

  const dentColor = variant === "light" ? "wm-dent-light" : "wm-dent";
  const idadColor = variant === "light" ? "wm-idad-light" : "wm-idad";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {withIsotype && (
        <svg
          width={isoSize}
          height={isoSize}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="flex-shrink-0"
        >
          <rect width="200" height="200" rx="44" fill="#063760" />
          {/* La "d" es un trazado, no una letra: no depende de que cargue
              DM Sans. Es el mismo del sistema (odonto-next,
              src/components/brand/dentidad-mark.ts). */}
          <path d={DENTIDAD_D_PATH} fill="#ffffff" />
          <circle cx="158" cy="50" r="13" fill="#00C9A7" />
        </svg>
      )}
      <span className={`wordmark ${textSize} tracking-tight`}>
        <span className={dentColor}>Dent</span>
        <span className={idadColor}>idad</span>
      </span>
    </div>
  );
}
