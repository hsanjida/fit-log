"use client";

import type { ReactNode } from "react";
import { PlanProvider } from "@/context/PlanContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}
