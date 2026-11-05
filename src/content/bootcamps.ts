// Source: NASA Space Apps Sponsorship Proposal (Kandy 2026), page 6.
// The registration form and Firestore rules validate against these city names.
export const bootcampCities = ["Colombo", "Kandy"] as const;

// Cities without a venue or registration link show "details to follow".
export const bootcampDetails: Record<(typeof bootcampCities)[number], { venue?: string[]; registrationUrl?: string }> = {
  Colombo: {},
  Kandy: {
    venue: ["EOE Pereira Theater", "Faculty of Engineering", "University of Peradeniya"],
    registrationUrl: "/kandy-bootcamp",
  },
};

export const bootcampWebinar = {
  title: "Island-wide webinar",
  description: "Online and open to students in every district.",
};

export const bootcampWindow = "First week of November 2026";

// Short link shared for Kandy bootcamp sign-ups; next.config.ts redirects /kandy-bootcamp here.
export const kandyBootcampFormUrl = "https://forms.gle/nyMXHHcMXP1bxx1bA";
