// Game constants for Black Trigram Korean martial arts simulator

import type {
  DamageType,
  PlayerArchetype,
  TrigramStance as EnumTrigramStance,
  VitalPointCategory, // Added
  VitalPointSeverity, // Added
  EffectType, // Added
  EffectIntensity, // Added
} from "./enums";
import type { DamageRange } from "./common";
import type {
  VitalPoint,
  BodyRegion,
  AnatomicalLocation,
  VitalPointEffect,
} from "./anatomy";
import type { KoreanText as KoreanTextActual } from "./korean-text"; // Corrected import path
import type { PlayerArchetypeData } from "./player";

type TrigramStance = EnumTrigramStance;
type KoreanTextType = KoreanTextActual; // Use the imported KoreanText

// Korean color palette for martial arts theme
export const KOREAN_COLORS = {
  // Base colors
  WHITE: 0xffffff,
  BLACK: 0x000000,
  RED: 0xff0047, // Standard red - Ensure this is the one used, not KOREAN_COLORS.Red
  BLUE: 0x374151, // Dark blue-gray
  YELLOW: 0xffd700, // Gold yellow

  // Cyberpunk colors
  CYAN: 0x00ffff,
  SILVER: 0xc0c0c0,
  TRADITIONAL_RED: 0xdc143c, // Crimson red
  ELECTRIC_BLUE: 0x0eaefe,

  // Dojang theme colors
  DOJANG_BLUE: 0x2c4570, // Deep blue
  ACCENT_BLUE: 0x00d2ff, // Bright accent blue
  GOLD: 0xffd700,
  DARK_BLUE: 0x1e293b, // Very dark blue
  NEON_GREEN: 0x39ff14,

  // UI helper colors
  GRAY_DARK: 0x2d3748, // Dark gray for backgrounds
  GRAY_LIGHT: 0xa0aec0, // Light gray for text or disabled states
  CRITICAL_RED: 0xe53e3e, // Red for critical states/warnings
  ORANGE: 0xed8936, // Orange for warnings or medium states
  GREEN: 0x48bb78, // Green for success or positive states

  // Trigram stance colors
  geon: 0xffd700, // Gold
  tae: 0x87ceeb,
  li: 0xff4500,
  jin: 0x9370db,
  son: 0x98fb98,
  gam: 0x4169e1,
  gan: 0x8b4513,
  gon: 0x654321,
} as const;

// Korean font configuration
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";

// Font sizes for Korean text
export const KOREAN_FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  XLARGE: 32,
  TITLE: 48,
} as const;

// Combat constants (VALUES not TYPES)
export const COMBAT_CONSTANTS = {
  BASE_HEALTH: 100,
  BASE_KI: 100,
  BASE_STAMINA: 100,
  ROUND_TIME: 90,
  MAX_ROUNDS: 3,
  CRITICAL_THRESHOLD: 35,
  HEAVY_THRESHOLD: 25,
  MEDIUM_THRESHOLD: 15,
} as const;

// Eight Trigram stance order for UI display (팔괘 순서)
export const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

// Korean martial arts archetype order
export const ARCHETYPE_ORDER: readonly PlayerArchetype[] = [
  "musa",
  "amsalja",
  "hacker",
  "jeongbo",
  "jojik",
] as const;

// Korean technique damage ranges with proper type
export const KOREAN_TECHNIQUE_DAMAGE: Record<string, DamageRange> = {
  light_strike: { min: 15, max: 35, type: "blunt" as DamageType },
  medium_strike: { min: 10, max: 25, type: "blunt" as DamageType },
  vital_point: { min: 25, max: 50, type: "pressure" as DamageType },
  nerve_strike: { min: 5, max: 15, type: "nerve" as DamageType },
} as const;

// Stance effectiveness matrix for combat calculations
export const STANCE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  geon: {
    geon: 1.0,
    tae: 1.1,
    li: 0.9,
    jin: 1.2,
    son: 0.8,
    gam: 1.1,
    gan: 0.9,
    gon: 1.3,
  },
  tae: {
    geon: 0.9,
    tae: 1.0,
    li: 1.2,
    jin: 0.8,
    son: 1.1,
    gam: 0.9,
    gan: 1.3,
    gon: 0.8,
  },
  li: {
    geon: 1.1,
    tae: 0.8,
    li: 1.0,
    jin: 0.9,
    son: 1.3,
    gam: 0.8,
    gan: 1.1,
    gon: 0.9,
  },
  jin: {
    geon: 0.8,
    tae: 1.2,
    li: 1.1,
    jin: 1.0,
    son: 0.9,
    gam: 1.3,
    gan: 0.8,
    gon: 1.1,
  },
  son: {
    geon: 1.2,
    tae: 0.9,
    li: 0.7,
    jin: 1.1,
    son: 1.0,
    gam: 1.1,
    gan: 1.3,
    gon: 0.8,
  },
  gam: {
    geon: 0.9,
    tae: 1.1,
    li: 1.2,
    jin: 0.7,
    son: 0.9,
    gam: 1.0,
    gan: 1.1,
    gon: 1.3,
  },
  gan: {
    geon: 1.1,
    tae: 0.7,
    li: 0.9,
    jin: 1.2,
    son: 0.7,
    gam: 0.9,
    gan: 1.0,
    gon: 1.1,
  },
  gon: {
    geon: 0.7,
    tae: 1.2,
    li: 1.1,
    jin: 0.9,
    son: 1.2,
    gam: 0.7,
    gan: 0.9,
    gon: 1.0,
  },
} as const;

// Comprehensive vital points data for Korean martial arts (70 points)
// Ensure each object conforms to the VitalPoint interface from anatomy.ts
export const VITAL_POINTS_DATA: readonly VitalPoint[] = [
  // Head and neck vital points (머리와 목 급소)
  {
    id: "head_temple",
    name: { korean: "관자놀이", english: "Temple" } as KoreanTextType,
    korean: "관자놀이", // Added
    english: "Temple", // Added
    category: "head" as VitalPointCategory,
    description: {
      korean: "머리 측면의 약점",
      english: "Weak point on the side of the head",
    } as KoreanTextType,
    effects: [
      {
        id: "stun_temple_hit",
        type: "stun" as EffectType,
        duration: 5, // seconds or ticks
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "강한 기절",
          english: "Strong stun",
        } as KoreanTextType,
        stackable: false,
      },
    ] as readonly VitalPointEffect[], // This should be StatusEffect[] if VitalPointEffect is different
    location: {
      x: 0.15,
      y: 0.25,
      region: "head" as BodyRegion,
    } as AnatomicalLocation,
    severity: "critical" as VitalPointSeverity,
    technique: ["pressure", "striking"],
    baseAccuracy: 0.7, // Added
    baseDamage: 20, // Added
    baseStun: 3, // Added
    damageMultiplier: 1.5, // Added
  },
  {
    id: "neck_carotid",
    name: { korean: "경동맥", english: "Carotid Artery" } as KoreanTextType,
    korean: "경동맥", // Added
    english: "Carotid Artery", // Added
    category: "neck" as VitalPointCategory,
    description: {
      korean: "목의 주요 동맥",
      english: "Major artery in the neck",
    } as KoreanTextType,
    effects: [
      {
        id: "consciousness_loss_carotid",
        type: "consciousness_loss" as EffectType,
        duration: 10,
        intensity: "extreme" as EffectIntensity,
        description: {
          korean: "의식 상실",
          english: "Loss of consciousness",
        } as KoreanTextType,
        stackable: false,
      },
    ] as readonly VitalPointEffect[], // This should be StatusEffect[]
    location: {
      x: 0.12,
      y: 0.35,
      region: "neck" as BodyRegion,
    } as AnatomicalLocation,
    severity: "critical" as VitalPointSeverity,
    technique: ["pressure", "choking"],
    baseAccuracy: 0.6, // Added
    baseDamage: 10, // Added
    baseStun: 5, // Added
    damageMultiplier: 2.0, // Added
  },
  // Add remaining 68 points with all required fields...
  // Example for another point:
  {
    id: "solar_plexus",
    name: { korean: "명치", english: "Solar Plexus" } as KoreanTextType,
    korean: "명치", // Added
    english: "Solar Plexus", // Added
    category: "torso" as VitalPointCategory,
    description: {
      korean: "복부 중앙의 신경 다발",
      english: "Nerve cluster in the center of the abdomen",
    } as KoreanTextType,
    effects: [
      {
        id: "winded_solar_plexus",
        type: "winded" as EffectType,
        duration: 8,
        intensity: "strong" as EffectIntensity,
        description: {
          korean: "호흡 곤란",
          english: "Difficulty breathing",
        } as KoreanTextType,
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
        } as KoreanTextType,
        stackable: false,
      },
    ] as readonly VitalPointEffect[], // This should be StatusEffect[]
    location: {
      x: 0.5,
      y: 0.55,
      region: "abdomen" as BodyRegion,
    } as AnatomicalLocation,
    severity: "severe" as VitalPointSeverity,
    technique: ["striking", "pressure"],
    baseAccuracy: 0.75, // Added
    baseDamage: 25, // Added
    baseStun: 2, // Added
    damageMultiplier: 1.3, // Added
  },
] as const;

// Add missing configuration exports
export const GAME_CONFIG = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  ROUND_TIME: 90,
  MAX_ROUNDS: 3,
} as const;

export const COMBAT_CONFIG = {
  DAMAGE_MULTIPLIER: 1.0,
  CRITICAL_CHANCE: 0.1,
  BLOCK_REDUCTION: 0.5,
  VITAL_POINT_BONUS: 1.5,
} as const;

// Fix damage range definitions
export const DAMAGE_RANGES: Record<string, Omit<DamageRange, "type">> = {
  // Type is optional here if not always applicable
  light: { min: 5, max: 15 }, // Adjusted values to be more distinct
  medium: { min: 10, max: 25 },
  heavy: { min: 20, max: 40 },
  critical: { min: 30, max: 60 }, // Critical should be high
} as const;

export const MAX_PLAYER_HEALTH = 100;
export const MAX_PLAYER_STAMINA = 100;
export const MAX_PLAYER_KI = 100;

export const DEFAULT_GAME_SPEED = 1.0;
export const TARGET_FPS = 60;

export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 40;
export const MAX_TRANSITION_TIME_MILLISECONDS = 1500;
export const MIN_TRANSITION_EFFECTIVENESS = 0.2;

// Placeholder for PLAYER_ARCHETYPES_DATA
export const PLAYER_ARCHETYPES_DATA: Record<
  PlayerArchetype,
  PlayerArchetypeData
> = {
  musa: {
    name: { korean: "무사", english: "Musa" },
    description: { korean: "전통적인 전사", english: "Traditional Warrior" },
    bonuses: { damageResistance: 1.2 },
  },
  amsalja: {
    name: { korean: "암살자", english: "Amsalja" },
    description: { korean: "그림자 암살자", english: "Shadow Assassin" },
    bonuses: { stealthMultiplier: 1.8 },
  },
  hacker: {
    name: { korean: "해커", english: "Hacker" },
    description: { korean: "사이버 전사", english: "Cyber Warrior" },
    bonuses: { precisionAnalysis: 1.6 },
  },
  jeongbo: {
    name: { korean: "정보요원", english: "Jeongbo Yowon" },
    description: { korean: "정보 요원", english: "Intelligence Operative" },
    bonuses: { psychologicalWarfare: 1.5 },
  },
  jojik: {
    name: { korean: "조직폭력배", english: "Jojik Pokryeokbae" },
    description: { korean: "조직 폭력배", english: "Organized Crime" },
    bonuses: { dirtyFighting: 1.8 },
  },
};
