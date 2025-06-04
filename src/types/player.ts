// Types related to player state and actions

import type { CombatReadiness, CombatState, TrigramStance } from "./enums";
import type { CombatCondition, Position } from "./common";
import type { StatusEffect } from "./effects";

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

// Fix: Remove conflicting import of PlayerArchetype
// import type { PlayerArchetype } from "./enums"; // REMOVED - causes conflict

// Keep the local PlayerArchetype type definition
export type PlayerArchetype =
  | "musa"
  | "amsalja"
  | "hacker"
  | "jeongbo_yowon"
  | "jojik_pokryeokbae";

// Fix: Add missing PLAYER_ARCHETYPE_DATA that playerUtils.ts expects
export const PLAYER_ARCHETYPE_DATA: Record<
  PlayerArchetype,
  {
    bonuses: {
      damageBonus: number;
      accuracyBonus: number;
      speedBonus: number;
      defenseBonus: number;
      precisionBonus?: number;
    };
    preferredTrigrams: readonly string[];
    specialization: string;
  }
> = {
  musa: {
    bonuses: {
      damageBonus: 1.2,
      accuracyBonus: 1.1,
      speedBonus: 1.0,
      defenseBonus: 1.3,
    },
    preferredTrigrams: ["geon", "jin"],
    specialization: "Traditional warrior combat",
  },
  amsalja: {
    bonuses: {
      damageBonus: 1.5,
      accuracyBonus: 1.8,
      speedBonus: 1.4,
      defenseBonus: 0.9,
      precisionBonus: 2.0,
    },
    preferredTrigrams: ["son", "gam"],
    specialization: "Silent elimination techniques",
  },
  hacker: {
    bonuses: {
      damageBonus: 1.1,
      accuracyBonus: 1.6,
      speedBonus: 1.2,
      defenseBonus: 1.0,
      precisionBonus: 1.4,
    },
    preferredTrigrams: ["li", "tae"],
    specialization: "Tech-enhanced combat analysis",
  },
  jeongbo_yowon: {
    bonuses: {
      damageBonus: 1.3,
      accuracyBonus: 1.5,
      speedBonus: 1.1,
      defenseBonus: 1.2,
    },
    preferredTrigrams: ["gan", "gon"],
    specialization: "Intelligence-based tactical combat",
  },
  jojik_pokryeokbae: {
    bonuses: {
      damageBonus: 1.8,
      accuracyBonus: 1.0,
      speedBonus: 1.3,
      defenseBonus: 1.1,
    },
    preferredTrigrams: ["jin", "gam"],
    specialization: "Street fighting and survival",
  },
};
