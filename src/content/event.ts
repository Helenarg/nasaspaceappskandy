export const spaceAppsEvent = {
  year: 2026,
  theme: "The Next Frontier",
  dates: "November 14-15, 2026",
  startsAt: "2026-11-14T00:00:00+05:30",
  endsAt: "2026-11-16T00:00:00+05:30",
  timeZone: "Asia/Colombo",
  source: "https://www.spaceappschallenge.org/2026/",
  kandyUrl: "https://www.spaceappschallenge.org/2026/local-events/kandy/",
  directoryUrl: "https://www.spaceappschallenge.org/2026/local-events/",
  attendance: "In person + virtual",
  venue: "Kandy venue to be announced",
  venueAddress: null as string | null,
  venueMapUrl: null as string | null,
  localLead: {
    name: "Rometh Sendinu",
    email: "info@nasaspaceapps.lk",
    instagramUrl: "https://www.instagram.com/sendinu06",
    linkedinUrl: "https://www.linkedin.com/in/rometh-samarasinghe-9289a3378",
  },
} as const;

export const kandySchedule = [
  {
    label: "schedule.pre",
    entries: [
      {
        dateTime: "2026-08-26T08:00:00+05:30",
        displayTime: "26 Aug 2026 · 08:00",
        title: "schedule.registration",
      },
      {
        dateTime: "2026-09-17T08:00:00+05:30",
        displayTime: "17 Sep 2026 · 08:00",
        title: "schedule.challenges",
      },
    ],
  },
  {
    label: "schedule.day1",
    entries: [
      {
        dateTime: "2026-11-14T08:00:00+05:30",
        displayTime: "08:00",
        title: "schedule.arrival",
      },
      {
        dateTime: "2026-11-14T08:30:00+05:30",
        displayTime: "08:30",
        title: "schedule.checkin",
      },
      {
        dateTime: "2026-11-14T10:00:00+05:30",
        displayTime: "10:00",
        title: "schedule.opening",
      },
      {
        dateTime: "2026-11-14T11:00:00+05:30",
        displayTime: "11:00",
        title: "schedule.hacking",
      },
      {
        dateTime: "2026-11-14T20:00:00+05:30",
        displayTime: "20:00",
        title: "schedule.followup",
      },
    ],
  },
  {
    label: "schedule.day2",
    entries: [
      {
        dateTime: "2026-11-15T09:00:00+05:30",
        displayTime: "09:00",
        title: "schedule.revision",
        detail: "schedule.revisionNote",
      },
      {
        dateTime: "2026-11-15T15:00:00+05:30",
        displayTime: "15:00",
        title: "schedule.followup",
      },
      {
        dateTime: "2026-11-15T23:59:00+05:30",
        displayTime: "23:59",
        title: "schedule.submission",
      },
    ],
  },
] as const;
