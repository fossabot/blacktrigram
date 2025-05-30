import type {
  TrigramStance,
  TransitionMetrics,
  PlayerState,
} from "../../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "../../types";

/**
 * Korean Martial Arts Trigram Calculator
 * Advanced calculations for Korean martial arts based on I-Ching trigram philosophy
 * Integrates traditional Korean martial principles with modern combat mechanics
 */

export interface TrigramRelationship {
  readonly harmonious: boolean;
  readonly conflicting: boolean;
  readonly complementary: boolean;
  readonly advantage: number;
  readonly description: { korean: string; english: string };
}

export interface TrigramFlow {
  readonly sourceStance: TrigramStance;
  readonly targetStance: TrigramStance;
  readonly kiCost: number;
  readonly efficiency: number;
  readonly timeRequired: number;
  readonly difficulty: number;
  readonly description: string;
}

export interface ElementalHarmony {
  readonly element1: string;
  readonly element2: string;
  readonly harmonyLevel: number;
  readonly flowDirection: "generating" | "destructive" | "neutral";
  readonly koreanTerm: string;
  readonly effects: readonly string[];
}

export class TrigramCalculator {
  private static readonly ELEMENTAL_CYCLES = {
    generating: {
      // 상생 (Sang-saeng) - Generating cycle
      Heaven: "Fire",
      Fire: "Earth",
      Earth: "Metal",
      Metal: "Water",
      Water: "Heaven",
      Lake: "Wind",
      Wind: "Thunder",
      Thunder: "Mountain",
      Mountain: "Lake",
    },
    destructive: {
      // 상극 (Sang-geuk) - Destructive cycle
      Heaven: "Earth",
      Earth: "Water",
      Water: "Fire",
      Fire: "Metal",
      Metal: "Heaven",
      Lake: "Mountain",
      Mountain: "Thunder",
      Thunder: "Wind",
      Wind: "Lake",
    },
  } as const;

  /**
   * Calculate relationship between two trigram stances
   */
  public static calculateTrigramRelationship(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): TrigramRelationship {
    const data1 = TRIGRAM_DATA[stance1];
    const data2 = TRIGRAM_DATA[stance2];

    const elementalHarmony = this.calculateElementalHarmony(
      data1.element,
      data2.element
    );

    const orderDistance = this.calculateOrderDistance(data1.order, data2.order);
    const effectiveness = STANCE_EFFECTIVENESS_MATRIX[stance1][stance2];

    const harmonious = elementalHarmony.harmonyLevel > 0.7;
    const conflicting = elementalHarmony.harmonyLevel < 0.4;
    const complementary = orderDistance === 4; // Opposite positions

    return {
      harmonious,
      conflicting,
      complementary,
      advantage: effectiveness,
      description: {
        korean: this.getKoreanRelationshipDescription(
          stance1,
          stance2,
          harmonious,
          conflicting
        ),
        english: this.getEnglishRelationshipDescription(
          stance1,
          stance2,
          harmonious,
          conflicting
        ),
      },
    };
  }

  /**
   * Calculate elemental harmony between two elements
   */
  public static calculateElementalHarmony(
    element1: string,
    element2: string
  ): ElementalHarmony {
    if (element1 === element2) {
      return {
        element1,
        element2,
        harmonyLevel: 1.0,
        flowDirection: "neutral",
        koreanTerm: "동일 원소 (Same Element)",
        effects: ["완벽한 조화 (Perfect Harmony)"],
      };
    }

    // Check generating cycle
    if (
      this.ELEMENTAL_CYCLES.generating[
        element1 as keyof typeof this.ELEMENTAL_CYCLES.generating
      ] === element2
    ) {
      return {
        element1,
        element2,
        harmonyLevel: 0.9,
        flowDirection: "generating",
        koreanTerm: "상생 (Sang-saeng)",
        effects: [
          "에너지 증폭 (Energy Amplification)",
          "효율성 향상 (Efficiency Boost)",
        ],
      };
    }

    // Check destructive cycle
    if (
      this.ELEMENTAL_CYCLES.destructive[
        element1 as keyof typeof this.ELEMENTAL_CYCLES.destructive
      ] === element2
    ) {
      return {
        element1,
        element2,
        harmonyLevel: 0.3,
        flowDirection: "destructive",
        koreanTerm: "상극 (Sang-geuk)",
        effects: [
          "저항 증가 (Increased Resistance)",
          "에너지 소모 (Energy Drain)",
        ],
      };
    }

    // Neutral relationship
    return {
      element1,
      element2,
      harmonyLevel: 0.6,
      flowDirection: "neutral",
      koreanTerm: "중립 (Neutral)",
      effects: ["보통 효과 (Normal Effect)"],
    };
  }

  /**
   * Calculate optimal trigram flow for combat strategy
   */
  public static calculateOptimalTrigramFlow(
    playerStance: TrigramStance,
    opponentStance: TrigramStance,
    playerKi: number,
    playerStamina: number
  ): Array<{
    targetStance: TrigramStance;
    effectiveness: number;
    cost: number;
  } | null> {
    const allStances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    // Fix: Ensure all flow calculations return proper objects
    const flows = TRIGRAM_STANCES_ORDER.map(
      (
        stance
      ): {
        targetStance: TrigramStance;
        effectiveness: number;
        cost: number;
      } | null => {
        if (stance === playerStance) return null;

        const from = playerStance;
        const to = stance;

        // Fix: Validate stances before using them
        if (!from || !to || !TRIGRAM_DATA[from] || !TRIGRAM_DATA[to]) {
          return null;
        }

        const transition = this.calculateTransitionMetrics(from, to);
        const elementalAdvantage = this.calculateElementalAdvantage(
          TRIGRAM_DATA[from].element,
          TRIGRAM_DATA[to].element
        );

        // ...existing calculation logic...

        return {
          targetStance: to,
          effectiveness: Math.random() * 0.8 + 0.2, // Placeholder
          cost: transition.staminaCost + transition.kiCost,
        };
      }
    );

    return flows;
  }

  /**
   * Calculate ki flow efficiency for a stance sequence
   */
  public static calculateKiFlowEfficiency(
    stanceSequence: TrigramStance[],
    timeWindow: number = 10000 // 10 seconds
  ): {
    totalEfficiency: number;
    averageEfficiency: number;
    kiConsumption: number;
    flowRating: "excellent" | "good" | "average" | "poor";
    koreanAssessment: string;
  } {
    if (stanceSequence.length < 2) {
      return {
        totalEfficiency: 1.0,
        averageEfficiency: 1.0,
        kiConsumption: 0,
        flowRating: "average",
        koreanAssessment: "단일 자세 (Single Stance)",
      };
    }

    let totalEfficiency = 0;
    let totalKiCost = 0;

    for (let i = 0; i < stanceSequence.length - 1; i++) {
      const from = stanceSequence[i];
      const to = stanceSequence[i + 1];

      const transition = this.calculateTransitionMetrics(from, to);
      const elementalHarmony = this.calculateElementalHarmony(
        TRIGRAM_DATA[from].element,
        TRIGRAM_DATA[to].element
      );

      totalEfficiency +=
        transition.effectiveness * elementalHarmony.harmonyLevel;
      totalKiCost += transition.kiCost;
    }

    const averageEfficiency = totalEfficiency / (stanceSequence.length - 1);

    // Time-adjusted ki consumption
    const adjustedKiConsumption = totalKiCost * (timeWindow / 10000);

    let flowRating: "excellent" | "good" | "average" | "poor";
    let koreanAssessment: string;

    if (averageEfficiency >= 0.9) {
      flowRating = "excellent";
      koreanAssessment = "완벽한 흐름 (Perfect Flow)";
    } else if (averageEfficiency >= 0.7) {
      flowRating = "good";
      koreanAssessment = "좋은 흐름 (Good Flow)";
    } else if (averageEfficiency >= 0.5) {
      flowRating = "average";
      koreanAssessment = "보통 흐름 (Average Flow)";
    } else {
      flowRating = "poor";
      koreanAssessment = "개선 필요 (Needs Improvement)";
    }

    return {
      totalEfficiency,
      averageEfficiency,
      kiConsumption: adjustedKiConsumption,
      flowRating,
      koreanAssessment,
    };
  }

  /**
   * Calculate stance effectiveness against another stance
   */
  public static calculateStanceEffectiveness(
    playerStance: TrigramStance,
    opponentStance: TrigramStance,
    playerState: PlayerState
  ): number {
    // Base effectiveness from stance matrix
    const baseEffectiveness =
      STANCE_EFFECTIVENESS_MATRIX[playerStance]?.[opponentStance] ?? 1.0;

    // Apply player state modifiers
    const kiRatio = playerState.ki / playerState.maxKi;
    const staminaRatio = playerState.stamina / playerState.maxStamina;
    const healthRatio = playerState.health / playerState.maxHealth;

    // Calculate overall modifier based on player condition
    const conditionModifier =
      kiRatio * 0.3 + staminaRatio * 0.3 + healthRatio * 0.4;

    return baseEffectiveness * (0.5 + conditionModifier * 0.5);
  }

  /**
   * Get strategic recommendations based on current combat situation
   */
  public static getStrategicRecommendations(
    playerStance: TrigramStance,
    opponentStance: TrigramStance,
    playerState: PlayerState
  ): {
    primaryRecommendation: TrigramStance;
    alternativeRecommendations: TrigramStance[];
    reasoning: { korean: string; english: string };
    urgency: "low" | "medium" | "high";
  } {
    const relationship = this.calculateTrigramRelationship(
      playerStance,
      opponentStance
    );

    const playerKi = playerState.ki;
    const playerStamina = playerState.stamina;
    const playerHealth = playerState.health;

    const flows = this.calculateOptimalTrigramFlow(
      playerStance,
      opponentStance,
      playerKi,
      playerStamina
    );

    // Fix: Better filtering and null checking
    const validFlows = flows.filter(
      (
        flow
      ): flow is {
        targetStance: TrigramStance;
        effectiveness: number;
        cost: number;
      } =>
        flow !== null && flow !== undefined && flow.targetStance !== undefined
    );

    // Fix: Ensure we have a valid recommendation
    const primaryRecommendation =
      validFlows.length > 0 && validFlows[0]
        ? validFlows[0].targetStance
        : playerStance;

    const alternativeRecommendations = validFlows
      .slice(1, 4)
      .map((flow) => flow.targetStance);

    let urgency: "low" | "medium" | "high" = "low";
    let reasoning: { korean: string; english: string };

    // Assess urgency based on player condition
    if (playerHealth < 30) {
      urgency = "high";
      reasoning = {
        korean: "생명력이 낮음 - 즉시 방어적 자세 필요",
        english: "Low health - immediate defensive stance required",
      };
    } else if (relationship.conflicting) {
      urgency = "medium";
      reasoning = {
        korean: "상극 관계 - 자세 변환 권장",
        english: "Conflicting relationship - stance change recommended",
      };
    } else if (relationship.harmonious) {
      urgency = "low";
      reasoning = {
        korean: "조화로운 관계 - 현재 자세 유지 가능",
        english: "Harmonious relationship - current stance maintainable",
      };
    } else {
      urgency = "medium";
      reasoning = {
        korean: "중립적 관계 - 상황에 따른 적응 필요",
        english: "Neutral relationship - situational adaptation needed",
      };
    }

    return {
      primaryRecommendation,
      alternativeRecommendations,
      reasoning,
      urgency,
    };
  }

  /**
   * Calculate transition metrics between stances
   */
  private static calculateTransitionMetrics(
    from: TrigramStance,
    to: TrigramStance
  ): TransitionMetrics {
    if (from === to) {
      return {
        staminaCost: 0,
        kiCost: 0,
        timeDelay: 0,
        effectiveness: 1.0,
      };
    }

    const fromData = TRIGRAM_DATA[from];
    const toData = TRIGRAM_DATA[to];

    const orderDistance = this.calculateOrderDistance(
      fromData.order,
      toData.order
    );
    const elementalHarmony = this.calculateElementalHarmony(
      fromData.element,
      toData.element
    );

    const baseKiCost = 10 + orderDistance * 5;
    const baseStaminaCost = 8 + orderDistance * 3;
    const baseTimeDelay = orderDistance * 200; // milliseconds

    // Apply elemental modifiers
    const harmonyModifier = elementalHarmony.harmonyLevel > 0.7 ? 0.8 : 1.2;

    return {
      staminaCost: Math.round(baseStaminaCost * harmonyModifier),
      kiCost: Math.round(baseKiCost * harmonyModifier),
      timeDelay: Math.round(baseTimeDelay * harmonyModifier),
      effectiveness: elementalHarmony.harmonyLevel,
    };
  }

  /**
   * Calculate order distance in trigram wheel
   */
  private static calculateOrderDistance(
    order1: number,
    order2: number
  ): number {
    const directDistance = Math.abs(order2 - order1);
    const wrapDistance = 8 - directDistance;
    return Math.min(directDistance, wrapDistance);
  }

  /**
   * Calculate transition difficulty
   */
  private static calculateTransitionDifficulty(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    const orderDistance = this.calculateOrderDistance(
      TRIGRAM_DATA[from].order,
      TRIGRAM_DATA[to].order
    );

    const elementalHarmony = this.calculateElementalHarmony(
      TRIGRAM_DATA[from].element,
      TRIGRAM_DATA[to].element
    );

    // Difficulty ranges from 0.1 (very easy) to 1.0 (very hard)
    const baseDifficulty = orderDistance / 4; // 0 to 1
    const harmonyAdjustment = (1 - elementalHarmony.harmonyLevel) * 0.3;

    return Math.max(0.1, Math.min(1.0, baseDifficulty + harmonyAdjustment));
  }

  /**
   * Get Korean description of relationship
   */
  private static getKoreanRelationshipDescription(
    stance1: TrigramStance,
    stance2: TrigramStance,
    harmonious: boolean,
    conflicting: boolean
  ): string {
    // Fix: Add type guards to ensure stances are valid before accessing TRIGRAM_DATA
    if (!this.isValidStance(stance1) || !this.isValidStance(stance2)) {
      return "알 수 없는 관계";
    }

    const data1 = TRIGRAM_DATA[stance1];
    const data2 = TRIGRAM_DATA[stance2];

    if (!data1 || !data2) {
      return "알 수 없는 관계";
    }

    const name1 = data1.korean;
    const name2 = data2.korean;

    if (harmonious) {
      return `${name1}과 ${name2}는 조화로운 관계`;
    } else if (conflicting) {
      return `${name1}과 ${name2}는 상극 관계`;
    } else {
      return `${name1}과 ${name2}는 중립적 관계`;
    }
  }

  /**
   * Get English description of relationship
   */
  private static getEnglishRelationshipDescription(
    stance1: TrigramStance,
    stance2: TrigramStance,
    harmonious: boolean,
    conflicting: boolean
  ): string {
    // Fix: Add type guards to ensure stances are valid before accessing TRIGRAM_DATA
    if (!this.isValidStance(stance1) || !this.isValidStance(stance2)) {
      return "Unknown relationship";
    }

    const data1 = TRIGRAM_DATA[stance1];
    const data2 = TRIGRAM_DATA[stance2];

    if (!data1 || !data2) {
      return "Unknown relationship";
    }

    const name1 = data1.english;
    const name2 = data2.english;

    if (harmonious) {
      return `${name1} and ${name2} are in harmonious relationship`;
    } else if (conflicting) {
      return `${name1} and ${name2} are in conflicting relationship`;
    } else {
      return `${name1} and ${name2} have a neutral relationship`;
    }
  }

  /**
   * Type guard to validate if a value is a valid TrigramStance
   */
  private static isValidStance(stance: unknown): stance is TrigramStance {
    return (
      typeof stance === "string" &&
      ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"].includes(stance)
    );
  }

  /**
   * Calculate comprehensive trigram analysis for training
   */
  public static calculateTrigramMastery(
    _playerState: PlayerState,
    stanceHistory: TrigramStance[],
    combatPerformance: {
      hits: number;
      misses: number;
      criticalHits: number;
      blocks: number;
    }
  ): {
    masteryLevel: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    koreanTitle: string;
  } {
    const uniqueStances = new Set(stanceHistory);
    const diversityScore = uniqueStances.size / 8; // 8 total stances

    const accuracyScore =
      combatPerformance.hits /
      Math.max(1, combatPerformance.hits + combatPerformance.misses);

    const criticalRatio =
      combatPerformance.criticalHits / Math.max(1, combatPerformance.hits);

    const defensiveScore =
      combatPerformance.blocks /
      Math.max(1, combatPerformance.hits + combatPerformance.blocks);

    const masteryLevel =
      (diversityScore + accuracyScore + criticalRatio + defensiveScore) / 4;

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (diversityScore > 0.7) {
      strengths.push("다양한 자세 활용 (Diverse stance usage)");
    } else {
      weaknesses.push("제한적 자세 활용 (Limited stance variety)");
      recommendations.push(
        "모든 8괘 자세 연습 (Practice all 8 trigram stances)"
      );
    }

    if (accuracyScore > 0.8) {
      strengths.push("높은 정확도 (High accuracy)");
    } else {
      weaknesses.push("낮은 명중률 (Low hit rate)");
      recommendations.push("정확성 훈련 강화 (Intensify accuracy training)");
    }

    if (criticalRatio > 0.3) {
      strengths.push("효과적인 급소 공격 (Effective vital point attacks)");
    } else {
      recommendations.push(
        "급소 공격 기법 연마 (Refine vital point techniques)"
      );
    }

    let koreanTitle: string;
    if (masteryLevel >= 0.9) {
      koreanTitle = "무술 대가 (Martial Arts Master)";
    } else if (masteryLevel >= 0.7) {
      koreanTitle = "숙련자 (Expert Practitioner)";
    } else if (masteryLevel >= 0.5) {
      koreanTitle = "중급자 (Intermediate Student)";
    } else {
      koreanTitle = "초보자 (Beginner)";
    }

    return {
      masteryLevel,
      strengths,
      weaknesses,
      recommendations,
      koreanTitle,
    };
  }

  /**
   * Enhanced recommendation with detailed stance analysis
   */
  public static getDetailedStanceAnalysis(
    currentStance: TrigramStance,
    opponentStance: TrigramStance,
    playerState: PlayerState
  ): {
    currentEffectiveness: number;
    recommendations: Array<{
      stance: TrigramStance;
      effectiveness: number;
      reasoning: string;
      priority: "high" | "medium" | "low";
    }>;
    transitionCosts: Record<TrigramStance, TransitionMetrics>;
  } {
    const currentEffectiveness = this.calculateStanceEffectiveness(
      currentStance,
      opponentStance,
      playerState
    );

    const recommendations: Array<{
      stance: TrigramStance;
      effectiveness: number;
      reasoning: string;
      priority: "high" | "medium" | "low";
    }> = [];

    const transitionCosts: Record<TrigramStance, TransitionMetrics> =
      {} as Record<TrigramStance, TransitionMetrics>;

    // Analyze all possible stances
    const allStances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    allStances.forEach((stance) => {
      if (stance !== currentStance) {
        const effectiveness = this.calculateStanceEffectiveness(
          stance,
          opponentStance,
          playerState
        );

        // Fix: Use calculateBasicTransitionCost method
        const transitionCost = this.calculateBasicTransitionCost(
          currentStance,
          stance
        );
        transitionCosts[stance] = transitionCost;

        let priority: "high" | "medium" | "low" = "low";
        const stanceData = TRIGRAM_DATA[stance];
        const opponentData = TRIGRAM_DATA[opponentStance];

        // Fix: Safe access to stance data
        const stanceKorean = stanceData?.korean ?? stance;
        const opponentKorean = opponentData?.korean ?? opponentStance;
        let reasoning = `${stanceKorean} stance analysis`;

        if (effectiveness > currentEffectiveness + 0.3) {
          priority = "high";
          reasoning = `Significant advantage over ${opponentKorean}`;
        } else if (effectiveness > currentEffectiveness + 0.1) {
          priority = "medium";
          reasoning = `Moderate improvement against ${opponentKorean}`;
        }

        recommendations.push({
          stance,
          effectiveness,
          reasoning,
          priority,
        });
      }
    });

    // Sort by effectiveness
    recommendations.sort((a, b) => b.effectiveness - a.effectiveness);

    return {
      currentEffectiveness,
      recommendations: recommendations.slice(0, 5), // Top 5 recommendations
      transitionCosts,
    };
  }

  /**
   * Basic transition cost calculation as fallback
   */
  private static calculateBasicTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionMetrics {
    if (fromStance === toStance) {
      return {
        staminaCost: 0,
        kiCost: 0,
        timeDelay: 0,
        effectiveness: 1.0,
      };
    }

    // Simple distance-based calculation
    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];

    if (!fromData || !toData) {
      return {
        staminaCost: 15,
        kiCost: 10,
        timeDelay: 500,
        effectiveness: 0.8,
      };
    }

    const orderDistance = Math.abs(fromData.order - toData.order);
    const baseCost = 10 + orderDistance * 3;

    return {
      staminaCost: baseCost,
      kiCost: Math.round(baseCost * 0.8),
      timeDelay: orderDistance * 150,
      effectiveness: Math.max(0.6, 1.0 - orderDistance * 0.1),
    };
  }
}
