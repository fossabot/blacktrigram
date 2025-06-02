// Status effects and combat conditions for Korean martial arts

import type { Timestamp, Duration } from "./common";
import type { KoreanText } from "./korean-text";
import type { VitalPointEffect as VitalPointImpairment } from "./anatomy";
import type {
  DamageType,
  PlayerArchetype,
  EffectIntensity as EnumEffectIntensity, // Import EffectIntensity from enums
  EffectType as EnumEffectType, // Import EffectType from enums
} from "./enums";

// Effect types
export type EffectType = EnumEffectType; // Use the imported enum type
export type EffectDuration = "instant" | "temporary" | "permanent";
export type EffectIntensity = EnumEffectIntensity; // Use the imported enum type

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
  readonly type: EffectType;
  readonly intensity: EffectIntensity; // Use EffectIntensity from enums
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
}

// Effect modifiers applied to player stats
export interface EffectModifiers {
  readonly health?: {
    readonly change: number; // +/- per second
    readonly multiplier: number; // Damage taken multiplier
  };
  readonly stamina?: {
    readonly change: number;
    readonly multiplier: number;
    readonly regeneration: number;
  };
  readonly ki?: {
    readonly change: number;
    readonly efficiency: number; // Ki usage efficiency
    readonly regeneration: number;
  };
  readonly movement?: {
    readonly speed: number; // Movement speed multiplier
    readonly agility: number; // Dodge chance modifier
  };
  readonly combat?: {
    readonly damage: number; // Damage output multiplier
    readonly accuracy: number; // Accuracy modifier
    readonly criticalChance: number; // Critical hit chance modifier
    readonly defense: number; // Damage reduction
  };
  readonly senses?: {
    readonly vision: number; // Vision range/clarity
    readonly hearing: number; // Audio cue detection
    readonly reaction: number; // Reaction time modifier
  };
  readonly mental?: {
    readonly focus: number; // Concentration/technique precision
    readonly fear: number; // Fear/intimidation resistance
    readonly pain: number; // Pain tolerance modifier
  };
}

// Condition represents ongoing medical/combat states
export interface Condition {
  readonly id: string;
  readonly name: KoreanText;
  readonly type: VitalPointImpairment; // Use imported VitalPointImpairment
  readonly severity: "minor" | "moderate" | "severe" | "critical";
  readonly affected_areas: readonly string[]; // Body parts affected
  readonly symptoms: readonly string[]; // Observable symptoms
  readonly treatment: readonly string[]; // Required treatment
  readonly duration: {
    readonly minimum: Duration;
    readonly maximum: Duration;
    readonly current: Duration;
  };
  readonly progression: {
    readonly stable: boolean;
    readonly improving: boolean;
    readonly worsening: boolean;
    readonly recovery_rate: number; // Per second
  };
  readonly restrictions: readonly string[]; // Actions that are restricted
}

// Environmental effect from dojang/combat area
export interface EnvironmentalEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly area: {
    readonly center: { x: number; y: number };
    readonly radius: number;
    readonly shape: "circle" | "rectangle" | "polygon";
  };
  readonly type: "lighting" | "temperature" | "surface" | "atmosphere";
  readonly intensity: number;
  readonly duration: Duration;
  readonly affects: readonly ("movement" | "vision" | "balance" | "ki")[];
  readonly modifiers: EffectModifiers;
}

// Archetype-specific passive effects
export interface ArchetypeEffect {
  readonly archetype: PlayerArchetype;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly type: "passive" | "triggered" | "activated";
  readonly conditions: readonly string[]; // When this effect triggers
  readonly modifiers: EffectModifiers;
  readonly cooldown?: Duration;
  readonly charges?: number; // Limited use effects
}

// Combo effect from technique combinations
export interface ComboEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly techniques: readonly string[]; // Required technique sequence
  readonly timing_window: Duration; // Max time between techniques
  readonly bonus_damage: number;
  readonly bonus_effects: readonly StatusEffect[];
  readonly visual_effect: string;
  readonly audio_effect: string;
}

// Recovery effect from rest/treatment
export interface RecoveryEffect {
  readonly id: string;
  readonly name: KoreanText;
  readonly type: "natural" | "medical" | "ki_based" | "time_based";
  readonly healing_rate: number; // HP per second
  readonly conditions_treated: readonly string[]; // Which conditions this treats
  readonly requirements: readonly string[]; // What's needed for this recovery
  readonly duration: Duration;
  readonly side_effects?: readonly StatusEffect[];
}

// Effect manager interface for tracking all active effects
export interface EffectManager {
  readonly activeEffects: readonly StatusEffect[];
  readonly activeConditions: readonly Condition[];
  readonly environmentalEffects: readonly EnvironmentalEffect[];
  readonly archetypeEffects: readonly ArchetypeEffect[];
  readonly comboEffects: readonly ComboEffect[];
  readonly recoveryEffects: readonly RecoveryEffect[];
}

// Effect application result
export interface EffectApplicationResult {
  readonly success: boolean;
  readonly effect: StatusEffect;
  readonly target: string;
  readonly timestamp: Timestamp;
  readonly modifications: EffectModifiers;
  readonly conflicts: readonly string[]; // Conflicting effects removed
  readonly message: KoreanText; // User feedback
}

// Effect resistance based on archetype/training
export interface EffectResistance {
  readonly archetype: PlayerArchetype;
  readonly resistances: {
    readonly [effectType in DamageType]: number; // 0-1 resistance level
  };
  readonly immunities: readonly string[]; // Effect IDs player is immune to
  readonly weaknesses: readonly string[]; // Effect IDs player is weak to
  readonly adaptations: readonly {
    readonly effectId: string;
    readonly exposureCount: number;
    readonly currentResistance: number;
  }[];
}

// Effect visualization data
export interface EffectVisual {
  readonly effectId: string;
  readonly type: "aura" | "particle" | "overlay" | "animation";
  readonly color: number;
  readonly intensity: number;
  readonly duration: Duration;
  readonly position: "body" | "head" | "limbs" | "full";
  readonly layer: number; // Visual stacking order
}
