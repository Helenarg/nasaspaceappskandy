import { PageIntro, SectionLabel } from "./Elements";
import { ApplicationForm } from "./ApplicationForm";
import { site } from "@/content/site";
import type { FormKind } from "@/lib/submissions";
import type { ReactNode } from "react";
import { LocalizedText as L } from "./LocalizedText";

export function FormPage({
  kind,
  label,
  title,
  description,
  asideTitle,
  children,
}: {
  kind: FormKind;
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  asideTitle: ReactNode;
  children: ReactNode;
}) {
  return (
    <main id="main">
      <PageIntro label={label} title={title} description={description} />
      <section className="form-layout">
        <aside className="form-aside">
          <SectionLabel><L id="formPage.aside.label" /></SectionLabel>
          <h2>{asideTitle}</h2>
          {children}
          <div className="quiet-note">
            <L id="formPage.help" />
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </aside>
        <ApplicationForm kind={kind} />
      </section>
    </main>
  );
}
