"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PlannedWorkout, Workout } from "./types";

const STORAGE_KEY = "fitlog:plan-state:v1";
export const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlannedWorkout[];
  saved: Workout[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const planRef = useRef<PlannedWorkout[]>([]);
  const savedRef = useRef<Workout[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { plan?: PlannedWorkout[]; saved?: Workout[] };
        const nextPlan = Array.isArray(parsed.plan) ? parsed.plan : [];
        const nextSaved = Array.isArray(parsed.saved) ? parsed.saved : [];
        planRef.current = nextPlan;
        savedRef.current = nextSaved;
        setPlan(nextPlan);
        setSaved(nextSaved);
      }
    } catch {
      // Corrupt or unavailable storage is non-fatal; start with an empty plan.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch {
      // Storage may be full or unavailable; the in-memory plan still works.
    }
  }, [plan, saved, hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    const current = planRef.current;
    if (current.some((item) => item.id === workout.id) || current.length >= PLAN_CAP) return false;
    const next = [...current, { ...workout, done: false }];
    planRef.current = next;
    setPlan(next);
    return true;
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    const current = savedRef.current;
    if (current.some((item) => item.id === workout.id)) return false;
    const next = [...current, workout];
    savedRef.current = next;
    setSaved(next);
    return true;
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    const next = planRef.current.filter((item) => item.id !== id);
    planRef.current = next;
    setPlan(next);
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    const next = savedRef.current.filter((item) => item.id !== id);
    savedRef.current = next;
    setSaved(next);
  }, []);

  const toggleDone = useCallback((id: number) => {
    const next = planRef.current.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
    planRef.current = next;
    setPlan(next);
  }, []);

  return (
    <PlanContext.Provider
      value={{ plan, saved, hydrated, addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside <PlanProvider>");
  return context;
}
