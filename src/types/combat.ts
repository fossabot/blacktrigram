/**
 * Combat system types
 */

import type { DamageRange, KoreanText } from "./common";
import type { StatusEffect } from "./effects";
import { CombatAttackType, DamageType, TrigramStance } from "./enums";

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
  readonly success: boolean;
  readonly damage: number;
  readonly isCritical: boolean;
  readonly hit: boolean;
  readonly isBlocked: boolean;
  readonly vitalPointHit: boolean;
  readonly effects: readonly any[];
  readonly attacker?: any;
  readonly defender?: any;
  readonly technique?: KoreanTechnique;
  readonly criticalHit: boolean;
  readonly timestamp: number; // <-- Ensure this property exists
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

// Fix: Remove duplicate TrainingCombatResult interface
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
