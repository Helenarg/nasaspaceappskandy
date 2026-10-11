import type { Metadata } from "next";
import { GlobeHemisphereEastIcon as Globe2 } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { UsersThreeIcon as Users } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { BinocularsIcon as Telescope } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { PageIntro, SectionLabel, CommunityBand } from "@/components/Elements";
import { participation } from "@/content/site";
import { LocalizedText } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
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
      <section className="content-section">
        <SectionLabel><LocalizedText id="about.values.label" /></SectionLabel>
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
      <CommunityBand />
    </main>
  );
}
