// Seed food database. Nutrient values are approximate figures per 100g,
// compiled from typical public nutrition data (USDA-style references) for
// personal tracking purposes — not lab-verified, not medical advice.
//
// Any nutrient id not listed for a food is assumed to be 0/negligible.

export interface FoodDef {
  id: string;
  name: string;
  /** Typical single-serving size in grams, used as the form default. */
  defaultServingG: number;
  servingLabel: string;
  /** Nutrient content per 100g, keyed by nutrient id from nutrients.ts. */
  per100g: Partial<Record<string, number>>;
}

export const FOODS: FoodDef[] = [
  {
    id: "chicken-breast",
    name: "Chicken breast, cooked",
    defaultServingG: 150,
    servingLabel: "1 breast",
    per100g: {
      energy: 165, protein: 31, fat: 3.6, carbs: 0,
      vitaminB3: 13.7, vitaminB6: 0.6, vitaminB12: 0.3,
      phosphorus: 210, potassium: 256, sodium: 74, selenium: 22.5,
      zinc: 1, iron: 0.7, magnesium: 29, copper: 0.05,
    },
  },
  {
    id: "salmon",
    name: "Salmon, cooked",
    defaultServingG: 150,
    servingLabel: "1 fillet",
    per100g: {
      energy: 208, protein: 20, fat: 13, carbs: 0,
      vitaminD: 526, vitaminB12: 2.8, vitaminB3: 8.5, vitaminB6: 0.6,
      selenium: 36.5, phosphorus: 240, potassium: 384, sodium: 59,
      zinc: 0.6, iodine: 30,
    },
  },
  {
    id: "beef-ground",
    name: "Beef, ground, cooked (85% lean)",
    defaultServingG: 150,
    servingLabel: "6 oz",
    per100g: {
      energy: 250, protein: 26, fat: 17, carbs: 0,
      iron: 2.6, zinc: 5.3, vitaminB12: 2.4, vitaminB3: 4.5, vitaminB6: 0.4,
      phosphorus: 200, potassium: 318, sodium: 72, selenium: 18.2,
      copper: 0.09, nickel: 0.02,
    },
  },
  {
    id: "eggs",
    name: "Egg, whole, cooked",
    defaultServingG: 100,
    servingLabel: "2 large eggs",
    per100g: {
      energy: 155, protein: 13, fat: 11, carbs: 1.1,
      vitaminA: 160, vitaminD: 87, vitaminB12: 0.9, vitaminB2: 0.5,
      selenium: 30.7, phosphorus: 198, calcium: 56, iron: 1.8,
      zinc: 1.3, iodine: 26,
    },
  },
  {
    id: "milk-whole",
    name: "Milk, whole",
    defaultServingG: 244,
    servingLabel: "1 cup",
    per100g: {
      energy: 61, protein: 3.2, fat: 3.3, carbs: 4.8, sugar: 5.1,
      calcium: 113, vitaminD: 51, vitaminB2: 0.18, vitaminB12: 0.45,
      potassium: 132, phosphorus: 91, zinc: 0.4, iodine: 20,
    },
  },
  {
    id: "greek-yogurt",
    name: "Greek yogurt, plain",
    defaultServingG: 170,
    servingLabel: "1 cup",
    per100g: {
      energy: 59, protein: 10, fat: 0.4, carbs: 3.6, sugar: 3.6,
      calcium: 110, vitaminB12: 0.75, potassium: 141, sodium: 36,
      zinc: 0.5, selenium: 9.7,
    },
  },
  {
    id: "cheddar-cheese",
    name: "Cheddar cheese",
    defaultServingG: 28,
    servingLabel: "1 oz",
    per100g: {
      energy: 403, protein: 25, fat: 33, carbs: 1.3,
      calcium: 721, vitaminA: 265, vitaminB12: 0.8, sodium: 621,
      zinc: 3.1, phosphorus: 512, copper: 0.03,
    },
  },
  {
    id: "tofu",
    name: "Tofu, firm",
    defaultServingG: 126,
    servingLabel: "1/2 block",
    per100g: {
      energy: 144, protein: 17, fat: 8.7, carbs: 2.8,
      calcium: 350, iron: 2.7, magnesium: 30, zinc: 1, copper: 0.19,
      manganese: 0.6, potassium: 121,
    },
  },
  {
    id: "lentils",
    name: "Lentils, cooked",
    defaultServingG: 198,
    servingLabel: "1 cup",
    per100g: {
      energy: 116, protein: 9, fat: 0.4, carbs: 20, fiber: 7.9,
      iron: 3.3, magnesium: 36, potassium: 369, zinc: 1.3, copper: 0.25,
      vitaminB9: 181, manganese: 0.5, nickel: 0.03,
    },
  },
  {
    id: "chickpeas",
    name: "Chickpeas, cooked",
    defaultServingG: 164,
    servingLabel: "1 cup",
    per100g: {
      energy: 164, protein: 9, fat: 2.6, carbs: 27, fiber: 7.6,
      iron: 2.9, magnesium: 48, potassium: 291, zinc: 1.5, copper: 0.35,
      vitaminB9: 172, manganese: 1, nickel: 0.05,
    },
  },
  {
    id: "black-beans",
    name: "Black beans, cooked",
    defaultServingG: 172,
    servingLabel: "1 cup",
    per100g: {
      energy: 132, protein: 8.9, fat: 0.5, carbs: 24, fiber: 8.7,
      iron: 2.1, magnesium: 70, potassium: 355, zinc: 1.1, copper: 0.21,
      vitaminB9: 149, manganese: 0.6, nickel: 0.06,
    },
  },
  {
    id: "peanut-butter",
    name: "Peanut butter",
    defaultServingG: 32,
    servingLabel: "2 tbsp",
    per100g: {
      energy: 588, protein: 25, fat: 50, carbs: 20, fiber: 6,
      magnesium: 168, zinc: 2.9, copper: 0.58, manganese: 1.9,
      vitaminE: 8.3, vitaminB3: 13.2, nickel: 0.14,
    },
  },
  {
    id: "almonds",
    name: "Almonds",
    defaultServingG: 28,
    servingLabel: "1 oz (~23 nuts)",
    per100g: {
      energy: 579, protein: 21, fat: 50, carbs: 22, fiber: 12.5,
      calcium: 269, magnesium: 270, vitaminE: 25.6, zinc: 3.1,
      copper: 1, manganese: 2.2, iron: 3.7, nickel: 0.13,
    },
  },
  {
    id: "cashews",
    name: "Cashews",
    defaultServingG: 28,
    servingLabel: "1 oz (~18 nuts)",
    per100g: {
      energy: 553, protein: 18, fat: 44, carbs: 30, fiber: 3.3,
      magnesium: 292, zinc: 5.6, copper: 2.2, manganese: 1.7,
      iron: 6.7, phosphorus: 593, nickel: 0.16,
    },
  },
  {
    id: "walnuts",
    name: "Walnuts",
    defaultServingG: 28,
    servingLabel: "1 oz (~14 halves)",
    per100g: {
      energy: 654, protein: 15, fat: 65, carbs: 14, fiber: 6.7,
      magnesium: 158, copper: 1.6, manganese: 3.4, zinc: 3.1,
      vitaminB9: 98, nickel: 0.1,
    },
  },
  {
    id: "oats",
    name: "Oats, rolled, dry",
    defaultServingG: 40,
    servingLabel: "1/2 cup dry",
    per100g: {
      energy: 379, protein: 13, fat: 6.5, carbs: 67, fiber: 10,
      magnesium: 138, zinc: 4, copper: 0.4, manganese: 4.9,
      iron: 4.7, vitaminB1: 0.76, nickel: 0.11,
    },
  },
  {
    id: "brown-rice",
    name: "Brown rice, cooked",
    defaultServingG: 195,
    servingLabel: "1 cup",
    per100g: {
      energy: 123, protein: 2.7, fat: 1, carbs: 26, fiber: 1.6,
      magnesium: 43, manganese: 1.1, selenium: 9.8, zinc: 0.6,
      vitaminB3: 1.5, nickel: 0.03,
    },
  },
  {
    id: "quinoa",
    name: "Quinoa, cooked",
    defaultServingG: 185,
    servingLabel: "1 cup",
    per100g: {
      energy: 120, protein: 4.4, fat: 1.9, carbs: 21, fiber: 2.8,
      magnesium: 64, iron: 1.5, zinc: 1.1, copper: 0.19, manganese: 0.6,
      vitaminB9: 42, nickel: 0.04,
    },
  },
  {
    id: "whole-wheat-bread",
    name: "Whole wheat bread",
    defaultServingG: 32,
    servingLabel: "1 slice",
    per100g: {
      energy: 247, protein: 13, fat: 3.4, carbs: 41, fiber: 7,
      sodium: 400, iron: 2.5, magnesium: 82, manganese: 2.5,
      vitaminB1: 0.4, nickel: 0.04,
    },
  },
  {
    id: "white-potato",
    name: "Potato, baked (with skin)",
    defaultServingG: 173,
    servingLabel: "1 medium",
    per100g: {
      energy: 93, protein: 2.1, fat: 0.1, carbs: 21, fiber: 2.2,
      vitaminC: 12.6, vitaminB6: 0.3, potassium: 535, magnesium: 28,
      manganese: 0.2,
    },
  },
  {
    id: "sweet-potato",
    name: "Sweet potato, baked",
    defaultServingG: 200,
    servingLabel: "1 medium",
    per100g: {
      energy: 90, protein: 2, fat: 0.2, carbs: 21, fiber: 3.3,
      vitaminA: 961, vitaminC: 19.6, potassium: 475, vitaminB6: 0.3,
      manganese: 0.5,
    },
  },
  {
    id: "broccoli",
    name: "Broccoli, cooked",
    defaultServingG: 156,
    servingLabel: "1 cup",
    per100g: {
      energy: 35, protein: 2.4, fat: 0.4, carbs: 7.2, fiber: 3.3,
      vitaminC: 65, vitaminK: 141, vitaminA: 31, vitaminB9: 108,
      potassium: 293, calcium: 40, manganese: 0.2,
    },
  },
  {
    id: "spinach",
    name: "Spinach, cooked",
    defaultServingG: 180,
    servingLabel: "1 cup",
    per100g: {
      energy: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2,
      vitaminA: 469, vitaminK: 483, vitaminC: 9.8, vitaminB9: 146,
      iron: 3.6, magnesium: 79, calcium: 99, manganese: 0.9, potassium: 466,
    },
  },
  {
    id: "kale",
    name: "Kale, cooked",
    defaultServingG: 130,
    servingLabel: "1 cup",
    per100g: {
      energy: 28, protein: 1.9, fat: 0.4, carbs: 5.6, fiber: 2,
      vitaminA: 500, vitaminK: 704, vitaminC: 42, calcium: 72,
      manganese: 0.5, potassium: 228,
    },
  },
  {
    id: "carrots",
    name: "Carrots, raw",
    defaultServingG: 61,
    servingLabel: "1 medium",
    per100g: {
      energy: 41, protein: 0.9, fat: 0.2, carbs: 10, fiber: 2.8,
      vitaminA: 835, vitaminK: 13, potassium: 320, vitaminC: 5.9,
    },
  },
  {
    id: "tomato",
    name: "Tomato, raw",
    defaultServingG: 123,
    servingLabel: "1 medium",
    per100g: {
      energy: 18, protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2,
      vitaminC: 13.7, vitaminA: 42, potassium: 237, vitaminK: 7.9,
    },
  },
  {
    id: "banana",
    name: "Banana",
    defaultServingG: 118,
    servingLabel: "1 medium",
    per100g: {
      energy: 89, protein: 1.1, fat: 0.3, carbs: 23, fiber: 2.6, sugar: 12,
      potassium: 358, vitaminB6: 0.4, vitaminC: 8.7, magnesium: 27,
    },
  },
  {
    id: "apple",
    name: "Apple",
    defaultServingG: 182,
    servingLabel: "1 medium",
    per100g: {
      energy: 52, protein: 0.3, fat: 0.2, carbs: 14, fiber: 2.4, sugar: 10,
      vitaminC: 4.6, potassium: 107,
    },
  },
  {
    id: "orange",
    name: "Orange",
    defaultServingG: 131,
    servingLabel: "1 medium",
    per100g: {
      energy: 47, protein: 0.9, fat: 0.1, carbs: 12, fiber: 2.4, sugar: 9.4,
      vitaminC: 53, vitaminB9: 30, potassium: 181, calcium: 40,
    },
  },
  {
    id: "strawberries",
    name: "Strawberries",
    defaultServingG: 152,
    servingLabel: "1 cup",
    per100g: {
      energy: 32, protein: 0.7, fat: 0.3, carbs: 7.7, fiber: 2, sugar: 4.9,
      vitaminC: 59, manganese: 0.4, potassium: 153,
    },
  },
  {
    id: "avocado",
    name: "Avocado",
    defaultServingG: 150,
    servingLabel: "1 medium",
    per100g: {
      energy: 160, protein: 2, fat: 15, carbs: 8.5, fiber: 6.7,
      potassium: 485, vitaminE: 2.1, vitaminK: 21, vitaminB9: 81,
      copper: 0.19, magnesium: 29,
    },
  },
  {
    id: "olive-oil",
    name: "Olive oil",
    defaultServingG: 14,
    servingLabel: "1 tbsp",
    per100g: {
      energy: 884, fat: 100, vitaminE: 14.4, vitaminK: 60.2,
    },
  },
  {
    id: "butter",
    name: "Butter",
    defaultServingG: 14,
    servingLabel: "1 tbsp",
    per100g: {
      energy: 717, fat: 81, vitaminA: 684, vitaminD: 60, vitaminE: 2.3,
      sodium: 11,
    },
  },
  {
    id: "dark-chocolate",
    name: "Dark chocolate (70-85%)",
    defaultServingG: 28,
    servingLabel: "1 oz",
    per100g: {
      energy: 598, protein: 7.8, fat: 43, carbs: 46, fiber: 11, sugar: 24,
      iron: 11.9, magnesium: 228, copper: 1.8, manganese: 1.9,
      zinc: 3.3, nickel: 0.17, potassium: 715,
    },
  },
  {
    id: "oysters",
    name: "Oysters, cooked",
    defaultServingG: 85,
    servingLabel: "6 medium",
    per100g: {
      energy: 81, protein: 9.5, fat: 2.3, carbs: 4.9,
      zinc: 78.6, copper: 4.5, selenium: 77.1, vitaminB12: 16,
      iron: 7.8, iodine: 160,
    },
  },
  {
    id: "shrimp",
    name: "Shrimp, cooked",
    defaultServingG: 85,
    servingLabel: "3 oz",
    per100g: {
      energy: 99, protein: 24, fat: 0.3, carbs: 0.2,
      selenium: 38, vitaminB12: 1.6, copper: 0.19, zinc: 1.3,
      iodine: 35, sodium: 111,
    },
  },
  {
    id: "tuna-canned",
    name: "Tuna, canned in water",
    defaultServingG: 85,
    servingLabel: "3 oz",
    per100g: {
      energy: 116, protein: 26, fat: 0.8, carbs: 0,
      vitaminD: 68, vitaminB12: 2.5, selenium: 68.4, sodium: 247,
      vitaminB3: 11.5, nickel: 0.02,
    },
  },
  {
    id: "orange-juice",
    name: "Orange juice",
    defaultServingG: 248,
    servingLabel: "1 cup",
    per100g: {
      energy: 45, protein: 0.7, fat: 0.2, carbs: 10.4, sugar: 8.4,
      vitaminC: 50, vitaminB9: 30, potassium: 200,
    },
  },
  {
    id: "white-rice",
    name: "White rice, cooked",
    defaultServingG: 158,
    servingLabel: "1 cup",
    per100g: {
      energy: 130, protein: 2.7, fat: 0.3, carbs: 28, fiber: 0.4,
      manganese: 0.5, selenium: 7.5,
    },
  },
  {
    id: "pasta",
    name: "Pasta, cooked",
    defaultServingG: 140,
    servingLabel: "1 cup",
    per100g: {
      energy: 158, protein: 5.8, fat: 0.9, carbs: 31, fiber: 1.8,
      selenium: 26.4, manganese: 0.5, iron: 1.3,
    },
  },
];

export const FOOD_BY_ID: Record<string, FoodDef> = Object.fromEntries(
  FOODS.map((f) => [f.id, f])
);
