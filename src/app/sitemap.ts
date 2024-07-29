import { allBlogPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";

export function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? "https://blog.api-fiddle.com"
    : "http://localhost:3000";
}

const basePath = getBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: basePath + "/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }, //@ts-ignore
    ...allBlogPosts.map(({ urlPath, date }) => ({
      url: basePath + urlPath,
      lastModified: new Date(date),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
