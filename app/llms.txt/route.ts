import { buildLlmsText } from "@/lib/llms-text";

// Se genera en el build con las mismas fuentes que la página (lib/llms-text.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
