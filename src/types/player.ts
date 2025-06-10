/**
 * Player state and related types for Korean martial arts
 */

import type { KoreanText, Position } from "./common";
import type { StatusEffect } from "./effects";
import { TrigramStance, PlayerArchetype, CombatState } from "./enums";

// Core player state interface
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
  readonly combatState: CombatState;
  readonly position: Position;
  readonly isBlocking: boolean;
  readonly isStunned: boolean;
  readonly isCountering: boolean;
  readonly lastActionTime: number;
  readonly recoveryTime: number;
  readonly lastStanceChangeTime: number;

  // Status and effects
  readonly statusEffects: readonly StatusEffect[];
  readonly activeEffects: readonly string[];

  // Vital points state
  readonly vitalPoints: readonly {
    readonly id: string;
    readonly isHit: boolean;
    readonly damage: number;
    readonly lastHitTime: number;
  }[];

  // Match statistics
  readonly totalDamageReceived: number;
  readonly totalDamageDealt: number;
  readonly hitsTaken: number;
  readonly hitsLanded: number;
  readonly perfectStrikes: number;
  readonly vitalPointHits: number;

  // Fix: Add missing properties
  readonly misses?: number;
  readonly accuracy?: number;
  readonly comboCount?: number;
  readonly maxCombo?: number;
  readonly roundsWon?: number;
  readonly matchesWon?: number;
  readonly experiencePoints?: number;
  readonly rank?: string;
  readonly wins?: number;
  readonly losses?: number;
}

// Player creation data
export interface PlayerCreationData {
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;
  readonly preferredStance?: TrigramStance;
  readonly customizations?: {
    readonly colors?: { primary: number; secondary: number };
    readonly techniques?: string[];
  };
}

// Player match statistics
export interface PlayerMatchStats {
  readonly wins: number;
  readonly losses: number;
  readonly hitsTaken: number;
  readonly hitsLanded: number;
  readonly totalDamageDealt: number;
  readonly totalDamageReceived: number;
  readonly techniques: readonly string[];
  readonly perfectStrikes: number;
  readonly vitalPointHits: number;
  readonly consecutiveWins: number;
  readonly matchDuration: number;
}

// Player update type for partial updates
export type PlayerUpdateData = Partial<PlayerState>;
