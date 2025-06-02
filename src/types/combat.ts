// Combat mechanics types for Korean martial arts game

import type {
  TrigramStance,
  // DamageType as EnumDamageType, // Already aliased below
  PlayerArchetype,
} from "./enums"; // Changed to import from enums
import type { PlayerState } from "./player"; // Added for CombatAnalysis
import type { DamageRange } from "./common"; // Added KoreanText
import { StatusEffect } from "./effects";
import { KoreanText } from "./korean-text";

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
  // Consider adding other relevant properties like:
  // readonly properties?: readonly string[]; // e.g., "unblockable", "armor_piercing"
}

// Combat result from technique execution
export interface CombatResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly isVitalPoint: boolean;
  readonly vitalPointsHit: readonly string[];
  readonly techniqueUsed: KoreanTechnique; // Should store the technique object
  readonly effectiveness: number;
  readonly stunDuration: number;
  readonly bloodLoss: number;
  readonly painLevel: number;
  readonly consciousnessImpact: number;
  readonly balanceEffect: number;
  readonly statusEffects: readonly StatusEffect[]; // All effects resulting from the hit (technique + vital point)
  // readonly effects?: readonly StatusEffect[]; // Removed redundant field
  readonly hitType:
    | "normal"
    | "vital"
    | "critical"
    | "miss"
    | "blocked"
    | "dodged";
  readonly description?: string; // Optional narrative description of the result
  readonly effects: readonly StatusEffect[];
  readonly attacker: PlayerArchetype;
  readonly defender: PlayerArchetype;
  readonly damagePrevented: number;
  readonly staminaUsed: number;
  readonly kiUsed: number;
  readonly defenderDamaged: boolean;
  readonly attackerStance: TrigramStance;
  readonly defenderStance: TrigramStance;
  readonly hitPosition?: { x: number; y: number };
  readonly isCritical?: boolean;
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
