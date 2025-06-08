// Player archetype enumeration for Korean martial arts characters
export enum PlayerArchetype {
  MUSA = "musa",
  AMSALJA = "amsalja",
  HACKER = "hacker",
  JEONGBO_YOWON = "jeongbo_yowon",
  JOJIK_POKRYEOKBAE = "jojik_pokryeokbae",
}

// Eight trigram stances for Korean martial arts combat system
export enum TrigramStance {
  GEON = "geon", // ☰ Heaven
  TAE = "tae", // ☱ Lake
  LI = "li", // ☲ Fire
  JIN = "jin", // ☳ Thunder
  SON = "son", // ☴ Wind
  GAM = "gam", // ☵ Water
  GAN = "gan", // ☶ Mountain
  GON = "gon", // ☷ Earth
}

// Game phases for different modes
export enum GamePhase {
  INTRO = "intro",
  TRAINING = "training",
  COMBAT = "combat",
  STORY = "story", // Add missing STORY phase
  VICTORY = "victory",
  DEFEAT = "defeat",
  DRAW = "draw",
  PAUSE = "pause",
}

export enum GameMode {
  VERSUS = "versus",
  TRAINING = "training",
  STORY = "story",
  ARCADE = "arcade",
  ONLINE = "online",
}

// Combat states for player characters
export enum CombatState {
  IDLE = "idle",
  ATTACKING = "attacking",
  DEFENDING = "defending",
  STUNNED = "stunned",
  RECOVERING = "recovering",
}

// Hit effect types for visual feedback - include all needed cases
export enum HitEffectType {
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
  CRITICAL = "critical",
  PERFECT = "perfect",
  COUNTER = "counter",
  BLOCK = "block",
  MISS = "miss",
  NORMAL = "normal",
  HIT = "hit", // Add missing HIT value
}

// Animation states for character sprites
export enum AnimationState {
  IDLE = "idle",
  WALK = "walk",
  ATTACK = "attack",
  BLOCK = "block",
  HIT = "hit",
  VICTORY = "victory",
  DEFEAT = "defeat",
}

// Damage types for different attack categories
export enum DamageType {
  PHYSICAL = "physical",
  KI_ENERGY = "ki_energy",
  VITAL_POINT = "vital_point",
  COMBO = "combo",
}

// Status effects that can be applied to players
export enum StatusEffect {
  NONE = "none",
  STUNNED = "stunned",
  BLEEDING = "bleeding",
  KI_CHARGED = "ki_charged",
  WEAKENED = "weakened",
  ENHANCED = "enhanced",
}

// Export type aliases for string union types - keep for backwards compatibility
export type PlayerArchetypeString = `${PlayerArchetype}`;
export type TrigramStanceString = `${TrigramStance}`;
export type GamePhaseString = `${GamePhase}`;
export type GameModeString = `${GameMode}`;
export type CombatStateString = `${CombatState}`;
export type AnimationStateString = `${AnimationState}`;
export type DamageTypeString = `${DamageType}`;
export type StatusEffectString = `${StatusEffect}`;

// Also export as union types for flexibility
export type HitEffectTypeUnion =
  | "light"
  | "medium"
  | "heavy"
  | "critical"
  | "block"
  | "miss"
  | "perfect"
  | "counter";

// Order arrays for UI and iteration
export const PLAYER_ARCHETYPES_ORDER: PlayerArchetype[] = [
  PlayerArchetype.MUSA,
  PlayerArchetype.AMSALJA,
  PlayerArchetype.HACKER,
  PlayerArchetype.JEONGBO_YOWON,
  PlayerArchetype.JOJIK_POKRYEOKBAE,
];

export const TRIGRAM_STANCES_ORDER: TrigramStance[] = [
  TrigramStance.GEON,
  TrigramStance.TAE,
  TrigramStance.LI,
  TrigramStance.JIN,
  TrigramStance.SON,
  TrigramStance.GAM,
  TrigramStance.GAN,
  TrigramStance.GON,
];

export const GAME_PHASES_ORDER: GamePhase[] = [
  GamePhase.INTRO,
  GamePhase.MENU,
  GamePhase.COMBAT,
  GamePhase.TRAINING,
  GamePhase.VICTORY,
  GamePhase.DEFEAT,
  GamePhase.PAUSED,
];

// Validation functions
export function isValidPlayerArchetype(
  value: string
): value is PlayerArchetype {
  return Object.values(PlayerArchetype).includes(value as PlayerArchetype);
}

export function isValidTrigramStance(value: string): value is TrigramStance {
  return Object.values(TrigramStance).includes(value as TrigramStance);
}

export function isValidGamePhase(value: string): value is GamePhase {
  return Object.values(GamePhase).includes(value as GamePhase);
}

export function isValidGameMode(value: string): value is GameMode {
  return Object.values(GameMode).includes(value as GameMode);
}

export function isValidCombatState(value: string): value is CombatState {
  return Object.values(CombatState).includes(value as CombatState);
}

export function isValidHitEffectType(value: string): value is HitEffectType {
  return Object.values(HitEffectType).includes(value as HitEffectType);
}

// Export all enum values as constants for backwards compatibility
export const PLAYER_ARCHETYPES = PlayerArchetype;
export const TRIGRAM_STANCES = TrigramStance;
export const GAME_PHASES = GamePhase;
export const GAME_MODES = GameMode;
export const COMBAT_STATES = CombatState;
export const ANIMATION_STATES = AnimationState;
export const DAMAGE_TYPES = DamageType;
export const STATUS_EFFECTS = StatusEffect;
export const HIT_EFFECT_TYPES = HitEffectType;
