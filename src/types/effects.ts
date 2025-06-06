// Status effects system for Korean martial arts

import type { EffectType, EffectIntensity, DamageType } from "./enums"; // Added DamageType
import type { KoreanText } from "./korean-text";
import type { Position } from "./common";

export interface StatusEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly intensity: EffectIntensity; // Uses EffectIntensity from enums
  readonly duration: number; // in milliseconds
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source?: string; // Optional source identifier
  readonly chance?: number;
  readonly modifiers?: readonly EffectModifier[];
}

export interface EffectModifier {
  readonly attribute: string;
  readonly value: number;
  readonly type: "flat" | "percentage";
  readonly damageType?: DamageType; // Added optional damageType
}

export interface VitalPointEffect extends StatusEffect {
  // VitalPointEffect is essentially a StatusEffect with potential additional properties
  readonly vitalPointId?: string;
  readonly bodyRegion?: string;
}

// Hit effect for visual combat feedback
export interface HitEffect {
  readonly id: string;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly position: Position;
  readonly damage: number;
  readonly timestamp: number;
  readonly duration: number;
  readonly color: number;
  readonly playerId: string;
  // Remove korean property - use HitEffectText for bilingual text
}

// Separate interface for Korean text in hit effects
export interface HitEffectText {
  readonly korean: string;
  readonly english: string;
}
