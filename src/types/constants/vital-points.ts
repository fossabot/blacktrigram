// Korean Martial Arts Vital Points Data for Black Trigram

import type { VitalPoint } from "../anatomy";

// Import vital points from the actual data file
export { VITAL_POINTS_DATA } from "../../systems/vitalpoint/KoreanAnatomy";

// Helper function to get vital point by ID
export function getVitalPointById(id: string): VitalPoint | undefined {
  // Dynamic import to avoid circular dependency
  return import("../../systems/vitalpoint/KoreanAnatomy").then(
    ({ VITAL_POINTS_DATA }) => VITAL_POINTS_DATA.find((vp) => vp.id === id)
  ) as any; // Type assertion for immediate use
}

// Export vital point categories for filtering
export const VITAL_POINT_CATEGORIES = {
  HEAD: "head",
  TORSO: "torso",
  LIMBS: "limbs",
  NERVE: "nerve",
  VASCULAR: "vascular",
  JOINTS: "joints",
} as const;

// Export severity levels
export const VITAL_POINT_SEVERITIES = {
  MINOR: "minor",
  MODERATE: "moderate",
  SEVERE: "severe",
  CRITICAL: "critical",
  LETHAL: "lethal",
} as const;
