"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "fitlog:plan-state:v1";
const LEGACY_STORAGE_KEY = "fitlog-state-v1";
const MIGRATION_KEY = "fitlog:plan-state:migrated-v1";
export const PLAN_CAP = 5;

type PlanContextValue = {
  todayPlan: number[];
  savedWorkouts: number[];
  done: number[];
  isLoaded: boolean;
  addToPlan: (id: number) => boolean;
  addToSaved: (id: number) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

function toIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "number" && Number.isFinite(item)) return [item];
    if (item && typeof item === "object" && "id" in item) {
      const id = typeof item.id === "number" ? item.id : Number(item.id);
      if (Number.isFinite(id) && id > 0) return [id];
    }
    return [];
  });
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<number[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const planRef = useRef<number[]>([]);
  const savedRef = useRef<number[]>([]);
  const doneRef = useRef<number[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      let stored = raw ? JSON.parse(raw) as Record<string, unknown> : null;
      if (window.localStorage.getItem(MIGRATION_KEY) !== "done") {
        const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) {
          const legacy = JSON.parse(legacyRaw) as Record<string, unknown>;
          const currentHasItems = stored && (
            toIds(stored.todayPlan ?? stored.plan).length > 0 ||
            toIds(stored.savedWorkouts ?? stored.saved).length > 0
          );
          if (!currentHasItems) stored = legacy;
          window.localStorage.setItem(MIGRATION_KEY, "done");
        }
      }

      if (stored) {
        const planSource = stored.todayPlan ?? stored.plan;
        const savedSource = stored.savedWorkouts ?? stored.saved;
        const nextPlan = toIds(planSource).slice(0, PLAN_CAP);
        const nextSaved = toIds(savedSource);
        const nextDone = Array.isArray(stored.done)
          ? toIds(stored.done)
          : Array.isArray(planSource)
            ? planSource.flatMap((item) => item && typeof item === "object" && "done" in item && item.done && "id" in item && typeof item.id === "number" ? [item.id] : [])
            : [];
        planRef.current = nextPlan;
        savedRef.current = nextSaved;
        doneRef.current = nextDone;
        setTodayPlan(nextPlan);
        setSavedWorkouts(nextSaved);
        setDone(nextDone);
      }
    } catch {
      // Ignore unreadable browser storage and start with an empty log.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ todayPlan, savedWorkouts, done }));
    } catch {
      // Storage can be unavailable; the current session remains usable.
    }
  }, [todayPlan, savedWorkouts, done, isLoaded]);

  const addToPlan = useCallback((id: number) => {
    const current = planRef.current;
    if (current.includes(id) || current.length >= PLAN_CAP) return false;
    const next = [...current, id];
    planRef.current = next;
    setTodayPlan(next);
    return true;
  }, []);

  const addToSaved = useCallback((id: number) => {
    const current = savedRef.current;
    if (current.includes(id)) return false;
    const next = [...current, id];
    savedRef.current = next;
    setSavedWorkouts(next);
    return true;
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    const next = planRef.current.filter((item) => item !== id);
    planRef.current = next;
    setTodayPlan(next);
    const nextDone = doneRef.current.filter((item) => item !== id);
    doneRef.current = nextDone;
    setDone(nextDone);
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    const next = savedRef.current.filter((item) => item !== id);
    savedRef.current = next;
    setSavedWorkouts(next);
  }, []);

  const toggleDone = useCallback((id: number) => {
    const next = doneRef.current.includes(id)
      ? doneRef.current.filter((item) => item !== id)
      : [...doneRef.current, id];
    doneRef.current = next;
    setDone(next);
  }, []);

  const value = useMemo(() => ({
    todayPlan, savedWorkouts, done, isLoaded,
    addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone,
  }), [todayPlan, savedWorkouts, done, isLoaded, addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
