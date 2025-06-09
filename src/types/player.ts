// Player state and archetype definitions for Korean martial arts

import type {
  PlayerArchetype,
  TrigramStance,
  KoreanText,
  Position,
  StatusEffect,
  VitalPointState,
  KoreanTechnique,
  PlayerStats,
  VitalPoint,
} from "./index";

// Main player state interface
export interface PlayerState {
  readonly id: string;
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;
  readonly position: Position;

  // Combat stats
  health: number;
  readonly maxHealth: number;
  ki: number;
  readonly maxKi: number;
  stamina: number;
  readonly maxStamina: number;

  // Combat state
  readonly currentStance: TrigramStance;
  pain: number;
  consciousness: number;
  balance: number;
  readonly isBlocking: boolean;
  readonly statusEffects: readonly StatusEffect[];

  // Fix: Add missing properties for complete PlayerState
  readonly activeEffects: readonly StatusEffect[];
  readonly vitalPoints: readonly any[]; // Vital points hit tracking
  readonly combatModifiers: {
    readonly damageMultiplier: number;
    readonly accuracyModifier: number;
    readonly speedModifier: number;
    readonly defenseMultiplier: number;
  };
  readonly momentum: number;
  readonly lastActionTime: number;
  readonly combo: number;
  readonly direction: "left" | "right";
  readonly grounded: boolean;
  readonly invulnerable: boolean;
  readonly combatState?: CombatState;
  readonly technique?: any; // Current technique being executed
}

// Fix: Add CombatState interface
export interface CombatState {
  readonly state: "idle" | "attacking" | "defending" | "stunned" | "recovering";
  readonly frameData: {
    readonly startup: number;
    readonly active: number;
    readonly recovery: number;
    readonly currentFrame: number;
  };
  readonly hitboxActive: boolean;
  readonly invulnerabilityFrames: number;
}

// Player archetype configuration
export interface PlayerArchetypeConfig {
  readonly id: PlayerArchetype;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly philosophy: KoreanText;

  // Base stats
  readonly baseHealth: number;
  readonly baseKi: number;
  readonly baseStamina: number;
  readonly coreStance: TrigramStance;

  // Visual theme
  readonly colors: {
    readonly primary: number;
    readonly secondary: number;
    readonly accent: number;
  };

  // Combat preferences
  readonly favoredStances: readonly TrigramStance[];
  readonly specialTechniques: readonly string[];
  readonly combatStyle: "aggressive" | "defensive" | "balanced" | "technical";

  // Archetype bonuses
  readonly statModifiers: {
    readonly attackPower: number;
    readonly defense: number;
    readonly speed: number;
    readonly precision: number;
    readonly ki: number;
    readonly stamina: number;
  };
}

// Player input state for controls
export interface PlayerInputState {
  readonly playerId: string;
  readonly currentInput: {
    readonly movement: { x: number; y: number };
    readonly attack: boolean;
    readonly defend: boolean;
    readonly stanceChange: TrigramStance | null;
    readonly targetVitalPoint: string | null;
  };
  readonly inputHistory: readonly string[];
  readonly lastInputTime: number;
}

// Player performance tracking
export interface PlayerPerformance {
  readonly playerId: string;
  readonly accuracy: number;
  readonly damageDealt: number;
  readonly damageReceived: number;
  readonly techniquesUsed: number;
  readonly stanceChanges: number;
  readonly perfectTimings: number;
  readonly vitalPointsHit: number;
  readonly combosCompleted: number;
}

// Fix: Add missing PlayerArchetypeData export
export interface PlayerArchetypeData {
  readonly id: string;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly baseHealth: number;
  readonly baseKi: number;
  readonly baseStamina: number;
  readonly coreStance: TrigramStance;
  readonly theme: {
    readonly primary: number;
    readonly secondary: number;
  };
  readonly colors: {
    readonly primary: number;
    readonly secondary: number;
  };
  readonly stats: PlayerStats;
  readonly favoredStances: readonly TrigramStance[];
  readonly specialAbilities: readonly string[];
  readonly philosophy: KoreanText;
}

// Fix: Add missing PlayerStats export
export interface PlayerStats {
  readonly attackPower: number;
  readonly defense: number;
  readonly speed: number;
  readonly technique: number;
}

// Fix: Add missing PlayerMatchStatistics export
export interface PlayerMatchStatistics {
  readonly wins: number;
  readonly losses: number;
  readonly hitsTaken: number;
  readonly hitsLanded: number;
  readonly totalDamageDealt: number;
  readonly totalDamageReceived: number;
  readonly techniques: readonly string[];
  readonly perfectStrikes: number;
  readonly vitalPointHits: number;
  readonly consecutiveWins: number;
  readonly matchDuration: number;
}

export default PlayerState;
