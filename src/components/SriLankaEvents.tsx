import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { SectionLabel } from "./Elements";
import { spaceAppsEvent } from "@/content/event";
import { localEventsDirectoryUrl, sriLankaLocalEvents } from "@/content/sri-lanka";

const attendanceLabel = (attendance: string) => (attendance.includes("In-Person") ? "In person + virtual" : attendance);

const kandyFirst = [...sriLankaLocalEvents].sort((a, b) => Number(b.name === "Kandy") - Number(a.name === "Kandy"));

// Places the Kandy event among the official Sri Lankan local events, from the synced global directory.
export function SriLankaEvents() {
  return (
    <section className="sri-lanka-section" aria-labelledby="sri-lanka-title">
      <div className="section-heading">
        <div>
          <SectionLabel>SRI LANKA / {spaceAppsEvent.year}</SectionLabel>
          <h2 id="sri-lanka-title">NASA Space Apps in Sri Lanka.</h2>
        </div>
        <p>
          Sri Lanka hosts {sriLankaLocalEvents.length} official NASA Space Apps Challenge {spaceAppsEvent.year} local events.
          NASA Space Apps Kandy brings the challenge to Kandy, in person at {spaceAppsEvent.venue} and online.
        </p>
      </div>
      <ul className="sri-lanka-events">
        {kandyFirst.map((event) => {
          const isKandy = event.name === "Kandy";
          return (
            <li key={event.name} className={isKandy ? "is-kandy" : undefined}>
              <MapPinIcon size={20} weight={isKandy ? "fill" : "regular"} aria-hidden="true" />
              <div>
                <strong>{isKandy ? "NASA Space Apps Kandy" : event.name}</strong>
                <span>{isKandy ? `${spaceAppsEvent.dates} · ${spaceAppsEvent.venue}` : attendanceLabel(event.attendance)}</span>
              </div>
              {isKandy ? (
                <Link className="text-link" href="/event-details"><span className="sri-lanka-link-label">Event details</span> <ArrowUpRightIcon size={16} aria-hidden="true" /></Link>
              ) : (
                <a className="text-link" href={event.url} target="_blank" rel="noopener noreferrer" aria-label={`${event.name} official event page`}>
                  <span className="sri-lanka-link-label">Official page</span> <ArrowUpRightIcon size={16} aria-hidden="true" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <p className="sri-lanka-source">
        Source: the official{" "}
        <a href={localEventsDirectoryUrl} target="_blank" rel="noopener noreferrer">NASA Space Apps Challenge local events directory</a>.
      </p>
    </section>
  );
}
