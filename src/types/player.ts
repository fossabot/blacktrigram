/**
 * Player state and related types
 */

import type { KoreanText, Position } from "./common";
import type { StatusEffect } from "./effects";
import { TrigramStance, PlayerArchetype } from "./enums";

// Core player state
export interface PlayerState {
  readonly id: string;
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;

  // Combat stats
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly energy: number;
  readonly maxEnergy: number;

  // Combat attributes
  readonly attackPower: number;
  readonly defense: number;
  readonly speed: number;
  readonly technique: number;
  readonly pain: number;
  readonly consciousness: number;
  readonly balance: number;
  readonly momentum: number;

  // Combat state
  readonly currentStance: TrigramStance;
  readonly position: Position;
  readonly isBlocking: boolean;
  readonly isStunned: boolean;
  readonly isCountering: boolean;
  readonly lastActionTime: number;
  readonly recoveryTime: number;
  readonly lastStanceChangeTime?: number; // Add missing property

  // Status and effects
  readonly statusEffects: readonly StatusEffect[];
  readonly activeEffects: readonly string[];
}

// Player creation data
export interface PlayerCreationData {
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;
  readonly preferredStance?: TrigramStance;
}

// Player update data (for partial updates)
export interface PlayerUpdateData extends Partial<PlayerState> {
  // Allow partial updates of any player state property
}

// Player statistics for match tracking
export interface PlayerMatchStats {
  readonly wins: number;
  readonly losses: number;
  readonly hitsTaken: number;
  readonly hitsLanded: number;
  readonly totalDamageDealt: number;
  readonly totalDamageReceived: number;
  readonly techniques: string[];
  readonly perfectStrikes: number;
  readonly vitalPointHits: number;
  readonly consecutiveWins: number;
  readonly matchDuration: number;
}

// Player archetype data (moved to anatomy.ts to avoid circular import)
export type { PlayerArchetypeData } from "./anatomy";
