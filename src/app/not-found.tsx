import { ActionLink } from "@/components/Elements";
import { LocalizedText as L } from "@/components/LocalizedText";
export default function NotFound() {
  return (
    <main id="main">
      <section className="statement-section">
        <p className="technical-label"><L id="notFound.label" /></p>
        <h1><L id="notFound.title" /></h1>
        <p><L id="notFound.description" /></p>
        <ActionLink href="/"><L id="notFound.cta" /></ActionLink>
      </section>
    </main>
  );
}
