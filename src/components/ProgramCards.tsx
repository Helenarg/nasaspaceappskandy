import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import program from "@/content/official-program.json";
import { ActionLink, SectionLabel } from "@/components/Elements";
import { LocalizedText as L } from "@/components/LocalizedText";

export function ChallengeCards({ featured = false }: { featured?: boolean }) {
  const challenges = featured
    ? [program.challenges[5], program.challenges[2], program.challenges[13]]
    : program.challenges;

  return (
    <div
      className={`challenge-grid${featured ? " is-featured" : ""}`}
      role={featured ? "region" : undefined}
      aria-label={
        featured
          ? "Featured challenges. Swipe or use arrow keys to explore"
          : undefined
      }
      tabIndex={featured ? 0 : undefined}
    >
      {challenges.map((challenge) => (
        <article className="challenge-card" key={challenge.slug}>
          <Image
            src={challenge.image}
            alt={challenge.alt}
            width={300}
            height={250}
            sizes="(max-width: 760px) 90vw, 30vw"
          />
          <div className="challenge-copy">
            <span className="technical-label">
              {challenge.subjects.slice(0, 2).join(" / ")}
            </span>
            <h3>
              <a
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {challenge.title}
                <ArrowUpRightIcon size={18} aria-hidden="true" />
              </a>
            </h3>
            <p>{challenge.summary}</p>
            <div className="challenge-difficulty">
              {challenge.difficulty.map((level) => (
                <span key={level}>{level}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AwardsPreview() {
  return (
    <section className="awards-preview">
      <div className="section-heading">
        <div>
          <SectionLabel>
            <L id="awardsPreview.label" />
          </SectionLabel>
          <h2>
            <L id="awardsPreview.title.first" />
            <br />
            <L id="awardsPreview.title.second" />
          </h2>
        </div>
        <p>
          <L id="awardsPreview.description" />
        </p>
      </div>
      <div className="award-preview-grid">
        {[program.awards[0], program.awards[8], program.awards[9]].map((award) => (
          <Link href="/awards" key={award.name} className="award-preview-card">
            <Image src={award.image} alt="" width={100} height={100} />
            <div>
              <span className="technical-label">GLOBAL AWARD CATEGORY</span>
              <h3>{award.name}</h3>
              <p>{award.description}</p>
            </div>
            <ArrowUpRightIcon size={20} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="program-section-bottom">
        <span>
          <L id="awardsPreview.note" />
        </span>
        <ActionLink href="/awards" outline>
          <L id="awardsPreview.cta" />
        </ActionLink>
      </div>
    </section>
  );
}
