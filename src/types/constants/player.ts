// Player archetype data for Korean martial arts

import type { PlayerArchetypeData } from "../player";
import type { PlayerArchetype } from "../enums";

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
      korean: "전통적인 한국 무술의 정수를 체현하는 명예로운 전사",
      english:
        "Honorable warrior embodying the essence of traditional Korean martial arts",
    },
    bonuses: {
      damageResistance: 1.2,
      jointTechniques: 1.5,
      militaryDiscipline: 1.3,
      traditionalWeapons: 1.4,
      honorCode: 1.2,
    },
    preferredTrigrams: ["geon", "jin"],
    specialTechniques: [
      "천둥벽력", // Heavenly Thunder Strike
      "관절제압", // Joint Control
      "명예의검", // Blade of Honor
    ],
    philosophy: "Honor through strength, disciplined combat",
    combatStyle: "Direct confrontation, overwhelming force",
  },

  amsalja: {
    name: {
      korean: "암살자",
      english: "Shadow Assassin",
    },
    description: {
      korean:
        "그림자처럼 움직이며 한 번의 완벽한 타격으로 적을 제압하는 은밀한 전사",
      english:
        "Stealthy warrior moving like shadows, subduing enemies with one perfect strike",
    },
    bonuses: {
      stealthMultiplier: 1.8,
      oneStrikeKill: 2.0,
      silentMovement: 1.5,
      vitalPointAccuracy: 1.7,
      shadowTechniques: 1.6,
    },
    preferredTrigrams: ["son", "gam"],
    specialTechniques: [
      "무성제압", // Silent Takedown
      "신경파괴", // Neural Disruption
      "그림자보법", // Shadow Step
    ],
    philosophy: "Efficiency through invisibility, one perfect strike",
    combatStyle: "Stealth approaches, instant takedowns",
  },

  hacker: {
    name: {
      korean: "해커",
      english: "Cyber Warrior",
    },
    description: {
      korean: "정보를 무기로 삼아 기술과 무술을 융합한 미래형 전사",
      english:
        "Futuristic warrior using information as a weapon, fusing technology with martial arts",
    },
    bonuses: {
      precisionAnalysis: 1.6,
      environmentalControl: 1.4,
      dataOptimization: 1.3,
      techEnhancement: 1.5,
      systemHacking: 1.7,
    },
    preferredTrigrams: ["li", "tae"],
    specialTechniques: [
      "해부학적분석", // Anatomical Analysis
      "생체역학파괴", // Biomechanical Disruption
      "데이터스트라이크", // Data Strike
    ],
    philosophy: "Information as power, technological advantage",
    combatStyle: "Environmental manipulation, tech-assisted strikes",
  },

  jeongbo: {
    name: {
      korean: "정보요원",
      english: "Intelligence Operative",
    },
    description: {
      korean: "관찰과 분석을 통해 적의 약점을 간파하는 전략적 전문가",
      english:
        "Strategic expert who discerns enemy weaknesses through observation and analysis",
    },
    bonuses: {
      psychologicalWarfare: 1.5,
      strategicAnalysis: 1.4,
      painCompliance: 1.7,
      interrogationSkills: 1.6,
      mentalDomination: 1.3,
    },
    preferredTrigrams: ["gan", "gon"],
    specialTechniques: [
      "고통순응", // Pain Compliance
      "심리적압박", // Psychological Pressure
      "정보추출", // Information Extraction
    ],
    philosophy: "Knowledge through observation, strategic thinking",
    combatStyle: "Psychological manipulation, precise timing",
  },

  jojik: {
    name: {
      korean: "조직폭력배",
      english: "Organized Crime",
    },
    description: {
      korean: "생존을 위해 무자비함을 택한 거리의 실전 격투가",
      english: "Street fighter who chose ruthlessness for survival",
    },
    bonuses: {
      dirtyFighting: 1.8,
      survivalInstinct: 1.6,
      streetSmart: 1.5,
      environmentalWeapons: 1.7,
      painTolerance: 1.4,
    },
    preferredTrigrams: ["jin", "gam"],
    specialTechniques: [
      "환경활용", // Environmental Usage
      "더러운기법", // Dirty Techniques
      "생존격투", // Survival Combat
    ],
    philosophy: "Survival through ruthlessness, practical violence",
    combatStyle: "Dirty fighting, improvised weapons",
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
  jeongbo: {
    healthMultiplier: 1.0, // Standard health
    kiMultiplier: 1.2, // Good ki for mental techniques
    staminaMultiplier: 1.1, // Good stamina for endurance
    painResistance: 1.4, // Very high pain resistance (trained)
    balanceBonus: 1.2, // Good balance for control
  },
  jojik: {
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
  jeongbo: {
    criticalHealth: 0.35, // Balanced health management
    lowStamina: 0.3, // Good stamina management
    kiDepletion: 0.2, // Moderate ki reliance
    painThreshold: 80, // Very high pain tolerance
  },
  jojik: {
    criticalHealth: 0.25, // Fights even when badly hurt
    lowStamina: 0.35, // High stamina usage
    kiDepletion: 0.1, // Low ki reliance
    painThreshold: 85, // Highest pain tolerance
  },
} as const;
