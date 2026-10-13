import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/event-details", priority: 0.9, changeFrequency: "weekly" },
  { path: "/register", priority: 0.9, changeFrequency: "weekly" },
  { path: "/challenges", priority: 0.8, changeFrequency: "weekly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/join", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ambassadors", priority: 0.6, changeFrequency: "monthly" },
  { path: "/awards", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sponsors-and-partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const satisfies ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path || "/", site.url).toString(),
    priority,
    changeFrequency,
  }));
}
