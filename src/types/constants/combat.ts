// Combat mechanics configuration
export const COMBAT_CONSTANTS = {
  BASE_HEALTH: 100,
  BASE_KI: 100,
  BASE_STAMINA: 100,
  ROUND_TIME: 90,
  MAX_ROUNDS: 3,
  CRITICAL_THRESHOLD: 35,
  HEAVY_THRESHOLD: 25,
  MEDIUM_THRESHOLD: 15,
} as const;

export const COMBAT_CONFIG = {
  baseHealthRecovery: 0.1,
  baseKiRecovery: 0.2,
  baseStaminaRecovery: 0.3,
  criticalThreshold: 0.15,
  maxCombatTime: 180,
  roundTimeLimit: 90,
  DAMAGE_MULTIPLIER: 1.0,
  BLOCK_REDUCTION: 0.5,
} as const;

export const DAMAGE_RANGES = {
  light: { min: 5, max: 15 },
  medium: { min: 10, max: 25 },
  heavy: { min: 20, max: 40 },
  critical: { min: 30, max: 60 },
} as const;

// Player limits
export const MAX_PLAYER_HEALTH = 100;
export const MAX_PLAYER_STAMINA = 100;
export const MAX_PLAYER_KI = 100;

// Trigram stance transitions
export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 40;
export const MAX_TRANSITION_TIME_MILLISECONDS = 1500;
export const MIN_TRANSITION_EFFECTIVENESS = 0.2;
