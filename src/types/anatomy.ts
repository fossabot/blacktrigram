// Vital points and anatomy system for Korean martial arts

import type {
  EffectType,
  EffectIntensity,
  VitalPointCategory,
  VitalPointSeverity,
  BodyRegion,
} from "./enums";
import type { Position } from "./common";
import { KoreanText } from "./korean-text";

export interface AnatomicalLocation {
  readonly x: number; // Relative position (0-1)
  readonly y: number; // Relative position (0-1)
  readonly region: BodyRegion;
}

export interface VitalPointEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly duration: number;
  readonly intensity: EffectIntensity;
  readonly description: KoreanText;
  readonly stackable: boolean;
}

export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText;
  readonly korean: string; // Deprecated, use name.korean
  readonly english: string; // Deprecated, use name.english
  readonly category: VitalPointCategory;
  readonly description: KoreanText;
  readonly effects: readonly VitalPointEffect[];
  readonly location: AnatomicalLocation;
  readonly severity: VitalPointSeverity;
  readonly technique: readonly string[];
  readonly baseAccuracy: number;
  readonly baseDamage: number;
  readonly baseStun: number;
  readonly damageMultiplier: number;
}

export interface HitEffect {
  readonly id: string;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly position: Position;
  readonly damage: number;
  readonly color: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean: string; // Korean damage text
  readonly createdAt: number; // Timestamp
}

export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly effects: readonly VitalPointEffect[];
  readonly vitalPointsHit: readonly string[];
}

// Add missing RegionData interface if not already present
export interface RegionData {
  readonly name: KoreanText;
  readonly subRegions: readonly string[];
  readonly vitalPoints: readonly string[];
  readonly vulnerability: number;
  readonly pressure_points: readonly string[];
}
