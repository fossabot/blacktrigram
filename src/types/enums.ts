/**
 * Core enums for Black Trigram Korean martial arts system
 */

// Game modes
export enum GameMode {
  VERSUS = "versus",
  TRAINING = "training",
  TUTORIAL = "tutorial",
  PRACTICE = "practice",
  STORY = "story", // Fix: Add missing STORY mode
}

// Game phases
export enum GamePhase {
  INTRO = "intro",
  MENU = "menu",
  CHARACTER_SELECT = "character_select",
  COMBAT = "combat",
  TRAINING = "training",
  VICTORY = "victory",
  DEFEAT = "defeat",
  PAUSED = "paused",
  GAME_OVER = "game_over",
}

// Player archetypes
export enum PlayerArchetype {
  MUSA = "musa",
  AMSALJA = "amsalja",
  HACKER = "hacker",
  JEONGBO_YOWON = "jeongbo_yowon",
  JOJIK_POKRYEOKBAE = "jojik_pokryeokbae",
}

// Combat attack types - Fix: Use single enum name
export enum CombatAttackType {
  STRIKE = "strike",
  THRUST = "thrust",
  BLOCK = "block",
  COUNTER_ATTACK = "counter_attack",
  THROW = "throw",
  GRAPPLE = "grapple",
  PRESSURE_POINT = "pressure_point",
  NERVE_STRIKE = "nerve_strike",
  PUNCH = "punch",
}

// Damage types
export enum DamageType {
  BLUNT = "blunt",
  PIERCING = "piercing",
  SLASHING = "slashing",
  PRESSURE = "pressure",
  NERVE = "nerve",
  JOINT = "joint",
  INTERNAL = "internal",
  IMPACT = "impact",
  CRUSHING = "crushing",
  SHARP = "sharp",
  ELECTRIC = "electric",
  FIRE = "fire",
  ICE = "ice",
  POISON = "poison",
  PSYCHIC = "psychic",
  BLOOD = "blood",
}

// Trigram stances
export enum TrigramStance {
  GEON = "geon",
  TAE = "tae",
  LI = "li",
  JIN = "jin",
  SON = "son",
  GAM = "gam",
  GAN = "gan",
  GON = "gon",
}

// Vital point categories
export enum VitalPointCategory {
  NEUROLOGICAL = "neurological",
  VASCULAR = "vascular",
  RESPIRATORY = "respiratory",
  MUSCULAR = "muscular",
  SKELETAL = "skeletal",
  ORGAN = "organ",
  CIRCULATORY = "circulatory",
  LYMPHATIC = "lymphatic",
  ENDOCRINE = "endocrine",
}

// Vital point severity
export enum VitalPointSeverity {
  MINOR = "minor",
  MODERATE = "moderate",
  MAJOR = "major",
  CRITICAL = "critical",
}

// Vital point effect types
export enum VitalPointEffectType {
  UNCONSCIOUSNESS = "unconsciousness",
  BREATHLESSNESS = "breathlessness",
  PAIN = "pain",
  PARALYSIS = "paralysis",
  STUN = "stun",
}

// Effect types
export enum EffectType {
  STUN = "stun",
  WEAKNESS = "weakness",
  STAMINA_DRAIN = "stamina_drain",
  VULNERABILITY = "vulnerability",
  BLEEDING = "bleeding",
  BUFF = "buff",
  DEBUFF = "debuff",
}

// Effect intensity
export enum EffectIntensity {
  WEAK = "weak",
  MEDIUM = "medium", // Fix: Use MEDIUM instead of MODERATE
  HIGH = "high",
  STRONG = "strong",
}

// Hit effect types
export enum HitEffectType {
  DAMAGE = "damage",
  CRITICAL = "critical",
  BLOCK = "block",
  MISS = "miss",
}

// Korean text sizes
export enum KoreanTextSize {
  TINY = "tiny",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
  HUGE = "huge",
}

// Korean text weights
export enum KoreanTextWeight {
  LIGHT = "light",
  NORMAL = "normal",
  MEDIUM = "medium",
  SEMIBOLD = "semibold",
  BOLD = "bold",
  HEAVY = "heavy",
}
