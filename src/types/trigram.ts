// Trigram (팔괘) types for Korean martial arts game

import type { TrigramStance } from "./enums";
import type { KoreanText } from "./korean-text";
import type { KoreanTechnique } from "./combat";

// Trigram data structure
export interface TrigramData {
  readonly id: TrigramStance;
  readonly name: KoreanText;
  readonly symbol: string; // Unicode trigram symbol
  readonly element: string;
  readonly direction: string;
  readonly philosophy: KoreanText;
  readonly strengths: readonly string[];
  readonly weaknesses: readonly string[];
  readonly technique: KoreanTechnique | readonly KoreanTechnique[];
  // Add missing properties
  readonly color: number; // Color value for visual representation
  readonly order: number; // Order in trigram sequence
  readonly preferredTechniques?: readonly KoreanTechnique[];
}

// Trigram transition cost structure for Korean martial arts
export interface TrigramTransitionCost {
  readonly ki: number; // Added missing ki property
  readonly stamina: number; // Stamina cost for transition
  readonly timeMilliseconds: number; // Time required for transition
}

// Transition metrics for analysis
export interface TransitionMetrics {
  readonly stamina: number; // Stamina cost
  readonly timeMilliseconds: number; // Transition time
  readonly effectiveness: number; // Overall effectiveness rating (0-1)
  readonly risk: number; // Risk factor (0-1, higher is riskier)
  readonly cost: TrigramTransitionCost; // Added missing cost property
}

// Transition path between stances
export interface TransitionPath {
  readonly path: readonly TrigramStance[]; // Added missing path property
  readonly totalCost: TrigramTransitionCost;
  readonly overallEffectiveness: number; // Combined effectiveness rating
  readonly cumulativeRisk: number; // Total risk for the transition path
}

// Ki flow factors affecting transitions
export interface KiFlowFactors {
  readonly distance: number; // Physical distance between stances
  readonly elementalHarmony: number; // How well elements work together (오행)
  readonly playerLevelModifier: number; // Added missing property
  readonly stanceAffinity: number; // Added missing property
}

// Stance transition interface
export interface StanceTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly description: KoreanText;
  readonly success: boolean;
  readonly energyEfficiency: number;
}

// Trigram effectiveness matrix type
export type TrigramEffectivenessMatrix = {
  readonly [attacker in TrigramStance]: {
    readonly [defender in TrigramStance]: number;
  };
};

// Trigram transition rule
export interface TrigramTransitionRule {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly conditions?: readonly string[];
  readonly description: KoreanText;
}
