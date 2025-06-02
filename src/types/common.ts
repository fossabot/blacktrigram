// Common shared types for Black Trigram Korean martial arts game

import type {
  CombatState as EnumCombatState, // Aliased to avoid conflict if CombatState is also defined locally
  DamageType,
  PlayerArchetype as EnumPlayerArchetype, // Aliased
  EffectIntensity,
  EffectType as EnumStatusEffectType, // Changed StatusEffectType to EffectType
} from "./enums";

// Basic shared types
export interface Position {
  readonly x: number;
  readonly y: number;
}

export type Timestamp = number;
export type EntityId = string;

// Add placeholder for GameConfig interface
export interface GameConfig {
  readonly MAX_HEALTH: number;
  readonly MAX_KI: number;
  readonly MAX_STAMINA: number;
  readonly ROUND_TIME_SECONDS: number;
  readonly MAX_ROUNDS: number;
  readonly DAMAGE_VARIANCE_PERCENT: number; // e.g., 0.1 for +/- 10%
  readonly CRITICAL_HIT_MULTIPLIER: number;
  readonly BLOCK_DAMAGE_REDUCTION_PERCENT: number; // e.g., 0.5 for 50%
  readonly STANCE_CHANGE_COOLDOWN_MS: number;
  readonly VITAL_POINT_ACCURACY_MODIFIER: number; // e.g., 0.8 if harder to hit
  readonly BASE_KI_RECOVERY_RATE: number; // Ki per second
  readonly BASE_STAMINA_RECOVERY_RATE: number; // Stamina per second
  // Add other game configuration properties as needed
}

export interface CombatStats {
  readonly damage: number;
  readonly accuracy: number;
  readonly speed: number;
}

// Trigram stance definitions (keep local if it's just the union, or import from enums)
// For consistency, let's use the one from enums.ts
import type { TrigramStance as EnumTrigramStance } from "./enums"; // Add this if removing local
export type TrigramStance = EnumTrigramStance;
export type PlayerArchetype = EnumPlayerArchetype;
export type CombatState = EnumCombatState;
export type StatusEffectType = EnumStatusEffectType;

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
export interface PlayerState extends CombatStats {
  readonly playerId: EntityId;
  readonly position: Position;
  readonly stance: TrigramStance; // Uses the aliased EnumTrigramStance
  readonly archetype: PlayerArchetype; // Uses the aliased EnumPlayerArchetype
  readonly combatState: CombatState; // Uses the aliased EnumCombatState
  readonly facing: "left" | "right";
  readonly isAttacking: boolean;
  readonly isBlocking: boolean;
  readonly lastStanceChangeTime?: Timestamp;
  readonly conditions: readonly CombatCondition[];
  readonly comboCount: number;
  readonly lastActionTime: Timestamp;
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
