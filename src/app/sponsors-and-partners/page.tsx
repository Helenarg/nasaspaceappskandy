import type { Metadata } from "next";
import { PackageBenefits } from "@/components/PackageBenefits";
import { SponsorshipGrid } from "@/components/SponsorshipGrid";
import { ActionLink, PageIntro, SectionLabel } from "@/components/Elements";
import { PartnerGroups } from "@/components/PartnerLogo";
import { createPageMetadata } from "@/content/metadata";
import { site } from "@/content/site";
import { inKindGroups, inKindLevels, partnerDates, sponsorshipTiers } from "@/content/sponsorship";

export const metadata: Metadata = createPageMetadata({
  title: "Sponsors & Partners",
  description: "Meet our supporters and explore sponsorship and partnership opportunities for NASA Space Apps Kandy 2026.",
  path: "/sponsors-and-partners",
});

export default function SponsorsAndPartners() {
  const supporter = sponsorshipTiers[6];
  return (
    <main id="main" className="sponsors-partners-page">
      <PageIntro label="SPONSORS & PARTNERS / 2026" title="Make the next idea possible." description="Help curious minds across Sri Lanka learn, connect and build through four city bootcamps and the Kandy hackathon." />
      <nav className="support-section-nav" aria-label="Sponsors and partners sections">
        <a href="#our-supporters">Our supporters</a>
        <a href="#sponsorship">Sponsorship packages</a>
        <a href="#partnerships">Partnerships</a>
        <a href="#partner-dates">Key dates</a>
        <a href="#get-in-touch">Get in touch</a>
      </nav>

      <section className="content-section supporter-wall" id="our-supporters" aria-label="Our sponsors and partners">
        <PartnerGroups />
      </section>

      <section className="content-section support-opportunity" aria-labelledby="support-opportunity-title">
        <div className="support-heading">
          <SectionLabel>LOCAL OPPORTUNITY</SectionLabel>
          <h2 id="support-opportunity-title">Connect with the people building what comes next.</h2>
          <p>Six opportunities to connect: four bootcamps in Colombo, Kandy, Galle and Kurunegala, the 48-hour Kandy hackathon, and the prize giving. Support school and university students, early-career technologists, designers, scientists and educators.</p>
        </div>
        <div className="sponsor-reach-grid">
          <div><strong>40,000+</strong><span>Projected campaign reach</span><p>Students across Sri Lanka through university, school and community networks</p></div>
          <div><strong>1,000–1,500</strong><span>Target bootcamp attendance</span><p>Across four free, half-day bootcamps in the first week of November</p></div>
          <div><strong>~150</strong><span>Expected in-person builders</span><p>14–15 November 2026 in Kandy, plus virtual teams; main venue being confirmed</p></div>
        </div>
      </section>

      <section className="content-section" id="sponsorship" aria-labelledby="sponsorship-title">
        <div className="support-heading">
          <SectionLabel>SPONSORSHIP PACKAGES</SectionLabel>
          <h2 id="sponsorship-title">Choose how you make a difference.</h2>
          <p>Find the right level of involvement, from event naming to a place on the sponsors’ wall. Each package supports the Kandy local event.</p>
        </div>
        <SponsorshipGrid>
          {sponsorshipTiers.slice(0, 6).map((tier, index) => (
            <article className={index === 0 ? "support-package support-package-featured" : "support-package"} key={tier.name}>
              <header className="package-heading">
                <h3>{tier.name}</h3>
                <p>{tier.summary}</p>
              </header>
              <div className="package-price">
                <div className="package-price-meta">
                  <span className="package-currency" aria-hidden="true">LKR</span>
                  <span className="package-capacity">{tier.slots === 1 ? "1 exclusive place" : `${tier.slots} partner places`}</span>
                </div>
                <div className="package-amount"><strong><span className="sr-only">LKR </span>{tier.amount}</strong></div>
                <div className="package-terms"><p>{tier.payment}</p></div>
              </div>
              <ul className="package-highlights">{tier.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              <div className="package-footer">
                <PackageBenefits name={tier.name}><ul>{tier.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></PackageBenefits>
                <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=${encodeURIComponent(tier.name + " enquiry")}`} outline={index !== 0}>Enquire about {tier.name === "Official Bootcamp Partner" ? "Bootcamp" : tier.name.replace(" Partner", "")}</ActionLink>
              </div>
            </article>
          ))}
        </SponsorshipGrid>
        <article className="supporter-package">
          <div className="supporter-package-intro">
            <h3>{supporter.name}</h3>
            <p>{supporter.summary}</p>
          </div>
          <div className="supporter-package-benefits">
            <h4>What’s included</h4>
            <ul className="package-highlights">{supporter.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
          </div>
          <div className="supporter-package-action">
            <div className="package-price-meta"><span className="package-currency" aria-hidden="true">LKR</span><span className="package-capacity">{supporter.slots} partner places</span></div>
            <div className="package-amount"><strong><span className="sr-only">LKR </span>{supporter.amount}</strong></div>
            <p>{supporter.payment}</p>
            <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Supporter%20enquiry`} outline>Become a supporter</ActionLink>
          </div>
        </article>
        <p className="package-availability">Places shown are the allocation for each package. Contact us for current availability.</p>
        <div className="support-deadline">
          <h3>Sign by <time dateTime="2026-10-31">31 October 2026</time> to include eligible bootcamp benefits.</h3>
          <p><strong>Title, Platinum and Gold partners</strong> receive their listed bootcamp benefits when signed by the deadline. <strong>After 31 October</strong>, the proposal offers extra main-event benefits in their place at the <strong>same tier and price</strong>: a longer stage slot, an extra social post and a named award. Discuss the arrangements for your package with our team.</p>
        </div>
      </section>

      <section className="content-section support-kind-section" id="partnerships" aria-labelledby="partnerships-title">
        <div className="support-heading">
          <SectionLabel>IN-KIND PARTNERSHIPS</SectionLabel>
          <h2 id="partnerships-title">Bring your strengths to the mission.</h2>
          <p>Contribute products, services or facilities as an <strong>Official Category Partner</strong>. Choose where your organisation can help below.</p>
        </div>
        <div className="support-kind-groups">
          {inKindGroups.map((group) => (
            <article key={group.name}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <ul>{group.categories.map((category) => <li key={category}>{category}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="support-kind-value">
          <div><h3>Your contribution, recognised.</h3><p>The value of your in-kind contribution determines your benefit level. <strong>Cash and in-kind support can be combined.</strong></p></div>
          <dl>{inKindLevels.map((item) => <div key={item.level}><dt>{item.level}</dt><dd><strong>{item.value}</strong></dd></div>)}</dl>
        </div>
      </section>

      <section className="content-section" aria-labelledby="support-activation-title">
        <div className="support-heading"><SectionLabel>ACTIVATION & REPORTING</SectionLabel><h2 id="support-activation-title">Make your contribution count.</h2></div>
        <div className="support-contact-grid">
          <div><h3>Build your involvement</h3><p>Explore a named award, challenge track or prize; on-site mentoring or judging; a bootcamp workshop; free or discounted product access; or a booth, demo or student-appropriate sampling. We’ll shape the activation around your package.</p></div>
          <div><h3>See the impact</h3><p>Post-event reporting covers attendance, participation, engagement, channel reach, photography, recap video, testimonials, media coverage and evidence of benefits delivered.</p></div>
        </div>
      </section>

      <section className="content-section" id="partner-dates" aria-labelledby="partner-dates-title">
        <div className="support-heading"><SectionLabel>PARTNER TIMELINE / 2026</SectionLabel><h2 id="partner-dates-title">Plan your partnership.</h2></div>
        <ol className="support-date-grid">{partnerDates.map((item) => <li key={item.date}><h3>{item.date}</h3><p>{item.description}</p></li>)}</ol>
      </section>

      <section className="content-section support-contact" id="get-in-touch" aria-labelledby="support-contact-title">
        <span className="cta-pattern" aria-hidden="true" />
        <div className="support-contact-layout">
          <div className="support-contact-primary">
            <SectionLabel>LET&apos;S WORK TOGETHER</SectionLabel>
            <h2 id="support-contact-title">Help bring the next frontier to Kandy.</h2>
            <p>Choose a package, support the bootcamps or bring something the event needs. Let’s find the right fit.</p>
            <div className="support-contact-actions">
              <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Space%20Apps%20Kandy%20sponsorship&body=Organisation%3A%0AContact%20name%3A%0AInterested%20in%3A%0A`}>Discuss sponsorship</ActionLink>
              <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Request%20the%20sponsorship%20deck&body=Hello%2C%0A%0APlease%20send%20me%20the%20NASA%20Space%20Apps%20Kandy%202026%20sponsorship%20deck.%0A%0AOrganisation%3A%0AContact%20name%3A%0A`} outline>Request sponsorship deck</ActionLink>
            </div>
          </div>
          <div className="support-contact-directory">
            <div>
              <h3>Sponsorships</h3>
              <a href={`mailto:${site.sponsorshipEmail}`}>{site.sponsorshipEmail}</a>
            </div>
            <div>
              <h3>Partnerships &amp; media</h3>
              <a href={`mailto:${site.partnershipsEmail}`}>{site.partnershipsEmail}</a>
            </div>
            <div className="support-contact-person">
              <h3>Rometh Sendinu</h3>
              <p>Local Lead, NASA Space Apps Kandy</p>
              <a href="mailto:rometh@nasaspaceapps.lk">rometh@nasaspaceapps.lk</a>
              <a href="tel:+94777253796">+94 77 725 3796</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
