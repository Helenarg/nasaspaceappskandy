import type { Metadata } from "next";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CalendarDotsIcon as CalendarDays } from "@phosphor-icons/react/dist/ssr/CalendarDots";
import { MapPinIcon as MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { UsersThreeIcon as Users } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { PageIntro, CommunityBand, SectionLabel } from "@/components/Elements";
import { spaceAppsEvent } from "@/content/event";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { EventSchedule } from "@/components/EventSchedule";

const eventHighlights = [
  {
    icon: CalendarDays,
    title: "events.card.date.title",
    text: "schedule.dateNote",
    status: "events.card.date.status",
  },
  {
    icon: MapPin,
    title: "events.card.venue.title",
    text: "events.card.venue.text",
    status: "events.card.venue.status",
  },
  {
    icon: Users,
    title: "events.card.mode.title",
    text: "events.card.mode.text",
    status: "events.card.mode.status",
  },
] as const;

const practicalDetails = [
  ["participation.free", "participation.team"],
  ["schedule.meals.title", "schedule.meals.text"],
  ["schedule.welcome.title", "schedule.welcome.text"],
] as const;

const journeySteps = [
  ["01", "events.journey.01.title", "events.journey.01.text"],
  ["02", "events.journey.02.title", "events.journey.02.text"],
  ["03", "events.journey.03.title", "events.journey.03.text"],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Event details",
  description: "Find the NASA Space Apps Kandy 2026 event dates, location, participation format, and preparation details.",
  path: "/event-details",
});

export default function Events() {
  return (
    <main id="main">
      <PageIntro
        label={<L id="events.intro.label" />}
        title={<L id="events.intro.title" />}
        description={<L id="events.intro.description" />}
      />
      <section className="content-section">
        <div className="info-grid">
          {eventHighlights.map((card) => (
            <article className="info-card" key={card.title}>
              <card.icon size={28} weight="regular" aria-hidden="true" />
              <h3>
                <L id={card.title} />
              </h3>
              <p>
                <L id={card.text} />
              </p>
              <span className="status-pill">
                <L id={card.status} />
              </span>
            </article>
          ))}
        </div>
        <a
          className="text-link"
          href={spaceAppsEvent.kandyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <L id="events.officialLink" />
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
      <EventSchedule />
      <section className="content-section">
        <h2>
          <L id="schedule.practical" />
        </h2>
        <div className="conduct-grid">
          {practicalDetails.map(([title, text]) => (
            <article key={title}>
              <h3>
                <L id={title} />
              </h3>
              <p>
                <L id={text} />
              </p>
            </article>
          ))}
        </div>
        <article className="event-contact">
          <div>
            <SectionLabel>
              <L id="schedule.lead" />
            </SectionLabel>
            <h3>{spaceAppsEvent.localLead.name}</h3>
            <p>
              <L id="schedule.leadText" />
            </p>
          </div>
          <div className="event-contact-actions">
            <a
              className="outline-button contact-social"
              href={spaceAppsEvent.localLead.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${spaceAppsEvent.localLead.name} on Instagram`}
            >
              <InstagramLogoIcon size={20} aria-hidden="true" />
            </a>
            <a
              className="outline-button contact-social"
              href={spaceAppsEvent.localLead.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${spaceAppsEvent.localLead.name} on LinkedIn`}
            >
              <LinkedinLogoIcon size={20} aria-hidden="true" />
            </a>
            <a
              className="outline-button contact-email"
              href={`mailto:${spaceAppsEvent.localLead.email}`}
              aria-label={`Email ${spaceAppsEvent.localLead.name}: ${spaceAppsEvent.localLead.email}`}
              title={spaceAppsEvent.localLead.email}
            >
              <EnvelopeIcon
                className="contact-email-icon"
                size={20}
                aria-hidden="true"
              />
              <span className="button-label">
                {spaceAppsEvent.localLead.email}
              </span>
              <ArrowUpRight
                className="contact-email-arrow"
                size={17}
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
      </section>
      <section className="content-section">
        <h2>
          <L id="events.journey.title" />
        </h2>
        <div className="numbered-list">
          {journeySteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>
                  <L id={title} />
                </h3>
                <p>
                  <L id={text} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CommunityBand />
    </main>
  );
}
