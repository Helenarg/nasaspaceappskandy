/** Verified global calendar dates; local venue and kickoff are not confirmed. */
export const SPACE_APPS_EVENT = {
  officialUrl: 'https://www.spaceappschallenge.org/2026/',
  challengesUrl: 'https://www.spaceappschallenge.org/2026/challenges/',
  dateLabel: 'November 14–15, 2026',
  start: '2026-11-14T00:00:00+05:30',
  end: '2026-11-16T00:00:00+05:30',
  localVenue: 'Venue to be announced',
  localSchedule: 'Local schedule to be announced',
} as const;

export function getEventCountdown(now = Date.now()) {
  const start = Date.parse(SPACE_APPS_EVENT.start);
  const end = Date.parse(SPACE_APPS_EVENT.end);
  const status = now < start ? 'upcoming' : now < end ? 'live' : 'ended';
  const remaining = Math.max(0, Math.floor((start - now) / 1000));
  return { status, days: Math.floor(remaining / 86400), hours: Math.floor(remaining / 3600) % 24,
    minutes: Math.floor(remaining / 60) % 60, seconds: remaining % 60 };
}
