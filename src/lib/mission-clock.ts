import { spaceAppsEvent } from "../content/event";

export function getMissionClock(now: number) {
  const start = Date.parse(spaceAppsEvent.startsAt);
  const end = Date.parse(spaceAppsEvent.endsAt);
  const status = now >= end ? "complete" : now >= start ? "live" : "countdown";
  const remaining = Math.max(0, Math.floor((start - now) / 1000));
  return {
    status,
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  };
}

// Same equirectangular projection used by public/images/world-dots.svg.
export function projectLocation(coordinates: readonly number[]) {
  return {
    x: Number(((coordinates[0] + 180) * (1200 / 360)).toFixed(2)),
    y: Number((300 - coordinates[1] * (1200 / 360)).toFixed(2)),
  };
}
