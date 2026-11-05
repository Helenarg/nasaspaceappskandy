import { serializeJsonLd } from "@/lib/structured-data";

// Structured data is not executable, so a native script tag is used instead of next/script.
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
