import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function VisualNotesHeader() {
  return (
    <header className="w-full bg-black px-5 pt-6">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="flex flex-1 items-center gap-4 p-4 transition-opacity duration-200 hover:opacity-70"
        >
          <Image
            src="/images/visual-notes/logo-mark-dark.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
            className="shrink-0"
          />
          <span className="text-2xl font-bold leading-normal whitespace-nowrap text-white">
            {siteConfig.name}
          </span>
        </Link>
        <Link
          href="/about"
          className="p-4 text-2xl font-medium leading-normal text-white transition-opacity duration-200 hover:opacity-70"
        >
          About
        </Link>
        <Link
          href="/references"
          className="p-4 text-2xl font-medium leading-normal text-white transition-opacity duration-200 hover:opacity-70"
        >
          References
        </Link>
        <Link
          href="/visual-notes"
          className="p-4 text-2xl font-medium leading-normal text-accent"
        >
          Visual notes
        </Link>
      </div>
      <div className="mt-8 h-px w-full bg-white/20" aria-hidden />
    </header>
  );
}
