"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const HOLD_MS = 1200;
const FADE_MS = 600;
const STORAGE_KEY = "mr-intro-shown";

function getInitialPhase(): "intro" | "done" {
  if (typeof window === "undefined") return "intro";
  return window.sessionStorage.getItem(STORAGE_KEY) ? "done" : "intro";
}

export function InitialLoader() {
  // Decided synchronously on the first client render (not in an effect) so
  // there's never a moment where two effects race over document.body's
  // overflow — that race was leaving scroll permanently disabled site-wide.
  const [phase, setPhase] = useState<"intro" | "exit" | "done">(getInitialPhase);

  useEffect(() => {
    if (phase !== "intro") return;
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "hidden";
    const exitTimer = setTimeout(() => setPhase("exit"), HOLD_MS);
    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.body.style.overflow = "";
    const doneTimer = setTimeout(() => setPhase("done"), FADE_MS);
    return () => clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-[600ms] ease-in-out ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <Image
        src="/images/hero-title.svg"
        alt={siteConfig.name}
        width={1840}
        height={187}
        priority
        className="h-auto w-[80vw] max-w-[900px]"
      />
    </div>
  );
}
