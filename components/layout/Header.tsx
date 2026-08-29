import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="w-full px-5 pt-6">
      <div className="flex items-center justify-between gap-10">
        <Link
          href="/"
          className="flex items-center gap-4 p-4 transition-opacity duration-200 hover:opacity-70"
        >
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
            className="shrink-0"
          />
          <span className="text-2xl font-bold leading-normal whitespace-nowrap">
            {siteConfig.name}
          </span>
        </Link>
        <Navigation />
      </div>
      <div className="mt-8 h-2 w-full bg-black" aria-hidden />
    </header>
  );
}
