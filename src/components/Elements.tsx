import Link from "next/link";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { ReactNode } from "react";
import { LocalizedText } from "./LocalizedText";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="section-label">
      <i aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function ActionLink({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <Link href={href} className={outline ? "outline-button" : "white-button"}>
      <span className="button-label">{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function PageIntro({
  label,
  title,
  description,
  action,
}: {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <SectionLabel>{label}</SectionLabel>
        <h1>{title}</h1>
        <p>{description}</p>
        {action}
      </div>
    </section>
  );
}

export function CommunityBand() {
  return (
    <section className="community-band">
      <span className="cta-pattern" aria-hidden="true" />
      <div>
        <SectionLabel>
          <LocalizedText id="community.label" />
        </SectionLabel>
        <h2>
          <LocalizedText id="community.title.first" />
          <br />
          <LocalizedText id="community.title.second" />
        </h2>
        <p>
          <LocalizedText id="community.description" />
        </p>
      </div>
      <div className="community-action">
        <ActionLink href="/join">
          <LocalizedText id="community.cta" />
        </ActionLink>
      </div>
    </section>
  );
}
