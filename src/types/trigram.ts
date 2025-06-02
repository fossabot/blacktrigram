// Eight Trigram (팔괘) combat system types for Korean martial arts

import type {
  ColorValue,
  // Position, // Marked as unused
  // Timestamp, // Marked as unused
} from "./common";
import type { KoreanText } from "./korean-text";
import type {
  DamageType,
  PlayerArchetype,
  TrigramStance,
  // CombatState, // Not directly used here, but PlayerState needs it
} from "./enums";
// import { KOREAN_COLORS } from "./constants"; // KOREAN_COLORS not used directly in type defs
import type { StatusEffect } from "./effects";
import type { PlayerState } from "./player";
import type {
  KoreanTechnique as CombatKoreanTechnique,
  KoreanTechnique,
} from "./combat"; // Import the standardized technique

// Core trigram data structure (I Ching 주역 팔괘)
export interface TrigramData {
  readonly stance: TrigramStance;
  readonly symbol: string;
  readonly name: KoreanText; // Provides .korean and .english
  readonly element: string;
  readonly philosophy: string;
  readonly description?: KoreanText;
  readonly technique?: CombatKoreanTechnique; // Use the standardized KoreanTechnique
  readonly color?: ColorValue;
  readonly strength?: readonly TrigramStance[];
  readonly weakness?: readonly TrigramStance[];
  readonly combatFocus?: KoreanText;
  readonly visualEffect?: TrigramVisualEffect;
  readonly combatStyle: string; // Added
  readonly kiRegenRate: number; // Added
  readonly preferredTechniques: readonly string[]; // Added
  readonly order?: number;
  readonly staminaRegenRatePerSecond?: number;
  readonly stanceChangeCooldownMs?: number;
}

// Korean martial arts technique definition
// This is a more detailed definition than the one in combat.ts, consider consolidating
// For now, keeping it as it might be specific to Trigram system's view of techniques
// Using CombatKoreanTechnique from combat.ts as the standard.

// Trigram visual effects for combat
export interface TrigramVisualEffect {
  readonly auraColor: ColorValue;
  readonly particleCount: number;
  readonly glowIntensity: number;
  readonly animationSpeed: number;
  readonly effectRadius: number;
  readonly energyPattern: "spiral" | "pulse" | "flow" | "burst" | "steady";
}

// Eight Trigram effectiveness matrix (상극상생)
export interface TrigramEffectivenessMatrix {
  readonly geon: Record<TrigramStance, number>;
  readonly tae: Record<TrigramStance, number>;
  readonly li: Record<TrigramStance, number>;
  readonly jin: Record<TrigramStance, number>;
  readonly son: Record<TrigramStance, number>;
  readonly gam: Record<TrigramStance, number>;
  readonly gan: Record<TrigramStance, number>;
  readonly gon: Record<TrigramStance, number>;
}

// Trigram stance state for players
export interface TrigramStanceState {
  readonly current: TrigramStance;
  readonly previous?: TrigramStance;
  readonly transitionTime: number; // Time when stance changed
  readonly mastery: number; // 0-100 mastery level in this stance
  readonly experience: number; // Experience points in this stance
  readonly techniques: readonly KoreanTechnique[]; // Available techniques
  readonly canChange: boolean; // Whether stance change is allowed
  readonly cooldownRemaining: number; // Cooldown before next change
}

// Trigram philosophy and cultural context
export interface TrigramPhilosophy {
  readonly stance: TrigramStance;
  readonly iChing: KoreanText; // I Ching interpretation
  readonly martialApplication: KoreanText; // Martial arts application
  readonly koreanWisdom: KoreanText; // Traditional Korean wisdom
  readonly modernInterpretation: KoreanText; // Contemporary understanding
  readonly meditation: KoreanText; // Meditation guidance
  readonly breathing: KoreanText; // Breathing technique
  readonly mentalState: KoreanText; // Required mental state
}

// Archetype bonuses for different trigram stances
export interface ArchetypeTrigramBonus {
  readonly archetype: PlayerArchetype;
  readonly bonuses: {
    readonly [stance in TrigramStance]: {
      readonly damageMultiplier: number;
      readonly accuracyBonus: number;
      readonly speedBonus: number;
      readonly kiEfficiency: number;
      readonly specialAbility?: string;
    };
  };
}

// Trigram combination techniques (연계기법)
export interface TrigramCombination {
  readonly id: string;
  readonly name: KoreanText;
  readonly stances: readonly [TrigramStance, TrigramStance]; // Two-stance combo
  readonly technique: KoreanTechnique;
  readonly requirements: {
    readonly masteryLevel: number; // Required mastery in both stances
    readonly kiCost: number;
    readonly timing: number; // Timing window in milliseconds
  };
  readonly effect: {
    readonly damageBonus: number;
    readonly accuracyBonus: number;
    readonly specialEffect?: string;
  };
}

// Trigram training progression
export interface TrigramProgression {
  readonly stance: TrigramStance;
  readonly level: number; // 1-10 progression levels
  readonly experience: number;
  readonly experienceToNext: number;
  readonly unlockedTechniques: readonly string[];
  readonly masteryRating:
    | "novice"
    | "apprentice"
    | "journeyman"
    | "expert"
    | "master";
  readonly achievements: readonly string[];
}

// Trigram stance transition rules
export interface TrigramTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly difficulty: number; // Transition difficulty (1-5)
  readonly time: number; // Transition time in milliseconds
  readonly kiCost: number; // Ki cost for transition
  readonly philosophy: KoreanText; // Philosophical meaning of transition
  readonly animation: string; // Animation identifier
  // readonly startTime?: number; // This would be for an *active* transition state, not a definition
}

export interface TrigramTransitionCost {
  ki: number;
  stamina: number;
  timeMilliseconds: number;
}

export interface TrigramTransitionRule {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly conditions?: readonly string[]; // e.g., player health > 50%
  readonly advantage?: number; // e.g., situational effectiveness modifier
}

export interface TransitionMetrics {
  cost: TrigramTransitionCost;
  effectiveness: number; // Overall effectiveness of making this transition now
  risk: number; // Risk associated (e.g., vulnerability during transition)
  timeDelay?: number; // Additional delay due to conditions
}

export interface TransitionPath {
  path: readonly TrigramStance[]; // Sequence of stances
  totalCost: TrigramTransitionCost;
  overallEffectiveness: number;
  cumulativeRisk: number;
  name?: string;
  description?: KoreanText;
  // stances: readonly TrigramStance[]; // Duplicate of path, remove one
}

export interface KiFlowFactors {
  currentStance: TrigramStance;
  targetStance: TrigramStance;
  playerHealthPercent: number; // 0-1
  playerStaminaPercent: number; // 0-1
  playerKiPercent: number; // 0-1
  activeEffects: readonly StatusEffect[]; // Full StatusEffect objects
  distanceToOpponent?: number;
  stanceAffinity?: number; // Player's affinity/mastery with current/target stances
  playerLevelModifier?: number; // Modifier based on player's overall level/skill
  kiRecoveryBase?: number; // Base Ki recovery rate of the player
  kiConsumptionModifier?: number; // General modifier for Ki consumption
  timeInStanceModifier?: number; // Modifier based on how long player has been in current stance
}

export interface StanceTransition {
  // Represents the result of an attempted transition
  success: boolean;
  from: TrigramStance;
  to: TrigramStance;
  cost: TrigramTransitionCost; // The actual cost paid
  newState: PlayerState; // The player state after the transition attempt
  reason?: string; // Reason for failure (e.g., "insufficient_ki", "cooldown")
  timestamp: number; // Timestamp of when the transition occurred or was attempted
}

// Trigram combat analytics
export interface TrigramCombatStats {
  readonly stance: TrigramStance;
  readonly usage: {
    readonly timesUsed: number;
    readonly totalDamageDealt: number;
    readonly totalDamageTaken: number;
    readonly accuracy: number; // Hit percentage
    readonly efficiency: number; // Damage per Ki spent
  };
  readonly techniques: {
    readonly [techniqueId: string]: {
      readonly uses: number;
      readonly hits: number;
      readonly misses: number;
      readonly criticals: number;
      readonly averageDamage: number;
    };
  };
  readonly matchups: {
    readonly [opponent in TrigramStance]: {
      readonly wins: number;
      readonly losses: number;
      readonly effectiveness: number;
    };
  };
}

// Trigram UI display configuration
export interface TrigramUIConfig {
  readonly showSymbols: boolean; // Show Unicode trigram symbols
  readonly showNames: boolean; // Show Korean/English names
  readonly showPhilosophy: boolean; // Show philosophical description
  readonly showEffectiveness: boolean; // Show stance matchups
  readonly language: "korean" | "english" | "bilingual";
  readonly colorCoding: boolean; // Use color coding for stances
  readonly animations: boolean; // Enable stance transition animations
}

// Complete Eight Trigram system data
export interface EightTrigramSystem {
  readonly trigrams: {
    readonly [stance in TrigramStance]: TrigramData;
  };
  readonly effectiveness: TrigramEffectivenessMatrix;
  readonly transitions: readonly TrigramTransition[];
  readonly combinations: readonly TrigramCombination[];
  readonly archetypeBonuses: readonly ArchetypeTrigramBonus[];
  readonly philosophy: {
    readonly [stance in TrigramStance]: TrigramPhilosophy;
  };
}

// Trigram selection and management
export interface TrigramSelector {
  readonly availableStances: readonly TrigramStance[];
  readonly recommendedStance?: TrigramStance;
  readonly currentEffectiveness: number; // Against current opponent
  readonly transitionOptions: readonly {
    readonly stance: TrigramStance;
    readonly effectiveness: number;
    readonly difficulty: number;
    readonly kiCost: number;
  }[];
}

// Trigram mastery certificate (traditional Korean martial arts concept)
export interface TrigramMasteryCertificate {
  readonly stance: TrigramStance;
  readonly studentName: string;
  readonly masterName: string;
  readonly dojangName: string;
  readonly dateAchieved: Date;
  readonly level: "초급" | "중급" | "고급" | "전문가" | "대가"; // Korean mastery levels
  readonly techniques: readonly string[]; // Certified techniques
  readonly philosophy: string; // Understanding of trigram philosophy
  readonly signature: string; // Master's digital signature
}

// Complete trigram data with actual values
// This constant should conform to TrigramData.
// The errors were about 'combatStyle' etc. not being in TrigramData interface.
// Adding them to the interface (as done above) fixes this.
// Also, ensure each entry in this constant provides all *required* fields of TrigramData,
// especially 'stance'.
export const TRIGRAM_DATA: Readonly<Record<TrigramStance, TrigramData>> = {
  geon: {
    stance: "geon",
    name: { korean: "건", english: "Geon (Heaven)" },
    symbol: "☰",
    element: "Metal",
    philosophy: "Creative force, leadership, strength.",
    combatStyle: "Direct, powerful, bone-striking attacks.",
    kiRegenRate: 1.5,
    preferredTechniques: ["cheon_geom", "haeng_gong"], // Example technique names
    // color: KOREAN_COLORS.geon, // KOREAN_COLORS not imported here
    description: {
      korean: "하늘을 상징하며, 창조적이고 강력한 힘을 나타냅니다.",
      english: "Symbolizes Heaven, representing creative and powerful force.",
    },
    order: 0,
    staminaRegenRatePerSecond: 2,
    stanceChangeCooldownMs: 500,
    technique: {
      id: "geon_heavenly_thunder",
      name: "Geon Heavenly Thunder", // Internal name
      koreanName: "천둥벽력",
      englishName: "Heavenly Thunder Strike",
      romanized: "Cheondung Byeokryeok",
      description: {
        korean: "하늘의 힘을 담은 강력한 일격.",
        english: "A powerful strike imbued with heavenly force.",
      },
      stance: "geon",
      type: "strike",
      damageType: "blunt" as DamageType,
      damageRange: { min: 25, max: 35, type: "blunt" },
      range: 1.5, // Added range
      kiCost: 20,
      staminaCost: 15,
      accuracy: 0.85,
      executionTime: 500,
      recoveryTime: 700,
    },
  },
  tae: {
    stance: "tae",
    name: { korean: "태", english: "Tae (Lake)" },
    symbol: "☱",
    element: "Water", // Or Metal if following a specific I Ching school
    philosophy: "Joyfulness, serenity, fluidity.",
    combatStyle: "Fluid joint manipulation, evasive movements.",
    kiRegenRate: 2.0,
    preferredTechniques: ["yuyeon_gong", "su_sin_bo"],
    // color: KOREAN_COLORS.tae,
    description: {
      korean: "호수를 상징하며, 기쁨과 평온함을 나타냅니다.",
      english: "Symbolizes Lake, representing joyfulness and serenity.",
    },
    order: 1,
    staminaRegenRatePerSecond: 1.5,
    stanceChangeCooldownMs: 400,
    technique: {
      id: "tae_flowing_strikes",
      name: "Tae Flowing Strikes",
      koreanName: "유수연타",
      englishName: "Flowing Water Strikes",
      romanized: "Yusu Yeonta",
      description: {
        korean: "물처럼 부드럽고 연속적인 공격.",
        english: "Smooth and continuous attacks like flowing water.",
      },
      stance: "tae",
      type: "strike",
      damageType: "blunt",
      damageRange: { min: 18, max: 28, type: "blunt" },
      range: 1.2, // Added range
      kiCost: 18,
      staminaCost: 12,
      accuracy: 0.9,
      executionTime: 400,
      recoveryTime: 600,
    },
  },
  li: {
    stance: "li",
    name: { korean: "리", english: "Li (Fire)" },
    symbol: "☲",
    element: "Fire",
    philosophy: "Clarity, passion, adherence.",
    combatStyle: "Precise nerve strikes, rapid attacks.",
    kiRegenRate: 1.8,
    preferredTechniques: ["hwajo_gong", "yeolhwa_jin"],
    // color: KOREAN_COLORS.li,
    description: {
      korean: "불을 상징하며, 밝음과 열정을 나타냅니다.",
      english: "Symbolizes Fire, representing clarity and passion.",
    },
    order: 2,
    staminaRegenRatePerSecond: 1.8,
    stanceChangeCooldownMs: 600,
    technique: {
      id: "li_flame_lance",
      name: "Li Flame Lance",
      koreanName: "화염지창",
      englishName: "Flame Lance Thrust",
      romanized: "Hwayeom Jichang",
      description: {
        korean: "불꽃처럼 빠르고 정확한 찌르기.",
        english: "A swift and precise thrust like a darting flame.",
      },
      stance: "li",
      type: "strike",
      damageType: "piercing",
      damageRange: { min: 22, max: 30, type: "piercing" },
      range: 1.8, // Added range
      kiCost: 22,
      staminaCost: 18,
      accuracy: 0.92,
      executionTime: 350,
      recoveryTime: 550,
    },
  },
  jin: {
    stance: "jin",
    name: { korean: "진", english: "Jin (Thunder)" },
    symbol: "☳",
    element: "Wood",
    philosophy: "Movement, initiative, shock.",
    combatStyle: "Stunning techniques, explosive power.",
    kiRegenRate: 1.2,
    preferredTechniques: ["noegeok_gong", "pung뢰_kwon"],
    // color: KOREAN_COLORS.jin,
    description: {
      korean: "천둥을 상징하며, 움직임과 분발을 나타냅니다.",
      english: "Symbolizes Thunder, representing movement and initiative.",
    },
    order: 3,
    staminaRegenRatePerSecond: 2.5,
    stanceChangeCooldownMs: 700,
    technique: {
      id: "jin_thunderclap_strike",
      name: "Jin Thunderclap Strike",
      koreanName: "벽력일섬",
      englishName: "Thunderclap Flash",
      romanized: "Byeokryeok Ilseom",
      description: {
        korean: "천둥처럼 강력하고 충격적인 공격.",
        english: "A powerful and shocking attack like thunder.",
      },
      stance: "jin",
      type: "strike",
      damageType: "impact",
      damageRange: { min: 28, max: 40, type: "impact" },
      range: 1.6, // Added range
      kiCost: 25,
      staminaCost: 20,
      accuracy: 0.8,
      executionTime: 600,
      recoveryTime: 800,
    },
  },
  son: {
    stance: "son",
    name: { korean: "손", english: "Son (Wind)" },
    symbol: "☴",
    element: "Wood",
    philosophy: "Gentleness, penetration, subtlety.",
    combatStyle: "Continuous pressure, swift movements.",
    kiRegenRate: 2.2,
    preferredTechniques: ["pung_un_gong", "sin_pung_gak"],
    // color: KOREAN_COLORS.son,
    description: {
      korean: "바람을 상징하며, 부드러움과 순종을 나타냅니다.",
      english: "Symbolizes Wind, representing gentleness and penetration.",
    },
    order: 4,
    staminaRegenRatePerSecond: 1.2,
    stanceChangeCooldownMs: 300,
    technique: {
      id: "son_gale_barrage",
      name: "Son Gale Barrage",
      koreanName: "선풍연격",
      englishName: "Gale Barrage",
      romanized: "Seonpung Yeongyeok",
      description: {
        korean: "바람처럼 빠르고 지속적인 연타 공격.",
        english: "Swift and continuous barrage of attacks like the wind.",
      },
      stance: "son",
      type: "strike",
      damageType: "sharp",
      damageRange: { min: 15, max: 25, type: "sharp" },
      range: 1.4, // Added range
      kiCost: 15,
      staminaCost: 10,
      accuracy: 0.88,
      executionTime: 300,
      recoveryTime: 400,
    },
  },
  gam: {
    stance: "gam",
    name: { korean: "감", english: "Gam (Water)" },
    symbol: "☵",
    element: "Water",
    philosophy: "Danger, abyss, adaptability.",
    combatStyle: "Blood flow restriction, trapping techniques.",
    kiRegenRate: 1.0,
    preferredTechniques: ["sugeo_gong", "heuksu_jang"],
    // color: KOREAN_COLORS.gam,
    description: {
      korean: "물을 상징하며, 위험과 심오함을 나타냅니다.",
      english: "Symbolizes Water, representing danger and the abyss.",
    },
    order: 5,
    staminaRegenRatePerSecond: 1.0,
    stanceChangeCooldownMs: 800,
    technique: {
      id: "gam_riptide_counter",
      name: "Gam Riptide Counter",
      koreanName: "수류반격",
      englishName: "Riptide Counter",
      romanized: "Suryu Bangyeok",
      description: {
        korean: "물의 흐름을 이용한 유연한 반격기.",
        english: "A flexible counter-attack using the flow of water.",
      },
      stance: "gam",
      type: "counter_attack",
      damageType: "pressure",
      damageRange: { min: 18, max: 25, type: "pressure" },
      range: 1.0, // Added range (counters are typically close range)
      kiCost: 18,
      staminaCost: 12,
      accuracy: 0.95,
      executionTime: 450,
      recoveryTime: 650,
    },
  },
  gan: {
    stance: "gan",
    name: { korean: "간", english: "Gan (Mountain)" },
    symbol: "☶",
    element: "Earth",
    philosophy: "Stillness, solidity, stopping.",
    combatStyle: "Defensive counters, immovable stance.",
    kiRegenRate: 0.8,
    preferredTechniques: ["cheolbi_gong", "tae산_kwon"],
    // color: KOREAN_COLORS.gan,
    description: {
      korean: "산을 상징하며, 정지와 견고함을 나타냅니다.",
      english: "Symbolizes Mountain, representing stillness and solidity.",
    },
    order: 6,
    staminaRegenRatePerSecond: 3.0,
    stanceChangeCooldownMs: 1000,
    technique: {
      id: "gan_immovable_bulwark",
      name: "Gan Immovable Bulwark",
      koreanName: "반석방어",
      englishName: "Immovable Bulwark",
      romanized: "Banseok Bangeo",
      description: {
        korean: "산처럼 굳건한 방어 자세.",
        english: "A defensive posture as solid as a mountain.",
      },
      stance: "gan",
      type: "block",
      damageType: "internal", // Blocks typically don't "deal" damage type in the same way
      damageRange: { min: 3, max: 8, type: "internal" }, // Reflects minor impact/recoil
      range: 0.5, // Added range (blocks are very close range)
      kiCost: 10,
      staminaCost: 20,
      accuracy: 1.0,
      executionTime: 200,
      recoveryTime: 300,
    },
  },
  gon: {
    stance: "gon",
    name: { korean: "곤", english: "Gon (Earth)" },
    symbol: "☷",
    element: "Earth",
    philosophy: "Receptivity, nurturing, devotion.",
    combatStyle: "Ground techniques, absorbing attacks.",
    kiRegenRate: 2.5,
    preferredTechniques: ["jijin_gong", "daeji_jang"],
    // color: KOREAN_COLORS.gon,
    description: {
      korean: "땅을 상징하며, 수용적이고 양육하는 힘을 나타냅니다.",
      english:
        "Symbolizes Earth, representing receptive and nurturing strength.",
    },
    order: 7,
    staminaRegenRatePerSecond: 0.8,
    stanceChangeCooldownMs: 450,
    technique: {
      id: "gon_earthshatter_throw",
      name: "Gon Earthshatter Throw",
      koreanName: "대지포옹",
      englishName: "Earth-Embracing Throw",
      romanized: "Daeji Poong", // Corrected from Poong to Pung or similar if intended
      description: {
        korean: "대지의 힘을 이용한 강력한 던지기 기술.",
        english: "A powerful throw utilizing the strength of the earth.",
      },
      stance: "gon",
      type: "throw",
      damageType: "impact",
      damageRange: { min: 22, max: 32, type: "impact" },
      range: 0.8, // Added range (throws are close range)
      kiCost: 22,
      staminaCost: 18,
      accuracy: 0.8,
      executionTime: 700,
      recoveryTime: 900,
    },
  },
};

// Stance effectiveness matrix
export const STANCE_EFFECTIVENESS_MATRIX: TrigramEffectivenessMatrix = {
  geon: {
    geon: 1.0,
    tae: 1.2,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.3,
    gan: 0.7,
    gon: 1.4,
  },
  tae: {
    geon: 0.8,
    tae: 1.0,
    li: 1.2,
    jin: 0.9,
    son: 1.3,
    gam: 0.7,
    gan: 1.1,
    gon: 0.9,
  },
  li: {
    geon: 1.2,
    tae: 0.8,
    li: 1.0,
    jin: 1.3,
    son: 0.7,
    gam: 1.1,
    gan: 0.9,
    gon: 1.2,
  },
  jin: {
    geon: 0.9,
    tae: 1.1,
    li: 0.7,
    jin: 1.0,
    son: 1.2,
    gam: 0.8,
    gan: 1.3,
    gon: 0.9,
  },
  son: {
    geon: 1.1,
    tae: 0.7,
    li: 1.3,
    jin: 0.8,
    son: 1.0,
    gam: 1.2,
    gan: 0.9,
    gon: 1.1,
  },
  gam: {
    geon: 0.7,
    tae: 1.3,
    li: 0.9,
    jin: 1.2,
    son: 0.8,
    gam: 1.0,
    gan: 1.1,
    gon: 0.7,
  },
  gan: {
    geon: 1.3,
    tae: 0.9,
    li: 1.1,
    jin: 0.7,
    son: 1.1,
    gam: 0.9,
    gan: 1.0,
    gon: 1.2,
  },
  gon: {
    geon: 0.6,
    tae: 1.1,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.3,
    gan: 0.8,
    gon: 1.0,
  },
} as const;

export const TRIGRAM_EFFECTIVENESS: TrigramEffectivenessMatrix = {
  geon: {
    geon: 1.0,
    tae: 1.2,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.3,
    gan: 0.7,
    gon: 1.4,
  },
  tae: {
    geon: 0.8,
    tae: 1.0,
    li: 1.2,
    jin: 0.9,
    son: 1.3,
    gam: 0.7,
    gan: 1.1,
    gon: 0.9,
  },
  li: {
    geon: 1.2,
    tae: 0.8,
    li: 1.0,
    jin: 1.3,
    son: 0.7,
    gam: 1.1,
    gan: 0.9,
    gon: 1.2,
  },
  jin: {
    geon: 0.9,
    tae: 1.1,
    li: 0.7,
    jin: 1.0,
    son: 1.2,
    gam: 0.8,
    gan: 1.3,
    gon: 0.9,
  },
  son: {
    geon: 1.1,
    tae: 0.7,
    li: 1.3,
    jin: 0.8,
    son: 1.0,
    gam: 1.2,
    gan: 0.9,
    gon: 1.1,
  },
  gam: {
    geon: 0.7,
    tae: 1.3,
    li: 0.9,
    jin: 1.2,
    son: 0.8,
    gam: 1.0,
    gan: 1.1,
    gon: 0.7,
  },
  gan: {
    geon: 1.3,
    tae: 0.9,
    li: 1.1,
    jin: 0.7,
    son: 1.1,
    gam: 0.9,
    gan: 1.0,
    gon: 1.2,
  },
  gon: {
    geon: 0.6,
    tae: 1.1,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.3,
    gan: 0.8,
    gon: 1.0,
  },
};
