# Nutrient Tracker

Track food, sun exposure, and exercise to see where your macro- and
micronutrient intake is running low or high — including trace minerals like
copper, zinc, and nickel.

## Running it

```
npm install
npm run dev
```

Everything is stored locally in your browser (`localStorage`) — no backend,
no account.

## How it works

- **Log food** from a seeded database of ~40 common foods (per-100g nutrient
  values). Logging an entry adds that food's macros, vitamins, and minerals
  to the day's totals.
- **Log sun exposure** (minutes, skin tone, how much skin was exposed,
  sunscreen) to get a rough vitamin D contribution alongside food sources.
- **Log exercise** (activity + duration) to see active minutes and estimated
  calories burned for the day.
- **Dashboard** shows every tracked nutrient as a meter against its RDA (or,
  for nutrients like nickel with no official RDA, against the tolerable
  upper limit), color-coded low/on-track/elevated/over-limit, plus a
  "Flagged imbalances" summary. Toggle between a single day and a 7-day
  average to smooth out day-to-day noise.

## Extending the nutrient list

Everything nutrient-related is data-driven from one file:
`src/data/nutrients.ts`. To track a new nutrient, add one entry there
(id, unit, category, RDA and/or UL) — the dashboard, food form, and
imbalance detector all pick it up automatically. Add matching values to
foods in `src/data/foods.ts` where relevant.

## Caveats

Food nutrient values and the sunlight vitamin D estimate are approximate,
compiled for personal awareness — not lab-verified and not medical advice.
