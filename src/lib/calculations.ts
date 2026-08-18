import { FOOD_BY_ID } from "../data/foods";
import { EXERCISE_BY_ID } from "../data/exercises";
import { NUTRIENTS, type NutrientDef } from "../data/nutrients";
import { estimateVitaminDFromSun } from "./sunlight";
import type { ExerciseEntry, FoodEntry, SunlightEntry } from "../types";

export type NutrientTotals = Record<string, number>;

export function dailyNutrientTotals(
  date: string,
  foodEntries: FoodEntry[],
  sunlightEntries: SunlightEntry[]
): NutrientTotals {
  const totals: NutrientTotals = {};
  for (const n of NUTRIENTS) totals[n.id] = 0;

  for (const entry of foodEntries) {
    if (entry.date !== date) continue;
    const food = FOOD_BY_ID[entry.foodId];
    if (!food) continue;
    const factor = entry.grams / 100;
    for (const [nutrientId, per100] of Object.entries(food.per100g)) {
      if (per100 == null) continue;
      totals[nutrientId] = (totals[nutrientId] ?? 0) + per100 * factor;
    }
  }

  for (const entry of sunlightEntries) {
    if (entry.date !== date) continue;
    totals.vitaminD =
      (totals.vitaminD ?? 0) +
      estimateVitaminDFromSun({
        minutes: entry.minutes,
        skinTone: entry.skinTone,
        exposure: entry.exposure,
        usedSunscreen: entry.usedSunscreen,
      });
  }

  return totals;
}

export function averageNutrientTotals(
  dates: string[],
  foodEntries: FoodEntry[],
  sunlightEntries: SunlightEntry[]
): NutrientTotals {
  const sums: NutrientTotals = {};
  for (const n of NUTRIENTS) sums[n.id] = 0;
  for (const date of dates) {
    const day = dailyNutrientTotals(date, foodEntries, sunlightEntries);
    for (const n of NUTRIENTS) sums[n.id] += day[n.id] ?? 0;
  }
  const n = Math.max(dates.length, 1);
  const avg: NutrientTotals = {};
  for (const key of Object.keys(sums)) avg[key] = sums[key] / n;
  return avg;
}

export interface DailyActivity {
  activeMinutes: number;
  caloriesBurned: number;
  sunMinutes: number;
}

export function dailyActivity(
  date: string,
  exerciseEntries: ExerciseEntry[],
  sunlightEntries: SunlightEntry[],
  weightKg: number
): DailyActivity {
  let activeMinutes = 0;
  let caloriesBurned = 0;
  for (const entry of exerciseEntries) {
    if (entry.date !== date) continue;
    const ex = EXERCISE_BY_ID[entry.exerciseId];
    if (!ex) continue;
    activeMinutes += entry.minutes;
    caloriesBurned += ex.met * weightKg * (entry.minutes / 60);
  }
  let sunMinutes = 0;
  for (const entry of sunlightEntries) {
    if (entry.date !== date) continue;
    sunMinutes += entry.minutes;
  }
  return { activeMinutes, caloriesBurned: Math.round(caloriesBurned), sunMinutes };
}

export type NutrientStatus = "good" | "warning" | "serious" | "critical" | "none";
export type StatusDirection = "low" | "high" | "ok" | "none";

export interface NutrientClassification {
  status: NutrientStatus;
  pct: number | null;
  direction: StatusDirection;
}

/**
 * Classifies an intake amount against a nutrient's RDA/UL.
 * Deficiency has finer-grained bands (good/warning/serious/critical) since
 * that's the more actionable signal for day-to-day tracking. Excess is only
 * ever flagged relative to an established tolerable upper limit — several
 * nutrients here (B12, thiamin, riboflavin, vitamin K, magnesium, potassium)
 * deliberately have no `ul` because food-sourced excess isn't known to be
 * harmful, so a high value for those should read as "good", not a warning.
 */
export function classifyNutrient(nutrient: NutrientDef, amount: number): NutrientClassification {
  const { rda, ul } = nutrient;
  if (rda == null && ul == null) return { status: "none", pct: null, direction: "none" };

  if (ul != null && amount > ul) {
    const pct = rda != null ? (amount / rda) * 100 : (amount / ul) * 100;
    return { status: "critical", pct, direction: "high" };
  }

  if (rda != null) {
    const pct = (amount / rda) * 100;
    if (ul != null && amount > ul * 0.85) {
      return { status: "warning", pct, direction: "high" };
    }
    if (pct < 50) return { status: "critical", pct, direction: "low" };
    if (pct < 70) return { status: "serious", pct, direction: "low" };
    if (pct < 85) return { status: "warning", pct, direction: "low" };
    return { status: "good", pct, direction: "ok" };
  }

  // Only a UL is defined (e.g. nickel) and amount is already <= ul here.
  const pct = (amount / ul!) * 100;
  if (amount > ul! * 0.85) return { status: "warning", pct, direction: "high" };
  return { status: "good", pct, direction: "ok" };
}
