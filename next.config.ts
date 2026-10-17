import type { NextConfig } from "next";
import path from "node:path";
import { isComingSoon } from "./src/lib/launch-mode";
import { spaceAppsEvent } from "./src/content/event";

const canonicalDomainRedirect = {
  source: "/:path*",
  has: [{ type: "host" as const, value: "www.nasaspaceapps.lk" }],
  destination: "https://nasaspaceapps.lk/:path*",
  permanent: true,
};

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
  async redirects() {
    if (!isComingSoon) return [canonicalDomainRedirect];

    return [
      canonicalDomainRedirect,
      {
        source: "/register/:path*",
        destination: spaceAppsEvent.kandyUrl,
        permanent: false,
      },
      ...[
        "about", "ambassadors", "awards", "challenges", "contact",
        "event-details", "events", "join", "news", "partners",
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
