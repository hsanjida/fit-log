import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4 px-4">
      <p className="font-display uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="font-display uppercase text-3xl sm:text-4xl">Page not found</h1>
      <p className="text-base-content/60 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link href="/" className="btn btn-accent mt-2">
        Go to workouts
      </Link>
    </div>
  );
}
