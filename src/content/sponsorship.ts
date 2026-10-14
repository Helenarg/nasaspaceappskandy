// Source: NASA Space Apps Sponsorship Proposal @nasaspaceapps.lk (1).pdf, pages 13–31.
// Slot counts are package capacities from the proposal, not live availability.
export const sponsorshipTiers = [
  {
    name: "Title Partner", amount: "1,000,000", slots: 1,
    summary: "The headline partner, named on everything.",
    payment: "50% on signing; 50% by 7 November 2026.",
    benefits: ["Event naming and industry exclusivity", "10-minute opening speech, prime booth and 2 judging seats", "Grand Prize named after your brand"],
    details: ["Use the Title Partner designation in your marketing; first partner announcement, dedicated launch post and press release.", "Largest linked website logo; logo on every poster, social creative and registration page; 4 dedicated social posts and mentions in press releases and media interviews.", "Signing by 31 October 2026 includes stage mentions and the largest backdrop logo at all 4 bootcamps, plus bootcamp certificate logos.", "Largest main backdrop and banner logo; lanyard, crew and volunteer T-shirt branding; MC mentions and bootcamp winners showcased under your name.", "5-minute prize-giving address, Grand Prize presentation, 6 invitations and an appreciation plaque.", "Largest logo on all certificates; featured in the recap video and photo album; impact report.", "Opt-in talent list limited to participants aged 18+ interested in jobs or internships."],
  },
  {
    name: "Official Bootcamp Partner", amount: "500,000", slots: 1,
    summary: "Four cities, your name on every bootcamp.",
    payment: "100% before the first bootcamp.",
    benefits: ["Bootcamp series naming rights", "Only paid university or education brand at the bootcamps", "10–15 minute session and booth at all 4 bootcamps"],
    details: ["Space Apps Kandy Bootcamp Series powered by your brand; dedicated announcement and press release, large website logo and 3 dedicated social posts.", "Named in bootcamp promotions, posters and registration pages for all 4 cities; large logo on all bootcamp backdrops.", "Option to host the Colombo bootcamp at your campus; flyers in student packs and presentation of mini-hack awards at every bootcamp.", "Opt-in form for interested students, with parental consent for under-18s; no direct contact details shared.", "Main hackathon: 5-minute stage slot, booth, 1 mentor and a Best Bootcamp Team award named after your brand.", "Recognise bootcamp champions at the prize giving; 4 invitations and an appreciation plaque.", "Large logo on bootcamp certificates, feature in the Road to Space Apps Kandy video series and an impact report."],
  },
  {
    name: "Platinum Partner", amount: "400,000", slots: 2,
    summary: "Stage time, a judge seat and an award in your name.",
    payment: "50% on signing; 50% by 7 November 2026.",
    benefits: ["5-minute opening speech and a booth", "1 judging seat and a named category award", "Large logo on main event assets and certificates"],
    details: ["Dedicated announcement and press release mentions; large logo on the website, posters and registration pages; 2 dedicated social posts.", "Signing by 31 October 2026 includes logos on all 4 bootcamp backdrops.", "Large main backdrop and banner logo; crew and volunteer T-shirt branding; optional Saturday afternoon tech talk in a side room.", "Present your category award at the prize giving; 4 invitations and an appreciation plaque.", "Feature in the recap video and an impact report; opt-in talent list limited to participants aged 18+ interested in jobs or internships."],
  },
  {
    name: "Gold Partner", amount: "200,000", slots: 4,
    summary: "A booth, a mentor on the floor and an award on stage.",
    payment: "50% on signing; 50% by 7 November 2026.",
    benefits: ["Booth and 1 mentor on the floor", "Award presentation and 2 prize-giving invitations", "Opt-in talent list for interested participants aged 18+"],
    details: ["Dedicated announcement and 1 dedicated social post; medium logo on the website and posters.", "Signing by 31 October 2026 includes logos on all 4 bootcamp backdrops.", "Medium logo on the main backdrop and all certificates; MC mention.", "Appreciation plaque, logo in the recap video and an impact report. Talent-list opt-ins are for jobs or internships."],
  },
  {
    name: "Silver Partner", amount: "100,000", slots: 6,
    summary: "A shared booth and visibility across the main event.",
    payment: "100% on signing.",
    benefits: ["Shared booth table and MC mention", "Small logo on website, posters and main backdrop", "Certificate branding, recap video and impact report"],
    details: ["Featured in a group sponsor post.", "2 prize-giving invitations and an appreciation plaque.", "Small logo on all certificates and logo in the recap video."],
  },
  {
    name: "Bronze Partner", amount: "50,000", slots: 8,
    summary: "Put your brand behind the local community.",
    payment: "100% on signing.",
    benefits: ["Small logo on website, sponsors’ wall and certificates", "Group sponsor post and MC mention", "1 prize-giving invitation and appreciation plaque"],
    details: ["Small logo on all certificates.", "Thank-you in the recap video and impact report."],
  },
  {
    name: "Supporter", amount: "25,000", slots: 10,
    summary: "An accessible way for local and small businesses to help.",
    payment: "100% on signing.",
    benefits: ["Small logo on website and sponsors’ wall", "Group thank-you post", "Certificate of appreciation and name in the impact report"],
    details: [],
  },
] as const;

export const inKindGroups = [
  { name: "Build the space", description: "The place, tools and infrastructure to create.", categories: ["Venue", "Internet & Connectivity", "AV & Sound", "Charging & Power", "Software & Cloud", "First Aid & Safety"] },
  { name: "Look after the people", description: "Keep participants fuelled, rested and connected.", categories: ["Meals & Catering", "Snacks", "Beverages", "Coffee", "Travel", "Accommodation"] },
  { name: "Bring the event to life", description: "Capture the stories and celebrate the work.", categories: ["Photography & Video", "TV & Digital Media", "Printing", "Apparel & Merch", "Stationery", "Prizes & Gifting"] },
] as const;

export const inKindLevels = [
  { value: "LKR 250,000+", level: "Gold-level benefits" },
  { value: "LKR 100,000–249,999", level: "Silver-level benefits" },
  { value: "Under LKR 100,000", level: "Bronze-level benefits" },
] as const;

export const partnerDates = [
  { date: "Sign-up open", description: "Sponsorship slots are first come, first served; contact us for current availability" },
  { date: "31 October", description: "Sign by this date for eligible bootcamp benefits; logos due for printed branding" },
  { date: "First week of November", description: "Four bootcamps across Sri Lanka; Colombo is the finale" },
  { date: "7 November", description: "Stage, booth and judge line-up locked" },
  { date: "14–15 November", description: "48-hour hackathon in Kandy" },
  { date: "Late November", description: "Prize giving and partner impact reports" },
] as const;
