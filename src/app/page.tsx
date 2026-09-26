import Hero from "@/components/home/Hero";
import LibrarySection from "@/components/home/LibrarySection";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { connection } from "next/server";

export default async function HomePage() {
  // The workout API can rate-limit build servers. Wait until a real request
  // before calling it so an upstream 429 cannot fail `next build`.
  await connection();

  let workouts: Workout[] = [];
  try {
    workouts = await getWorkouts();
  } catch (error) {
    console.error("Unable to load the workout library:", error);
  }

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
}
