import type {
  VitalPoint,
  Position,
  AnatomicalRegionIdentifier,
  VitalPointCategory,
  StatusEffect,
  // VitalPointEffect, // Unused
} from "../../types";

// Helper function to create VitalPoint objects with correct typing
function createVitalPoint(
  id: string,
  nameEnglish: string,
  koreanName: string,
  region: AnatomicalRegionIdentifier,
  position: Position,
  category: VitalPointCategory,
  descriptionKorean: string,
  descriptionEnglish: string,
  effects: StatusEffect[] = [],
  damageMultiplier: number,
  stunMultiplier: number = 0,
  accessibility: number = 0.7,
  critChanceBonus: number = 0,
  meridian?: string // This being optional is key for TS2375 with exactOptionalPropertyTypes
): VitalPoint {
  return {
    id,
    name: { english: nameEnglish, korean: koreanName },
    koreanName,
    region,
    position,
    category,
    description: { korean: descriptionKorean, english: descriptionEnglish },
    effects, // These should now match the simplified StatusEffect
    damageMultiplier,
    stunMultiplier,
    accessibility,
    critChanceBonus,
    meridian,
  };
}

export const KOREAN_VITAL_POINTS_DATA: VitalPoint[] = [
  createVitalPoint(
    "head_temple",
    "Temple",
    "관자놀이 (Gwanjanori)",
    "head",
    { x: 0.1, y: 0.8 },
    "primary",
    "머리 옆의 매우 취약한 지점.",
    "Highly vulnerable point on the side of the head.",
    [
      {
        type: "stun",
        duration: 5,
        chance: 0.7,
        magnitude: 1,
        source: "Temple Strike", // Matches updated StatusEffect
      },
    ],
    2.5,
    2.0,
    0.7,
    0.15,
    "Gallbladder"
  ),
  createVitalPoint(
    "neck_carotid",
    "Carotid Artery",
    "목동맥 (Mokdongmaek)",
    "neck",
    { x: 0.5, y: 0.5 },
    "secondary",
    "목의 주요 동맥으로, 타격 시 무력화될 수 있습니다.",
    "Major artery in the neck, strike can be incapacitating.",
    [
      {
        type: "debuff",
        duration: 10,
        chance: 0.4,
        magnitude: 5,
        source: "Carotid Strike", // Matches updated StatusEffect
      },
      {
        type: "debuff",
        duration: 8,
        chance: 0.8,
        magnitude: 1,
        source: "Carotid Strike", // Matches updated StatusEffect
      },
    ],
    2.0,
    1.5,
    0.6,
    0.2,
    "Stomach"
  ),
  createVitalPoint(
    "chest_solar_plexus",
    "Solar Plexus",
    "명치 (Myeongchi)",
    "chest",
    { x: 0.5, y: 0.3 },
    "primary",
    "흉골 아래 신경 다발로, 충격 시 호흡 곤란을 유발합니다.",
    "Nerve cluster below the sternum, impact causes breathlessness.",
    [
      {
        type: "debuff",
        duration: 6,
        chance: 0.9,
        magnitude: 1,
        source: "Solar Plexus Strike", // Matches updated StatusEffect
      },
    ],
    1.8,
    1.2,
    0.8,
    0.1,
    "Conception Vessel"
  ),
  // ... more vital points
];
