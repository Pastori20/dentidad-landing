/**
 * CropImage renders a focused, zoomed-in crop of a larger screenshot
 * using CSS background-image. Compared to `transform: scale()` on an <img>,
 * this approach keeps the source image at its native resolution and lets the
 * browser rasterize once at the visible size — no DOM-level scaling, no
 * pixelation at high zoom levels.
 *
 * - `aspect`: Tailwind aspect-ratio class. Defines the visible frame.
 * - `zoom`:   image size relative to the container width.
 *             1   = image fits container width (no zoom)
 *             1.5 = image rendered at 150% of container width
 *             2   = 2× zoom, etc.
 * - `position`: CSS background-position string. "0% 0%" = top-left of the
 *             image is anchored to top-left of the frame. "50% 50%" centers.
 *             "100% 100%" anchors bottom-right.
 *
 * Note: because we use background-image, Next.js Image optimization (webp/avif
 * conversion, automatic responsive sizes) is bypassed for these tiles. The
 * PNGs in /public/screens are already reasonably sized for landing use.
 */
export default function CropImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  position = "50% 50%",
  zoom = 1,
  rounded = "rounded-md",
  ring = "ring-1 ring-border",
  shadow = "shadow-lg",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  position?: string;
  zoom?: number;
  rounded?: string;
  ring?: string;
  shadow?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`${aspect} ${rounded} ${ring} ${shadow} bg-white overflow-hidden ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: `${zoom * 100}%`,
        backgroundPosition: position,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
