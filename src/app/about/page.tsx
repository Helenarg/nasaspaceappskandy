import Image from "next/image";
import { LocalLeadContacts } from "@/components/LocalLeadContacts";
import type { Metadata } from "next";
import { GlobeHemisphereEastIcon as Globe2 } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { UsersThreeIcon as Users } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { BinocularsIcon as Telescope } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { PageIntro, SectionLabel, CommunityBand } from "@/components/Elements";
import { participation } from "@/content/site";
import { LocalizedText } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { spaceAppsEvent } from "@/content/event";
export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Meet the NASA Space Apps Kandy community and discover how people across disciplines build with open data, science, and creativity.",
  path: "/about",
});
export default function About() {
  return (
    <main id="main">
      <PageIntro
        label={<LocalizedText id="about.intro.label" />}
        title={<LocalizedText id="about.intro.title" />}
        description={<LocalizedText id="about.intro.description" />}
      />
      <section className="content-section split-layout">
        <div>
          <SectionLabel><LocalizedText id="about.community.label" /></SectionLabel>
          <h2><LocalizedText id="about.community.title" /></h2>
          <p>
            <LocalizedText id="about.community.description.first" />
          </p>
          <p>
            <LocalizedText id="about.community.description.second" />
          </p>
        </div>
        <div className="numbered-list">
          {participation.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <div>
                <h3><LocalizedText id={`about.participation.${item.number}.title` as "about.participation.01.title"} /></h3>
                <p><LocalizedText id={`about.participation.${item.number}.text` as "about.participation.01.text"} /></p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section" aria-labelledby="about-values-title">
        <SectionLabel><LocalizedText id="about.values.label" /></SectionLabel>
        <h2 id="about-values-title"><LocalizedText id="about.values.title" /></h2>
        <div className="info-grid">
          {[
            {
              icon: Globe2,
              title: "about.values.open.title" as const,
              text: "about.values.open.text" as const,
            },
            {
              icon: Users,
              title: "about.values.perspectives.title" as const,
              text: "about.values.perspectives.text" as const,
            },
            {
              icon: Telescope,
              title: "about.values.discover.title" as const,
              text: "about.values.discover.text" as const,
            },
          ].map((card) => (
            <article className="info-card" key={card.title}>
              <card.icon size={28} weight="regular" aria-hidden="true" />
              <h3><LocalizedText id={card.title} /></h3>
              <p><LocalizedText id={card.text} /></p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section team-section" aria-labelledby="team-title">
        <SectionLabel>MEET THE TEAM</SectionLabel>
        <h2 id="team-title">The people bringing Space Apps to Kandy.</h2>
        <div className="team-grid">
          <article className="info-card team-lead-card">
            <div className="team-profile-header">
              <Image className="rometh-portrait" src="/images/Rometh.jpeg" alt="Rometh Sendinu" width={1254} height={1254} sizes="(max-width: 760px) 104px, 112px" />
              <div><span className="technical-label">LOCAL LEAD</span><h3>{spaceAppsEvent.localLead.name}</h3></div>
            </div>
            <p>Leading the local event and connecting participants, volunteers and partners.</p>
            <LocalLeadContacts />
          </article>
          <article className="info-card team-coming-card">
            <div className="team-profile-header">
              <div className="team-photo-placeholder"><Users size={42} aria-hidden="true" /><span>Photo coming soon</span></div>
              <div><span className="technical-label">ORGANISING TEAM</span><h3>Meet the crew soon.</h3></div>
            </div>
            <p>More organising team introductions will follow as roles are confirmed.</p>
          </article>
        </div>
      </section>
      <CommunityBand />
    </main>
  );
}
