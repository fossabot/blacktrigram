/**
 * Korean vital points (급소) for martial arts targeting
 */

import type { VitalPoint, RegionData } from "../anatomy";
import type { KoreanText, Position } from "../index";
import {
  VitalPointCategory,
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
} from "../enums";

// Korean vital points data
export const KOREAN_VITAL_POINTS: readonly VitalPoint[] = [
  {
    id: "baekhoehoel",
    korean: {
      korean: "백회혈",
      english: "Crown Point",
      romanized: "baekhoehoel",
    },
    anatomicalName: "Anterior Fontanelle",
    category: VitalPointCategory.NEUROLOGICAL,
    severity: VitalPointSeverity.CRITICAL,
    position: { x: 0, y: -50 },
    radius: 15,
    effects: [
      {
        type: VitalPointEffectType.UNCONSCIOUSNESS,
        intensity: EffectIntensity.HIGH, // Fix: Use proper enum value
        duration: 5000,
        description: {
          korean: "의식 잃음",
          english: "Loss of consciousness",
        },
      },
    ],
    damage: { min: 40, max: 60, average: 50 },
    description: {
      korean: "머리 정수리의 중요 혈점",
      english: "Critical pressure point at crown of head",
    },
    difficulty: 0.9,
    requiredForce: 30,
    safetyWarning: "Extremely dangerous - can cause death",
  },
  // ...existing vital points with proper enum values...
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
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.y < 0 // Filter by position instead of non-existent location
    ),
    vulnerabilities: ["blunt", "pressure", "nerve"],
  },
  // ...existing regions with proper structure...
} as const;
