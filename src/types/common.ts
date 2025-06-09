/**
 * Common utility types for Korean martial arts game
 */

// Basic geometric types
export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export interface Bounds extends Position, Dimensions {}

export interface Vector2D {
  readonly x: number;
  readonly y: number;
}

export interface Velocity extends Vector2D {}

// Entity system types
export type EntityId = string;

export interface Entity {
  readonly id: EntityId;
  readonly position: Position;
  readonly velocity?: Velocity;
  readonly bounds?: Bounds;
}

// Time and duration types
export type Timestamp = number;
export type Duration = number;

export interface TimeRange {
  readonly start: Timestamp;
  readonly end: Timestamp;
  readonly duration: Duration;
}

// Color types
export type ColorValue = number; // Hex color value
export type ColorAlpha = number; // 0-1 alpha value

export interface ColorRGBA {
  readonly r: number; // 0-255
  readonly g: number; // 0-255
  readonly b: number; // 0-255
  readonly a: number; // 0-1
}

// Event system types
export interface GameEvent<T = any> {
  readonly type: string;
  readonly timestamp: Timestamp;
  readonly data: T;
}

// Result types
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Optional and nullable types
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

// Korean text support
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

// Range types for combat calculations
export interface Range<T = number> {
  readonly min: T;
  readonly max: T;
}

export interface WeightedRange extends Range {
  readonly weight: number;
}

// Configuration types
export interface ConfigOption<T = any> {
  readonly key: string;
  readonly value: T;
  readonly default: T;
  readonly description?: string;
}

// Korean martial arts specific types
export interface MaritalArtsMetadata {
  readonly origin: string;
  readonly philosophy: KoreanText;
  readonly practitioner: string;
  readonly difficulty: number; // 1-10 scale
}

// Utility functions as types
export type Predicate<T> = (value: T) => boolean;
export type Transformer<T, U> = (value: T) => U;
export type Comparator<T> = (a: T, b: T) => number;

// Error types
export interface GameError {
  readonly code: string;
  readonly message: string;
  readonly timestamp: Timestamp;
  readonly context?: Record<string, any>;
}

// Asset loading types
export interface AssetReference {
  readonly id: string;
  readonly url: string;
  readonly type: string;
  readonly loaded: boolean;
}

export type AssetLoadingState = "pending" | "loading" | "loaded" | "error";

// Performance monitoring
export interface PerformanceMetrics {
  readonly fps: number;
  readonly frameTime: number;
  readonly memoryUsage: number;
  readonly renderTime: number;
}

// Export utility type guards
export const isPosition = (obj: any): obj is Position => {
  return obj && typeof obj.x === "number" && typeof obj.y === "number";
};

export const isKoreanText = (obj: any): obj is KoreanText => {
  return (
    obj && typeof obj.korean === "string" && typeof obj.english === "string"
  );
};

export const isColorValue = (value: any): value is ColorValue => {
  return typeof value === "number" && value >= 0 && value <= 0xffffff;
};
