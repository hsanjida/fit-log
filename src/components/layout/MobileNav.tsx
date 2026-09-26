"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="btn btn-ghost btn-square"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-box bg-base-200 border border-base-300 shadow-lg p-2 flex flex-col gap-1 z-50">
          <Link
            href="/"
            className="font-display uppercase text-sm px-3 py-2 rounded-field hover:bg-base-300"
            onClick={() => setOpen(false)}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className="font-display uppercase text-sm px-3 py-2 rounded-field hover:bg-base-300"
            onClick={() => setOpen(false)}
          >
            My Plan
          </Link>
        </div>
      )}
    </div>
  );
}
