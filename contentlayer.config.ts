// contentlayer.config.ts
import { BlogPost } from "./src/contentlayer/schemas/blog-post";
import { makeSource } from "contentlayer2/source-files";
import highlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import codeImport from "remark-code-import";
import rehypeSlug from "rehype-slug";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import rehypeRaw from "rehype-raw";
import { nodeTypes } from "@mdx-js/mdx";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

export const CODE_BLOCK_FILENAME_REGEX = /filename="([^"]+)"/;

const DEFAULT_REHYPE_PRETTY_CODE_OPTIONS: RehypePrettyCodeOptions = {
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    if (!node.properties.className) node.properties.className = [];
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ["highlighted"];
  },
  filterMetaString: (meta: string) =>
    meta.replace(CODE_BLOCK_FILENAME_REGEX, ""),
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [
      [codeImport as any, { rootDir: process.cwd() + "/content" }],
      [
        (remarkShikiTwoslash as any).default,
        { themes: ["github-dark", "github-light"] },
      ],
      remarkGfm,
      remarkMdxCodeMeta as any,
    ],
    rehypePlugins: [
      [rehypeRaw, { passThrough: nodeTypes }],
      [
        rehypePrettyCode,
        { ...DEFAULT_REHYPE_PRETTY_CODE_OPTIONS, theme: "github-dark" },
      ] as any,
      [rehypeSlug],
    ],
  },
});
