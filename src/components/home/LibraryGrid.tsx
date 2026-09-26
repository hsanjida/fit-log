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
        <label className="flex items-center gap-2 select select-bordered w-44 pr-3">
          <span className="text-xs text-base-content/50 shrink-0">Sort By</span>
          <select
            className="grow bg-transparent outline-none appearance-none cursor-pointer"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            aria-label="Sort workouts by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-4 h-4 text-base-content/50 shrink-0" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
