import type { Metadata } from "next";
import { FormPage } from "@/components/FormPage";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { sitePage } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { schemaIds, webPageJsonLd } from "@/lib/structured-data";
const page = sitePage("/join");

export const metadata: Metadata = createPageMetadata(page);
export default function Join() {
  return (
    <>
    <JsonLd data={webPageJsonLd({ ...page, about: schemaIds.event })} />
    <FormPage
      kind="volunteers"
      label={<L id="join.intro.label" />}
      title={<L id="join.intro.title" />}
      description={<L id="join.intro.description" />}
      asideTitle={<L id="join.aside.title" />}
    >
      <p>
        <L id="join.aside.first" />
      </p>
      <p>
        <L id="join.aside.second" />
      </p>
      <p>
        <L id="join.aside.third" />
      </p>
    </FormPage>
    </>
  );
}
