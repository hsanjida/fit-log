"use client";

import type { ReactNode } from "react";
import { PlanProvider } from "@/lib/plan-context";
import { ToastProvider } from "@/lib/toast-context";
import Toaster from "@/components/ui/Toaster";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <PlanProvider>
        {children}
        <Toaster />
      </PlanProvider>
    </ToastProvider>
  );
}
