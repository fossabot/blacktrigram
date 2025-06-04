// Types related to player state and actions

import type { CombatReadiness, CombatState, TrigramStance } from "./enums";
import type { CombatCondition, Position } from "./common";
import type { StatusEffect } from "./effects";
import type { PlayerArchetype } from "./enums"; // Import from enums instead of local declaration

// Player Archetype Data (for constants)
// Player archetype data with Korean martial arts specializations
export interface PlayerArchetypeData {
  readonly name: { korean: string; english: string };
  readonly description: { korean: string; english: string };
  readonly preferredTrigrams: readonly string[];
  readonly specialization: string; // Add missing property
  readonly bonuses: {
    readonly damageBonus: number;
    readonly accuracyBonus: number;
    readonly speedBonus: number;
    readonly defenseBonus: number;
    readonly damageResistance?: number;
    readonly precisionBonus?: number;
  };
}

// Player state interface
export interface PlayerState {
  readonly id: string;
  readonly name: string;
  readonly archetype: PlayerArchetype; // Now uses the unified type
  readonly stance: TrigramStance;
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly position: Position;
  readonly facing: "left" | "right";
  readonly consciousness: number; // Typically 0-100
  readonly pain: number; // Typically 0-100, affects performance
  readonly balance: number; // Typically a scale, e.g., 0-100, or an enum for states
  readonly bloodLoss: number; // Cumulative effect, 0-100
  readonly lastStanceChangeTime: number;
  readonly isAttacking: boolean;
  readonly combatReadiness: CombatReadiness; // Enum value
  readonly activeEffects: readonly StatusEffect[];
  readonly combatState: CombatState; // Enum value from enums.ts
  readonly conditions: readonly CombatCondition[]; // Array of CombatCondition from common.ts
  // Add any other player-specific state needed, e.g., comboCounter, specialMeter
}
