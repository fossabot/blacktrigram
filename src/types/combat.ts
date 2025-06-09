// Combat mechanics types for Korean martial arts game

import type {
  PlayerArchetype,
  TrigramStance,
  DamageType,
  CombatState, // Add CombatState import
  EnumCombatAttackType,
} from "./enums";
import type {
  PlayerState,
  KoreanTechnique,
  StatusEffect,
  VitalPoint,
  HitEffect,
  KoreanText, // Added KoreanText
} from "./index";
import type { DamageRange } from ".";

// Use the enum type directly
export type CombatAttackType = EnumCombatAttackType;

// Add missing TechniqueType export
export type TechniqueType =
  | "strike"
  | "thrust"
  | "block"
  | "counter_attack"
  | "throw"
  | "grapple"
  | "pressure_point"
  | "nerve_strike";

// Combat technique definition
export interface KoreanTechnique {
  readonly id: string;
  readonly name: string; // Added
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string; // Added
  readonly description: KoreanText;
  readonly stance: TrigramStance;
  readonly type: CombatAttackType; // Uses CombatAttackType (alias for EnumCombatAttackType)
  readonly damageType?: DamageType; // Added
  readonly damage?: number;
  readonly kiCost?: number;
  readonly staminaCost?: number;
  readonly damageRange?: DamageRange;
  readonly executionTime?: number; // Added
  readonly recoveryTime?: number; // Added
  readonly accuracy?: number;
  readonly range?: number; // Added
  readonly effects?: readonly StatusEffect[];
  readonly damageMultiplier?: number; // Added
  readonly critMultiplier?: number; // Added
  readonly critChance?: number; // Added
  readonly properties?: readonly string[]; // Added
}

// Combat result from technique execution
export interface CombatResult {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly damage: number;
  readonly hit: boolean; // Add missing property
  readonly critical: boolean;
  readonly blocked: boolean;
  readonly parried: boolean;
  readonly dodged: boolean;
  readonly effects: readonly HitEffect[]; // Add missing property
  readonly vitalPointsHit?: readonly VitalPoint[];
  readonly hitEffect?: HitEffect;
  readonly message?: KoreanText;
  readonly updatedAttacker?: Partial<PlayerState>; // Add missing property
  readonly updatedDefender?: Partial<PlayerState>; // Add missing property
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
    | "round_end" // Added
    | "match_end"; // Added
  readonly attackerId?: string;
  readonly defenderId?: string;
  readonly techniqueId?: string; // Added
  readonly damage?: number;
  readonly resultText: KoreanText; // Added
  readonly effectId?: string; // Added
  readonly roundNumber?: number; // Added
  readonly winnerId?: string; // Added
}

// Fix exports - remove CombatState
export type { DamageType } from "./enums";

// Attack input for combat system
export interface AttackInput {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly targetPoint?: string | null; // Add missing property
}

export interface WinConditionCheckResult {
  winner: PlayerState | null;
  draw: boolean;
  reason?: string; // e.g., "health_depleted", "time_up"
}

export interface MatchStatistics {
  readonly roundsWon: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly totalDamageDealt: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly techniquesUsed: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly vitalPointsHit: {
    readonly player1: number;
    readonly player2: number;
  };
}
