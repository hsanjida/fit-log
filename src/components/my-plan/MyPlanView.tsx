"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";
import PlanCard from "./PlanCard";

export default function MyPlanView({ initialTab = "plan" }: { initialTab?: "plan" | "saved" }) {
  const { todayPlan, savedWorkouts, done, isLoaded } = usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"plan" | "saved">(initialTab);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  useEffect(() => {
    fetch("/api/workouts")
      .then((response) => {
        if (!response.ok) throw new Error("Workout request failed");
        return response.json() as Promise<Workout[]>;
      })
      .then(setWorkouts)
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const byId = useMemo(() => new Map(workouts.map((workout) => [workout.id, workout])), [workouts]);
  const plannedWorkouts = todayPlan.flatMap((id) => {
    const workout = byId.get(id);
    return workout ? [{ ...workout, done: done.includes(id) }] : [];
  });
  const savedList = savedWorkouts.flatMap((id) => {
    const workout = byId.get(id);
    return workout ? [workout] : [];
  });
  const list = tab === "plan" ? plannedWorkouts : savedList;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredList = list.filter((workout) => !normalizedQuery || [workout.name, ...workout.muscleGroups]
    .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));
  const minutes = plannedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  const calories = plannedWorkouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-accent">Plan your session</p>
          <h1 className="font-display mb-2 mt-2 text-4xl uppercase">My Plan</h1>
          <p className="text-base-content/60">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <p className="text-sm text-base-content/60">{todayPlan.length} / 5 lifts planned</p>
      </div>

      <div className="stats stats-vertical mb-8 w-full border border-base-300 bg-base-200 sm:stats-horizontal sm:w-fit">
        <div className="stat"><div className="stat-title">Exercises</div><div className="stat-value text-accent">{plannedWorkouts.length}</div></div>
        <div className="stat"><div className="stat-title">Minutes</div><div className="stat-value text-accent">{minutes}</div></div>
        <div className="stat"><div className="stat-title">Calories</div><div className="stat-value text-accent">{calories}</div></div>
      </div>

      <div role="tablist" className="tabs tabs-boxed mb-6 w-fit">
        <button type="button" role="tab" aria-selected={tab === "plan"} className={`tab font-display uppercase text-xs ${tab === "plan" ? "tab-active" : ""}`} onClick={() => setTab("plan")}>Today&apos;s Plan ({todayPlan.length})</button>
        <button type="button" role="tab" aria-selected={tab === "saved"} className={`tab font-display uppercase text-xs ${tab === "saved" ? "tab-active" : ""}`} onClick={() => setTab("saved")}>Saved ({savedWorkouts.length})</button>
      </div>

      {loading || !isLoaded ? (
        <div className="flex items-center justify-center gap-3 py-16 text-sm text-base-content/60"><span className="loading loading-spinner loading-sm text-accent"/>Loading workouts…</div>
      ) : list.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 px-6 py-16 text-center">
          <h2 className="font-display mb-2 text-xl uppercase">Nothing Here Yet</h2>
          <p className="mb-6 text-base-content/60">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn btn-accent">Go to workouts</Link>
        </div>
      ) : (
        <>
        <label className="input input-bordered mb-5 flex w-full items-center gap-2 bg-base-100 sm:max-w-sm" aria-label="Search planned workouts by name or tag">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-base-content/50"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
          <input
            type="search"
            className="grow"
            placeholder="Search by workout name or muscle group…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && <button type="button" className="btn btn-ghost btn-xs" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>}
        </label>
        {filteredList.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 px-6 py-12 text-center text-base-content/65" role="status">No {tab === "plan" ? "planned" : "saved"} workouts match “{query}”.</p>
        ) : (
        <div className="flex flex-col gap-3">
          {filteredList.map((workout) => (
            <PlanCard key={workout.id} workout={workout} listType={tab} onToast={notify} />
          ))}
        </div>
        )}
        </>
      )}
      {toast && (
        <div role="status" className="toast toast-end toast-bottom z-50">
          <div className="alert border border-accent/30 bg-base-200 text-base-content"><span>{toast}</span></div>
        </div>
      )}
    </div>
  );
}
