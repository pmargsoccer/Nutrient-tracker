import { NUTRIENT_BY_ID } from "../data/nutrients";
import type { NutrientTotals } from "../lib/calculations";
import { NutrientMeter } from "./NutrientMeter";

export function NutrientSection({
  title,
  nutrientIds,
  totals,
}: {
  title: string;
  nutrientIds: string[];
  totals: NutrientTotals;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
    >
      <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {nutrientIds.map((id) => {
          const nutrient = NUTRIENT_BY_ID[id];
          if (!nutrient) return null;
          return <NutrientMeter key={id} nutrient={nutrient} amount={totals[id] ?? 0} />;
        })}
      </div>
    </div>
  );
}
