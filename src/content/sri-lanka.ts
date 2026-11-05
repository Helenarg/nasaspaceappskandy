import directory from "./space-apps-locations.json";

// Official NASA Space Apps local events in Sri Lanka, from the synced global directory (npm run locations:sync).
export const sriLankaLocalEvents = directory.events
  .filter((event) => event.country === "Sri Lanka")
  .map(({ name, url, attendance }) => ({ name, url, attendance }));

export const localEventsDirectoryUrl = directory.source;

/** "Anuradhapura, Batticaloa, Colombo, Jaffna and Kandy" */
export const sriLankaEventNames = new Intl.ListFormat("en", { type: "conjunction" })
  .format(sriLankaLocalEvents.map((event) => event.name))
  .replace(/, and /, " and ");
