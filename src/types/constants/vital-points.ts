/**
 * Korean vital points (급소) for martial arts targeting
 */

import { VitalPoint, VitalPointEffect } from "@/systems/vitalpoint";
import type { RegionData } from "../anatomy";
import {
  EffectIntensity,
  TrigramStance,
  VitalPointCategory,
  VitalPointEffectType,
  VitalPointSeverity,
} from "../enums";

// Korean vital points data
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
      } as VitalPointEffect,
    ],
    description: {
      korean: "머리 정수리의 중요 혈점",
      english: "Critical pressure point at crown of head",
    },
    targetingDifficulty: 0.9,
    effectiveStances: [TrigramStance.GEON, TrigramStance.LI, TrigramStance.JIN],

    // Optional properties for backwards compatibility
    korean: {
      korean: "백회혈",
      english: "Crown Point",
      romanized: "baekhoehoel",
    },
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
      korean: "인명",
      english: "People's Life",
      romanized: "inmyeong",
    },
    position: { x: 0, y: -10 },
    category: VitalPointCategory.NEUROLOGICAL,
    severity: VitalPointSeverity.MODERATE,
    baseDamage: 20,
    effects: [
      {
        id: "stun_effect",
        type: VitalPointEffectType.STUN,
        intensity: EffectIntensity.MEDIUM,
        duration: 2000,
        description: {
          korean: "일시적 기절",
          english: "Temporary stunning",
        },
        stackable: false,
      } as VitalPointEffect,
    ],
    description: {
      korean: "인중의 신경 집중 부위",
      english: "Nerve concentration area of philtrum",
    },
    targetingDifficulty: 0.6,
    effectiveStances: [TrigramStance.LI, TrigramStance.SON, TrigramStance.GAM],

    // Optional properties for backwards compatibility
    korean: {
      korean: "인명",
      english: "People's Life",
      romanized: "inmyeong",
    },
    english: "People's Life",
    anatomicalName: "Philtrum",
    radius: 8,
    damage: { min: 15, max: 25, average: 20 },
    difficulty: 0.6,
    requiredForce: 15,
    safetyWarning: "Can cause temporary unconsciousness",
  },
] as const;

// Vital point regions with proper type structure
export const VITAL_POINT_REGIONS: Record<string, RegionData> = {
  head: {
    name: { korean: "머리", english: "Head" },
    boundaries: [
      { x: -100, y: -100 },
      { x: 100, y: -100 },
      { x: 100, y: 50 },
      { x: -100, y: 50 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.position.y < 0),
    vulnerabilities: ["blunt", "pressure", "nerve"],
  },
  torso: {
    name: { korean: "몸통", english: "Torso" },
    boundaries: [
      { x: -80, y: 50 },
      { x: 80, y: 50 },
      { x: 80, y: 200 },
      { x: -80, y: 200 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.y >= 50 && vp.position.y <= 200
    ),
    vulnerabilities: ["blunt", "piercing", "pressure"],
  },
} as const;
