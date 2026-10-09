import InformationPage from '../components/InformationPage';
export default function ParticipationPage() {
  return <InformationPage title="How to participate" description="Local interest and official hackathon participation are separate steps." path="/participation" sections={[
    {title:'1. Register on the official website',body:'Create or sign in to a NASA Space Apps account, register for the 2026 hackathon and select a local event or the virtual Universal Event. The global event is November 14–15, 2026. Check the official site for current requirements and deadlines.'},
    {title:'2. Find a challenge and team',body:'Explore the official 2026 challenge summaries, then join or create a team. Official teams have no more than six participants. A local interest form does not create an official account, team or competition entry.'},
    {title:'3. Submit your project',body:'Submit through the Project tab on your official team page. Official project submission opens November 14 at 9:00 AM and closes November 15 at 11:59 PM local time. Submission is required for a participant certificate and global judging eligibility; it does not guarantee an award.'},
    {title:'Local arrangements',body:'Kandy venue, attendance format, detailed schedule, workshops, fees and facilities are to be confirmed. Do not make travel plans based on unconfirmed local details. Published local opportunities will state their confirmed scope and application process.'},
    {title:'What should I bring?',body:'You can participate with coding, design, science, storytelling or other skills. Review your challenge and event information to decide what equipment you need. Team formation, connectivity and accessibility arrangements should be confirmed with your selected official local event.'},
    {title:'Local form acknowledgement',body:'A local form records an expression of interest or a message only. It does not guarantee a place, certificate, prize, email response time or official registration. Review the local data notice before submitting; local applications remain paused until data-handling arrangements are published.'},
  ]}/>;
}
