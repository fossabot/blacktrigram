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
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import { TransitionCalculator } from "./trigram/TransitionCalculator";

export class TrigramSystem {
  private trigramCalculator: TrigramCalculator;
  private transitionCalculator: TransitionCalculator;

  constructor(
    trigramData?: Record<TrigramStance, TrigramData>,
    effectivenessMatrix?: TrigramEffectivenessMatrix,
    transitionRules?: readonly TrigramTransitionRule[]
  ) {
    this.trigramCalculator = new TrigramCalculator(
      // trigramData, // Pass specific data if needed, otherwise TrigramCalculator uses defaults
      effectivenessMatrix // Pass specific data if needed
    );
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
    return data.technique ? [data.technique] : []; // Simplified
  }

  public calculateTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    if (from === to) return { ki: 0, stamina: 0, timeMilliseconds: 0 };

    // Delegate to TrigramCalculator or implement logic here
    const baseKiCost = 10;
    const baseStaminaCost = 8;
    const baseTimeMs = 500;

    let costMultiplier = 1.0;
    if (playerState.health < 50) costMultiplier *= 1.5;
    if (playerState.stamina < playerState.maxStamina * 0.3)
      costMultiplier *= 1.2;

    return {
      ki: Math.round(baseKiCost * costMultiplier),
      stamina: Math.round(baseStaminaCost * costMultiplier),
      timeMilliseconds: Math.round(baseTimeMs * costMultiplier),
    };
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

  public transitionStance(
    playerState: PlayerState,
    toStance: TrigramStance
  ): PlayerState | null {
    if (!this.canTransition(playerState, toStance)) {
      return null;
    }
    const cost = this.calculateTransitionCost(
      playerState.stance,
      toStance,
      playerState
    );
    return {
      ...playerState,
      stance: toStance,
      ki: playerState.ki - cost.ki,
      stamina: playerState.stamina - cost.stamina,
      lastStanceChangeTime: Date.now(),
    };
  }

  public calculateOptimalPath(
    playerState: PlayerState,
    fromStance: TrigramStance,
    toStance: TrigramStance,
    maxDepth: number = 3, // maxDepth is used by TransitionCalculator's findOptimalPath
    opponentStance?: TrigramStance
  ): TransitionPath | null {
    if (fromStance === toStance) {
      return {
        path: [fromStance],
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        cumulativeRisk: 0,
        name: `${TRIGRAM_DATA[fromStance]?.name?.korean || fromStance}`,
        description: {
          korean: "현재 자세 유지",
          english: "Maintain current stance",
        },
        overallEffectiveness: 1, // Added if part of TransitionPath
      };
    }

    // Use TransitionCalculator for pathfinding
    const path = this.transitionCalculator.findOptimalPath(
      fromStance,
      toStance,
      playerState,
      opponentStance // Pass opponentStance if findOptimalPath accepts it
      // maxDepth // Pass maxDepth if findOptimalPath accepts it
    );

    if (!path) return null;

    // If path is found, it should already conform to TransitionPath including overallEffectiveness
    return path;
  }

  public findOptimalPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _opponentStance?: TrigramStance // Marked as unused
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
        overallEffectiveness: this.trigramCalculator.getStanceEffectiveness(
          targetStance,
          opponentStance || currentStance
        ), // Added if part of TransitionPath
      };
    }
    return null; // Placeholder for more complex pathfinding
  }

  public findSafestPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _opponentStance?: TrigramStance // Marked as unused
  ): TransitionPath | null {
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
    playerState: PlayerState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _opponentStance?: TrigramStance // Marked as unused
  ): TransitionPath | null {
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
    return STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance] || 1.0;
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
