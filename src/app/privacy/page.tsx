import type { Metadata } from "next";
import { PageIntro } from "@/components/Elements";
import { site } from "@/content/site";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy policy",
  description: "Learn what information NASA Space Apps Kandy collects, why it is used, where it is stored, and how to manage your privacy choices.",
  path: "/privacy",
});
export default function Privacy() {
  return (
    <main id="main">
      <PageIntro
        label={<L id="privacy.intro.label" />}
        title={<L id="privacy.intro.title" />}
        description={<L id="privacy.intro.description" />}
      />
      <section className="content-section">
        <div className="legal-copy">
          <p className="legal-updated"><L id="privacy.updated" /></p>
          <h2><L id="privacy.collect.title" /></h2>
          <p><L id="privacy.collect.text" /></p>
          <h2><L id="privacy.automatic.title" /></h2>
          <p><L id="privacy.automatic.text" /></p>
          <h2><L id="privacy.destination.title" /></h2>
          <p><L id="privacy.destination.text" /></p>
          <h2><L id="privacy.use.title" /></h2>
          <p><L id="privacy.use.text" /></p>
          <h2><L id="privacy.retention.title" /></h2>
          <p><L id="privacy.retention.text" /></p>
          <h2><L id="privacy.sharing.title" /></h2>
          <p><L id="privacy.sharing.text" /></p>
          <h2><L id="privacy.cookies.title" /></h2>
          <p><L id="privacy.cookies.text" /></p>
          <h2><L id="privacy.security.title" /></h2>
          <p><L id="privacy.security.text" /></p>
          <h2><L id="privacy.rights.title" /></h2>
          <p><L id="privacy.rights.text" /></p>
          <h2><L id="privacy.questions.title" /></h2>
          <p>
            <L id="privacy.questions.beforeEmail" /> <a href={`mailto:${site.email}`}>{site.email}</a> <L id="privacy.questions.afterEmail" />
          </p>
          <h2><L id="privacy.services.title" /></h2>
          <p><L id="privacy.services.text" /></p>
          <h2><L id="privacy.changes.title" /></h2>
          <p><L id="privacy.changes.text" /></p>
        </div>
      </section>
    </main>
  );
}
