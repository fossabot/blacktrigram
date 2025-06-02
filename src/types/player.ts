// Types related to player state and actions

import type { Position, Timestamp, CombatCondition } from "./common";
import type { KoreanText } from "./korean-text"; // Added correct import
import type {
  TrigramStance as EnumTrigramStance,
  PlayerArchetype as EnumPlayerArchetype,
  CombatState as EnumCombatState, // Added CombatState from enums
} from "./enums";
import type { StatusEffect } from "./effects";

// Player archetype
export type PlayerArchetype = EnumPlayerArchetype; // Use imported PlayerArchetype
export type TrigramStance = EnumTrigramStance; // Use imported TrigramStance
export type CombatState = EnumCombatState; // Use imported CombatState

// Combat readiness enum - declare as enum for runtime access
export enum CombatReadiness {
  READY = 100,
  LIGHT_DAMAGE = 80,
  MODERATE = 60,
  HEAVY = 40,
  CRITICAL = 20,
  INCAPACITATED = 0,
}

// Consciousness level enum
export enum ConsciousnessLevel {
  ALERT = 100,
  AWARE = 75,
  DISORIENTED = 50,
  STUNNED = 25,
  UNCONSCIOUS = 0,
}

// Player Archetype Data (for constants)
export interface PlayerArchetypeData {
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly bonuses: Record<string, number | string>; // Example, adjust as needed
}

// Player state interface
export interface PlayerState {
  readonly id: string;
  readonly name: string;
  readonly archetype: PlayerArchetype;
  readonly position: Position;
  readonly stance: TrigramStance;
  readonly facing: "left" | "right";
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly consciousness: number;
  readonly pain: number;
  readonly balance: number; // Typically a scale, e.g., 0-100
  readonly bloodLoss: number;
  readonly lastStanceChangeTime: Timestamp;
  readonly isAttacking: boolean;
  readonly combatReadiness: CombatReadiness; // Enum value
  readonly activeEffects: readonly StatusEffect[];
  readonly combatState: CombatState; // Enum value from enums.ts
  readonly conditions: readonly CombatCondition[]; // Array of CombatCondition from common.ts
}
