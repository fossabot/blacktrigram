// Combat system constants for Korean martial arts

// Combat configuration
export const COMBAT_CONFIG = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  MAX_CONSCIOUSNESS: 100,
  MAX_BALANCE: 100,

  // Damage thresholds
  LIGHT_DAMAGE_THRESHOLD: 15,
  MEDIUM_DAMAGE_THRESHOLD: 25,
  HEAVY_DAMAGE_THRESHOLD: 35,
  CRITICAL_DAMAGE_THRESHOLD: 45,

  // Status effect durations (ms)
  STUN_DURATION: 2000,
  PAIN_DURATION: 5000,
  BLEED_DURATION: 10000,

  // Combat timing
  ATTACK_WINDOW: 300,
  COUNTER_WINDOW: 200,
  BLOCK_WINDOW: 400,
  RECOVERY_TIME: 500,
} as const;

// Damage ranges by attack type
export const DAMAGE_RANGES = {
  STRIKE: { min: 10, max: 20, type: "blunt" },
  PUNCH: { min: 8, max: 18, type: "blunt" },
  KICK: { min: 12, max: 22, type: "blunt" },
  ELBOW: { min: 15, max: 25, type: "blunt" },
  KNEE: { min: 18, max: 28, type: "blunt" },
  GRAPPLE: { min: 5, max: 15, type: "joint" },
  THROW: { min: 20, max: 30, type: "crushing" },
  PRESSURE_POINT: { min: 25, max: 40, type: "nerve" },
  NERVE_STRIKE: { min: 30, max: 45, type: "nerve" },
  BONE_STRIKE: { min: 35, max: 50, type: "blunt" },
} as const;

// Damage ranges for combat levels
export const DAMAGE_RANGES_LEVELS = {
  light: { min: 5, max: 15 },
  medium: { min: 15, max: 25 },
  heavy: { min: 25, max: 40 },
  critical: { min: 40, max: 60 },
  vital_point: { min: 50, max: 80 },
} as const;

// Combat effectiveness modifiers
export const COMBAT_MODIFIERS = {
  ARCHETYPE_BONUS: {
    MUSA: { damageResistance: 1.2, jointTechniques: 1.5 },
    AMSALJA: { stealthMultiplier: 1.8, oneStrikeKill: 2.0 },
    HACKER: { precisionAnalysis: 1.6, environmentalControl: 1.4 },
    JEONGBO: { psychologicalWarfare: 1.5, strategicAnalysis: 1.4 },
    JOJIK: { dirtyFighting: 1.8, survivalInstinct: 1.6 },
  },

  VITAL_POINT_MULTIPLIER: 2.5,
  COUNTER_ATTACK_MULTIPLIER: 1.8,
  CRITICAL_HIT_MULTIPLIER: 2.0,
  PERFECT_TECHNIQUE_MULTIPLIER: 3.0,
} as const;

// Enhanced combat mechanics for Korean martial arts
export const PAIN_RESPONSE_SYSTEM = {
  SHOCK_PAIN_MULTIPLIER: 1.5,
  CUMULATIVE_TRAUMA_FACTOR: 0.8,
  PAIN_OVERLOAD_THRESHOLD: 85,
  INCAPACITATION_THRESHOLD: 95,
} as const;

export const VITAL_POINT_MODIFIERS = {
  HEAD: { damage: 2.0, consciousness: 3.0, stun: 2.5 },
  NECK: { damage: 2.5, consciousness: 4.0, stun: 3.0 },
  TORSO: { damage: 1.5, consciousness: 1.5, stun: 1.2 },
  LIMBS: { damage: 1.2, consciousness: 0.8, stun: 1.0 },
} as const;

// Transition cost limits for stance changes
export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 30;
export const MAX_TRANSITION_TIME_MILLISECONDS = 1000;

// Combat timing constants
export const COMBAT_TIMING = {
  ATTACK_COOLDOWN: 500, // milliseconds
  STANCE_CHANGE_DURATION: 800, // milliseconds
  BLOCK_WINDOW: 200, // milliseconds
  COUNTER_WINDOW: 300, // milliseconds
  COMBO_TIMEOUT: 2000, // milliseconds
} as const;

// Damage calculation constants
export const DAMAGE_CONSTANTS = {
  BASE_DAMAGE_MIN: 5,
  BASE_DAMAGE_MAX: 40,
  CRITICAL_MULTIPLIER: 2.0,
  VITAL_POINT_MULTIPLIER: 1.5,
  GLANCING_BLOW_MULTIPLIER: 0.3,
} as const;

// Combat state thresholds
export const COMBAT_THRESHOLDS = {
  HEALTH_CRITICAL: 20, // percentage
  STAMINA_LOW: 25, // percentage
  KI_DEPLETED: 10, // percentage
  PAIN_SEVERE: 80, // percentage
  CONSCIOUSNESS_DANGER: 30, // percentage
} as const;

// Vital point targeting constants
export const VITAL_POINT_CONSTANTS = {
  BASE_ACCURACY: 0.7, // 70% base hit chance
  PRECISION_BONUS: 0.2, // 20% bonus for aimed shots
  DISTANCE_PENALTY: 0.1, // 10% penalty per unit distance
  STANCE_MODIFIER_MAX: 0.3, // Maximum 30% modifier from stance
} as const;

// Korean martial arts specific combat values
export const KOREAN_COMBAT_VALUES = {
  RESPECT_BONUS: 1.1, // 10% damage bonus for honorable combat
  DISHONOR_PENALTY: 0.8, // 20% damage penalty for dishonorable combat
  MASTERY_THRESHOLD: 1000, // Experience points for technique mastery
  PERFECT_TECHNIQUE_BONUS: 1.25, // 25% bonus for perfect execution
} as const;

// Export all constants
export const COMBAT_CONSTANTS = {
  ...COMBAT_TIMING,
  ...DAMAGE_CONSTANTS,
  ...COMBAT_THRESHOLDS,
  ...VITAL_POINT_CONSTANTS,
  ...KOREAN_COMBAT_VALUES,
  MAX_TRANSITION_COST_KI,
  MAX_TRANSITION_COST_STAMINA,
  MAX_TRANSITION_TIME_MILLISECONDS,
  BASE_ACCURACY: 0.8,
  CRITICAL_HIT_CHANCE: 0.05,
  CRITICAL_HIT_MULTIPLIER: 1.5,
  MAX_DAMAGE_PER_HIT: 100,
  MIN_DAMAGE_PER_HIT: 1,
  STANCE_CHANGE_COOLDOWN_MS: 500,
  DEFAULT_ATTACK_RANGE: 1.0,
  VITAL_POINT_ACCURACY_BONUS: 0.15,
} as const;

// Status effect durations
export const STATUS_EFFECT_DURATIONS = {
  stun: 2000, // milliseconds
  bleed: 5000,
  pain: 3000,
  vulnerable: 4000,
  exhausted: 6000,
} as const;

// Effectiveness multipliers
export const EFFECTIVENESS_MULTIPLIERS = {
  superior: 1.5,
  effective: 1.2,
  normal: 1.0,
  ineffective: 0.8,
  weak: 0.6,
} as const;

// Combat distances
export const COMBAT_DISTANCES = {
  melee: 1.5, // meters
  close: 2.0,
  medium: 3.0,
  long: 4.5,
  maximum: 6.0,
} as const;

// Korean technique types
export const KOREAN_TECHNIQUE_TYPES = {
  strike: { korean: "타격", english: "Strike" },
  thrust: { korean: "찌르기", english: "Thrust" },
  block: { korean: "막기", english: "Block" },
  counter_attack: { korean: "반격", english: "Counter Attack" },
  throw: { korean: "던지기", english: "Throw" },
  grapple: { korean: "잡기", english: "Grapple" },
  pressure_point: { korean: "혈자리", english: "Pressure Point" },
  nerve_strike: { korean: "신경타격", english: "Nerve Strike" },
} as const;

// Damage categories
export const DAMAGE_CATEGORIES = {
  LIGHT: { min: 1, max: 15, korean: "가벼운", english: "Light" },
  MODERATE: { min: 16, max: 30, korean: "보통", english: "Moderate" },
  HEAVY: { min: 31, max: 50, korean: "심한", english: "Heavy" },
  SEVERE: { min: 51, max: 75, korean: "심각한", english: "Severe" },
  CRITICAL: { min: 76, max: 100, korean: "치명적", english: "Critical" },
} as const;
