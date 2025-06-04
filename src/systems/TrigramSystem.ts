import {
  type PlayerState,
  type TrigramStance,
  type TrigramTransitionCost,
  type TransitionPath,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../types";
import { TrigramCalculator } from "./trigram/TrigramCalculator";

// Add missing TransitionResult interface
interface TransitionResult {
  canTransition: boolean;
  cost: TrigramTransitionCost;
  reason?: string;
}

export class TrigramSystem {
  private trigramCalculator: TrigramCalculator; // Add missing property

  constructor() {
    this.trigramCalculator = new TrigramCalculator();
  }

  public canTransitionTo(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): TransitionResult {
    const cost = this.trigramCalculator.calculateTransitionCost(
      playerState.stance,
      targetStance,
      playerState
    );

    if (playerState.ki < cost.ki) {
      return { canTransition: false, cost, reason: "insufficient_ki" };
    }
    if (playerState.stamina < cost.stamina) {
      return { canTransition: false, cost, reason: "insufficient_stamina" };
    }

    return { canTransition: true, cost };
  }

  public calculateOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState,
    _opponentStance?: TrigramStance
  ): TransitionPath | null {
    const cost = this.trigramCalculator.calculateTransitionCost(
      fromStance,
      toStance,
      playerState
    );

    if (playerState.ki < cost.ki || playerState.stamina < cost.stamina) {
      return null;
    }

    return {
      path: [fromStance, toStance],
      totalCost: cost,
      overallEffectiveness: this.getStanceEffectiveness(fromStance, toStance), // Fix: Use correct parameter names
      cumulativeRisk: (cost.timeMilliseconds / 1000) * 0.1,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  public findOptimalPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPath | null {
    if (currentStance === targetStance) {
      return {
        path: [currentStance],
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        cumulativeRisk: 0,
        name: TRIGRAM_DATA[currentStance]?.name?.korean || currentStance,
        description: {
          korean: "동일 자세로의 전환 불필요",
          english: "No transition needed for the same stance",
        },
        overallEffectiveness: 1.0, // Added if part of TransitionPath
      };
    }

    const cost = this.trigramCalculator.calculateTransitionCost(
      currentStance,
      targetStance,
      playerState
    );
    if (playerState.ki >= cost.ki && playerState.stamina >= cost.stamina) {
      const path: readonly TrigramStance[] = [currentStance, targetStance];

      return {
        path,
        totalCost: cost,
        cumulativeRisk: this.calculateRiskForPath(path, cost),
        name: `${
          TRIGRAM_DATA[currentStance]?.name?.korean || currentStance
        } → ${TRIGRAM_DATA[targetStance]?.name?.korean || targetStance}`,
        description: {
          korean: `${
            TRIGRAM_DATA[currentStance]?.name?.korean || currentStance
          } 에서 ${
            TRIGRAM_DATA[targetStance]?.name?.korean || targetStance
          } 로 직접 전환`,
          english: `Direct transition from ${
            TRIGRAM_DATA[currentStance]?.name?.english || currentStance
          } to ${TRIGRAM_DATA[targetStance]?.name?.english || targetStance}`,
        },
        overallEffectiveness: this.getStanceEffectiveness(fromStance, toStance), // Use parameter names
      };
    }
    return null; // Placeholder for more complex pathfinding
  }

  public findSafestPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPath | null {
    // Simplified: direct path, consider "safest" as lowest cost or highest defensive gain
    const cost = this.trigramCalculator.calculateTransitionCost(
      currentStance,
      targetStance,
      playerState
    );
    if (playerState.ki >= cost.ki && playerState.stamina >= cost.stamina) {
      return {
        path: [currentStance, targetStance], // Use path
        totalCost: cost,
        cumulativeRisk: (cost.timeMilliseconds / 1000) * 0.05, // Lower risk for "safe" path
        name: `안전: ${currentStance} → ${targetStance}`,
        description: {
          korean: `안전하게 ${currentStance}에서 ${targetStance}로`,
          english: `Safely from ${currentStance} to ${targetStance}`,
        },
        overallEffectiveness: TRIGRAM_DATA[targetStance]?.defensiveBonus || 1.0, // Example safety metric
      };
    }
    return null;
  }

  public findQuickestPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPath | null {
    // Simplified: direct path, "quickest" means lowest timeMilliseconds
    const cost = this.trigramCalculator.calculateTransitionCost(
      currentStance,
      targetStance,
      playerState
    );
    if (playerState.ki >= cost.ki && playerState.stamina >= cost.stamina) {
      return {
        path: [currentStance, targetStance], // Use path
        totalCost: cost,
        cumulativeRisk: (cost.timeMilliseconds / 1000) * 0.15, // Higher risk for "quick" path if it's aggressive
        name: `신속: ${currentStance} → ${targetStance}`,
        description: {
          korean: `신속하게 ${currentStance}에서 ${targetStance}로`,
          english: `Quickly from ${currentStance} to ${targetStance}`,
        },
        overallEffectiveness:
          STANCE_EFFECTIVENESS_MATRIX[currentStance]?.[targetStance] || 1.0,
      };
    }
    return null;
  }

  public getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return this.trigramCalculator.getStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  public getStanceCycle(clockwise: boolean = true): readonly TrigramStance[] {
    if (clockwise) {
      return TRIGRAM_STANCES_ORDER;
    } else {
      return [...TRIGRAM_STANCES_ORDER].reverse();
    }
  }

  public getNextStanceInCycle(
    currentStance: TrigramStance,
    clockwise: boolean = true
  ): TrigramStance {
    const cycle = this.getStanceCycle(clockwise);
    const currentIndex = cycle.indexOf(currentStance);
    if (currentIndex === -1) return currentStance; // Should not happen
    const nextIndex = (currentIndex + 1) % cycle.length;
    return cycle[nextIndex];
  }

  private calculateRiskForPath(
    path: readonly TrigramStance[],
    cost: TrigramTransitionCost
  ): number {
    // Simplified risk calculation: higher cost -> higher risk
    return (cost.timeMilliseconds / 1000) * 0.1 * path.length;
  }

  // Add missing method for test compatibility
  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    return this.trigramCalculator.calculateTransitionCost(
      fromStance,
      toStance,
      playerState
    );
  }

  // Add missing method for test compatibility
  public getOptimalStanceAgainst(
    opponentStance: TrigramStance,
    playerState: PlayerState
  ): TrigramStance {
    // Simple implementation: return stance with best effectiveness against opponent
    const stances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];
    let bestStance: TrigramStance = playerState.stance;
    let bestEffectiveness = 0;

    for (const stance of stances) {
      const effectiveness = this.getStanceEffectiveness(stance, opponentStance);
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness;
        bestStance = stance;
      }
    }

    return bestStance;
  }
}
