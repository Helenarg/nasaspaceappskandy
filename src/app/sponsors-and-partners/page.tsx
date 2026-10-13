import type { Metadata } from "next";
import { ActionLink, PageIntro, SectionLabel } from "@/components/Elements";
import { PartnerGroups } from "@/components/PartnerLogo";
import { createPageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import { partnershipOptions, sponsorshipTiers } from "@/content/sponsorship";

export const metadata: Metadata = createPageMetadata({
  title: "Sponsors & Partners",
  description: "Meet our supporters and explore sponsorship and partnership opportunities for NASA Space Apps Kandy 2026.",
  path: "/sponsors-and-partners",
});

export default function SponsorsAndPartners() {
  return (
    <main id="main" className="sponsors-partners-page">
      <PageIntro label="SPONSORS & PARTNERS / 2026" title="Make the next idea possible." description="Help curious minds across Sri Lanka learn, connect and build through four city bootcamps and the Kandy hackathon." />
      <nav className="support-section-nav" aria-label="Sponsors and partners sections">
        <a href="#our-supporters">Our supporters</a>
        <a href="#sponsorship">Sponsorship packages</a>
        <a href="#partnerships">Partnerships</a>
        <a href="#get-in-touch">Get in touch</a>
      </nav>

      <section className="content-section supporter-wall" id="our-supporters" aria-label="Our sponsors and partners">
        <PartnerGroups />
      </section>

      <section className="content-section support-opportunity" aria-labelledby="support-opportunity-title">
        <div className="support-heading">
          <SectionLabel>LOCAL OPPORTUNITY</SectionLabel>
          <h2 id="support-opportunity-title">Connect with the people building what comes next.</h2>
          <p>Support learning before the event and collaboration throughout the hackathon.</p>
        </div>
        <div className="sponsor-reach-grid">
          <div><strong>04</strong><span>Bootcamp cities</span><p>Colombo, Kandy, Galle and Kurunegala</p></div>
          <div><strong>02</strong><span>Hackathon days</span><p>14 and 15 November 2026</p></div>
          <div><strong>01</strong><span>Kandy community</span><p>In-person and virtual participation</p></div>
        </div>
      </section>

      <section className="content-section" id="sponsorship" aria-labelledby="sponsorship-title">
        <div className="support-heading">
          <SectionLabel>SPONSORSHIP PACKAGES</SectionLabel>
          <h2 id="sponsorship-title">Choose how you make a difference.</h2>
          <p>Help provide the resources, learning opportunities and hospitality that make the event possible.</p>
        </div>
        <div className="support-package-grid">
          {sponsorshipTiers.map((tier, index) => (
            <article className={index === 0 ? "support-package support-package-featured" : "support-package"} key={tier.name}>
              <span className="technical-label">{index === 0 ? "PREMIER SUPPORT" : "EVENT SUPPORT"}</span>
              <h3>{tier.name}</h3>
              <div className="package-price">
                <span className="package-currency">LKR</span>
                <strong>{tier.amount}</strong>
                <span className="package-price-note">Sample contribution</span>
              </div>
              <ul>{tier.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=${encodeURIComponent(tier.name + " enquiry")}`} outline={index !== 0}>Discuss this package</ActionLink>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="partnerships" aria-labelledby="partnerships-title">
        <div className="support-heading">
          <SectionLabel>PARTNERSHIP OPPORTUNITIES</SectionLabel>
          <h2 id="partnerships-title">Bring your strengths to the mission.</h2>
          <p>Contribute the connections, expertise and practical support that help participants take part.</p>
        </div>
        <div className="support-partnership-grid">
          {partnershipOptions.map((option) => (
            <article key={option.name}><h3>{option.name}</h3><p>{option.description}</p></article>
          ))}
        </div>
      </section>

      <section className="content-section support-contact" id="get-in-touch" aria-labelledby="support-contact-title">
        <span className="cta-pattern" aria-hidden="true" />
        <div className="support-heading"><SectionLabel>LET&apos;S WORK TOGETHER</SectionLabel><h2 id="support-contact-title">Help bring the next frontier to Kandy.</h2></div>
        <div className="support-contact-grid">
          <div>
            <h3>Sponsorship</h3>
            <p>Request the deck or tell us about your organisation and preferred package.</p>
            <a className="support-email" href={`mailto:${site.sponsorshipEmail}`}>{site.sponsorshipEmail}</a>
            <div className="resource-links">
              <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Request%20the%20sponsorship%20deck`}>Request sponsorship deck</ActionLink>
              <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Sponsorship%20details&body=Organisation%3A%0AContact%20name%3A%0APreferred%20package%3A%0AMessage%3A`} outline>Share your details</ActionLink>
            </div>
          </div>
          <div>
            <h3>Partnerships & media</h3>
            <p>Share how your community, expertise or services could support the event.</p>
            <a className="support-email" href={`mailto:${site.partnershipsEmail}`}>{site.partnershipsEmail}</a>
            <div className="resource-links"><ActionLink href={`mailto:${site.partnershipsEmail}?subject=Partnership%20enquiry`} outline>Discuss a partnership</ActionLink></div>
          </div>
        </div>
      </section>
    </main>
  );
}
