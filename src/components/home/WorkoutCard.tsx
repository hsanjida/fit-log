import Link from "next/link";
import { ClockIcon, FlameIcon, StarIcon } from "@/lib/icons";
import type { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card bg-base-200 border border-base-300 hover:border-accent/60 transition-colors overflow-hidden group"
    >
      <figure className="h-40 overflow-hidden bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </figure>
      <div className="card-body p-4 gap-2">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-outline badge-sm uppercase tracking-wide">
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-display uppercase text-base leading-snug">{workout.name}</h3>
        <p className="text-xs text-base-content/60">{workout.equipment}</p>
        <div className="flex items-center gap-3 text-xs text-base-content/70 pt-1">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FlameIcon className="w-3.5 h-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <StarIcon className="w-3.5 h-3.5 text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
