export type Tab = "dashboard" | "food" | "exercise" | "sunlight" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "food", label: "Food" },
  { id: "exercise", label: "Exercise" },
  { id: "sunlight", label: "Sunlight" },
  { id: "settings", label: "Settings" },
];

export function Nav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="flex gap-1 overflow-x-auto">
      {TABS.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              background: isActive ? "var(--series-blue)" : "transparent",
              color: isActive ? "#fff" : "var(--text-secondary)",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
