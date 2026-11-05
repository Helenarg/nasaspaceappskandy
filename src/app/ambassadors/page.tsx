import type { Metadata } from "next";
import { FormPage } from "@/components/FormPage";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { sitePage } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/structured-data";
const page = sitePage("/ambassadors");

export const metadata: Metadata = createPageMetadata(page);
export default function Ambassadors() {
  return (
    <>
    <JsonLd data={webPageJsonLd({ ...page })} />
    <FormPage
      kind="ambassadors"
      label={<L id="ambassadors.intro.label" />}
      title={<L id="ambassadors.intro.title" />}
      description={<L id="ambassadors.intro.description" />}
      asideTitle={<L id="ambassadors.aside.title" />}
    >
      <p>
        <L id="ambassadors.aside.first" />
      </p>
      <p>
        <L id="ambassadors.aside.second" />
      </p>
    </FormPage>
    </>
  );
}
