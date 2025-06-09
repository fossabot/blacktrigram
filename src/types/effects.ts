// Combat effects and status system for Korean martial arts

import type { PlayerState, KoreanText, Position, VitalPoint } from "./index";

// Hit effect for visual feedback
export interface HitEffect {
  readonly id: string;
  readonly type: HitEffectType;
  readonly attackerId: string;
  readonly defenderId: string;
  readonly timestamp: number;
  readonly duration: number;
  readonly position?: Position;
  readonly velocity?: { x: number; y: number };
  readonly color?: number;
  readonly size?: number;
  readonly alpha?: number;
  readonly lifespan?: number;
  readonly text?: string | KoreanText;
  readonly damageAmount?: number;
  readonly vitalPointId?: string;
  readonly statusEffect?: StatusEffect;
  readonly yOffset?: number;
}

// Hit effect types
export enum HitEffectType {
  GENERAL_DAMAGE = "general_damage",
  CRITICAL_HIT = "critical_hit",
  VITAL_POINT_STRIKE = "vital_point_strike",
  STATUS_EFFECT = "status_effect",
  MISS = "miss",
  BLOCK = "block",
  PARRY = "parry",
  COUNTER = "counter",
}

// Status effects that can be applied to players
export interface StatusEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly effects?: {
    readonly health?: number;
    readonly ki?: number;
    readonly stamina?: number;
    readonly accuracy?: number;
    readonly damage?: number;
    readonly speed?: number;
    readonly defense?: number;
  };
}

// Effect types
export type EffectType =
  | "stun"
  | "poison"
  | "burn"
  | "bleed"
  | "exhausted"
  | "focused"
  | "rage"
  | "defensive"
  | "weakened"
  | "strengthened";

// Effect intensity levels
export type EffectIntensity = "minor" | "moderate" | "severe" | "critical";

// Particle effect for visual feedback
export interface ParticleEffect {
  readonly id: string;
  readonly type: ParticleType;
  readonly position: Position;
  readonly velocity: { x: number; y: number };
  readonly acceleration?: { x: number; y: number };
  readonly color: number;
  readonly size: number;
  readonly lifetime: number;
  readonly fadeOut?: boolean;
  readonly gravity?: number;
}

// Particle effect types
export enum ParticleType {
  SPARK = "spark",
  BLOOD = "blood",
  ENERGY = "energy",
  DUST = "dust",
  FLASH = "flash",
  SMOKE = "smoke",
  LIGHTNING = "lightning",
  WIND = "wind",
}

// Environmental effect
export interface EnvironmentalEffect {
  readonly id: string;
  readonly type: EnvironmentalEffectType;
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

// Fix: Add missing HitEffect interface
export interface HitEffect {
  readonly id: string;
  readonly type: "damage" | "critical" | "block" | "miss";
  readonly position: Position;
  readonly text?: string | KoreanText;
  readonly damageAmount?: number;
  readonly color?: number;
  readonly duration: number;
  readonly intensity: number;
}

// Fix: Update DisplayHitEffect interface to include missing properties
export interface DisplayHitEffect extends HitEffect {
  readonly opacity: number;
  readonly scale: number;
  readonly startTime: number;
  // Add missing display properties
  readonly displayAlpha: number;
  readonly displayY: number;
  readonly displaySize: number;
}

export default HitEffect;
