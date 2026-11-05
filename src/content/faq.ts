import { bootcampDetails, bootcampWindow } from "./bootcamps";
import { spaceAppsEvent } from "./event";
import { site } from "./site";
import { localEventsDirectoryUrl, sriLankaEventNames, sriLankaLocalEvents } from "./sri-lanka";

// One source for the visible FAQ, its FAQPage structured data and the AI-readable summaries.
// Answers are plain text with optional links so every format reads the same words.
export type FaqLink = { text: string; href: string };
export type FaqAnswerPart = string | FaqLink;
export type FaqEntry = { question: string; answer: FaqAnswerPart[] };

const kandyBootcampVenue = bootcampDetails.Kandy.venue;

export const eventFaq: FaqEntry[] = [
  {
    question: "What is NASA Space Apps Kandy?",
    answer: [
      `NASA Space Apps Kandy is the Kandy, Sri Lanka local event of the NASA International Space Apps Challenge, a global hackathon where teams build with NASA open data. The ${spaceAppsEvent.year} theme is ${spaceAppsEvent.theme}.`,
    ],
  },
  {
    question: "Is NASA Space Apps held in Sri Lanka?",
    answer: [
      `Yes. In ${spaceAppsEvent.year}, Sri Lanka hosts ${sriLankaLocalEvents.length} official NASA Space Apps Challenge local events: ${sriLankaEventNames}. NASA Space Apps Kandy takes place in person at ${spaceAppsEvent.venue} in Kandy and online. See every local event in the `,
      { text: "official local events directory", href: localEventsDirectoryUrl },
      ".",
    ],
  },
  {
    question: "When and where will the event take place?",
    answer: [
      `Saturday 14 and Sunday 15 November 2026, at ${spaceAppsEvent.venue} (`,
      { text: "open in Google Maps", href: spaceAppsEvent.venueMapUrl },
      "). Virtual participants join online.",
    ],
  },
  {
    question: "How do I register?",
    answer: [
      "Registration is free. Register on the ",
      { text: "official NASA Space Apps Challenge Kandy event page", href: spaceAppsEvent.kandyUrl },
      ". Registration opened on 26 August 2026.",
    ],
  },
  {
    question: "Can I take part online?",
    answer: ["Yes. The Kandy event supports both in-person and virtual participation. Virtual participants join online."],
  },
  {
    question: "Do I need to be an expert on space?",
    answer: ["No. You do not need space knowledge or coding experience. Challenges need coders, designers, researchers, storytellers, artists and business thinkers. Bring your curiosity and we will help with the rest."],
  },
  {
    question: "Can I join alone, or do I need a team?",
    answer: [
      "Both work. ",
      { text: "Register for the Kandy local event", href: spaceAppsEvent.kandyUrl },
      ", then create or join a team in the Teams tab. Coming alone? ",
      { text: "Ask our team", href: `mailto:${site.email}?subject=Help%20finding%20a%20Space%20Apps%20team` },
      " to help you meet collaborators.",
    ],
  },
  {
    question: "Who should participate?",
    answer: ["Everyone is welcome, including first-time hackers, school and university students, and working professionals. Some challenges are technical; others need art, design, storytelling or business skills. Bring your enthusiasm and learn with your team."],
  },
  {
    question: "Does it cost anything to participate?",
    answer: ["No. Participation is 100% free."],
  },
  {
    question: "Will meals be provided?",
    answer: ["Yes. Meals, snacks and beverages will be provided for in-person participants during the hackathon. We will ask about dietary requirements before the event."],
  },
  {
    question: "Are there bootcamps before the hackathon?",
    answer: [
      `Yes. Free, half-day bootcamps run in Colombo and Kandy in the ${bootcampWindow.charAt(0).toLowerCase() + bootcampWindow.slice(1)}, plus an island-wide webinar. The Kandy bootcamp is at ${kandyBootcampVenue}. `,
      { text: "Register for the Kandy bootcamp", href: bootcampDetails.Kandy.registrationUrl ?? spaceAppsEvent.kandyUrl },
      ".",
    ],
  },
  {
    question: "What is the minimum age to participate?",
    answer: [
      "Participants under 18 must be registered by a parent or legal guardian, who must accompany them throughout the event. Bring a signed parental consent letter. Read the ",
      { text: "under-18 guidance and print the letter in English, Sinhala or Tamil", href: "/register#consent-letter" },
      " before attending. Contact the team to confirm guardian access arrangements.",
    ],
  },
  {
    question: "When can I start working on my challenge?",
    answer: ["The Kandy hacking window starts at 12:00 AM on Saturday 14 November, Sri Lanka time. In-person hacking begins at 11:00 AM after the opening ceremony. The official NASA Space Apps project submission page opens at 9:00 AM Saturday and closes at 11:59 PM Sunday 15 November. Submit there to be eligible for Global Nomination."],
  },
  {
    question: "What happens after I submit?",
    answer: ["Local judging is planned for 16 to 22 November. Kandy's Global Nominees will be announced at the Prize Giving Ceremony, with its date and venue to follow. Teams that submit through the official NASA Space Apps website receive an official digital participation certificate."],
  },
  {
    question: "Why join?",
    answer: ["Build with mentors, meet new collaborators, explore awards and receive an official NASA Space Apps participation certificate when you submit a project. In-person participants also receive meals, snacks and beverages."],
  },
];

export function faqAnswerText(answer: FaqAnswerPart[]) {
  return answer.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

export function faqAnswerMarkdown(answer: FaqAnswerPart[]) {
  return answer
    .map((part) => {
      if (typeof part === "string") return part;
      if (part.href.startsWith("mailto:")) return `[${part.text}](${part.href.split("?")[0]})`;
      return `[${part.text}](${new URL(part.href, site.url)})`;
    })
    .join("");
}
