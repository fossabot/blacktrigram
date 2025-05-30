// Core Korean martial arts game types - UNIFIED SOURCE OF TRUTH

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

// Position and movement types
export interface Position {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
}

export interface Velocity {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
}

// Define ConditionType (formerly StatusEffectType from GameTypes.ts)
export type ConditionType =
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
  | "vital_stunning" // From AnatomicalRegions.ts & GameTypes.ts
  | "vital_pressure" // From GameTypes.ts
  | "vital_paralysis" // From AnatomicalRegions.ts & GameTypes.ts
  | "vital_weakness" // From AnatomicalRegions.ts & GameTypes.ts
  | "stamina_drain" // From AnatomicalRegions.ts & GameTypes.ts
  | "ki_boost" // From AnatomicalRegions.ts & GameTypes.ts
  | "ki_disruption" // From GameTypes.ts
  | "damage_vulnerability" // From GameTypes.ts
  | "paralysis" // From GameTypes.ts
  | "vulnerable" // From DamageCalculator.ts
  | "debuff" // From KoreanVitalPoints.ts
  | "bleed" // From KoreanVitalPoints.ts (example)
  | "dizzy" // From KoreanVitalPoints.ts (example)
  | "winded"; // From KoreanVitalPoints.ts (example)

// Status effects - UNIFIED
export interface StatusEffect {
  type: ConditionType | string;
  duration: number;
  magnitude?: number; // Standardized from 'intensity'
  chance?: number;
  source?: string; // e.g., 'vital_point', 'technique'
  description?: string;
}

// Anatomical regions and vital points
// Using the interface version from AnatomicalRegions.ts as a base, adapted
export interface AnatomicalRegion {
  readonly id: string; // e.g., "head", "neck_front"
  readonly korean: string; // e.g., "머리", "목 앞부분"
  readonly english: string; // e.g., "Head", "Front of Neck"
  readonly bounds?: { x: number; y: number; width: number; height: number }; // Optional for abstract regions
  readonly vulnerability?: number; // General vulnerability multiplier
  readonly description?: string;
  readonly traditionalName?: string; // e.g., "두부 급소"
  readonly category?: VitalPointCategory; // Link to category
}

// For specific identifiers used in some parts of the code
export type AnatomicalRegionIdentifier =
  | "head"
  | "neck"
  | "chest"
  | "torso"
  | "limbs"
  | "upper_torso"
  | "lower_torso"
  | "head_neck"
  | "arms"
  | "legs"
  | "abdomen" // From original types/index.ts AnatomicalRegion
  | "back"; // From GameTypes.ts AnatomicalRegion

// Consolidated VitalPointCategory
export type VitalPointCategory =
  | "head"
  | "neck"
  | "torso"
  | "arms"
  | "legs"
  | "special"
  | "primary"
  | "secondary"
  | "tertiary"
  | "critical" // From GameTypes.ts
  | "major" // From GameTypes.ts
  | "minor" // From GameTypes.ts
  | "consciousness" // From AnatomicalRegions.ts
  | "circulation" // From AnatomicalRegions.ts
  | "breathing" // From AnatomicalRegions.ts
  | "nerve" // From AnatomicalRegions.ts
  | "energy" // From AnatomicalRegions.ts
  | "balance"; // From AnatomicalRegions.ts

// Vital point system - UNIFIED (based on types/index.ts version, enhanced)
export interface VitalPoint {
  id: string;
  name: {
    english: string;
    korean: string;
  };
  koreanName: string; // Direct access
  region: AnatomicalRegionIdentifier; // Link to a region identifier
  position: Position; // Relative position
  category: VitalPointCategory;
  description: {
    english: string;
    korean: string;
  };
  effects?: StatusEffect[];
  damageMultiplier: number; // Standardized from baseDamageModifier
  stunMultiplier?: number;
  accessibility?: number; // How easy to hit
  critChanceBonus?: number;
  meridian?: string; // Associated meridian
  difficulty?: number; // From GameTypes.ts & AnatomicalRegions.ts
  vulnerability?: number; // From GameTypes.ts
}

// Korean technique definitions - UNIFIED (based on types/index.ts, enhanced from GameTypes.ts)
export interface KoreanTechnique {
  id?: string; // Added from GameTypes.ts (optional if name is primary key)
  name: string;
  koreanName?: string;
  englishName?: string; // Added for consistency
  description: string | { korean: string; english: string }; // Allow object or simple string
  damage: number;
  range: number;
  accuracy?: number; // From GameTypes.ts (0.0 to 1.0)
  speed?: number; // Attack speed multiplier, from GameTypes.ts
  kiCost?: number;
  staminaCost?: number;
  cooldown?: number;
  type: "strike" | "grapple" | "block" | "counter" | "movement" | "special";
  effects?: StatusEffect[];
  icon?: string;
  animation?: string;
  soundEffect?: string;
  unlockLevel?: number;
  stanceAffinity?: TrigramStance[];
  properties?: string[];
  critChance?: number;
  critMultiplier?: number; // Damage multiplier on crit
  accuracyModifier?: number;
  stunValue?: number;
  vitalPointMultiplier?: number; // From GameTypes.ts
  // stance?: TrigramStance; // From GameTypes.ts, covered by stanceAffinity or implicit by TrigramData
}

export interface VitalPointHit {
  readonly hit: boolean;
  readonly vitalPoint?: VitalPoint; // The specific vital point struct
  readonly region?: AnatomicalRegionIdentifier; // General region hit
  readonly damage: number; // Damage dealt by this hit/vital point component
  readonly stunning?: number; // Stun value
  readonly critical: boolean;
  readonly effectsApplied?: StatusEffect[]; // Effects specifically from this vital point
  readonly description: string;
  readonly effectiveness?: number; // How effectively the vital point was struck (0-1)
  readonly accuracy?: number; // Accuracy of the hit that struck the VP
}

export type DamageType =
  | "light"
  | "medium"
  | "heavy"
  | "critical"
  | "block"
  | "vital"; // Added for clarity

export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type: DamageType;
  readonly damage: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean?: string;
  readonly attackerId?: string;
  readonly targetId?: string;
  readonly techniqueName?: string;
}

export interface Condition {
  type: ConditionType | string;
  duration: number;
  startTime?: number;
  magnitude?: number;
  source?: string;
  icon?: string;
  description?: string;
}

export interface PlayerState {
  readonly playerId: string;
  readonly position: Position;
  readonly velocity: Velocity;
  readonly health: number;
  readonly maxHealth: number;
  readonly stamina: number;
  readonly maxStamina: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stance: TrigramStance;
  readonly isAttacking: boolean;
  readonly isBlocking: boolean;
  readonly isMoving: boolean;
  readonly isDodging?: boolean; // From GameTypes.ts
  readonly facing: "left" | "right";
  readonly lastDamageTaken?: number;
  readonly conditions: Condition[];
  readonly comboCount: number;
  readonly lastHitTime?: number;
  readonly targetId?: string | null;
  readonly isStunned?: boolean; // From GameTypes.ts, can be derived from conditions
  readonly lastAttackTime?: number; // From GameTypes.ts
  readonly skill?: number; // From GameTypes.ts
  readonly attack?: number; // From GameTypes.ts (base attack power)
  readonly defense?: number; // From GameTypes.ts (base defense)
}

export interface TransitionMetrics {
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly time?: number; // Time to transition
  readonly effectiveness?: number; // How well the transition was performed
  readonly timeDelay?: number; // From GameTypes.ts, alias for time?
}

export interface TransitionPath {
  readonly path: TrigramStance[]; // Path of stances
  readonly totalKiCost: number;
  readonly totalStaminaCost: number;
  readonly totalCost?: number; // From GameTypes.ts, could be weighted sum
  readonly stances?: readonly TrigramStance[]; // Alias for path from GameTypes.ts
}

// Damage result - UNIFIED & EXPANDED
export interface DamageResult {
  damage: number; // Final damage dealt
  baseDamage?: number; // Damage before most multipliers
  isCritical: boolean;
  vitalPointHit: VitalPointHit | null;
  modifiers: string[]; // Text descriptions of modifiers applied
  description: string; // Overall description of the damage event
  blocked?: boolean; // Was the attack blocked? (From GameTypes.ts)
  multiplier?: number; // Overall damage multiplier (From GameTypes.ts)
  bonus?: number; // Flat damage bonus (From GameTypes.ts)
  meridianMultiplier?: number; // Specific meridian multiplier (From GameTypes.ts & KoreanDamageCalculator)
  damageType?: DamageType; // Type of damage (light, heavy, etc.) (From KoreanDamageCalculator)
  koreanName?: string; // Korean name for the hit/vital point (From KoreanDamageCalculator)
  vitalPointName?: string | { english: string; korean: string }; // English name (From KoreanDamageCalculator)
  vitalPointBonus?: number; // Bonus damage from vital point (From KoreanDamageCalculator)
}

export interface AttackResult {
  readonly hit: boolean;
  readonly damage: number; // Final damage dealt
  readonly blocked: boolean;
  readonly critical: boolean;
  readonly accuracy?: number;
  readonly comboMultiplier?: number;
  readonly vitalPointHit?: VitalPointHit; // Detailed vital point hit info
  readonly statusEffectsApplied?: StatusEffect[]; // Renamed from statusEffects for clarity
  readonly description: string;
  readonly knockback?: Position; // Using Position for Vector2D (From GameTypes.ts)
}

export interface BlockResult {
  // From GameTypes.ts
  readonly blocked: boolean;
  readonly perfectBlock: boolean;
  readonly damageReduction: number;
  readonly staminaCost: number;
  readonly counterAttackWindow?: number;
}

export type GamePhase =
  | "initializing"
  | "preparation"
  | "combat"
  | "victory"
  | "defeat"
  | "paused"
  | "intro" // Added for completeness
  | "training"; // Added for completeness

export interface EnvironmentState {
  readonly dojangType: string;
  readonly lighting: "day" | "night" | "dusk" | "dawn";
  readonly timeOfDay: number;
  readonly weather: "clear" | "rain" | "snow" | "fog";
}

export interface GameSettings {
  readonly difficulty: "easy" | "medium" | "hard";
  readonly allowMusic: boolean;
  readonly allowSFX: boolean;
  readonly showVitalPoints?: boolean; // From UIState in GameTypes.ts
  readonly showDamageNumbers?: boolean; // From UIState in GameTypes.ts
  readonly showStanceIndicator?: boolean; // From UIState in GameTypes.ts
}

// CombatEvent types from GameTypes.ts (more detailed)
export type CombatEventType =
  | "attack"
  | "hit"
  | "block"
  | "vital_point_strike" // Renamed from vital_point for clarity
  | "stance_change"
  | "combo"
  | "korean_technique_executed"
  | "dodge" // Added
  | "parry" // Added
  | "round_start"
  | "round_end"
  | "match_end";

export interface BaseCombatEvent {
  readonly type: CombatEventType | string; // Allow other string types
  readonly timestamp?: number; // Made optional as not always present in types/index.ts
  readonly technique?: string;
  readonly damage?: number;
  readonly isVitalPoint?: boolean;
  readonly stance?: TrigramStance;
  readonly comboCount?: number;
  readonly playerId?: string;
  readonly targetId?: string;
  readonly position?: Position;
}

export interface AttackEvent extends BaseCombatEvent {
  readonly type: "attack";
  readonly attacker: string; // playerId
  readonly technique: KoreanTechnique; // Full technique data
}

export interface HitEvent extends BaseCombatEvent {
  readonly type: "hit";
  readonly attacker: string; // playerId
  readonly defender: string; // playerId
  readonly damageDealt: number; // Renamed from damage for clarity
  readonly vitalPointStruck: boolean; // Renamed from vitalPoint
}

export interface BlockCombatEvent extends BaseCombatEvent {
  // Renamed from BlockEvent to avoid conflict
  readonly type: "block";
  readonly defender: string; // playerId
  readonly success: boolean;
  readonly damagePrevented: number; // Renamed from damage
}

export interface VitalPointEvent extends BaseCombatEvent {
  readonly type: "vital_point_strike";
  readonly attacker: string; // playerId
  readonly defender: string; // playerId
  readonly vitalPointData: VitalPoint; // Renamed from vitalPoint
  readonly effectsInflicted: readonly StatusEffect[]; // Renamed from effects
}

export interface StanceChangeEvent extends BaseCombatEvent {
  readonly type: "stance_change";
  readonly player: string; // playerId
  readonly fromStance: TrigramStance;
  readonly toStance: TrigramStance;
}

export interface ComboEvent extends BaseCombatEvent {
  readonly type: "combo";
  readonly player: string; // playerId
  readonly count: number;
  readonly techniquesUsed: readonly string[]; // Renamed from techniques
}

export interface KoreanTechniqueEvent extends BaseCombatEvent {
  readonly type: "korean_technique_executed";
  // technique, damage, isVitalPoint are already in BaseCombatEvent
}

// Union of all specific combat events
export type SpecificCombatEvent =
  | AttackEvent
  | HitEvent
  | BlockCombatEvent
  | VitalPointEvent
  | StanceChangeEvent
  | ComboEvent
  | KoreanTechniqueEvent;

// General CombatEvent can be BaseCombatEvent or a specific one
export type CombatEvent = BaseCombatEvent | SpecificCombatEvent;

export interface GameState {
  readonly players: [PlayerState, PlayerState];
  readonly currentRound: number;
  readonly timeRemaining?: number;
  readonly winner?: number | null; // Player index or null
  readonly isPaused: boolean;
  readonly phase: GamePhase;
  readonly gameTime?: number;
  readonly environment?: EnvironmentState;
  readonly projectiles?: unknown[];
  readonly gameEvents?: CombatEvent[];
  readonly matchScore?: { player1: number; player2: number };
  readonly settings?: GameSettings;
  readonly combatLog?: string[]; // For storing textual descriptions of events
  readonly maxRounds?: number; // From GameTypes.ts GameState
}

export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
}

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly interactive?: boolean;
  readonly isEnabled?: boolean;
  readonly playerKi?: number;
  readonly playerMaxKi?: number;
}

// TrigramProperties from GameTypes.ts, merged with TrigramData
export interface TrigramData {
  symbol: string;
  englishName: string;
  koreanName: string;
  element: string;
  description: string; // General description
  philosophy: string;
  color: string; // Hex color string
  technique: KoreanTechnique; // Default technique
  techniques: KoreanTechnique[]; // All techniques
  strengths?: TrigramStance[]; // Trigrams this stance is strong against
  weaknesses?: TrigramStance[]; // Trigrams this stance is weak against
  nature?: string; // From TrigramProperties
  kiRegenRate?: number; // From TrigramProperties
  staminaCostModifier?: number; // From TrigramProperties (staminaCost)
  damageModifier?: number; // From TrigramProperties
  defenseModifier?: number; // From TrigramProperties
  speedModifier?: number; // From TrigramProperties
}

export const KOREAN_COLORS = {
  TRADITIONAL_RED: 0x8a0000, // Dark red
  GOLD: 0xffd700,
  BLACK: 0x000000,
  WHITE: 0xffffff,
  DOJANG_BLUE: 0x4a89e2, // A medium blue
  CYAN: 0x00ffff, // Bright cyan
  GRAY_LIGHT: 0xcccccc,
  YELLOW: 0xffff00,
  LIGHT_GREY: 0xd3d3d3,
  Red: 0xff0000,
  Orange: 0xffa500,
  Green: 0x00ff00,
  Blue: 0x0000ff, // Pure blue
  Purple: 0x800080,
  Brown: 0xa52a2a,
  DARK_BLUE: 0x000a12, // From GameTypes.ts
  ACCENT_BLUE: 0x004455, // From GameTypes.ts
  GRAY_MEDIUM: 0x888888, // From GameTypes.ts
  GRAY_DARK: 0x444444, // From GameTypes.ts
} as const;

// TRIGRAM_DATA definition (ensure KoreanTechnique inside matches the main definition)
// ... (TRIGRAM_DATA definition remains largely the same, but ensure nested KoreanTechnique objects are valid)
// Example for one technique within TRIGRAM_DATA.geon.technique:
// Make sure this structure is compatible with the main KoreanTechnique interface
export const TRIGRAM_DATA: Record<TrigramStance, TrigramData> = {
  geon: {
    symbol: "☰",
    englishName: "Heaven",
    koreanName: "건",
    element: "Metal", // Or Sky/Heaven based on interpretation
    description:
      "하늘의 우뢰같은 강력한 일격 (A powerful strike like thunder from the sky)",
    philosophy: "창조와 권위의 힘 (Creative and authoritative power)",
    color: KOREAN_COLORS.GOLD,
    technique: {
      // This is a KoreanTechnique
      id: "geon_thunder_strike",
      name: "천둥벽력",
      koreanName: "천둥벽력",
      englishName: "Thunder Strike",
      description: {
        korean: "하늘의 우뢰같은 강력한 일격",
        english: "Thunderous strike from heaven",
      },
      damage: 28,
      range: 60, // Mid-range
      accuracy: 0.85,
      speed: 1.0,
      kiCost: 15,
      staminaCost: 10,
      type: "strike",
      critChance: 0.1,
      critMultiplier: 1.6,
      vitalPointMultiplier: 1.2,
      // stance: "geon", // Implicit
    } as KoreanTechnique, // Cast to ensure compatibility
    techniques: [], // Populate with more techniques
    strengths: ["li", "son"], // Example
    weaknesses: ["gam", "gan"], // Example
    nature: "Yang",
    kiRegenRate: 1.2,
    staminaCostModifier: 0.9,
    damageModifier: 1.1,
    defenseModifier: 1.0,
    speedModifier: 1.05,
  },
  tae: {
    symbol: "☱",
    englishName: "Lake",
    koreanName: "태",
    element: "Metal", // Or Water based on interpretation
    description:
      "호수의 물결처럼 연속적인 타격 (Continuous strikes like lake waves)",
    philosophy: "기쁨과 만족의 표현 (Expression of joy and satisfaction)",
    color: KOREAN_COLORS.ACCENT_BLUE, // Sky Blue like 0x87ceeb
    technique: {
      id: "tae_flowing_combo",
      name: "유수연타",
      koreanName: "유수연타",
      englishName: "Flowing Combo",
      description: {
        korean: "호수의 물결처럼 연속적인 타격",
        english: "Continuous strikes like lake waves",
      },
      damage: 18, // Lower damage, but perhaps faster or more hits
      range: 50,
      accuracy: 0.9,
      speed: 1.2,
      kiCost: 12,
      staminaCost: 8,
      type: "strike",
      properties: ["multi_hit"],
      critChance: 0.05,
      critMultiplier: 1.5,
      vitalPointMultiplier: 1.0,
    } as KoreanTechnique,
    techniques: [],
    nature: "Yin",
    kiRegenRate: 1.0,
    staminaCostModifier: 0.8,
    damageModifier: 0.9,
    defenseModifier: 1.1,
    speedModifier: 1.1,
  },
  li: {
    symbol: "☲",
    englishName: "Fire",
    koreanName: "리",
    element: "Fire",
    description: "불꽃처럼 맹렬한 찌르기 (Fierce thrust like flame)",
    philosophy: "명료함과 지혜의 빛 (Light of clarity and wisdom)",
    color: KOREAN_COLORS.Red, // Red Orange like 0xff4500
    technique: {
      id: "li_flame_spear",
      name: "화염지창",
      koreanName: "화염지창",
      englishName: "Flame Spear",
      description: {
        korean: "불꽃처럼 맹렬한 찌르기",
        english: "Fierce thrust like flame",
      },
      damage: 35,
      range: 70, // Longer range
      accuracy: 0.8,
      speed: 0.9, // Slower but powerful
      kiCost: 20,
      staminaCost: 15,
      type: "strike",
      effects: [{ type: "burn", duration: 3, magnitude: 5, chance: 0.3 }],
      critChance: 0.12,
      critMultiplier: 1.7,
      vitalPointMultiplier: 1.3,
    } as KoreanTechnique,
    techniques: [],
    nature: "Yin",
    kiRegenRate: 1.1,
    staminaCostModifier: 1.1,
    damageModifier: 1.2,
    defenseModifier: 0.9,
    speedModifier: 0.95,
  },
  jin: {
    symbol: "☳",
    englishName: "Thunder",
    koreanName: "진",
    element: "Wood", // Or Thunder/Movement
    description: "번개처럼 빠른 일격 (Lightning-fast strike)",
    philosophy: "움직임과 각성의 에너지 (Energy of movement and awakening)",
    color: KOREAN_COLORS.Purple, // Purple like 0x9370db
    technique: {
      id: "jin_lightning_flash",
      name: "벽력일섬",
      koreanName: "벽력일섬",
      englishName: "Lightning Flash",
      description: {
        korean: "번개처럼 빠른 일격",
        english: "Lightning-fast strike",
      },
      damage: 40, // High damage
      range: 55,
      accuracy: 0.75, // Harder to land
      speed: 1.5, // Very fast
      kiCost: 25,
      staminaCost: 18,
      type: "strike",
      properties: ["unblockable_charge"],
      critChance: 0.15,
      critMultiplier: 1.8,
      vitalPointMultiplier: 1.1,
    } as KoreanTechnique,
    techniques: [],
    nature: "Yang",
    kiRegenRate: 1.0,
    staminaCostModifier: 1.2,
    damageModifier: 1.15,
    defenseModifier: 0.85,
    speedModifier: 1.2,
  },
  son: {
    symbol: "☴",
    englishName: "Wind",
    koreanName: "손",
    element: "Wood", // Or Wind/Gentle
    description:
      "바람처럼 가벼운 연속 공격 (Light continuous attacks like wind)",
    philosophy: "순응과 침투의 힘 (Power of yielding and penetration)",
    color: KOREAN_COLORS.Green, // Pale Green like 0x98fb98
    technique: {
      id: "son_whirlwind_strikes",
      name: "선풍연격",
      koreanName: "선풍연격",
      englishName: "Whirlwind Strikes",
      description: {
        korean: "바람처럼 가벼운 연속 공격",
        english: "Light continuous attacks like wind",
      },
      damage: 15, // Low damage per hit
      range: 80, // Longest range due to movement
      accuracy: 0.95,
      speed: 1.3,
      kiCost: 10,
      staminaCost: 6,
      type: "movement", // Could be movement or strike
      properties: ["area_effect", "evasive"],
      critChance: 0.08,
      critMultiplier: 1.5,
      vitalPointMultiplier: 0.9, // Harder to target specific VPs
    } as KoreanTechnique,
    techniques: [],
    nature: "Yin",
    kiRegenRate: 1.3,
    staminaCostModifier: 0.7,
    damageModifier: 0.85,
    defenseModifier: 1.0,
    speedModifier: 1.3,
  },
  gam: {
    symbol: "☵",
    englishName: "Water",
    koreanName: "감",
    element: "Water",
    description: "물의 흐름을 따른 반격 (Counterattack following water's flow)",
    philosophy: "위험과 심연의 지혜 (Wisdom of danger and abyss)",
    color: KOREAN_COLORS.Blue, // Royal Blue like 0x4169e1
    technique: {
      id: "gam_water_counter",
      name: "수류반격",
      koreanName: "수류반격",
      englishName: "Water Counter",
      description: {
        korean: "물의 흐름을 따른 반격",
        english: "Counterattack following water's flow",
      },
      damage: 25, // Damage depends on countered attack
      range: 45,
      accuracy: 0.88, // Accuracy of the counter itself
      speed: 1.0, // Speed of counter execution
      kiCost: 18,
      staminaCost: 12,
      type: "counter",
      critChance: 0.2, // High crit on successful counter
      critMultiplier: 2.0,
      vitalPointMultiplier: 1.5, // Counters can target VPs
    } as KoreanTechnique,
    techniques: [],
    nature: "Yang",
    kiRegenRate: 0.9,
    staminaCostModifier: 1.0,
    damageModifier: 1.0,
    defenseModifier: 1.2,
    speedModifier: 0.9,
  },
  gan: {
    symbol: "☶",
    englishName: "Mountain",
    koreanName: "간",
    element: "Earth", // Or Mountain/Stillness
    description: "산처럼 견고한 방어 (Solid defense like mountain)",
    philosophy: "정지와 명상의 안정 (Stability of stillness and meditation)",
    color: KOREAN_COLORS.Brown, // Saddle Brown like 0x8b4513
    technique: {
      id: "gan_mountain_defense",
      name: "반석방어",
      koreanName: "반석방어",
      englishName: "Mountain Defense",
      description: {
        korean: "산처럼 견고한 방어",
        english: "Solid defense like mountain",
      },
      damage: 12, // Defensive, low damage, maybe reflect or stun
      range: 30, // Short range, defensive posture
      accuracy: 0.98, // High accuracy for defensive moves
      speed: 0.8, // Slower, deliberate
      kiCost: 8,
      staminaCost: 5, // Low stamina cost for holding stance
      type: "block", // Or special
      properties: ["super_armor", "damage_reduction"],
      critChance: 0.02,
      critMultiplier: 1.5,
      vitalPointMultiplier: 1.0,
    } as KoreanTechnique,
    techniques: [],
    nature: "Yang",
    kiRegenRate: 0.8,
    staminaCostModifier: 0.95,
    damageModifier: 0.95,
    defenseModifier: 1.3,
    speedModifier: 0.8,
  },
  gon: {
    symbol: "☷",
    englishName: "Earth",
    koreanName: "곤",
    element: "Earth",
    description: "대지의 포용력으로 제압 (Subduing with earth's embrace)",
    philosophy: "수용과 양육의 덕 (Virtue of receptivity and nurturing)",
    color: KOREAN_COLORS.GRAY_DARK, // Dark Brown like 0x654321
    technique: {
      id: "gon_earth_embrace",
      name: "대지포옹",
      koreanName: "대지포옹",
      englishName: "Earth Embrace",
      description: {
        korean: "대지의 포용력으로 제압",
        english: "Subduing with earth's embrace",
      },
      damage: 30, // Grappling damage
      range: 40, // Close range for grapple
      accuracy: 0.82,
      speed: 0.9,
      kiCost: 22,
      staminaCost: 16,
      type: "grapple",
      effects: [{ type: "stun", duration: 2, magnitude: 1, chance: 0.7 }],
      critChance: 0.05,
      critMultiplier: 1.6,
      vitalPointMultiplier: 1.4, // Grapples can target VPs
    } as KoreanTechnique,
    techniques: [],
    nature: "Yin",
    kiRegenRate: 1.0,
    staminaCostModifier: 1.05,
    damageModifier: 1.05,
    defenseModifier: 1.15,
    speedModifier: 0.85,
  },
};

export const KOREAN_TECHNIQUES: Record<string, KoreanTechnique> = Object.values(
  TRIGRAM_DATA
).reduce((acc, trigram) => {
  if (trigram.technique?.name) {
    // Ensure technique and name exist
    acc[trigram.technique.name] = trigram.technique;
  }
  trigram.techniques.forEach((tech) => {
    if (tech?.name) {
      // Ensure tech and name exist
      acc[tech.name] = tech;
    }
  });
  return acc;
}, {} as Record<string, KoreanTechnique>);

export function createPlayerState(
  playerId: string,
  initialPosition: Position
): PlayerState {
  return {
    playerId,
    position: initialPosition,
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon",
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
    isDodging: false,
    facing: "right",
    lastDamageTaken: 0,
    conditions: [],
    comboCount: 0,
    lastHitTime: 0,
    targetId: null,
  };
}

export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";

export interface CombatResult {
  // Used by CombatSystem.ts
  damageDealt: number;
  attackerState: PlayerState;
  defenderState: PlayerState;
  log: string[];
  hitVitalPoint?: VitalPoint;
  conditionsApplied?: Condition[];
}

export interface KiFlowFactors {
  // Used by TrigramSystem.ts
  baseRate: number;
  playerLevelModifier: number;
  stanceAffinity: number;
  kiRecovery?: number;
  kiConsumption?: number;
}

export interface StanceData {
  // Used by TrigramSystem.ts
  name: string;
  order: number;
  // Add other properties as needed
}

// VitalPointSystemConfig - Merged from types/index.ts and GameTypes.ts
export interface VitalPointSystemConfig {
  readonly enabled?: boolean;
  readonly baseAccuracy?: number; // From types/index.ts
  readonly vitalPointMultiplier?: number; // From types/index.ts
  readonly precisionLevels?: Record<string, number>; // From types/index.ts
  readonly maxHitDistance?: number; // From GameTypes.ts & types/index.ts
  readonly precisionThreshold?: number; // From GameTypes.ts & types/index.ts
  readonly debugging?: boolean; // From GameTypes.ts & types/index.ts
  readonly distanceModifier?: number; // From types/index.ts
  readonly angleModifier?: number; // From types/index.ts
}

// VitalPointEffect was used in KoreanVitalPoints.ts, but StatusEffect is now the standard.
// If VitalPointEffect is truly distinct, it should be defined. Otherwise, it's deprecated.
// For now, assuming StatusEffect covers its use.

// UIState from GameTypes.ts, largely integrated into GameSettings
export interface UIState {
  readonly currentMenu: string | null;
  readonly isLoading: boolean;
  // Other UI-specific states not part of GameSettings
}

// AttackData from GameTypes.ts
export interface AttackData {
  readonly technique: KoreanTechnique;
  readonly damage: number;
  readonly force: Position; // Vector2D
  readonly attacker: string; // Player ID
  readonly timestamp: number;
  readonly isVitalPoint: boolean;
  readonly vitalPointHit?: VitalPointHit;
  readonly criticalMultiplier: number;
}

// TransitionResult from GameTypes.ts
export interface TransitionResult {
  readonly cost: TransitionMetrics;
  readonly success: boolean;
  readonly reason?: string;
}

// Types for KoreanAnatomy.ts
export interface EnergyMeridian {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly element: string;
  readonly startPoint: { x: number; y: number };
  readonly endPoint: { x: number; y: number };
  readonly vitalPoints: readonly string[]; // IDs of vital points
  readonly energy: "yin" | "yang";
  readonly description: string;
  readonly traditionalName: string;
}

export interface ElementalRelations {
  readonly element: string;
  readonly generative: string;
  readonly destructive: string;
  readonly supports: readonly string[];
  readonly weakens: readonly string[];
  readonly emotion: string;
  readonly organ: string;
  readonly season: string;
  readonly direction: string;
}

export interface KoreanAnatomicalZone {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly boundaries: {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };
  readonly vulnerability: number;
  readonly meridians: readonly string[]; // IDs of meridians
  readonly vitalPoints: readonly string[]; // IDs of vital points
  readonly traditionalImportance: number;
  readonly description: string;
}

// Types for HitDetection.ts
export type AttackType =
  | "punch"
  | "kick"
  | "elbow"
  | "knee"
  | "grapple"
  | "throw"
  | "pressure_point"
  | "combination";

export interface HitResult {
  // Specific to HitDetectionSystem, distinct from AttackResult
  readonly hit: boolean;
  readonly damage: number;
  readonly vitalPoint: VitalPoint | null; // The actual VP struct from AnatomicalRegions
  readonly effects: readonly StatusEffect[];
  readonly hitType: "normal" | "vital" | "critical" | "miss";
  readonly description: string;
  readonly accuracy?: number;
}

export interface HitDetectionParams {
  readonly attackPosition: { x: number; y: number };
  readonly attackType: AttackType;
  readonly accuracy: number;
  readonly baseDamage: number;
  readonly attackerSkill: number;
  readonly defenderGuard: number;
}

export interface CollisionZone {
  readonly center: { x: number; y: number };
  readonly radius: number;
  readonly shape: "circle" | "rectangle";
  readonly width?: number;
  readonly height?: number;
}
