// Common shared types for Black Trigram Korean martial arts game

import type {
  DamageType,
  EffectIntensity,
  EffectType as EnumEffectType, // Renamed to avoid conflict with local EffectType if any
  TrigramStance, // Add import for TrigramStance
  CombatReadiness, // Added for PlayerState in createPlayerState
  CombatState, // Added for PlayerState in createPlayerState
  PlayerArchetype, // Added for PlayerState in createPlayerState
} from "./enums";
import type { PlayerState } from "./player"; // For createPlayerState
import { GAME_CONFIG } from "./constants/game"; // For createPlayerState
import type { KoreanText } from "./korean-text"; // For KoreanText in CombatCondition
import type { StatusEffect } from "./effects"; // For StatusEffect in PlayerState

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
}

// Damage range specification (Canonical definition)
export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly type?: DamageType; // Optional: specific damage type for this range
}

// Combat condition for status effects
export interface CombatCondition {
  readonly id: string;
  readonly name: KoreanText; // Use KoreanText for bilingual support
  readonly type: EnumEffectType; // Use EnumEffectType from enums
  readonly intensity: EffectIntensity;
  readonly duration: number; // Duration in game ticks or seconds
  readonly source?: string; // E.g., technique ID, environmental effect
  readonly description?: KoreanText;
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
export type ColorValue = number; // Hexadecimal color representation (e.g., 0xff0000)
export type RGBAColor = readonly [number, number, number, number];

// Time and duration types for martial arts training
export type Duration = number; // Typically in milliseconds or game ticks

// Probability and percentage types for combat calculations
export type Probability = number; // Value between 0 and 1
export type Percentage = number; // Value between 0 and 100

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
  readonly vx: number;
  readonly vy: number;
}

// Utility function for creating player states
// Moved PlayerState definition to player.ts, this function now uses it.
export const createPlayerState = (
  playerId: string,
  position: Position,
  stance: TrigramStance = "geon",
  overrides: Partial<PlayerState> = {}
): PlayerState => ({
  id: playerId,
  name: playerId,
  archetype: "musa" as PlayerArchetype, // Default archetype
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
  balance: 100, // Assuming 100 is perfect balance
  bloodLoss: 0,
  lastStanceChangeTime: 0,
  isAttacking: false,
  combatReadiness: 100 as CombatReadiness, // Full readiness
  activeEffects: [] as readonly StatusEffect[],
  combatState: "ready" as CombatState, // Initial combat state
  conditions: [] as readonly CombatCondition[],
  ...overrides,
});
