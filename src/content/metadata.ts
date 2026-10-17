import type { Metadata } from "next";
import { site } from "./site";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

const socialImage = {
  url: new URL("/og-image.jpg", site.url).toString(),
  width: 1200,
  height: 630,
  alt: "NASA Space Apps Kandy. November 14-15, 2026 in Kandy, Sri Lanka",
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const pageTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: pageTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [socialImage.url],
    },
  };
}

export const defaultSocialImage = socialImage;
