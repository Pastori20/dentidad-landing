type LogoProps = {
  variant?: "primary" | "light";
  withIsotype?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

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
          <text
            x="46"
            y="160"
            fontFamily='"DM Sans"'
            fontWeight={900}
            fontSize={170}
            letterSpacing={-8}
            fill="#ffffff"
          >
            d
          </text>
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
