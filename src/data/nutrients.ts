// Central nutrient registry. Adding a new nutrient to track (another trace
// mineral, another vitamin, etc.) means adding one entry here — food entries
// and the dashboard pick it up automatically.

export type NutrientCategory = "macro" | "vitamin" | "mineral";

export interface NutrientDef {
  id: string;
  name: string;
  unit: "g" | "mg" | "mcg" | "kcal" | "IU";
  category: NutrientCategory;
  /** Recommended Daily Allowance / Adequate Intake for a general adult. */
  rda?: number;
  /** Tolerable Upper Intake Level — above this is flagged as excess. */
  ul?: number;
  /** Short note shown in the UI, e.g. data caveats. */
  note?: string;
}

export const NUTRIENTS: NutrientDef[] = [
  // ---- Macronutrients ----
  { id: "energy", name: "Calories", unit: "kcal", category: "macro", rda: 2000 },
  { id: "protein", name: "Protein", unit: "g", category: "macro", rda: 50 },
  { id: "carbs", name: "Carbohydrates", unit: "g", category: "macro", rda: 275 },
  { id: "fat", name: "Fat", unit: "g", category: "macro", rda: 78 },
  { id: "fiber", name: "Fiber", unit: "g", category: "macro", rda: 28 },
  { id: "sugar", name: "Added Sugar", unit: "g", category: "macro", ul: 50 },

  // ---- Vitamins ----
  { id: "vitaminA", name: "Vitamin A", unit: "mcg", category: "vitamin", rda: 900, ul: 3000 },
  { id: "vitaminC", name: "Vitamin C", unit: "mg", category: "vitamin", rda: 90, ul: 2000 },
  { id: "vitaminD", name: "Vitamin D", unit: "IU", category: "vitamin", rda: 800, ul: 4000 },
  { id: "vitaminE", name: "Vitamin E", unit: "mg", category: "vitamin", rda: 15, ul: 1000 },
  { id: "vitaminK", name: "Vitamin K", unit: "mcg", category: "vitamin", rda: 120 },
  { id: "vitaminB1", name: "Thiamin (B1)", unit: "mg", category: "vitamin", rda: 1.2 },
  { id: "vitaminB2", name: "Riboflavin (B2)", unit: "mg", category: "vitamin", rda: 1.3 },
  { id: "vitaminB3", name: "Niacin (B3)", unit: "mg", category: "vitamin", rda: 16, ul: 35 },
  { id: "vitaminB6", name: "Vitamin B6", unit: "mg", category: "vitamin", rda: 1.7, ul: 100 },
  { id: "vitaminB9", name: "Folate (B9)", unit: "mcg", category: "vitamin", rda: 400, ul: 1000 },
  { id: "vitaminB12", name: "Vitamin B12", unit: "mcg", category: "vitamin", rda: 2.4 },

  // ---- Minerals (bulk) ----
  { id: "calcium", name: "Calcium", unit: "mg", category: "mineral", rda: 1000, ul: 2500 },
  { id: "iron", name: "Iron", unit: "mg", category: "mineral", rda: 18, ul: 45 },
  { id: "magnesium", name: "Magnesium", unit: "mg", category: "mineral", rda: 400 },
  { id: "phosphorus", name: "Phosphorus", unit: "mg", category: "mineral", rda: 700, ul: 4000 },
  { id: "potassium", name: "Potassium", unit: "mg", category: "mineral", rda: 3400 },
  { id: "sodium", name: "Sodium", unit: "mg", category: "mineral", rda: 1500, ul: 2300 },

  // ---- Trace minerals ----
  { id: "zinc", name: "Zinc", unit: "mg", category: "mineral", rda: 11, ul: 40 },
  { id: "copper", name: "Copper", unit: "mg", category: "mineral", rda: 0.9, ul: 10 },
  { id: "manganese", name: "Manganese", unit: "mg", category: "mineral", rda: 2.3, ul: 11 },
  { id: "selenium", name: "Selenium", unit: "mcg", category: "mineral", rda: 55, ul: 400 },
  { id: "iodine", name: "Iodine", unit: "mcg", category: "mineral", rda: 150, ul: 1100 },
  {
    id: "nickel",
    name: "Nickel",
    unit: "mg",
    category: "mineral",
    // No official RDA exists — nickel isn't classified as a dietary
    // essential for humans the way zinc/copper are. Track against the
    // IOM's tolerable upper intake so excess (a common sensitivity/allergy
    // trigger) is still visible.
    ul: 1,
    note: "No established RDA — tracked against the safe upper limit only.",
  },
];

export const NUTRIENT_BY_ID: Record<string, NutrientDef> = Object.fromEntries(
  NUTRIENTS.map((n) => [n.id, n])
);

export const MACRO_IDS = NUTRIENTS.filter((n) => n.category === "macro").map((n) => n.id);
export const VITAMIN_IDS = NUTRIENTS.filter((n) => n.category === "vitamin").map((n) => n.id);
export const MINERAL_IDS = NUTRIENTS.filter((n) => n.category === "mineral").map((n) => n.id);
