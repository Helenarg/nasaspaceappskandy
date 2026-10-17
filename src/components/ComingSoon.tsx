"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { MapPinIcon } from "@phosphor-icons/react/dist/csr/MapPin";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import PixelBlast from "@/components/reactbits/PixelBlast";
import SplitFlapText from "@/components/reactbits/SplitFlapText";
import { spaceAppsEvent } from "@/content/event";
import "@/styles/coming-soon.css";

export function ComingSoon({ year }: { year: number }) {
  return (
    <div className="launch-page">
      <div className="launch-background" aria-hidden="true">
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#365b8c"
          patternScale={2}
          patternDensity={1}
          softness={0}
          smoothing={0}
          glow={0}
          twinkle={0}
          drift={0}
          hoverEffect="none"
          enableRipples={false}
          autoRipple={0}
          speed={0.5}
          transparent
          edgeFade={0}
          dpr={1.5}
          intro={false}
        />
      </div>
      <div className="launch-frame">
        <header className="launch-header">
          <Link href="/" aria-label="NASA Space Apps Kandy home">
            <Image src="/logos/nasaspaceappskandy-white.png" alt="NASA Space Apps Kandy" width={178} height={70} priority />
          </Link>
          <span className="launch-location"><MapPinIcon size={16} weight="fill" aria-hidden="true" />KANDY, SRI LANKA</span>
        </header>

        <main id="main" className="launch-main">
          <div className="launch-copy">
            <p className="launch-eyebrow">THE NEXT FRONTIER</p>
            <div className="launch-title">
              <h1 className="sr-only">NASA Space Apps Kandy 2026</h1>
              <SplitFlapText
                text="COMING SOON"
                padTo={0}
                align="center"
                loop={false}
                flipsPerChar={3}
                flipDuration={0.12}
                stagger={0.045}
                tileColor="#07173f"
                textColor="#ffffff"
                tileRadius={2}
                gap="clamp(2px, 0.35vw, 5px)"
                fontSize="var(--launch-title-size, clamp(26px, 5.5vw, 76px))"
                depth={0.3}
                aria-hidden="true"
              />
            </div>
            <p className="launch-description">Our new website is on its way.<br /><strong>NASA Space Apps Kandy 2026</strong> takes place November 14-15 in Kandy, Sri Lanka. Registration is open.</p>
            <div className="launch-actions">
              <a className="white-button" href={spaceAppsEvent.kandyUrl}>
                <span className="button-label">Register for Kandy</span>
                <ArrowUpRightIcon size={17} aria-hidden="true" />
              </a>
              <a className="outline-button" href="mailto:info@nasaspaceapps.lk">
                <EnvelopeSimpleIcon size={17} aria-hidden="true" />
                <span className="button-label">info@nasaspaceapps.lk</span>
              </a>
            </div>
          </div>
        </main>

        <footer className="launch-footer">
          <div className="footer-credits">
            <span>© {year} NASA Space Apps Kandy.</span>
            <span>Crafted by <a href="https://www.sequencelabs.dev" target="_blank" rel="noopener noreferrer">Sequence Labs</a></span>
          </div>
        </footer>
      </div>
    </div>
  );
}
