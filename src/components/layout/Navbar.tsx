import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import NavBadges from "./NavBadges";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/assets/logo.png" alt="" width={22} height={22} />
          <span className="font-display uppercase tracking-widest text-lg">FitLog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <NavLink href="/">Workout</NavLink>
          <NavLink href="/my-plan">My Plan</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <NavBadges />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
