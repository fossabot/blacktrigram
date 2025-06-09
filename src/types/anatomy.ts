// Korean martial arts anatomy system for precise vital point targeting

// Fix: Import enums as values to avoid conflicts
import {
  VitalPointCategory,
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
  BodyRegion,
  DamageType,
  TrigramStance,
} from "./enums";

import type { KoreanText, Position } from "./index";

// Fix: Define DamageRange locally to avoid circular dependency
export interface DamageRange {
  readonly min: number;
  readonly max: number;
  readonly average: number;
}

// Vital point definition with Korean martial arts terminology
export interface VitalPoint {
  readonly id: string;
  readonly korean: KoreanText;
  readonly anatomicalName: string;
  readonly category: VitalPointCategory;
  readonly severity: VitalPointSeverity;
  readonly position: Position;
  readonly radius: number;
  readonly effects: readonly VitalPointEffect[];
  readonly damage?: DamageRange;
  readonly description: KoreanText;
  readonly difficulty: number;
  readonly requiredForce: number;
  readonly safetyWarning: string;
}

// Fix: Remove duplicate enum declarations - use imports instead
export type { VitalPointCategory, VitalPointSeverity } from "./enums";

// Effects of striking vital points
export interface VitalPointEffect {
  readonly type: VitalPointEffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
}

// Fix: Remove conflicting enum declarations
// Use imported enums instead of redeclaring

// Body region data
export interface RegionData {
  readonly name: KoreanText;
  readonly boundaries: Position[];
  readonly vitalPoints: readonly VitalPoint[];
  readonly vulnerabilities: readonly DamageType[];
}

// Anatomical hit for combat system
export interface AnatomicalHit {
  readonly vitalPoint: VitalPoint;
  readonly force: number;
  readonly accuracy: number;
  readonly damage: number;
  readonly effects: readonly VitalPointEffect[];
}

// Vital point hit result
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly vitalPoint?: VitalPoint;
  readonly damage: number;
  readonly effects: readonly VitalPointEffect[];
  readonly criticalHit: boolean;
}

// Fix: Use proper type alias instead of conflicting enum
export type AnatomicalRegionType =
  | "head"
  | "neck"
  | "torso_front"
  | "torso_back"
  | "left_arm_upper"
  | "left_arm_lower"
  | "left_hand"
  | "right_arm_upper"
  | "right_arm_lower"
  | "right_hand"
  | "left_leg_upper"
  | "left_leg_lower"
  | "left_foot"
  | "right_leg_upper"
  | "right_leg_lower"
  | "right_foot"
  | "joints"
  | "internal_organs";

export interface AnatomicalLocation {
  readonly region: AnatomicalRegionType;
  readonly subRegion?: string;
  readonly coordinates: Position;
}

export interface BodyPart {
  readonly id: string;
  readonly name: KoreanText;
  readonly region: AnatomicalRegionType;
  readonly vitalPoints: readonly VitalPoint[];
  readonly connections: readonly string[];
}

export interface AnatomyModel {
  readonly bodyParts: readonly BodyPart[];
  readonly vitalPointsByRegion: Record<
    AnatomicalRegionType,
    readonly VitalPoint[]
  >;
  readonly totalVitalPoints: number;
}
