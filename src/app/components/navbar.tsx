import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-black text-white px-6 md:px-12">

      {/* Logo */}
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={120}
            height={40}
            className="w-auto h-10"
          />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex gap-2">

        <Link href="/" className="btn btn-ghost text-white">
          WORKOUT
        </Link>

        <Link href="/my-plan" className="btn btn-ghost text-white">
          MY PLAN
        </Link>

      </div>

    </div>
  );
}