"use client";

import { PLAN_CAP, usePlan } from "@/lib/plan-context";
import { useToast } from "@/lib/toast-context";
import { PlusIcon, BookmarkIcon } from "@/lib/icons";
import type { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const { showToast } = useToast();

  const inPlan = plan.some((w) => w.id === workout.id);
  const inSaved = saved.some((w) => w.id === workout.id);
  const planFull = plan.length >= PLAN_CAP && !inPlan;

  function handleAddToPlan() {
    if (inPlan) return;
    const added = addToPlan(workout);
    showToast(added ? "Added to today's plan" : `Today's plan is full (max ${PLAN_CAP} lifts)`);
  }

  function handleSave() {
    if (inSaved) return;
    addToSaved(workout);
    showToast("Saved for later");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className="btn btn-accent gap-2 disabled:opacity-60"
      >
        <PlusIcon className="w-4 h-4" />
        {inPlan ? "In Today's Plan" : planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={inSaved}
        className="btn btn-outline gap-2 disabled:opacity-60"
      >
        <BookmarkIcon className="w-4 h-4" />
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
