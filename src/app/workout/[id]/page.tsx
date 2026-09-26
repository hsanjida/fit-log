import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "@/components/workout/DetailActions";
import type { Metadata } from "next";
import type { Workout } from "@/lib/types";

const SPECS: { label: string; key: keyof Workout; suffix?: string }[] = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration", suffix: " min" },
  { label: "Calories", key: "caloriesBurned", suffix: " kcal" },
  { label: "Rating", key: "rating" },
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  if (!workout) return { title: "Workout not found — FitLog" };
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="rounded-box overflow-hidden bg-base-200 border border-base-300 aspect-square md:sticky md:top-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="font-display uppercase text-3xl sm:text-4xl mb-3">{workout.name}</h1>
        <p className="text-base-content/70 mb-4">{workout.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-outline uppercase tracking-wide">
              {group}
            </span>
          ))}
        </div>

        <div className="rounded-box border border-base-300 bg-base-200 divide-y divide-base-300 mb-8">
          {SPECS.map((spec) => (
            <div key={spec.key} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-base-content/60 uppercase tracking-wide text-xs">{spec.label}</span>
              <span className="font-medium">
                {workout[spec.key]}
                {spec.suffix ?? ""}
              </span>
            </div>
          ))}
        </div>

        <h2 className="font-display uppercase text-xl mb-4">Instructions</h2>
        <ol className="flex flex-col gap-3 mb-8">
          {workout.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="badge badge-accent badge-sm mt-0.5 shrink-0">{i + 1}</span>
              <span className="text-sm text-base-content/80">{step}</span>
            </li>
          ))}
        </ol>

        <DetailActions workout={workout} />
      </div>
    </div>
  );
}
