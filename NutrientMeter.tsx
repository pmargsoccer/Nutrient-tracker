import type { NutrientDef } from "../data/nutrients";
import { classifyNutrient, type NutrientStatus } from "../lib/calculations";

const STATUS_COLOR: Record<NutrientStatus, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
  none: "var(--text-muted)",
};

const STATUS_ICON: Record<NutrientStatus, string> = {
  good: "✓",
  warning: "▲",
  serious: "▲",
  critical: "✕",
  none: "–",
};

function statusLabel(
  status: NutrientStatus,
  direction: "low" | "high" | "ok" | "none",
  wellAboveTarget: boolean
): string {
  if (status === "good") return wellAboveTarget ? "Above target (safe)" : "On track";
  if (status === "none") return "No target set";
  if (direction === "high") {
    return status === "critical" ? "Over limit" : "Elevated";
  }
  return status === "critical" ? "Very low" : status === "serious" ? "Low" : "Slightly low";
}

function formatAmount(amount: number, unit: string): string {
  const decimals = amount < 10 ? 1 : 0;
  return `${amount.toFixed(decimals)} ${unit}`;
}

export function NutrientMeter({ nutrient, amount }: { nutrient: NutrientDef; amount: number }) {
  const { status, pct, direction } = classifyNutrient(nutrient, amount);
  const color = STATUS_COLOR[status];
  const icon = STATUS_ICON[status];

  const usingUlOnly = nutrient.rda == null && nutrient.ul != null;
  const wellAboveTarget = status === "good" && direction === "ok" && (pct ?? 0) > 150 && !usingUlOnly;
  const label = statusLabel(status, direction, wellAboveTarget);

  // Once comfortably past the target, the more useful number is how much
  // headroom remains before the safe upper limit (when one is defined).
  const secondaryPct =
    wellAboveTarget && nutrient.ul != null ? (amount / nutrient.ul) * 100 : pct;
  const secondaryLabel = usingUlOnly || (wellAboveTarget && nutrient.ul != null) ? "safe limit" : "target";

  const scaleMax = 200;
  const fillPct = pct == null ? 0 : Math.min(pct, scaleMax);
  const targetTick = usingUlOnly ? 100 : nutrient.rda != null ? 100 : null;

  return (
    <div className="py-2.5">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {nutrient.name}
        </span>
        <span className="text-xs tabular-nums" style={{ color: "var(--text-secondary)" }}>
          {formatAmount(amount, nutrient.unit)}
          {nutrient.rda != null && (
            <span style={{ color: "var(--text-muted)" }}> / {nutrient.rda}{nutrient.unit}</span>
          )}
        </span>
      </div>

      <div
        className="relative h-2.5 rounded-full overflow-hidden"
        style={{ background: "var(--border)" }}
        role="meter"
        aria-label={`${nutrient.name}: ${label}`}
        aria-valuenow={pct ?? undefined}
        aria-valuemin={0}
        aria-valuemax={scaleMax}
      >
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${(fillPct / scaleMax) * 100}%`, background: color }}
        />
        {targetTick != null && (
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(targetTick / scaleMax) * 100}%`, background: "var(--border-strong)" }}
          />
        )}
      </div>

      <div className="flex items-center gap-1 mt-1">
        <span aria-hidden="true" className="text-[10px] leading-none" style={{ color }}>
          {icon}
        </span>
        <span className="text-xs" style={{ color }}>
          {label}
        </span>
        {secondaryPct != null && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            &middot; {Math.round(secondaryPct)}% of {secondaryLabel}
          </span>
        )}
        {nutrient.note && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }} title={nutrient.note}>
            &middot; note
          </span>
        )}
      </div>
    </div>
  );
}
