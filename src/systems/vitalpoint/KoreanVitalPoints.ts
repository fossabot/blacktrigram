// Korean vital points for Black Trigram (흑괘)
// Complete, culturally accurate, bilingual (Korean, English, Romanization)
import { EffectIntensity } from "@/types";
import {
  TrigramStance,
  VitalPointCategory,
  VitalPointEffectType,
  VitalPointSeverity,
} from "../../types/common";
import { VitalPoint } from "./types";

/**
 * Korean vital points (급소) definitions for authentic martial arts targeting
 */

export const KOREAN_VITAL_POINTS: readonly VitalPoint[] = [
  {
    id: "baekhoehoel",
    names: {
      korean: "백회혈",
      english: "Crown Point",
      romanized: "baekhoehoel",
    },
    position: { x: 0, y: -50 },
    category: VitalPointCategory.NEUROLOGICAL,
    severity: VitalPointSeverity.CRITICAL,
    baseDamage: 50,
    effects: [
      {
        id: "unconsciousness_effect",
        type: VitalPointEffectType.UNCONSCIOUSNESS,
        intensity: EffectIntensity.HIGH,
        duration: 5000,
        description: {
          korean: "의식 잃음",
          english: "Loss of consciousness",
        },
        stackable: false,
        source: "vital_point_system",
      },
    ],
    description: {
      korean: "머리 정수리의 중요 혈점",
      english: "Critical pressure point at crown of head",
    },
    targetingDifficulty: 0.9,
    effectiveStances: [TrigramStance.GEON, TrigramStance.LI, TrigramStance.JIN],

    // Backwards compatibility properties
    korean: { korean: "백회혈", english: "Crown Point" },
    english: "Crown Point",
    anatomicalName: "Anterior Fontanelle",
    radius: 15,
    damage: { min: 40, max: 60, average: 50 },
    difficulty: 0.9,
    requiredForce: 30,
    safetyWarning: "Extremely dangerous - can cause death",
  },
  {
    id: "inmyeong",
    names: {
      korean: "인영",
      english: "Man's Welcome",
      romanized: "inmyeong",
    },
    position: { x: -30, y: 70 },
    category: VitalPointCategory.VASCULAR,
    severity: VitalPointSeverity.MAJOR,
    baseDamage: 32,
    effects: [
      {
        id: "breathlessness_effect",
        type: VitalPointEffectType.BREATHLESSNESS,
        intensity: EffectIntensity.MEDIUM,
        duration: 3000,
        description: {
          korean: "호흡 곤란",
          english: "Breathing difficulty",
        },
        stackable: false,
        source: "vital_point_system",
      },
    ],
    description: {
      korean: "목 옆의 중요 혈관",
      english: "Critical blood vessel on side of neck",
    },
    targetingDifficulty: 0.7,
    effectiveStances: [TrigramStance.SON, TrigramStance.GAM, TrigramStance.TAE],

    // Backwards compatibility properties
    korean: { korean: "인영", english: "Man's Welcome" },
    english: "Man's Welcome",
    anatomicalName: "Carotid Artery",
    radius: 20,
    damage: { min: 25, max: 40, average: 32 },
    difficulty: 0.7,
    requiredForce: 20,
    safetyWarning: "Can cause unconsciousness",
  },
  {
    id: "myeongmun",
    names: {
      korean: "명문",
      english: "Gate of Life",
      romanized: "myeongmun",
    },
    position: { x: 0, y: 250 },
    category: VitalPointCategory.NEUROLOGICAL,
    severity: VitalPointSeverity.MAJOR,
    baseDamage: 40,
    effects: [
      {
        id: "severe_pain_effect",
        type: VitalPointEffectType.PAIN,
        intensity: EffectIntensity.HIGH,
        duration: 4000,
        description: {
          korean: "극심한 통증",
          english: "Severe pain",
        },
        stackable: false,
        source: "vital_point_system",
      },
    ],
    description: {
      korean: "등 아래쪽의 중요 혈점",
      english: "Critical point on lower back",
    },
    targetingDifficulty: 0.8,
    effectiveStances: [
      TrigramStance.GAN,
      TrigramStance.GON,
      TrigramStance.GEON,
    ],

    // Backwards compatibility properties
    korean: { korean: "명문", english: "Gate of Life" },
    english: "Gate of Life",
    anatomicalName: "L2-L3 Vertebrae",
    radius: 25,
    damage: { min: 30, max: 50, average: 40 },
    difficulty: 0.8,
    requiredForce: 25,
    safetyWarning: "Can cause temporary paralysis",
  },
] as const;

export const getVitalPointsByCategory = (
  category: VitalPointCategory
): VitalPoint[] => {
  return KOREAN_VITAL_POINTS.filter((vp) => vp.category === category);
};

export const getVitalPointsByRegion = (region: string): VitalPoint[] => {
  return KOREAN_VITAL_POINTS.filter((vp) => vp.region === region);
};

export const getVitalPointById = (id: string): VitalPoint | undefined => {
  return KOREAN_VITAL_POINTS.find((vp) => vp.id === id);
};

/**
 * Get vital points that are most effective with a specific trigram stance
 */
export const getVitalPointsByStance = (stance: TrigramStance): VitalPoint[] => {
  return KOREAN_VITAL_POINTS.filter((vp) =>
    vp.effectiveStances.includes(stance)
  );
};

/**
 * Get vital points by targeting difficulty range
 */
export const getVitalPointsByDifficulty = (
  minDifficulty: number,
  maxDifficulty: number
): VitalPoint[] => {
  return KOREAN_VITAL_POINTS.filter(
    (vp) =>
      vp.targetingDifficulty >= minDifficulty &&
      vp.targetingDifficulty <= maxDifficulty
  );
};

/**
 * Get vital points by severity level
 */
export const getVitalPointsBySeverity = (
  severity: VitalPointSeverity
): VitalPoint[] => {
  return KOREAN_VITAL_POINTS.filter((vp) => vp.severity === severity);
};

export default KOREAN_VITAL_POINTS;
