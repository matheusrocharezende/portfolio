"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

const HIDDEN_ON = ["/visual-notes", "/references"];

export function ConditionalHeader() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname)) {
    return null;
  }

  return <Header />;
}
