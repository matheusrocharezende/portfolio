"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const HIDDEN_ON = ["/", "/visual-notes", "/about", "/references"];

export function ConditionalFooter() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname) || pathname.startsWith("/projects/")) {
    return null;
  }

  return <Footer />;
}
