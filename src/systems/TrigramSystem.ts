import type {
  PlayerState,
  TrigramStance,
  TrigramData,
  TrigramTransitionCost,
  TransitionPath,
  KoreanTechnique,
  TrigramEffectivenessMatrix,
  TrigramTransitionRule,
  // CombatResult, // If used
  // VitalPoint, // If used
} from "../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "../types/constants";
import { TransitionCalculator } from "./trigram/TransitionCalculator";

export interface TransitionPathWithDescription extends TransitionPath {
  description: {
    korean: string;
    english: string;
  };
}

export class TrigramSystem {
  // private trigramCalculator: TrigramCalculator; // Removed
  private transitionCalculator: TransitionCalculator;

  constructor(
    trigramData?: Record<TrigramStance, TrigramData>,
    effectivenessMatrix?: TrigramEffectivenessMatrix,
    transitionRules?: readonly TrigramTransitionRule[]
  ) {
    this.transitionCalculator = new TransitionCalculator( // Initialize TransitionCalculator
      trigramData,
      effectivenessMatrix,
      transitionRules
    );
  }

  public getTrigramData(stance: TrigramStance): TrigramData | undefined {
    return TRIGRAM_DATA[stance];
  }

  public getTechniquesForStance(
    stance: TrigramStance
  ): readonly KoreanTechnique[] {
    // Assuming techniques are part of TrigramData or a separate mapping
    // For this example, let's assume TrigramData holds its primary technique
    const data = this.getTrigramData(stance);
    return data?.technique ? [data.technique] : []; // Simplified
  }

  public calculateTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    return this.transitionCalculator.calculateTransitionCost(
      from,
      to,
      playerState
    );
  }

  public canTransition(
    playerState: PlayerState,
    toStance: TrigramStance
  ): boolean {
    const cost = this.calculateTransitionCost(
      playerState.stance,
      toStance,
      playerState
    );
    return playerState.ki >= cost.ki && playerState.stamina >= cost.stamina;
  }

  public canTransitionToStance(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): boolean {
    if (playerState.stance === targetStance) return true;

    const cost = this.calculateTransitionCost(playerState, targetStance);
    return playerState.ki >= cost.ki && playerState.stamina >= cost.stamina;
  }

  public getOptimalStanceAgainst(
    playerState: PlayerState,
    opponentStance: TrigramStance
  ): TrigramStance {
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

    let bestStance = playerState.stance;
    let bestEffectiveness = 0;

    for (const stance of stances) {
      if (this.canTransitionToStance(playerState, stance)) {
        const effectiveness = this.calculateStanceEffectiveness(
          stance,
          opponentStance
        );
        if (effectiveness > bestEffectiveness) {
          bestEffectiveness = effectiveness;
          bestStance = stance;
        }
      }
    }

    return bestStance;
  }

  public calculateOptimalPath(
    from: TrigramStance,
    to: TrigramStance,
    playerState: PlayerState,
    opponentStance?: TrigramStance
  ): TransitionPath | null {
    // Fix parameter order and names
    const cost = this.transitionCalculator.calculateTransitionCost(
      from,
      to,
      playerState
    );

    if (playerState.ki < cost.ki || playerState.stamina < cost.stamina) {
      return null;
    }

    const effectiveness = this.getStanceEffectiveness(from, to); // Use correct method name

    return {
      path: [from, to],
      totalCost: cost,
      overallEffectiveness: effectiveness,
      cumulativeRisk: (cost.timeMilliseconds / 1000) * 0.1,
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  public findOptimalPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPathWithDescription | null {
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

    const cost = this.calculateTransitionCost(
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
        overallEffectiveness: this.getStanceEffectiveness(from, to), // Fix method name
      };
    }
    return null; // Placeholder for more complex pathfinding
  }

  public findSafestPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPathWithDescription | null {
    // Simplified: direct path, consider "safest" as lowest cost or highest defensive gain
    const cost = this.calculateTransitionCost(
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
  ): TransitionPathWithDescription | null {
    // Simplified: direct path, "quickest" means lowest timeMilliseconds
    const cost = this.calculateTransitionCost(
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
    // Use trigramCalculator instead of non-existent stanceCalculator
    return this.transitionCalculator.getStanceEffectiveness(
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
}
