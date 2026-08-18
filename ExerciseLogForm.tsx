import { useMemo, useState } from "react";
import { EXERCISES, EXERCISE_BY_ID } from "../data/exercises";
import { useStore } from "../store/useStore";
import {
  buttonGhostClass,
  buttonPrimaryClass,
  buttonPrimaryStyle,
  cardClass,
  cardStyle,
  inputClass,
  inputStyle,
  labelClass,
  labelStyle,
} from "./ui";

export function ExerciseLogForm({ date }: { date: string }) {
  const exerciseEntries = useStore((s) => s.exerciseEntries);
  const addExerciseEntry = useStore((s) => s.addExerciseEntry);
  const removeExerciseEntry = useStore((s) => s.removeExerciseEntry);
  const weightKg = useStore((s) => s.profile.weightKg);

  const [exerciseId, setExerciseId] = useState(EXERCISES[0].id);
  const [minutes, setMinutes] = useState(30);

  const todaysEntries = useMemo(
    () =>
      exerciseEntries.filter((e) => e.date === date).sort((a, b) => b.createdAt - a.createdAt),
    [exerciseEntries, date]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (minutes <= 0) return;
    addExerciseEntry({ date, exerciseId, minutes });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Log exercise
        </h3>
        <div className="grid gap-3 sm:grid-cols-[1fr_120px_auto]">
          <div>
            <label className={labelClass} style={labelStyle}>
              Activity
            </label>
            <select
              className={inputClass}
              style={inputStyle}
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
            >
              {EXERCISES.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>
              Minutes
            </label>
            <input
              type="number"
              min={1}
              className={inputClass}
              style={inputStyle}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className={buttonPrimaryClass} style={buttonPrimaryStyle}>
              Add
            </button>
          </div>
        </div>
      </form>

      <div className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Logged today
        </h3>
        {todaysEntries.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No exercise logged yet.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {todaysEntries.map((entry) => {
              const ex = EXERCISE_BY_ID[entry.exerciseId];
              if (!ex) return null;
              const kcal = Math.round(ex.met * weightKg * (entry.minutes / 60));
              return (
                <li key={entry.id} className="flex items-center justify-between py-2 text-sm">
                  <span style={{ color: "var(--text-primary)" }}>
                    {ex.name} <span style={{ color: "var(--text-muted)" }}>&middot; {entry.minutes} min</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span style={{ color: "var(--text-secondary)" }}>{kcal} kcal</span>
                    <button
                      onClick={() => removeExerciseEntry(entry.id)}
                      className={buttonGhostClass}
                      style={{ color: "var(--status-critical)" }}
                    >
                      Remove
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
