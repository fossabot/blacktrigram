/**
 * Combat system types
 */

import type { DamageRange, KoreanText, Position } from "./common";
import type { StatusEffect } from "./effects";
import type { PlayerState } from "./player";
import { TrigramStance, CombatAttackType, DamageType } from "./enums";

// Korean martial arts technique
export interface KoreanTechnique {
  readonly id: string;
  readonly name: KoreanText;
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized: string;
  readonly description: KoreanText;

  // Combat properties
  readonly stance: TrigramStance;
  readonly type: CombatAttackType; // Fix: Use correct enum
  readonly damageType: DamageType;
  readonly damage?: number; // Made optional to fix null issues
  readonly damageRange?: DamageRange;
  readonly range: number;
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly accuracy: number;
  readonly executionTime: number;
  readonly recoveryTime: number;
  readonly critChance: number;
  readonly critMultiplier: number;
  readonly effects: readonly StatusEffect[];
}

// Combat result - Fix: Ensure all properties are properly defined
export interface CombatResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly criticalHit: boolean; // Required property
  readonly vitalPointHit: boolean; // Required property
  readonly updatedAttacker?: PlayerState;
  readonly updatedDefender?: PlayerState;
  readonly attacker?: PlayerState;
  readonly defender?: PlayerState;
  readonly technique?: KoreanTechnique;
  readonly effects: readonly StatusEffect[];
  readonly isCritical?: boolean; // Alternative naming for compatibility
  readonly isVitalPoint?: boolean; // Alternative naming for compatibility
  readonly isBlocked?: boolean;
  readonly isCountered?: boolean;
  readonly timestamp: number;
  readonly success?: boolean;
  readonly winner?: number;
  readonly updatedPlayers?: readonly PlayerState[];
  readonly hitLocation?: Position;
}

// Training-specific combat result extension
export interface TrainingCombatResult extends CombatResult {
  readonly trainingData?: {
    readonly accuracy: number;
    readonly damageCalculation: number;
    readonly stanceEffectiveness: number;
    readonly techniqueTiming: number;
  };
}

// Fix: Add missing TrainingCombatResult interface
export interface TrainingCombatResult extends CombatResult {
  readonly accuracyScore: number;
  readonly techniqueScore: number;
  readonly formScore: number;
  readonly improvementAreas: readonly string[];
  readonly nextTrainingGoals: readonly string[];
}

// Fix: Define CombatEventData interface that's used in MatchStatistics
export interface CombatEventData {
  readonly id: string;
  readonly timestamp: number;
  readonly type:
    | "attack"
    | "block"
    | "critical"
    | "vital_point"
    | "stance_change";
  readonly attacker: number; // Player index
  readonly defender: number; // Player index
  readonly damage: number;
  readonly technique?: string;
  readonly result: "hit" | "miss" | "blocked" | "critical";
  readonly effects?: readonly string[];
}

// Combat statistics
export interface CombatStats {
  readonly totalDamage: number;
  readonly criticalHits: number;
  readonly vitalPointHits: number;
  readonly techniquesUsed: number;
  readonly stamina: number;
  readonly ki: number;
}
