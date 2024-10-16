"use client";
import { MdxH2 } from "@/components/mdx-elements";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <Link href="https://api-fiddle.com">
      <div className="p-8 flex lg:gap-16 border rounded-lg items-center cursor-pointer flex-wrap">
        <div className="basis-full md:basis-1/3 shrink grow lg:block w-1">
          <Logo width={200} height={100} />
        </div>
        <div className="basis-1/3 shrink grow py-4 w-1">
          <div className="">
            <h2 className="group cursor-pointer text-2xl pb-3 pt-6 font-semibold">
              We were fed up with unclear API definitions and bad APIs
            </h2>
            <p className="pb-4">
              So we created a better way. API-Fiddle is an API design tool with
              first-class support for DTOs, versioning, serialization, suggested
              response codes, and much more.
            </p>
            <Button className="text-black bg-brand hover:bg-brand/80" size="lg">
              Try, it&apos;s free <ArrowRight size={24} className="ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
