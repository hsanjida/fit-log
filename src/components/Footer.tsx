import Image from "next/image";
import Link from "next/link";

export default function Footer() { return <footer className="mt-24 border-t border-white/10 bg-[#10110f]"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center lg:px-8"><Link href="/" className="flex items-center gap-3"><Image src="/assets/logo.png" alt="" width={28} height={28}/><span className="display-font font-extrabold tracking-[.16em]">FITLOG</span></Link><p className="text-xs text-zinc-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>; }
