// Korean martial arts anatomy system for precise vital point targeting

import { Position } from "./common";
import type { KoreanText } from "./korean-text";
import type {
  BodyRegion,
  EffectIntensity,
  EffectType,
  VitalPointCategory as EnumVitalPointCategory,
  VitalPointSeverity as EnumVitalPointSeverity,
} from "./enums"; // Corrected imports
import type { StatusEffect } from "./effects"; // Corrected to import StatusEffect from effects.ts

// Anatomical types for Korean martial arts vital points system

// Vital point definition with Korean martial arts terminology
export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText;
  readonly koreanName: string; // Traditional Korean name
  readonly chineseName?: string; // Traditional Chinese meridian name
  readonly modernName: string; // Medical/anatomical name
  readonly position: Position; // Relative position on body
  readonly region: AnatomicalRegion;
  readonly type: VitalPointType;
  readonly difficulty: VitalPointDifficulty;
  readonly effects: readonly VitalPointEffect[];
  readonly contraindications?: readonly string[]; // Safety warnings
}

// Anatomical regions for targeting
export enum AnatomicalRegion {
  HEAD = "head", // 머리 - Head and skull
  NECK = "neck", // 목 - Neck and throat
  CHEST = "chest", // 가슴 - Chest and ribs
  ABDOMEN = "abdomen", // 복부 - Abdomen and core
  BACK = "back", // 등 - Back and spine
  ARMS = "arms", // 팔 - Arms and shoulders
  HANDS = "hands", // 손 - Hands and wrists
  LEGS = "legs", // 다리 - Legs and hips
  FEET = "feet", // 발 - Feet and ankles
}

// Types of vital points
export enum VitalPointType {
  NERVE = "nerve", // 신경점 - Nerve points
  ARTERIAL = "arterial", // 동맥점 - Arterial pressure points
  MUSCULAR = "muscular", // 근육점 - Muscle attachment points
  JOINT = "joint", // 관절점 - Joint manipulation points
  ORGAN = "organ", // 장기점 - Organ pressure points
  MERIDIAN = "meridian", // 경락점 - Traditional meridian points
}

// Difficulty levels for precise targeting
export enum VitalPointDifficulty {
  EASY = "easy", // 쉬움 - Large, easy to hit targets
  MEDIUM = "medium", // 보통 - Moderate precision required
  HARD = "hard", // 어려움 - High precision required
  EXPERT = "expert", // 전문가 - Master-level precision
  LEGENDARY = "legendary", // 전설 - Legendary precision
}

// Effects of striking vital points
export interface VitalPointEffect {
  readonly type: VitalPointEffectType;
  readonly intensity: EffectIntensity;
  readonly duration: number; // milliseconds
  readonly damage?: DamageRange;
  readonly description: KoreanText;
  readonly conditions?: readonly string[]; // Required conditions
}

// Types of vital point effects
export enum VitalPointEffectType {
  PAIN = "pain", // 통증 - Pain induction
  PARALYSIS = "paralysis", // 마비 - Temporary paralysis
  UNCONSCIOUSNESS = "unconsciousness", // 기절 - Loss of consciousness
  DISORIENTATION = "disorientation", // 방향감각상실 - Confusion
  WEAKNESS = "weakness", // 쇠약 - Strength reduction
  STUN = "stun", // 기절 - Temporary stunning
  BREATHING = "breathing", // 호흡곤란 - Breathing difficulty
  BALANCE = "balance", // 균형상실 - Balance disruption
  ENERGY_DRAIN = "energy_drain", // 기력소모 - Ki/energy depletion
}

// Effect intensity levels
export enum EffectIntensity {
  LIGHT = "light", // 가벼움 - Light effect
  MODERATE = "moderate", // 보통 - Moderate effect
  SEVERE = "severe", // 심함 - Severe effect
  CRITICAL = "critical", // 치명적 - Critical effect
  LETHAL = "lethal", // 치사 - Potentially lethal (simulation only)
}

// Body map for visual representation
export interface BodyMap {
  readonly regions: Record<AnatomicalRegion, BodyRegion>;
  readonly vitalPoints: readonly VitalPoint[];
  readonly connections: readonly VitalPointConnection[];
  readonly stanceModifiers: Record<TrigramStance, VitalPointModifier[]>;
}

// Individual body region
export interface BodyRegion {
  readonly id: AnatomicalRegion;
  readonly name: KoreanText;
  readonly bounds: Rectangle;
  readonly vitalPoints: readonly string[]; // VitalPoint IDs
  readonly vulnerabilities: readonly DamageType[];
  readonly defenseModifier: number;
}

// Connection between vital points (meridian lines)
export interface VitalPointConnection {
  readonly id: string;
  readonly name: KoreanText;
  readonly startPoint: string; // VitalPoint ID
  readonly endPoint: string; // VitalPoint ID
  readonly type: "meridian" | "nerve" | "vascular";
  readonly stimulationEffect?: VitalPointEffect;
}

// Stance-based modifications to vital point effectiveness
export interface VitalPointModifier {
  readonly vitalPointId: string;
  readonly stance: TrigramStance;
  readonly accessibilityModifier: number; // 0-1, how easy to hit
  readonly effectivenessModifier: number; // Damage multiplier
  readonly description: KoreanText;
}

// Hit detection for vital points
export interface VitalPointHit {
  readonly vitalPoint: VitalPoint;
  readonly accuracy: number; // 0-1, how precisely hit
  readonly damage: number;
  readonly effects: readonly VitalPointEffect[];
  readonly timestamp: number;
  readonly attackerStance: TrigramStance;
  readonly defenderStance: TrigramStance;
}

// Safety and educational information
export interface SafetyInformation {
  readonly warnings: readonly KoreanText[];
  readonly contraindications: readonly KoreanText[];
  readonly medicalDisclaimer: KoreanText;
  readonly educationalPurpose: KoreanText;
  readonly traditionalContext: KoreanText;
}

// Rectangle interface for bounds
interface Rectangle {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export default VitalPoint;

// Korean martial arts vital point definition - FIXED: Complete interface
export interface KoreanVitalPoint {
  readonly id: string;
  readonly name: KoreanText; // Primary source for Korean, English, Romanized names
  // readonly koreanName: string; // Removed based on test error, use name.korean
  // readonly englishName: string; // Removed based on test error, use name.english
  // readonly korean?: string; // Original field, can be deprecated if name.korean is primary
  readonly category: EnumVitalPointCategory | string; // Use imported EnumVitalPointCategory
  readonly description: KoreanText;
  readonly location: VitalPointLocation;
  readonly severity: EnumVitalPointSeverity; // Use imported EnumVitalPointSeverity
  readonly baseAccuracy: number; // Base chance to hit (0-1)
  readonly baseDamage: number; // Base damage if hit
  readonly damageMultiplier: number; // Multiplier for this vital point
  readonly effects: readonly VitalPointEffect[];
  readonly techniques: readonly string[]; // IDs of techniques effective against this point
  readonly damage?: number; // Can be derived or specific override
  readonly baseStun?: number; // Base stun duration in ms
  // Add any other relevant properties from KoreanAnatomy.ts or KoreanVitalPoints.ts
}

// Body region data
export interface RegionData {
  readonly name: KoreanText;
  readonly subRegions?: readonly string[]; // Optional or ensure it's always present
  readonly vitalPoints: readonly VitalPoint[] | readonly string[]; // Allow string IDs or full VitalPoint objects
  readonly vulnerability: number;
  readonly pressure_points?: readonly string[]; // IDs of pressure points in this region
}

// Anatomical hit for combat system
export interface AnatomicalHit {
  readonly position: Position;
  readonly region: BodyRegion;
  readonly vitalPointsInRange: readonly VitalPoint[];
  readonly accuracy: number;
  readonly force: number;
}

// Vital point hit result
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly effects: readonly StatusEffect[];
  readonly vitalPointsHit: readonly VitalPoint[];
  readonly vitalPoint?: VitalPoint;
  readonly severity?: EnumVitalPointSeverity; // Use imported EnumVitalPointSeverity
  readonly criticalHit: boolean;
  readonly location: Position;
  readonly effectiveness: number;
  readonly statusEffectsApplied: readonly StatusEffect[];
  readonly painLevel: number;
  readonly consciousnessImpact: number;
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

// Ensure VitalPointSeverity is handled correctly, likely imported from enums.ts
// If it was defined here, it should be:
// export type VitalPointSeverity = "minor" | "moderate" | "severe" | "critical" | "lethal";
// But it's better in enums.ts

export type AnatomicalRegion =
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
  readonly x: number; // Relative X coordinate (0-1 or pixel based on context)
  readonly y: number; // Relative Y coordinate
  readonly z?: number; // Relative Z coordinate (depth)
  readonly region: AnatomicalRegion; // General region
  readonly specific_area?: string; // e.g., "Temporal", "Solar Plexus"
}

export interface BodyPart {
  readonly id: string;
  readonly name: KoreanText;
  readonly region: AnatomicalRegion;
  readonly subRegion?: string;
  readonly vitalPoints?: string[]; // IDs of vital points located here
  readonly health: number;
  readonly maxHealth: number;
  readonly armorValue?: number; // Optional armor/protection value
}

export interface AnatomyModel {
  readonly bodyParts: Record<string, BodyPart>;
  readonly overallHealth: number;
  readonly overallMaxHealth: number;
}

export type VitalPointCategory = EnumVitalPointCategory; // Alias to imported enum

export type VitalPointSeverity = EnumVitalPointSeverity; // Alias to imported enum
