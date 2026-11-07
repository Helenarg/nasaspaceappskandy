import Image from "next/image";
import type { CSSProperties } from "react";
import "@fontsource-variable/google-sans-flex";
import { partnerRoles, type PartnerLogo, type PartnerRole } from "@/content/partners";

// Square-ish marks get a taller box than wide wordmarks so every partner reads at a similar weight.
function logoShape(logo: PartnerLogo) {
  return logo.width / logo.height < 1.6 ? "mark" : "wordmark";
}

function PartnerIdentity({ role }: { role: PartnerRole }) {
  if (role.caption) {
    const [logo] = role.logos;
    return (
      <figure className="partner-identity sequence-identity">
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes="48px" />
        <figcaption>{role.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="partner-identity">
      {role.logos.map((logo) => {
        const image = (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="320px"
            className={logo.tile ? "partner-logo partner-logo-tile" : logo.plate ? "partner-logo partner-logo-plate" : "partner-logo"}
            data-shape={logoShape(logo)}
            style={logo.maxWidth ? ({ "--logo-max-width": `${logo.maxWidth}px` } as CSSProperties) : undefined}
          />
        );
        if (!logo.note) return image;
        return (
          <span className="partner-logo-stack" key={logo.src}>
            {image}
            <span className="partner-note">{logo.note}</span>
          </span>
        );
      })}
    </figure>
  );
}

export function PartnerGroups() {
  return (
    <div className="partner-groups">
      {partnerRoles.map((role) => (
        <div className={role.span ? `supporter-group supporter-group-${role.span}` : "supporter-group"} key={role.title}>
          <h3 className="technical-label">{role.title}</h3>
          <div className="supporter-logo-grid"><PartnerIdentity role={role} /></div>
        </div>
      ))}
    </div>
  );
}
