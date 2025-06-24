/**
 * Anatomical and vital point system types
 */

import type { KoreanText, Position } from "./common";
import {
  EffectIntensity,
  PlayerArchetype,
  TrigramStance,
  VitalPointCategory,
  VitalPointEffectType,
  VitalPointSeverity,
} from "./enums";

// Define VitalPoint locally to avoid circular import
export interface VitalPoint {
  readonly id: string;
  readonly names: {
    readonly korean: string;
    readonly english: string;
    readonly romanized: string;
  };
  readonly position: Position;
  readonly category: VitalPointCategory;
  readonly severity: VitalPointSeverity;
  readonly baseDamage?: number;
  readonly effects: readonly VitalPointEffect[];
  readonly description: KoreanText;
  readonly targetingDifficulty: number;
  readonly effectiveStances: readonly TrigramStance[];
}

export interface VitalPointEffect {
  readonly id: string;
  readonly type: VitalPointEffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source?: string;
}

// Vital point effect
// Player archetype data
export interface PlayerArchetypeData {
  readonly id: string;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly baseHealth: number;
  readonly baseKi: number;
  readonly baseStamina: number;
  readonly coreStance: TrigramStance;
  readonly theme: {
    primary: number;
    secondary: number;
  };
  readonly colors: {
    primary: number;
    secondary: number;
  };
  readonly stats: {
    attackPower: number;
    defense: number;
    speed: number;
    technique: number;
  };
  readonly favoredStances: readonly TrigramStance[];
  readonly specialAbilities: readonly string[];
  readonly philosophy: KoreanText;
}

// Region data
export interface RegionData {
  readonly name: KoreanText;
  readonly boundaries: readonly Position[];
  readonly vitalPoints: readonly VitalPoint[];
  readonly vulnerabilities: readonly string[];
}

// Stance effectiveness matrix
export const TRIGRAM_EFFECTIVENESS: Record<
  TrigramStance,
  Partial<Record<TrigramStance, number>>
> = {
  [TrigramStance.GEON]: {
    [TrigramStance.GON]: 1.2,
    [TrigramStance.SON]: 0.8,
  },
  [TrigramStance.TAE]: {
    [TrigramStance.JIN]: 1.2,
    [TrigramStance.GAN]: 0.8,
  },
  [TrigramStance.LI]: {
    [TrigramStance.GAM]: 1.2,
    [TrigramStance.TAE]: 0.8,
  },
  [TrigramStance.JIN]: {
    [TrigramStance.SON]: 1.2,
    [TrigramStance.GEON]: 0.8,
  },
  [TrigramStance.SON]: {
    [TrigramStance.GON]: 1.2,
    [TrigramStance.LI]: 0.8,
  },
  [TrigramStance.GAM]: {
    [TrigramStance.LI]: 1.2,
    [TrigramStance.JIN]: 0.8,
  },
  [TrigramStance.GAN]: {
    [TrigramStance.TAE]: 1.2,
    [TrigramStance.GAM]: 0.8,
  },
  [TrigramStance.GON]: {
    [TrigramStance.GEON]: 1.2,
    [TrigramStance.SON]: 0.8,
  },
};

// Archetype preferred stances
export const ARCHETYPE_STANCES: Record<PlayerArchetype, TrigramStance[]> = {
  [PlayerArchetype.MUSA]: [TrigramStance.GEON, TrigramStance.GAN],
  [PlayerArchetype.AMSALJA]: [TrigramStance.SON, TrigramStance.GAM],
  [PlayerArchetype.HACKER]: [TrigramStance.LI, TrigramStance.JIN],
  [PlayerArchetype.JEONGBO_YOWON]: [TrigramStance.TAE, TrigramStance.GAN],
  [PlayerArchetype.JOJIK_POKRYEOKBAE]: [TrigramStance.JIN, TrigramStance.GON],
};
