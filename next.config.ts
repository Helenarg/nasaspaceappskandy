import type { NextConfig } from "next";
import path from "node:path";
import { isComingSoon } from "./src/lib/launch-mode";
import { spaceAppsEvent } from "./src/content/event";
import { kandyBootcampFormUrl } from "./src/content/bootcamps";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const config: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    const sharedRedirects = [
      {
        source: "/kandy-bootcamp",
        destination: kandyBootcampFormUrl,
        permanent: false,
      },
      // The short registration link always opens the official NASA Space Apps Kandy page.
      {
        source: "/register/:path*",
        destination: spaceAppsEvent.kandyUrl,
        permanent: false,
      },
    ];

    if (!isComingSoon) return sharedRedirects;

    return [
      ...sharedRedirects,
      ...[
        "about", "ambassadors", "awards", "challenges", "contact",
        "event-details", "events", "how-to-register", "join", "news", "partners",
        "sponsors", "sponsors-and-partners",
      ].map((route) => ({
        source: `/${route}/:path*`,
        destination: "/",
        permanent: false,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.spaceappschallenge.org",
        pathname: "/media/images/**",
      },
    ],
  },
  turbopack: { root: path.resolve(".") },
};

export default config;
