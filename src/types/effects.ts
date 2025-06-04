// Status effects system for Korean martial arts

import type { EffectType, EffectIntensity } from "./enums";
import type { KoreanText } from "./korean-text";
import type { Position } from "./common";

export interface StatusEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly intensity: EffectIntensity;
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
}

export interface VitalPointEffect extends StatusEffect {
  // VitalPointEffect is essentially a StatusEffect with potential additional properties
  readonly vitalPointId?: string;
  readonly bodyRegion?: string;
}

// Fix HitEffect type to match usage
export interface HitEffect {
  readonly id: string;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly position: Position;
  readonly damage: number;
  readonly timestamp: number;
  readonly duration: number;
  readonly color: number;
  readonly playerId?: string;
}
