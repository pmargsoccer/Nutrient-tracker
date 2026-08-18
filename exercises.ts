// MET (metabolic equivalent) values used to estimate calories burned.
// calories = MET * weightKg * durationHours

export interface ExerciseDef {
  id: string;
  name: string;
  met: number;
}

export const EXERCISES: ExerciseDef[] = [
  { id: "walking", name: "Walking (moderate)", met: 3.5 },
  { id: "running", name: "Running (6 mph)", met: 9.8 },
  { id: "cycling", name: "Cycling (moderate)", met: 7.5 },
  { id: "swimming", name: "Swimming (laps)", met: 8 },
  { id: "weight-training", name: "Weight training", met: 5 },
  { id: "yoga", name: "Yoga", met: 2.5 },
  { id: "hiking", name: "Hiking", met: 6 },
  { id: "hiit", name: "HIIT / circuit training", met: 8.5 },
  { id: "basketball", name: "Basketball", met: 6.5 },
  { id: "soccer", name: "Soccer", met: 7 },
  { id: "dancing", name: "Dancing", met: 4.8 },
  { id: "stretching", name: "Stretching / mobility", met: 2.3 },
];

export const EXERCISE_BY_ID: Record<string, ExerciseDef> = Object.fromEntries(
  EXERCISES.map((e) => [e.id, e])
);
