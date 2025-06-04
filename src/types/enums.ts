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
  // Add missing types from trigram techniques
  BUFF: "buff",
  DEBUFF: "debuff",
  HEALING: "healing",
  STEALTH: "stealth",
  MOVEMENT: "movement",
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
  BLOOD: "blood", // 혈액 - Blood flow disruption
} as const;

export type DamageType = (typeof DamageType)[keyof typeof DamageType];

// Effect types for combat and status effects
export const EffectType = {
  // Combat effects
  VULNERABLE: "vulnerable",
  EXHAUSTED: "exhausted",
  KI_REGEN_BOOST: "ki_regen_boost",
  KI_REGEN_DEBUFF: "ki_regen_debuff",
  FOCUSED: "focused",
  STAMINA_DRAIN: "stamina_drain",
  VITAL_WEAKNESS: "vital_weakness",
  VITAL_STUNNING: "vital_stunning",
  DAMAGE_VULNERABILITY: "damage_vulnerability",
  VITAL_PARALYSIS: "vital_paralysis",
  PAIN_SEVERE: "pain_severe",
  WINDED: "winded",
  CONSCIOUSNESS_LOSS: "consciousness_loss",
  // General categories
  BUFF: "buff",
  DEBUFF: "debuff",
  CONDITION: "condition",
  ENVIRONMENTAL: "environmental",
  ARCHETYPE: "archetype",
  TECHNIQUE: "technique",
  STUN: "stun",
  BLEED: "bleed",
  POISON: "poison",
  BURN: "burn",
  WEAKNESS: "weakness",
  PAIN: "pain",
  BLEEDING: "bleeding",
  CONFUSION: "confusion",
  BALANCE_LOSS: "balance_loss",
  PARALYSIS: "paralysis",
  DOT: "dot", // Damage over time
  HOT: "hot", // Heal over time
  ROOT: "root",
  SLOW: "slow",
  FEAR: "fear",
} as const;

export type EffectType = (typeof EffectType)[keyof typeof EffectType];
export type StatusEffectType = EffectType; // Alias

export const EffectIntensity = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  SEVERE: "severe",
  NEGLIGIBLE: "negligible",
  LIGHT: "light",
  MODERATE: "moderate",
  STRONG: "strong",
  EXTREME: "extreme",
  WEAK: "weak",
  HEAVY: "heavy",
  MINOR: "minor",
  CRITICAL: "critical",
  LETHAL: "lethal",
} as const;

export type EffectIntensity =
  (typeof EffectIntensity)[keyof typeof EffectIntensity];

export const CombatReadiness = {
  READY: 100,
  LIGHT_DAMAGE: 80,
  MODERATE_DAMAGE: 60,
  HEAVY_DAMAGE: 40,
  CRITICAL_DAMAGE: 20,
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
  PHILOSOPHY: "philosophy",
  VICTORY: "victory",
  DEFEAT: "defeat",
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

export const StatusKey = {
  HEALTH: "health",
  KI: "ki",
  STAMINA: "stamina",
  CONSCIOUSNESS: "consciousness",
  PAIN: "pain",
  BALANCE: "balance",
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
  VULNERABLE: "vulnerable",
  READY: "ready",
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUCCESS: "success",
  FAILURE: "failure",
  WARNING: "warning",
  INFO: "info",
} as const;

export type StatusKey = (typeof StatusKey)[keyof typeof StatusKey];

// Vital Point related enums
export const VitalPointCategory = {
  NERVE: "nerve",
  BLOOD_VESSEL: "blood_vessel",
  BONE: "bone",
  JOINT: "joint",
  ORGAN: "organ",
  MUSCLE: "muscle",
  PRESSURE_POINT: "pressure_point",
  NERVE_POINTS: "nerve_points",
  JOINTS: "joints",
  VASCULAR: "vascular",
  HEAD: "head",
  TORSO: "torso",
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
  TORSO: "torso",
  CHEST: "chest",
  ABDOMEN: "abdomen",
  BACK: "back",
  UPPER_BACK: "upper_back",
  LOWER_BACK: "lower_back",
  LIMBS: "limbs",
  ARMS: "arms",
  LEFT_ARM: "left_arm",
  RIGHT_ARM: "right_arm",
  LEGS: "legs",
  LEFT_LEG: "left_leg",
  RIGHT_LEG: "right_leg",
  HANDS: "hands",
  FEET: "feet",
  JOINTS: "joints",
  HEAD_SIDE: "head_side",
  FACE_UPPER: "face_upper",
  THROAT: "throat",
  UPPER_ABDOMEN_CENTER: "upper_abdomen_center",
  EYES: "eyes",
  NOSE: "nose",
  JAW: "jaw",
  TEMPLES: "temples",
  PHILTRUM: "philtrum",
  MASTOID_PROCESS: "mastoid_process",
  OCCIPUT: "occiput",
  RIBS: "ribs",
  CLAVICLE: "clavicle",
  SOLAR_PLEXUS: "solar_plexus",
  KIDNEYS: "kidneys",
  LIVER: "liver",
  SPLEEN: "spleen",
  FLOATING_RIBS: "floating_ribs",
  FACE: "face",
  LEG_BACK_KNEE: "leg_back_knee",
  GENERAL: "general",
  INTERNAL: "internal",
  PRESSURE_POINTS: "pressure_points", // 혈자리
} as const;

export type BodyRegion = (typeof BodyRegion)[keyof typeof BodyRegion];

// UI-related enums
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
  MEDIUM: 500,
  BOLD: 700,
  HEAVY: 900,
} as const;

export type KoreanFontWeight =
  (typeof KoreanFontWeight)[keyof typeof KoreanFontWeight];

export const KoreanFontStyle = {
  NORMAL: "normal",
  ITALIC: "italic",
} as const;

export type KoreanFontStyle =
  (typeof KoreanFontStyle)[keyof typeof KoreanFontStyle];

// Player archetype constants and types for Korean martial arts
export const PlayerArchetype = {
  MUSA: "musa", // 무사 - Traditional Warrior
  AMSALJA: "amsalja", // 암살자 - Shadow Assassin
  HACKER: "hacker", // 해커 - Cyber Warrior
  JEONGBO: "jeongbo_yowon", // 정보요원 - Intelligence Operative
  JOJIK: "jojik_pokryeokbae", // 조직폭력배 - Organized Crime
} as const;

export type PlayerArchetype =
  | "musa" // 무사 (Traditional Warrior)
  | "amsalja" // 암살자 (Shadow Assassin)
  | "hacker" // 해커 (Cyber Warrior)
  | "jeongbo_yowon" // 정보요원 (Intelligence Operative)
  | "jojik_pokryeokbae"; // 조직폭력배 (Organized Crime)

// Eight Trigram stances (팔괘)
export const TrigramStance = {
  GEON: "geon", // 건 ☰ Heaven
  TAE: "tae", // 태 ☱ Lake
  LI: "li", // 리 ☲ Fire
  JIN: "jin", // 진 ☳ Thunder
  SON: "son", // 손 ☴ Wind
  GAM: "gam", // 감 ☵ Water
  GAN: "gan", // 간 ☶ Mountain
  GON: "gon", // 곤 ☷ Earth
} as const;

export type TrigramStance = (typeof TrigramStance)[keyof typeof TrigramStance];

// Combat states
export const CombatState = {
  READY: "ready",
  ATTACKING: "attacking",
  DEFENDING: "defending",
  STUNNED: "stunned",
  VULNERABLE: "vulnerable",
  INCAPACITATED: "incapacitated",
  RECOVERING: "recovering",
  HELPLESS: "helpless",
  SHAKEN: "shaken",
  KNOCKED_DOWN: "knocked_down",
} as const;

export type CombatState = (typeof CombatState)[keyof typeof CombatState];

// Combat condition types
export const CombatConditionType = {
  STUN: "stun", // 기절
  BLEED: "bleed", // 출혈
  PAIN: "pain", // 고통
  VULNERABLE: "vulnerable", // 취약
  DISORIENTED: "disoriented", // 혼란
  WEAKENED: "weakened", // 약화
} as const;

export type CombatConditionType =
  (typeof CombatConditionType)[keyof typeof CombatConditionType];

// Animation timing for Korean martial arts techniques
export const AnimationTiming = {
  INSTANT: "instant",
  FAST: "fast",
  NORMAL: "normal",
  SLOW: "slow",
  MARTIAL_RHYTHM: "martial_rhythm", // Traditional martial arts timing
} as const;

export type AnimationTiming =
  (typeof AnimationTiming)[keyof typeof AnimationTiming];

// Difficulty levels for Korean martial arts training
export const DifficultyLevel = {
  BEGINNER: "beginner", // 초급 - Beginner level
  INTERMEDIATE: "intermediate", // 중급 - Intermediate level
  ADVANCED: "advanced", // 고급 - Advanced level
  EXPERT: "expert", // 전문가 - Expert level
  MASTER: "master", // 대가 - Master level
} as const;

export type DifficultyLevel =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

// Match result types
export const MatchResult = {
  VICTORY: "victory", // 승리 - Victory
  DEFEAT: "defeat", // 패배 - Defeat
  DRAW: "draw", // 무승부 - Draw
  TIMEOUT: "timeout", // 시간초과 - Time out
  FORFEIT: "forfeit", // 기권 - Forfeit
} as const;

export type MatchResult = (typeof MatchResult)[keyof typeof MatchResult];

// Korean martial arts philosophy aspects
export const PhilosophyAspect = {
  RESPECT: "respect", // 존중 - Honor the art and opponent
  DISCIPLINE: "discipline", // 수련 - Dedicated practice and learning
  PRECISION: "precision", // 정확 - Exact technique execution
  WISDOM: "wisdom", // 지혜 - Understanding beyond physical
  BALANCE: "balance", // 균형 - Harmony of mind, body, spirit
  TRADITION: "tradition", // 전통 - Respect for martial heritage
  INNOVATION: "innovation", // 혁신 - Modern adaptation of classics
  MASTERY: "mastery", // 숙련 - Pursuit of technical perfection
} as const;

export type PhilosophyAspect =
  (typeof PhilosophyAspect)[keyof typeof PhilosophyAspect];

// UI component variants and layout directions
export const ButtonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
  DANGER: "danger",
  SUCCESS: "success",
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const LayoutDirection = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  GRID: "grid",
} as const;

export type LayoutDirection =
  (typeof LayoutDirection)[keyof typeof LayoutDirection];

// Input actions for game controls
export const InputAction = {
  MOVE_UP: "move_up",
  MOVE_DOWN: "move_down",
  MOVE_LEFT: "move_left",
  MOVE_RIGHT: "move_right",
  ATTACK: "attack",
  DEFEND: "defend",
  STANCE_CHANGE: "stance_change",
  PAUSE: "pause",
  MENU: "menu",
} as const;

export type InputAction = (typeof InputAction)[keyof typeof InputAction];

// Export string literal types for compatibility
export type GamePhaseType = `${GamePhase}`;
export type PlayerArchetypeType = `${PlayerArchetype}`;
export type TrigramStanceType = `${TrigramStance}`;
export type CombatStateType = `${CombatState}`;
export type DamageTypeType = `${DamageType}`;
export type EffectTypeType = `${EffectType}`;
export type EffectIntensityType = `${EffectIntensity}`;
export type BodyRegionType = `${BodyRegion}`;
