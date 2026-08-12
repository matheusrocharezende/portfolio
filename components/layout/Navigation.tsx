"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`p-4 text-2xl font-medium leading-normal transition-opacity duration-200 ${
        isActive ? "text-accent" : "hover:opacity-60"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navigation() {
  return (
    <nav aria-label="Menu principal">
      <ul className="flex items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
