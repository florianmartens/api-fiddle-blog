"use client";

import { Author } from "@/components/author";
import { Divider } from "@/components/divider";
import { DocHeading } from "@/utils/types/util-types";
import { BlogPost } from "contentlayer/generated";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TableOfContents: React.FC<{
  elements: DocHeading[];
  pageFilePath?: string;
  pageTitle?: string;
  post: BlogPost;
}> = ({ elements, pageFilePath, pageTitle, post }) => {
  const [activeHeading, setActiveHeading] = useState("");
  const [showScrollToTopButton, setShowScrollToTopButton] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const { slug } of elements) {
        const element = document.getElementById(slug);
        if (element && element.getBoundingClientRect().top < 256)
          current = slug;
      }
      setActiveHeading(current);
      setShowScrollToTopButton(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elements]);

  return (
    <aside className="toc flex-none sticky top-32 sm:top-40 mb-16 w-52 overflow-y-auto hidden xl:block">
      <div className="py-4">
        <h2>Authors</h2>
        {post.authors.map((author, index) => (
          <Author key={index} {...author} />
        ))}
      </div>
      <div>
        {elements.length > 1 && (
          <h2 className="text-black dark:text-white uppercase text-sm font-semibold h-8 flex items-end">
            On this page
          </h2>
        )}
        <ul className="relative grow overflow-hidden py-1 text-sm">
          {elements
            .slice(1, elements.length)
            .map(({ level, title, slug }, index) => {
              return (
                <li
                  key={index}
                  className="mt-2.5"
                  style={{ paddingLeft: `${level > 1 ? level - 2 : 0}rem` }}
                >
                  <Link
                    href={`#${slug}`}
                    className={`flex items-center pb-1 break-words hover:text-black dark:hover:text-white leading-snug text-left ${
                      slug === activeHeading
                        ? "text-black font-normal dark:text-yellow-400 dark:font-light"
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: title
                        .replace("`", "<code>")
                        .replace("`", "</code>"),
                    }}
                  />
                </li>
              );
            })}
        </ul>
      </div>
      {elements.length > 1 && (
        <>
          <Divider />
          <div className="text-sm py-9 space-y-3">
            {pageFilePath && (
              <Link
                href={`https://github.com/Effect-TS/website/blob/website-redesign/content/${pageFilePath}`}
                className="flex items-start gap-1 hover:text-black dark:hover:text-white"
              >
                <span>Edit on GitHub</span>
                <ArrowUp
                  size={16}
                  name="arrow-up-right-light"
                  className="h-3"
                />
              </Link>
            )}
          </div>
        </>
      )}
    </aside>
  );
};
