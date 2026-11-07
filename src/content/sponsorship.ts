// Source: NASA Space Apps Sponsorship Proposal (Kandy 2026), pages 13–22.
// The proposal sets one company per industry rather than fixed place counts.
export const sponsorshipTiers = [
  {
    name: "Title Partner", label: "Exclusive", amount: "750,000",
    summary: "The event carries your name, with industry exclusivity.",
    payment: "50% on signing; 50% before the main event.",
    benefits: ["Event naming and industry exclusivity", "10-minute opening speech and a prime booth", "Grand Prize in your name and 2 judging seats"],
    details: ["Event named “NASA Space Apps Challenge Kandy 2026 presented by [Your Brand]”.", "Exclusive in your industry: no competing brand at any level.", "Largest logo on every backdrop, banner, poster, certificate and the website.", "Stage mention and largest logo at both bootcamps.", "Launch press release, named in all media, and 4 dedicated social posts.", "Logo on every lanyard and crew T-shirt.", "6 prize-giving invitations and an appreciation plaque.", "Opt-in list of participants aged 18+ open to jobs or internships, a recap video feature and an impact report."],
  },
  {
    name: "Platinum Partner", label: "Premium", amount: "350,000",
    summary: "Stage time, a judge seat and an award in your name.",
    payment: "100% on signing.",
    benefits: ["5-minute opening speech and a booth", "1 judging seat and a category award named after you", "Large logo on main event assets and certificates"],
    details: ["Dedicated announcement post, 2 social posts and press release mentions.", "Large logo on the website, posters, backdrops, banners and certificates.", "Your logo at both bootcamps.", "Logo on crew T-shirts.", "Present your category award yourself.", "Opt-in 18+ talent list, recap video and impact report."],
  },
  {
    name: "Official Bootcamp Partner", label: "Exclusive · Education", amount: "250,000",
    summary: "Own the bootcamp series in Colombo and Kandy.",
    payment: "50% on signing; 50% before the first bootcamp.",
    benefits: ["Bootcamp Series naming rights", "The only university or professional-qualification brand at the bootcamps", "10–15 minute session and a booth at both bootcamps"],
    details: ["“Space Apps Kandy Bootcamp Series powered by [Your Brand]”.", "Large logo on bootcamp backdrops, posters and certificates.", "Present the mini-hack awards at both bootcamps.", "Flyers in student packs and an opt-in form for interested students, with parental consent for under-18s.", "“Best Bootcamp Team” award and a booth at the main hackathon.", "3 dedicated social posts and the bootcamp video series.", "4 prize-giving invitations, an appreciation plaque and an impact report."],
  },
  {
    name: "Gold Partner", label: "Best for talent", amount: "150,000",
    summary: "A booth, a mentor on the floor and an award on stage.",
    payment: "100% on signing.",
    benefits: ["Booth and 1 mentor on the hackathon floor", "Present an award at the prize giving", "Opt-in talent list for participants aged 18+"],
    details: ["Dedicated announcement post.", "Medium logo on the website, posters, main backdrop and certificates.", "Your logo at both bootcamps.", "MC mentions, 2 invitations and an appreciation plaque.", "Recap video and impact report."],
  },
  {
    name: "Silver Partner", label: "Great value", amount: "75,000",
    summary: "Your brand in front of every participant.",
    payment: "100% on signing.",
    benefits: ["Small logo on the website, posters and main backdrop", "Small logo on all certificates", "Shared booth table at the main hackathon"],
    details: ["Featured in a group sponsor post.", "MC mention, 2 invitations and an appreciation plaque.", "Logo in the recap video and impact report."],
  },
  {
    name: "Bronze Partner", label: "Brand presence", amount: "50,000",
    summary: "A simple way to stand behind the event.",
    payment: "100% on signing.",
    benefits: ["Small logo on the website and sponsors’ wall", "Small logo on all certificates", "Group sponsor post and MC mention at the main hackathon"],
    details: ["1 invitation and an appreciation plaque.", "Thank-you in the recap video and impact report."],
  },
  {
    name: "Supporter", label: "Small businesses", amount: "25,000",
    summary: "For local and small businesses backing young innovators.",
    payment: "100% on signing.",
    benefits: ["Logo in the Supporters section of the website", "Logo on the sponsors’ wall at the main hackathon", "Group thank-you post, certificate of appreciation and name in the impact report"],
    details: [],
  },
] as const;

export const partnerReasons = [
  { title: "A NASA-branded platform", description: "Your brand alongside NASA Space Apps Challenge Kandy 2026 on stage, backdrops, certificates and online." },
  { title: "Direct access to STEM talent", description: "Meet Sri Lanka’s next engineers, developers and founders, with an opt-in talent list of participants aged 18+." },
  { title: "Five touchpoints", description: "Bootcamps in Colombo and Kandy, an island-wide webinar, the 48-hour hackathon and the prize giving." },
  { title: "National reach", description: "Presence in Colombo and Kandy, online in every district, plus our digital campaign." },
  { title: "Purpose & CSR", description: "Invest visibly in STEM, AI literacy and entrepreneurship for young Sri Lankans." },
  { title: "Measured results", description: "An impact report with attendance, engagement, media reach, photos and the recap video." },
] as const;

export const inKindGroups = [
  { name: "Build the space", description: "The place, tools and infrastructure to create.", categories: ["Venue", "Internet & Connectivity", "AV & Sound", "Charging & Power", "Software & Cloud", "First Aid & Safety"] },
  { name: "Look after the people", description: "Keep participants fuelled, rested and connected.", categories: ["Meals & Catering", "Snacks", "Beverages", "Coffee", "Travel", "Accommodation"] },
  { name: "Bring the event to life", description: "Capture the stories and celebrate the work.", categories: ["Photography & Video", "TV & Digital Media", "Printing", "Apparel & Merch", "Stationery", "Prizes & Gifting"] },
] as const;

export const partnerDates = [
  { date: "First week of November", description: "Bootcamps in Colombo and Kandy, plus the island-wide webinar" },
  { date: "14–15 November", description: "48-hour hackathon in Kandy" },
  { date: "Late November", description: "Prize giving ceremony" },
  { date: "December", description: "Recap video and partner impact reports" },
] as const;
