// Korean martial arts combat system types

import type {
  PlayerArchetype,
  TrigramStance,
  EnumCombatAttackType,
  DamageType,
  CombatState,
} from "./enums";
import type {
  HitEffect,
  KoreanText,
  PlayerState,
  Position,
  StatusEffect,
  VitalPoint,
} from "./index";

// Fix: Remove circular import and define DamageRange locally
export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly average: number;
}

// Export the enum types for proper usage
export type CombatAttackType = EnumCombatAttackType;
export type DamageType =
  | "blunt"
  | "piercing"
  | "slashing"
  | "pressure"
  | "nerve"
  | "joint"
  | "internal"
  | "impact"
  | "crushing"
  | "sharp"
  | "electric"
  | "fire"
  | "ice"
  | "poison"
  | "psychic"
  | "blood";

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
  readonly success: boolean;
  readonly damage: number;
  readonly effects: readonly string[];
  readonly criticalHit: boolean;
  readonly vitalPointHit: boolean;
  readonly winner?: 0 | 1;
  readonly updatedPlayers?: readonly [PlayerState, PlayerState]; // Fix: Ensure tuple type
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

// Fix: Add missing CombatAction export
export interface CombatAction {
  readonly type: string;
  readonly playerId: string;
  readonly timestamp: number;
  readonly data?: any;
}

// Fix: Add missing DamageCalculation export
export interface DamageCalculation {
  readonly baseDamage: number;
  readonly modifiedDamage: number;
  readonly criticalHit: boolean;
  readonly vitalPointHit: boolean;
  readonly blocked: boolean;
  readonly effectiveness: number;
}

// Fix: Add missing CombatPhase export
export interface CombatPhase {
  readonly name: string;
  readonly duration: number;
  readonly allowedActions: readonly string[];
}

// Fix: Export CombatState instead of keeping it local
export interface CombatState {
  readonly phase: string;
  readonly timeRemaining: number;
  readonly roundNumber: number;
  readonly players: readonly [PlayerState, PlayerState];
  readonly isPaused: boolean;
}
