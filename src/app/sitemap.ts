import type { MetadataRoute } from "next";
import { defaultSocialImage } from "@/content/metadata";
import { comingSoonPaths, type SitePath } from "@/content/pages";
import { partnerRoles } from "@/content/partners";
import { site } from "@/content/site";
import { isComingSoon } from "@/lib/launch-mode";

type Route = {
  path: "" | Exclude<SitePath, "/">;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: Route[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/event-details", changeFrequency: "weekly", priority: 0.9 },
  { path: "/register", changeFrequency: "monthly", priority: 0.9 },
  { path: "/challenges", changeFrequency: "weekly", priority: 0.8 },
  { path: "/news", changeFrequency: "daily", priority: 0.7 },
  { path: "/sponsors-and-partners", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/join", changeFrequency: "monthly", priority: 0.6 },
  { path: "/ambassadors", changeFrequency: "monthly", priority: 0.5 },
  { path: "/awards", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

const absolute = (path: string) => new URL(path, site.url).toString();

// Image entries help the event poster and partner logos surface in image search.
const routeImages: Partial<Record<Route["path"], string[]>> = {
  "": [defaultSocialImage.url],
  "/sponsors-and-partners": partnerRoles.flatMap((role) => role.logos.map((logo) => absolute(encodeURI(logo.src)))),
};

export default function sitemap(): MetadataRoute.Sitemap {
  // The sitemap is generated at build time, so this marks when the published content last changed.
  const lastModified = new Date();
  const visibleRoutes = isComingSoon
    ? routes.filter(({ path }) => comingSoonPaths.includes(path || "/"))
    : routes;
  return visibleRoutes.map(({ path, changeFrequency, priority }) => ({
    url: absolute(path || "/"),
    lastModified,
    changeFrequency,
    priority,
    ...(routeImages[path] ? { images: routeImages[path] } : {}),
  }));
}
