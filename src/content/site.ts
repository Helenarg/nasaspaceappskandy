export const site = {
  name: "NASA Space Apps Kandy",
  url: "https://nasaspaceapps.lk",
  email: "nasaspaceappskandy@gmail.com",
  location: "Kandy, Sri Lanka",
  eventStatus: "The Next Frontier · November 14-15, 2026",
  globalUrl: "https://www.spaceappschallenge.org/",
  instagramUrl: "https://www.instagram.com/nasaspaceapps.lk",
  tiktokUrl: "https://www.tiktok.com/@nasaspaceapps.lk",
  linkedinUrl: "https://www.linkedin.com/company/nasa-space-apps-kandy/",
  participantTerms: "https://www.spaceappschallenge.org/legal/",
};
export const navigation = [
  { label: "About", href: "/about", key: "nav.about" },
  { label: "Event details", href: "/event-details", key: "nav.events" },
  { label: "Challenges", href: "/challenges", key: "nav.challenges" },
  { label: "Join Us", href: "/join", key: "nav.join" },
  { label: "Sponsors", href: "/sponsors", key: "nav.sponsors" },
  { label: "Contact", href: "/contact", key: "nav.contact" },
] as const;
// Exploration areas, not official challenge statements.
export const focusAreas = [
  {
    title: "Earth & climate",
    description:
      "Explore our changing planet through Earth observation, environmental data, and new ways of seeing patterns.",
    tag: "EARTH OBSERVATION",
  },
  {
    title: "Space & exploration",
    description:
      "Bring your curiosity to the Moon, our solar system, and the science that takes us further.",
    tag: "BEYOND EARTH",
  },
  {
    title: "Data & artificial intelligence",
    description:
      "Turn open datasets into useful tools, thoughtful visualisations, and new discoveries.",
    tag: "OPEN DATA",
  },
  {
    title: "Science & storytelling",
    description:
      "Make complex ideas accessible through design, art, education, and stories people can connect with.",
    tag: "CREATIVE EXPLORATION",
  },
];
export const participation = [
  {
    title: "Bring your curiosity.",
    text: "You do not have to be a developer. Scientists, designers, storytellers, students, and makers all have a place here.",
    number: "01",
  },
  {
    title: "Find your people.",
    text: "Come with a team or meet collaborators. Different perspectives make stronger ideas.",
    number: "02",
  },
  {
    title: "Build something meaningful.",
    text: "Choose a challenge, work with open data, and turn an idea into a project you can share.",
    number: "03",
  },
];
export const provinces = [
  "Central",
  "Western",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
];
export const volunteerSkills = [
  "Event logistics",
  "Technical support",
  "Social media",
  "Graphic design",
  "Participant support",
  "Stage & audio-visual",
];
export const mentorSkills = [
  "Data science & Python",
  "Machine learning",
  "Earth observation & GIS",
  "Space science",
  "Cloud & APIs",
  "Pitch & product coaching",
];
export const availabilityOptions = [
  "Pre-event preparation",
  "Hackathon opening",
  "Hackathon working sessions",
  "Presentations & wrap-up",
];
