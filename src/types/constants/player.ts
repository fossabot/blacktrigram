// Player archetype data for Korean martial arts

import type { PlayerArchetype } from "../enums";

// Remove conflicting import and define interface locally
export interface PlayerArchetypeData {
  readonly name: { korean: string; english: string };
  readonly description: { korean: string; english: string };
  readonly preferredTrigrams: readonly string[];
  readonly specialization: string; // Add missing property
  readonly bonuses: {
    readonly damageBonus: number;
    readonly accuracyBonus: number;
    readonly speedBonus: number;
    readonly defenseBonus: number;
    readonly damageResistance?: number;
    readonly precisionBonus?: number;
  };
}

// Player archetype data with Korean martial arts specializations
export const PLAYER_ARCHETYPE_DATA: Record<
  PlayerArchetype,
  PlayerArchetypeData
> = {
  musa: {
    name: {
      korean: "무사",
      english: "Traditional Warrior",
    },
    description: {
      korean: "전통적인 무술가로 명예와 힘을 추구한다",
      english: "Traditional martial artist pursuing honor and strength",
    },
    preferredTrigrams: ["geon", "jin"],
    specialization: "Direct combat and overwhelming force",
    bonuses: {
      damageBonus: 1.2,
      accuracyBonus: 1.0,
      speedBonus: 0.9,
      defenseBonus: 1.3,
      damageResistance: 1.2,
    },
  },

  amsalja: {
    name: {
      korean: "암살자",
      english: "Shadow Assassin",
    },
    description: {
      korean: "은밀한 암살을 통해 효율성을 추구한다",
      english: "Pursues efficiency through stealth assassination",
    },
    preferredTrigrams: ["son", "gam"],
    specialization: "Stealth approaches and instant takedowns",
    bonuses: {
      damageBonus: 1.8,
      accuracyBonus: 1.4,
      speedBonus: 1.5,
      defenseBonus: 0.8,
      precisionBonus: 1.1,
    },
  },

  hacker: {
    name: {
      korean: "해커",
      english: "Cyber Warrior",
    },
    description: {
      korean: "정보기술을 활용한 전투 전문가",
      english: "Combat specialist utilizing information technology",
    },
    preferredTrigrams: ["li", "tae"],
    specialization: "Tech-assisted strikes and environmental control",
    bonuses: {
      damageBonus: 1.1,
      accuracyBonus: 1.6,
      speedBonus: 1.2,
      defenseBonus: 1.0,
    },
  },

  jeongbo_yowon: {
    name: {
      korean: "정보요원",
      english: "Intelligence Operative",
    },
    description: {
      korean: "관찰과 분석을 통해 지식을 얻는 요원",
      english: "Agent gaining knowledge through observation and analysis",
    },
    preferredTrigrams: ["gan", "gon"],
    specialization: "Psychological manipulation and strategic thinking",
    bonuses: {
      damageBonus: 1.0,
      accuracyBonus: 1.3,
      speedBonus: 1.1,
      defenseBonus: 1.4,
    },
  },

  jojik_pokryeokbae: {
    name: {
      korean: "조직폭력배",
      english: "Organized Crime",
    },
    description: {
      korean: "생존을 위한 냉혹한 범죄 조직원",
      english: "Ruthless criminal organization member focused on survival",
    },
    preferredTrigrams: ["jin", "gam"],
    specialization: "Dirty fighting and improvised weapons",
    bonuses: {
      damageBonus: 1.6,
      accuracyBonus: 0.9,
      speedBonus: 1.3,
      defenseBonus: 1.1,
    },
  },
} as const;

// Player stats configuration
export const PLAYER_BASE_STATS = {
  HEALTH: 100,
  MAX_HEALTH: 100,
  KI: 100,
  MAX_KI: 100,
  STAMINA: 100,
  MAX_STAMINA: 100,
  CONSCIOUSNESS: 100,
  PAIN: 0,
  BALANCE: 100,
  BLOOD_LOSS: 0,
} as const;

// Archetype-specific stat modifiers
export const ARCHETYPE_STAT_MODIFIERS: Record<
  PlayerArchetype,
  {
    healthMultiplier: number;
    kiMultiplier: number;
    staminaMultiplier: number;
    painResistance: number;
    balanceBonus: number;
  }
> = {
  musa: {
    healthMultiplier: 1.2, // Higher health for traditional warrior
    kiMultiplier: 1.1, // Moderate ki bonus
    staminaMultiplier: 1.0, // Standard stamina
    painResistance: 1.3, // High pain resistance
    balanceBonus: 1.1, // Good balance
  },
  amsalja: {
    healthMultiplier: 0.9, // Lower health (glass cannon)
    kiMultiplier: 1.3, // High ki for stealth techniques
    staminaMultiplier: 1.2, // High stamina for mobility
    painResistance: 1.0, // Standard pain resistance
    balanceBonus: 1.4, // Excellent balance for stealth
  },
  hacker: {
    healthMultiplier: 0.8, // Lowest health (tech reliant)
    kiMultiplier: 1.4, // Highest ki for tech enhancement
    staminaMultiplier: 0.9, // Lower stamina (less physical)
    painResistance: 0.8, // Lower pain resistance
    balanceBonus: 1.0, // Standard balance
  },
  jeongbo_yowon: {
    healthMultiplier: 1.0, // Standard health
    kiMultiplier: 1.2, // Good ki for mental techniques
    staminaMultiplier: 1.1, // Good stamina for endurance
    painResistance: 1.4, // Very high pain resistance (trained)
    balanceBonus: 1.2, // Good balance for control
  },
  jojik_pokryeokbae: {
    healthMultiplier: 1.1, // Good health from street fighting
    kiMultiplier: 0.9, // Lower ki (less spiritual)
    staminaMultiplier: 1.3, // Highest stamina for survival
    painResistance: 1.5, // Highest pain resistance (street tough)
    balanceBonus: 0.9, // Lower balance (brawler style)
  },
} as const;

// Korean martial arts ranking system
export const MARTIAL_ARTS_RANKS = {
  STUDENT: { korean: "제자", english: "Student", level: 1 },
  PRACTITIONER: { korean: "수련자", english: "Practitioner", level: 2 },
  INSTRUCTOR: { korean: "사범", english: "Instructor", level: 3 },
  MASTER: { korean: "사부", english: "Master", level: 4 },
  GRANDMASTER: { korean: "종사", english: "Grandmaster", level: 5 },
} as const;

// Combat readiness thresholds by archetype
export const ARCHETYPE_COMBAT_THRESHOLDS: Record<
  PlayerArchetype,
  {
    criticalHealth: number;
    lowStamina: number;
    kiDepletion: number;
    painThreshold: number;
  }
> = {
  musa: {
    criticalHealth: 0.3, // Fights until 30% health
    lowStamina: 0.2, // Alert at 20% stamina
    kiDepletion: 0.15, // Ki warning at 15%
    painThreshold: 70, // High pain tolerance
  },
  amsalja: {
    criticalHealth: 0.4, // More cautious with health
    lowStamina: 0.25, // Needs stamina for mobility
    kiDepletion: 0.2, // Relies on ki for stealth
    painThreshold: 50, // Standard pain tolerance
  },
  hacker: {
    criticalHealth: 0.5, // Very cautious with health
    lowStamina: 0.15, // Less reliant on stamina
    kiDepletion: 0.25, // Heavily reliant on ki
    painThreshold: 40, // Low pain tolerance
  },
  jeongbo_yowon: {
    criticalHealth: 0.35, // Balanced health management
    lowStamina: 0.3, // Good stamina management
    kiDepletion: 0.2, // Moderate ki reliance
    painThreshold: 80, // Very high pain tolerance
  },
  jojik_pokryeokbae: {
    criticalHealth: 0.25, // Fights even when badly hurt
    lowStamina: 0.35, // High stamina usage
    kiDepletion: 0.1, // Low ki reliance
    painThreshold: 85, // Highest pain tolerance
  },
} as const;

// Archetype export and naming
export const PLAYER_ARCHETYPES = [
  "musa",
  "amsalja",
  "hacker",
  "jeongbo_yowon",
  "jojik_pokryeokbae",
] as const;

export const ARCHETYPE_NAMES = {
  musa: { korean: "무사", english: "Traditional Warrior" },
  amsalja: { korean: "암살자", english: "Shadow Assassin" },
  hacker: { korean: "해커", english: "Cyber Warrior" },
  jeongbo_yowon: { korean: "정보요원", english: "Intelligence Operative" },
  jojik_pokryeokbae: { korean: "조직폭력배", english: "Organized Crime" },
} as const;
