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
  readonly name: string;
  readonly description: string;
  readonly duration: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly intensity: EffectIntensity;
  readonly stackable: boolean;
  readonly source: string;
  readonly modifiers?: readonly EffectModifier[];
  readonly magnitude?: number;
}

// Effect types
export enum EffectType {
  STUN = "stun",
  BLEED = "bleed",
  POISON = "poison",
  PARALYSIS = "paralysis",
  WEAKNESS = "weakness",
  STRENGTH = "strength",
  SPEED = "speed",
  REGENERATION = "regeneration",
  VULNERABILITY = "vulnerability",
  IMMUNITY = "immunity",
  CONFUSION = "confusion",
  FEAR = "fear",
  RAGE = "rage",
  FOCUS = "focus",
}

// Effect intensity levels
export enum EffectIntensity {
  WEAK = "weak",
  MILD = "mild",
  MODERATE = "moderate",
  STRONG = "strong",
  SEVERE = "severe",
  EXTREME = "extreme",
}

// Effect modifiers for stat changes
export interface EffectModifier {
  readonly stat: PlayerStatType;
  readonly value: number | string;
  readonly type: "add" | "multiply" | "set";
  readonly permanent?: boolean;
}

// Player stat types that can be modified
export type PlayerStatType =
  | "health"
  | "ki"
  | "stamina"
  | "attackPower"
  | "defense"
  | "speed"
  | "accuracy"
  | "criticalChance"
  | "balance"
  | "consciousness"
  | "pain"
  | "focusLevel";

// Vital point effect when hit
export interface VitalPointEffect {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly duration: number;
  readonly intensity: number;
  readonly stackable: boolean;
}

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
  readonly area: {
    readonly center: Position;
    readonly radius: number;
  };
  readonly duration: number;
  readonly intensity: number;
  readonly affectedPlayers: readonly string[];
  readonly statusEffect?: StatusEffect;
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

export default HitEffect;
