// src/contentlayer/utils/url-from-file-path.ts
var urlFromFilePath = (page, includeOrder) => {
  let urlPath = page._raw.flattenedPath;
  if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;
  if (!includeOrder)
    urlPath = urlPath.split("/").map((segment) => segment.replace(/^\d\d\d\-|^\d\d\d\d\-/, "")).join("/");
  return urlPath;
};

// src/contentlayer/schemas/blog-post.ts
import { defineDocumentType } from "contentlayer2/source-files";
import { bundleMDX } from "mdx-bundler";
import { defineNestedType } from "contentlayer2/source-files";

// src/contentlayer/utils/toc-plugin.ts
import GithubSlugger from "github-slugger";
import { toString } from "hast-util-to-string";
var tocPlugin = (headings) => () => {
  const slugger = new GithubSlugger();
  return (node) => {
    for (const element of node.children.filter(
      (_) => _.type === "heading"
    )) {
      const title = toString(element);
      headings.push({
        level: element.depth,
        title,
        slug: slugger.slug(title)
      });
    }
  };
};

// src/contentlayer/utils/sections-plugin.ts
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxToMarkdown } from "mdast-util-mdx";
var sectionsPlugin = (sections) => () => {
  return (node) => {
    let currentSection = { heading: void 0, content: "" };
    let first = true;
    for (const element of node.children) {
      if (element.type === "heading") {
        if (!first) {
          sections.push(currentSection);
          currentSection = { heading: void 0, content: "" };
        }
        first = false;
        const title = toMarkdown(
          { type: "paragraph", children: element.children },
          { extensions: [mdxToMarkdown()] }
        ).trim().replace(/<.*$/g, "").replace(/\\/g, "").trim();
        currentSection.heading = { level: element.depth, title };
      } else if (element.type === "paragraph") {
        const content = element.children.map((child) => child.value).join("") + " ";
        currentSection.content += content;
      }
    }
  };
};

// src/contentlayer/schemas/blog-post.ts
var Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: {
      type: "string",
      description: "Name of the author.",
      required: true
    },
    description: {
      type: "string",
      description: "Role or other description of the author.",
      required: true
    },
    avatar: {
      type: "string",
      description: "URL of an avatar image. Either local (/images/...) or Twitter profile picture URL for example.",
      required: true
    },
    twitter: {
      type: "string",
      description: "Twitter profile URL.",
      required: false
    }
  }
}));
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    excerpt: {
      type: "string",
      description: "A brief description of the content",
      required: true
    },
    date: {
      type: "date",
      required: true,
      description: "Publishing date"
    },
    relatedPosts: {
      type: "list",
      description: "List of slugs for related posts.",
      of: { type: "string" },
      required: false
    },
    authors: {
      type: "list",
      description: "One or more authors of the post.",
      of: Author,
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`
    },
    urlPath: {
      type: "string",
      description: "The URL path of this post relative to site root.",
      resolve: urlFromFilePath
    },
    headings: {
      type: "json",
      resolve: async (page) => {
        const headings = [];
        await bundleMDX({
          source: page.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...opts.remarkPlugins ?? [],
              tocPlugin(headings)
            ];
            return opts;
          }
        });
        return [{ level: 1, title: page.title }, ...headings];
      }
    },
    sections: {
      type: "json",
      resolve: async (page) => {
        const sections = [];
        await bundleMDX({
          source: page.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...opts.remarkPlugins ?? [],
              sectionsPlugin(sections)
            ];
            return opts;
          }
        });
        return sections;
      }
    }
  }
}));

// contentlayer.config.ts
import { makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import codeImport from "remark-code-import";
import rehypeSlug from "rehype-slug";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
var CODE_BLOCK_FILENAME_REGEX = /filename="([^"]+)"/;
var DEFAULT_REHYPE_PRETTY_CODE_OPTIONS = {
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) node.properties.className = [];
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["highlighted"];
  },
  filterMetaString: (meta) => meta.replace(CODE_BLOCK_FILENAME_REGEX, "")
};
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [
      [codeImport, { rootDir: process.cwd() + "/content" }],
      [
        remarkShikiTwoslash.default,
        { themes: ["github-dark", "github-light"] }
      ],
      // [conditionalShikiTwoslash, { theme: "github-dark" }],
      remarkGfm,
      remarkMdxCodeMeta
    ],
    rehypePlugins: [
      [rehypeRaw, { passThrough: nodeTypes }],
      [
        rehypePrettyCode,
        { ...DEFAULT_REHYPE_PRETTY_CODE_OPTIONS, theme: "github-dark" }
      ],
      [rehypeSlug]
    ]
  }
});
export {
  CODE_BLOCK_FILENAME_REGEX,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-ODEGAXG7.mjs.map
