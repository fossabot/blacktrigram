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
}

export interface Velocity {
  readonly x: number;
  readonly y: number;
}

// Anatomical regions and vital points - SINGLE DEFINITION
export type AnatomicalRegion =
  | "head"
  | "neck"
  | "chest"
  | "abdomen"
  | "arms"
  | "legs";
export type VitalPointCategory = "primary" | "secondary" | "tertiary";

// Korean technique definitions - UNIFIED
export interface KoreanTechnique {
  readonly name: string;
  readonly stance: TrigramStance;
  readonly damage: number;
  readonly range: number;
  readonly kiCost: number;
  readonly staminaCost: number;
  readonly accuracy: number;
  readonly description: {
    readonly korean: string;
    readonly english: string;
  };
  readonly koreanName: string;
  readonly englishName: string;
}

// Status effects - UNIFIED
export interface StatusEffect {
  readonly id: string;
  readonly name: string;
  readonly korean: string;
  readonly type: "damage" | "healing" | "debuff" | "buff" | "stun";
  readonly intensity: number;
  readonly duration: number;
  readonly effects: {
    readonly healthReduction?: number;
    readonly staminaReduction?: number;
    readonly speedMultiplier?: number;
    readonly damageMultiplier?: number;
  };
}

// Vital point system - UNIFIED
export interface VitalPoint {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly region: AnatomicalRegion;
  readonly position: Position;
  readonly coordinates: Position; // For GameTypes compatibility
  readonly category: VitalPointCategory;
  readonly difficulty: number;
  readonly bounds: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly vulnerability: {
    readonly damage: number;
    readonly stunning: number;
    readonly criticalChance: number;
  };
  readonly description: {
    readonly korean: string;
    readonly english: string;
  };
  readonly effects?: StatusEffect[];
}

export interface VitalPointHit {
  readonly hit: boolean;
  readonly region?: AnatomicalRegion;
  readonly damage: number;
  readonly stunning: number;
  readonly critical: boolean;
  readonly effects?: StatusEffect[];
  readonly description: string; // Made required for consistency
  readonly vitalPoint?: VitalPoint;
  readonly effectiveness?: number;
}

// Hit effects for visual feedback
export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly type: "light" | "medium" | "heavy" | "critical" | "block";
  readonly damage: number;
  readonly startTime: number;
  readonly duration: number;
  readonly korean?: string;
}

// Player state - COMPLETE AND UNIFIED
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
  readonly facing: "left" | "right";
  readonly lastDamageTaken: number;
  readonly activeEffects: StatusEffect[];
  readonly comboCount: number;
}

// Transition metrics - UNIFIED
export interface TransitionMetrics {
  readonly kiCost: number;
  readonly time: number;
  readonly effectiveness: number;
  readonly staminaCost: number;
}

// Transition path
export interface TransitionPath {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly difficulty: number;
  readonly culturalHarmony: number;
}

// Damage result - UNIFIED
export interface DamageResult {
  readonly damage: number;
  readonly type: "light" | "medium" | "heavy" | "critical";
  readonly blocked: boolean;
  readonly critical: boolean;
  readonly description: string;
  readonly korean: string;
}

// Attack result - UNIFIED
export interface AttackResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly blocked: boolean;
  readonly critical: boolean;
  readonly accuracy: number;
  readonly comboMultiplier: number;
  readonly vitalPointHit?: VitalPointHit;
  readonly statusEffects: StatusEffect[];
  readonly description: string;
}

// Game state types
export type GamePhase = "preparation" | "combat" | "victory" | "defeat";

export interface GameState {
  readonly players: [PlayerState, PlayerState];
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly winner: number | null;
  readonly isPaused: boolean;
  readonly phase: GamePhase;
}

// Component prop types
export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
}

// TrigramWheel props
export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly interactive?: boolean;
}

// Trigram data with colors
export interface TrigramData {
  readonly korean: string;
  readonly english: string;
  readonly element: string;
  readonly direction: string;
  readonly philosophy: string;
  readonly symbol: string;
  readonly color: number;
  readonly technique: KoreanTechnique;
}

// Korean color scheme
export const KOREAN_COLORS = {
  TRADITIONAL_RED: 0x8b0000,
  GOLD: 0xffd700,
  BLACK: 0x000000,
  WHITE: 0xffffff,
  DOJANG_BLUE: 0x4a90e2,
  CYAN: 0x00ffd0,
  GRAY_LIGHT: 0xcccccc,
} as const;

// Trigram data with complete information
export const TRIGRAM_DATA: Record<TrigramStance, TrigramData> = {
  geon: {
    korean: "건",
    english: "Heaven",
    element: "Metal",
    direction: "Northwest",
    philosophy: "창조와 권위의 힘 (Creative and authoritative power)",
    symbol: "☰",
    color: KOREAN_COLORS.GOLD,
    technique: {
      name: "천둥벽력",
      stance: "geon",
      damage: 28,
      range: 60,
      kiCost: 15,
      staminaCost: 10,
      accuracy: 0.85,
      description: {
        korean: "하늘의 우뢰같은 강력한 일격",
        english: "Thunderous strike from heaven",
      },
      koreanName: "천둥벽력",
      englishName: "Thunder Strike",
    },
  },
  tae: {
    korean: "태",
    english: "Lake",
    element: "Metal",
    direction: "West",
    philosophy: "기쁨과 만족의 표현 (Expression of joy and satisfaction)",
    symbol: "☱",
    color: 0x87ceeb,
    technique: {
      name: "유수연타",
      stance: "tae",
      damage: 18,
      range: 50,
      kiCost: 12,
      staminaCost: 8,
      accuracy: 0.9,
      description: {
        korean: "호수의 물결처럼 연속적인 타격",
        english: "Continuous strikes like lake waves",
      },
      koreanName: "유수연타",
      englishName: "Flowing Combo",
    },
  },
  li: {
    korean: "리",
    english: "Fire",
    element: "Fire",
    direction: "South",
    philosophy: "명료함과 지혜의 빛 (Light of clarity and wisdom)",
    symbol: "☲",
    color: 0xff4500,
    technique: {
      name: "화염지창",
      stance: "li",
      damage: 35,
      range: 70,
      kiCost: 20,
      staminaCost: 15,
      accuracy: 0.8,
      description: {
        korean: "불꽃처럼 맹렬한 찌르기",
        english: "Fierce thrust like flame",
      },
      koreanName: "화염지창",
      englishName: "Flame Spear",
    },
  },
  jin: {
    korean: "진",
    english: "Thunder",
    element: "Wood",
    direction: "East",
    philosophy: "움직임과 각성의 에너지 (Energy of movement and awakening)",
    symbol: "☳",
    color: 0x9370db,
    technique: {
      name: "벽력일섬",
      stance: "jin",
      damage: 40,
      range: 55,
      kiCost: 25,
      staminaCost: 18,
      accuracy: 0.75,
      description: {
        korean: "번개처럼 빠른 일격",
        english: "Lightning-fast strike",
      },
      koreanName: "벽력일섬",
      englishName: "Lightning Flash",
    },
  },
  son: {
    korean: "손",
    english: "Wind",
    element: "Wood",
    direction: "Southeast",
    philosophy: "순응과 침투의 힘 (Power of yielding and penetration)",
    symbol: "☴",
    color: 0x98fb98,
    technique: {
      name: "선풍연격",
      stance: "son",
      damage: 15,
      range: 80,
      kiCost: 10,
      staminaCost: 6,
      accuracy: 0.95,
      description: {
        korean: "바람처럼 가벼운 연속 공격",
        english: "Light continuous attacks like wind",
      },
      koreanName: "선풍연격",
      englishName: "Whirlwind Strikes",
    },
  },
  gam: {
    korean: "감",
    english: "Water",
    element: "Water",
    direction: "North",
    philosophy: "위험과 심연의 지혜 (Wisdom of danger and abyss)",
    symbol: "☵",
    color: 0x4169e1,
    technique: {
      name: "수류반격",
      stance: "gam",
      damage: 25,
      range: 45,
      kiCost: 18,
      staminaCost: 12,
      accuracy: 0.88,
      description: {
        korean: "물의 흐름을 따른 반격",
        english: "Counterattack following water's flow",
      },
      koreanName: "수류반격",
      englishName: "Water Counter",
    },
  },
  gan: {
    korean: "간",
    english: "Mountain",
    element: "Earth",
    direction: "Northeast",
    philosophy: "정지와 명상의 안정 (Stability of stillness and meditation)",
    symbol: "☶",
    color: 0x8b4513,
    technique: {
      name: "반석방어",
      stance: "gan",
      damage: 12,
      range: 30,
      kiCost: 8,
      staminaCost: 5,
      accuracy: 0.98,
      description: {
        korean: "산처럼 견고한 방어",
        english: "Solid defense like mountain",
      },
      koreanName: "반석방어",
      englishName: "Mountain Defense",
    },
  },
  gon: {
    korean: "곤",
    english: "Earth",
    element: "Earth",
    direction: "Southwest",
    philosophy: "수용과 양육의 덕 (Virtue of receptivity and nurturing)",
    symbol: "☷",
    color: 0x654321,
    technique: {
      name: "대지포옹",
      stance: "gon",
      damage: 30,
      range: 40,
      kiCost: 22,
      staminaCost: 16,
      accuracy: 0.82,
      description: {
        korean: "대지의 포용력으로 제압",
        english: "Subduing with earth's embrace",
      },
      koreanName: "대지포옹",
      englishName: "Earth Embrace",
    },
  },
};

// Export techniques map for easy access
export const KOREAN_TECHNIQUES: Record<string, KoreanTechnique> = Object.values(
  TRIGRAM_DATA
).reduce((acc, trigram) => {
  acc[trigram.technique.name] = trigram.technique;
  return acc;
}, {} as Record<string, KoreanTechnique>);

// Utility function to create complete PlayerState
export function createPlayerState(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return {
    playerId: "player1",
    position: { x: 400, y: 300 },
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
    facing: "right",
    lastDamageTaken: 0,
    activeEffects: [],
    comboCount: 0,
    ...overrides,
  };
}
