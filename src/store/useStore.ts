import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExerciseEntry, FoodEntry, Profile, SunlightEntry } from "../types";

function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface StoreState {
  foodEntries: FoodEntry[];
  exerciseEntries: ExerciseEntry[];
  sunlightEntries: SunlightEntry[];
  profile: Profile;

  addFoodEntry: (entry: Omit<FoodEntry, "id" | "createdAt">) => void;
  removeFoodEntry: (id: string) => void;

  addExerciseEntry: (entry: Omit<ExerciseEntry, "id" | "createdAt">) => void;
  removeExerciseEntry: (id: string) => void;

  addSunlightEntry: (entry: Omit<SunlightEntry, "id" | "createdAt">) => void;
  removeSunlightEntry: (id: string) => void;

  setProfile: (profile: Partial<Profile>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      foodEntries: [],
      exerciseEntries: [],
      sunlightEntries: [],
      profile: { weightKg: 70 },

      addFoodEntry: (entry) =>
        set((s) => ({
          foodEntries: [...s.foodEntries, { ...entry, id: makeId(), createdAt: Date.now() }],
        })),
      removeFoodEntry: (id) =>
        set((s) => ({ foodEntries: s.foodEntries.filter((e) => e.id !== id) })),

      addExerciseEntry: (entry) =>
        set((s) => ({
          exerciseEntries: [
            ...s.exerciseEntries,
            { ...entry, id: makeId(), createdAt: Date.now() },
          ],
        })),
      removeExerciseEntry: (id) =>
        set((s) => ({ exerciseEntries: s.exerciseEntries.filter((e) => e.id !== id) })),

      addSunlightEntry: (entry) =>
        set((s) => ({
          sunlightEntries: [
            ...s.sunlightEntries,
            { ...entry, id: makeId(), createdAt: Date.now() },
          ],
        })),
      removeSunlightEntry: (id) =>
        set((s) => ({ sunlightEntries: s.sunlightEntries.filter((e) => e.id !== id) })),

      setProfile: (profile) => set((s) => ({ profile: { ...s.profile, ...profile } })),
    }),
    { name: "nutrient-tracker-store" }
  )
);
