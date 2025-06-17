/**
 * @fileoverview Player type definitions for Black Trigram Korean martial arts combat system
 * @description Complete player state and archetype definitions with Korean cultural elements
 */

import type { TrigramStance, PlayerArchetype } from "./enums";
import type { KoreanText } from "./korean-text";
import type { StatusEffect } from "./effects";

/**
 * @interface Position
 * @description 2D position coordinates for player positioning
 */
export interface Position {
  readonly x: number;
  readonly y: number;
}

/**
 * @interface GridPosition
 * @description Grid-based position for tactical movement system
 */
export interface GridPosition {
  readonly row: number;
  readonly col: number;
}

/**
 * @interface CombatStats
 * @description Combat performance statistics tracking
 */
export interface CombatStats {
  readonly hitsLanded: number;
  readonly hitsTaken: number;
  readonly totalDamageDealt: number;
  readonly totalDamageReceived: number;
  readonly perfectStrikes: number;
  readonly criticalHits: number;
  readonly blockedAttacks?: number;
  readonly dodgedAttacks?: number;
  readonly counterAttacks?: number;
}

/**
 * @interface PlayerState
 * @description Complete player state for Korean martial arts combat
 */
export interface PlayerState {
  // Identity
  readonly id: string;
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;

  // Combat Stance
  readonly currentStance: TrigramStance;

  // Health and Resources
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;

  // Combat Status
  readonly balance: number; // 0-100, affects accuracy and movement
  readonly consciousness: number; // 0-100, affects all actions
  readonly pain: number; // 0-100, accumulated damage effects

  // Character Progression
  readonly experiencePoints: number;
  readonly level: number;

  // Combat State Flags
  readonly isBlocking: boolean;
  readonly isStunned: boolean;
  readonly isCountering: boolean;

  // Status Effects
  readonly statusEffects: readonly StatusEffect[];

  // Positioning
  readonly position: Position;

  // Combat Statistics
  readonly hitsLanded: number;
  readonly hitsTaken: number;
  readonly totalDamageDealt: number;
  readonly totalDamageReceived: number;
  readonly combatStats: CombatStats;

  // Combat Attributes
  readonly attackPower: number;
  readonly defense: number;

  // Timing
  readonly lastActionTime: number;
  readonly recoveryTime: number;
}

/**
 * @interface PlayerArchetypeInfo
 * @description Information about player archetype characteristics
 */
export interface PlayerArchetypeInfo {
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly philosophy: KoreanText;
  readonly colors: {
    readonly primary: number;
    readonly secondary: number;
    readonly accent: number;
  };
  readonly combatStyle: {
    readonly preferredStances: readonly TrigramStance[];
    readonly strengths: readonly string[];
    readonly weaknesses: readonly string[];
  };
  readonly baseStats: {
    readonly health: number;
    readonly ki: number;
    readonly stamina: number;
    readonly attackPower: number;
    readonly defense: number;
  };
}

/**
 * @interface PlayerInput
 * @description Player input state for combat controls
 */
export interface PlayerInput {
  readonly movement: {
    readonly up: boolean;
    readonly down: boolean;
    readonly left: boolean;
    readonly right: boolean;
  };
  readonly combat: {
    readonly attack: boolean;
    readonly defend: boolean;
    readonly technique: boolean;
  };
  readonly stanceChange: TrigramStance | null;
}

/**
 * @interface PlayerUpdateData
 * @description Partial player state for updates
 */
export type PlayerUpdateData = Partial<
  Pick<
    PlayerState,
    | "health"
    | "ki"
    | "stamina"
    | "balance"
    | "consciousness"
    | "pain"
    | "currentStance"
    | "isBlocking"
    | "isStunned"
    | "isCountering"
    | "statusEffects"
    | "position"
    | "hitsLanded"
    | "hitsTaken"
    | "totalDamageDealt"
    | "totalDamageReceived"
    | "combatStats"
    | "lastActionTime"
  >
>;

/**
 * @interface TrainingPlayerState
 * @description Extended player state for training mode
 */
export interface TrainingPlayerState extends PlayerState {
  readonly trainingData: {
    readonly sessionsCompleted: number;
    readonly techniquesLearned: readonly string[];
    readonly masteryCertifications: readonly string[];
    readonly instructorNotes: readonly string[];
  };
}
