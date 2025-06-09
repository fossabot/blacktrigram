import type {
  PlayerState,
  KoreanTechnique,
  TrigramStance,
  StatusEffect,
  TransitionPath,
  TrigramTransitionCost,
} from "../types";
// Fix: Import enum properly, not as type
import { TrigramStance as TrigramStanceEnum } from "../types/enums";
import {
  TRIGRAM_STANCES_ORDER,
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
} from "../types/constants";
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import {
  PlayerArchetype,
  TrigramData,
  TrigramEffectivenessMatrix,
  TRIGRAM_EFFECTIVENESS,
  ARCHETYPE_TRIGRAM_AFFINITY,
  TRIGRAM_TRANSITIONS,
} from "../types"; // Assuming types are exported from root types

export class TrigramSystem {
  private trigramCalculator: TrigramCalculator; // Add missing property

  private readonly availableStances: readonly TrigramStance[] = [
    "geon" as TrigramStance,
    "tae" as TrigramStance,
    "li" as TrigramStance,
    "jin" as TrigramStance,
    "son" as TrigramStance,
    "gam" as TrigramStance,
    "gan" as TrigramStance,
    "gon" as TrigramStance,
  ];

  constructor() {
    this.trigramCalculator = new TrigramCalculator();
  }

  // Alternative: Return object with transition details
  public canTransitionTo(
    from: TrigramStance,
    to: TrigramStance,
    playerState?: PlayerState
  ): { canTransition: boolean; reason?: string } {
    if (from === to) return { canTransition: true };

    if (!playerState) {
      return { canTransition: true };
    }

    // Fix: Add null checks for playerState
    const healthRatio = playerState?.health / playerState?.maxHealth || 0;
    const kiRatio = playerState?.ki / playerState?.maxKi || 0;
    const staminaRatio = playerState?.stamina / playerState?.maxStamina || 0;

    // Check ki requirement
    if (kiRatio <= 0.2) {
      return { canTransition: false, reason: "insufficient_ki" };
    }

    // Check stamina requirement
    if (staminaRatio <= 0.2) {
      return { canTransition: false, reason: "insufficient_stamina" };
    }

    // Check health requirement
    if (healthRatio <= 0.1) {
      return { canTransition: false, reason: "insufficient_health" };
    }

    return { canTransition: true };
  }

  // Keep only one calculateTransitionCost implementation
  public calculateTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    playerState?: PlayerState
  ): TrigramTransitionCost {
    if (from === to) {
      return { ki: 0, stamina: 0, timeMilliseconds: 0 };
    }

    const baseKiCost = 10;
    const baseStaminaCost = 8;
    const baseTimeMs = 500;

    // Fix: Add safety check for playerState
    const healthRatio = playerState
      ? playerState.health / playerState.maxHealth
      : 1.0;
    const modifier = healthRatio < 0.5 ? 1.5 : 1.0; // Ensure healthRatio is used correctly

    return {
      ki: Math.floor(baseKiCost * modifier),
      stamina: Math.floor(baseStaminaCost * modifier),
      timeMilliseconds: Math.floor(baseTimeMs * modifier),
    };
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

    // Fix: Use correct method name and variable
    const effectiveness = this.getStanceEffectiveness(fromStance, toStance); // Changed from calculateStanceEffectiveness
    const risk = this.calculateRisk(cost, playerState);

    return {
      path: [fromStance, toStance],
      totalCost: cost,
      overallEffectiveness: effectiveness,
      cumulativeRisk: risk,
      name: `${TRIGRAM_DATA[fromStance].name.english} → ${TRIGRAM_DATA[toStance].name.english}`,
      description: {
        korean: `${TRIGRAM_DATA[fromStance].name.korean}에서 ${TRIGRAM_DATA[toStance].name.korean}로 전환`,
        english: `Transition from ${TRIGRAM_DATA[fromStance].name.english} to ${TRIGRAM_DATA[toStance].name.english}`,
      },
    };
  }

  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): TransitionPath | null {
    // Calculate the transition cost first
    const directCost = this.calculateTransitionCost(
      fromStance,
      toStance,
      playerState
    );

    // Fix: Use correct method name
    const effectiveness = this.getStanceEffectiveness(fromStance, toStance); // Changed from calculateStanceEffectiveness

    // Calculate risk based on the cost and player state
    const risk = this.calculateRisk(directCost, playerState);

    return {
      path: [fromStance, toStance],
      totalCost: directCost,
      overallEffectiveness: effectiveness,
      cumulativeRisk: risk,
      name: `${TRIGRAM_DATA[fromStance].name.english} → ${TRIGRAM_DATA[toStance].name.english}`,
      // Add required description property
      description: {
        korean: `${TRIGRAM_DATA[fromStance].name.korean}에서 ${TRIGRAM_DATA[toStance].name.korean}로 전환`,
        english: `Transition from ${TRIGRAM_DATA[fromStance].name.english} to ${TRIGRAM_DATA[toStance].name.english}`,
      },
    };
  }

  // Add missing calculateRisk method
  private calculateRisk(
    cost: TrigramTransitionCost,
    playerState: PlayerState
  ): number {
    let baseRisk = 0.1; // Base 10% risk

    // Higher risk if low on resources
    if (playerState.ki < playerState.maxKi * 0.3) baseRisk += 0.2;
    if (playerState.stamina < playerState.maxStamina * 0.3) baseRisk += 0.2;
    if (playerState.health < playerState.maxHealth * 0.5) baseRisk += 0.3;

    // Time-based risk
    const timeRisk = (cost.timeMilliseconds / 1000) * 0.05; // 5% per second

    return Math.min(1.0, baseRisk + timeRisk);
  }

  public findSafestPathToStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Remove unused parameter
  ): TransitionPath | null {
    // Simplified: direct path, consider "safest" as lowest cost or highest defensive gain
    const cost = this.trigramCalculator.calculateTransitionCost(
      // Use this.trigramCalculator
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
      // Use this.trigramCalculator
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
      // Use this.trigramCalculator
      attackerStance,
      defenderStance
    );
  }

  public getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    return TRIGRAM_DATA[stance];
  }

  public getTechniqueForStance(
    stance: TrigramStance,
    _archetype?: PlayerArchetype
  ): KoreanTechnique | undefined {
    const stanceData = TRIGRAM_DATA[stance];
    return stanceData?.technique;
  }

  public calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    _technique?: KoreanTechnique // Added technique parameter
  ): number {
    // Basic effectiveness from matrix
    let effectiveness =
      TRIGRAM_EFFECTIVENESS[attackerStance]?.[defenderStance] ?? 1.0;

    // TODO: Consider archetype affinity and technique properties if available
    // For example, if a technique has a bonus against certain stances or elements

    return effectiveness;
  }

  public isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    return TRIGRAM_TRANSITIONS.some(
      (rule) => rule.from === from && rule.to === to
    );
  }

  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    _player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    const rule = TRIGRAM_TRANSITIONS.find(
      (r) => r.from === from && r.to === to
    );
    if (rule) {
      return {
        ki: rule.cost.ki,
        stamina: rule.cost.stamina,
        timeMs: rule.cost.timeMilliseconds,
      };
    }
    return { ki: 999, stamina: 999, timeMs: 5000 }; // Default high cost if no rule
  }

  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    // Simple recommendation: counter opponent's stance or pick a high affinity stance
    if (opponent) {
      const opponentStance = opponent.currentStance;
      let bestStance = player.currentStance;
      let maxEffectiveness = -Infinity;

      for (const stance in TRIGRAM_EFFECTIVENESS) {
        const effectiveness = this.calculateStanceEffectiveness(
          stance as TrigramStance,
          opponentStance
        );
        if (effectiveness > maxEffectiveness) {
          maxEffectiveness = effectiveness;
          bestStance = stance as TrigramStance;
        }
      }
      return bestStance;
    }

    // If no opponent, pick a stance with high affinity for the player's archetype
    const archetypeAffinities = ARCHETYPE_TRIGRAM_AFFINITY[player.archetype];
    if (archetypeAffinities) {
      let bestStance = player.currentStance;
      let maxAffinity = -Infinity;
      for (const stance in archetypeAffinities) {
        if (archetypeAffinities[stance as TrigramStance] > maxAffinity) {
          maxAffinity = archetypeAffinities[stance as TrigramStance];
          bestStance = stance as TrigramStance;
        }
      }
      return bestStance;
    }

    return player.currentStance; // Default
  }

  // Placeholder for calculateStanceEffects if it was intended to be different
  public calculateStanceEffects(
    _attackerStance: TrigramStance,
    _defenderStance: TrigramStance,
    _technique?: KoreanTechnique
  ): any {
    // Replace 'any' with a proper return type
    // This method was suggested by a previous error message.
    // If it's distinct from calculateStanceEffectiveness, implement its logic here.
    // Otherwise, it might be redundant.
    return { effectivenessFactor: 1.0 }; // Placeholder
  }

  public executeStanceChange(
    playerState: PlayerState,
    newStance: TrigramStance
  ): {
    success: boolean;
    cost: { ki: number; stamina: number; timeMilliseconds: number }; // Ensure this matches TrigramTransitionCost
    newState?: PlayerState;
    reason?: string;
  } {
    // Check if player can afford the stance change
    const transitionCost = this.trigramCalculator.calculateTransitionCost(
      playerState.currentStance as TrigramStance, // Ensure currentStance is used
      newStance,
      playerState
    );

    if (playerState.ki < transitionCost.ki) {
      return {
        success: false,
        cost: transitionCost,
        reason: "insufficient_ki",
      };
    }

    if (playerState.stamina < transitionCost.stamina) {
      return {
        success: false,
        cost: transitionCost,
        reason: "insufficient_stamina",
      };
    }

    // Execute stance change
    const newState: PlayerState = {
      ...playerState,
      currentStance: newStance, // Use currentStance, not stance
      ki: playerState.ki - transitionCost.ki,
      stamina: playerState.stamina - transitionCost.stamina,
      lastStanceChangeTime: Date.now(), // Ensure this field exists and is updated
    };

    return {
      success: true,
      cost: transitionCost,
      newState,
    };
  }
}
