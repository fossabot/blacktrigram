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
}

export interface VitalPointEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number; // in milliseconds
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source?: string; // Optional source identifier
}

export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly damage: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean: string; // Simple string for Korean text in effects
  readonly color: number;
  readonly createdAt: number;
}
