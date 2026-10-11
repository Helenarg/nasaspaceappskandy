import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { PageIntro, CommunityBand, SectionLabel } from "@/components/Elements";
import program from "@/content/official-program.json";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Awards & recognition",
  description: "Discover NASA Space Apps awards and the ways outstanding ideas, storytelling, science, and community impact are recognised.",
  path: "/awards",
});

export default function Awards() {
  return (
    <main id="main">
      <PageIntro
        label={<L id="awards.intro.label" />}
        title={<L id="awards.intro.title" />}
        description={<L id="awards.intro.description" />}
      />
      <section className="content-section">
        <div className="program-intro">
          <div>
            <SectionLabel>
              <L id="awards.categories.label" />
            </SectionLabel>
            <p>
              <L id="awards.categories.description" />
            </p>
          </div>
          <a
            className="text-link"
            href={program.awardsSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="awards.officialCta" />
            <ArrowUpRightIcon size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="award-grid">
          {program.awards.map((award, index) => (
            <article className="award-card" key={award.name}>
              <Image src={award.image} alt="" width={120} height={120} />
              <div>
                <span className="technical-label">
                  AWARD / {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{award.name}</h2>
                <p>{award.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="asset-credit">
          <L id="awards.credit" />
        </p>
      </section>
      <section className="content-section">
        <SectionLabel>
          <L id="awards.journey.label" />
        </SectionLabel>
        <h2>
          <L id="awards.journey.title" />
        </h2>
        <p>
          <L id="awards.journey.description" />
        </p>
        <div className="numbered-list">
          {(["01", "02", "03"] as const).map((number) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>
                  <L id={`awards.journey.${number}.title`} />
                </h3>
                <p>
                  <L id={`awards.journey.${number}.text`} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CommunityBand />
    </main>
  );
}
