import { CalendarDotsIcon } from "@phosphor-icons/react/dist/ssr/CalendarDots";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { ActionLink, SectionLabel } from "./Elements";
import { LocalizedText as L } from "./LocalizedText";

export function HomeEventDetails() {
  return (
    <section className="home-event" aria-labelledby="home-event-title">
      <div className="home-event-heading">
        <div>
          <SectionLabel>
            <L id="home.event.label" />
          </SectionLabel>
          <h2 id="home-event-title">
            <L id="home.event.title" />
          </h2>
        </div>
        <ActionLink href="/event-details" outline>
          <L id="nav.events" />
        </ActionLink>
      </div>
      <dl className="home-event-grid">
        <div>
          <CalendarDotsIcon size={25} aria-hidden="true" />
          <dt>
            <L id="home.event.date" />
          </dt>
          <dd>
            <L id="events.card.date.title" />
          </dd>
        </div>
        <div>
          <ClockIcon size={25} aria-hidden="true" />
          <dt>
            <L id="home.event.time" />
          </dt>
          <dd>
            <L id="schedule.arrivalTime" />
            <small>
              <L id="schedule.arrivalNote" />
            </small>
          </dd>
        </div>
        <div>
          <MapPinIcon size={25} aria-hidden="true" />
          <dt>
            <L id="events.card.venue.title" />
          </dt>
          <dd>
            <L id="home.event.location" />
            <small>
              <L id="home.event.venueNote" />
            </small>
          </dd>
        </div>
      </dl>
      <p className="home-event-note">
        <L id="home.event.mode" />
      </p>
    </section>
  );
}
