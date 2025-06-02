// Anatomical targeting system for Korean martial arts vital points (급소)

import type { KoreanText } from "./korean-text";
import type {
  VitalPointCategory,
  VitalPointSeverity,
  EffectType,
  EffectIntensity,
  BodyRegion,
} from "./enums"; // Ensure EffectIntensity is imported

// Anatomical location on the body model
export interface AnatomicalLocation {
  readonly region: BodyRegion;
  readonly subRegion?: string; // e.g., "upper_arm", "lower_leg"
  readonly x: number; // Normalized coordinate (0-1)
  readonly y: number; // Normalized coordinate (0-1)
  readonly z?: number; // Optional depth coordinate
}

// Effect of striking a vital point
export interface VitalPointEffect {
  readonly id: string; // Unique ID for this specific effect instance or type
  readonly type: EffectType; // From enums.ts
  readonly intensity: EffectIntensity; // From enums.ts
  readonly duration: number; // Duration in game ticks or seconds
  readonly description: KoreanText; // Bilingual description
  readonly stackable: boolean; // Can this effect stack if applied multiple times?
  readonly modifiers?: Record<string, number>; // e.g., { accuracy: -0.2, speed: -0.1 }
}

// Vital point definition for anatomical targeting
export interface VitalPoint {
  readonly id: string; // e.g., "head_temple", "arm_radial_nerve"
  readonly name: KoreanText; // Bilingual name { korean: "관자놀이", english: "Temple" }
  readonly korean: string; // Keep for simpler access if needed, though name.korean is preferred
  readonly english: string; // Keep for simpler access if needed, though name.english is preferred
  readonly category: VitalPointCategory; // From enums.ts
  readonly description: KoreanText; // Detailed bilingual description
  readonly effects: readonly VitalPointEffect[]; // Effects triggered on a successful hit
  readonly location: AnatomicalLocation; // Precise location on the body model
  readonly severity: VitalPointSeverity; // From enums.ts
  readonly technique?: readonly string[]; // Techniques that are effective against this point (IDs)
  readonly baseAccuracy: number; // Base chance to hit this point (0-1)
  readonly baseDamage?: number; // Base damage if hit (can be 0 if only effects)
  readonly baseStun?: number; // Base stun duration if hit
  readonly damageMultiplier: number; // Multiplier for incoming damage to this point
  readonly tags?: readonly string[]; // e.g., ["nerve", "artery", "bone_gap"]
}

// Body part definition for damage model
export interface BodyPart {
  readonly id: string; // e.g., "head", "left_arm", "torso_upper"
  readonly name: KoreanText; // Bilingual name
  readonly region: BodyRegion; // From enums.ts
  readonly health: number; // Current health of this body part
  readonly maxHealth: number; // Maximum health
  readonly armor: number; // Armor value reducing damage
  readonly vitalPoints: readonly string[]; // IDs of vital points located in this part
  readonly conditions: readonly string[]; // IDs of active conditions (e.g., "fractured", "bleeding")
  readonly parent?: string; // ID of parent body part (e.g., "left_upper_arm" parent is "left_arm")
  readonly children?: readonly string[]; // IDs of child body parts
}

// Structure for defining anatomical regions and their sub-regions/vital points
export interface RegionData {
  readonly name: KoreanText;
  readonly subRegions: readonly BodyRegion[]; // Or specific sub-region names as strings
  readonly vitalPoints: readonly string[]; // IDs of vital points in this region
  readonly vulnerability: number; // General vulnerability multiplier for this region (0-2, 1 is normal)
}

// Mapping of body regions to their data
export type BodyRegionMap = Readonly<Record<BodyRegion, RegionData>>;

// Result of a targeting attempt on a vital point
export interface TargetingResult {
  readonly success: boolean;
  readonly vitalPointHit?: VitalPoint; // The specific vital point that was hit, if any
  readonly bodyPartHit: BodyPart; // The body part that was hit
  readonly accuracyRoll: number; // The dice roll for accuracy (0-1)
  readonly requiredAccuracy: number; // The accuracy needed to hit (0-1)
  readonly distanceFactor: number; // Modifier based on distance
  readonly movementFactor: number; // Modifier based on movement (attacker/defender)
}

// Detailed injury report for a body part or vital point
export interface InjuryReport {
  readonly target: string; // ID of the VitalPoint or BodyPart
  readonly damageTaken: number;
  readonly newHealth?: number; // New health of the BodyPart, if applicable
  readonly conditionsApplied: readonly string[]; // IDs of any conditions applied
  readonly effectsTriggered: readonly VitalPointEffect[]; // Specific effects triggered
}

// Defines a strike targeting a vital point
export interface VitalPointStrike {
  readonly techniqueId: string;
  readonly attackerId: string;
  readonly defenderId: string;
  readonly targetedVitalPointId: string;
  readonly attemptTime: number; // Timestamp
  readonly outcome: TargetingResult;
  readonly damageDealt: number;
  readonly effectsApplied: readonly VitalPointEffect[];
}

// Extended details for a specific vital point, often used in UI or logs
export interface VitalPointDetails extends VitalPoint {
  readonly currentAccessibility: number; // How easy is it to target right now (0-1)
  readonly archetypeEffectiveness: Readonly<Record<string, number>>; // PlayerArchetype to multiplier
}
