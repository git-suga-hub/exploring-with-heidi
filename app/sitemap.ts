import type { MetadataRoute } from "next";

const siteUrl = "https://exploringwithheidi.com";

const routes = [
  "/",
  "/learn",
  "/games",
  "/flags",
  "/capitals",
  "/hunting-heidi",
  "/jigsaw",
  "/capital-reveal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
