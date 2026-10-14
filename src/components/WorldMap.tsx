import Link from "next/link";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CrosshairIcon as Crosshair } from "@phosphor-icons/react/dist/ssr/Crosshair";
import { GlobeHemisphereEastIcon as Globe2 } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import directory from "@/content/space-apps-locations.json";
import { projectLocation } from "@/lib/mission-clock";
import { InteractiveMap } from "./InteractiveMap";
import { LocalizedText as L } from "./LocalizedText";

const kandy = directory.events.find((event) => event.url.endsWith("/kandy/"))!;
const home = projectLocation(kandy.coordinates!);
const mapped = directory.events.filter((event) => event.coordinates);
const countries = new Set(mapped.map((event) => event.country)).size;
const updated = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(directory.updatedAt));

export function WorldMap() {
  return (
    <div className="world-network">
      <div className="network-heading">
        <span className="network-global-key">
          <Globe2 size={15} aria-hidden="true" />
          <span className="network-stat">{mapped.length} <L id="world.locations" /></span>
          <i className="network-stat-divider" aria-hidden="true">/</i>
          <span className="network-stat network-stat-countries">{countries} <L id="world.countries" /></span>
        </span>
        <span className="network-home-key">
          <MapPinIcon size={18} weight="fill" aria-hidden="true" /> <span className="network-home-label"><L id="world.homeKey" /></span>
        </span>
      </div>
      <InteractiveMap>
        <svg
          className="world-map-image"
          viewBox="0 0 1200 600"
          role="img"
          aria-labelledby="network-map-title network-map-description"
        >
          <title id="network-map-title">
            NASA Space Apps 2026 global event locations
          </title>
          <desc id="network-map-description">
            All {mapped.length} locations with coordinates from the official
            directory. Kandy, Sri Lanka is highlighted with red rings as our home base.
            Other locations show the worldwide scale of NASA Space Apps.
          </desc>
          <image
            href="/images/world-dots.svg"
            width="1200"
            height="600"
            opacity="0.55"
          />
          <path className="map-equator" d="M0 300H1200" />
          <g
            className="network-location-points"
            clipPath="url(/images/world-land-mask.svg#world-land)"
          >
            {mapped.map((event) => {
              const p = projectLocation(event.coordinates!);
              return (
                <circle
                  key={event.id}
                  cx={p.x}
                  cy={p.y}
                  r="2.6"
                  className="network-point"
                  data-event-name={event.name}
                  data-country={event.country}
                >
                  <title>{`${event.name}, ${event.country}`}</title>
                </circle>
              );
            })}
          </g>
          <g className="network-kandy">
            <circle className="kandy-orbit" cx={home.x} cy={home.y} r="24" />
            <circle className="kandy-ring" cx={home.x} cy={home.y} r="12" />
            <circle
              className="kandy-core"
              cx={home.x}
              cy={home.y}
              r="5"
              data-event-name="Kandy"
              data-country="Sri Lanka"
            />
            <path d={`M${home.x + 10} ${home.y + 10} l30 38 h128`} />
            <text x={home.x + 46} y={home.y + 40}>
              KANDY, SRI LANKA
            </text>
            <text
              className="kandy-map-subtitle"
              x={home.x + 46}
              y={home.y + 65}
            >
              07.2906° N / 080.6337° E
            </text>
          </g>
        </svg>
        <span className="map-coordinate-label"><L id="world.mapLabel" /></span>
      </InteractiveMap>
      <div className="network-kandy-summary">
        <div className="network-event">
          <Crosshair size={24} aria-hidden="true" />
          <div>
            <span className="technical-label">
              <L id="world.localEvent" />
            </span>
            <strong>
              <L id="world.kandy" />
            </strong>
            <span>
              <L id="world.dateMode" />
            </span>
          </div>
        </div>
        <p>
          <L id="world.summary.first" />
          <br />
          <L id="world.summary.second" />
        </p>
        <Link className="white-button" href="/register">
          <span className="button-label">
            <L id="world.cta" />
          </span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="network-source">
        <span>
          {directory.totalCount} <L id="world.source.events" /> · <L id="world.source.updated" /> {updated}
        </span>
        <a href={directory.source} target="_blank" rel="noopener noreferrer">
          <L id="world.source.cta" /> <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
