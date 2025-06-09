// Korean martial arts anatomy system for precise vital point targeting

// Fix: Import enums as values to avoid conflicts
import {
  VitalPointCategory,
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
  BodyRegion,
  DamageType,
  TrigramStance,
} from "./enums";

import type {
  KoreanText,
  Position,
  StatusEffect,
  PlayerArchetype,
  TrigramStance,
} from "./index";

// Fix: Define DamageRange locally to avoid circular dependency
export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly average: number;
}

// Vital point definition with Korean martial arts terminology
export interface VitalPoint {
  readonly id: string;
  readonly korean: KoreanText;
  readonly english: string;
  readonly category: VitalPointCategory;
  readonly severity: VitalPointSeverity;
  readonly position?: Position;
  readonly damage?: DamageRange;
  readonly effects: readonly VitalPointEffect[];
  readonly name?: KoreanText; // Add missing name property
  readonly baseDamage?: number;
  readonly damageMultiplier?: number;
  readonly location?: Position;
  readonly region?: string;
  readonly type?: string;
  readonly precision?: boolean;
  readonly techniques?: readonly string[];
  readonly stunDuration?: number;
}

// Effects of striking vital points
export interface VitalPointEffect {
  readonly type: VitalPointEffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
  readonly id?: string;
  readonly stackable?: boolean;
  readonly source?: string;
  readonly chance?: number;
  readonly modifiers?: any[];
}

// Vital point hit result
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly vitalPoint?: VitalPoint;
  readonly effects: readonly VitalPointEffect[];
  readonly statusEffectsApplied?: readonly StatusEffect[];
  readonly effectiveness?: number;
  readonly severity: VitalPointSeverity;
}

// Fix: Remove duplicate enum declarations - use imports instead
export type { VitalPointCategory, VitalPointSeverity } from "./enums";

// Add missing types
export type AnatomicalRegion = {
  readonly id: string;
  readonly name: KoreanText;
  readonly vitalPoints: readonly VitalPoint[];
};

export type DamageResult = {
  readonly totalDamage: number;
  readonly vitalPointDamage: number;
  readonly effects: readonly StatusEffect[];
};

export type TransitionPath = {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
};

export type TrigramTransitionCost = {
  readonly ki: number;
  readonly stamina: number;
  readonly time: number;
};

export type TrigramTransitionRule = {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly allowed: boolean;
  readonly cost?: TrigramTransitionCost;
};

export type CombatReadiness = {
  readonly stance: TrigramStance;
  readonly ki: number;
  readonly stamina: number;
  readonly canTransition: boolean;
};

export const TRIGRAM_EFFECTIVENESS: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  [TrigramStance.GEON]: {
    [TrigramStance.GEON]: 1.0,
    [TrigramStance.TAE]: 1.2,
    [TrigramStance.LI]: 0.8,
    [TrigramStance.JIN]: 1.1,
    [TrigramStance.SON]: 0.9,
    [TrigramStance.GAM]: 1.3,
    [TrigramStance.GAN]: 0.7,
    [TrigramStance.GON]: 1.0,
  },
  // ...complete the matrix for all stances
};

export const ARCHETYPE_TRIGRAM_AFFINITY: Record<
  PlayerArchetype,
  readonly TrigramStance[]
> = {
  [PlayerArchetype.MUSA]: [TrigramStance.GEON, TrigramStance.GAN],
  [PlayerArchetype.AMSALJA]: [TrigramStance.SON, TrigramStance.GAM],
  [PlayerArchetype.HACKER]: [TrigramStance.LI, TrigramStance.JIN],
  [PlayerArchetype.JEONGBO_YOWON]: [TrigramStance.TAE, TrigramStance.GAN],
  [PlayerArchetype.JOJIK_POKRYEOKBAE]: [TrigramStance.JIN, TrigramStance.GON],
};

export const TRIGRAM_TRANSITIONS: readonly TrigramTransitionRule[] = [
  // Define all allowed transitions with costs
];

export type VitalPointSystemConfig = {
  readonly damageMultipliers: Record<VitalPointSeverity, number>;
  readonly effectDurations: Record<VitalPointEffectType, number>;
  readonly criticalThresholds: Record<VitalPointCategory, number>;
};
