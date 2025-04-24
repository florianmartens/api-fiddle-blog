"use client";
import { MdxH2 } from "@/components/mdx-elements";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <Link href="https://pipe0.com">
      <div className="p-8 flex lg:gap-16 border rounded-lg items-center cursor-pointer flex-wrap">
        <div className="basis-full md:basis-1/3 shrink grow lg:block w-1">
          <img width={200} height={100} src="https://pipe0.com/logo-dark.svg" />
        </div>
        <div className="basis-1/3 shrink grow py-4 w-1">
          <div className="">
            <h2 className="group cursor-pointer text-2xl pb-3 pt-6 font-semibold">
              Add Clay-like data enrichment to your application
            </h2>
            <p className="pb-4">
              Pipe0 is the world&apos;s most powerful data enrichment framework.
              Combine 50+ enrichment providers, web scraping and AI to find
              company and people data.
            </p>
            <Button className="text-black bg-brand hover:bg-brand/80" size="lg">
              Try, pipe0 <ArrowRight size={24} className="ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
