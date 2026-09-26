"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/lib/plan-context";
import PlanCard from "./PlanCard";

export default function MyPlanView() {
  const { plan, saved, hydrated } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const list = tab === "plan" ? plan : saved;
  const metrics = {
    exercises: plan.length,
    minutes: plan.reduce((sum, w) => sum + w.duration, 0),
    calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-display uppercase text-3xl sm:text-4xl mb-2">My Plan</h1>
      <p className="text-base-content/60 mb-8">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="stats stats-vertical sm:stats-horizontal bg-base-200 border border-base-300 mb-8 w-full sm:w-fit">
        <div className="stat">
          <div className="stat-title">Exercises</div>
          <div className="stat-value text-accent">{metrics.exercises}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Minutes</div>
          <div className="stat-value text-accent">{metrics.minutes}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Calories</div>
          <div className="stat-value text-accent">{metrics.calories}</div>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-boxed w-fit mb-8">
        <button
          type="button"
          role="tab"
          className={`tab font-display uppercase text-xs ${tab === "plan" ? "tab-active" : ""}`}
          onClick={() => setTab("plan")}
        >
          Today&apos;s Plan
        </button>
        <button
          type="button"
          role="tab"
          className={`tab font-display uppercase text-xs ${tab === "saved" ? "tab-active" : ""}`}
          onClick={() => setTab("saved")}
        >
          Saved
        </button>
      </div>

      {!hydrated ? (
        <p className="text-base-content/60">Loading workouts…</p>
      ) : list.length === 0 ? (
        <div className="text-center border border-dashed border-base-300 rounded-box py-16 px-6">
          <h3 className="font-display uppercase text-xl mb-2">Nothing Here Yet</h3>
          <p className="text-base-content/60 mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn btn-accent">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((workout) => (
            <PlanCard key={workout.id} workout={workout} listType={tab} />
          ))}
        </div>
      )}
    </div>
  );
}
