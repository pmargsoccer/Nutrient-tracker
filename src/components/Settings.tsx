import { useState } from "react";
import { useStore } from "../store/useStore";
import { buttonPrimaryClass, buttonPrimaryStyle, cardClass, cardStyle, inputClass, inputStyle, labelClass, labelStyle } from "./ui";

export function Settings() {
  const weightKg = useStore((s) => s.profile.weightKg);
  const setProfile = useStore((s) => s.setProfile);
  const [value, setValue] = useState(weightKg);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value > 0) setProfile({ weightKg: value });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Profile
        </h3>
        <div className="max-w-xs">
          <label className={labelClass} style={labelStyle}>
            Body weight (kg)
          </label>
          <input
            type="number"
            min={1}
            className={inputClass}
            style={inputStyle}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Used to estimate calories burned during exercise.
          </p>
        </div>
        <button type="submit" className={`${buttonPrimaryClass} mt-3`} style={buttonPrimaryStyle}>
          Save
        </button>
      </form>

      <div className={cardClass} style={cardStyle}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          About the targets
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          RDA/UL values are general adult reference figures, and food nutrient values are
          approximate estimates. This app is for personal tracking and awareness, not medical
          advice — talk to a clinician about supplementation, especially for trace minerals like
          copper, zinc, and nickel where excess can be as harmful as deficiency.
        </p>
      </div>
    </div>
  );
}
