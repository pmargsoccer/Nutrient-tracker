// Rough estimate of vitamin D synthesized from sun exposure. This is a
// simplification for personal tracking, not a clinical calculation — actual
// synthesis depends heavily on latitude, season, time of day, cloud cover,
// and skin type. Values are loosely based on commonly cited ranges (roughly
// 10,000-25,000 IU from ~20-30 min of substantial midday exposure for fair
// skin), scaled down for partial exposure and capped at a physiological
// saturation point.

export type SkinTone = "fair" | "medium" | "dark";
export type BodyExposure = "small" | "moderate" | "large";

const SKIN_TONE_FACTOR: Record<SkinTone, number> = {
  fair: 1,
  medium: 0.7,
  dark: 0.4,
};

const EXPOSURE_FACTOR: Record<BodyExposure, number> = {
  // face + hands
  small: 0.25,
  // arms + legs exposed (shorts + t-shirt)
  moderate: 0.6,
  // large surface area (swimwear)
  large: 1,
};

const IU_PER_MINUTE_BASELINE = 400; // at full exposure, full skin-tone factor
const SATURATION_CAP_IU = 20000;

export function estimateVitaminDFromSun(params: {
  minutes: number;
  skinTone: SkinTone;
  exposure: BodyExposure;
  usedSunscreen: boolean;
}): number {
  const { minutes, skinTone, exposure, usedSunscreen } = params;
  if (minutes <= 0) return 0;
  const sunscreenFactor = usedSunscreen ? 0.05 : 1;
  const raw =
    minutes *
    IU_PER_MINUTE_BASELINE *
    SKIN_TONE_FACTOR[skinTone] *
    EXPOSURE_FACTOR[exposure] *
    sunscreenFactor;
  return Math.round(Math.min(raw, SATURATION_CAP_IU));
}
