import { NUTRIENTS } from "../data/nutrients";
import { classifyNutrient, type NutrientTotals } from "../lib/calculations";

const SEVERITY_ORDER = { critical: 0, serious: 1, warning: 2, good: 3, none: 4 };

const STATUS_COLOR: Record<string, string> = {
  critical: "var(--status-critical)",
  serious: "var(--status-serious)",
  warning: "var(--status-warning)",
};

export function FlaggedImbalances({ totals }: { totals: NutrientTotals }) {
  const flagged = NUTRIENTS.map((n) => ({
    nutrient: n,
    classification: classifyNutrient(n, totals[n.id] ?? 0),
  }))
    .filter((f) => f.classification.status === "critical" || f.classification.status === "serious")
    .sort(
      (a, b) => SEVERITY_ORDER[a.classification.status] - SEVERITY_ORDER[b.classification.status]
    );

  if (flagged.length === 0) {
    return (
      <div
        className="rounded-xl border p-4 flex items-center gap-2"
        style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
      >
        <span aria-hidden="true" style={{ color: "var(--status-good)" }}>
          ✓
        </span>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          No significant imbalances detected for this period.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
    >
      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        Flagged imbalances
      </h3>
      <ul className="space-y-1.5">
        {flagged.map(({ nutrient, classification }) => {
          const color = STATUS_COLOR[classification.status];
          const isHigh = classification.direction === "high";
          return (
            <li key={nutrient.id} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] shrink-0"
                style={{ background: color, color: "#fff" }}
              >
                {isHigh ? "▲" : "▼"}
              </span>
              <span style={{ color: "var(--text-primary)" }}>{nutrient.name}</span>
              <span style={{ color }}>
                {isHigh ? "elevated" : "low"}
                {classification.pct != null && ` (${Math.round(classification.pct)}%)`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
