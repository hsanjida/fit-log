export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-accent" />
      <p className="text-base-content/60 text-sm">Loading workouts…</p>
    </div>
  );
}
