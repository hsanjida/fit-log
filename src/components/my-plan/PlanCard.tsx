"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { ClockIcon, FlameIcon, StarIcon, CheckIcon, XIcon } from "@/lib/icons";
import type { PlanListItem } from "@/lib/types";

export default function PlanCard({
  workout,
  listType,
  onToast,
}: {
  workout: PlanListItem;
  listType: "plan" | "saved";
  onToast: (message: string) => void;
}) {
  const { toggleDone, removeFromPlan, removeFromSaved } = usePlan();

  function handleRemove() {
    if (listType === "plan") {
      removeFromPlan(workout.id);
      onToast("Removed from today's plan");
    } else {
      removeFromSaved(workout.id);
      onToast("Removed from saved");
    }
  }

  function handleDone() {
    toggleDone(workout.id);
    onToast(workout.done ? "Marked as not done" : "Marked as done");
  }

  return (
    <>
      <div
        className={`card card-side bg-base-200 border border-base-300 p-3 sm:p-4 gap-4 items-center ${
          workout.done ? "opacity-60" : ""
        }`}
      >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={workout.image}
        alt=""
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display uppercase text-base truncate">{workout.name}</h3>
        <p className="text-xs text-base-content/60 truncate">{workout.equipment}</p>
        <div className="flex items-center gap-3 text-xs text-base-content/70 mt-1">
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

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
        <Link href={`/workout/${workout.id}`} className="btn btn-sm btn-outline">
          View Details
        </Link>
        {listType === "plan" && (
          <button
            type="button"
            onClick={handleDone}
            className={`btn btn-sm gap-1 ${workout.done ? "btn-success" : "btn-ghost"}`}
          >
            <CheckIcon className="w-4 h-4" />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove"
          className="btn btn-sm btn-ghost btn-square"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      </div>
    </>
  );
}
