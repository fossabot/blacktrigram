// Types related to player state and actions

import type { Position, Timestamp, CombatCondition } from "./common"; // Combined imports
import type {
  CombatReadiness,
  CombatState,
  PlayerArchetype,
  TrigramStance,
} from "./enums";
import type { StatusEffect } from "./effects";
import { KoreanText } from "./korean-text";

// Player Archetype Data (for constants)
export interface PlayerArchetypeData {
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly bonuses: Record<string, number | string>; // Example, adjust as needed
  readonly preferredTrigrams?: readonly TrigramStance[];
  readonly techniques?: Record<string, string>; // technique name: description
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
  readonly consciousness: number; // Typically 0-100
  readonly pain: number; // Typically 0-100, affects performance
  readonly balance: number; // Typically a scale, e.g., 0-100, or an enum for states
  readonly bloodLoss: number; // Cumulative effect, 0-100
  readonly lastStanceChangeTime: Timestamp;
  readonly isAttacking: boolean;
  readonly isBlocking?: boolean; // Added from Player.test.tsx
  readonly combatReadiness: CombatReadiness; // Enum value
  readonly activeEffects: readonly StatusEffect[];
  readonly combatState: CombatState; // Enum value from enums.ts
  readonly conditions: readonly CombatCondition[]; // Array of CombatCondition from common.ts
  // Add any other player-specific state needed, e.g., comboCounter, specialMeter
}
