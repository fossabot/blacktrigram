// Core Korean martial arts game types - UNIFIED SOURCE OF TRUTH
// Re-export all types from their respective modules.

export * from "./common";
export * from "./constants";
export * from "./enums";
export * from "./effects";
export * from "./anatomy";
export * from "./player";
export * from "./combat";
export * from "./trigram";
export * from "./game";
export * from "./ui";
export * from "./audio";
export * from "./components";
export * from "./korean-text";
export * from "./systems";

// Re-export PixiReactElementProps from @pixi/react, assuming pixi-react.d.ts has augmented it.
export type { PixiReactElementProps } from "@pixi/react";

// ===== Type Utilities =====

// Utility type for readonly deep properties
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Utility type for partial updates with readonly preservation
export type PartialUpdate<T> = {
  readonly [P in keyof T]?: T[P];
};

// Korean martial arts specific utility types
export type KoreanBilingual<T extends string = string> = {
  readonly korean: T;
  readonly english: T;
  readonly hanja?: T | undefined;
};

export type TrigramSelector<T> = {
  readonly [K in import("./enums").TrigramStance]: T;
};

// Combat system utility types
export type DamageRange = {
  readonly min: number;
  readonly max: number;
  readonly average: number;
};

export type EffectivenessMatrix<T extends string = string> = {
  readonly [attacker in T]: {
    readonly [defender in T]: number;
  };
};

// Player archetype utility type for future implementation
export type PlayerArchetype =
  | "musa" // 무사 - Traditional Warrior
  | "amsalja" // 암살자 - Shadow Assassin
  | "hacker" // 해커 - Cyber Warrior
  | "jeongbo_yowon" // 정보요원 - Intelligence Operative
  | "jojik_pokryeokbae"; // 조직폭력배 - Organized Crime

// System identification utility
export type SystemId =
  | "combat"
  | "vital_point"
  | "trigram"
  | "physics"
  | "audio"
  | "rendering"
  | "ai"
  | "input"
  | "networking";

// Performance monitoring utility
export type MetricType =
  | "frame_time"
  | "update_time"
  | "render_time"
  | "memory_usage"
  | "cpu_usage"
  | "network_latency";
