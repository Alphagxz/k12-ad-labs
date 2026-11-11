import type { MetadataRoute } from "next";
import { caseStudies } from "@/config/content";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, priority: 0.7 })),
  ];
}
