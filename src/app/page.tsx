import Hero from "@/components/home/Hero";
import LibrarySection from "@/components/home/LibrarySection";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
}
