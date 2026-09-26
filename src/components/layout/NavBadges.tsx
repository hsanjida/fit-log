"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function NavBadges() {
  const { todayPlan, savedWorkouts, isLoaded } = usePlan();

  return (
    <div className="flex items-center gap-2">
      <Link href="/my-plan?tab=plan" className="badge badge-accent gap-1 font-semibold">
        Plan <span>{isLoaded ? todayPlan.length : 0}</span>
      </Link>
      <Link href="/my-plan?tab=saved" className="badge badge-outline gap-1">
        Saved <span>{isLoaded ? savedWorkouts.length : 0}</span>
      </Link>
    </div>
  );
}
