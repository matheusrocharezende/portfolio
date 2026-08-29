"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/lib/site";

const SCROLL_THRESHOLD = 8;

export function DarkHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < SCROLL_THRESHOLD) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + SCROLL_THRESHOLD) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - SCROLL_THRESHOLD) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 w-full bg-black px-5 pt-6 transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
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
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-4 text-2xl font-medium leading-normal transition-opacity duration-200 ${
                  isActive ? "text-accent" : "text-white hover:opacity-70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-8 h-px w-full bg-white/20" aria-hidden />
      </header>
      <div style={{ height: headerHeight }} aria-hidden />
    </>
  );
}
