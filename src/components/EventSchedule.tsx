import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { SectionLabel } from "./Elements";
import { LocalizedText as L } from "./LocalizedText";
import { kandySchedule, spaceAppsEvent } from "@/content/event";

export function EventSchedule() {
  return (
    <section className="content-section event-schedule" id="schedule">
      <SectionLabel>
        <L id="schedule.label" />
      </SectionLabel>
      <h2>
        <L id="schedule.title" />
      </h2>
      <p className="schedule-note">
        <L id="schedule.note" />
      </p>
      <div className="schedule-groups">
        {kandySchedule.map((group, index) => (
          <div
            className={`schedule-group${index === 0 ? " schedule-preflight" : ""}`}
            key={group.label}
          >
            <header className="schedule-day-heading">
              <h3>
                <L id={group.label} />
              </h3>
            </header>
            <ol>
              {group.entries.map((entry) => (
                <li key={entry.dateTime}>
                  <time dateTime={entry.dateTime}>{entry.displayTime}</time>
                  <div>
                    <h4>
                      <L id={entry.title} />
                    </h4>
                    {"detail" in entry ? (
                      <p>
                        <L id={entry.detail} />
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <a
        className="text-link"
        href={spaceAppsEvent.kandyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <L id="events.officialLink" />
        <ArrowUpRightIcon size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
