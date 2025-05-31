// Types related to combat mechanics, damage, and techniques

import type { Position, TrilingualName } from "./common";
import type { AttackType, DamageType, TrigramStance } from "./enums";
import type { StatusEffect, Condition } from "./effects";
import type { VitalPoint } from "./anatomy";
import type { PlayerState } from "./player";

export interface CollisionZone {
  readonly center: Position;
  readonly shape: "circle" | "rectangle";
  readonly radius?: number;
  readonly width?: number;
  readonly height?: number;
}

export interface HitDetectionParams {
  readonly attackPosition: Position;
  readonly attackType: AttackType;
  readonly accuracy: number;
  readonly baseDamage: number;
  readonly attackerSkill: number;
  readonly defenderGuard: number;
}

export interface VitalPointHit {
  readonly hit: boolean;
  readonly vitalPoint: VitalPoint;
  readonly damage: number;
  readonly critical: boolean;
  readonly description: string;
  readonly effectiveness?: number;
  readonly effectsApplied?: StatusEffect[];
}

export interface DamageResult {
  readonly damage: number;
  readonly baseDamage: number;
  readonly isCritical: boolean;
  readonly vitalPointHit: VitalPointHit | null;
  readonly modifiers: readonly string[];
  readonly description: string;
  readonly damageType: DamageType;
  koreanName?: string;
  vitalPointName?: TrilingualName;
  readonly vitalPointBonus?: number;
  readonly meridianMultiplier?: number;
}

export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type:
    | "light"
    | "medium"
    | "heavy"
    | "critical"
    | "block"
    | "damage"
    | "miss";
  readonly damage: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean?: string;
  readonly color: number;
  readonly createdAt: number;
}

export interface KoreanTechnique {
  name: string; // Internal or English name
  koreanName: string;
  englishName: string;
  description: { korean: string; english: string };
  kiCost: number;
  staminaCost: number;
  range: number; // Effective range of the technique
  accuracy: number; // Base accuracy
  stance: TrigramStance; // Required stance
  damage: number; // Base damage
  type: AttackType;
  effects?: StatusEffect[]; // Potential status effects
  critChance?: number;
  critMultiplier?: number;
  properties?: string[]; // e.g., "unblockable", "piercing"
  accuracyModifier?: number;
  stunValue?: number;
}

export interface CombatResult {
  success: boolean; // Overall success of the combat action
  damage: number; // Total damage dealt
  technique: KoreanTechnique; // Technique used
  hitType: string; // e.g., "direct_hit", "glancing_blow", "vital_point_strike"
  message: string; // Descriptive message of the outcome
  damageDealt?: number; // Alias for damage
  attackerState?: PlayerState; // State of attacker post-action
  defenderState?: PlayerState; // State of defender post-action
  log?: string[]; // Combat log entries for this event
  conditionsApplied?: Condition[]; // Conditions applied as a result
}

export interface AttackResult {
  hit: boolean;
  damage: number;
  critical: boolean;
  blocked: boolean;
  conditionsApplied: Condition[];
  attackerState: PlayerState; // Updated attacker state
  defenderState: PlayerState; // Updated defender state
  description: string; // Description of the attack outcome
}
