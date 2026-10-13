import Image from "next/image";
import "@fontsource-variable/google-sans-flex";

export function PartnerLogo() {
  return (
    <figure className="partner-identity">
      <Image
        src="/sponsors/IEEE SL Logo - Horizontal - White.png"
        alt="IEEE Sri Lanka Section"
        width={7405}
        height={1111}
        unoptimized
      />
    </figure>
  );
}

export function PartnerGroups() {
  return (
    <div className="partner-groups">
      <div className="supporter-group">
        <h3 className="technical-label">OFFICIAL COMMUNITY PARTNER</h3>
        <div className="supporter-logo-grid"><PartnerLogo /></div>
      </div>
      <div className="supporter-group">
        <h3 className="technical-label">Official Digital &amp; Design Partner</h3>
        <div className="supporter-logo-grid">
          <figure className="partner-identity sequence-identity">
            <Image src="/sponsors/SQ3-LOGO-WHITE.png" alt="" width={5001} height={4794} sizes="48px" />
            <figcaption>Sequence Labs</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
