"use client";

import Link from "next/link";
import { usePlan } from "@/lib/plan-context";

export default function NavBadges() {
  const { plan, saved } = usePlan();

  return (
    <div className="flex items-center gap-2">
      <Link href="/my-plan" className="badge badge-accent gap-1 font-semibold">
        Plan <span>{plan.length}</span>
      </Link>
      <Link href="/my-plan" className="badge badge-outline gap-1">
        Saved <span>{saved.length}</span>
      </Link>
    </div>
  );
}
