import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { PageIntro, SectionLabel } from "@/components/Elements";
import { LocalizedText as L } from "@/components/LocalizedText";
import { spaceAppsEvent } from "@/content/event";
import { site } from "@/content/site";
import { createPageMetadata } from "@/content/metadata";

const registrationSteps = [
  ["participation.step1.title", "participation.step1.text"],
  ["participation.step2.title", "participation.step2.text"],
  ["participation.step3.title", "participation.step3.text"],
] as const;

const conductItems = [
  ["participation.conduct.respect.title", "participation.conduct.respect.text"],
  ["participation.conduct.work.title", "participation.conduct.work.text"],
  ["participation.conduct.report.title", "participation.conduct.report.text"],
] as const;

export const metadata = createPageMetadata({
  title: "Register for NASA Space Apps Kandy",
  description: "Follow the steps to register for NASA Space Apps Kandy 2026 through the official NASA website. Review participant conduct and prepare to join.",
  path: "/register",
});

function RegistrationLink() {
  return (
    <a
      className="white-button"
      href={spaceAppsEvent.kandyUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="button-label">
        <L id="participation.cta" />
      </span>
      <ArrowUpRightIcon size={17} aria-hidden="true" />
    </a>
  );
}

export default function Register() {
  return (
    <main id="main" className="registration-guide">
      <PageIntro
        label={<L id="participation.intro" />}
        title={<L id="register.intro.title" />}
        description={<L id="participation.description" />}
        action={<RegistrationLink />}
      />
      <section className="content-section">
        <SectionLabel>
          <L id="participation.free" />
        </SectionLabel>
        <h2>
          <L id="participation.steps" />
        </h2>
        <ol className="registration-steps">
          {registrationSteps.map(([title, text], index) => (
            <li key={title}>
              <span className="technical-label" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>
                <L id={title} />
              </h3>
              <p>
                <L id={text} />
              </p>
            </li>
          ))}
        </ol>
        <p className="registration-team">
          <L id="participation.team" />
        </p>
        <aside className="quiet-note">
          <h3>
            <L id="participation.minors.title" />
          </h3>
          <p>
            <L id="participation.minors.text" />
          </p>
          <a className="text-link" href={`mailto:${site.email}`}>
            <L id="participation.help" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
        </aside>
      </section>
      <section className="content-section">
        <SectionLabel>
          <L id="participation.conduct.label" />
        </SectionLabel>
        <h2>
          <L id="participation.conduct.title" />
        </h2>
        <div className="conduct-grid">
          {conductItems.map(([title, text]) => (
            <article key={title}>
              <h3>
                <L id={title} />
              </h3>
              <p>
                <L id={text} />
              </p>
              {title === "participation.conduct.report.title" ? (
                <a
                  className="text-link"
                  href="mailto:conduct@spaceappschallenge.org"
                >
                  conduct@spaceappschallenge.org
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <div className="resource-links">
          <a
            className="text-link"
            href={site.participantTerms}
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="participation.terms" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
          <a
            className="text-link"
            href="https://www.spaceappschallenge.org/about/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="participation.values" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="content-section registration-destination">
        <span className="cta-pattern" aria-hidden="true" />
        <div>
          <SectionLabel>
            <L id="participation.intro" />
          </SectionLabel>
          <h2>
            <L id="participation.cta.title" />
          </h2>
          <p>
            <L id="participation.cta.text" />
          </p>
        </div>
        <RegistrationLink />
      </section>
    </main>
  );
}
