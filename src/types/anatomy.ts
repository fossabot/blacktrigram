// Korean martial arts anatomy system for precise vital point targeting

import { Position } from "./common";
import { StatusEffect } from "./effects";
import type {
  VitalPointCategory,
  VitalPointSeverity,
  BodyRegion,
  EffectType,
  EffectIntensity,
} from "./enums";
import type { KoreanText } from "./korean-text";

// Anatomical location for targeting in Korean martial arts
export interface AnatomicalLocation {
  readonly x: number; // Percentage from left (0-100)
  readonly y: number; // Percentage from top (0-100)
  readonly region: BodyRegion;
}

// Korean martial arts vital point definition - FIXED: Complete interface
export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText;
  readonly korean: string; // For backward compatibility
  readonly englishName: string; // Required property
  readonly koreanName: string; // Required property
  readonly category: VitalPointCategory;
  readonly description: KoreanText;
  readonly location: AnatomicalLocation;
  readonly severity: VitalPointSeverity;
  readonly baseAccuracy?: number; // Optional with default
  readonly baseDamage?: number; // Added missing property
  readonly damageMultiplier?: number; // Optional with default
  readonly effects: readonly VitalPointEffect[]; // Changed from string[]
  readonly techniques: readonly string[]; // Required property
  readonly damage: number; // Required property
  readonly technique?: readonly string[]; // Alternative name for techniques
  readonly baseStun?: number; // Optional stun duration
}

// Vital point effect for Korean martial arts realism - FIXED: Use proper types
export interface VitalPointEffect {
  readonly id: string;
  readonly type: EffectType; // Fixed: Use imported type
  readonly intensity: EffectIntensity; // Fixed: Use imported type
  readonly duration: number; // Duration in milliseconds
  readonly description: KoreanText;
  readonly stackable: boolean;
}

// Vital point hit result
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly effects: readonly StatusEffect[];
  readonly vitalPointsHit: readonly VitalPoint[]; // Fixed type
  readonly vitalPoint?: VitalPoint;
  readonly severity: VitalPointSeverity;
  readonly criticalHit: boolean;
  readonly location: Position;
  readonly effectiveness: number;
  readonly statusEffectsApplied: readonly StatusEffect[];
  readonly painLevel: number;
  readonly consciousnessImpact: number;
}

// Body region data
export interface RegionData {
  readonly id: BodyRegion;
  readonly name: KoreanText; // Required property
  readonly description: KoreanText;
  readonly vitalPoints: readonly VitalPoint[]; // Changed from string[]
  readonly damageModifier: number;
  readonly defenseRating: number;
}

// Anatomical region
export interface AnatomicalRegion {
  readonly id: string;
  readonly name: KoreanText;
  readonly bodyRegion: BodyRegion;
  readonly bounds: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly vitalPoints: readonly VitalPoint[];
  readonly description: KoreanText;
}

// Body part for detailed anatomy
export interface BodyPart {
  readonly id: string;
  readonly name: KoreanText;
  readonly region: BodyRegion;
  readonly subRegions?: readonly string[];
  readonly vulnerabilities: readonly VitalPointCategory[];
  readonly defaultProtection: number;
}

// Complete anatomy model
export interface AnatomyModel {
  readonly regions: readonly AnatomicalRegion[];
  readonly vitalPoints: readonly VitalPoint[];
  readonly bodyParts: readonly BodyPart[];
}

// Anatomical hit for combat system
export interface AnatomicalHit {
  readonly position: Position;
  readonly region: BodyRegion;
  readonly vitalPointsInRange: readonly VitalPoint[];
  readonly accuracy: number;
  readonly force: number;
}

// Korean anatomy system interface
export interface KoreanAnatomySystem {
  readonly getVitalPointsInRegion: (
    region: BodyRegion
  ) => readonly VitalPoint[];
  readonly calculateHitAccuracy: (
    targetPosition: Position,
    attackAccuracy: number
  ) => number;
  readonly getRegionByPosition: (position: Position) => BodyRegion | null;
  readonly getVitalPointById: (id: string) => VitalPoint | undefined;
}
