import LibraryGrid from "./LibraryGrid";
import type { Workout } from "@/lib/types";

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  return (
    <section id="library" className="container mx-auto px-4 sm:px-6 py-16 md:py-20 scroll-mt-20">
      <div className="text-center mb-10">
        <h2 className="font-display uppercase text-3xl sm:text-4xl mb-2">The Library</h2>
        <p className="text-base-content/60">Twelve lifts covering every major muscle group.</p>
      </div>
      <LibraryGrid workouts={workouts} />
    </section>
  );
}
