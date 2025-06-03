// Anatomical system types for precise Korean martial arts targeting

import type { KoreanText } from "./korean-text";
import type { StatusEffect } from "./effects";
import type {
  DamageType,
  EffectIntensity,
  EffectType,
  VitalPointCategory as EnumVitalPointCategory,
  VitalPointSeverity as EnumVitalPointSeverity,
} from "./enums";
import { Position } from "./common";

// Use enum types directly
export type VitalPointCategory = EnumVitalPointCategory;
export type VitalPointSeverity = EnumVitalPointSeverity;

// Anatomical regions for vital point targeting
export type AnatomicalRegion =
  | "head"
  | "neck"
  | "torso"
  | "arms"
  | "legs"
  | "face_upper"
  | "temples"
  | "eyes"
  | "philtrum"
  | "throat"
  | "solar_plexus"
  | "chest"
  | "liver"
  | "limbs"
  | "general"
  | "internal"
  | "pressure_points"
  | "head_side"
  | "upper_abdomen_center"
  | "nose"
  | "jaw"
  | "mastoid_process"
  | "occiput"
  | "ribs"
  | "clavicle"
  | "kidneys"
  | "spleen"
  | "floating_ribs"
  | "face"
  | "leg_back_knee"
  | "upper_back"
  | "lower_back"
  | "left_arm"
  | "right_arm"
  | "left_leg"
  | "right_leg"
  | "hands"
  | "feet"
  | "joints"
  | "abdomen"
  | "back";

// 3D anatomical location with depth
export interface AnatomicalLocation {
  readonly region: AnatomicalRegion;
  readonly x: number; // 0-1 horizontal position
  readonly y: number; // 0-1 vertical position
  readonly z?: number; // 0-1 depth (optional for 2D)
}

// Complete vital point definition
export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText; // Add missing name property
  readonly koreanName: string;
  readonly englishName: string;
  readonly location: AnatomicalLocation;
  readonly category: VitalPointCategory;
  readonly severity: VitalPointSeverity;
  readonly effects: readonly string[];
  readonly description: KoreanText;
  readonly techniques: readonly string[];
  readonly damage: {
    readonly base: number;
    readonly multiplier: number;
    readonly type: DamageType;
  };
  readonly successRate: number;
  readonly requiredAccuracy: number;
  readonly statusEffects: readonly StatusEffect[];
}

// Vital point location for hit detection
export interface VitalPointLocation {
  readonly region: AnatomicalRegion;
  readonly coordinates: {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
  };
  readonly hitbox: {
    readonly width: number;
    readonly height: number;
    readonly depth?: number;
  };
}

// Body part definitions for combat targeting
export interface BodyPart {
  readonly id: string;
  readonly name: KoreanText;
  readonly region: AnatomicalRegion;
  readonly vitalPoints: readonly string[]; // VitalPoint IDs
  readonly resistance: number; // 0-1 damage resistance
  readonly mobility: number; // 0-1 how easily targeted
}

// Human anatomy model for combat simulation
export interface AnatomyModel {
  readonly bodyParts: readonly BodyPart[];
  readonly vitalPoints: readonly VitalPoint[];
  readonly bloodVessels: readonly string[];
  readonly nerveClusters: readonly string[];
  readonly pressurePoints: readonly string[];
}

// Hit detection for anatomical targeting
export interface AnatomicalHit {
  readonly targetPoint: VitalPoint;
  readonly accuracy: number;
  readonly penetration: number;
  readonly angle: number;
  readonly force: number;
}

// Korean martial arts specific anatomy
export interface KoreanAnatomySystem {
  readonly acupuncturePoints: readonly VitalPoint[];
  readonly meridianLines: readonly string[];
  readonly kiFlowPoints: readonly VitalPoint[];
  readonly traditionalNames: Record<string, KoreanText>;
}

// Fix VitalPointHitResult to include the expected properties
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly vitalPoint: VitalPoint;
  readonly effects: readonly StatusEffect[]; // Add missing effects property
  readonly vitalPointsHit: readonly VitalPoint[]; // Add missing vitalPointsHit property
  readonly severity: VitalPointSeverity;
  readonly criticalHit: boolean;
  readonly location: Position;
  readonly techniqueEffectiveness: number;
  readonly painLevel: number;
  readonly stunDuration: number;
  readonly consciousnessImpact: number;
  readonly bloodLoss: number;
  readonly description: KoreanText;
}

export interface RegionData {
  readonly region: AnatomicalRegion;
  readonly vitalPoints: readonly VitalPoint[];
  readonly resistance: number;
}

// Export VitalPointEffect that was missing
export interface VitalPointEffect {
  readonly id: string;
  readonly type: EffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source?: string;
}
