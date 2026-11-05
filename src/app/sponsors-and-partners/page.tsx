import type { Metadata } from "next";
import { PackageBenefits } from "@/components/PackageBenefits";
import { SponsorshipGrid } from "@/components/SponsorshipGrid";
import { ActionLink, PageIntro, SectionLabel } from "@/components/Elements";
import { PartnerGroups } from "@/components/PartnerLogo";
import { createPageMetadata } from "@/content/metadata";
import { sitePage } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { schemaIds, webPageJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { inKindGroups, partnerDates, partnerReasons, sponsorshipTiers } from "@/content/sponsorship";

const page = sitePage("/sponsors-and-partners");

export const metadata: Metadata = createPageMetadata(page);

export default function SponsorsAndPartners() {
  const supporter = sponsorshipTiers[6];
  return (
    <main id="main" className="sponsors-partners-page">
      <JsonLd data={webPageJsonLd({ ...page, about: schemaIds.event })} />
      <PageIntro label="SPONSORS & PARTNERS / 2026" title="Make the next idea possible." description="Help curious minds across Sri Lanka learn, connect and build through bootcamps in Colombo and Kandy, an island-wide webinar and the Kandy hackathon." />
      <nav className="support-section-nav" aria-label="Sponsors and partners sections">
        <a href="#our-supporters">Our supporters</a>
        <a href="#why-partner">Why partner</a>
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
          <p>Five touchpoints: bootcamps in Colombo and Kandy, an island-wide webinar, the 48-hour Kandy hackathon and the prize giving. Reach school and university students, developers and technologists, designers, scientists and educators.</p>
        </div>
        <div className="sponsor-reach-grid">
          <div><strong>40,000+</strong><span>Projected campaign reach</span><p>Students across Sri Lanka through IEEE student branches, school science associations, and our ecosystem and community partners</p></div>
          <div><strong>1,000+</strong><span>Students in person</span><p>Across the free, half-day bootcamps in Colombo and Kandy, plus the main hackathon</p></div>
          <div><strong>~200</strong><span>On site for 48 hours</span><p>Builders, mentors, judges and crew in Kandy on 14–15 November 2026, plus virtual teams</p></div>
        </div>
      </section>

      <section className="content-section" id="why-partner" aria-labelledby="why-partner-title">
        <div className="support-heading">
          <SectionLabel>WHY PARTNER WITH US</SectionLabel>
          <h2 id="why-partner-title">Put your brand where the next builders start.</h2>
        </div>
        <ul className="support-reason-grid">{partnerReasons.map((reason) => <li key={reason.title}><h3>{reason.title}</h3><p>{reason.description}</p></li>)}</ul>
      </section>

      <section className="content-section" id="sponsorship" aria-labelledby="sponsorship-title">
        <div className="support-heading">
          <SectionLabel>SPONSORSHIP PACKAGES</SectionLabel>
          <h2 id="sponsorship-title">Choose how you make a difference.</h2>
          <p>Find the right level of involvement, from event naming to a place on the sponsors’ wall. We partner with one company per industry, and the Title Partner holds category exclusivity.</p>
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
                  <span className="package-capacity">{tier.label}</span>
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
            <div className="package-price-meta"><span className="package-currency" aria-hidden="true">LKR</span><span className="package-capacity">{supporter.label}</span></div>
            <div className="package-amount"><strong><span className="sr-only">LKR </span>{supporter.amount}</strong></div>
            <p>{supporter.payment}</p>
            <ActionLink href={`mailto:${site.sponsorshipEmail}?subject=Supporter%20enquiry`} outline>Become a supporter</ActionLink>
          </div>
        </article>
        <p className="package-availability">One company per industry. Contact us for current availability in your category.</p>
        <div className="support-deadline">
          <h3>Bootcamp and print benefits apply from the date you join.</h3>
          <p>Bootcamps run in the <strong>first week of November</strong>, so joining earlier means more of your package reaches students. Sponsorship is managed by <strong>UniStay (Pvt) Ltd</strong>, our organizer and fiscal sponsor approved by the NASA Space Apps Global Organizing Team, so every partner receives proper invoices and receipts.</p>
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
          <div className="support-kind-action"><p>Tell us what you can bring and we’ll shape the right package with you.</p><ActionLink href={`mailto:${site.partnershipsEmail}?subject=In-kind%20partnership%20enquiry`} outline>Discuss an in-kind partnership</ActionLink></div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="support-activation-title">
        <div className="support-heading"><SectionLabel>ACTIVATION & REPORTING</SectionLabel><h2 id="support-activation-title">Make your contribution count.</h2></div>
        <div className="support-contact-grid">
          <div><h3>Build your involvement</h3><p>Explore a named award, challenge track or prize; your team mentoring or judging on site; a bootcamp workshop or talk on your tools; free or discounted product access; or a booth, demo or student-appropriate sampling. Anything else in mind? We’ll shape it with you.</p></div>
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
            <p>Join us as a sponsor or adopt the bootcamp series. We’ll set up a short call and shape the right package with you.</p>
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
              <p>Local Lead, NASA Space Apps Challenge Kandy 2026</p>
              <a href="mailto:rometh@nasaspaceapps.lk">rometh@nasaspaceapps.lk</a>
              <a href="tel:+94777253796">+94 77 725 3796</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
