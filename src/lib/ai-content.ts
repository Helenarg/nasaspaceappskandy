import { bootcampCities, bootcampDetails, bootcampWebinar, bootcampWindow } from "@/content/bootcamps";
import { kandySchedule, spaceAppsEvent } from "@/content/event";
import { eventFaq, faqAnswerMarkdown } from "@/content/faq";
import { comingSoonPaths, sitePages, type SitePath } from "@/content/pages";
import { partnerRoles } from "@/content/partners";
import { site } from "@/content/site";
import { sponsorshipTiers } from "@/content/sponsorship";
import { localEventsDirectoryUrl, sriLankaEventNames, sriLankaLocalEvents } from "@/content/sri-lanka";
import { DICTIONARIES, type StringKey } from "@/i18n/strings";
import { isComingSoon } from "@/lib/launch-mode";

// Builds llms.txt, llms-full.txt and index.md from the same content modules as the pages,
// so answer engines read the current facts and only links that resolve in the current launch mode.
const absolute = (path: string) => new URL(path, site.url).toString();
const en = (key: StringKey) => DICTIONARIES.en[key] ?? key;
const link = (text: string, href: string) => `[${text}](${href})`;

const visiblePath = (path: SitePath) => !isComingSoon || comingSoonPaths.includes(path);
const registrationUrl = isComingSoon ? spaceAppsEvent.kandyUrl : absolute("/register");
const kandyBootcampUrl = absolute(bootcampDetails.Kandy.registrationUrl ?? "/");

const summary = `NASA Space Apps Kandy is the Kandy, Sri Lanka local event of the NASA International Space Apps Challenge. The ${spaceAppsEvent.year} hackathon runs on ${spaceAppsEvent.dates} at ${spaceAppsEvent.venue}, in person and online. Participation is free; register on the official NASA Space Apps Challenge Kandy event page.`;

function keyFacts() {
  return [
    `- **Event:** NASA Space Apps Challenge Kandy ${spaceAppsEvent.year}, the Kandy local event of the ${link(`NASA International Space Apps Challenge ${spaceAppsEvent.year}`, spaceAppsEvent.source)}`,
    `- **Theme:** ${spaceAppsEvent.theme}`,
    `- **Dates:** ${spaceAppsEvent.dates} (Sri Lanka time, ${spaceAppsEvent.timeZone})`,
    `- **Venue:** ${spaceAppsEvent.venue} (${link("Google Maps", spaceAppsEvent.venueMapUrl)})`,
    `- **Format:** ${spaceAppsEvent.attendance}`,
    "- **Cost:** Free",
    `- **Registration:** ${link("Official Kandy event page", spaceAppsEvent.kandyUrl)}`,
    `- **Kandy bootcamp:** ${bootcampDetails.Kandy.venue}. ${link("Register for the Kandy bootcamp", kandyBootcampUrl)}`,
    `- **NASA Space Apps in Sri Lanka:** ${sriLankaLocalEvents.length} official ${spaceAppsEvent.year} local events: ${sriLankaEventNames} (${link("official directory", localEventsDirectoryUrl)})`,
    `- **Contact:** ${link(site.email, `mailto:${site.email}`)}`,
  ].join("\n");
}

function pageLink(path: SitePath) {
  const page = sitePages[path];
  const title = path === "/" ? site.name : page.title;
  return `- ${link(title, absolute(path))}: ${page.description}`;
}

const pageLinks = (paths: SitePath[]) => paths.filter(visiblePath).map(pageLink);

export function llmsTxt() {
  const eventPages = pageLinks(["/", "/event-details", "/register", "/challenges", "/news"]);
  const involvement = pageLinks(["/sponsors-and-partners", "/join", "/ambassadors", "/contact"]);
  const optional = pageLinks(["/about", "/awards", "/privacy", "/terms"]);

  return [
    `# ${site.name}`,
    "",
    `> ${summary}`,
    "",
    keyFacts(),
    "",
    "## Event",
    "",
    ...eventPages,
    `- ${link("Official Kandy event and registration", spaceAppsEvent.kandyUrl)}: Official NASA Space Apps Challenge listing for the Kandy local event.`,
    "",
    ...(involvement.length ? ["## Get involved", "", ...involvement, ""] : []),
    "## AI-readable summaries",
    "",
    `- ${link("Full event facts", absolute("/llms-full.txt"))}: Schedule, bootcamps, FAQs, partners, sponsorship packages and contacts in one Markdown file.`,
    `- ${link("Event overview", absolute("/index.md"))}: Key facts and answers to common questions.`,
    "",
    "## Optional",
    "",
    ...optional,
    `- ${link(`NASA Space Apps Challenge ${spaceAppsEvent.year}`, spaceAppsEvent.source)}: Global event information from the official organiser.`,
    "",
  ].join("\n");
}

function faqMarkdown() {
  return eventFaq.flatMap((entry) => [`### ${entry.question}`, "", faqAnswerMarkdown(entry.answer), ""]);
}

function scheduleMarkdown() {
  return kandySchedule.flatMap((day) => [
    `### ${en(day.label)}`,
    "",
    ...day.entries.map((entry) => {
      const detail = "detail" in entry ? ` ${en(entry.detail)}` : "";
      return `- **${entry.displayTime}:** ${en(entry.title)}.${detail}`;
    }),
    "",
  ]);
}

function bootcampMarkdown() {
  return [
    `Free, half-day bootcamps run in Colombo and Kandy in the ${bootcampWindow.charAt(0).toLowerCase() + bootcampWindow.slice(1)}. Each ends in a live mini-hack.`,
    "",
    ...bootcampCities.map((city) => {
      const details = bootcampDetails[city];
      const venue = details.venue ? `${details.venue}.` : "Venue and registration details to follow.";
      const registration = details.registrationUrl ? ` ${link("Register", absolute(details.registrationUrl))}.` : "";
      return `- **${city}:** ${venue}${registration}`;
    }),
    `- **${bootcampWebinar.title}:** ${bootcampWebinar.description}`,
    "",
  ];
}

function partnersMarkdown() {
  return [
    ...partnerRoles.map((role) => `- **${role.title.replace("‑", "-")}:** ${role.logos.map((logo) => role.caption ?? logo.alt).join("; ")}`),
    "",
  ];
}

function sponsorshipMarkdown() {
  return [
    `Sponsorship packages for NASA Space Apps Kandy ${spaceAppsEvent.year}, in Sri Lankan rupees (LKR). Enquiries: ${link(site.sponsorshipEmail, `mailto:${site.sponsorshipEmail}`)}.`,
    "",
    ...sponsorshipTiers.map((tier) => `- **${tier.name} (LKR ${tier.amount}):** ${tier.summary} Includes: ${tier.benefits.join("; ")}.`),
    "",
    ...(visiblePath("/sponsors-and-partners") ? [`Full package details: ${link("Sponsors & partners", absolute("/sponsors-and-partners"))}.`, ""] : []),
  ];
}

function sourcesMarkdown() {
  return [
    `- ${link("NASA Space Apps Challenge Kandy local event", spaceAppsEvent.kandyUrl)}`,
    `- ${link(`NASA Space Apps Challenge ${spaceAppsEvent.year}`, spaceAppsEvent.source)}`,
    `- ${link("NASA Space Apps Kandy website", site.url)}`,
  ];
}

export function llmsFullTxt() {
  return [
    `# ${site.name} ${spaceAppsEvent.year}: full event facts`,
    "",
    `> ${summary}`,
    "",
    "## Key facts",
    "",
    keyFacts(),
    "",
    "## How to register",
    "",
    `Registration is free and opened on 26 August 2026. Register on the ${link("official NASA Space Apps Challenge Kandy event page", spaceAppsEvent.kandyUrl)}, then create or join a team in the Teams tab.${isComingSoon ? "" : ` The ${link("local registration guide", registrationUrl)} explains each step.`}`,
    "",
    "## Schedule",
    "",
    "All times are Sri Lanka time.",
    "",
    ...scheduleMarkdown(),
    "## NASA Space Apps in Sri Lanka",
    "",
    `Sri Lanka hosts ${sriLankaLocalEvents.length} official NASA Space Apps Challenge ${spaceAppsEvent.year} local events. NASA Space Apps Kandy is the Kandy event, in person at ${spaceAppsEvent.venue} and online.`,
    "",
    ...sriLankaLocalEvents.map((event) => `- ${link(event.name, event.url)}: ${event.attendance}`),
    "",
    "## Bootcamps",
    "",
    ...bootcampMarkdown(),
    "## Frequently asked questions",
    "",
    ...faqMarkdown(),
    "## Partners",
    "",
    ...partnersMarkdown(),
    "## Sponsorship",
    "",
    ...sponsorshipMarkdown(),
    "## Contact",
    "",
    `- **General enquiries:** ${link(site.email, `mailto:${site.email}`)}`,
    `- **Sponsorships:** ${link(site.sponsorshipEmail, `mailto:${site.sponsorshipEmail}`)}`,
    `- **Partnerships and media:** ${link(site.partnershipsEmail, `mailto:${site.partnershipsEmail}`)}`,
    `- **Local lead:** ${spaceAppsEvent.localLead.name}`,
    `- **Social:** ${link("Instagram", site.instagramUrl)}, ${link("TikTok", site.tiktokUrl)}, ${link("LinkedIn", site.linkedinUrl)}`,
    "",
    "## Sources",
    "",
    ...sourcesMarkdown(),
    "",
  ].join("\n");
}

export function indexMarkdown() {
  return [
    `# NASA Space Apps Kandy ${spaceAppsEvent.year}`,
    "",
    summary,
    "",
    "## Event facts",
    "",
    keyFacts(),
    "",
    "## Common questions",
    "",
    ...faqMarkdown(),
    "## Sources",
    "",
    ...sourcesMarkdown(),
    "",
  ].join("\n");
}
