import type {
  TrigramStance,
  PlayerState,
  TransitionMetrics,
} from "../../types/GameTypes";
import { TrigramCalculator } from "./TrigramCalculator";

/**
 * StanceManager - Manages stance transitions and validations for Korean martial arts
 */
export class StanceManager {
  private transitionHistory: Array<{
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
    cost: TransitionMetrics;
  }> = [];

  private readonly maxHistoryLength = 10;

  /**
   * Validate if a stance transition is possible
   */
  public canTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): { possible: boolean; reason?: string } {
    if (player.stance === targetStance) {
      return { possible: false, reason: "Already in target stance" };
    }

    if (player.isStunned) {
      return { possible: false, reason: "Cannot change stance while stunned" };
    }

    if (player.isAttacking) {
      return {
        possible: false,
        reason: "Cannot change stance while attacking",
      };
    }

    const transitionCost = TrigramCalculator.calculateTransitionCost(
      player.stance,
      targetStance
    );

    if (player.stamina < transitionCost.staminaCost) {
      return { possible: false, reason: "Insufficient stamina" };
    }

    if (player.ki < transitionCost.kiCost) {
      return { possible: false, reason: "Insufficient ki" };
    }

    return { possible: true };
  }

  /**
   * Execute stance transition and return updated player state
   */
  public executeTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): {
    updatedPlayer: PlayerState;
    transitionData: {
      cost: TransitionMetrics;
      success: boolean;
      reason?: string;
    };
  } {
    const validation = this.canTransition(player, targetStance);

    if (!validation.possible) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: { staminaCost: 0, kiCost: 0, timeDelay: 0, effectiveness: 0 },
          success: false,
          reason: validation.reason,
        },
      };
    }

    const transitionCost = TrigramCalculator.calculateTransitionCost(
      player.stance,
      targetStance
    );

    // Record transition in history
    this.recordTransition(player.stance, targetStance, transitionCost);

    const updatedPlayer: PlayerState = {
      ...player,
      stance: targetStance,
      stamina: Math.max(0, player.stamina - transitionCost.staminaCost),
      ki: Math.max(0, player.ki - transitionCost.kiCost),
      lastAttackTime: Date.now(), // Reset attack timing
    };

    return {
      updatedPlayer,
      transitionData: {
        cost: transitionCost,
        success: true,
      },
    };
  }

  /**
   * Get stance advantages and disadvantages
   */
  public getStanceAnalysis(
    playerStance: TrigramStance,
    opponentStance: TrigramStance
  ): {
    damageModifier: number;
    defenseModifier: number;
    recommendation: string;
    koreanName: string;
  } {
    const damageModifier = TrigramCalculator.calculateDamageModifier(
      playerStance,
      opponentStance
    );
    const defenseModifier = TrigramCalculator.calculateDefenseModifier(
      playerStance,
      opponentStance
    );

    let recommendation: string;
    if (damageModifier > 1.2) {
      recommendation = "공격적 우위 - 적극 공격 권장";
    } else if (defenseModifier > 1.2) {
      recommendation = "방어적 우위 - 반격 기회 대기";
    } else if (damageModifier < 0.8) {
      recommendation = "불리한 상황 - 자세 변경 고려";
    } else {
      recommendation = "균형 상태 - 기회 포착 필요";
    }

    return {
      damageModifier,
      defenseModifier,
      recommendation,
      koreanName: TrigramCalculator.getStanceKoreanName(playerStance),
    };
  }

  /**
   * Get transition history
   */
  public getTransitionHistory(): ReadonlyArray<{
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
    cost: TransitionMetrics;
  }> {
    return [...this.transitionHistory];
  }

  /**
   * Clear transition history
   */
  public clearHistory(): void {
    this.transitionHistory = [];
  }

  /**
   * Get optimal stance recommendation against opponent
   */
  public getOptimalStance(
    currentStance: TrigramStance,
    opponentStance: TrigramStance,
    availableStamina: number,
    availableKi: number
  ): {
    recommendedStance: TrigramStance;
    reasoning: string;
    transitionCost: TransitionMetrics;
  } {
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

    let bestStance = currentStance;
    let bestAdvantage = 0;
    let bestCost: TransitionMetrics = {
      staminaCost: 0,
      kiCost: 0,
      timeDelay: 0,
      effectiveness: 1.0,
    };

    for (const stance of allStances) {
      if (stance === currentStance) continue;

      const transitionCost = TrigramCalculator.calculateTransitionCost(
        currentStance,
        stance
      );

      // Skip if we can't afford the transition
      if (
        transitionCost.staminaCost > availableStamina ||
        transitionCost.kiCost > availableKi
      ) {
        continue;
      }

      const damageModifier = TrigramCalculator.calculateDamageModifier(
        stance,
        opponentStance
      );
      const defenseModifier = TrigramCalculator.calculateDefenseModifier(
        stance,
        opponentStance
      );

      // Calculate overall advantage (weighted toward damage)
      const advantage =
        damageModifier * 0.6 +
        defenseModifier * 0.4 -
        (transitionCost.staminaCost + transitionCost.kiCost) * 0.01;

      if (advantage > bestAdvantage) {
        bestAdvantage = advantage;
        bestStance = stance;
        bestCost = transitionCost;
      }
    }

    const reasoning =
      bestStance === currentStance
        ? "현재 자세가 최적 상태입니다"
        : `${TrigramCalculator.getStanceKoreanName(
            bestStance
          )} 자세로 변경하여 우위 확보`;

    return {
      recommendedStance: bestStance,
      reasoning,
      transitionCost: bestCost,
    };
  }

  /**
   * Record transition in history
   */
  private recordTransition(
    from: TrigramStance,
    to: TrigramStance,
    cost: TransitionMetrics
  ): void {
    this.transitionHistory.push({
      from,
      to,
      timestamp: Date.now(),
      cost,
    });

    // Maintain history length
    if (this.transitionHistory.length > this.maxHistoryLength) {
      this.transitionHistory.shift();
    }
  }

  public static getCounterStance(stance: TrigramStance): TrigramStance {
    const counterMap: Record<TrigramStance, TrigramStance> = {
      geon: "gam", // Heaven vs Water
      tae: "gam", // Lake vs Water
      li: "gam", // Fire vs Water
      jin: "gan", // Thunder vs Mountain
      son: "li", // Wind vs Fire
      gam: "li", // Water vs Fire
      gan: "jin", // Mountain vs Thunder
      gon: "geon", // Earth vs Heaven
    };
    return counterMap[stance];
  }

  public static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    if (attackerStance === defenderStance) return 1.0;

    const counter = this.getCounterStance(defenderStance);
    if (attackerStance === counter) return 1.3; // Strong advantage

    const attackerCounter = this.getCounterStance(attackerStance);
    if (defenderStance === attackerCounter) return 0.7; // Disadvantage

    return 1.0; // Neutral
  }

  public static calculateStanceDistance(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): number {
    const index1 = STANCE_ORDER.indexOf(stance1);
    const index2 = STANCE_ORDER.indexOf(stance2);

    if (index1 === -1 || index2 === -1) {
      throw new Error(`Invalid stance: ${stance1} or ${stance2}`);
    }

    const directDistance = Math.abs(index1 - index2);
    const wrapDistance = STANCE_ORDER.length - directDistance;

    return Math.min(directDistance, wrapDistance);
  }

  public static getAdjacentStances(stance: TrigramStance): {
    previous: TrigramStance;
    next: TrigramStance;
  } {
    const index = STANCE_ORDER.indexOf(stance);
    if (index === -1) {
      throw new Error(`Invalid stance: ${stance}`);
    }

    const prevIndex = (index - 1 + STANCE_ORDER.length) % STANCE_ORDER.length;
    const nextIndex = (index + 1) % STANCE_ORDER.length;

    return {
      previous: STANCE_ORDER[prevIndex]!,
      next: STANCE_ORDER[nextIndex]!,
    };
  }

  public static isOptimalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    if (fromStance === toStance) return true;

    const distance = this.calculateStanceDistance(fromStance, toStance);

    // Adjacent transitions are always optimal
    if (distance === 1) return true;

    // Opposite stances (distance 4 in 8-stance system) are optimal for counters
    if (distance === 4) return true;

    return false;
  }

  public static getStancesByTransitionEfficiency(
    currentStance: TrigramStance
  ): TrigramStance[] {
    return STANCE_ORDER.filter((stance) => stance !== currentStance).sort(
      (a, b) => {
        const distanceA = this.calculateStanceDistance(currentStance, a);
        const distanceB = this.calculateStanceDistance(currentStance, b);
        return distanceA - distanceB;
      }
    );
  }

  public static attemptStanceTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): {
    updatedPlayer: PlayerState;
    transitionData: {
      cost: TransitionMetrics;
      success: boolean;
      reason?: string;
    };
  } {
    const metrics = TrigramCalculator.calculateTransitionCost(
      player.stance,
      targetStance
    );

    const hasStamina = player.stamina >= metrics.staminaCost;
    const hasKi = player.ki >= metrics.kiCost;

    const canTransition =
      player.stance !== targetStance &&
      !player.isStunned &&
      !player.isAttacking &&
      hasStamina &&
      hasKi;

    if (!canTransition) {
      const reason = !hasStamina
        ? "Insufficient stamina"
        : !hasKi
        ? "Insufficient ki"
        : "Invalid transition";

      return {
        updatedPlayer: player,
        transitionData: {
          cost: {
            staminaCost: metrics.staminaCost,
            kiCost: metrics.kiCost,
            timeDelay: metrics.timeDelay,
            effectiveness: metrics.effectiveness,
          },
          success: false,
          reason,
        },
      };
    }

    // Record transition in history
    this.recordTransition(player.stance, targetStance, metrics);

    const updatedPlayer: PlayerState = {
      ...player,
      stance: targetStance,
      stamina: player.stamina - metrics.staminaCost,
      ki: player.ki - metrics.kiCost,
      lastAttackTime: Date.now(), // Reset attack timing
    };

    return {
      updatedPlayer,
      transitionData: {
        cost: metrics,
        success: true,
      },
    };
  }
}

export const STANCE_ORDER: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;
