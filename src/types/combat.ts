// Combat mechanics types for Korean martial arts game

import type {
  TrigramStance,
  PlayerArchetype,
  DamageType,
  CombatState,
  CombatAttackType as EnumCombatAttackType,
} from "./enums";
import type { PlayerState } from "./player";
import type { DamageRange, Position } from "./common";
import { StatusEffect } from "./effects";
import { KoreanText } from "./korean-text";
import type { VitalPoint as AnatomyVitalPoint } from "./anatomy";

// Use the enum type directly
export type CombatAttackType = EnumCombatAttackType;

// Combat technique definition
export interface KoreanTechnique {
  readonly id: string;
  readonly name: string;
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string;
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType;
  readonly damageType?: DamageType;
  readonly damage?: number;
  readonly kiCost?: number;
  readonly staminaCost?: number;
  readonly damageRange?: DamageRange;
  readonly executionTime?: number;
  readonly recoveryTime?: number;
  readonly accuracy?: number;
  readonly range?: number;
  readonly effects?: readonly StatusEffect[];
  readonly damageMultiplier?: number;
  readonly critMultiplier?: number;
  readonly critChance?: number;
  readonly properties?: readonly string[];
}

// Combat result from technique execution
export interface CombatResult {
  readonly damage: number;
  readonly damageType: DamageType;
  readonly isVitalPoint: boolean;
  readonly newState: CombatState;
  readonly effects: readonly StatusEffect[];
  readonly hit: boolean;
  readonly critical: boolean;
  readonly vitalPointsHit: readonly AnatomyVitalPoint[];
  readonly attacker: PlayerArchetype;
  readonly defender: PlayerArchetype;
  readonly damagePrevented: number;
  readonly staminaUsed: number;
  readonly kiUsed: number;
  readonly defenderDamaged: boolean;
  readonly attackerStance: TrigramStance;
  readonly defenderStance: TrigramStance;

  // Enhanced pain and consciousness system
  readonly painLevel: number;
  readonly consciousnessImpact: number;
  readonly balanceEffect: number;
  readonly bloodLoss: number;
  readonly stunDuration: number;
  readonly statusEffects: readonly StatusEffect[];
  readonly hitType: "miss" | "normal" | "critical" | "vital";
  readonly techniqueUsed: KoreanTechnique;
  readonly effectiveness: number;
  readonly hitPosition: Position;
  readonly vitalPoint?: AnatomyVitalPoint;
}

// Type alias for HitResult as requested by error messages
export type HitResult = CombatResult;

// Combat analysis for technique effectiveness
export interface CombatAnalysis {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly hitChance: number;
  readonly damageRange: { readonly min: number; readonly max: number };
  readonly advantages: readonly string[];
  readonly disadvantages: readonly string[];
}

// Combat event for logging
export interface CombatEvent {
  readonly timestamp: number;
  readonly type:
    | "attack"
    | "hit"
    | "block"
    | "dodge"
    | "stance_change"
    | "effect_applied"
    | "round_end"
    | "match_end";
  readonly attackerId?: string;
  readonly defenderId?: string;
  readonly techniqueId?: string;
  readonly damage?: number;
  readonly resultText: KoreanText;
  readonly effectId?: string;
  readonly roundNumber?: number;
  readonly winnerId?: string;
}

export type { CombatState, DamageType } from "./enums";

// Attack input for combat system
export interface AttackInput {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly targetVitalPoint?: string;
}
