// Korean martial arts trigram system types

import type { TrigramStance, PlayerArchetype, EffectType } from "./enums";
import type { KoreanText } from "./korean-text";
import type { KoreanTechnique } from "./index"; // Assuming StatusEffect is in index or effects

// Export TrigramStance for external modules
export type { TrigramStance } from "./enums";

// Trigram transition cost - FIXED: Add missing timeMilliseconds
export interface TrigramTransitionCost {
  readonly ki: number;
  readonly stamina: number;
  readonly timeMilliseconds: number; // Added missing time component
}

// Enhanced transition metrics with all required properties
export interface TransitionMetrics {
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number;
  readonly risk: number;
  readonly stamina: number; // Added missing property
  readonly timeMilliseconds: number; // Added missing property
}

// Enhanced transition path interface
export interface TransitionPath {
  readonly path: readonly TrigramStance[];
  readonly totalCost: TrigramTransitionCost;
  readonly overallEffectiveness: number;
  readonly cumulativeRisk: number;
  readonly name: string; // Added
  readonly description: {
    // Added
    readonly korean: string;
    readonly english: string;
  };
}

// Trigram transition rule - FIXED: Add missing properties
export interface TrigramTransitionRule {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number; // Added
  readonly conditions?: ReadonlyArray<{
    type: "player_stat" | "archetype" | "active_effect";
    stat?: "health" | "ki" | "stamina";
    archetype?: PlayerArchetype;
    effectType?: EffectType; // Use EffectType from enums
    threshold?: number;
    value?: boolean | string;
  }>;
  readonly description: KoreanText; // Added
}

// Ki flow factors with all required properties
export interface KiFlowFactors {
  readonly playerLevelModifier: number;
  readonly stanceAffinity: number;
  readonly distance: number; // Added missing property
  readonly elementalHarmony: number; // Added missing property
}

// Trigram data structure
export interface TrigramData {
  readonly id: TrigramStance;
  readonly name: KoreanText;
  readonly symbol: string;
  readonly element: string;
  readonly nature: "yin" | "yang";
  readonly philosophy: KoreanText;
  readonly combat: KoreanText;
  readonly theme: TrigramTheme;
  readonly defensiveBonus: number;
  readonly kiFlowModifier: number;
}

// Trigram effectiveness matrix
export interface TrigramEffectivenessMatrix {
  readonly [attacker: string]: {
    readonly [defender: string]: number;
  };
}

// Trigram stance transition
export interface TrigramTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly difficulty: number;
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly transitionTime: number;
}

// Fix: Add missing StanceTransition export
export interface StanceTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly difficulty: number;
  readonly time: number;
  readonly kiCost: number;
  readonly requirements?: string[];
}

// Trigram philosophy system
export interface TrigramPhilosophy {
  readonly trigram: TrigramStance;
  readonly principle: KoreanText;
  readonly application: KoreanText;
  readonly strengthsAgainst: readonly TrigramStance[];
  readonly weaknessesAgainst: readonly TrigramStance[];
}

// Trigram combat style
export interface TrigramCombatStyle {
  readonly trigram: TrigramStance;
  readonly combatApproach: string;
  readonly preferredRange: "close" | "medium" | "long";
  readonly focusArea: "offense" | "defense" | "balance";
  readonly keyCharacteristics: readonly string[];
}

// Archetype-trigram affinity
export interface ArchetypeTrigramAffinity {
  readonly archetype: PlayerArchetype;
  readonly preferredTrigrams: readonly TrigramStance[];
  readonly bonusEffectiveness: Record<TrigramStance, number>;
  readonly penaltyTrigrams: readonly TrigramStance[];
}

// Ensure TrigramTheme has a text property
export interface TrigramTheme {
  primary: number;
  secondary: number;
  active: number;
  hover: number;
  text: number; // Ensure text property is present
  glow?: number; // Optional glow color
}

// Korean trigram system types for martial arts

import type { KoreanText, KoreanTechnique, PlayerArchetype } from "./index";

// Trigram stance enumeration from I Ching
export enum TrigramStance {
  GEON = "geon", // ☰ Heaven - 건
  TAE = "tae", // ☱ Lake - 태
  LI = "li", // ☲ Fire - 리
  JIN = "jin", // ☳ Thunder - 진
  SON = "son", // ☴ Wind - 손
  GAM = "gam", // ☵ Water - 감
  GAN = "gan", // ☶ Mountain - 간
  GON = "gon", // ☷ Earth - 곤
}

// Trigram stance data structure
export interface TrigramStanceData {
  readonly id: TrigramStance;
  readonly symbol: string; // Unicode trigram symbol
  readonly korean: string; // Korean name
  readonly english: string; // English name
  readonly element: string; // Associated element
  readonly philosophy: KoreanText; // Philosophical meaning
  readonly technique: KoreanTechnique; // Primary technique
  readonly colors: {
    readonly primary: number;
    readonly secondary: number;
  };
  readonly theme: {
    readonly primary: number;
    readonly secondary: number;
  };
  readonly combatStyle: "offensive" | "defensive" | "balanced";
  readonly preferredArchetypes: readonly PlayerArchetype[];
  readonly movementPattern: "linear" | "circular" | "angular";
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly transitionSpeed: number;
}

// Export types
export type { TrigramStanceData };
