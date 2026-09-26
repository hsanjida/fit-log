import type { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches every workout in the library.
 * Used by the Home page (server component).
 */
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  return res.json();
}

/**
 * Fetches a single workout by id.
 * Returns null when the workout doesn't exist so the caller can
 * trigger the 404 page with next/navigation's notFound().
 */
export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (${res.status})`);
  }
  const data = await res.json();
  // Some list-style APIs return an array even for a single-id lookup.
  return Array.isArray(data) ? data[0] ?? null : data;
}
