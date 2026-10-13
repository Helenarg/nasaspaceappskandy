export const sponsorshipTiers = [
  {
    name: "Title Sponsor",
    amount: "1,000,000",
    benefits: ["Primary logo placement", "Event and bootcamp visibility", "Featured brand acknowledgement"],
  },
  {
    name: "Gold Sponsor",
    amount: "500,000",
    benefits: ["Prominent logo placement", "Event communications", "On-site brand acknowledgement"],
  },
  {
    name: "Silver Sponsor",
    amount: "250,000",
    benefits: ["Logo wall placement", "Digital acknowledgements", "Community visibility"],
  },
] as const;

export const partnershipOptions = [
  { name: "Community", description: "Connect schools, universities and local communities with our bootcamps." },
  { name: "Knowledge", description: "Contribute mentors, workshops and practical guidance for participants." },
  { name: "Media", description: "Share the stories of Kandy's teams and the ideas they create." },
  { name: "In-kind", description: "Support the event with meals, equipment, connectivity or services." },
] as const;
