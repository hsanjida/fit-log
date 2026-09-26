import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="" width={20} height={20} />
          <span className="font-display uppercase tracking-widest text-base">FitLog</span>
        </div>
        <p className="text-sm text-base-content/60 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
