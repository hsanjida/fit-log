"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { ChevronDownIcon } from "@/lib/icons";
import type { Workout } from "@/lib/types";

type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function LibraryGrid({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => a[sortKey] - b[sortKey]);
  }, [workouts, sortKey]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-200/70 px-3 py-2 shadow-sm">
          <label htmlFor="workout-sort" className="shrink-0 text-xs font-semibold uppercase tracking-wider text-base-content/75">
            Sort By
          </label>
          <div className="relative">
            <select
              id="workout-sort"
              className="select select-bordered h-10 min-h-10 w-40 appearance-none border-base-300 bg-base-100 pr-10 text-sm font-semibold text-base-content outline-none transition-colors hover:border-accent/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label="Sort workouts by"
            >
              {SORT_OPTIONS.map((opt) => (
                <option className="bg-base-200 text-base-content" key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
