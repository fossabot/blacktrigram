// String literal union types for Black Trigram Korean martial arts game

// Korean martial arts attack types - both constant and type
export const CombatAttackType = {
  STRIKE: "strike",
  GRAPPLE: "grapple",
  COUNTER: "counter",
  DEFENSE: "defense",
  THROW: "throw",
  JOINT_LOCK: "joint_lock",
  PRESSURE_POINT: "pressure_point",
  BLOCK: "block",
  COUNTER_ATTACK: "counter_attack",
  PUNCH: "punch",
  KICK: "kick",
  ELBOW_STRIKE: "elbow_strike",
  KNEE_STRIKE: "knee_strike",
  SUBMISSION: "submission",
  NERVE_STRIKE: "nerve_strike",
  BONE_STRIKE: "bone_strike",
  SWEEP: "sweep",
  PARRY: "parry",
  DODGE: "dodge",
  SPECIAL_TECHNIQUE: "special_technique",
  COMBO_SEQUENCE: "combo_sequence",
  ENVIRONMENTAL: "environmental",
  WEAPON_BASED: "weapon_based",
  MENTAL_ATTACK: "mental_attack",
  CYBERNETIC_ATTACK: "cybernetic_attack",
  COMBINATION: "combination",
} as const;

export type CombatAttackType =
  (typeof CombatAttackType)[keyof typeof CombatAttackType];

// Damage types for realistic combat - both constant and type
export const DamageType = {
  BLUNT: "blunt",
  PIERCING: "piercing",
  SLASHING: "slashing",
  CRUSHING: "crushing",
  NERVE: "nerve",
  PRESSURE: "pressure",
  SHARP: "sharp",
  IMPACT: "impact",
  INTERNAL: "internal",
  JOINT: "joint",
  ELECTRIC: "electric",
  FIRE: "fire",
  ICE: "ice",
  POISON: "poison",
  PSYCHIC: "psychic",
} as const;

export type DamageType = (typeof DamageType)[keyof typeof DamageType];

// Effect types for combat and status effects
export const EffectType = {
  // From GameUI.test.tsx
  VULNERABLE: "vulnerable",
  // From TrigramCalculator.ts & TransitionCalculator.ts
  EXHAUSTED: "exhausted",
  KI_REGEN_BOOST: "ki_regen_boost",
  KI_REGEN_DEBUFF: "ki_regen_debuff",
  FOCUSED: "focused",
  // From KoreanAnatomy.ts
  STAMINA_DRAIN: "stamina_drain",
  VITAL_WEAKNESS: "vital_weakness",
  VITAL_STUNNING: "vital_stunning",
  DAMAGE_VULNERABILITY: "damage_vulnerability",
  VITAL_PARALYSIS: "vital_paralysis",
  PAIN_SEVERE: "pain_severe",
  WINDED: "winded",
  CONSCIOUSNESS_LOSS: "consciousness_loss",
  // General categories that might be used as specific types too
  BUFF: "buff",
  DEBUFF: "debuff",
  CONDITION: "condition",
  ENVIRONMENTAL: "environmental",
  ARCHETYPE: "archetype",
  TECHNIQUE: "technique",
  // Added from common.ts CombatCondition type if it was meant to be EffectType
  STUN: "stun", // Example, if stun is an EffectType
  BLEED: "bleed", // Example
  POISON: "poison", // Example
  BURN: "burn", // Example
} as const;

export type EffectType = (typeof EffectType)[keyof typeof EffectType];

export type StatusEffectType = EffectType; // Alias

export const EffectIntensity = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  SEVERE: "severe",
  NEGLIGIBLE: "negligible",
} as const;

export type EffectIntensity =
  (typeof EffectIntensity)[keyof typeof EffectIntensity];

export const CombatReadiness = {
  READY: 100,
  LIGHT_DAMAGE: 80,
  MODERATE_DAMAGE: 60, // Corrected from MODERATE to MODERATE_DAMAGE
  HEAVY_DAMAGE: 40, // Corrected from HEAVY to HEAVY_DAMAGE
  CRITICAL_DAMAGE: 20, // Corrected from CRITICAL to CRITICAL_DAMAGE
  INCAPACITATED: 0,
} as const;

export type CombatReadiness =
  (typeof CombatReadiness)[keyof typeof CombatReadiness];

export const ConsciousnessLevel = {
  AWAKE: "awake",
  DAZED: "dazed",
  STUNNED: "stunned",
  UNCONSCIOUS: "unconscious",
  COMA: "coma",
} as const;

export type ConsciousnessLevel =
  (typeof ConsciousnessLevel)[keyof typeof ConsciousnessLevel];

export const GamePhase = {
  INTRO: "intro",
  MENU: "menu",
  TRAINING: "training",
  COMBAT: "combat",
  PAUSED: "paused",
  GAME_OVER: "game_over",
  SETTINGS: "settings",
  LOADING: "loading",
  PHILOSOPHY: "philosophy", // Added
  VICTORY: "victory", // Added
  DEFEAT: "defeat", // Added
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

export const StatusKey = {
  PAIN: "pain",
  HEALTH_CRITICAL: "health_critical",
  STAMINA_LOW: "stamina_low",
  KI_DEPLETED: "ki_depleted",
  STUNNED: "stunned",
  BLEEDING: "bleeding",
  POISONED: "poisoned",
  BURNING: "burning",
  FROZEN: "frozen",
  SLOWED: "slowed",
  HASTENED: "hastened",
  GUARD_BREAK: "guard_break",
  COUNTER_HIT: "counter_hit",
  VULNERABLE: "vulnerable", // Also an EffectType, can be a StatusKey
  READY: "ready",
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUCCESS: "success",
  FAILURE: "failure",
  WARNING: "warning",
  INFO: "info",
} as const;

export type StatusKey = (typeof StatusKey)[keyof typeof StatusKey];

// Vital Point related enums (from anatomy.ts context, good to centralize in enums.ts)
export const VitalPointCategory = {
  NERVE: "nerve",
  BLOOD_VESSEL: "blood_vessel",
  BONE: "bone",
  JOINT: "joint",
  ORGAN: "organ",
  MUSCLE: "muscle",
  PRESSURE_POINT: "pressure_point", // Explicitly add if used as a category
} as const;

export type VitalPointCategory =
  (typeof VitalPointCategory)[keyof typeof VitalPointCategory];

export const VitalPointSeverity = {
  MINOR: "minor",
  MODERATE: "moderate",
  SEVERE: "severe",
  CRITICAL: "critical",
  LETHAL: "lethal",
} as const;

export type VitalPointSeverity =
  (typeof VitalPointSeverity)[keyof typeof VitalPointSeverity];

export const BodyRegion = {
  HEAD: "head",
  NECK: "neck",
  TORSO_UPPER: "torso_upper",
  TORSO_LOWER: "torso_lower",
  ARM_LEFT: "arm_left",
  ARM_RIGHT: "arm_right",
  LEG_LEFT: "leg_left",
  LEG_RIGHT: "leg_right",
  HAND_LEFT: "hand_left",
  HAND_RIGHT: "hand_right",
  FOOT_LEFT: "foot_left",
  FOOT_RIGHT: "foot_right",
  BACK_UPPER: "back_upper",
  BACK_LOWER: "back_lower",
  INTERNAL: "internal", // For internal organs or effects
  GENERAL: "general", // For whole-body effects
} as const;

export type BodyRegion = (typeof BodyRegion)[keyof typeof BodyRegion];

// UI-related enums, if they are general enough
export const ComponentSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  XLARGE: "xlarge",
} as const;

export type ComponentSize = (typeof ComponentSize)[keyof typeof ComponentSize];

export const KoreanFontWeight = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500, // Added based on typography constants
  BOLD: 700,
  HEAVY: 900,
} as const;

// Assuming KoreanFontWeight is a type for the values, not keys
export type KoreanFontWeight =
  (typeof KoreanFontWeight)[keyof typeof KoreanFontWeight];

export const KoreanFontStyle = {
  NORMAL: "normal",
  ITALIC: "italic",
} as const;

export type KoreanFontStyle =
  (typeof KoreanFontStyle)[keyof typeof KoreanFontStyle];

export const TrigramStance = {
  GEON: "geon",
  TAE: "tae",
  LI: "li",
  JIN: "jin",
  SON: "son",
  GAM: "gam",
  GAN: "gan",
  GON: "gon",
} as const;

export type TrigramStance = (typeof TrigramStance)[keyof typeof TrigramStance];

export const PlayerArchetype = {
  MUSA: "musa",
  AMSALJA: "amsalja",
  HACKER: "hacker",
  JEONGBO_YOWON: "jeongbo", // Corrected to match usage in constants/player.ts
  JOJIK_POKRYEOKBAE: "jojik", // Corrected to match usage in constants/player.ts
} as const;

export type PlayerArchetype =
  (typeof PlayerArchetype)[keyof typeof PlayerArchetype];

// Combat states for realistic body mechanics
export type CombatState =
  | "ready" // Combat ready, full capability
  | "attacking" // Currently executing attack
  | "defending" // Defensive posture
  | "stunned" // Temporary incapacitation
  | "recovering" // Recovering from stun/damage
  | "helpless" // Complete vulnerability
  | "shaken" // Compromised but functional
  | "vulnerable" // Added based on GameUI.test.tsx error, if it's a combat state
  | "knocked_down";

// Eight Trigram stances (팔괘 - Korean I Ching combat system)
// export type TrigramStance =
//   | "geon" // ☰ 건 - Heaven: Direct bone-striking force
//   | "tae" // ☱ 태 - Lake: Fluid joint manipulation
//   | "li" // ☲ 리 - Fire: Precise nerve strikes
//   | "jin" // ☳ 진 - Thunder: Stunning techniques
//   | "son" // ☴ 손 - Wind: Continuous pressure
//   | "gam" // ☵ 감 - Water: Blood flow restriction
//   | "gan" // ☶ 간 - Mountain: Defensive counters
//   | "gon"; // ☷ 곤 - Earth: Ground techniques

// Vital point categories for anatomical targeting
// export type VitalPointCategory =
//   | "head" // Head and neck region
//   | "neck" // Neck-specific targets
//   | "torso" // Chest and abdomen
//   | "limbs" // Arms and legs
//   | "joints" // Joint manipulation points
//   | "nerve_points" // Specific nerve targets
//   | "vascular" // Blood vessel targets
//   | "organ_points"; // Specific organ targets

// Vital point severity levels
// export type VitalPointSeverity =
//   | "minor" // Light discomfort
//   | "moderate" // Significant pain/disruption
//   | "severe" // Serious incapacitation
//   | "critical" // Life-threatening potential
//   | "lethal"; // Potential for fatality

// Input action types for Korean martial arts controls
export type InputAction =
  | "move_up"
  | "move_down"
  | "move_left"
  | "move_right"
  | "stance_geon"
  | "stance_tae"
  | "stance_li"
  | "stance_jin"
  | "stance_son"
  | "stance_gam"
  | "stance_gan"
  | "stance_gon"
  | "technique_execute"
  | "guard_activate"
  | "vital_target"
  | "pause"
  | "menu"
  | "settings";

// Korean martial arts technique categories
export type TechniqueCategory =
  | "striking" // 타격기 - Striking techniques
  | "grappling" // 잡기기 - Grappling techniques
  | "pressure_point" // 급소기 - Pressure point techniques
  | "throw" // 던지기 - Throwing techniques
  | "defensive" // 방어기 - Defensive techniques
  | "stunning"; // 특수기 - Special/signature techniques

// Training modes for Korean martial arts education
export type TrainingMode =
  | "fundamentals" // 기본기 - Basic techniques
  | "anatomy" // 해부학 - Vital point study
  | "philosophy" // 철학 - Martial arts philosophy
  | "sparring" // 자유대련 - Free sparring
  | "forms" // 품새 - Traditional forms
  | "meditation" // 명상 - Mental cultivation
  | "conditioning"; // 단련 - Physical conditioning

// Korean font weights and styles
// export type KoreanFontWeight =
//   | "light" // 300 - Light Korean text
//   | "regular" // 400 - Regular Korean text
//   | "normal" // Alias for regular if needed
//   | "medium" // 500 - Medium Korean text
//   | "bold" // 700 - Bold Korean text
//   | "heavy"; // 900 - Heavy Korean text

// export type KoreanFontStyle = "normal" | "italic";

// Component sizing
// export type ComponentSize = "small" | "medium" | "large";

// Animation timing for Korean martial arts techniques
export type AnimationTiming =
  | "instant"
  | "fast"
  | "normal"
  | "slow"
  | "martial_rhythm"; // Traditional martial arts timing

// Difficulty levels for Korean martial arts training
export type DifficultyLevel =
  | "beginner" // 초급 - Beginner level
  | "intermediate" // 중급 - Intermediate level
  | "advanced" // 고급 - Advanced level
  | "expert" // 전문가 - Expert level
  | "master"; // 대가 - Master level

// Match result types
export type MatchResult =
  | "victory" // 승리 - Victory
  | "defeat" // 패배 - Defeat
  | "draw" // 무승부 - Draw
  | "timeout" // 시간초과 - Time out
  | "forfeit"; // 기권 - Forfeit

// Korean martial arts philosophy aspects
export type PhilosophyAspect =
  | "respect" // 존중 - Honor the art and opponent
  | "discipline" // 수련 - Dedicated practice and learning
  | "precision" // 정확 - Exact technique execution
  | "wisdom" // 지혜 - Understanding beyond physical
  | "balance" // 균형 - Harmony of mind, body, spirit
  | "tradition" // 전통 - Respect for martial heritage
  | "innovation" // 혁신 - Modern adaptation of classics
  | "mastery"; // 숙련 - Pursuit of technical perfection

// UI component variants and layout directions
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success";

export type LayoutDirection = "horizontal" | "vertical" | "grid";
