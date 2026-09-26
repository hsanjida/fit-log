"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`font-display uppercase tracking-wide text-sm transition-colors ${
        isActive ? "text-accent" : "text-base-content/70 hover:text-base-content"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
