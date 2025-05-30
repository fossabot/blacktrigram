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

// Move KOREAN_COLORS to the top
export const KOREAN_COLORS = {
  TRADITIONAL_RED: "#8a0000",
  GOLD: "#ffd700",
  BLACK: "#000000",
  WHITE: "#ffffff",
  DOJANG_BLUE: "#4a89e2",
  CYAN: "#00ffff",
  GRAY_LIGHT: "#cccccc",
  YELLOW: "#ffff00",
  LIGHT_GREY: "#d3d3d3",
  Red: "#ff0000",
  Orange: "#ffa500",
  Green: "#00ff00",
  Blue: "#0000ff",
  Purple: "#800080",
  Brown: "#a52a2a",
  DARK_BLUE: "#000a12",
  ACCENT_BLUE: "#004455",
  GRAY_MEDIUM: "#888888",
  GRAY_DARK: "#444444",
  SKIN_TONE_LIGHT: "#fdbcb4",
  PLAYER_1_BLUE: "#4a89e2",
  PLAYER_2_RED: "#8a0000",
  CRITICAL_RED: "#ff0000",
  DAMAGE_YELLOW: "#ffff00",
  // Add stance colors for Player component
  geon: "#ffd700", // Gold - Heaven
  tae: "#87ceeb", // Sky Blue - Lake
  li: "#ff4500", // Red Orange - Fire
  jin: "#9370db", // Purple - Thunder
  son: "#98fb98", // Pale Green - Wind
  gam: "#4169e1", // Royal Blue - Water
  gan: "#8b4513", // Saddle Brown - Mountain
  gon: "#654321", // Dark Brown - Earth
} as const;

// Add Korean font family constant
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";

// VitalPointCategory - single definition
export type VitalPointCategory =
  | "nerve"
  | "joint"
  | "meridian"
  | "organ"
  | "vessel"
  | "primary"
  | "secondary"
  | "consciousness"
  | "circulation"
  | "breathing"
  | "energy"
  | "balance";

// Damage type
export type DamageType = "light" | "medium" | "heavy" | "critical" | "block";

// Update VitalPointSystemConfig
export interface VitalPointSystemConfig {
  readonly baseAccuracy: number;
  readonly distanceModifier: number;
  readonly targetingDifficulty?: number;
  readonly damageMultiplier?: number;
  readonly effectChance?: number;
  readonly angleModifier?: number;
}

// Define interfaces used by the components
export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export type Vector2D = Position;

// Attack types
export type AttackType =
  | "punch"
  | "kick"
  | "elbow"
  | "knee"
  | "grapple"
  | "throw"
  | "pressure_point"
  | "combination"
  | "strike";

// Status effects
export interface StatusEffect {
  type: string;
  duration: number;
  magnitude?: number;
  chance?: number;
  source?: string;
}

// Condition
export interface Condition {
  type: string;
  duration: number;
  magnitude?: number;
  source: string;
}

// Anatomical system types - single definition
export type AnatomicalRegionIdentifier =
  | "head"
  | "torso"
  | "arms"
  | "legs"
  | "neck"
  | "chest";

export interface AnatomicalRegion {
  id: string;
  name: { english: string; korean: string };
  bounds: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
  vitalPoints: VitalPoint[];
  vulnerability?: number;
  traditionalName?: string;
}

export interface EnergyMeridian {
  id: string;
  korean: string;
  english: string;
  element: string;
  points: string[];
  startPoint?: Position;
  endPoint?: Position;
}

export interface ElementalRelations {
  strengthens: string;
  weakens: string | string[];
  strengthenedBy: string;
  weakenedBy: string;
  element?: string;
}

export interface VitalPoint {
  id: string;
  name: TrilingualName; // Use TrilingualName instead of inline type
  koreanName: string;
  position: Position;
  region: string;
  difficulty?: number;
  damageMultiplier: number;
  effects?: StatusEffect[];
  category?: VitalPointCategory;
  description?: { korean: string; english: string };
  meridian?: string;
}

// Add missing types for hit detection and transitions
export interface TransitionMetrics {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
  readonly cost?: number; // Total cost
  readonly time?: number; // Alternative time property
  readonly cooldown?: number;
}

export interface TransitionPath {
  readonly path: TrigramStance[];
  readonly totalCost: number;
  readonly success: boolean;
  readonly from?: TrigramStance;
  readonly to?: TrigramStance;
  readonly efficiency?: number;
  readonly totalKiCost?: number;
  readonly totalStaminaCost?: number;
  readonly description?: string;
}

export interface KiFlowFactors {
  readonly playerLevelModifier?: number;
  readonly stanceAffinity?: number;
  readonly kiRecovery?: number;
  readonly kiConsumption?: number;
  readonly timeInStance?: number;
}

export interface CollisionZone {
  readonly center: Position;
  readonly shape: "circle" | "rectangle";
  readonly radius?: number;
  readonly width?: number;
  readonly height?: number;
}

export interface HitDetectionParams {
  readonly attackPosition: Position;
  readonly attackType: AttackType;
  readonly accuracy: number;
  readonly baseDamage: number;
  readonly attackerSkill: number;
  readonly defenderGuard: number;
}

export interface VitalPointHit {
  readonly hit: boolean;
  readonly vitalPoint: VitalPoint;
  readonly damage: number;
  readonly critical: boolean;
  readonly description: string;
  readonly effectiveness?: number;
  readonly effectsApplied?: StatusEffect[];
}

export interface DamageResult {
  readonly damage: number;
  readonly baseDamage: number;
  readonly isCritical: boolean;
  readonly vitalPointHit: VitalPointHit | null;
  readonly modifiers: readonly string[];
  readonly description: string;
  readonly damageType: DamageType;
  koreanName?: string; // Make mutable
  vitalPointName?: TrilingualName; // Make mutable
  readonly vitalPointBonus?: number;
  readonly meridianMultiplier?: number;
}

export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type:
    | "light"
    | "medium"
    | "heavy"
    | "critical"
    | "block"
    | "damage"
    | "miss";
  readonly damage: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean?: string;
  readonly color: number;
  readonly createdAt: number;
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
  readonly meridians: readonly string[];
  readonly vitalPoints: readonly string[]; // Keep as string IDs for now
  readonly traditionalImportance: number;
  readonly description: string;
}

// Korean technique interface
export interface KoreanTechnique {
  name: string;
  koreanName: string;
  englishName: string;
  description: { korean: string; english: string };
  kiCost: number;
  staminaCost: number;
  range: number;
  accuracy: number;
  stance: TrigramStance;
  damage: number;
  type: AttackType;
  effects?: StatusEffect[];
  critChance?: number;
  critMultiplier?: number;
  properties?: string[];
  accuracyModifier?: number;
  stunValue?: number;
}

// Extended Trigram Data interface
export interface TrigramData {
  symbol: string;
  koreanName: string;
  korean: string;
  element: string;
  color: number;
  philosophy?: string;
  direction?: string;
  english: string;
  englishName: string;
  order: number;
  damageModifier?: number;
  defenseModifier?: number;
  speedModifier?: number;
  kiRegenRate?: number;
  staminaCostModifier?: number;
  technique: KoreanTechnique;
}

// Add TRIGRAM_DATA constant with expanded type definition
export const TRIGRAM_DATA: Record<TrigramStance, TrigramData> = {
  geon: {
    symbol: "☰",
    koreanName: "건 (Heaven)",
    korean: "건",
    element: "Heaven",
    color: 0xffd700,
    philosophy: "창조적 에너지",
    direction: "북서",
    english: "Heaven",
    englishName: "Heaven",
    order: 0,
    damageModifier: 1.2,
    defenseModifier: 0.9,
    speedModifier: 1.0,
    kiRegenRate: 1.2,
    technique: {
      name: "천둥벽력",
      koreanName: "천둥벽력",
      englishName: "Thunder Strike",
      description: { korean: "천둥벽력", english: "Thunder Strike" },
      kiCost: 15,
      staminaCost: 10,
      range: 60,
      accuracy: 0.8,
      stance: "geon",
      damage: 28,
      type: "strike",
      critChance: 0.15,
      critMultiplier: 1.5,
    },
  },
  tae: {
    symbol: "☱",
    koreanName: "태 (Lake)",
    korean: "태",
    element: "Lake",
    color: 0x87ceeb,
    philosophy: "기쁨과 즐거움",
    direction: "서",
    english: "Lake",
    englishName: "Lake",
    order: 1,
    damageModifier: 0.9,
    defenseModifier: 1.1,
    speedModifier: 1.2,
    kiRegenRate: 1.0,
    technique: {
      name: "유수연타",
      koreanName: "유수연타",
      englishName: "Flowing Combo",
      description: { korean: "유수연타", english: "Flowing Combo" },
      kiCost: 12,
      staminaCost: 8,
      range: 50,
      accuracy: 0.85,
      stance: "tae",
      damage: 18,
      type: "combination",
      critChance: 0.1,
      critMultiplier: 1.3,
    },
  },
  li: {
    symbol: "☲",
    koreanName: "리 (Fire)",
    korean: "리",
    element: "Fire",
    color: 0xff4500,
    philosophy: "밝음과 투명함",
    direction: "동",
    english: "Fire",
    englishName: "Fire",
    order: 2,
    damageModifier: 1.3,
    defenseModifier: 0.8,
    speedModifier: 1.1,
    kiRegenRate: 1.1,
    technique: {
      name: "화염지창",
      koreanName: "화염지창",
      englishName: "Flame Spear",
      description: { korean: "화염지창", english: "Flame Spear" },
      kiCost: 20,
      staminaCost: 15,
      range: 55,
      accuracy: 0.75,
      stance: "li",
      damage: 35,
      type: "pressure_point",
      critChance: 0.2,
      critMultiplier: 1.7,
    },
  },
  jin: {
    symbol: "☳",
    koreanName: "진 (Thunder)",
    korean: "진",
    element: "Thunder",
    color: 0x9370db,
    philosophy: "도약과 행동",
    direction: "동북",
    english: "Thunder",
    englishName: "Thunder",
    order: 3,
    damageModifier: 1.4,
    defenseModifier: 0.7,
    speedModifier: 1.3,
    kiRegenRate: 0.9,
    technique: {
      name: "벽력일섬",
      koreanName: "벽력일섬",
      englishName: "Lightning Flash",
      description: { korean: "벽력일섬", english: "Lightning Flash" },
      kiCost: 25,
      staminaCost: 20,
      range: 45,
      accuracy: 0.7,
      stance: "jin",
      damage: 40,
      type: "kick",
      critChance: 0.25,
      critMultiplier: 1.8,
    },
  },
  son: {
    symbol: "☴",
    koreanName: "손 (Wind)",
    korean: "손",
    element: "Wind",
    color: 0x98fb98,
    philosophy: "온순함과 침투력",
    direction: "남동",
    english: "Wind",
    englishName: "Wind",
    order: 4,
    damageModifier: 0.8,
    defenseModifier: 1.0,
    speedModifier: 1.5,
    kiRegenRate: 1.1,
    technique: {
      name: "선풍연격",
      koreanName: "선풍연격",
      englishName: "Whirlwind",
      description: { korean: "선풍연격", english: "Whirlwind" },
      kiCost: 10,
      staminaCost: 12,
      range: 40,
      accuracy: 0.9,
      stance: "son",
      damage: 15,
      type: "combination",
      critChance: 0.15,
      critMultiplier: 1.4,
    },
  },
  gam: {
    symbol: "☵",
    koreanName: "감 (Water)",
    korean: "감",
    element: "Water",
    color: 0x4169e1,
    philosophy: "위험과 깊이",
    direction: "북",
    english: "Water",
    englishName: "Water",
    order: 5,
    damageModifier: 1.0,
    defenseModifier: 1.2,
    speedModifier: 1.1,
    kiRegenRate: 1.3,
    technique: {
      name: "수류반격",
      koreanName: "수류반격",
      englishName: "Counter Strike",
      description: { korean: "수류반격", english: "Counter Strike" },
      kiCost: 15,
      staminaCost: 10,
      range: 35,
      accuracy: 0.85,
      stance: "gam",
      damage: 25,
      type: "grapple",
      critChance: 0.1,
      critMultiplier: 1.6,
    },
  },
  gan: {
    symbol: "☶",
    koreanName: "간 (Mountain)",
    korean: "간",
    element: "Mountain",
    color: 0x8b4513,
    philosophy: "정지와 견고함",
    direction: "남서",
    english: "Mountain",
    englishName: "Mountain",
    order: 6,
    damageModifier: 0.7,
    defenseModifier: 1.5,
    speedModifier: 0.8,
    kiRegenRate: 0.8,
    technique: {
      name: "반석방어",
      koreanName: "반석방어",
      englishName: "Mountain Defense",
      description: { korean: "반석방어", english: "Mountain Defense" },
      kiCost: 12,
      staminaCost: 8,
      range: 30,
      accuracy: 0.95,
      stance: "gan",
      damage: 12,
      type: "elbow",
      critChance: 0.05,
      critMultiplier: 1.2,
    },
  },
  gon: {
    symbol: "☷",
    koreanName: "곤 (Earth)",
    korean: "곤",
    element: "Earth",
    color: 0x654321,
    philosophy: "순응과 수용",
    direction: "남",
    english: "Earth",
    englishName: "Earth",
    order: 7,
    damageModifier: 1.1,
    defenseModifier: 1.3,
    speedModifier: 0.9,
    kiRegenRate: 0.9,
    technique: {
      name: "대지포옹",
      koreanName: "대지포옹",
      englishName: "Earth Embrace",
      description: { korean: "대지포옹", english: "Earth Embrace" },
      kiCost: 18,
      staminaCost: 15,
      range: 25,
      accuracy: 0.9,
      stance: "gon",
      damage: 30,
      type: "throw",
      critChance: 0.1,
      critMultiplier: 1.5,
    },
  },
};

// Add STANCE_EFFECTIVENESS_MATRIX constant
export const STANCE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  geon: {
    geon: 1.0,
    tae: 0.9,
    li: 1.2,
    jin: 1.1,
    son: 0.8,
    gam: 0.9,
    gan: 1.3,
    gon: 1.0,
  },
  tae: {
    geon: 1.1,
    tae: 1.0,
    li: 0.9,
    jin: 0.8,
    son: 1.2,
    gam: 1.3,
    gan: 0.9,
    gon: 1.0,
  },
  li: {
    geon: 0.8,
    tae: 1.1,
    li: 1.0,
    jin: 1.3,
    son: 1.0,
    gam: 0.7,
    gan: 0.9,
    gon: 1.2,
  },
  jin: {
    geon: 0.9,
    tae: 1.2,
    li: 0.7,
    jin: 1.0,
    son: 1.1,
    gam: 1.0,
    gan: 1.3,
    gon: 0.8,
  },
  son: {
    geon: 1.2,
    tae: 0.8,
    li: 1.0,
    jin: 0.9,
    son: 1.0,
    gam: 1.1,
    gan: 0.7,
    gon: 1.3,
  },
  gam: {
    geon: 1.1,
    tae: 0.7,
    li: 1.3,
    jin: 1.0,
    son: 0.9,
    gam: 1.0,
    gan: 1.2,
    gon: 0.8,
  },
  gan: {
    geon: 0.7,
    tae: 1.1,
    li: 1.1,
    jin: 0.7,
    son: 1.3,
    gam: 0.8,
    gan: 1.0,
    gon: 1.2,
  },
  gon: {
    geon: 1.0,
    tae: 1.0,
    li: 0.8,
    jin: 1.2,
    son: 0.7,
    gam: 1.2,
    gan: 0.8,
    gon: 1.0,
  },
};

// Add TRIGRAM_STANCES_ORDER constant
export const TRIGRAM_STANCES_ORDER: TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

export interface TrainingProgress {
  practiceCount: number;
  mastery: number;
}

export interface PlayerState {
  playerId: string;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  ki: number;
  maxKi: number;
  stance: TrigramStance;
  isAttacking: boolean;
  isBlocking: boolean;
  isMoving: boolean;
  stamina: number;
  maxStamina: number;
  lastStanceChangeTime?: number;
  targetId?: string | null;
  conditions: Condition[];
  facing?: "left" | "right";
  lastDamageTaken?: number;
  comboCount?: number;
  lastHitTime?: number;
  visible?: boolean; // Add missing visible property
}

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly isEnabled?: boolean;
  readonly playerKi?: number;
  readonly playerMaxKi?: number;
}

export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
}

export type GamePhase =
  | "intro"
  | "training"
  | "combat"
  | "result"
  | "victory"
  | "defeat";

// Combat result
export interface CombatResult {
  success: boolean;
  damage: number;
  technique: KoreanTechnique;
  hitType: string;
  message: string;
  damageDealt?: number;
  attackerState?: PlayerState;
  defenderState?: PlayerState;
  log?: string[];
  conditionsApplied?: Condition[];
}

// Attack result
export interface AttackResult {
  hit: boolean;
  damage: number;
  critical: boolean;
  blocked: boolean;
  conditionsApplied: Condition[];
  attackerState: PlayerState;
  defenderState: PlayerState;
  description: string;
}

// Add missing TrilingualName type
export interface TrilingualName {
  readonly english: string;
  readonly korean: string;
  readonly chinese?: string;
}

// Helper function for creating player state
export function createPlayerState(
  id: string,
  position: Position,
  stance: TrigramStance = "geon",
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return {
    playerId: id,
    position: { ...position },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    ki: 50,
    maxKi: 100,
    stance,
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
    stamina: 100,
    maxStamina: 100,
    conditions: [],
    ...overrides,
  };
}
