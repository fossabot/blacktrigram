import type { TrigramStance } from "../../types"; // Fix import path
import { TRIGRAM_DATA } from "../../types"; // Add TRIGRAM_DATA import

export interface PathCalculationResult {
  readonly path: TrigramStance[];
  readonly totalCost: number;
  readonly success: boolean;
}

export interface TransitionMetrics {
  readonly staminaCost: number;
  readonly kiCost: number;
  readonly timeDelay: number;
  readonly effectiveness: number;
}

/**
 * TrigramCalculator - Core calculations for Korean martial arts trigram system
 * Handles damage, defense, speed, and combat effectiveness calculations
 */
export class TrigramCalculator {
  /**
   * Calculate damage modifier based on trigram stance
   */
  public static getDamageModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.2, // Heaven - strong and commanding
      tae: 1.0, // Lake - balanced and flowing
      li: 1.3, // Fire - highest damage, aggressive
      jin: 1.1, // Thunder - good damage with speed
      son: 0.9, // Wind - agile but lighter strikes
      gam: 1.0, // Water - adaptable and consistent
      gan: 0.8, // Mountain - defensive, lower attack
      gon: 1.1, // Earth - steady and reliable power
    };
    return modifiers[stance];
  }

  /**
   * Calculate defense modifier based on trigram stance
   */
  public static getDefenseModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.1, // Heaven - good natural defense
      tae: 1.0, // Lake - balanced defensive stance
      li: 0.8, // Fire - aggressive, less defensive
      jin: 0.9, // Thunder - offensive focus
      son: 1.2, // Wind - evasive defensive style
      gam: 1.1, // Water - adaptive defense
      gan: 1.4, // Mountain - highest defense
      gon: 1.3, // Earth - solid defensive foundation
    };
    return modifiers[stance];
  }

  /**
   * Calculate speed modifier based on trigram stance
   */
  public static getSpeedModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.0, // Heaven - balanced movement
      tae: 1.1, // Lake - fluid and smooth
      li: 1.2, // Fire - fast and explosive
      jin: 1.3, // Thunder - very fast strikes
      son: 1.4, // Wind - fastest movement
      gam: 1.1, // Water - flowing movement
      gan: 0.7, // Mountain - slow but steady
      gon: 0.8, // Earth - grounded, measured pace
    };
    return modifiers[stance];
  }

  /**
   * Calculate evasion modifier based on trigram stance
   */
  public static getEvasionModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.0, // Heaven - balanced evasion
      tae: 1.2, // Lake - fluid evasion
      li: 0.9, // Fire - direct, less evasive
      jin: 1.1, // Thunder - quick dodges
      son: 1.4, // Wind - highest evasion
      gam: 1.3, // Water - flowing evasion
      gan: 0.8, // Mountain - sturdy, less mobile
      gon: 0.9, // Earth - grounded movement
    };
    return modifiers[stance];
  }

  /**
   * Calculate hit chance based on trigram stance compatibility
   */
  public static calculateHitChance(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    baseAccuracy: number
  ): number {
    const compatibility = this.calculateCompatibility(
      attackerStance,
      defenderStance
    );
    const modifier = compatibility > 0.5 ? 1.1 : 0.9;

    return Math.max(0, Math.min(1, baseAccuracy * modifier));
  }

  /**
   * Calculate accuracy for technique execution
   */
  public static calculateAccuracy(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    baseAccuracy: number
  ): number {
    return this.calculateHitChance(
      attackerStance,
      defenderStance,
      baseAccuracy
    );
  }

  /**
   * Calculate damage multiplier based on stance interaction
   */
  public static calculateDamageMultiplier(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const compatibility = this.calculateCompatibility(
      attackerStance,
      defenderStance
    );
    return 0.8 + compatibility * 0.4; // Range: 0.8 to 1.2
  }

  /**
   * Calculate transition cost between stances
   */
  public static calculateTransitionCost(
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

    const compatibility = this.calculateCompatibility(fromStance, toStance);
    const difficulty = 1 - compatibility;

    return {
      staminaCost: Math.floor(10 + difficulty * 20),
      kiCost: Math.floor(5 + difficulty * 15),
      timeDelay: Math.floor(200 + difficulty * 300),
      effectiveness: Math.max(0.4, 1 - difficulty * 0.3),
    };
  }

  /**
   * Calculate optimal path between stances
   */
  public static calculateOptimalPath(
    from: TrigramStance,
    to: TrigramStance,
    maxSteps: number = 3
  ): PathCalculationResult {
    if (from === to) {
      return { path: [from], totalCost: 0, success: true };
    }

    // For now, implement direct path
    // Future: Implement A* pathfinding through trigram relationships
    const transitionCost = this.calculateTransitionCost(from, to);

    if (maxSteps >= 1) {
      return {
        path: [from, to],
        totalCost: transitionCost.staminaCost + transitionCost.kiCost,
        success: true,
      };
    }

    return { path: [from], totalCost: 0, success: false };
  }

  /**
   * Calculate compatibility between two trigram stances
   */
  private static calculateCompatibility(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): number {
    if (stance1 === stance2) return 0.5;

    // Trigram compatibility based on I Ching principles - Fix incomplete records
    const compatibilityMap: Record<
      TrigramStance,
      Record<TrigramStance, number>
    > = {
      geon: {
        geon: 0.5,
        tae: 0.8,
        li: 0.7,
        jin: 0.3,
        son: 0.4,
        gam: 0.2,
        gan: 0.6,
        gon: 0.9,
      },
      tae: {
        geon: 0.8,
        tae: 0.5,
        li: 0.5,
        jin: 0.7,
        son: 0.8,
        gam: 0.6,
        gan: 0.3,
        gon: 0.4,
      },
      li: {
        geon: 0.7,
        tae: 0.5,
        li: 0.5,
        jin: 0.8,
        son: 0.9,
        gam: 0.2,
        gan: 0.4,
        gon: 0.3,
      },
      jin: {
        geon: 0.3,
        tae: 0.7,
        li: 0.8,
        jin: 0.5,
        son: 0.5,
        gam: 0.9,
        gan: 0.2,
        gon: 0.6,
      },
      son: {
        geon: 0.4,
        tae: 0.8,
        li: 0.9,
        jin: 0.5,
        son: 0.5,
        gam: 0.3,
        gan: 0.7,
        gon: 0.2,
      },
      gam: {
        geon: 0.2,
        tae: 0.6,
        li: 0.2,
        jin: 0.9,
        son: 0.3,
        gam: 0.5,
        gan: 0.8,
        gon: 0.7,
      },
      gan: {
        geon: 0.6,
        tae: 0.3,
        li: 0.4,
        jin: 0.2,
        son: 0.7,
        gam: 0.8,
        gan: 0.5,
        gon: 0.5,
      },
      gon: {
        geon: 0.9,
        tae: 0.4,
        li: 0.3,
        jin: 0.6,
        son: 0.2,
        gam: 0.7,
        gan: 0.5,
        gon: 0.5,
      },
    };

    return compatibilityMap[stance1]?.[stance2] ?? 0.3;
  }

  /**
   * Calculate element interaction bonus
   */
  public static calculateElementBonus(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const elementMap: Record<TrigramStance, string> = {
      geon: "metal",
      tae: "metal",
      li: "fire",
      jin: "wood",
      son: "wind",
      gam: "water",
      gan: "earth",
      gon: "earth",
    };

    const attackElement = elementMap[attackerStance];
    const defenseElement = elementMap[defenderStance];

    // Five element interaction (simplified)
    const strongAgainst: Record<string, string[]> = {
      fire: ["metal"],
      water: ["fire"],
      wood: ["earth"],
      metal: ["wood"],
      earth: ["water"],
      wind: ["fire"], // Special case for wind/son
    };

    if (strongAgainst[attackElement]?.includes(defenseElement)) {
      return 1.2;
    }

    if (strongAgainst[defenseElement]?.includes(attackElement)) {
      return 0.8;
    }

    return 1.0;
  }

  public static calculateEffectiveDamage(
    baseDamage: number,
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const multiplier = this.calculateDamageMultiplier(
      attackerStance,
      defenderStance
    );
    return Math.round(baseDamage * multiplier);
  }

  public static calculateMovementSpeed(
    baseSpeed: number,
    stance: TrigramStance
  ): number {
    const speedModifiers: Record<TrigramStance, number> = {
      geon: 1.0, // Heaven - balanced
      tae: 1.1, // Lake - fluid, faster
      li: 1.2, // Fire - quick
      jin: 0.9, // Thunder - powerful but slower
      son: 1.3, // Wind - fastest
      gam: 1.0, // Water - adaptive
      gan: 0.8, // Mountain - slow but stable
      gon: 0.9, // Earth - grounded
    };

    return baseSpeed * speedModifiers[stance];
  }

  public static calculateStanceSynergy(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): number {
    return this.calculateCompatibility(stance1, stance2);
  }

  public static getStanceStats(stance: TrigramStance): {
    power: number;
    speed: number;
    defense: number;
    flexibility: number;
    overall: number;
  } {
    const stanceStats: Record<
      TrigramStance,
      {
        power: number;
        speed: number;
        defense: number;
        flexibility: number;
      }
    > = {
      geon: { power: 0.9, speed: 0.7, defense: 0.8, flexibility: 0.6 },
      tae: { power: 0.6, speed: 0.8, defense: 0.7, flexibility: 0.9 },
      li: { power: 0.8, speed: 0.9, defense: 0.5, flexibility: 0.8 },
      jin: { power: 0.95, speed: 0.6, defense: 0.6, flexibility: 0.5 },
      son: { power: 0.5, speed: 0.95, defense: 0.6, flexibility: 0.95 },
      gam: { power: 0.7, speed: 0.7, defense: 0.9, flexibility: 0.8 },
      gan: { power: 0.6, speed: 0.4, defense: 0.95, flexibility: 0.3 },
      gon: { power: 0.8, speed: 0.5, defense: 0.9, flexibility: 0.7 },
    };

    const stats = stanceStats[stance];
    const overall =
      (stats.power + stats.speed + stats.defense + stats.flexibility) / 4;

    return {
      ...stats,
      overall,
    };
  }

  public static calculateDefenseModifier(
    defenderStance: TrigramStance,
    attackerStance: TrigramStance
  ): number {
    // Inverse of damage multiplier for defense
    const damageMultiplier = this.calculateDamageMultiplier(
      attackerStance,
      defenderStance
    );
    return 2 - damageMultiplier; // Convert damage multiplier to defense multiplier
  }

  public static getStanceKoreanName(stance: TrigramStance): string {
    const koreanNames: Record<TrigramStance, string> = {
      geon: "건 (天)",
      tae: "태 (澤)",
      li: "리 (離)",
      jin: "진 (震)",
      son: "손 (巽)",
      gam: "감 (坎)",
      gan: "간 (艮)",
      gon: "곤 (坤)",
    };

    return koreanNames[stance];
  }
}

export function getStaminaModifier(stance: TrigramStance): number {
  const modifiers: Record<TrigramStance, number> = {
    geon: 0.9,
    tae: 0.8,
    li: 1.1,
    jin: 1.2,
    son: 0.7,
    gam: 1.0,
    gan: 0.95,
    gon: 1.05,
  };
  return modifiers[stance] ?? 1.0; // Use nullish coalescing
}

export function getDamageModifier(stance: TrigramStance): number {
  const modifiers: Record<TrigramStance, number> = {
    geon: 1.1,
    tae: 0.9,
    li: 1.2,
    jin: 1.15,
    son: 0.85,
    gam: 1.0,
    gan: 0.95,
    gon: 1.05,
  };
  return modifiers[stance] ?? 1.0; // Use nullish coalescing
}

export function getDefenseModifier(stance: TrigramStance): number {
  const modifiers: Record<TrigramStance, number> = {
    geon: 1.0,
    tae: 1.1,
    li: 0.9,
    jin: 0.85,
    son: 1.0,
    gam: 1.2,
    gan: 1.3,
    gon: 1.15,
  };
  return modifiers[stance] ?? 1.0; // Use nullish coalescing
}

export function getSpeedModifier(stance: TrigramStance): number {
  const modifiers: Record<TrigramStance, number> = {
    geon: 1.05,
    tae: 1.1,
    li: 0.95,
    jin: 1.2,
    son: 1.3,
    gam: 0.9,
    gan: 0.8,
    gon: 0.85,
  };
  return modifiers[stance] ?? 1.0; // Use nullish coalescing
}

// Fix other functions with proper null checks
export function calculateElementalAdvantage(
  attackElement: string,
  defenseElement: string
): number {
  const strongAgainst: Record<string, string[]> = {
    Metal: ["Wood"],
    Wood: ["Earth"],
    Earth: ["Water"],
    Water: ["Fire"],
    Fire: ["Metal"],
  };

  if (strongAgainst[attackElement]?.includes(defenseElement)) {
    return 1.2;
  }

  if (strongAgainst[defenseElement]?.includes(attackElement)) {
    return 0.8;
  }

  return 1.0;
}

export function calculateSpeed(
  stance: TrigramStance,
  baseSpeed: number
): number {
  const speedModifiers = getSpeedModifier(stance);
  return baseSpeed * speedModifiers;
}

export function calculateOverallStats(stance: TrigramStance): {
  power: number;
  speed: number;
  defense: number;
  flexibility: number;
  overall: number;
} {
  const stats = TRIGRAM_DATA[stance];
  if (!stats) {
    return { power: 1, speed: 1, defense: 1, flexibility: 1, overall: 1 };
  }

  const power = stats.damageModifier ?? 1.0;
  const speed = stats.speedModifier ?? 1.0;
  const defense = stats.defenseModifier ?? 1.0;
  const flexibility = stats.staminaCostModifier ?? 1.0;

  const overall = (power + speed + defense + flexibility) / 4;

  return {
    power,
    speed,
    defense,
    flexibility,
    overall,
  };
}

export function getKoreanStanceName(stance: TrigramStance): string {
  const koreanNames: Record<TrigramStance, string> = {
    geon: "건 (天)",
    tae: "태 (澤)",
    li: "리 (火)",
    jin: "진 (雷)",
    son: "손 (風)",
    gam: "감 (水)",
    gan: "간 (山)",
    gon: "곤 (地)",
  };
  return koreanNames[stance] ?? stance; // Use nullish coalescing
}
