// Common shared types for Black Trigram Korean martial arts game

// Basic geometric types
export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export interface Rectangle extends Position, Dimensions {}

export interface Circle extends Position {
  readonly radius: number;
}

export interface Vector2D {
  readonly x: number;
  readonly y: number;
}

// Time and duration
export interface TimeRange {
  readonly start: number;
  readonly end: number;
  readonly duration: number;
}

export interface Timestamp {
  readonly created: number;
  readonly updated: number;
}

// Numeric ranges and values
export interface NumberRange {
  readonly min: number;
  readonly max: number;
}

export interface DamageRange extends NumberRange {
  readonly critical?: number;
  readonly type?: string;
}

export interface StatRange extends NumberRange {
  readonly current: number;
}

// Generic data structures
export interface KeyValue<T = any> {
  readonly [key: string]: T;
}

export interface NamedEntity {
  readonly id: string;
  readonly name: string;
}

export interface KoreanNamedEntity extends NamedEntity {
  readonly koreanName: string;
  readonly englishName: string;
  readonly romanized?: string;
}

// Validation and constraints
export interface Constraint<T> {
  readonly validate: (value: T) => boolean;
  readonly message: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
  readonly warnings?: readonly string[];
}

// Event system
export interface GameEvent<T = any> {
  readonly type: string;
  readonly timestamp: number;
  readonly source: string;
  readonly data: T;
  readonly id?: string;
}

export interface EventHandler<T = any> {
  (event: GameEvent<T>): void | Promise<void>;
}

// Resource management
export interface Resource {
  readonly id: string;
  readonly type: string;
  readonly url?: string;
  readonly data?: any;
  readonly loaded: boolean;
  readonly error?: string;
}

export interface ResourceCollection {
  readonly [id: string]: Resource;
}

// Configuration objects
export interface Config {
  readonly version: string;
  readonly environment: "development" | "production" | "test";
  readonly debug: boolean;
  readonly performance: {
    readonly targetFPS: number;
    readonly enableProfiling: boolean;
  };
}

// Error handling
export interface GameError extends Error {
  readonly code: string;
  readonly category: "system" | "user" | "network" | "validation";
  readonly severity: "low" | "medium" | "high" | "critical";
  readonly timestamp: number;
  readonly context?: KeyValue;
}

export interface ErrorHandler {
  (error: GameError): void;
}

// Animation and transitions
export interface AnimationFrame {
  readonly time: number;
  readonly value: any;
  readonly easing?: string;
}

export interface Animation {
  readonly id: string;
  readonly duration: number;
  readonly frames: readonly AnimationFrame[];
  readonly loop?: boolean;
  readonly autoStart?: boolean;
}

// UI base types
export interface BaseUIProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly alpha?: number;
  readonly rotation?: number;
  readonly scale?: number | { x: number; y: number };
}

// Theme and styling
export interface ColorTheme {
  readonly primary: number;
  readonly secondary: number;
  readonly accent: number;
  readonly background: number;
  readonly text: number;
  readonly border: number;
  readonly success: number;
  readonly warning: number;
  readonly error: number;
}

export interface FontStyle {
  readonly family: string;
  readonly size: number;
  readonly weight: string | number;
  readonly style?: "normal" | "italic" | "oblique";
  readonly color?: number;
}

// Performance monitoring
export interface PerformanceMetrics {
  readonly fps: number;
  readonly frameTime: number;
  readonly memoryUsage: number;
  readonly drawCalls: number;
  readonly activeObjects: number;
}

// Utility types
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export default Position;
