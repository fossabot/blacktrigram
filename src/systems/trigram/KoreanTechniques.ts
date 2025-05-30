import type {
  TrigramStance,
  KoreanTechnique,
  PlayerState,
  VitalPoint,
  StatusEffect,
} from "../../types";
import { TRIGRAM_DATA } from "../../types";

/**
 * Korean Martial Arts Techniques System
 * Comprehensive implementation of traditional Korean martial arts techniques
 * Based on authentic Korean martial traditions and I-Ching philosophy
 */

// Traditional Korean martial arts technique categories
export type TechniqueCategory =
  | "기본기" // Basic techniques
  | "연타기" // Combination techniques
  | "급소기" // Vital point techniques
  | "방어기" // Defensive techniques
  | "던지기" // Throwing techniques
  | "발차기" // Kicking techniques
  | "손기술" // Hand techniques
  | "특수기"; // Special techniques

// Technique execution context
export interface TechniqueContext {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly distance: number;
  readonly angle: number;
  readonly environment: "indoor" | "outdoor" | "tournament"; // Fix: Changed from "dojang" to "indoor"
  readonly timeOfDay?: number; // For meridian flow calculations
}

// Technique execution result
export interface TechniqueResult {
  readonly success: boolean;
  readonly damage: number;
  readonly criticalHit: boolean;
  readonly vitalPointsHit: readonly VitalPoint[];
  readonly statusEffectsApplied: readonly StatusEffect[];
  readonly description: { korean: string; english: string };
  readonly technique: KoreanTechnique;
  readonly kiCost: number;
  readonly staminaCost: number;
}

// Advanced Korean technique data structure
export interface AdvancedKoreanTechnique extends KoreanTechnique {
  readonly category: TechniqueCategory;
  readonly prerequisiteStances: readonly TrigramStance[];
  readonly comboChain?: readonly string[]; // Next possible techniques
  readonly philosophy: { korean: string; english: string };
  readonly difficulty: number; // 1-10 scale
  readonly teachingMethod: { korean: string; english: string };
  readonly historicalOrigin: string;
  readonly preferredTargets: readonly string[]; // Vital point IDs
  readonly counterTechniques: readonly string[]; // Technique names that counter this
  readonly environmentalFactors: {
    readonly indoor: number; // Effectiveness modifier
    readonly outdoor: number;
    readonly tournament: number;
  };
}

/**
 * Comprehensive Korean Techniques Database
 * Each technique includes traditional Korean names, philosophy, and combat applications
 */
export const KOREAN_TECHNIQUES_DATABASE: Record<
  string,
  AdvancedKoreanTechnique
> = {
  // Heaven Stance (건) Techniques - Creative and powerful
  천둥벽력: {
    ...TRIGRAM_DATA.geon.technique,
    category: "기본기",
    prerequisiteStances: ["geon"],
    comboChain: ["화염지창", "벽력일섬"],
    philosophy: {
      korean: "천둥의 위력으로 적을 제압하는 기법",
      english: "Technique to overwhelm enemies with the power of thunder",
    },
    difficulty: 6,
    teachingMethod: {
      korean: "정적에서 동적으로의 순간적 폭발력 연습",
      english: "Practice explosive power from stillness to motion",
    },
    historicalOrigin: "조선시대 무예도보통지 기록",
    preferredTargets: ["tanzhong", "renying", "qihai"],
    counterTechniques: ["수류반격", "반석방어"],
    environmentalFactors: { indoor: 1.0, outdoor: 1.2, tournament: 0.9 },
  },

  // Lake Stance (태) Techniques - Flowing and adaptive
  유수연타: {
    ...TRIGRAM_DATA.tae.technique,
    category: "연타기",
    prerequisiteStances: ["tae"],
    comboChain: ["선풍연격", "수류반격"],
    philosophy: {
      korean: "물의 흐름처럼 끊임없이 연결되는 타격",
      english: "Continuous strikes flowing like water",
    },
    difficulty: 7,
    teachingMethod: {
      korean: "물의 흐름을 모방한 연속 동작 훈련",
      english: "Training continuous movements imitating water flow",
    },
    historicalOrigin: "한국 전통 무예 택견의 연속 기법",
    preferredTargets: ["hegu", "quchi", "jianyu"],
    counterTechniques: ["대지포옹", "간산정지"],
    environmentalFactors: { indoor: 1.1, outdoor: 0.9, tournament: 1.0 },
  },

  // Fire Stance (리) Techniques - Penetrating and precise
  화염지창: {
    ...TRIGRAM_DATA.li.technique,
    category: "급소기",
    prerequisiteStances: ["li"],
    comboChain: ["벽력일섬", "천둥벽력"],
    philosophy: {
      korean: "불꽃처럼 예리하고 정확한 급소 공격",
      english: "Sharp and precise vital point attack like flame",
    },
    difficulty: 9,
    teachingMethod: {
      korean: "정확한 급소 위치 학습과 침술 원리 적용",
      english:
        "Learning precise vital points and applying acupuncture principles",
    },
    historicalOrigin: "고려시대 의학서 동의보감의 급소 이론",
    preferredTargets: ["baihui", "yintang", "renzhong"],
    counterTechniques: ["간산정지", "지형적응"],
    environmentalFactors: { indoor: 1.2, outdoor: 0.8, tournament: 1.1 },
  },

  // Thunder Stance (진) Techniques - Explosive and shocking
  벽력일섬: {
    ...TRIGRAM_DATA.jin.technique,
    category: "발차기",
    prerequisiteStances: ["jin"],
    comboChain: ["천둥벽력", "선풍연격"],
    philosophy: {
      korean: "벼락처럼 순간적으로 폭발하는 발차기",
      english: "Explosive kick that strikes like lightning",
    },
    difficulty: 8,
    teachingMethod: {
      korean: "하체 근력과 순발력 집중 단련",
      english: "Intensive training of leg strength and explosive power",
    },
    historicalOrigin: "조선무예 본국검법의 발차기 변형",
    preferredTargets: ["zhongwan", "qihai", "guanyuan"],
    counterTechniques: ["대지포옹", "유수연타"],
    environmentalFactors: { indoor: 0.9, outdoor: 1.3, tournament: 1.0 },
  },

  // Wind Stance (손) Techniques - Swift and evasive
  선풍연격: {
    ...TRIGRAM_DATA.son.technique,
    category: "연타기",
    prerequisiteStances: ["son"],
    comboChain: ["유수연타", "바람회피"],
    philosophy: {
      korean: "바람처럼 가볍고 빠른 연속 공격",
      english: "Light and swift continuous attacks like wind",
    },
    difficulty: 5,
    teachingMethod: {
      korean: "호흡과 동작의 조화로운 연결 훈련",
      english: "Training harmonious connection of breathing and movement",
    },
    historicalOrigin: "한국 전통 무예 택견의 바람 기법",
    preferredTargets: ["taiyuan", "shenmen", "yinxi"],
    counterTechniques: ["반석방어", "간산정지"],
    environmentalFactors: { indoor: 0.8, outdoor: 1.4, tournament: 1.0 },
  },

  // Water Stance (감) Techniques - Adaptive and counter-attacking
  수류반격: {
    ...TRIGRAM_DATA.gam.technique,
    category: "방어기",
    prerequisiteStances: ["gam"],
    comboChain: ["대지포옹", "유수연타"],
    philosophy: {
      korean: "물이 바위를 깎듯 상대의 힘을 이용한 반격",
      english: "Counter-attack using opponent's force like water carving rock",
    },
    difficulty: 7,
    teachingMethod: {
      korean: "상대의 공격을 흡수하고 되돌리는 기법 연습",
      english: "Practice absorbing and redirecting opponent's attacks",
    },
    historicalOrigin: "유도와 합기도의 한국적 변형",
    preferredTargets: ["lieque", "yangchi", "wangu"],
    counterTechniques: ["천둥벽력", "화염지창"],
    environmentalFactors: { indoor: 1.1, outdoor: 0.9, tournament: 1.2 },
  },

  // Mountain Stance (간) Techniques - Solid and defensive
  반석방어: {
    ...TRIGRAM_DATA.gan.technique,
    category: "방어기",
    prerequisiteStances: ["gan"],
    comboChain: ["간산정지", "대지포옹"],
    philosophy: {
      korean: "산처럼 견고하고 흔들리지 않는 방어",
      english: "Solid and immovable defense like a mountain",
    },
    difficulty: 4,
    teachingMethod: {
      korean: "중심을 낮추고 안정된 자세 유지 훈련",
      english:
        "Training to lower center of gravity and maintain stable posture",
    },
    historicalOrigin: "한국 전통 씨름의 방어 기법",
    preferredTargets: ["zusanli", "sanyinjiao", "taixi"],
    counterTechniques: ["선풍연격", "벽력일섬"],
    environmentalFactors: { indoor: 1.0, outdoor: 1.1, tournament: 0.9 },
  },

  // Earth Stance (곤) Techniques - Encompassing and grappling
  대지포옹: {
    ...TRIGRAM_DATA.gon.technique,
    category: "던지기",
    prerequisiteStances: ["gon"],
    comboChain: ["수류반격", "간산정지"],
    philosophy: {
      korean: "대지가 모든 것을 품듯 상대를 제압하는 기법",
      english: "Technique to subdue opponent like earth embraces all",
    },
    difficulty: 6,
    teachingMethod: {
      korean: "무게중심 활용과 지렛대 원리 응용 훈련",
      english: "Training using center of gravity and leverage principles",
    },
    historicalOrigin: "한국 전통 씨름과 유도의 결합",
    preferredTargets: ["yongquan", "kunlun", "fuliu"],
    counterTechniques: ["벽력일섬", "선풍연격"],
    environmentalFactors: { indoor: 0.9, outdoor: 1.0, tournament: 1.1 },
  },

  // Advanced combination techniques
  간산정지: {
    name: "간산정지",
    koreanName: "간산정지",
    englishName: "Mountain Stillness",
    description: {
      korean: "산의 고요함으로 모든 공격을 무효화",
      english: "Nullifying all attacks with mountain's stillness",
    },
    kiCost: 25,
    staminaCost: 15,
    range: 20,
    accuracy: 0.95,
    stance: "gan",
    damage: 8,
    type: "elbow",
    category: "특수기",
    prerequisiteStances: ["gan", "gon"],
    philosophy: {
      korean: "정적 속에서 찾는 절대적 방어의 경지",
      english: "Absolute defense found within stillness",
    },
    difficulty: 10,
    teachingMethod: {
      korean: "명상과 무예의 결합으로 마음의 평정 달성",
      english:
        "Achieving mental equilibrium through meditation and martial arts",
    },
    historicalOrigin: "선불교와 무예의 융합",
    preferredTargets: [],
    counterTechniques: [],
    environmentalFactors: { indoor: 1.2, outdoor: 1.0, tournament: 0.8 },
    effects: [
      {
        type: "damage_immunity",
        duration: 3000,
        magnitude: 1.0,
        source: "간산정지",
      },
    ],
  },

  바람회피: {
    name: "바람회피",
    koreanName: "바람회피",
    englishName: "Wind Evasion",
    description: {
      korean: "바람처럼 가볍게 모든 공격을 회피",
      english: "Evading all attacks light as wind",
    },
    kiCost: 20,
    staminaCost: 25,
    range: 30,
    accuracy: 0.9,
    stance: "son",
    damage: 5,
    type: "combination",
    category: "특수기",
    prerequisiteStances: ["son", "tae"],
    philosophy: {
      korean: "바람의 자유로움으로 모든 속박에서 해방",
      english: "Liberation from all constraints with wind's freedom",
    },
    difficulty: 8,
    teachingMethod: {
      korean: "경쾌함과 민첩성을 극대화하는 훈련",
      english: "Training to maximize lightness and agility",
    },
    historicalOrigin: "택견의 품밟기 기법 발전",
    preferredTargets: [],
    counterTechniques: ["화염지창"],
    environmentalFactors: { indoor: 0.7, outdoor: 1.5, tournament: 1.0 },
    effects: [
      {
        type: "evasion_boost",
        duration: 5000,
        magnitude: 2.0,
        source: "바람회피",
      },
    ],
  },

  지형적응: {
    name: "지형적응",
    koreanName: "지형적응",
    englishName: "Terrain Adaptation",
    description: {
      korean: "주변 환경에 완전히 적응하여 전투력 향상",
      english:
        "Enhanced combat ability through complete environmental adaptation",
    },
    kiCost: 30,
    staminaCost: 20,
    range: 0,
    accuracy: 1.0,
    stance: "gon",
    damage: 0,
    type: "grapple",
    category: "특수기",
    prerequisiteStances: ["gon", "gan"],
    philosophy: {
      korean: "땅과 하나가 되어 무한한 힘을 얻는 경지",
      english: "Gaining infinite power by becoming one with the earth",
    },
    difficulty: 9,
    teachingMethod: {
      korean: "자연과의 조화를 통한 에너지 흡수법",
      english: "Energy absorption through harmony with nature",
    },
    historicalOrigin: "풍수지리학과 무예의 결합",
    preferredTargets: [],
    counterTechniques: [],
    environmentalFactors: { indoor: 0.6, outdoor: 1.8, tournament: 0.5 },
    effects: [
      {
        type: "damage_boost",
        duration: 10000,
        magnitude: 1.5,
        source: "지형적응",
      },
    ],
  },
};

/**
 * Korean Techniques Manager
 * Handles execution, validation, and effects of traditional Korean martial arts techniques
 */
export class KoreanTechniquesManager {
  // Remove unused COMBO_TIME_WINDOW
  private static readonly FATIGUE_THRESHOLD = 0.3;

  /**
   * Execute a Korean martial arts technique
   */
  public static executeTechnique(
    techniqueName: string,
    context: TechniqueContext
  ): TechniqueResult {
    const technique = KOREAN_TECHNIQUES_DATABASE[techniqueName];
    if (!technique) {
      throw new Error(`Unknown technique: ${techniqueName}`);
    }

    // Validate technique requirements
    const validationResult = this.validateTechniqueExecution(
      technique,
      context
    );
    if (!validationResult.valid) {
      return {
        success: false,
        damage: 0,
        criticalHit: false,
        vitalPointsHit: [],
        statusEffectsApplied: [],
        description: {
          korean: validationResult.reason || "기법 실행 실패",
          english: validationResult.reason || "Technique execution failed",
        },
        technique,
        kiCost: 0,
        staminaCost: 0,
      };
    }

    // Calculate technique effectiveness
    const effectiveness = this.calculateTechniqueEffectiveness(
      technique,
      context
    );

    // Determine success based on technique accuracy and environmental factors
    const environmentModifier =
      technique.environmentalFactors[context.environment];
    const finalAccuracy =
      technique.accuracy * effectiveness * environmentModifier;
    const success = Math.random() < finalAccuracy;

    if (!success) {
      return {
        success: false,
        damage: 0,
        criticalHit: false,
        vitalPointsHit: [],
        statusEffectsApplied: [],
        description: {
          korean: `${technique.koreanName} 실패`,
          english: `${technique.englishName} failed`,
        },
        technique,
        kiCost: technique.kiCost * 0.5, // Half ki cost on failure
        staminaCost: technique.staminaCost * 0.3,
      };
    }

    // Calculate damage and effects
    const damageResult = this.calculateTechniqueDamage(
      technique,
      context,
      effectiveness
    );
    const vitalPointsHit = this.determineVitalPointHits(technique, context);
    const statusEffects = this.generateStatusEffects(
      technique,
      vitalPointsHit,
      effectiveness
    );

    return {
      success: true,
      damage: damageResult.finalDamage,
      criticalHit: damageResult.critical,
      vitalPointsHit,
      statusEffectsApplied: statusEffects,
      description: {
        korean: `${technique.koreanName} 성공! ${damageResult.description.korean}`,
        english: `${technique.englishName} successful! ${damageResult.description.english}`,
      },
      technique,
      kiCost: technique.kiCost,
      staminaCost: technique.staminaCost,
    };
  }

  /**
   * Validate if technique can be executed
   */
  private static validateTechniqueExecution(
    technique: AdvancedKoreanTechnique,
    context: TechniqueContext
  ): { valid: boolean; reason?: string } {
    const { attacker } = context;

    // Check stance requirements
    if (!technique.prerequisiteStances.includes(attacker.stance)) {
      return {
        valid: false,
        reason: `Incorrect stance. Required: ${technique.prerequisiteStances.join(
          ", "
        )}`,
      };
    }

    // Check ki and stamina requirements
    if (attacker.ki < technique.kiCost) {
      return {
        valid: false,
        reason: "Insufficient ki energy",
      };
    }

    if (attacker.stamina < technique.staminaCost) {
      return {
        valid: false,
        reason: "Insufficient stamina",
      };
    }

    // Check if player is in valid state for technique execution
    if (
      attacker.conditions.some(
        (c) => c.type === "stun" || c.type === "paralysis"
      )
    ) {
      return {
        valid: false,
        reason: "Cannot execute technique while incapacitated",
      };
    }

    return { valid: true };
  }

  /**
   * Calculate technique effectiveness based on various factors
   */
  private static calculateTechniqueEffectiveness(
    technique: AdvancedKoreanTechnique,
    _context: TechniqueContext // Fix: Add underscore prefix for unused parameter
  ): number {
    let effectiveness = 1.0;

    // Environmental factor calculation
    const environmentModifier =
      technique.environmentalFactors[_context.environment];
    effectiveness *= environmentModifier;

    // Fatigue factor
    const staminaRatio =
      _context.attacker.stamina / _context.attacker.maxStamina;
    if (staminaRatio < this.FATIGUE_THRESHOLD) {
      effectiveness *= 0.7 + (staminaRatio / this.FATIGUE_THRESHOLD) * 0.3;
    }

    // Ki flow factor (based on time of day for meridian effectiveness)
    if (_context.timeOfDay !== undefined) {
      const meridianFlow = this.calculateMeridianFlow(
        technique.stance,
        _context.timeOfDay
      );
      effectiveness *= meridianFlow;
    }

    // Stance mastery bonus (based on time in current stance)
    const timeInStance =
      Date.now() - (_context.attacker.lastStanceChangeTime || 0);
    const masteryBonus = Math.min(0.3, timeInStance / 10000); // Max 30% bonus after 10 seconds
    effectiveness *= 1.0 + masteryBonus;

    return Math.max(0.1, Math.min(2.0, effectiveness));
  }

  /**
   * Calculate technique damage with Korean martial arts principles
   */
  private static calculateTechniqueDamage(
    technique: AdvancedKoreanTechnique,
    context: TechniqueContext,
    effectiveness: number
  ): {
    finalDamage: number;
    critical: boolean;
    description: { korean: string; english: string };
  } {
    let baseDamage = technique.damage;

    // Apply effectiveness modifier
    baseDamage *= effectiveness;

    // Critical hit chance based on technique difficulty and execution
    const criticalChance = (technique.critChance || 0.1) * effectiveness;
    const critical = Math.random() < criticalChance;

    if (critical) {
      baseDamage *= technique.critMultiplier || 1.5;
    }

    // Angle-based damage modifier (proper positioning)
    const angleModifier = Math.abs(Math.cos(context.angle)) * 0.3 + 0.7; // 70-100% based on angle
    baseDamage *= angleModifier;

    const finalDamage = Math.round(baseDamage);

    return {
      finalDamage,
      critical,
      description: {
        korean: critical ? "완벽한 기법 시전!" : "기법 적중",
        english: critical ? "Perfect technique execution!" : "Technique landed",
      },
    };
  }

  /**
   * Determine which vital points were hit
   */
  private static determineVitalPointHits(
    technique: AdvancedKoreanTechnique,
    context: TechniqueContext
  ): VitalPoint[] {
    const hitPoints: VitalPoint[] = [];

    // Vital point techniques have higher chance to hit preferred targets
    if (
      technique.category === "급소기" &&
      technique.preferredTargets.length > 0
    ) {
      technique.preferredTargets.forEach(() => {
        // Note: This would require access to the VitalPointSystem to get actual VitalPoint objects
        // For now, return empty array until VitalPointSystem integration
      });
    }

    return hitPoints;
  }

  /**
   * Generate status effects from technique execution
   */
  private static generateStatusEffects(
    technique: AdvancedKoreanTechnique,
    vitalPointsHit: VitalPoint[],
    effectiveness: number
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];

    // Add technique-specific effects
    if (technique.effects) {
      technique.effects.forEach((effect) => {
        const modifiedEffect: StatusEffect = {
          ...effect,
          magnitude: (effect.magnitude || 1.0) * effectiveness,
          duration: effect.duration * effectiveness,
        };
        effects.push(modifiedEffect);
      });
    }

    // Add vital point specific effects
    vitalPointsHit.forEach((vitalPoint) => {
      if (vitalPoint.effects) {
        effects.push(...vitalPoint.effects);
      }
    });

    return effects;
  }

  /**
   * Calculate meridian flow effectiveness based on time of day
   */
  private static calculateMeridianFlow(
    stance: TrigramStance,
    hour: number
  ): number {
    // Traditional Chinese Medicine meridian peak hours
    const meridianPeakHours: Record<TrigramStance, number> = {
      geon: 4, // Heaven - Lung meridian (3-5 AM)
      tae: 6, // Lake - Large Intestine (5-7 AM)
      li: 12, // Fire - Heart (11 AM-1 PM)
      jin: 14, // Thunder - Small Intestine (1-3 PM)
      son: 16, // Wind - Bladder (3-5 PM)
      gam: 18, // Water - Kidney (5-7 PM)
      gan: 20, // Mountain - Pericardium (7-9 PM)
      gon: 22, // Earth - Triple Heater (9-11 PM)
    };

    const peakHour = meridianPeakHours[stance];
    const hourDifference = Math.abs(hour - peakHour);
    const adjustedDifference = Math.min(hourDifference, 24 - hourDifference);

    // Peak effectiveness at meridian hour, 70% minimum
    return Math.max(0.7, 1.0 - (adjustedDifference / 12) * 0.3);
  }

  /**
   * Get available techniques for current stance
   */
  public static getAvailableTechniques(
    stance: TrigramStance,
    playerKi: number,
    playerStamina: number
  ): AdvancedKoreanTechnique[] {
    return Object.values(KOREAN_TECHNIQUES_DATABASE).filter(
      (technique) =>
        technique.prerequisiteStances.includes(stance) &&
        technique.kiCost <= playerKi &&
        technique.staminaCost <= playerStamina
    );
  }

  /**
   * Get technique combination recommendations
   */
  public static getTechniqueComboRecommendations(
    lastTechnique: string,
    currentStance: TrigramStance
  ): readonly string[] {
    // Fix: Return readonly array
    const technique = KOREAN_TECHNIQUES_DATABASE[lastTechnique];
    if (!technique?.comboChain) return [];

    const recommendations = technique.comboChain.filter((nextTechnique) => {
      const nextTech = KOREAN_TECHNIQUES_DATABASE[nextTechnique];
      return nextTech?.prerequisiteStances.includes(currentStance);
    });

    return recommendations as readonly string[]; // Fix: Cast to readonly
  }

  /**
   * Get counter-technique recommendations
   */
  public static getCounterTechniques(opponentTechnique: string): string[] {
    const technique = KOREAN_TECHNIQUES_DATABASE[opponentTechnique];
    return technique?.counterTechniques || [];
  }

  /**
   * Calculate technique learning progress
   */
  public static calculateLearningProgress(
    techniqueName: string,
    practiceCount: number,
    successfulExecutions: number
  ): {
    masteryLevel: number;
    nextMilestone: string;
    koreanTitle: string;
  } {
    const technique = KOREAN_TECHNIQUES_DATABASE[techniqueName];
    if (!technique) {
      return {
        masteryLevel: 0,
        nextMilestone: "Unknown technique",
        koreanTitle: "미지의 기법",
      };
    }

    const successRate =
      practiceCount > 0 ? successfulExecutions / practiceCount : 0;
    const masteryLevel = Math.min(1.0, (practiceCount / 100) * successRate);

    let koreanTitle: string;
    let nextMilestone: string;

    if (masteryLevel >= 0.9) {
      koreanTitle = "달인";
      nextMilestone = "Perfect mastery achieved";
    } else if (masteryLevel >= 0.7) {
      koreanTitle = "숙련자";
      nextMilestone = "Practice precision for mastery";
    } else if (masteryLevel >= 0.5) {
      koreanTitle = "중급자";
      nextMilestone = "Focus on consistency";
    } else if (masteryLevel >= 0.3) {
      koreanTitle = "초급자";
      nextMilestone = "Continue basic practice";
    } else {
      koreanTitle = "입문자";
      nextMilestone = "Learn fundamental movements";
    }

    return { masteryLevel, nextMilestone, koreanTitle };
  }
}

/**
 * Utility functions for Korean techniques
 */
export const KoreanTechniquesUtils = {
  /**
   * Get technique by Korean name
   */
  getTechniqueByKoreanName(koreanName: string): AdvancedKoreanTechnique | null {
    return (
      Object.values(KOREAN_TECHNIQUES_DATABASE).find(
        (tech) => tech.koreanName === koreanName
      ) || null
    );
  },

  /**
   * Get techniques by category
   */
  getTechniquesByCategory(
    category: TechniqueCategory
  ): AdvancedKoreanTechnique[] {
    return Object.values(KOREAN_TECHNIQUES_DATABASE).filter(
      (tech) => tech.category === category
    );
  },

  /**
   * Validate technique name
   */
  isValidTechniqueName(name: string): boolean {
    return name in KOREAN_TECHNIQUES_DATABASE;
  },

  /**
   * Get technique difficulty description
   */
  getDifficultyDescription(difficulty: number): {
    korean: string;
    english: string;
  } {
    if (difficulty >= 9) return { korean: "극난", english: "Extreme" };
    if (difficulty >= 7) return { korean: "어려움", english: "Hard" };
    if (difficulty >= 5) return { korean: "보통", english: "Medium" };
    if (difficulty >= 3) return { korean: "쉬움", english: "Easy" };
    return { korean: "매우 쉬움", english: "Very Easy" };
  },
};

// Export all techniques for external use
export const KOREAN_TECHNIQUES = Object.keys(KOREAN_TECHNIQUES_DATABASE);
export default KoreanTechniquesManager;
