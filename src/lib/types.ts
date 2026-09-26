export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

/** A workout that's been added to Today's Plan also tracks a done flag. */
export interface PlannedWorkout extends Workout {
  done: boolean;
}

/** Used by components (like PlanCard) that render either a plan or a saved item. */
export type PlanListItem = Workout & { done?: boolean };
