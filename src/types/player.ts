// Player state and archetype definitions for Korean martial arts

import type {
  PlayerArchetype,
  TrigramStance,
  KoreanTechnique,
  StatusEffect,
  VitalPoint,
  KoreanText,
  Position,
} from "./index";

// Main player state interface
export interface PlayerState {
  readonly id: string;
  readonly name: KoreanText;
  readonly archetype: PlayerArchetype;

  // Health & vitality
  health: number;
  readonly maxHealth: number;
  consciousness: number;
  pain: number;
  balance: number;
  bloodLoss: number;

  // Energy systems
  ki: number;
  readonly maxKi: number;
  stamina: number;
  readonly maxStamina: number;
  focusLevel: number;

  // Combat state
  readonly currentStance: TrigramStance;
  readonly position: Position;
  isGuarding: boolean;
  stunDuration: number;
  comboCount: number;
  lastActionTime: number;

  // Techniques & effects
  readonly currentTechnique: KoreanTechnique | null;
  readonly activeEffects: readonly string[];
  readonly vitalPoints: Record<string, VitalPoint>;

  // Combat modifiers
  defensiveBonus: number;
  attackPower: number;
  movementSpeed: number;
  reactionTime: number;

  // Character progression
  battleExperience: number;
  readonly injuredLimbs: readonly string[];
  readonly statusConditions: readonly StatusEffect[];

  // Optional fields for advanced gameplay
  lastStanceChangeTime?: number;
  currentCombo?: string[];
  guardBreakVulnerability?: number;
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

export default PlayerState;
