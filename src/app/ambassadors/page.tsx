import type { Metadata } from "next";
import { FormPage } from "@/components/FormPage";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
export const metadata: Metadata = createPageMetadata({
  title: "Campus ambassadors",
  description: "Become a NASA Space Apps Kandy campus ambassador and connect students with the local space and open-data community.",
  path: "/ambassadors",
});
export default function Ambassadors() {
  return (
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
  );
}
