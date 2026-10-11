import type { Metadata } from "next";
import { FormPage } from "@/components/FormPage";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
export const metadata: Metadata = createPageMetadata({
  title: "Volunteers & mentors",
  description: "Support NASA Space Apps Kandy as a volunteer or mentor and help local teams turn ideas into meaningful projects.",
  path: "/join",
});
export default function Join() {
  return (
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
  );
}
