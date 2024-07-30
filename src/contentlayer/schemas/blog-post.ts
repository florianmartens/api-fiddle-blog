import { DocHeading, DocsSection } from "@/utils/types/util-types";
import { urlFromFilePath } from "../utils/url-from-file-path";
import { defineDocumentType } from "contentlayer2/source-files";
import { bundleMDX } from "mdx-bundler";
import { defineNestedType } from "contentlayer2/source-files";
import { tocPlugin } from "../utils/toc-plugin";
import { sectionsPlugin } from "../utils/sections-plugin";

export const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: {
      type: "string",
      description: "Name of the author.",
      required: true,
    },
    description: {
      type: "string",
      description: "Role or other description of the author.",
      required: true,
    },
    avatar: {
      type: "string",
      description:
        "URL of an avatar image. Either local (/images/...) or Twitter profile picture URL for example.",
      required: true,
    },
    twitter: {
      type: "string",
      description: "Twitter profile URL.",
      required: false,
    },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    isPublished: {
      type: "boolean",
      description: "Determines if the post is visible on the website or not",
      required: true,
    },
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "A brief description of the content",
      required: true,
    },
    date: {
      type: "date",
      required: true,
      description: "Publishing date",
    },
    relatedPosts: {
      type: "list",
      description: "List of slugs for related posts.",
      of: { type: "string" },
      required: false,
    },
    keywords: {
      type: "list",
      description: "List of keywords",
      of: { type: "string" },
      required: true,
    },
    authors: {
      type: "list",
      description: "One or more authors of the post.",
      of: Author,
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    urlPath: {
      type: "string",
      description: "The URL path of this post relative to site root.",
      resolve: urlFromFilePath,
    },
    headings: {
      type: "json",
      resolve: async (page) => {
        const headings: DocHeading[] = [];
        await bundleMDX({
          source: page.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              tocPlugin(headings) as any,
            ];
            return opts;
          },
        });
        return [{ level: 1, title: page.title }, ...headings];
      },
    },
    sections: {
      type: "json",
      resolve: async (page) => {
        const sections: DocsSection[] = [];
        await bundleMDX({
          source: page.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              sectionsPlugin(sections) as any,
            ];
            return opts;
          },
        });
        return sections;
      },
    },
  },
}));
