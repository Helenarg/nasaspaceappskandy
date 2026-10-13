import Link from "next/link";
import { FaqItem } from "./FaqItem";
import { spaceAppsEvent } from "@/content/event";
import { site } from "@/content/site";

export function EventFaq() {
  return (
    <section className="content-section event-faq" aria-labelledby="event-faq-title">
      <p className="technical-label">GOOD TO KNOW</p>
      <h2 id="event-faq-title">Frequently asked questions.</h2>
      <div className="faq-list">
        <FaqItem question="When and where will the event take place?">
          <p>Saturday 14 and Sunday 15 November 2026, in Kandy. The venue will be announced soon. Virtual participants join online.</p>
        </FaqItem>
        <FaqItem question="Do I need to be an expert on space?">
          <p>No. You do not need space knowledge or coding experience. Challenges need coders, designers, researchers, storytellers, artists and business thinkers. Bring your curiosity and we will help with the rest.</p>
        </FaqItem>
        <FaqItem question="Can I join alone, or do I need a team?">
          <p>Both work. <a href={spaceAppsEvent.kandyUrl} target="_blank" rel="noopener noreferrer">Register for the Kandy local event</a>, then create or join a team in the Teams tab. Coming alone? <a href={`mailto:${site.email}?subject=Help%20finding%20a%20Space%20Apps%20team`}>Ask our team</a> to help you meet collaborators.</p>
        </FaqItem>
        <FaqItem question="Who should participate?">
          <p>Everyone is welcome, including first-time hackers, school and university students, and working professionals. Some challenges are technical; others need art, design, storytelling or business skills. Bring your enthusiasm and learn with your team.</p>
        </FaqItem>
        <FaqItem question="Does it cost anything to participate?">
          <p>No. Participation is 100% free.</p>
        </FaqItem>
        <FaqItem question="Will meals be provided?">
          <p>Yes. Meals, snacks and beverages will be provided for in-person participants during the hackathon. We will ask about dietary requirements before the event.</p>
        </FaqItem>
        <FaqItem question="What is the minimum age to participate?">
          <p>There is no minimum age. Participants under 18 must be registered by a parent or legal guardian and bring a signed parental consent letter. Read the <Link href="/register#consent-letter">under-18 guidance and download the letter</Link> before attending. Please contact the team for supervision arrangements.</p>
        </FaqItem>
        <FaqItem question="When can I start working on my challenge?">
          <p>The Kandy hacking window starts at 12:00 AM on Saturday 14 November, Sri Lanka time. In-person hacking begins at 11:00 AM after the opening ceremony. The official NASA Space Apps project submission page opens at 9:00 AM Saturday and closes at 11:59 PM Sunday 15 November. Submit there to be eligible for Global Nomination.</p>
        </FaqItem>
        <FaqItem question="What happens after I submit?">
          <p>Local judging is planned for 16 to 22 November. Kandy&apos;s Global Nominees will be announced at the Prize Giving Ceremony, with its date and venue to follow. Teams that submit through the official NASA Space Apps website receive an official digital participation certificate.</p>
        </FaqItem>
        <FaqItem question="Why join?">
          <p>Build with mentors, meet new collaborators, explore awards and receive an official NASA Space Apps participation certificate when you submit a project. In-person participants also receive meals, snacks and beverages.</p>
        </FaqItem>
      </div>
    </section>
  );
}
