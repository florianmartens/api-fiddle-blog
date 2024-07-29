import { MDX } from "@/components/mdx";
import { Navigation } from "@/components/navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { urlFromFilePath } from "content/utils/url-from-file-path";
import { allBlogPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const post = allBlogPosts.find((post) => {
    return urlFromFilePath(post) === `/posts/${slug}`;
  });
  if (!post) return;
  return {
    title: `${post.title} – API-Fiddle Blog`,
    description: post.excerpt,
  };
}

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = allBlogPosts.find((post) => {
    return post.urlPath === `/posts/${slug}`;
  });
  if (!post) notFound();

  return (
    <>
      <Navigation />
      <div className="blog-container relative w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 flex items-start pt-32 sm:pt-40 min-h-screen">
        <main className="md:px-3 pb-24 -mt-2 grow overflow-hidden">
          <div className="flex gap-2 items-center -mt-5 mb-1 h-4 text-sm">
            <Link
              href="/blog"
              className="hover:text-black dark:hover:text-white"
            >
              Blog
            </Link>
            <ChevronRight
              size={16}
              name={"chevron-right"}
              className="h-2.5 text-zinc-400 dark:text-zinc-600"
            />
          </div>
          <Link href="/">
            <div className="dark:text-white flex items-center pb-3">
              <ArrowLeft size={16} /> Back
            </div>
          </Link>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
            {post.title}
          </h2>
          <div className="text-sm h-4 mt-1.5 mb-6">
            {format(new Date(post.date), "MMM do, yyyy")}
          </div>
          <MDX content={post.body.code} />
        </main>
        <TableOfContents elements={post.headings} post={post} />
      </div>
    </>
  );
}
