// Eight Trigram (팔괘) combat system types for Korean martial arts

import type { ColorValue } from "./common";
import type { PlayerArchetype, TrigramStance } from "./enums";
import type { KoreanTechnique } from "./combat"; // Import KoreanTechnique
import { KoreanText } from "./korean-text";

// Core trigram data structure (I Ching 주역 팔괘)
export interface TrigramData {
  readonly stance: TrigramStance;
  readonly korean: string; // Korean name of the stance
  readonly english: string; // English name of the stance
  readonly symbol: string; // e.g., "☰"
  readonly element: string;
  readonly color: ColorValue;
  readonly philosophy: string;
  readonly description?: KoreanText; // Optional detailed description
  readonly technique: KoreanTechnique; // Technique associated with the stance
  // Optional fields based on usage in PhilosophySection.tsx
  readonly direction?: string;
  readonly damageModifier?: number;
  readonly defenseModifier?: number;
  readonly speedModifier?: number;
  readonly stanceChangeCooldownMs?: number; // Added based on StanceManager.ts usage
  // Enhanced properties
  readonly preferredTechniques?: readonly KoreanTechnique[]; // Made optional
  readonly kiCost: number;
  readonly transitionTime: number;
  readonly effectiveness: Record<TrigramStance, number>;
}

// Korean martial arts technique definition
// This is a more detailed definition than the one in combat.ts, consider consolidating
// For now, keeping it as it might be specific to Trigram system's view of techniques
// Using KoreanTechnique from combat.ts as the standard.

// Trigram visual effects for combat
export interface TrigramVisualEffect {
  readonly auraColor: ColorValue;
}

// Eight Trigram effectiveness matrix (상극상생)
export type TrigramEffectivenessMatrix = {
  readonly [K in TrigramStance]: {
    readonly [T in TrigramStance]: number;
  };
};

// Trigram stance state for players
export interface TrigramStanceState {
  readonly currentStance: TrigramStance;
  readonly lastStanceChangeTime: number; // Timestamp
  readonly availableTechniques: readonly KoreanTechnique[];
}

// Trigram philosophy and cultural context
export interface TrigramPhilosophy {
  readonly trigram: TrigramStance;
  readonly coreConcept: KoreanText;
  readonly martialApplication: KoreanText;
}

// Archetype bonuses for different trigram stances
export interface ArchetypeTrigramBonus {
  readonly archetype: PlayerArchetype;
  readonly stance: TrigramStance;
  readonly damageBonus?: number;
  readonly kiCostModifier?: number;
  readonly staminaCostModifier?: number;
}

// Trigram combination techniques (연계기법)
export interface TrigramCombination {
  readonly id: string;
  readonly name: KoreanText;
  readonly sequence: readonly TrigramStance[];
  readonly resultingTechnique: KoreanTechnique;
  readonly description: KoreanText;
}

// Trigram training progression
export interface TrigramProgression {
  readonly stance: TrigramStance;
  readonly level: number;
  readonly experience: number;
  readonly unlockedAbilities: readonly string[];
}

// Trigram stance transition rules
export interface TrigramTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly costKi: number;
  readonly costStamina: number;
  readonly durationMs: number;
  readonly effectivenessModifier: number;
}

// Export the stance type
export type { TrigramStance } from "./enums";

// Missing trigram system types
export interface TrigramTransitionCost {
  readonly ki: number;
  readonly stamina: number;
  readonly timeMilliseconds: number;
}

export interface TransitionMetrics {
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number;
  readonly risk: number;
}

export interface TransitionPath {
  readonly path: readonly TrigramStance[];
  readonly totalCost: TrigramTransitionCost;
  readonly overallEffectiveness: number;
  readonly cumulativeRisk: number;
  readonly name: string;
  readonly description: KoreanText;
}

export interface KiFlowFactors {
  readonly playerLevelModifier?: number;
  readonly stanceAffinity?: number;
}

// Trigram combat analytics
export interface TrigramCombatStats {
  readonly stance: TrigramStance;
  readonly usageCount: number;
  readonly totalDamageDealt: number;
  readonly totalDamageTaken: number;
  readonly successfulTechniques: number;
}

// Trigram UI display configuration
export interface TrigramUIConfig {
  readonly displaySymbol: boolean;
  readonly displayName: boolean;
  readonly displayElement: boolean;
  readonly displayColor: boolean;
}

// Complete Eight Trigram system data
export interface EightTrigramSystem {
  readonly trigrams: Readonly<Record<TrigramStance, TrigramData>>;
  readonly effectivenessMatrix: TrigramEffectivenessMatrix;
  readonly transitionRules: readonly TrigramTransitionRule[];
}

// Trigram selection and management
export interface TrigramSelector {
  readonly availableStances: readonly TrigramStance[];
  readonly currentStance: TrigramStance;
  readonly selectStance: (stance: TrigramStance) => void;
}

// Trigram mastery certificate (traditional Korean martial arts concept)
export interface TrigramMasteryCertificate {
  readonly studentName: string;
  readonly masteredStances: readonly TrigramStance[];
  readonly dateAwarded: string; // ISO Date string
  readonly issuingMaster: string;
}

// Missing types that are referenced in various files
export interface TrigramTransitionRule {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number;
  readonly conditions?: string[];
}

export interface StanceTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number;
}
