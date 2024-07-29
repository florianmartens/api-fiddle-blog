import { writeFileSync } from "fs";
import RSS from "rss";
import { allBlogPosts } from "../.contentlayer/generated/index.mjs";
import { getBaseUrl } from "./sitemap.mjs";

const baseUrl = getBaseUrl();

const feed = new RSS({
  title: "API-Fiddle Blog",
  feed_url: `${baseUrl}/rss.xml`,
  site_url: baseUrl,
});

try {
  allBlogPosts
    .map((blogPost) => ({
      title: blogPost.title,
      description: blogPost.excerpt,
      url: `${baseUrl}${blogPost.urlPath}`,
      date: new Date(blogPost.date),
    }))
    .forEach((item) => {
      feed.item(item);
    });
  writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
  console.log("Success: RSS feed created successfully");
} catch (err) {
  console.error("Error: Unable to create RSS feed");
}
