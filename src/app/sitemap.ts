import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isComingSoon } from "@/lib/launch-mode";

const routes = [
  "",
  "/event-details",
  "/register",
  "/challenges",
  "/news",
  "/about",
  "/join",
  "/ambassadors",
  "/awards",
  "/sponsors-and-partners",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const visibleRoutes = isComingSoon
    ? routes.filter((path) => path === "" || path === "/privacy" || path === "/terms")
    : routes;
  return visibleRoutes.map((path) => ({
    url: new URL(path || "/", site.url).toString(),
  }));
}
