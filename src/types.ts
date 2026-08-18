import type { BodyExposure, SkinTone } from "./lib/sunlight";

/** ISO date string, e.g. "2026-08-18" — always local calendar day. */
export type DateStr = string;

export interface FoodEntry {
  id: string;
  date: DateStr;
  foodId: string;
  grams: number;
  createdAt: number;
}

export interface ExerciseEntry {
  id: string;
  date: DateStr;
  exerciseId: string;
  minutes: number;
  createdAt: number;
}

export interface SunlightEntry {
  id: string;
  date: DateStr;
  minutes: number;
  skinTone: SkinTone;
  exposure: BodyExposure;
  usedSunscreen: boolean;
  createdAt: number;
}

export interface Profile {
  weightKg: number;
}
