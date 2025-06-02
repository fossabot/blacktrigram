// Common shared types for Black Trigram Korean martial arts game

import { GAME_CONFIG } from "./constants";
import type {
  CombatState as EnumCombatState, // Aliased to avoid conflict if CombatState is also defined locally
  DamageType,
  PlayerArchetype as EnumPlayerArchetype, // Aliased
  EffectIntensity,
  EffectType as EnumStatusEffectType, // Changed StatusEffectType to EffectType
  TrigramStance as EnumTrigramStance,
  CombatState,
  PlayerArchetype,
  TrigramStance, // Add import for TrigramStance
} from "./enums";

// Basic shared types
export interface Position {
  readonly x: number;
  readonly y: number;
}

export type Timestamp = number;
export type EntityId = string;

export interface CombatStats {
  readonly damage: number;
  readonly accuracy: number;
  readonly speed: number;
}

// Game state types
export interface GameState {
  readonly phase: string;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly isPaused: boolean;
}

// Define MatchState if not defined elsewhere
export interface MatchState {
  currentRound: number;
  scores: Record<PlayerId, number>;
  roundWinner?: PlayerId | null;
  matchWinner?: PlayerId | null;
  // Add other relevant properties
}

// Damage range specification (Canonical definition)
export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly type: DamageType;
}

// Combat condition for status effects
export interface CombatCondition {
  readonly type: StatusEffectType; // Use StatusEffectType from enums
  readonly duration: number;
  readonly intensity: EffectIntensity;
  readonly source: string;
}

// Enhanced player state with realistic combat mechanics
// This PlayerState is a more generic one. The canonical one is in ./player.ts
// To avoid conflicts, this could be CommonPlayerState or similar if used.
// For now, assuming it's meant to be compatible or a subset.
export interface PlayerState {
  readonly id: EntityId;
  readonly name: string;
  readonly archetype: PlayerArchetype; // Uses the aliased EnumPlayerArchetype
  readonly position: Position;
  readonly stance: TrigramStance; // Uses the aliased EnumTrigramStance
  readonly facing: "left" | "right";
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly consciousness: number;
  readonly pain: number;
  readonly balance: number;
  readonly bloodLoss: number;
  readonly lastStanceChangeTime: Timestamp;
  readonly isAttacking: boolean;
  readonly combatReadiness: number;
  readonly activeEffects: readonly any[];
  readonly combatState: CombatState; // Uses the aliased EnumCombatState
  readonly conditions: readonly CombatCondition[];
}

// Basic position and vector types for Korean martial arts combat
export interface Vector2D {
  readonly x: number;
  readonly y: number;
}

export interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export interface Bounds {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

// Color types for Korean martial arts styling
export type ColorValue = number; // Hex color value
export type RGBAColor = readonly [number, number, number, number];

// Time and duration types for martial arts training
export type Duration = number; // in milliseconds

// Probability and percentage types for combat calculations
export type Probability = number; // 0.0 to 1.0
export type Percentage = number; // 0 to 100

// ID types for Korean martial arts entities
export type PlayerId = "player1" | "player2";
export type ArchetypeId = "musa" | "amsalja" | "hacker" | "jeongbo" | "jojik";

// Utility types for Korean martial arts game state
export type ReadonlyRecord<K extends keyof any, T> = {
  readonly [P in K]: T;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Korean martial arts specific ranges
export interface Range {
  readonly min: number;
  readonly max: number;
}

export interface Velocity {
  readonly x: number;
  readonly y: number;
}

// Utility function for creating player states
export const createPlayerState = (
  playerId: string,
  position: Position,
  stance: TrigramStance = "geon",
  overrides: Partial<PlayerState> = {}
): PlayerState => ({
  id: playerId,
  name: playerId,
  archetype: "musa",
  position,
  stance,
  facing: "right",
  health: GAME_CONFIG.MAX_HEALTH,
  maxHealth: GAME_CONFIG.MAX_HEALTH,
  ki: GAME_CONFIG.MAX_KI,
  maxKi: GAME_CONFIG.MAX_KI,
  stamina: GAME_CONFIG.MAX_STAMINA,
  maxStamina: GAME_CONFIG.MAX_STAMINA,
  consciousness: 100,
  pain: 0,
  balance: 100,
  bloodLoss: 0,
  lastStanceChangeTime: 0,
  isAttacking: false,
  combatReadiness: 100,
  activeEffects: [],
  combatState: "ready",
  conditions: [],
  ...overrides,
});
