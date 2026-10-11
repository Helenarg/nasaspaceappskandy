import { FaqItem } from "@/components/FaqItem";
import type { Metadata } from "next";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { PageIntro, CommunityBand } from "@/components/Elements";
import { ChallengeCards } from "@/components/ProgramCards";
import program from "@/content/official-program.json";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
export const metadata: Metadata = createPageMetadata({
  title: "2026 challenges",
  description: "Explore the official 2026 NASA Space Apps Challenge briefs and find a problem your Kandy team wants to solve.",
  path: "/challenges",
});
export default function Challenges() {
  return (
    <main id="main">
      <PageIntro
        label={<L id="challenges.intro.label" />}
        title={<L id="challenges.intro.title" />}
        description={<L id="challenges.intro.description" />}
      />
      <section className="content-section">
        <div className="quiet-note">
          <L id="challenges.notice" />
          <div className="resource-links">
            <a
              className="white-button"
              href={program.challengesSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="button-label"><L id="challenges.officialCta" /></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <ChallengeCards />
        <p className="asset-credit"><L id="challenges.credit" /></p>
      </section>
      <section className="content-section">
        <h2><L id="challenges.faq.title" /></h2>
        <div className="faq-list">
          <FaqItem question={<L id="challenges.faq.code.question" />}>
            <p><L id="challenges.faq.code.answer" /></p>
          </FaqItem>
          <FaqItem question={<L id="challenges.faq.team.question" />}>
            <p><L id="challenges.faq.team.answer" /></p>
          </FaqItem>
          <FaqItem question={<L id="challenges.faq.requirements.question" />}>
            <p><L id="challenges.faq.requirements.answer" /></p>
          </FaqItem>
        </div>
      </section>
      <CommunityBand />
    </main>
  );
}
