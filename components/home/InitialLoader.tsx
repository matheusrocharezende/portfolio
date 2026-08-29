"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const HOLD_MS = 1200;
const FADE_MS = 600;
const STORAGE_KEY = "mr-intro-shown";

export function InitialLoader() {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");

  // Runs before paint: if this tab already played the intro (e.g. the user
  // navigated back to "/" via a link instead of a fresh page load), skip it
  // without a visible flash instead of playing it again every time.
  useLayoutEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      setPhase("done");
    }
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;
    document.body.style.overflow = "hidden";
    const exitTimer = setTimeout(() => setPhase("exit"), HOLD_MS);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.body.style.overflow = "";
    window.sessionStorage.setItem(STORAGE_KEY, "1");
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
