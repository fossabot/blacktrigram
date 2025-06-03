// Combat mechanics types for Korean martial arts game

import type {
  TrigramStance,
  PlayerArchetype,
  DamageType,
  CombatState,
} from "./enums"; // Remove unused VitalPointCategory and VitalPointSeverity
import type { PlayerState } from "./player"; // Added for CombatAnalysis
import type { DamageRange, Position } from "./common";
import { StatusEffect } from "./effects"; // Remove unused VitalPointEffect
import { KoreanText } from "./korean-text";
import type { VitalPoint as AnatomyVitalPoint } from "./anatomy"; // Remove unused VitalPointLocation

export type CombatAttackType =
  | "strike"
  | "punch"
  | "kick"
  | "elbow_strike"
  | "knee_strike"
  | "grapple"
  | "throw"
  | "submission"
  | "pressure_point" // Main term for pressure-based attacks
  | "nerve_strike" // Main term for nerve-based attacks
  | "bone_strike"
  | "joint_lock"
  | "sweep"
  | "parry"
  | "block"
  | "dodge"
  | "counter_attack"
  | "counter" // Added for backward compatibility
  | "defense" // Added for backward compatibility
  | "special_technique"
  | "combo_sequence"
  | "environmental"
  | "weapon_based"
  | "mental_attack"
  | "cybernetic_attack"
  | "combination";

// Combat technique definition
export interface KoreanTechnique {
  readonly id: string;
  readonly name: string; // Often English name or internal key
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string;
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType;
  readonly damageType?: DamageType; // Added missing damageType property
  readonly damage?: number; // Base damage, if applicable directly
  readonly kiCost?: number;
  readonly staminaCost?: number;
  readonly damageRange?: DamageRange; // Added
  readonly executionTime?: number; // Added (e.g., in frames or ms)
  readonly recoveryTime?: number; // Added (e.g., in frames or ms)
  readonly accuracy?: number; // Base accuracy for the technique (0-1)
  readonly range?: number; // Effective range of the technique
  readonly effects?: readonly StatusEffect[]; // Status effects applied by technique
  readonly damageMultiplier?: number; // Damage multiplier for this technique
  readonly critMultiplier?: number; // Critical hit damage multiplier
  readonly critChance?: number; // Critical hit chance (0-1)
  readonly properties?: readonly string[]; // e.g., "unblockable", "armor_piercing"
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
  readonly vitalPoint?: AnatomyVitalPoint; // Made optional for non-vital hits
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

// Stance transition data (already defined in trigram.ts, consider if needed here or import)
// For now, keeping it distinct if combat system has its own view of transitions.
// export interface StanceTransition {
//   readonly from: TrigramStance;
//   readonly to: TrigramStance;
//   readonly cost: number; // Could be Ki, Stamina, or a combined metric
//   readonly duration: number; // Time in ms or game ticks
//   readonly effectiveness: number; // Modifier for next action after transition
// }

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
  readonly attackerId?: string; // Changed from attacker to attackerId
  readonly defenderId?: string; // Changed from defender to defenderId
  readonly techniqueId?: string; // Changed from technique to techniqueId
  readonly damage?: number;
  readonly resultText: KoreanText; // Changed from result to resultText for clarity
  readonly effectId?: string; // For effect_applied type
  readonly roundNumber?: number; // For round_end type
  readonly winnerId?: string; // For match_end type
}

export type { CombatState, DamageType } from "./enums";

// Attack input for combat system
export interface AttackInput {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly targetPoint?: AnatomyVitalPoint;
}
