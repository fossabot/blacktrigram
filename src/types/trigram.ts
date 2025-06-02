// Eight Trigram (팔괘) combat system types for Korean martial arts

import type {
  ColorValue,
  // Position, // Marked as unused
  // Timestamp, // Marked as unused
} from "./common";
import type { KoreanText } from "./korean-text";
import type {
  PlayerArchetype,
  TrigramStance,
  // CombatState, // Not directly used here, but PlayerState needs it
} from "./enums";
// import { KOREAN_COLORS } from "./constants"; // KOREAN_COLORS not used directly in type defs
import type { StatusEffect } from "./effects";
import type { PlayerState } from "./player";
import type {
  KoreanTechnique as CombatKoreanTechnique,
  KoreanTechnique,
} from "./combat"; // Import the standardized technique

// Core trigram data structure (I Ching 주역 팔괘)
export interface TrigramData {
  readonly stance: TrigramStance;
  readonly symbol: string;
  readonly name: KoreanText; // Provides .korean and .english
  readonly element: string;
  readonly philosophy: string;
  readonly description?: KoreanText;
  readonly technique?: CombatKoreanTechnique; // Use the standardized KoreanTechnique
  readonly color?: ColorValue;
  readonly strength?: readonly TrigramStance[];
  readonly weakness?: readonly TrigramStance[];
  readonly combatFocus?: KoreanText;
  readonly visualEffect?: TrigramVisualEffect;
  readonly combatStyle: string; // Added
  readonly kiRegenRate: number; // Added
  readonly preferredTechniques: readonly string[]; // Added
  readonly order?: number;
  readonly staminaRegenRatePerSecond?: number;
  readonly stanceChangeCooldownMs?: number;
}

// Korean martial arts technique definition
// This is a more detailed definition than the one in combat.ts, consider consolidating
// For now, keeping it as it might be specific to Trigram system's view of techniques
// Using CombatKoreanTechnique from combat.ts as the standard.

// Trigram visual effects for combat
export interface TrigramVisualEffect {
  readonly auraColor: ColorValue;
  readonly particleCount: number;
  readonly glowIntensity: number;
  readonly animationSpeed: number;
  readonly effectRadius: number;
  readonly energyPattern: "spiral" | "pulse" | "flow" | "burst" | "steady";
}

// Eight Trigram effectiveness matrix (상극상생)
export interface TrigramEffectivenessMatrix {
  readonly geon: Record<TrigramStance, number>;
  readonly tae: Record<TrigramStance, number>;
  readonly li: Record<TrigramStance, number>;
  readonly jin: Record<TrigramStance, number>;
  readonly son: Record<TrigramStance, number>;
  readonly gam: Record<TrigramStance, number>;
  readonly gan: Record<TrigramStance, number>;
  readonly gon: Record<TrigramStance, number>;
}

// Trigram stance state for players
export interface TrigramStanceState {
  readonly current: TrigramStance;
  readonly previous?: TrigramStance;
  readonly transitionTime: number; // Time when stance changed
  readonly mastery: number; // 0-100 mastery level in this stance
  readonly experience: number; // Experience points in this stance
  readonly techniques: readonly KoreanTechnique[]; // Available techniques
  readonly canChange: boolean; // Whether stance change is allowed
  readonly cooldownRemaining: number; // Cooldown before next change
}

// Trigram philosophy and cultural context
export interface TrigramPhilosophy {
  readonly stance: TrigramStance;
  readonly iChing: KoreanText; // I Ching interpretation
  readonly martialApplication: KoreanText; // Martial arts application
  readonly koreanWisdom: KoreanText; // Traditional Korean wisdom
  readonly modernInterpretation: KoreanText; // Contemporary understanding
  readonly meditation: KoreanText; // Meditation guidance
  readonly breathing: KoreanText; // Breathing technique
  readonly mentalState: KoreanText; // Required mental state
}

// Archetype bonuses for different trigram stances
export interface ArchetypeTrigramBonus {
  readonly archetype: PlayerArchetype;
  readonly bonuses: {
    readonly [stance in TrigramStance]: {
      readonly damageMultiplier: number;
      readonly accuracyBonus: number;
      readonly speedBonus: number;
      readonly kiEfficiency: number;
      readonly specialAbility?: string;
    };
  };
}

// Trigram combination techniques (연계기법)
export interface TrigramCombination {
  readonly id: string;
  readonly name: KoreanText;
  readonly stances: readonly [TrigramStance, TrigramStance]; // Two-stance combo
  readonly technique: KoreanTechnique;
  readonly requirements: {
    readonly masteryLevel: number; // Required mastery in both stances
    readonly kiCost: number;
    readonly timing: number; // Timing window in milliseconds
  };
  readonly effect: {
    readonly damageBonus: number;
    readonly accuracyBonus: number;
    readonly specialEffect?: string;
  };
}

// Trigram training progression
export interface TrigramProgression {
  readonly stance: TrigramStance;
  readonly level: number; // 1-10 progression levels
  readonly experience: number;
  readonly experienceToNext: number;
  readonly unlockedTechniques: readonly string[];
  readonly masteryRating:
    | "novice"
    | "apprentice"
    | "journeyman"
    | "expert"
    | "master";
  readonly achievements: readonly string[];
}

// Trigram stance transition rules
export interface TrigramTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly difficulty: number; // Transition difficulty (1-5)
  readonly time: number; // Transition time in milliseconds
  readonly kiCost: number; // Ki cost for transition
  readonly philosophy: KoreanText; // Philosophical meaning of transition
  readonly animation: string; // Animation identifier
  // readonly startTime?: number; // This would be for an *active* transition state, not a definition
}

export interface TrigramTransitionCost {
  ki: number;
  stamina: number;
  timeMilliseconds: number;
}

export interface TrigramTransitionRule {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly conditions?: readonly string[]; // e.g., player health > 50%
  readonly advantage?: number; // e.g., situational effectiveness modifier
}

export interface TransitionMetrics {
  cost: TrigramTransitionCost;
  effectiveness: number; // Overall effectiveness of making this transition now
  risk: number; // Risk associated (e.g., vulnerability during transition)
  timeDelay?: number; // Additional delay due to conditions
}

export interface TransitionPath {
  path: readonly TrigramStance[]; // Sequence of stances
  totalCost: TrigramTransitionCost;
  overallEffectiveness: number;
  cumulativeRisk: number;
  name?: string;
  description?: KoreanText;
  // stances: readonly TrigramStance[]; // Duplicate of path, remove one
}

export interface KiFlowFactors {
  currentStance: TrigramStance;
  targetStance: TrigramStance;
  playerHealthPercent: number; // 0-1
  playerStaminaPercent: number; // 0-1
  playerKiPercent: number; // 0-1
  activeEffects: readonly StatusEffect[]; // Full StatusEffect objects
  distanceToOpponent?: number;
  stanceAffinity?: number; // Player's affinity/mastery with current/target stances
  playerLevelModifier?: number; // Modifier based on player's overall level/skill
  kiRecoveryBase?: number; // Base Ki recovery rate of the player
  kiConsumptionModifier?: number; // General modifier for Ki consumption
  timeInStanceModifier?: number; // Modifier based on how long player has been in current stance
}

export interface StanceTransition {
  // Represents the result of an attempted transition
  success: boolean;
  from: TrigramStance;
  to: TrigramStance;
  cost: TrigramTransitionCost; // The actual cost paid
  newState: PlayerState; // The player state after the transition attempt
  reason?: string; // Reason for failure (e.g., "insufficient_ki", "cooldown")
  timestamp: number; // Timestamp of when the transition occurred or was attempted
}

// Trigram combat analytics
export interface TrigramCombatStats {
  readonly stance: TrigramStance;
  readonly usage: {
    readonly timesUsed: number;
    readonly totalDamageDealt: number;
    readonly totalDamageTaken: number;
    readonly accuracy: number; // Hit percentage
    readonly efficiency: number; // Damage per Ki spent
  };
  readonly techniques: {
    readonly [techniqueId: string]: {
      readonly uses: number;
      readonly hits: number;
      readonly misses: number;
      readonly criticals: number;
      readonly averageDamage: number;
    };
  };
  readonly matchups: {
    readonly [opponent in TrigramStance]: {
      readonly wins: number;
      readonly losses: number;
      readonly effectiveness: number;
    };
  };
}

// Trigram UI display configuration
export interface TrigramUIConfig {
  readonly showSymbols: boolean; // Show Unicode trigram symbols
  readonly showNames: boolean; // Show Korean/English names
  readonly showPhilosophy: boolean; // Show philosophical description
  readonly showEffectiveness: boolean; // Show stance matchups
  readonly language: "korean" | "english" | "bilingual";
  readonly colorCoding: boolean; // Use color coding for stances
  readonly animations: boolean; // Enable stance transition animations
}

// Complete Eight Trigram system data
export interface EightTrigramSystem {
  readonly trigrams: {
    readonly [stance in TrigramStance]: TrigramData;
  };
  readonly effectiveness: TrigramEffectivenessMatrix;
  readonly transitions: readonly TrigramTransition[];
  readonly combinations: readonly TrigramCombination[];
  readonly archetypeBonuses: readonly ArchetypeTrigramBonus[];
  readonly philosophy: {
    readonly [stance in TrigramStance]: TrigramPhilosophy;
  };
}

// Trigram selection and management
export interface TrigramSelector {
  readonly availableStances: readonly TrigramStance[];
  readonly recommendedStance?: TrigramStance;
  readonly currentEffectiveness: number; // Against current opponent
  readonly transitionOptions: readonly {
    readonly stance: TrigramStance;
    readonly effectiveness: number;
    readonly difficulty: number;
    readonly kiCost: number;
  }[];
}

// Trigram mastery certificate (traditional Korean martial arts concept)
export interface TrigramMasteryCertificate {
  readonly stance: TrigramStance;
  readonly studentName: string;
  readonly masterName: string;
  readonly dojangName: string;
  readonly dateAchieved: Date;
  readonly level: "초급" | "중급" | "고급" | "전문가" | "대가"; // Korean mastery levels
  readonly techniques: readonly string[]; // Certified techniques
  readonly philosophy: string; // Understanding of trigram philosophy
  readonly signature: string; // Master's digital signature
}
