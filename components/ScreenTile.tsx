import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Reads width and height from a PNG file without external dependencies.
 * Returns null if the file isn't a valid PNG.
 *
 * PNG layout: 8-byte signature, then the IHDR chunk starting at byte 8.
 * Width is a big-endian uint32 at offset 16, height at offset 20.
 */
function getPngDimensions(absPath: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(absPath, "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    // PNG signature bytes 1-3 should be "PNG"
    if (buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) return null;
    return {
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
    };
  } catch {
    return null;
  }
}

/**
 * ScreenTile renders a pre-cropped screenshot at its natural aspect ratio.
 *
 * - If the file exists at /public + `src`, it's rendered via next/image with
 *   the file's real dimensions (so the layout reserves the right space and
 *   there's no CLS).
 * - If the file is missing, a labeled placeholder is shown with the expected
 *   path — drop the PNG in and the tile renders on the next refresh.
 *
 * Server component — reads from disk at render time.
 */
export default function ScreenTile({
  src,
  alt,
  hint,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  src: string;
  alt: string;
  hint?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const absPath = path.join(
    process.cwd(),
    "public",
    src.replace(/^\//, "")
  );
  const exists = fs.existsSync(absPath);

  if (!exists) {
    return (
      <Placeholder src={src} hint={hint} className={className} />
    );
  }

  const dims = getPngDimensions(absPath);
  // Fallback dimensions are deliberately generic — next/image just uses these
  // to compute aspect ratio. If reading failed (non-PNG, etc.), the image will
  // still render correctly, only without optimal CLS reservation.
  const width = dims?.width ?? 1200;
  const height = dims?.height ?? 800;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`block w-full h-auto rounded-md shadow-lg ring-1 ring-border bg-white ${className}`}
    />
  );
}

function Placeholder({
  src,
  hint,
  className,
}: {
  src: string;
  hint?: string;
  className: string;
}) {
  const folder = src.substring(0, src.lastIndexOf("/")) || "/";
  const filename = src.substring(src.lastIndexOf("/") + 1);
  return (
    <div
      role="img"
      aria-label={`Recorte pendiente: ${filename}`}
      className={`aspect-[16/9] rounded-md border-2 border-dashed border-navy/20 bg-navy/5 flex items-center justify-center text-center p-6 ${className}`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[2px] text-navy/60">
          Recorte pendiente
        </p>
        <p className="mt-2 font-mono text-sm text-navy/80 break-all">
          {filename}
        </p>
        {hint && (
          <p className="mt-2 text-xs text-ink-2 max-w-[28ch] mx-auto">
            {hint}
          </p>
        )}
        <p className="mt-3 text-[11px] text-ink-3">
          Pegá el PNG en{" "}
          <code className="font-mono">public{folder}</code>
        </p>
      </div>
    </div>
  );
}
