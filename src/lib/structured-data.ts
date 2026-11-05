import { spaceAppsEvent } from "@/content/event";
import { faqAnswerText, type FaqEntry } from "@/content/faq";
import { defaultSocialImage } from "@/content/metadata";
import { partnerRoles } from "@/content/partners";
import { site } from "@/content/site";
import { isComingSoon } from "@/lib/launch-mode";

// Schema.org entities share stable @ids so search engines and AI assistants can join them across pages.
const absolute = (path: string) => new URL(path, site.url).toString();

export const schemaIds = {
  organization: absolute("/#organization"),
  website: absolute("/#website"),
  event: absolute("/#event-2026"),
};

const kandyAddress = {
  "@type": "PostalAddress",
  addressLocality: "Kandy",
  addressRegion: "Central Province",
  addressCountry: "LK",
};

function partnerOrganizations(organizers: boolean) {
  return partnerRoles
    .filter((role) => Boolean(role.organizer) === organizers)
    .flatMap((role) => role.logos.map((logo) => ({ "@type": "Organization", name: role.caption ?? logo.alt })));
}

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": schemaIds.organization,
  name: site.name,
  alternateName: ["NASA Space Apps Challenge Kandy", "Space Apps Kandy"],
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: absolute("/android-chrome-512x512.png"),
    width: 512,
    height: 512,
  },
  image: defaultSocialImage.url,
  description: "The Kandy, Sri Lanka local organising team of the NASA International Space Apps Challenge.",
  email: site.email,
  address: kandyAddress,
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  sameAs: [site.instagramUrl, site.tiktokUrl, site.linkedinUrl, spaceAppsEvent.kandyUrl],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "general enquiries", email: site.email },
    { "@type": "ContactPoint", contactType: "sponsorships", email: site.sponsorshipEmail },
    { "@type": "ContactPoint", contactType: "partnerships", email: site.partnershipsEmail },
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": schemaIds.website,
  name: site.name,
  alternateName: "NASA Space Apps Challenge Kandy",
  url: site.url,
  inLanguage: "en",
  publisher: { "@id": schemaIds.organization },
};

export const hackathonEventJsonLd = {
  "@type": "Event",
  "@id": schemaIds.event,
  name: `NASA Space Apps Challenge Kandy ${spaceAppsEvent.year}`,
  alternateName: `NASA Space Apps Kandy ${spaceAppsEvent.year}`,
  description: `The Kandy, Sri Lanka local event of the NASA International Space Apps Challenge ${spaceAppsEvent.year}. A free 48-hour hackathon on ${spaceAppsEvent.dates} at ${spaceAppsEvent.venue}, where teams build with NASA open data, in person or online. Theme: ${spaceAppsEvent.theme}.`,
  url: absolute(isComingSoon ? "/" : "/event-details"),
  sameAs: spaceAppsEvent.kandyUrl,
  image: [defaultSocialImage.url],
  startDate: spaceAppsEvent.startsAt,
  endDate: spaceAppsEvent.endsAt,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: spaceAppsEvent.venue,
      address: kandyAddress,
      hasMap: spaceAppsEvent.venueMapUrl,
    },
    { "@type": "VirtualLocation", url: spaceAppsEvent.kandyUrl },
  ],
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    name: "Participant registration",
    price: 0,
    priceCurrency: "LKR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-08-26T08:00:00+05:30",
    url: spaceAppsEvent.kandyUrl,
  },
  organizer: [{ "@id": schemaIds.organization }, ...partnerOrganizations(true)],
  contributor: partnerOrganizations(false),
  inLanguage: "en",
  keywords: ["NASA Space Apps", "NASA Space Apps Sri Lanka", "hackathon", "Kandy", "Sri Lanka", "NASA open data", spaceAppsEvent.theme],
  superEvent: {
    "@type": "Event",
    name: `NASA International Space Apps Challenge ${spaceAppsEvent.year}`,
    url: spaceAppsEvent.source,
  },
};

export function faqJsonLd(entries: FaqEntry[]) {
  return {
    "@type": "FAQPage",
    "@id": absolute("/event-details#faq"),
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(entry.answer) },
    })),
  };
}

type WebPageType = "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";

/** Describes a page and its place in the site, so results can show a breadcrumb trail. */
export function webPageJsonLd({
  title: name,
  description,
  path,
  type = "WebPage",
  about,
}: {
  title: string;
  description: string;
  path: `/${string}`;
  type?: WebPageType;
  about?: string;
}) {
  const url = absolute(path);
  return [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en",
      isPartOf: { "@id": schemaIds.website },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(about ? { about: { "@id": about } } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];
}

/** Wraps entities in one graph; `<` is escaped so the payload cannot close the script tag. */
export function serializeJsonLd(data: object | object[]) {
  const graph = Array.isArray(data) ? data : [data];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
