import { MotionSystem } from "@/components/MotionSystem";
import "lenis/dist/lenis.css";
import type { Metadata, Viewport } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { I18nProvider } from "@/i18n";
import { site } from "@/content/site";
import { defaultSocialImage } from "@/content/metadata";
import { sitePages } from "@/content/pages";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsoleSignature } from "@/components/ConsoleSignature";
import { WebApp } from "@/components/WebApp";
import { isComingSoon } from "@/lib/launch-mode";
import "@/styles/globals.css";
import "@/styles/program.css";
import "@/styles/supporters.css";
import "@/styles/motion.css";
import "@fontsource-variable/overpass";
import "@fontsource-variable/fira-code";

const siteDescription = sitePages["/"].description;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NASA Space Apps Kandy 2026 | Hackathon in Sri Lanka",
    template: "%s | NASA Space Apps Kandy",
  },
  description: siteDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "NASA Space Apps Kandy 2026 | Hackathon in Sri Lanka",
    description: siteDescription,
    locale: "en_LK",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASA Space Apps Kandy 2026 | Hackathon in Sri Lanka",
    description: siteDescription,
    images: [defaultSocialImage.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Space Apps Kandy",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  category: "technology",
  keywords: ["NASA Space Apps Kandy", "NASA Space Apps Sri Lanka", "NASA Space Apps Challenge Sri Lanka", "NASA Space Apps Challenge", "hackathon Sri Lanka", "Kandy hackathon", "NASA open data", "SLIIT Kandy UNI"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console and Bing Webmaster Tools codes are set in the hosting environment, never in code.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07173f",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    // Browser extensions may add attributes to this element before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <I18nProvider>
          {isComingSoon ? (
            <>
              <WebApp />
              <a className="skip-link" href="#main">Skip to content</a>
              {children}
            </>
          ) : (
            <MotionSystem>
              <ConsoleSignature />
              <WebApp />
              <a className="skip-link" href="#main">
                Skip to content
              </a>
              <SiteHeader />
              {children}
              <SiteFooter initialYear={currentYear} />
              <CookieConsent />
            </MotionSystem>
          )}
        </I18nProvider>
      </body>
    </html>
  );
}
