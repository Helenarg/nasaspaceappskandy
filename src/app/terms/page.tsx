import type { Metadata } from "next";
import Link from "next/link";
import { isComingSoon } from "@/lib/launch-mode";
import { PageIntro } from "@/components/Elements";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { sitePage } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";

const page = sitePage("/terms");

export const metadata: Metadata = createPageMetadata(page);

export default function Terms() {
  return (
    <main id="main">
      <JsonLd data={webPageJsonLd({ ...page })} />
      {isComingSoon ? <div className="container"><Link className="text-link" href="/">Back to NASA Space Apps Kandy</Link></div> : null}
      <PageIntro
        label={<L id="terms.intro.label" />}
        title={<L id="terms.intro.title" />}
        description={<L id="terms.intro.description" />}
      />
      <section className="content-section">
        <div className="legal-copy">
          <p className="legal-updated"><L id="terms.updated" /></p>
          <h2><L id="terms.acceptance.title" /></h2>
          <p><L id="terms.acceptance.text" /></p>
          <h2><L id="terms.event.title" /></h2>
          <p>
            <L id="terms.event.beforeLink" />{" "}
            <a href={site.participantTerms} target="_blank" rel="noopener noreferrer">
              <L id="terms.event.link" />
            </a>{" "}
            <L id="terms.event.afterLink" />
          </p>
          <h2><L id="terms.use.title" /></h2>
          <p><L id="terms.use.text" /></p>
          <h2><L id="terms.submissions.title" /></h2>
          <p><L id="terms.submissions.text" /></p>
          <h2><L id="terms.content.title" /></h2>
          <p><L id="terms.content.text" /></p>
          <h2><L id="terms.thirdParty.title" /></h2>
          <p><L id="terms.thirdParty.text" /></p>
          <h2><L id="terms.availability.title" /></h2>
          <p><L id="terms.availability.text" /></p>
          <h2><L id="terms.responsibility.title" /></h2>
          <p><L id="terms.responsibility.text" /></p>
          <h2><L id="terms.changes.title" /></h2>
          <p><L id="terms.changes.text" /></p>
          <h2><L id="terms.contact.title" /></h2>
          <p>
            <L id="terms.contact.beforeEmail" />{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
