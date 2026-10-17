import Link from "next/link";
import { PartnerGroups } from "@/components/PartnerLogo";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { PlanetIcon as Orbit } from "@phosphor-icons/react/dist/ssr/Planet";
import { UsersThreeIcon as Users } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { GlobalStats } from "@/components/GlobalStats";
import { HomeEventDetails } from "@/components/HomeEventDetails";
import { ChallengeCards, AwardsPreview } from "@/components/ProgramCards";
import { Hero } from "@/components/Hero";
import { WorldMap } from "@/components/WorldMap";
import { ActionLink, CommunityBand, SectionLabel } from "@/components/Elements";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { isComingSoon } from "@/lib/launch-mode";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata = createPageMetadata({
  title: isComingSoon ? "NASA Space Apps Kandy | Website coming soon" : "NASA Space Apps Kandy | Ideas beyond boundaries",
  description: isComingSoon
    ? "Our new website is coming soon. Register for NASA Space Apps Kandy on November 14-15, 2026 through the official NASA Space Apps website. Contact info@nasaspaceapps.lk."
    : "Join NASA Space Apps Kandy on November 14-15, 2026. Build ideas for Earth and space with NASA open data and a global community.",
  path: "/",
});

export default function Home() {
  if (isComingSoon) return <ComingSoon year={new Date().getFullYear()} />;

  return (
    <main id="main" className="home-page">
      <Hero />
      <section className="home-partner-strip" aria-label="Official partners">
        <PartnerGroups />
      </section>
      <section id="discover" className="home-intro">
        <SectionLabel>
          <L id="home.intro.label" />
        </SectionLabel>
        <h2>
          <L id="home.intro.title.first" />
          <br />
          <L id="home.intro.title.second" />
        </h2>
        <p>
          <L id="home.intro.description" />
        </p>
      </section>
      <HomeEventDetails />
      <section className="home-bootcamp-teaser" aria-labelledby="home-bootcamp-title">
        <div>
          <SectionLabel>BEFORE THE HACKATHON</SectionLabel>
          <h2 id="home-bootcamp-title">Four cities. One place to begin.</h2>
          <p>Bootcamps are planned for Colombo, Kandy, Galle and Kurunegala in the first week of November. Meet the community and get ready to build.</p>
        </div>
        <ActionLink href="/event-details#bootcamps" outline>Explore bootcamps</ActionLink>
      </section>
      <section className="focus-section">
        <div className="section-heading">
          <div>
            <SectionLabel>
              <L id="home.focus.label" />
            </SectionLabel>
            <h2>
              <L id="home.focus.title.first" />
              <br />
              <L id="home.focus.title.second" />
            </h2>
          </div>
          <p>
            <L id="home.focus.description" />
          </p>
        </div>
        <ChallengeCards featured />
        <div className="program-section-bottom">
          <span>
            <L id="home.focus.note" />
          </span>
          <ActionLink href="/challenges" outline>
            <L id="home.focus.cta" />
          </ActionLink>
        </div>
      </section>
      <section className="approach-section">
        <div className="section-heading">
          <div>
            <SectionLabel><L id="home.approach.label" /></SectionLabel>
            <h2>
              <L id="home.approach.title.first" />
              <br />
              <L id="home.approach.title.second" />
            </h2>
          </div>
        </div>
        <div className="approach-grid">
          <article className="approach-card approach-main">
            <SectionLabel><L id="home.perspective.label" /></SectionLabel>
            <h3>
              <L id="home.perspective.title.first" />
              <br /><L id="home.perspective.title.second" />
            </h3>
            <p><L id="home.perspective.description" /></p>
            <div className="focus-tags">
              <span><L id="home.perspective.tag.students" /></span>
              <span><L id="home.perspective.tag.developers" /></span>
              <span><L id="home.perspective.tag.designers" /></span>
              <span><L id="home.perspective.tag.scientists" /></span>
              <span><L id="home.perspective.tag.storytellers" /></span>
            </div>
            <Link className="text-link" href="/about">
              <L id="home.perspective.cta" /> <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </article>
          <article className="approach-card approach-accent">
            <Orbit size={38} weight="regular" aria-hidden="true" />
            <div>
              <span className="technical-label">
                <L id="home.connections.label" />
              </span>
              <h3>
                <L id="home.connections.title.first" />
                <br />
                <L id="home.connections.title.second" />
              </h3>
              <p>
                <L id="home.connections.description" />
              </p>
            </div>
          </article>
          <article className="approach-card approach-global">
            <Users size={28} weight="regular" aria-hidden="true" />
            <h3><L id="home.ambassador.title" /></h3>
            <p><L id="home.ambassador.description" /></p>
            <Link href="/ambassadors" className="text-link">
              <L id="home.ambassador.cta" /> <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
          <article className="approach-card approach-horizon">
            <div className="horizon-copy">
              <SectionLabel><L id="home.journey.label" /></SectionLabel>
              <h3>
                <L id="home.journey.title.first" />
                <br />
                <L id="home.journey.title.second" />
              </h3>
              <p>
                <L id="home.journey.description" />
              </p>
              <Link href="/register" className="text-link"><L id="home.journey.cta" /> <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <ol className="mission-steps" aria-label="Your Space Apps journey">
              <li><span>01</span> <L id="home.journey.step.explore" /></li>
              <li><span>02</span> <L id="home.journey.step.collaborate" /></li>
              <li><span>03</span> <L id="home.journey.step.create" /></li>
            </ol>
          </article>
        </div>
      </section>
      <section className="statement-section">
        <span className="statement-pattern" aria-hidden="true" />
        <SectionLabel><L id="home.statement.label" /></SectionLabel>
        <h2>
          <L id="home.statement.title.first" />
          <br />
          <L id="home.statement.title.second" />
        </h2>
        <p><L id="home.statement.description" /></p>
        <ActionLink href="/register"><L id="home.statement.cta" /></ActionLink>
      </section>
      <section className="world-section">
        <div className="section-heading">
          <div>
            <SectionLabel><L id="home.world.label" /></SectionLabel>
            <h2><L id="home.world.title" /></h2>
          </div>
          <p>
            <L id="home.world.description" />
          </p>
        </div>
        <WorldMap />
      </section>
      <GlobalStats />
      <AwardsPreview />
      <section className="pathways-section">
        <div className="section-heading">
          <div>
            <SectionLabel><L id="home.pathways.label" /></SectionLabel>
            <h2><L id="home.pathways.title" /></h2>
          </div>
        </div>
        <div className="pathway-grid">
          <Link href="/join">
            <Users size={28} weight="regular" aria-hidden="true" />
            <span className="technical-label"><L id="home.pathways.volunteer.label" /></span>
            <h3><L id="home.pathways.volunteer.title" /></h3>
            <p><L id="home.pathways.volunteer.description" /></p>
            <ArrowUpRight className="card-arrow" size={22} aria-hidden="true" />
          </Link>
          <Link href="/sponsors-and-partners" className="sponsor-pathway">
            <Orbit size={28} weight="regular" aria-hidden="true" />
            <span className="technical-label"><L id="home.pathways.sponsor.label" /></span>
            <h3><L id="home.pathways.sponsor.title" /></h3>
            <p><L id="home.pathways.sponsor.description" /></p>
            <ArrowUpRight className="card-arrow" size={22} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <CommunityBand />
    </main>
  );
}
