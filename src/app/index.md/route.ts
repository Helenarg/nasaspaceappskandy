import { site } from "@/content/site";
import { indexMarkdown } from "@/lib/ai-content";

export const dynamic = "force-static";

// The Markdown copy points search engines back to the HTML home page as the canonical version.
export function GET() {
  return new Response(indexMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${site.url}/>; rel="canonical"`,
    },
  });
}
