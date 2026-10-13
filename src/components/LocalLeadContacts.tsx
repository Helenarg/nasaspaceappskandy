import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { spaceAppsEvent } from "@/content/event";

export function LocalLeadContacts() {
  return (
    <div className="event-contact-actions">
      <a
        className="outline-button contact-social"
        href={spaceAppsEvent.localLead.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${spaceAppsEvent.localLead.name} on Instagram`}
      >
        <InstagramLogoIcon size={20} aria-hidden="true" />
      </a>
      <a
        className="outline-button contact-social"
        href={spaceAppsEvent.localLead.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${spaceAppsEvent.localLead.name} on LinkedIn`}
      >
        <LinkedinLogoIcon size={20} aria-hidden="true" />
      </a>
      <a
        className="outline-button contact-email"
        href={`mailto:${spaceAppsEvent.localLead.email}`}
        aria-label={`Email ${spaceAppsEvent.localLead.name}: ${spaceAppsEvent.localLead.email}`}
        title={spaceAppsEvent.localLead.email}
      >
        <EnvelopeIcon
          className="contact-email-icon"
          size={20}
          aria-hidden="true"
        />
        <span className="button-label">
          {spaceAppsEvent.localLead.email}
        </span>
        <ArrowUpRight
          className="contact-email-arrow"
          size={17}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
