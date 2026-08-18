import { addDays, formatDateLabel, todayStr } from "../lib/date";

export type Period = "day" | "week";

export function DateBar({
  date,
  onDateChange,
  period,
  onPeriodChange,
}: {
  date: string;
  onDateChange: (d: string) => void;
  period: Period;
  onPeriodChange: (p: Period) => void;
}) {
  const isToday = date === todayStr();

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <button
          aria-label="Previous day"
          onClick={() => onDateChange(addDays(date, -1))}
          className="rounded-md px-2 py-1 text-sm"
          style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
        >
          &larr;
        </button>
        <span className="text-sm font-medium min-w-[110px] text-center" style={{ color: "var(--text-primary)" }}>
          {formatDateLabel(date)}
        </span>
        <button
          aria-label="Next day"
          disabled={isToday}
          onClick={() => onDateChange(addDays(date, 1))}
          className="rounded-md px-2 py-1 text-sm disabled:opacity-30"
          style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
        >
          &rarr;
        </button>
        {!isToday && (
          <button
            onClick={() => onDateChange(todayStr())}
            className="text-xs underline"
            style={{ color: "var(--series-blue)" }}
          >
            Jump to today
          </button>
        )}
      </div>

      <div className="flex rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        {(["day", "week"] as Period[]).map((p) => {
          const isActive = p === period;
          return (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className="px-3 py-1 text-xs font-medium"
              style={{
                background: isActive ? "var(--series-blue)" : "transparent",
                color: isActive ? "#fff" : "var(--text-secondary)",
              }}
            >
              {p === "day" ? "Selected day" : "7-day avg"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
