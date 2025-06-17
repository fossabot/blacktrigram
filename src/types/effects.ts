/**
 * @fileoverview Effect system types for Korean martial arts combat
 */

import type { Position } from "./common";
import type { KoreanText } from "./korean-text";

/**
 * @enum HitEffectType
 * @description Types of hit effects that can occur during combat
 */
export enum HitEffectType {
  HIT = "hit",
  CRITICAL_HIT = "critical_hit",
  BLOCK = "block",
  MISS = "miss",
  VITAL_POINT_HIT = "vital_point_hit", // Add missing type
  TECHNIQUE_HIT = "technique_hit",
  STUN = "stun",
  KO = "ko",
  COUNTER = "counter",
  DODGE = "dodge",
  ABSORB = "absorb",
}

/**
 * @enum EffectIntensity
 * @description Intensity levels for status effects
 */
export enum EffectIntensity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

/**
 * @interface Position
 * @description Basic position interface
 */
export interface Position {
  readonly x: number;
  readonly y: number;
}

/**
 * @interface HitEffect
 * @description Visual effect displayed when attacks hit
 */
export interface HitEffect {
  readonly id: string;
  readonly type: HitEffectType;
  readonly attackerId: string;
  readonly defenderId: string;
  readonly timestamp: number;
  readonly duration: number;
  readonly position: Position; // Fix: Make required
  readonly intensity: number;
  readonly text?: string;
  readonly startTime: number;
}

/**
 * @interface StatusEffect
 * @description Status effects that can be applied to players
 */
export interface StatusEffect {
  readonly id: string;
  readonly type: string; // Changed from EffectType to string
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source: string;
  readonly startTime: number;
  readonly endTime: number;
}

/**
 * @interface DisplayHitEffect
 * @description Extended hit effect for display purposes
 */
export interface DisplayHitEffect extends HitEffect {
  readonly displayDuration: number; // Add missing property
  readonly fadeOutTime: number; // Add missing property
  readonly displayAlpha: number;
  readonly displayY: number;
  readonly displaySize: number;
  readonly opacity: number;
  readonly scale: number;
}

/**
 * @interface EnvironmentalEffect
 * @description Environmental effects in the combat arena
 */
export interface EnvironmentalEffect {
  readonly id: string;
  readonly type: string;
  readonly position: Position;
  readonly radius: number;
  readonly duration: number;
  readonly intensity: number;
  readonly startTime: number;
}

// Export all types
export type {
  HitEffect,
  DisplayHitEffect,
  StatusEffect,
  EnvironmentalEffect,
  Position,
  KoreanText,
};

// Default export should be the main interface, not HitEffect
export default StatusEffect;

// Environmental effect types
export enum EnvironmentalEffectType {
  SMOKE = "smoke",
  FIRE = "fire",
  ICE = "ice",
  WIND = "wind",
  LIGHTNING = "lightning",
  DARKNESS = "darkness",
  LIGHT = "light",
  PRESSURE = "pressure",
}

// Fix: Add missing VisualEffect export
export interface VisualEffect {
  readonly id: string;
  readonly type: string;
  readonly duration: number;
  readonly intensity: number;
  readonly position?: Position;
  readonly color?: number;
}

// Fix: Add missing EffectSystem export
export interface EffectSystem {
  readonly effects: readonly VisualEffect[];
  readonly addEffect: (effect: VisualEffect) => void;
  readonly removeEffect: (id: string) => void;
  readonly updateEffects: (deltaTime: number) => void;
}

// Fix: Remove duplicate HitEffect interface - use the complete one above

// Fix: Update DisplayHitEffect interface to extend the main HitEffect
export interface DisplayHitEffect extends HitEffect {
  readonly opacity: number;
  readonly scale: number;
  readonly startTime: number;
  readonly displayAlpha: number;
  readonly displayY: number;
  readonly displaySize: number;
}
