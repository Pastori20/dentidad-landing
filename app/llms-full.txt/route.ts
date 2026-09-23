import { buildLlmsFullText } from "@/lib/llms-text";

// La versión completa: cada función con su beneficio, los planes y las
// preguntas frecuentes. Mismas fuentes que la página (lib/llms-text.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
