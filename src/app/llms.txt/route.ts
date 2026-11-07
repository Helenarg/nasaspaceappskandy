import { llmsTxt } from "@/lib/ai-content";

// Generated from the site content at build time; see https://llmstxt.org.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
