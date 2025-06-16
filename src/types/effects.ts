/**
 * @fileoverview Effect system types for Korean martial arts combat
 */

import type { Position } from "./common";
import type { KoreanText } from "./korean-text";

/**
 * Types of hit effects that can occur during combat
 */
export enum HitEffectType {
  HIT = "hit",
  CRITICAL_HIT = "critical_hit",
  TECHNIQUE_HIT = "technique_hit",
  VITAL_POINT_HIT = "vital_point_hit",
  STUN = "stun",
  KO = "ko",
  BLOCK = "block",
  COUNTER = "counter",
  DODGE = "dodge",
  ABSORB = "absorb",
}

/**
 * Intensity levels for effects
 */
export enum EffectIntensity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  EXTREME = "extreme",
}

/**
 * Base hit effect interface
 */
export interface HitEffect {
  readonly id: string;
  readonly type: HitEffectType;
  readonly attackerId: string;
  readonly defenderId: string;
  readonly timestamp: number;
  readonly duration: number;
  readonly position?: Position;
  readonly intensity: number;
  readonly text?: string;
  readonly startTime: number;
}

/**
 * Extended hit effect for display with animation properties
 */
export interface DisplayHitEffect extends HitEffect {
  readonly opacity: number;
  readonly scale: number;
  readonly displayAlpha: number;
  readonly displayY: number;
  readonly displaySize: number;
}

/**
 * Status effect that can be applied to players
 */
export interface StatusEffect {
  readonly id: string;
  readonly type:
    | "stun"
    | "poison"
    | "burn"
    | "bleed"
    | "strengthened"
    | "weakened";
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source: string;
  readonly startTime: number;
  readonly endTime: number;
}

/**
 * Environmental effect interface for dojang and arena conditions
 */
export interface EnvironmentalEffect {
  readonly id: string;
  readonly type: "lighting" | "weather" | "terrain" | "atmosphere";
  readonly name: KoreanText;
  readonly affectedArea: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly effects: {
    readonly visibilityModifier?: number;
    readonly accuracyModifier?: number;
    readonly movementModifier?: number;
    readonly damageModifier?: number;
  };
  readonly duration: number;
}

// Export types
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
