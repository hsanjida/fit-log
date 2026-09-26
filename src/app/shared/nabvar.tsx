"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/plan-context";
import { Menu, X, Dumbbell, Bookmark } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, hydrated } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const planCount = hydrated ? plan.length : 0;
  const savedCount = hydrated ? saved.length : 0;

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232530] bg-[#0d0e13]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-900 border border-zinc-700/60 p-1">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <span className="font-display font-extrabold tracking-widest text-xl text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Middle: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#14161f] border border-[#232530] p-1.5 rounded-full">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isWorkoutActive
                ? "bg-[#232534] text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isPlanActive
                ? "bg-[#232534] text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badge Counters */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Plan Badge: Filled pill with #ccff00 */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-[#ccff00]/10"
            title="View Today's Plan"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-xs font-black">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge: Pill with outline/border only */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-transparent text-zinc-300 hover:text-white text-xs uppercase tracking-wider font-semibold transition-all hover:bg-zinc-800/30 active:scale-95"
            title="View Saved Workouts"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
            <span>Saved</span>
            <span className="px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 text-xs font-mono font-medium">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/my-plan"
            className="px-2.5 py-1 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center gap-1.5"
          >
            <span>Plan</span>
            <span className="bg-black/20 rounded-full px-1.5 py-0.2">{planCount}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#232530] bg-[#0e1017] px-4 pt-3 pb-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isWorkoutActive ? "bg-[#232534] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout Library
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isPlanActive ? "bg-[#232534] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-3">
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase"
            >
              <span>Today&apos;s Plan ({planCount})</span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase"
            >
              <span>Saved ({savedCount})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
