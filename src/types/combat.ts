// Combat mechanics types for Korean martial arts game

import type { TrigramStance } from "./enums"; // Changed to import from enums
import type { KoreanText } from "./korean-text";
import type { StatusEffect } from "./effects";
import type { PlayerState } from "./player";
import type { DamageType as EnumDamageType } from "./enums";

export type CombatAttackType =
  | "strike"
  | "punch"
  | "kick"
  | "elbow_strike"
  | "knee_strike"
  | "grapple"
  | "throw"
  | "submission"
  | "pressure_point"
  | "nerve_strike"
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
  | "combination" // Added
  | "elbow" // Added (could be merged with elbow_strike)
  | "pressure" // Added (synonym for pressure_point)
  | "nerve"; // Added (synonym for nerve_strike)

// Combat technique definition
export interface KoreanTechnique {
  readonly id: string;
  readonly name: string; // Internal name/key, can be same as id
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string; // Added: Romanized Korean name
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType; // Made non-optional, provide a default like "strike"
  readonly damageType: EnumDamageType; // Added: Type of damage (blunt, sharp, etc.)
  readonly damageRange: { min: number; max: number; type?: EnumDamageType }; // Added: Min/max damage, optional type override
  readonly damageMultiplier?: number; // Added optional damageMultiplier
  readonly range: number; // Added: Effective range of the technique
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly executionTime: number; // Added: Time to execute in ms or ticks
  readonly recoveryTime: number; // Added: Time to recover after execution in ms or ticks
  readonly accuracy: number; // Base accuracy (0-1)
  readonly speed?: number; // Execution speed, could be in frames or ms (can be derived from executionTime)
  readonly precision?: number; // Modifier for hitting vital points
  readonly critChance?: number;
  readonly critMultiplier?: number;
  readonly effects?: readonly StatusEffect[];
  readonly properties?: readonly string[]; // e.g., "unblockable", "armor_piercing"
  readonly culturalContext?: {
    readonly origin: string;
    readonly philosophy: string;
    readonly traditionalUse: string;
  };
  readonly comboChains?: readonly string[]; // IDs of techniques that can follow
  readonly counters?: readonly string[]; // IDs of techniques this counters
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
      startFrame: number;
      endFrame: number;
    }[];
  };
  readonly targetAreas?: readonly string[]; // e.g., "head", "torso", specific vital points by ID
  readonly philosophy?: string; // Link to martial arts philosophy aspect
  readonly applications?: readonly string[]; // Tactical applications
}

// Combat result from technique execution
export interface CombatResult {
  readonly hit: boolean; // Was the attack successful?
  readonly damage: number;
  readonly isVitalPoint: boolean;
  readonly vitalPointsHit: readonly string[];
  readonly techniqueUsed: KoreanTechnique;
  readonly effectiveness: number; // e.g., stance effectiveness multiplier
  readonly stunDuration: number; // in milliseconds or game ticks
  readonly bloodLoss: number;
  readonly painLevel: number; // Pain inflicted
  readonly consciousnessImpact: number; // Impact on consciousness
  readonly balanceEffect: number; // Effect on target's balance
  readonly statusEffects: readonly StatusEffect[]; // Status effects applied
  readonly effects?: readonly StatusEffect[]; // Added optional effects
  readonly hitType:
    | "normal"
    | "vital"
    | "critical"
    | "miss"
    | "blocked"
    | "dodged"; // More comprehensive
  readonly description?: string; // Textual description of the outcome
}

// Type alias for HitResult as requested by error messages
export type HitResult = CombatResult;

// Combat analysis for technique effectiveness
export interface CombatAnalysis {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly hitChance: number;
  readonly damageRange: { min: number; max: number };
  readonly advantages: readonly string[];
  readonly disadvantages: readonly string[];
}

// Stance transition data
export interface StanceTransition {
  readonly from: TrigramStance; // Use TrigramStance from enums
  readonly to: TrigramStance; // Use TrigramStance from enums
  readonly cost: number;
  readonly duration: number;
  readonly effectiveness: number;
}

// Combat event for logging
export interface CombatEvent {
  readonly timestamp: number;
  readonly type: "attack" | "hit" | "block" | "dodge" | "stance_change";
  readonly attacker?: string;
  readonly defender?: string;
  readonly technique?: string;
  readonly damage?: number;
  readonly result: KoreanText;
}
