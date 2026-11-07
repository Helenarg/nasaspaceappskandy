import Link from "next/link";
import { LocalLeadContacts } from "@/components/LocalLeadContacts";
import type { Metadata } from "next";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CalendarDotsIcon as CalendarDays } from "@phosphor-icons/react/dist/ssr/CalendarDots";
import { MapPinIcon as MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { UsersThreeIcon as Users } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { PageIntro, CommunityBand, SectionLabel } from "@/components/Elements";
import { spaceAppsEvent } from "@/content/event";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { sitePage } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { hackathonEventJsonLd, schemaIds, webPageJsonLd } from "@/lib/structured-data";
import { EventSchedule } from "@/components/EventSchedule";
import { EventFaq } from "@/components/EventFaq";
import { bootcampCities, bootcampDetails, bootcampWebinar, bootcampWindow } from "@/content/bootcamps";

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

const page = sitePage("/event-details");

export const metadata: Metadata = createPageMetadata(page);

export default function Events() {
  return (
    <main id="main">
      <JsonLd data={[...webPageJsonLd({ ...page, about: schemaIds.event }), hackathonEventJsonLd]} />
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
        <Link className="text-link" href="/how-to-register">
          <L id="events.registrationGuide" />
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <div className="venue-map">
          <div>
            <span className="technical-label">MAIN HACKATHON VENUE</span>
            <h3 className="venue-highlight">
              <MapPin size={24} weight="fill" aria-hidden="true" />
              {spaceAppsEvent.venue}
            </h3>
            <p>Host university and venue partner for the main hackathon.</p>
          </div>
          <a className="outline-button" href={spaceAppsEvent.venueMapUrl} target="_blank" rel="noopener noreferrer">
            <span className="button-label">Open in Google Maps</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="content-section bootcamp-section" id="bootcamps" aria-labelledby="bootcamp-title">
        <div className="section-heading">
          <div>
            <SectionLabel>BOOTCAMP SERIES</SectionLabel>
            <h2 id="bootcamp-title">Get ready, together.</h2>
          </div>
          <p>Free, half-day bootcamps in Colombo and Kandy run in the {bootcampWindow.charAt(0).toLowerCase() + bootcampWindow.slice(1)}, plus an island-wide webinar. Each ends in a live mini-hack. Registration for the Kandy bootcamp is open now.</p>
        </div>
        <div className="bootcamp-grid">
          {bootcampCities.map((city, index) => (
            <article className="bootcamp-card" key={city}>
              <span className="technical-label">0{index + 1} / BOOTCAMP</span>
              <h3>{city}</h3>
              {bootcampDetails[city].venue ? (
                <address className="venue-highlight bootcamp-venue">
                  <MapPin size={18} weight="fill" aria-hidden="true" />
                  {bootcampDetails[city].venue}
                </address>
              ) : (
                <p>Venue and registration details to follow.</p>
              )}
              {bootcampDetails[city].registrationUrl ? (
                <a className="text-link" href={bootcampDetails[city].registrationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Register for the ${city} bootcamp`}>Register now <ArrowUpRight size={17} aria-hidden="true" /></a>
              ) : null}
            </article>
          ))}
          <article className="bootcamp-card">
            <span className="technical-label">0{bootcampCities.length + 1} / WEBINAR</span>
            <h3>{bootcampWebinar.title}</h3>
            <p>{bootcampWebinar.description}</p>
          </article>
        </div>
      </section>
      <EventSchedule />
      <section className="content-section after-event-section" aria-labelledby="after-event-title">
        <SectionLabel>AFTER THE HACKATHON</SectionLabel>
        <h2 id="after-event-title">Judging, then prize giving.</h2>
        <div className="after-event-grid">
          <article><span className="technical-label">16-22 NOVEMBER 2026</span><h3>Local judging</h3><p>Kandy judges review submitted projects and select the local Global Nominees.</p></article>
          <article><span className="technical-label">DATE TO BE ANNOUNCED</span><h3>Prize Giving Ceremony</h3><p>We will celebrate the teams and announce Kandy&apos;s Global Nominees. Ceremony details will follow.</p></article>
        </div>
      </section>
      <section className="content-section">
        <h2>
          <L id="schedule.practical" />
        </h2>
        <div className="conduct-grid event-practical-grid">
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
          <LocalLeadContacts />
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
      <EventFaq />
      <CommunityBand />
    </main>
  );
}
