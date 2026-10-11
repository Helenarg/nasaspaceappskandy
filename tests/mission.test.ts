import assert from "node:assert/strict";
import test from "node:test";
import { getMissionClock, projectLocation } from "../src/lib/mission-clock";
import { spaceAppsEvent } from "../src/content/event";
import directory from "../src/content/space-apps-locations.json";

test("countdown uses Sri Lanka midnight and rolls from countdown to live to complete", () => {
  const start = Date.parse(spaceAppsEvent.startsAt);
  assert.equal(new Date(start).toISOString(), "2026-11-13T18:30:00.000Z");
  assert.deepEqual(getMissionClock(start - 90061000), {
    status: "countdown",
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
  });
  assert.equal(getMissionClock(start).status, "live");
  const finished = getMissionClock(Date.parse(spaceAppsEvent.endsAt));
  assert.equal(finished.status, "complete");
  assert.equal(
    finished.days + finished.hours + finished.minutes + finished.seconds,
    0,
  );
});

test("full official directory is retained with valid map coordinates and Kandy highlight", () => {
  assert.equal(directory.events.length, directory.totalCount);
  assert.equal(
    new Set(directory.events.map((event) => event.id)).size,
    directory.totalCount,
  );
  for (const event of directory.events) {
    assert.ok(
      event.url.startsWith(
        "https://www.spaceappschallenge.org/2026/local-events/",
      ),
    );
    if (event.coordinates) {
      const p = projectLocation(event.coordinates);
      assert.ok(p.x >= 0 && p.x <= 1200 && p.y >= 0 && p.y <= 600, event.name);
    }
  }
  const kandy = directory.events.find(
    (event) => event.url === spaceAppsEvent.kandyUrl,
  );
  assert.ok(kandy?.coordinates);
  const p = projectLocation(kandy.coordinates);
  assert.ok(p.x > 865 && p.x < 872 && p.y > 273 && p.y < 278);
  assert.ok(
    directory.events.some(
      (event) => event.name === "Universal Event" && event.coordinates === null,
    ),
  );
});
