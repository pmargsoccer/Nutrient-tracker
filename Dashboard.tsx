import { MACRO_IDS, MINERAL_IDS, VITAMIN_IDS } from "../data/nutrients";
import type { DailyActivity, NutrientTotals } from "../lib/calculations";
import { NutrientSection } from "./NutrientSection";
import { FlaggedImbalances } from "./FlaggedImbalances";
import { ActivitySummary } from "./ActivitySummary";

export function Dashboard({
  totals,
  activity,
}: {
  totals: NutrientTotals;
  activity: DailyActivity;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ActivitySummary activity={activity} />
      <FlaggedImbalances totals={totals} />
      <div className="grid gap-4 md:grid-cols-2">
        <NutrientSection title="Macronutrients" nutrientIds={MACRO_IDS} totals={totals} />
        <NutrientSection title="Vitamins" nutrientIds={VITAMIN_IDS} totals={totals} />
        <div className="md:col-span-2">
          <NutrientSection title="Minerals & trace elements" nutrientIds={MINERAL_IDS} totals={totals} />
        </div>
      </div>
    </div>
  );
}
