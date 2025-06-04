// Korean Martial Arts Vital Points Data for Black Trigram

import type { VitalPoint } from "../anatomy";

// Export vital points data - this will be populated from KoreanVitalPoints.ts
export const VITAL_POINTS_CONSTANTS = {
  MAX_VITAL_POINTS: 70,
  CRITICAL_DAMAGE_THRESHOLD: 50,
  SEVERE_DAMAGE_THRESHOLD: 30,
  MODERATE_DAMAGE_THRESHOLD: 15,

  // Accuracy modifiers by vital point difficulty
  ACCURACY_MODIFIERS: {
    easy: 1.2,
    normal: 1.0,
    hard: 0.8,
    expert: 0.6,
  },

  // Damage multipliers by severity
  SEVERITY_MULTIPLIERS: {
    light: 1.0,
    moderate: 1.3,
    severe: 1.6,
    critical: 2.0,
  },
} as const;

// Re-export vital points from the main data source
export { VITAL_POINTS_DATA } from "../../systems/vitalpoint/KoreanVitalPoints";

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
  NECK: "neck",
  TORSO: "torso",
  LIMBS: "limbs",
  JOINTS: "joints",
  NERVE: "nerve",
  VASCULAR: "vascular",
  PRESSURE_POINT: "pressure_point",
} as const;

// Export severity levels
export const VITAL_POINT_SEVERITIES = {
  MINOR: "minor",
  MODERATE: "moderate",
  SEVERE: "severe",
  CRITICAL: "critical",
  LETHAL: "lethal",
} as const;

// Base damage values for vital points
export const VITAL_POINT_BASE_DAMAGE = {
  MINOR: 5,
  MODERATE: 15,
  SEVERE: 25,
  CRITICAL: 35,
  LETHAL: 50,
} as const;

// Damage multipliers for different body parts
export const VITAL_POINT_MULTIPLIERS = {
  HEAD: 1.8,
  NECK: 2.0,
  TORSO: 1.4,
  LIMBS: 1.0,
  JOINTS: 1.3,
  NERVE: 1.6,
  VASCULAR: 1.7,
  PRESSURE_POINT: 1.5,
} as const;
