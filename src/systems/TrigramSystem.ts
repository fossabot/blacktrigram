import { TrigramCalculator } from "./trigram/TrigramCalculator";
import { KoreanCulture } from "./trigram/KoreanCulture";
import {
  type PlayerState,
  type KoreanTechnique,
  type TrigramStance,
  type TransitionMetrics,
  type TransitionPath,
  KOREAN_TECHNIQUES,
} from "../types";
import { getTechniqueByStance } from "./trigram/KoreanTechniques";
import { StanceManager } from "./trigram/StanceManager";

export class TrigramSystem {
  // Re-export techniques for backward compatibility
  public static readonly TECHNIQUES = KOREAN_TECHNIQUES;

  /**
   * Get technique for a specific stance
   */
  public static getTechniqueForStance(
    stance: TrigramStance
  ): KoreanTechnique | null {
    return getTechniqueByStance(stance);
  }

  /**
   * Get optimal counter stance for opponent
   */
  public static getOptimalCounterStance(
    opponentStance: TrigramStance
  ): TrigramStance {
    return StanceManager.getCounterStance(opponentStance);
  }

  /**
   * Calculate stance transition cost
   */
  public calculateTransitionCost(
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

    // Calculate transition distance and costs
    const stanceOrder: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];
    const fromIndex = stanceOrder.indexOf(fromStance);
    const toIndex = stanceOrder.indexOf(toStance);

    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      stanceOrder.length - Math.abs(toIndex - fromIndex)
    );

    const baseCost = distance * 5;
    const baseTime = distance * 100; // milliseconds

    return {
      staminaCost: baseCost,
      kiCost: Math.floor(baseCost * 0.6),
      timeDelay: baseTime,
      effectiveness: Math.max(0.5, 1 - distance * 0.1),
    };
  }

  public getOptimalTransitionPath(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionPath {
    const stanceOrder: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];
    const fromIndex = stanceOrder.indexOf(fromStance);
    const toIndex = stanceOrder.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      return { stances: [fromStance, toStance], totalCost: Infinity };
    }

    // Calculate both clockwise and counterclockwise paths
    const clockwisePath: TrigramStance[] = [fromStance];
    const counterclockwisePath: TrigramStance[] = [fromStance];

    // Build clockwise path
    let currentIndex = fromIndex;
    while (currentIndex !== toIndex) {
      currentIndex = (currentIndex + 1) % stanceOrder.length;
      clockwisePath.push(stanceOrder[currentIndex]!);
    }

    // Build counterclockwise path
    currentIndex = fromIndex;
    while (currentIndex !== toIndex) {
      currentIndex =
        (currentIndex - 1 + stanceOrder.length) % stanceOrder.length;
      counterclockwisePath.push(stanceOrder[currentIndex]!);
    }

    // Choose the shorter path
    const optimalPath =
      clockwisePath.length <= counterclockwisePath.length
        ? clockwisePath
        : counterclockwisePath;

    const totalCost = (optimalPath.length - 1) * 5; // Base cost per transition

    return {
      stances: optimalPath,
      totalCost,
    };
  }

  /**
   * Calculate stance advantage in combat
   */
  public static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return StanceManager.calculateStanceAdvantage(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Get damage modifier for stance
   */
  public static getDamageModifier(stance: TrigramStance): number {
    const stanceData = TRIGRAM_STANCES[stance];
    return stanceData?.damage || 1.0;
  }

  /**
   * Get defense modifier for stance
   */
  public static getDefenseModifier(stance: TrigramStance): number {
    const stanceData = TRIGRAM_STANCES[stance];
    return stanceData?.defense || 1.0;
  }

  /**
   * Get speed modifier for stance
   */
  public static getSpeedModifier(stance: TrigramStance): number {
    const stanceData = TRIGRAM_STANCES[stance];
    return stanceData?.speed || 1.0;
  }

  /**
   * Get stance philosophy description
   */
  public static getStancePhilosophy(stance: TrigramStance): string {
    // Use getStanceCulture instead of getStancePhilosophy
    const culture = KoreanCulture.getStanceCulture(stance);
    return culture.philosophy;
  }

  /**
   * Calculate effective damage with all modifiers
   */
  public static calculateEffectiveDamage(
    baseDamage: number,
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const stanceAdvantage = this.calculateStanceAdvantage(
      attackerStance,
      defenderStance
    );
    return TrigramCalculator.calculateEffectiveDamage(
      baseDamage,
      attackerStance,
      defenderStance,
      stanceAdvantage
    );
  }

  /**
   * Calculate hit chance with stance modifiers
   */
  public static calculateHitChance(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    baseAccuracy: number
  ): number {
    return TrigramCalculator.calculateHitChance(
      attackerStance,
      defenderStance,
      baseAccuracy
    );
  }

  /**
   * Check if stance transition is optimal
   */
  public static isOptimalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    return StanceManager.isOptimalTransition(fromStance, toStance);
  }

  /**
   * Get comprehensive stance statistics
   */
  public static getStanceStats(stance: TrigramStance): {
    power: number;
    speed: number;
    defense: number;
    flexibility: number;
    overall: number;
  } {
    return TrigramCalculator.getStanceStats(stance);
  }

  public static calculateCombatEffectiveness(
    player: PlayerState,
    technique: KoreanTechnique,
    opponentStance: TrigramStance
  ): number {
    const stanceMultiplier = TrigramCalculator.calculateDamageMultiplier(
      technique.stance,
      opponentStance
    );

    const staminaFactor = player.stamina / player.maxStamina;
    const kiFactor = player.ki / player.maxKi;

    return Math.min(100, stanceMultiplier * staminaFactor * kiFactor * 100);
  }

  public static getStanceCulture(stance: TrigramStance): string {
    const culture = KoreanCulture.getTrigramDescription(stance);
    return culture || `Unknown stance: ${stance}`;
  }

  /**
   * Validate if a technique can be performed in current stance
   */
  public static canPerformTechnique(
    technique: KoreanTechnique,
    currentStance: TrigramStance,
    stamina: number,
    ki: number
  ): boolean {
    return (
      stamina >= technique.staminaCost &&
      ki >= technique.kiCost &&
      (technique.stance === currentStance ||
        TrigramCalculator.calculateStanceSynergy(
          technique.stance,
          currentStance
        ) >= 0.9)
    );
  }

  /**
   * Get all available stances in transition order
   */
  public static getAllStances(): readonly TrigramStance[] {
    return ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];
  }

  public getStanceEffectiveness(stance: TrigramStance): number {
    const stanceData = TRIGRAM_STANCES[stance];
    return stanceData ? stanceData.effectiveness : 1.0;
  }

  /**
   * Gets Korean name for stance with proper null checking
   */
  public static getStanceKoreanName(stance: TrigramStance): string {
    const culture = KoreanCulture.getStanceCulture(stance);
    // Fix: Use korean property instead of non-existent name property
    return culture ? `${culture.korean} (${culture.element})` : stance;
  }

  public static formatCultureDescription(stance: TrigramStance): string {
    const culture = KoreanCulture.getCultureInfo(stance);
    if (!culture) {
      return `Unknown stance: ${stance}`;
    }

    // Fix property access - use korean instead of name
    return `${culture.korean} (${culture.element})`;
  }

  public static getCultureInfo(stance: TrigramStance): string {
    const culture = KoreanCulture.getCultureInfo(stance);
    if (!culture) {
      return `Unknown stance: ${stance}`;
    }

    return `${culture.korean} - ${culture.philosophy}`;
  }
}

// Export all sub-components for direct access if needed
export { TrigramCalculator, StanceManager, KoreanCulture, KOREAN_TECHNIQUES };

// Add these constants if they don't exist in KoreanCulture
export const TRIGRAM_SYMBOLS = {
  geon: "☰", // Heaven
  tae: "☱", // Lake
  li: "☲", // Fire
  jin: "☳", // Thunder
  son: "☴", // Wind
  gam: "☵", // Water
  gan: "☶", // Mountain
  gon: "☷", // Earth
} as const;

export const TRIGRAM_ELEMENTS = {
  geon: "천", // Heaven
  tae: "택", // Lake
  li: "화", // Fire
  jin: "뢰", // Thunder
  son: "풍", // Wind
  gam: "수", // Water
  gan: "산", // Mountain
  gon: "지", // Earth
} as const;

// Define stance data structure
interface StanceData {
  readonly damage: number;
  readonly defense: number;
  readonly speed: number;
  readonly energy: number;
  readonly effectiveness: number;
}

const TRIGRAM_STANCES: Record<TrigramStance, StanceData> = {
  geon: {
    damage: 1.2,
    defense: 1.0,
    speed: 1.0,
    energy: 1.1,
    effectiveness: 1.1,
  },
  tae: {
    damage: 1.0,
    defense: 1.1,
    speed: 1.1,
    energy: 1.0,
    effectiveness: 1.0,
  },
  li: {
    damage: 1.3,
    defense: 0.8,
    speed: 1.2,
    energy: 1.2,
    effectiveness: 1.2,
  },
  jin: {
    damage: 1.1,
    defense: 0.9,
    speed: 1.3,
    energy: 1.1,
    effectiveness: 1.1,
  },
  son: {
    damage: 0.9,
    defense: 1.2,
    speed: 1.4,
    energy: 0.9,
    effectiveness: 1.1,
  },
  gam: {
    damage: 1.0,
    defense: 1.1,
    speed: 1.1,
    energy: 1.0,
    effectiveness: 1.0,
  },
  gan: {
    damage: 0.8,
    defense: 1.4,
    speed: 0.7,
    energy: 0.8,
    effectiveness: 0.9,
  },
  gon: {
    damage: 1.1,
    defense: 1.2,
    speed: 0.8,
    energy: 1.0,
    effectiveness: 1.0,
  },
};
