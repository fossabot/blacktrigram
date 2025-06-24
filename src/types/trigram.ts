// Korean martial arts trigram system types

import type { PlayerArchetype, TrigramStance } from "./enums";

// Export TrigramStance for external modules
export type { TrigramStance } from "./enums";

// Ki flow factors with all required properties
export interface KiFlowFactors {
  readonly playerLevelModifier: number;
  readonly stanceAffinity: number;
  readonly distance: number; // Added missing property
  readonly elementalHarmony: number; // Added missing property
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

// Archetype-trigram affinity
export interface ArchetypeTrigramAffinity {
  readonly archetype: PlayerArchetype;
  readonly preferredTrigrams: readonly TrigramStance[];
  readonly bonusEffectiveness: Record<TrigramStance, number>;
  readonly penaltyTrigrams: readonly TrigramStance[];
}
