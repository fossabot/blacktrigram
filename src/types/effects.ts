// Status effects and combat conditions for Korean martial arts

import type { EffectIntensity, EffectType } from "./enums";
import type { Duration, Position } from "./common"; // For Condition duration, added KoreanText, Position
import { KoreanText } from "./korean-text";

// Effect types
export type EffectDuration = "instant" | "temporary" | "permanent";

// Status effect categories
export type EffectCategory =
  | "buff" // Positive effects
  | "debuff" // Negative effects
  | "condition" // Medical conditions
  | "environmental" // Environmental effects
  | "archetype" // Archetype-specific effects
  | "technique"; // Technique-based effects

// Status effect interface
export interface StatusEffect {
  readonly id: string;
  readonly type: EffectType; // From enums.ts
  readonly intensity: EffectIntensity; // From enums.ts
  readonly duration: number; // Duration in game ticks or seconds
  readonly description: KoreanText;
  readonly stackable: boolean;
  readonly source?: string; // Optional: ID of technique, item, or origin of the effect
  readonly modifiers?: EffectModifiers; // Optional: direct stat changes
}

// Effect modifiers applied to player stats
export interface EffectModifiers {
  readonly health?: {
    readonly change?: number; // Flat change
    readonly multiplier?: number; // Multiplicative change (e.g., 1.1 for +10%)
    readonly regeneration?: number; // Change to regeneration rate
  };
  readonly stamina?: {
    readonly change?: number;
    readonly multiplier?: number;
    readonly regeneration?: number;
  };
  readonly ki?: {
    readonly change?: number;
    readonly multiplier?: number;
    readonly efficiency?: number; // e.g., 0.9 for 10% less cost
    readonly regeneration?: number;
  };
  readonly movement?: {
    readonly speed?: number; // Multiplier
    readonly agility?: number; // Multiplier
  };
  readonly combat?: {
    readonly damage?: number; // Multiplier to damage dealt
    readonly accuracy?: number; // Flat or multiplier to accuracy
    readonly criticalChance?: number; // Flat or multiplier
    readonly defense?: number; // Multiplier to damage taken (e.g., 0.8 for 20% reduction)
  };
  readonly senses?: {
    readonly vision?: number; // Range or clarity modifier
    readonly hearing?: number; // Range or clarity modifier
    readonly reaction?: number; // Reaction time modifier
  };
  readonly mental?: {
    readonly focus?: number; // Modifier to concentration, resistance to mental effects
    readonly fear?: number; // Level of fear induced/reduced
    readonly pain?: number; // Modifier to pain perception/tolerance
  };
}

// VitalPointImpairment might be better defined alongside VitalPointCategory or EffectType
// For now, assuming it's a string type that needs to be defined or imported.
// If it's meant to be a specific set of strings, an enum would be appropriate.
export type VitalPointImpairment = string; // Placeholder - define or import properly

// Condition represents ongoing medical/combat states
export interface Condition {
  readonly id: string;
  readonly name: KoreanText;
  readonly type: VitalPointImpairment; // This needs to be a defined type
  readonly severity: "minor" | "moderate" | "severe" | "critical";
  readonly affected_areas: readonly string[]; // e.g., body part IDs
  readonly symptoms: readonly string[]; // Descriptions of symptoms
  readonly treatment?: readonly string[]; // Possible treatments or counters
  readonly duration: {
    readonly minimum: Duration;
    readonly maximum: Duration;
    readonly current: Duration;
  };
}

// Environmental effect from dojang/combat area
export interface EnvironmentalEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly effect: StatusEffect; // The actual status effect applied
  readonly area: { x: number; y: number; radius: number }; // Affected area
  readonly duration?: number; // How long the environmental effect lasts
}

// Archetype-specific passive effects
export interface ArchetypeEffect {
  readonly archetypeId: string; // Matches PlayerArchetype
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly modifiers: EffectModifiers;
}

// Combo effect from technique combinations
export interface ComboEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly requiredTechniques: readonly string[]; // IDs of techniques in combo
  readonly resultingEffect: StatusEffect;
}

// Recovery effect from rest/treatment
export interface RecoveryEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly type: "health" | "stamina" | "ki" | "condition_removal";
  readonly amount?: number; // Amount recovered, if applicable
  readonly conditionRemoved?: string; // ID of condition removed, if applicable
}

// Effect manager interface for tracking all active effects
export interface EffectManager {
  readonly activeEffects: readonly StatusEffect[];
  readonly activeConditions: readonly Condition[];
  applyEffect: (targetId: string, effect: StatusEffect) => void;
  removeEffect: (targetId: string, effectId: string) => void;
  updateEffects: (targetId: string, deltaTime: number) => void;
}

// Effect application result
export interface EffectApplicationResult {
  readonly success: boolean;
  readonly effectApplied?: StatusEffect;
  readonly message?: KoreanText;
}

// Effect resistance based on archetype/training
export interface EffectResistance {
  readonly effectType: EffectType;
  readonly resistanceValue: number; // e.g., 0.25 for 25% resistance
  readonly source: string; // e.g., "Archetype Bonus", "Training"
}

// Effect visualization data
export interface EffectVisual {
  readonly effectId: string;
  readonly particleEffectName?: string;
  readonly auraColor?: number; // Hex color
  readonly soundEffectId?: string;
}

// Hit effect types for visual feedback
export type HitEffectType =
  | "blood"
  | "spark"
  | "energy"
  | "critical"
  | "block"
  | "miss"
  | "light"
  | "medium"
  | "heavy";

export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly damage: number; // Make required
  readonly startTime: number; // Make required
  readonly duration: number; // Make required
  readonly korean: string; // Use string for simple Korean text labels
  readonly color: number; // Make required for visual effects
  readonly createdAt: number;
}
