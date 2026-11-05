export type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The artwork carries its own background, so it is shown as a rounded tile. */
  tile?: boolean;
  /** Dark-on-transparent artwork that needs a white plate to stay readable on the dark page. */
  plate?: boolean;
  /** Caps the rendered width when several logos share one identity. */
  maxWidth?: number;
};

export type PartnerRole = {
  title: string;
  logos: PartnerLogo[];
  caption?: string;
  /** "wide" takes a full row on phones; "full" takes a full row everywhere. */
  span?: "wide" | "full";
};

// Titles follow the official partner announcement posters; every partner is shown at the same size.
export const partnerRoles: PartnerRole[] = [
  {
    title: "Official Host University & Venue Partner",
    logos: [{ src: "/sponsors/sliit-kandy-uni-horizontal.png", alt: "SLIIT Kandy UNI", width: 1400, height: 247, plate: true }],
    span: "wide",
  },
  {
    // U+2011 keeps "Co-Organizers" from splitting at the hyphen on narrow screens.
    title: "Official Co‑Organizers",
    logos: [
      { src: "/sponsors/kandy-uni-student-interactive-society.png", alt: "Student Interactive Society, Kandy UNI", width: 1387, height: 1487 },
      { src: "/sponsors/university-of-peradeniya.png", alt: "University of Peradeniya", width: 338, height: 338 },
      { src: "/sponsors/iesl-yms.png", alt: "IESL Young Members Section", width: 499, height: 347 },
      { src: "/sponsors/uop-ieee-student-branch.png", alt: "University of Peradeniya IEEE Student Branch", width: 1456, height: 280, plate: true, maxWidth: 220 },
    ],
    span: "full",
  },
  {
    title: "Official Strategic Partner",
    logos: [{ src: "/sponsors/the-faculty-of-brands.png", alt: "The Faculty of Brands", width: 1411, height: 505 }],
  },
  {
    title: "Official Collaborator",
    logos: [{ src: "/sponsors/aissa-logo.png", alt: "AISSA, All Island Schools Science Association", width: 800, height: 851 }],
  },
  {
    title: "Official Digital Marketing Partner",
    logos: [{ src: "/sponsors/footage-culture-yellow.png", alt: "Footage Culture", width: 800, height: 706 }],
  },
  {
    title: "Official Digital & Design Partner",
    logos: [{ src: "/sponsors/SQ3-LOGO-WHITE.png", alt: "", width: 5001, height: 4794 }],
    caption: "Sequence Labs",
  },
  {
    title: "Official Community Partner",
    logos: [
      { src: "/sponsors/IEEE SL Logo - Horizontal - White.png", alt: "IEEE Sri Lanka Section", width: 7405, height: 1111, maxWidth: 168 },
      { src: "/sponsors/SLSAC WHITE.png", alt: "IEEE SLSAC", width: 2706, height: 759, maxWidth: 60 },
    ],
    span: "wide",
  },
];
