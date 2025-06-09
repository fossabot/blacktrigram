// Korean martial arts combat system types

import type {
  TrigramStance,
  PlayerArchetype,
  DamageType,
  CombatState as CombatStateEnum,
  StatusEffect,
  Position,
  VitalPoint,
  KoreanText,
  EffectIntensity,
} from "./index";

// Fix CombatAttackType to use enum
export type CombatAttackType = EnumCombatAttackType;
export enum EnumCombatAttackType {
  STRIKE = "strike",
  KICK = "kick",
  GRAPPLE = "grapple",
  THROW = "throw",
  PRESSURE_POINT = "pressure_point",
  JOINT_LOCK = "joint_lock",
  THRUST = "thrust", // Fix: Add missing THRUST
}

export interface KoreanTechnique {
  readonly id: string;
  readonly name: KoreanText;
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string;
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType;
  readonly damageType: DamageType;
  readonly damageRange: DamageRange;
  readonly range: number;
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly accuracy: number;
  readonly executionTime: number;
  readonly recoveryTime: number;
  readonly critChance?: number;
  readonly critMultiplier?: number;
  readonly effects?: readonly StatusEffect[];
  readonly properties?: readonly string[];
  readonly targetAreas?: readonly string[];
  // Fix: Add compatibility properties
  readonly damage?: number;
}

export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly type?: DamageType;
}

export interface CombatResult {
  readonly success: boolean;
  readonly damage: number;
  readonly effects: readonly string[];
  readonly criticalHit: boolean;
  readonly vitalPointHit: boolean;
  readonly hit?: boolean;
  readonly updatedAttacker?: PlayerState;
  readonly updatedDefender?: PlayerState;
  readonly message?: KoreanText;
  // Fix: Add missing properties
  readonly updatedPlayers?: readonly PlayerState[];
  readonly winner?: number;
}

// Add missing PlayerState import and properties
import type { PlayerState } from "./player";
