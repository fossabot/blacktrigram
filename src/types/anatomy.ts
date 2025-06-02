// Anatomical targeting system for Korean martial arts vital points (급소)

import type { KoreanText } from "./korean-text";
import type {
  VitalPointCategory,
  VitalPointSeverity,
  EffectType,
  EffectIntensity,
  BodyRegion as EnumBodyRegion, // Alias to avoid conflict
} from "./enums"; // Ensure EffectIntensity is imported

export type BodyRegion = EnumBodyRegion; // Use the aliased BodyRegion

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
  readonly id: string;
  readonly type: EffectType; // Use EffectType from enums
  readonly intensity: EffectIntensity; // Use EffectIntensity from enums
  readonly duration: number; // Duration in game ticks or seconds
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly modifiers?: Record<string, number>; // e.g., { "consciousness": -20, "pain": +30 }
}

// Vital point definition for anatomical targeting
export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText; // Bilingual name
  readonly korean: string; // Explicit Korean name
  readonly english: string; // Explicit English name
  readonly category: VitalPointCategory; // Use VitalPointCategory from enums
  readonly description: KoreanText;
  readonly effects: readonly VitalPointEffect[];
  readonly location: AnatomicalLocation;
  readonly severity: VitalPointSeverity; // Use VitalPointSeverity from enums
  readonly technique: readonly string[]; // e.g., "pressure", "strike"
  readonly baseAccuracy: number; // Base chance to hit this point (0-1)
  readonly baseDamage: number; // Base damage if hit
  readonly baseStun: number; // Base stun duration if hit (ms or ticks)
  readonly damageMultiplier: number; // Multiplier for damage when hit
  readonly tags?: readonly string[]; // Optional tags for classification
}

// Body part definition for damage model
export interface BodyPart {
  readonly id: string;
  readonly name: KoreanText;
  readonly region: BodyRegion;
  readonly health: number;
  readonly maxHealth: number;
  readonly armor: number;
  readonly vitalPoints: readonly string[]; // IDs of vital points in this part
  readonly conditions: readonly string[]; // Active conditions on this part
  readonly parent?: string; // ID of parent body part (e.g., "upper_arm" parent is "arm")
  readonly children?: readonly string[]; // IDs of child body parts
}

// Structure for defining anatomical regions and their sub-regions/vital points
export interface RegionData {
  readonly name: KoreanText;
  readonly subRegions: readonly BodyRegion[];
  readonly vitalPoints: readonly string[]; // IDs of vital points
  readonly vulnerability: number; // General vulnerability of this region (0.5 to 2.0)
}

// Mapping of body regions to their data
export type BodyRegionMap = Readonly<Record<BodyRegion, RegionData>>;

// Result of a targeting attempt on a vital point
export interface TargetingResult {
  readonly success: boolean;
  readonly vitalPointHit?: VitalPoint;
  readonly bodyPartHit: BodyPart;
  readonly accuracyRoll: number;
  readonly requiredAccuracy: number;
  readonly distanceFactor: number;
  readonly movementFactor: number;
}

// Detailed injury report for a body part or vital point
export interface InjuryReport {
  readonly target: string; // ID of VitalPoint or BodyPart
  readonly damageTaken: number;
  readonly newHealth: number;
  readonly conditionsApplied: readonly string[]; // IDs of new conditions
  readonly effectsTriggered: readonly VitalPointEffect[];
  readonly isCritical: boolean;
  readonly narrative: KoreanText; // Description of the injury
}

// Defines a strike targeting a vital point
export interface VitalPointStrike {
  readonly techniqueId: string;
  readonly vitalPointId: string;
  readonly accuracyModifier: number; // Modifier based on precision, stance, etc.
  readonly intendedEffect: EffectType; // What the attacker hopes to achieve
  readonly actualEffects: readonly VitalPointEffect[]; // What actually happened
  readonly damageDealt: number;
  readonly timestamp: number;
}

// Extended details for a specific vital point, often used in UI or logs
export interface VitalPointDetails extends VitalPoint {
  readonly currentAccessibility: number; // Dynamic accessibility based on combat situation
  readonly playerKnowledge: number; // How well the player knows this point (0-1)
  readonly lastHitTime?: number; // Timestamp of the last successful hit
  readonly hitCount?: number; // How many times this point has been hit
}
