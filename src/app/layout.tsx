import { MotionSystem } from "@/components/MotionSystem";
import "lenis/dist/lenis.css";
import type { Metadata, Viewport } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { I18nProvider } from "@/i18n";
import { site } from "@/content/site";
import { defaultSocialImage } from "@/content/metadata";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NASA Space Apps Kandy | Ideas beyond boundaries",
    template: "%s | NASA Space Apps Kandy",
  },
  description:
    "Explore, collaborate, and build with NASA open data. Join the NASA Space Apps community in Kandy, Sri Lanka.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "NASA Space Apps Kandy",
    "NASA Space Apps Challenge",
    "Kandy hackathon",
    "Sri Lanka hackathon",
    "NASA open data",
    "space innovation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "NASA Space Apps Kandy | Ideas beyond boundaries",
    description:
      "Explore, collaborate, and build with NASA open data. Join the NASA Space Apps community in Kandy, Sri Lanka.",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "NASA Space Apps Kandy | Ideas beyond boundaries",
    description:
      "Explore, collaborate, and build with NASA open data. Join the NASA Space Apps community in Kandy, Sri Lanka.",
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
