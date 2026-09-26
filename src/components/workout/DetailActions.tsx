"use client";

import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import { PlusIcon, BookmarkIcon } from "@/lib/icons";
import type { Workout } from "@/lib/types";
import { useState } from "react";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { todayPlan, savedWorkouts, addToPlan, addToSaved } = usePlan();
  const [toast, setToast] = useState("");

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  const inPlan = todayPlan.includes(workout.id);
  const inSaved = savedWorkouts.includes(workout.id);
  const planFull = todayPlan.length >= PLAN_CAP && !inPlan;

  function handleAddToPlan() {
    if (inPlan) {
      notify("Already in today's plan");
      return;
    }
    const added = addToPlan(workout.id);
    notify(added ? "Added to today's plan" : `Today's plan is full (max ${PLAN_CAP} lifts)`);
  }

  function handleSave() {
    if (inSaved) {
      notify("Already saved for later");
      return;
    }
    const added = addToSaved(workout.id);
    notify(added ? "Saved for later" : "Already saved for later");
  }

  return (
    <div className="relative flex flex-col sm:flex-row gap-3 pt-2">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planFull}
        className="btn btn-accent gap-2 disabled:opacity-60"
      >
        <PlusIcon className="w-4 h-4" />
        {inPlan ? "Already in Today's Plan" : planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      {toast && (
        <div role="status" className="toast toast-end toast-bottom z-50">
          <div className="alert border border-accent/30 bg-base-200 text-base-content">
            <span>{toast}</span>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleSave}
        className="btn btn-outline gap-2 disabled:opacity-60"
      >
        <BookmarkIcon className="w-4 h-4" />
        {inSaved ? "Already Saved" : "Save for later"}
      </button>
    </div>
  );
}
