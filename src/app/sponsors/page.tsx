import type { Metadata } from "next";
import { GraduationCapIcon as GraduationCap } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { GraphIcon as Network } from "@phosphor-icons/react/dist/ssr/Graph";
import { RocketLaunchIcon as Rocket } from "@phosphor-icons/react/dist/ssr/RocketLaunch";
import { SectionLabel, ActionLink, PageIntro } from "@/components/Elements";
import { site } from "@/content/site";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Partners & sponsors",
  description: "Support NASA Space Apps Kandy through sponsorship, resources, and expertise. Explore ways to partner with the local community.",
  path: "/sponsors",
});

const opportunities = [
  {
    number: "01",
    title: "sponsors.opportunity.01.title",
    text: "sponsors.opportunity.01.text",
    details: [
      "sponsors.opportunity.01.detail.1",
      "sponsors.opportunity.01.detail.2",
      "sponsors.opportunity.01.detail.3",
    ],
  },
  {
    number: "02",
    title: "sponsors.opportunity.02.title",
    text: "sponsors.opportunity.02.text",
    details: [
      "sponsors.opportunity.02.detail.1",
      "sponsors.opportunity.02.detail.2",
      "sponsors.opportunity.02.detail.3",
    ],
  },
  {
    number: "03",
    title: "sponsors.opportunity.03.title",
    text: "sponsors.opportunity.03.text",
    details: [
      "sponsors.opportunity.03.detail.1",
      "sponsors.opportunity.03.detail.2",
      "sponsors.opportunity.03.detail.3",
    ],
  },
] as const;

const benefits = [
  {
    icon: GraduationCap,
    title: "sponsors.benefit.learning.title",
    text: "sponsors.benefit.learning.text",
  },
  {
    icon: Network,
    title: "sponsors.benefit.perspectives.title",
    text: "sponsors.benefit.perspectives.text",
  },
  {
    icon: Rocket,
    title: "sponsors.benefit.kandy.title",
    text: "sponsors.benefit.kandy.text",
  },
] as const;

const partnershipSteps = [
  ["sponsors.process.01.title", "sponsors.process.01.text"],
  ["sponsors.process.02.title", "sponsors.process.02.text"],
  ["sponsors.process.03.title", "sponsors.process.03.text"],
] as const;

export default function Sponsors() {
  return (
    <main id="main" className="sponsors-page">
      <PageIntro
        label={<L id="sponsors.intro.label" />}
        title={<L id="sponsors.intro.title" />}
        description={<L id="sponsors.intro.description" />}
      />

      <section
        className="content-section sponsor-section"
        aria-labelledby="sponsor-why"
      >
        <div className="sponsor-heading">
          <SectionLabel>
            <L id="sponsors.why.label" />
          </SectionLabel>
          <h2 id="sponsor-why">
            <L id="sponsors.why.title" />
          </h2>
          <p>
            <L id="sponsors.why.description" />
          </p>
        </div>
        <div className="info-grid sponsor-benefits">
          {benefits.map((card) => (
            <article className="info-card" key={card.title}>
              <card.icon size={28} weight="regular" aria-hidden="true" />
              <h3>
                <L id={card.title} />
              </h3>
              <p>
                <L id={card.text} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section sponsor-section"
        aria-labelledby="sponsor-opportunities"
      >
        <div className="sponsor-heading">
          <SectionLabel>
            <L id="sponsors.opportunities.label" />
          </SectionLabel>
          <h2 id="sponsor-opportunities">
            <L id="sponsors.opportunities.title" />
          </h2>
          <p>
            <L id="sponsors.opportunities.description" />
          </p>
        </div>
        <div className="sponsor-opportunities">
          {opportunities.map((item) => (
            <article className="sponsor-opportunity" key={item.number}>
              <span className="technical-label">
                {item.number} / <L id="sponsors.partnership" />
              </span>
              <h3>
                <L id={item.title} />
              </h3>
              <p>
                <L id={item.text} />
              </p>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>
                    <L id={detail} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="sponsor-note">
          <L id="sponsors.note" />
        </p>
      </section>

      <section
        className="content-section sponsor-section sponsor-process"
        aria-labelledby="sponsor-process"
      >
        <div className="sponsor-heading">
          <SectionLabel>
            <L id="sponsors.process.label" />
          </SectionLabel>
          <h2 id="sponsor-process">
            <L id="sponsors.process.title.first" />
            <br />
            <L id="sponsors.process.title.second" />
          </h2>
          <p>
            <L id="sponsors.process.description" />
          </p>
          <ActionLink href="/contact" outline>
            <L id="sponsors.process.cta" />
          </ActionLink>
        </div>
        <ol className="sponsor-steps">
          {partnershipSteps.map(([title, text], index) => (
            <li key={title}>
              <span className="technical-label">0{index + 1}</span>
              <div>
                <h3>
                  <L id={title} />
                </h3>
                <p>
                  <L id={text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="community-band sponsor-contact">
        <span className="cta-pattern" aria-hidden="true" />
        <div>
          <SectionLabel>
            <L id="sponsors.contact.label" />
          </SectionLabel>
          <h2>
            <L id="sponsors.contact.title" />
          </h2>
          <p>
            <L id="sponsors.contact.description" />
          </p>
          <a className="sponsor-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div className="community-action">
          <ActionLink href="/contact">
            <L id="sponsors.contact.cta" />
          </ActionLink>
        </div>
      </section>
    </main>
  );
}
