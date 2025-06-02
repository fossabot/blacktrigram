// filepath: /workspaces/blacktrigram/src/types/constants/vital-points.ts
// Anatomical vital points data for Black Trigram
import type {
  VitalPointCategory,
  VitalPointSeverity,
  EffectType,
  EffectIntensity,
  BodyRegion,
} from "../enums";
import type {
  VitalPoint,
  VitalPointEffect,
  AnatomicalLocation,
} from "../anatomy";
import type { KoreanText } from "../korean-text";
// This type import is problematic as it's from a component, consider moving KoreanTextType to types
// import { KoreanTextType } from "@/components/ui/base/korean-text";

// Define KoreanTextType locally or import from a shared type definition if available
// For now, using KoreanText as a placeholder for KoreanTextType where it was used.
// It's recommended to resolve this type issue for better type safety.

export const VITAL_POINTS_DATA: readonly VitalPoint[] = [
  // Head and neck vital points (머리와 목 급소)
  {
    id: "head_temple",
    name: { korean: "관자놀이", english: "Temple" } as KoreanText, // Was KoreanTextType
    korean: "관자놀이",
    english: "Temple",
    category: "head" as VitalPointCategory,
    description: {
      korean: "머리 측면의 약점",
      english: "Weak point on the side of the head",
    } as KoreanText, // Was KoreanTextType
    effects: [
      {
        id: "stun_temple_hit",
        type: "stun" as EffectType,
        duration: 5, // seconds or ticks
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "강한 기절",
          english: "Strong stun",
        } as KoreanText, // Was KoreanTextType
        stackable: false,
      },
    ] as readonly VitalPointEffect[],
    location: {
      x: 0.15,
      y: 0.25,
      region: "head" as BodyRegion,
    } as AnatomicalLocation,
    severity: "critical" as VitalPointSeverity,
    technique: ["pressure", "striking"], // Added missing technique property
    baseAccuracy: 0.7,
    baseDamage: 20,
    baseStun: 3, // Not in VitalPoint interface
    damageMultiplier: 1.5, // Not in VitalPoint interface
  },
  {
    id: "neck_carotid",
    name: { korean: "경동맥", english: "Carotid Artery" } as KoreanText, // Was KoreanTextType
    korean: "경동맥",
    english: "Carotid Artery",
    category: "neck" as VitalPointCategory,
    description: {
      korean: "목의 주요 동맥",
      english: "Major artery in the neck",
    } as KoreanText, // Was KoreanTextType
    effects: [
      {
        id: "consciousness_loss_carotid",
        type: "consciousness_loss" as EffectType,
        duration: 10,
        intensity: "extreme" as EffectIntensity,
        description: {
          korean: "의식 상실",
          english: "Loss of consciousness",
        } as KoreanText, // Was KoreanTextType
        stackable: false,
      },
    ] as readonly VitalPointEffect[],
    location: {
      x: 0.12,
      y: 0.35,
      region: "neck" as BodyRegion,
    } as AnatomicalLocation,
    severity: "critical" as VitalPointSeverity,
    technique: ["pressure", "choking"], // Added missing technique property
    baseAccuracy: 0.6,
    baseDamage: 10,
    baseStun: 5, // Not in VitalPoint interface
    damageMultiplier: 2.0, // Not in VitalPoint interface
  },
  {
    id: "solar_plexus",
    name: { korean: "명치", english: "Solar Plexus" } as KoreanText, // Was KoreanTextType
    korean: "명치",
    english: "Solar Plexus",
    category: "torso" as VitalPointCategory,
    description: {
      korean: "복부 중앙의 신경 다발",
      english: "Nerve cluster in the center of the abdomen",
    } as KoreanText, // Was KoreanTextType
    effects: [
      {
        id: "winded_solar_plexus",
        type: "winded" as EffectType,
        duration: 8,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "호흡 곤란",
          english: "Difficulty breathing",
        } as KoreanText, // Was KoreanTextType
        stackable: true,
      },
      {
        id: "pain_solar_plexus",
        type: "pain_severe" as EffectType,
        duration: 15,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "극심한 고통",
          english: "Severe pain",
        } as KoreanText, // Was KoreanTextType
        stackable: false,
      },
    ] as readonly VitalPointEffect[],
    location: {
      x: 0.5,
      y: 0.55,
      region: "abdomen" as BodyRegion,
    } as AnatomicalLocation,
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "pressure"], // Added missing technique property
    baseAccuracy: 0.75,
    baseDamage: 25,
    baseStun: 2, // Not in VitalPoint interface
    damageMultiplier: 1.3, // Not in VitalPoint interface
  },
  // ... (rest of the 67 vital points should be added here, ensuring they conform to VitalPoint)
] as const;
