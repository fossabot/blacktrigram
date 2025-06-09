// Korean vital points for Black Trigram (흑괘)
// Complete, culturally accurate, bilingual (Korean, English, Romanization)
import type { VitalPoint } from "../../types/anatomy";
import {
  VitalPointCategory,
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
} from "../../types/enums";

/**
 * Korean vital points (급소) definitions for authentic martial arts targeting
 */

export const KOREAN_VITAL_POINTS: readonly VitalPoint[] = [
  {
    id: "baekhoehoel",
    korean: { korean: "백회혈", english: "Crown Point" },
    english: "Crown Point",
    category: VitalPointCategory.NEUROLOGICAL,
    severity: VitalPointSeverity.CRITICAL,
    position: { x: 0, y: -50 },
    damage: { min: 40, max: 60, average: 50 },
    effects: [
      {
        type: VitalPointEffectType.UNCONSCIOUSNESS,
        intensity: EffectIntensity.HIGH,
        duration: 5000,
        description: {
          korean: "의식 잃음",
          english: "Loss of consciousness",
        },
      },
    ],
    baseDamage: 50,
    region: "head",
  },
  {
    id: "jungwan",
    korean: { korean: "중완", english: "Solar Plexus" },
    english: "Solar Plexus",
    category: VitalPointCategory.RESPIRATORY,
    severity: VitalPointSeverity.MAJOR,
    position: { x: 0, y: 0 },
    damage: { min: 25, max: 40, average: 32 },
    effects: [
      {
        type: VitalPointEffectType.BREATHLESSNESS,
        intensity: EffectIntensity.MEDIUM,
        duration: 3000,
        description: {
          korean: "호흡 곤란",
          english: "Breathing difficulty",
        },
      },
    ],
    baseDamage: 32,
    region: "torso",
  },
  {
    id: "ganhyeol",
    korean: { korean: "간혈", english: "Liver Point" },
    english: "Liver Point",
    category: VitalPointCategory.ORGAN,
    severity: VitalPointSeverity.MAJOR,
    position: { x: 30, y: 20 },
    damage: { min: 30, max: 45, average: 37 },
    effects: [
      {
        type: VitalPointEffectType.PAIN,
        intensity: EffectIntensity.HIGH,
        duration: 4000,
        description: {
          korean: "극심한 통증",
          english: "Severe pain",
        },
      },
    ],
    baseDamage: 37,
    region: "torso",
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
