/**
 * GameTypes - Core type definitions for Korean martial arts game
 * Includes trigram stances, vital points, and combat mechanics
 */

// Position type for 2D coordinates
export interface Position {
  readonly x: number;
  readonly y: number;
}

// Vector2D alias for consistency
export type Vector2D = Position;

// Anatomical regions for Korean martial arts
export type AnatomicalRegion =
  | "head"
  | "neck"
  | "torso"
  | "arms"
  | "legs"
  | "back";

// Korean trigram stance definitions
export type TrigramStance =
  | "geon" // 건괘 - Heaven
  | "tae" // 태괘 - Lake
  | "li" // 리괘 - Fire
  | "jin" // 진괘 - Thunder
  | "son" // 손괘 - Wind
  | "gam" // 감괘 - Water
  | "gan" // 간괘 - Mountain
  | "gon"; // 곤괘 - Earth

// Enhanced TrigramProperties interface
export interface TrigramProperties {
  readonly korean: string;
  readonly english: string;
  readonly element: string;
  readonly nature: string;
  readonly symbol: string;
  readonly strengths: readonly string[];
  readonly weaknesses: readonly string[];
  readonly kiRegenRate: number;
  readonly staminaCost: number;
  readonly damageModifier: number;
  readonly defenseModifier: number;
  readonly speedModifier: number;
  readonly description: string;
  readonly philosophy: string;
}

// Complete StatusEffectType with all used variants
export type StatusEffectType =
  | "stun"
  | "slow"
  | "burn"
  | "poison"
  | "boost"
  | "shield"
  | "healing"
  | "evasion_boost"
  | "critical_boost"
  | "stamina_efficiency"
  | "counter_boost"
  | "balance_boost"
  | "damage_boost"
  | "speed_boost"
  | "defense_boost"
  | "vital_stunning"
  | "vital_pressure"
  | "vital_paralysis"
  | "vital_weakness"
  | "stamina_drain"
  | "ki_boost"
  | "ki_disruption"
  | "damage_vulnerability"
  | "paralysis"; // Add missing paralysis type

export type StatusEffectSource =
  | "vital_point"
  | "technique"
  | "stance"
  | "combo"
  | "meridian_disruption"
  | "meridian_strike"
  | "perfect_technique";

export interface StatusEffect {
  readonly type: StatusEffectType;
  readonly intensity: number;
  readonly duration: number;
  readonly description?: string; // Made optional for backwards compatibility
  readonly source?: string; // Add optional source property
}

// Add StanceTransitionCost interface
export interface StanceTransitionCost {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
}

// Enhanced KoreanTechnique interface with all required properties
export interface KoreanTechnique {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly damage: number;
  readonly range: number;
  readonly accuracy: number; // 0.0 to 1.0
  readonly speed: number; // Attack speed multiplier
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly vitalPointMultiplier: number;
  readonly stance: TrigramStance;
  readonly description: string;
  readonly effects: readonly StatusEffect[];
}

// Combat result interfaces
export interface AttackResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly knockback?: Vector2D;
  readonly accuracy: number;
  readonly blocked: boolean;
  readonly critical: boolean;
  readonly statusEffects: StatusEffect[];
  readonly vitalPointHit?: VitalPointHit;
  readonly comboMultiplier: number;
  readonly description: string;
}

export interface BlockResult {
  readonly blocked: boolean;
  readonly perfectBlock: boolean;
  readonly damageReduction: number;
  readonly staminaCost: number;
  readonly counterAttackWindow?: number; // Optional property for perfect blocks
}

// Update VitalPointSystemConfig to include all required properties
export interface VitalPointSystemConfig {
  readonly enabled: boolean;
  readonly maxHitDistance: number;
  readonly precisionThreshold: number;
  readonly debugging: boolean;
}

// Add missing VitalPointCategory types
export type VitalPointCategory =
  | "head"
  | "torso"
  | "arms"
  | "legs"
  | "critical"
  | "major"
  | "minor";

// Update VitalPoint interface to match usage
export interface VitalPoint {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly region: string;
  readonly coordinates: Position;
  readonly vulnerability: number;
  readonly category: VitalPointCategory;
  readonly difficulty: number;
  readonly effects: readonly StatusEffect[];
  readonly description: string;
}

// Player state management
export interface PlayerState {
  readonly id: string;
  readonly position: Position;
  readonly stance: TrigramStance;
  readonly health: number;
  readonly maxHealth: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly isBlocking: boolean;
  readonly isDodging: boolean;
  readonly isAttacking: boolean;
  readonly comboCount: number;
  readonly statusEffects: readonly StatusEffect[];

  // Add missing properties for complete compatibility
  readonly isStunned?: boolean;
  readonly lastAttackTime?: number;
  readonly skill?: number;
  readonly attack?: number;
  readonly defense?: number;
}

// Combat system types
export interface AttackData {
  readonly technique: KoreanTechnique;
  readonly damage: number;
  readonly force: Vector2D;
  readonly attacker: string;
  readonly timestamp: number;
  readonly isVitalPoint: boolean;
  readonly vitalPointHit?: VitalPointHit;
  readonly criticalMultiplier: number;
}

export interface TransitionMetrics {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
}

export interface TransitionPath {
  readonly stances: readonly TrigramStance[];
  readonly totalCost: number;
}

// Combat events
export type CombatEventType =
  | "attack"
  | "hit"
  | "block"
  | "vital_point"
  | "stance_change"
  | "combo"
  | "korean_technique_executed";

export interface BaseCombatEvent {
  readonly type: CombatEventType;
  readonly timestamp: number;
}

export interface AttackEvent extends BaseCombatEvent {
  readonly type: "attack";
  readonly attacker: string;
  readonly technique: KoreanTechnique;
  readonly position: Vector2D;
}

export interface HitEvent extends BaseCombatEvent {
  readonly type: "hit";
  readonly attacker: string;
  readonly defender: string;
  readonly damage: number;
  readonly vitalPoint: boolean;
  readonly position: Vector2D;
}

export interface BlockEvent extends BaseCombatEvent {
  readonly type: "block";
  readonly defender: string;
  readonly success: boolean;
  readonly damage: number;
}

export interface VitalPointEvent extends BaseCombatEvent {
  readonly type: "vital_point";
  readonly attacker: string;
  readonly defender: string;
  readonly vitalPoint: VitalPoint;
  readonly effects: readonly StatusEffect[];
}

export interface StanceChangeEvent extends BaseCombatEvent {
  readonly type: "stance_change";
  readonly player: string;
  readonly fromStance: TrigramStance;
  readonly toStance: TrigramStance;
}

export interface ComboEvent extends BaseCombatEvent {
  readonly type: "combo";
  readonly player: string;
  readonly count: number;
  readonly techniques: readonly string[];
}

export interface KoreanTechniqueEvent extends BaseCombatEvent {
  readonly type: "korean_technique_executed";
  readonly technique: string;
  readonly damage: number;
  readonly isVitalPoint: boolean;
}

export type CombatEvent =
  | AttackEvent
  | HitEvent
  | BlockEvent
  | VitalPointEvent
  | StanceChangeEvent
  | ComboEvent
  | KoreanTechniqueEvent;

// Game state types
export interface GameState {
  readonly players: readonly PlayerState[];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly isPaused: boolean;
  readonly winner: string | null;
  readonly combatEvents: readonly CombatEvent[];
}

// UI and visual types
export interface UIState {
  readonly showVitalPoints: boolean;
  readonly showDamageNumbers: boolean;
  readonly showStanceIndicator: boolean;
  readonly currentMenu: string | null;
  readonly isLoading: boolean;
}

// Korean color scheme
export const KOREAN_COLORS = {
  BLACK: 0x000000,
  WHITE: 0xffffff,
  RED: 0x8b0000,
  GOLD: 0xffd700,
  DARK_BLUE: 0x000a12,
  ACCENT_BLUE: 0x004455,
  CYAN: 0x00ffd0,
  GRAY_LIGHT: 0xcccccc,
  GRAY_MEDIUM: 0x888888,
  GRAY_DARK: 0x444444,
} as const;

// Export utility types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

// Update VitalPointHit interface
export interface VitalPointHit {
  readonly vitalPoint: VitalPoint;
  readonly damage: number;
  readonly effectiveness: number;
  readonly description: string;
  readonly effects: readonly StatusEffect[];
}

// Add missing TransitionMetrics type
export interface TransitionMetrics {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
}

// Add TransitionResult type
export interface TransitionResult {
  readonly cost: TransitionMetrics;
  readonly success: boolean;
  readonly reason?: string;
}

/*
// Add DamageResult interface --- COMMENTED OUT TO AVOID CONFLICT
// Use DamageResult from /src/types/index.ts as the unified source of truth.
export interface DamageResult {
  readonly amount: number;
  readonly type: string;
  readonly critical: boolean;
  readonly blocked: boolean;
  readonly multiplier?: number;
  readonly bonus?: number;
  readonly meridianMultiplier?: number;
}
*/
