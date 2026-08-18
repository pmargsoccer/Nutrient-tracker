import { useMemo, useState } from "react";
import { FOODS, FOOD_BY_ID } from "../data/foods";
import { useStore } from "../store/useStore";
import type { FoodEntry } from "../types";
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

export function FoodLogForm({ date }: { date: string }) {
  const foodEntries = useStore((s) => s.foodEntries);
  const addFoodEntry = useStore((s) => s.addFoodEntry);
  const removeFoodEntry = useStore((s) => s.removeFoodEntry);

  const [query, setQuery] = useState("");
  const [foodId, setFoodId] = useState(FOODS[0].id);
  const [grams, setGrams] = useState<number>(FOODS[0].defaultServingG);

  const filtered = useMemo(
    () => FOODS.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const todaysEntries = useMemo(
    () => foodEntries.filter((e) => e.date === date).sort((a, b) => b.createdAt - a.createdAt),
    [foodEntries, date]
  );

  const selectedFood = FOOD_BY_ID[foodId];

  function handleFoodChange(id: string) {
    setFoodId(id);
    const f = FOOD_BY_ID[id];
    if (f) setGrams(f.defaultServingG);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFood || grams <= 0) return;
    addFoodEntry({ date, foodId, grams });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Log food
        </h3>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <label className={labelClass} style={labelStyle}>
              Search food
            </label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="e.g. salmon, oats, spinach…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_120px_auto] mt-3">
          <div>
            <label className={labelClass} style={labelStyle}>
              Food
            </label>
            <select
              className={inputClass}
              style={inputStyle}
              value={foodId}
              onChange={(e) => handleFoodChange(e.target.value)}
            >
              {filtered.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>
              Grams
            </label>
            <input
              type="number"
              min={1}
              className={inputClass}
              style={inputStyle}
              value={grams}
              onChange={(e) => setGrams(Number(e.target.value))}
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className={buttonPrimaryClass} style={buttonPrimaryStyle}>
              Add
            </button>
          </div>
        </div>
        {selectedFood && (
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Default serving: {selectedFood.servingLabel} (~{selectedFood.defaultServingG}g) &middot;{" "}
            {Math.round((selectedFood.per100g.energy ?? 0) * (grams / 100))} kcal for {grams}g
          </p>
        )}
      </form>

      <div className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Logged today
        </h3>
        {todaysEntries.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Nothing logged yet.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {todaysEntries.map((entry) => (
              <FoodEntryRow key={entry.id} entry={entry} onRemove={() => removeFoodEntry(entry.id)} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FoodEntryRow({ entry, onRemove }: { entry: FoodEntry; onRemove: () => void }) {
  const food = FOOD_BY_ID[entry.foodId];
  if (!food) return null;
  const kcal = Math.round((food.per100g.energy ?? 0) * (entry.grams / 100));
  return (
    <li className="flex items-center justify-between py-2 text-sm">
      <span style={{ color: "var(--text-primary)" }}>
        {food.name} <span style={{ color: "var(--text-muted)" }}>&middot; {entry.grams}g</span>
      </span>
      <span className="flex items-center gap-3">
        <span style={{ color: "var(--text-secondary)" }}>{kcal} kcal</span>
        <button
          onClick={onRemove}
          className={buttonGhostClass}
          style={{ color: "var(--status-critical)" }}
        >
          Remove
        </button>
      </span>
    </li>
  );
}
