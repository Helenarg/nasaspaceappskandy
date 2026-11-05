// Search titles and descriptions for every page. Page metadata, structured data and the
// AI-readable summaries all read from here. Keep descriptions within 160 characters.
export const sitePages = {
  "/": {
    title: "NASA Space Apps Challenge Kandy 2026 | Hackathon in Sri Lanka",
    description: "NASA Space Apps Challenge Kandy 2026 is a free 48-hour hackathon on November 14-15 at SLIIT Kandy UNI, Sri Lanka. Build with NASA open data in person or online.",
  },
  "/event-details": {
    title: "2026 dates, venue & schedule",
    description: "NASA Space Apps Kandy 2026 runs November 14-15 at SLIIT Kandy UNI. See the schedule, the Kandy bootcamp, FAQs and how to join in person or online.",
  },
  "/register": {
    title: "How to register",
    description: "Register free for NASA Space Apps Kandy 2026 on the official NASA Space Apps Challenge website. Steps, participant conduct and under-18 consent guidance.",
  },
  "/challenges": {
    title: "NASA Space Apps 2026 challenges",
    description: "Explore the official NASA Space Apps Challenge 2026 briefs and find a problem your Kandy team wants to solve with NASA open data.",
  },
  "/news": {
    title: "News & updates",
    description: "Follow official NASA Space Apps Challenge news and updates relevant to the Kandy community and the 2026 challenge.",
  },
  "/sponsors-and-partners": {
    title: "Sponsors & partners",
    description: "Meet the partners of NASA Space Apps Kandy 2026 and explore sponsorship packages from LKR 25,000 to LKR 750,000 to reach Sri Lanka's STEM talent.",
  },
  "/about": {
    title: "About the Kandy community",
    description: "Meet the NASA Space Apps Kandy community in Sri Lanka and see how people across disciplines build with NASA open data, science and creativity.",
  },
  "/join": {
    title: "Volunteer or mentor",
    description: "Volunteer or mentor at NASA Space Apps Kandy 2026 and help local teams in Sri Lanka turn ideas into meaningful projects.",
  },
  "/ambassadors": {
    title: "Campus ambassadors",
    description: "Become a NASA Space Apps Kandy campus ambassador and connect students in Sri Lanka with the local space and open-data community.",
  },
  "/awards": {
    title: "Awards & recognition",
    description: "Discover NASA Space Apps Challenge awards and how outstanding ideas, storytelling, science and community impact from Kandy are recognised.",
  },
  "/contact": {
    title: "Contact the Kandy team",
    description: "Contact the NASA Space Apps Kandy organising team at info@nasaspaceapps.lk about participation, partnerships, media or event questions.",
  },
  "/privacy": {
    title: "Privacy policy",
    description: "Learn what information NASA Space Apps Kandy collects, why it is used, where it is stored, and how to manage your privacy choices.",
  },
  "/terms": {
    title: "Terms of use",
    description: "Read the terms that apply when using the NASA Space Apps Kandy website and local event services.",
  },
} as const;

export type SitePath = keyof typeof sitePages;

/** Routes still public while the site runs in coming-soon mode; next.config.ts redirects the rest. */
export const comingSoonPaths: SitePath[] = ["/", "/privacy", "/terms"];

export function sitePage<P extends SitePath>(path: P) {
  return { ...sitePages[path], path };
}
