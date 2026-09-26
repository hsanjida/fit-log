"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isLoaded } = usePlan();
  const [open, setOpen] = useState(false);
  const linkClass = (active: boolean) => `rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[.14em] transition ${active ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`;
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10110f]/95 backdrop-blur-xl">
    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link href="/" className="flex items-center gap-3"><Image src="/assets/logo.png" alt="" width={34} height={34} /><span className="display-font text-xl font-extrabold tracking-[.16em]">FITLOG<span className="text-lime">.</span></span></Link>
      <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1.5 md:flex"><Link className={linkClass(pathname === "/" || pathname.startsWith("/workout"))} href="/">Workout</Link><Link className={linkClass(pathname === "/my-plan")} href="/my-plan">My Plan</Link></nav>
      <div className="hidden items-center gap-2 sm:flex"><Link href="/my-plan" className="badge-plan"><Dumbbell size={14}/>Plan <span>{isLoaded ? todayPlan.length : 0}</span></Link><Link href="/my-plan" className="badge-saved"><Bookmark size={14}/>Saved <span>{isLoaded ? savedWorkouts.length : 0}</span></Link></div>
      <button className="btn btn-ghost btn-square md:hidden" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="flex flex-col gap-2 border-t border-white/10 px-5 py-4 md:hidden"><Link onClick={() => setOpen(false)} className="mobile-link" href="/">Workout library</Link><Link onClick={() => setOpen(false)} className="mobile-link" href="/my-plan">My Plan · {todayPlan.length} planned · {savedWorkouts.length} saved</Link></nav>}
  </header>;
}
