// Combat mechanics types for Korean martial arts game

import type { TrigramStance, DamageType as EnumDamageType } from "./enums"; // Changed to import from enums
import type { KoreanText } from "./korean-text";
import type { StatusEffect } from "./effects";
import type { PlayerState } from "./player"; // Added for CombatAnalysis

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
  | "special_technique"
  | "combo_sequence"
  | "environmental"
  | "weapon_based"
  | "mental_attack"
  | "cybernetic_attack"
  | "combination";
// Removed redundant: "elbow", "pressure", "nerve"

// Combat technique definition
export interface KoreanTechnique {
  readonly id: string;
  readonly name: string; // Internal name/key, can be same as id
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string;
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType;
  readonly damageType: EnumDamageType;
  readonly damageRange: {
    readonly min: number;
    readonly max: number;
    readonly type?: EnumDamageType;
  };
  readonly damageMultiplier?: number;
  readonly range: number;
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly executionTime: number;
  readonly recoveryTime: number;
  readonly accuracy: number; // Base accuracy (0-1)
  readonly speed?: number; // Execution speed, could be in frames or ms (can be derived from executionTime)
  readonly precision?: number; // Modifier for hitting vital points
  readonly critChance?: number;
  readonly critMultiplier?: number;
  readonly effects?: readonly StatusEffect[]; // Effects applied by the technique itself
  readonly properties?: readonly string[]; // e.g., "unblockable", "armor_piercing"
  readonly culturalContext?: {
    readonly origin: string;
    readonly philosophy: string;
    readonly traditionalUse: string;
  };
  readonly comboChains?: readonly string[];
  readonly counters?: readonly string[];
  readonly prerequisites?: {
    readonly minKi?: number;
    readonly minStamina?: number;
    readonly requiredStance?: TrigramStance;
    readonly forbiddenStances?: readonly TrigramStance[];
    readonly playerLevel?: number;
  };
  readonly timingProperties?: {
    readonly startupFrames: number;
    readonly activeFrames: number;
    readonly recoveryFrames: number;
    readonly cancelWindows?: readonly {
      readonly startFrame: number;
      readonly endFrame: number;
    }[];
  };
  readonly targetAreas?: readonly string[];
  readonly philosophy?: string;
  readonly applications?: readonly string[];
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
