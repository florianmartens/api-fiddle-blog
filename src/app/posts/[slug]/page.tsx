import { Cta } from "@/components/cta";
import { MDX } from "@/components/mdx";
import { Navigation } from "@/components/navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
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
        <main className="md:px-3 pb-48 -mt-2 grow overflow-visible">
          <Link href="/">
            <Button variant="outline" className="mb-3">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          </Link>
          <div className="text-sm h-4 mt-1.5 mb-6 text-muted-foreground">
            {format(new Date(post.date), "MMM do, yyyy")}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white pb-8">
            {post.title}
          </h2>
          <MDX content={post.body.code} />
          <Cta />
        </main>
        <TableOfContents elements={post.headings} post={post} />
      </div>
    </>
  );
}
