import { useMemo, useState } from "react";
import { Nav, type Tab } from "./components/Nav";
import { DateBar, type Period } from "./components/DateBar";
import { Dashboard } from "./components/Dashboard";
import { FoodLogForm } from "./components/FoodLogForm";
import { ExerciseLogForm } from "./components/ExerciseLogForm";
import { SunlightLogForm } from "./components/SunlightLogForm";
import { Settings } from "./components/Settings";
import { useStore } from "./store/useStore";
import { todayStr, lastNDays } from "./lib/date";
import { averageNutrientTotals, dailyActivity, dailyNutrientTotals } from "./lib/calculations";

function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [date, setDate] = useState(todayStr());
  const [period, setPeriod] = useState<Period>("day");

  const foodEntries = useStore((s) => s.foodEntries);
  const exerciseEntries = useStore((s) => s.exerciseEntries);
  const sunlightEntries = useStore((s) => s.sunlightEntries);
  const weightKg = useStore((s) => s.profile.weightKg);

  const totals = useMemo(() => {
    if (period === "day") return dailyNutrientTotals(date, foodEntries, sunlightEntries);
    return averageNutrientTotals(lastNDays(date, 7), foodEntries, sunlightEntries);
  }, [period, date, foodEntries, sunlightEntries]);

  const activity = useMemo(
    () => dailyActivity(date, exerciseEntries, sunlightEntries, weightKg),
    [date, exerciseEntries, sunlightEntries, weightKg]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Nutrient Tracker
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Food, sunlight & exercise — one place to spot imbalances
          </p>
        </div>
        <Nav active={tab} onChange={setTab} />
      </header>

      <DateBar date={date} onDateChange={setDate} period={period} onPeriodChange={setPeriod} />

      {tab === "dashboard" && <Dashboard totals={totals} activity={activity} />}
      {tab === "food" && <FoodLogForm date={date} />}
      {tab === "exercise" && <ExerciseLogForm date={date} />}
      {tab === "sunlight" && <SunlightLogForm date={date} />}
      {tab === "settings" && <Settings />}
    </div>
  );
}

export default App;
