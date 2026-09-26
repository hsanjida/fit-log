import MyPlanView from "@/components/my-plan/MyPlanView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "Today's planned lifts and saved workouts.",
};

export default function MyPlanPage() {
  return <MyPlanView />;
}
