// Common shared types for Black Trigram Korean martial arts game

import type {
  DamageType,
  EffectIntensity,
  EffectType as EnumEffectType, // Renamed to avoid conflict with local EffectType if any
} from "./enums";
import type { KoreanText } from "./korean-text"; // For KoreanText in CombatCondition

// Basic shared types
export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export interface BoundingBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface Vector2D {
  readonly x: number;
  readonly y: number;
}

export interface Range {
  readonly min: number;
  readonly max: number;
}

export interface TimeRange {
  readonly start: number;
  readonly end: number;
  readonly duration: number;
}

export interface KoreanMartialArtsMetadata {
  readonly culturalAccuracy: number; // 0-1 scale
  readonly traditionalBasis: string;
  readonly modernAdaptation: string;
  readonly philosophicalDepth: number; // 1-5 scale
}

export type Direction = "left" | "right" | "up" | "down";
export type Facing = "left" | "right";

// Fix: Remove duplicate Timestamp declarations - keep only one
export type Timestamp = number;

// Add missing exports for systems.ts
export interface Velocity {
  readonly x: number;
  readonly y: number;
}

export type EntityId = string;

export interface BilingualIdentifier {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
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

// Remove createPlayerState - it should be in utils/playerUtils.ts
// Keep only common shared types here
