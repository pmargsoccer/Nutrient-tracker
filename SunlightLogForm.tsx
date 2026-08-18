import { useMemo, useState } from "react";
import { estimateVitaminDFromSun, type BodyExposure, type SkinTone } from "../lib/sunlight";
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

const SKIN_TONES: { id: SkinTone; label: string }[] = [
  { id: "fair", label: "Fair" },
  { id: "medium", label: "Medium" },
  { id: "dark", label: "Dark" },
];

const EXPOSURES: { id: BodyExposure; label: string }[] = [
  { id: "small", label: "Face & hands" },
  { id: "moderate", label: "Arms & legs" },
  { id: "large", label: "Most of body" },
];

export function SunlightLogForm({ date }: { date: string }) {
  const sunlightEntries = useStore((s) => s.sunlightEntries);
  const addSunlightEntry = useStore((s) => s.addSunlightEntry);
  const removeSunlightEntry = useStore((s) => s.removeSunlightEntry);

  const [minutes, setMinutes] = useState(20);
  const [skinTone, setSkinTone] = useState<SkinTone>("medium");
  const [exposure, setExposure] = useState<BodyExposure>("moderate");
  const [usedSunscreen, setUsedSunscreen] = useState(false);

  const preview = estimateVitaminDFromSun({ minutes, skinTone, exposure, usedSunscreen });

  const todaysEntries = useMemo(
    () =>
      sunlightEntries.filter((e) => e.date === date).sort((a, b) => b.createdAt - a.createdAt),
    [sunlightEntries, date]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (minutes <= 0) return;
    addSunlightEntry({ date, minutes, skinTone, exposure, usedSunscreen });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Log sun exposure
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
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
          <div>
            <label className={labelClass} style={labelStyle}>
              Skin tone
            </label>
            <select
              className={inputClass}
              style={inputStyle}
              value={skinTone}
              onChange={(e) => setSkinTone(e.target.value as SkinTone)}
            >
              {SKIN_TONES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>
              Skin exposed
            </label>
            <select
              className={inputClass}
              style={inputStyle}
              value={exposure}
              onChange={(e) => setExposure(e.target.value as BodyExposure)}
            >
              {EXPOSURES.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <input
            type="checkbox"
            checked={usedSunscreen}
            onChange={(e) => setUsedSunscreen(e.target.checked)}
          />
          Wore sunscreen
        </label>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Estimated: ~{preview} IU vitamin D
          </p>
          <button type="submit" className={buttonPrimaryClass} style={buttonPrimaryStyle}>
            Add
          </button>
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          Rough estimate — actual synthesis varies with latitude, season, time of day, and cloud
          cover.
        </p>
      </form>

      <div className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Logged today
        </h3>
        {todaysEntries.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No sun exposure logged yet.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {todaysEntries.map((entry) => {
              const iu = estimateVitaminDFromSun(entry);
              return (
                <li key={entry.id} className="flex items-center justify-between py-2 text-sm">
                  <span style={{ color: "var(--text-primary)" }}>
                    {entry.minutes} min{" "}
                    <span style={{ color: "var(--text-muted)" }}>
                      &middot; {entry.skinTone} skin &middot; {entry.exposure} exposure
                      {entry.usedSunscreen ? " · sunscreen" : ""}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span style={{ color: "var(--text-secondary)" }}>~{iu} IU</span>
                    <button
                      onClick={() => removeSunlightEntry(entry.id)}
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
