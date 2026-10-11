import { writeFile } from "node:fs/promises";

const endpoint = "https://api.spaceappschallenge.org/graphql";
const source = "https://www.spaceappschallenge.org/2026/local-events/";
const query = `query MapLocations($first: Int!, $after: String, $filtering: [Filter!]) {
  openLocations(first: $first, after: $after, filtering: $filtering) {
    totalCount
    edges { node { geometry { coordinates } properties {
      id displayName country meta { htmlUrl } isHostEvent eventType
    } } }
    pageInfo { endCursor hasNextPage }
  }
}`;
const locations = new Map();
let after = null;
let totalCount = 0;
do {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: {
        first: 500,
        after,
        filtering: [{ field: "event", value: "aWQ6NA==", compare: "id" }],
      },
    }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok)
    throw new Error(`Directory request failed: ${response.status}`);
  const result = await response.json();
  if (result.errors) throw new Error(JSON.stringify(result.errors));
  const page = result.data.openLocations;
  totalCount = page.totalCount;
  for (const { node } of page.edges) {
    const p = node.properties;
    const url = new URL(p.meta.htmlUrl, source);
    if (
      url.hostname !== "www.spaceappschallenge.org" ||
      !url.pathname.startsWith("/2026/local-events/")
    ) {
      throw new Error(`Unexpected event URL: ${url}`);
    }
    const coords = node.geometry?.coordinates;
    const valid =
      Array.isArray(coords) &&
      coords.length >= 2 &&
      Number.isFinite(coords[0]) &&
      Number.isFinite(coords[1]) &&
      Math.abs(coords[0]) <= 180 &&
      Math.abs(coords[1]) <= 90;
    locations.set(p.id, {
      id: p.id,
      name: p.displayName,
      country: p.country,
      url: url.href,
      coordinates: valid && !p.isHostEvent ? coords.slice(0, 2) : null,
      attendance: p.eventType,
    });
  }
  const next = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  if (next && next === after)
    throw new Error("Directory pagination did not advance");
  after = next;
} while (after);
if (locations.size !== totalCount)
  throw new Error(`Incomplete directory: ${locations.size}/${totalCount}`);
const events = [...locations.values()].sort((a, b) =>
  a.name.localeCompare(b.name),
);
if (!events.some((e) => e.url.endsWith("/kandy/") && e.coordinates))
  throw new Error("Kandy coordinates missing");
await writeFile(
  new URL("../src/content/space-apps-locations.json", import.meta.url),
  JSON.stringify(
    {
      year: 2026,
      source,
      updatedAt: new Date().toISOString(),
      totalCount,
      events,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Saved ${events.length} official events; ${events.filter((e) => e.coordinates).length} mapped locations.`,
);
console.log(JSON.stringify(events.find((e) => e.url.endsWith("/kandy/"))));
