"use client";

import { Logo } from "@/components/logo";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface NavigationLink {
  readonly name: string;
  readonly href: string;
  readonly reload?: boolean;
  readonly external?: boolean;
}

const links: Array<NavigationLink> = [
  {
    name: "Editor",
    href: "https://api-fiddle.com",
    reload: true,
    external: true,
  },
  // { name: "Tutorials", href: "/tutorials/basics" },
  {
    name: "Blog",
    href: "https://blog.api-fiddle.com",
    reload: false,
    external: false,
  },
];

export const Navigation: React.FC<{
  wide?: boolean | false;
  searchBox?: boolean | false;
  themeSwitcher?: boolean | false;
  inline?: boolean;
}> = ({ wide, searchBox, themeSwitcher, inline = false }) => {
  const pathname = usePathname();

  return (
    <div className={pathname === "/" ? "dark" : ""}>
      <header
        className={`${
          inline ? "relative" : "fixed top-0 inset-x-0"
        } backdrop-blur z-30 bg-white/70 dark:bg-[#09090B]/70 text-zinc-700 dark:text-zinc-400`}
      >
        <div
          className={`w-full ${
            inline
              ? "border-b dark:border-neutral-700"
              : wide
                ? "max-w-screen-2xl"
                : "max-w-screen-xl"
          } mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-24 flex justify-between items-center`}
        >
          <Link href="https://api-fiddle.com" className="z-50">
            <Logo width={100} height={50} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu />
          </div>
        </div>
      </header>
    </div>
  );
};

export function NavigationMenu() {
  return <NavigationLinks links={links} />;
}

const NavigationLinks: React.FC<{ links: ReadonlyArray<NavigationLink> }> = (
  props
) => {
  const pathname = usePathname();

  const shouldReload = props.links.some(
    (link) => link.href === pathname && link.reload
  );
  const links = shouldReload
    ? props.links.map((link) => ({ ...link, reload: true }))
    : props.links;

  return (
    <>
      {links.map((link, index) => (
        <NavigationLink key={index} {...link} />
      ))}
    </>
  );
};

function NavigationLink({ name, href, reload, external }: NavigationLink) {
  const pathname = usePathname();
  const Component = reload ? "a" : Link;
  return (
    <Component
      href={href}
      className={`flex items-center gap-1 ${
        pathname?.startsWith(href)
          ? "text-black font-normal dark:text-white dark:font-light"
          : "button-hover"
      }`}
    >
      <span>{name}</span>
      {external && (
        <SquareArrowOutUpRight name="arrow-up-right-light" size={12} />
      )}
    </Component>
  );
}
