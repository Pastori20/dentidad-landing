import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Reads a markdown file from /content/legal and returns it as HTML.
 *
 * The first H1 in the file is stripped from the rendered HTML because the
 * page layout renders the title separately as the page header.
 */
export async function loadLegalDoc(filename: string): Promise<{
  title: string;
  html: string;
}> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    filename
  );
  const raw = await fs.readFile(filePath, "utf8");

  // Extract title from the first H1
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : "";

  // Strip the first H1 from the source before rendering (avoids duplicate title)
  const withoutH1 = raw.replace(/^#\s+.+\n?/m, "");

  const html = await marked.parse(withoutH1);

  return { title, html };
}
