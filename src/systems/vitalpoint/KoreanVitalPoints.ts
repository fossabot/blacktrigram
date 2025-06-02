import { VitalPointEffect } from "@/types/anatomy";
import { EffectIntensity } from "@/types/enums";
import type {
  VitalPoint,
  KoreanText,
  EffectType,
  BodyRegion,
} from "../../types";

// Helper to create VitalPointEffect objects
function createEffect(
  id: string,
  type: EffectType,
  duration: number,
  intensity: EffectIntensity,
  descriptionKorean: string,
  descriptionEnglish: string,
  stackable: boolean = false
): VitalPointEffect {
  return {
    id,
    type,
    duration,
    intensity,
    description: {
      korean: descriptionKorean,
      english: descriptionEnglish,
    } as KoreanText,
    stackable,
  };
}

export const KOREAN_VITAL_POINTS: readonly VitalPoint[] = [
  {
    id: "KP001",
    name: { korean: "인중", english: "Philtrum" } as KoreanText,
    korean: "인중",
    english: "Philtrum",
    category: "head" as VitalPointCategory,
    description: {
      korean: "코와 윗입술 사이의 홈. 강타 시 심한 통증과 방향 감각 상실 유발.",
      english:
        "Groove between the nose and upper lip. Strong impact causes severe pain and disorientation.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP001_Effect1",
        "disorientation" as EffectType,
        10,
        "strong" as EffectIntensity,
        "방향 감각 상실",
        "Disorientation"
      ),
      createEffect(
        "KP001_Effect2",
        "pain_severe" as EffectType,
        15,
        "strong" as EffectIntensity,
        "극심한 통증",
        "Severe Pain"
      ),
    ],
    location: { x: 0.5, y: 0.15, region: "face_upper" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.65,
    baseDamage: 15,
    baseStun: 2,
    damageMultiplier: 1.6,
  },
  {
    id: "KP002",
    name: { korean: "명치", english: "Solar Plexus" } as KoreanText,
    korean: "명치",
    english: "Solar Plexus",
    category: "torso" as VitalPointCategory,
    description: {
      korean: "가슴 중앙 바로 아래. 강타 시 호흡 곤란 및 일시적 마비 유발.",
      english:
        "Just below the center of the chest. Strong impact causes difficulty breathing and temporary paralysis.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP002_Effect1",
        "winded" as EffectType,
        12,
        "extreme" as EffectIntensity,
        "호흡 곤란",
        "Winded"
      ),
      createEffect(
        "KP002_Effect2",
        "paralysis" as EffectType,
        5,
        "moderate" as EffectIntensity,
        "일시적 마비",
        "Temporary Paralysis",
        true
      ),
    ],
    location: { x: 0.5, y: 0.4, region: "solar_plexus" as BodyRegion }, // Updated region
    severity: "critical" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.75,
    baseDamage: 25,
    baseStun: 3,
    damageMultiplier: 1.8,
  },
  {
    id: "KP003",
    name: { korean: "오금", english: "Hollow of Knee" } as KoreanText,
    korean: "오금",
    english: "Hollow of Knee",
    category: "limbs" as VitalPointCategory,
    description: {
      korean: "무릎 뒤쪽 오목한 부분. 타격 시 다리 기능 상실 및 균형 잃음.",
      english:
        "Hollow area behind the knee. Impact causes loss of leg function and balance.",
    } as KoreanText,
    effects: [
      createEffect(
        "KP003_Effect1",
        "balance_loss" as EffectType,
        8,
        "strong" as EffectIntensity,
        "균형 상실",
        "Balance Loss"
      ),
      createEffect(
        "KP003_Effect2",
        "mobility_impairment" as EffectType,
        20,
        "severe" as EffectIntensity,
        "다리 기능 저하",
        "Leg Mobility Impairment"
      ),
    ],
    location: { x: 0.5, y: 0.75, region: "leg_back_knee" as BodyRegion },
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "kicking"],
    baseAccuracy: 0.7,
    baseDamage: 18,
    baseStun: 1,
    damageMultiplier: 1.5,
  },
  // ... more vital points
];
