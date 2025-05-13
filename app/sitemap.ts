import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://filszu.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://filszu.vercel.app/projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

  ]
}
