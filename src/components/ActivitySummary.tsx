import type { DailyActivity } from "../lib/calculations";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 min-w-[100px]">
      <div className="text-xl font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </div>
  );
}

export function ActivitySummary({ activity }: { activity: DailyActivity }) {
  return (
    <div
      className="rounded-xl border p-4 flex gap-4 flex-wrap"
      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
    >
      <StatTile label="Active minutes" value={String(activity.activeMinutes)} />
      <StatTile label="Calories burned" value={String(activity.caloriesBurned)} />
      <StatTile label="Sun minutes" value={String(activity.sunMinutes)} />
    </div>
  );
}
