import { Navigation } from "@/components/navigation";
import { allBlogPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const content = {
  heading: "API-Fiddle Blog",
  description: "Stay up-to-date with all the latest around API Design.",
};

export const metadata: Metadata = {
  title: content.heading,
  description: content.description,
};

export default function Blog() {
  const posts = Array.from(allBlogPosts).reverse();
  return (
    <>
      <Navigation />
      <main className="docs-container relative w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 pb-24 pt-32 sm:pt-40 min-h-screen">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
          {content.heading}
        </h2>
        <p className="mt-6 mb-12 max-w-xl">{content.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(({ title, excerpt, urlPath, authors, date }, index) => (
            <Link
              href={urlPath}
              key={index}
              className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 generic-hover"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl text-black dark:text-white">
                  {title}
                </h3>
                <div className="text-sm shrink-0 mt-1.5">
                  {format(new Date(date), "MMM do, yyyy")}
                </div>
              </div>
              <div className="flex pl-2 items-center mt-4">
                {authors.map(({ avatar, name }, index) => (
                  <div
                    key={index}
                    className="h-6 w-6 rounded-full relative overflow-hidden -ml-2 border border-black dark:border-white shadow"
                  >
                    <Image src={avatar} alt={name} fill />
                  </div>
                ))}
                <div className="text-sm ml-2">
                  <span>By </span>
                  {authors.map(({ name }, index) => (
                    <>
                      {authors.length !== 1 && index === authors.length - 1 && (
                        <span>and </span>
                      )}
                      {index > 0 && index < authors.length - 1 && (
                        <span>, </span>
                      )}
                      <span key={index} className="text-black dark:text-white">
                        {name}{" "}
                      </span>
                    </>
                  ))}
                </div>
              </div>
              <p className="mt-8">{excerpt}</p>
              <p className="flex items-center gap-2 text-black font-normal dark:font-light dark:text-white mt-4">
                <span>Read more</span>
                <ArrowRight size={16} name="arrow-right" />
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
