import { writeFileSync } from "node:fs";
import prettier from "prettier";
import { allBlogPosts } from "../.contentlayer/generated/index.mjs";

export function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? "https://blog.api-fiddle.com"
    : "http://localhost:3000";
}

export function formatDate(date) {
  return date.toISOString().split(".")[0] + "+00:00";
}

try {
  const urlPaths = allBlogPosts
    .map(
      (blogPost) => `
        <url>
            <loc>${getBaseUrl()}${blogPost.urlPath}</loc>
            <lastmod>${formatDate(new Date(blogPost.date))}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
      `
    )
    .join("");

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${getBaseUrl()}</loc>
        <lastmod>${formatDate(new Date())}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urlPaths}
    </urlset>
  `;

  const prettierConfig = await prettier.resolveConfig("./prettierrc");
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
  console.log("Succes: sitemap created successfully");
} catch (err) {
  console.error("Error: Unable to create sitemap");
}
