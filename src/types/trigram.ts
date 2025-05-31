// Types and data related to Trigrams, stances, and transitions

import type { TrigramStance } from "./enums";
import type { KoreanTechnique } from "./combat";
import type { PlayerState } from "./player";

export interface TrigramData {
  symbol: string;
  koreanName: string; // e.g., "건 (Heaven)"
  korean: string; // e.g., "건"
  element: string;
  color: number;
  philosophy?: string;
  direction?: string;
  english: string;
  englishName: string; // e.g., "Heaven"
  order: number;
  damageModifier?: number;
  defenseModifier?: number;
  speedModifier?: number;
  kiRegenRate?: number;
  staminaCostModifier?: number;
  technique: KoreanTechnique; // The signature technique for this stance
}

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
      englishName: "Heavenly Thunder Strike",
      description: {
        korean: "하늘의 기운을 모아 강력한 일격을 가하는 기술",
        english: "Gathering heavenly energy for a powerful devastating strike",
      },
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
      englishName: "Flowing Water Combo",
      description: {
        korean: "물이 흐르듯 자연스럽고 연속적인 공격",
        english: "Natural and continuous attacks flowing like water",
      },
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
      englishName: "Flame Spear Thrust",
      description: {
        korean: "불꽃처럼 빠르고 정확한 급소 공격",
        english: "Swift and precise vital point attack like a flame spear",
      },
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
      englishName: "Lightning Flash Kick",
      description: {
        korean: "번개처럼 빠르고 강력한 일격",
        english: "Swift and powerful strike like a lightning flash",
      },
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
      englishName: "Whirlwind Barrage",
      description: {
        korean: "선풍처럼 빠르고 연속적인 공격",
        english: "Swift and continuous attacks like a whirlwind",
      },
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
      englishName: "Water Current Counter",
      description: {
        korean: "물의 흐름처럼 자연스럽게 반격하는 기술",
        english: "Natural counter-attack flowing like water current",
      },
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
      englishName: "Solid Rock Defense",
      description: {
        korean: "반석처럼 견고한 방어 후 반격",
        english: "Solid defense like bedrock followed by counter-attack",
      },
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
      englishName: "Earth's Embrace",
      description: {
        korean: "대지가 품듯 강력하게 감싸는 잡기 기술",
        english: "Powerful grappling technique that embraces like the earth",
      },
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

export interface TransitionMetrics {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
  readonly cost?: number;
  readonly time?: number;
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

export interface StanceState {
  readonly current: TrigramStance;
  readonly previous: TrigramStance | null;
  readonly timeInStance: number;
  readonly transitionCooldown: number;
  readonly lastTransitionTime: number;
  readonly stability?: number;
  readonly mastery?: number;
}

export interface StanceTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly startTime: number;
  readonly duration: number;
  readonly progress: number;
  readonly playerId: string;
  readonly isActive?: boolean;
}

export interface StanceRecommendation {
  readonly recommendedStance: TrigramStance;
  readonly reason: string;
  readonly confidence: number;
  readonly alternatives?: TrigramStance[];
}

export interface TransitionResult {
  readonly success: boolean;
  readonly message: string;
  readonly transitionData: {
    readonly success: boolean;
    readonly reason?: string;
    readonly cost?: number;
  };
  readonly updatedPlayer: PlayerState;
}

export interface StanceAnalysis {
  readonly advantage: number;
  readonly effectiveness: number;
  readonly recommendation: string;
  readonly counterStances?: TrigramStance[];
}
