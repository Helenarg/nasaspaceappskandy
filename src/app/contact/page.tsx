import type { Metadata } from "next";
import { FormPage } from "@/components/FormPage";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the NASA Space Apps Kandy organising team with participation, partnership, media, or event questions.",
  path: "/contact",
});
export default function Contact() {
  return (
    <FormPage
      kind="messages"
      label={<L id="contact.intro.label" />}
      title={<L id="contact.intro.title" />}
      description={<L id="contact.intro.description" />}
      asideTitle={<L id="contact.aside.title" />}
    >
      <p>
        <L id="contact.aside.first" />
      </p>
      <p>
        <L id="contact.aside.second" />
      </p>
      <div className="contact-channels">
        <p><strong>General questions</strong><br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
        <p><strong>Sponsorships</strong><br /><a href={`mailto:${site.sponsorshipEmail}`}>{site.sponsorshipEmail}</a></p>
        <p><strong>Partnerships and media</strong><br /><a href={`mailto:${site.partnershipsEmail}`}>{site.partnershipsEmail}</a></p>
      </div>
    </FormPage>
  );
}
