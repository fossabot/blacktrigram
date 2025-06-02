import type {
  PlayerState,
  TrigramStance,
  TrigramTransitionRule,
  TrigramTransitionCost,
  TransitionPath,
} from "../../types";
import {
  TRIGRAM_DATA as AllTrigramDataImport, // Use alias
  STANCE_EFFECTIVENESS_MATRIX as GlobalEffectivenessMatrixImport, // Use alias
} from "../../types/constants"; // Import values

// Define AllTrigramData and GlobalEffectivenessMatrix if they are specific types for this module
type AllTrigramData = typeof AllTrigramDataImport;
type GlobalEffectivenessMatrix = typeof GlobalEffectivenessMatrixImport;

export class TransitionCalculator {
  private trigramData: AllTrigramData;
  private effectivenessMatrix: GlobalEffectivenessMatrix;
  private transitionRulesInternal: readonly TrigramTransitionRule[]; // Renamed to avoid conflict

  constructor(
    trigramData?: AllTrigramData,
    effectivenessMatrix?: GlobalEffectivenessMatrix,
    transitionRules?: readonly TrigramTransitionRule[]
  ) {
    this.trigramData = trigramData || AllTrigramDataImport;
    this.effectivenessMatrix =
      effectivenessMatrix || GlobalEffectivenessMatrixImport;
    this.transitionRulesInternal =
      transitionRules || this.generateDefaultRules();
  }

  private generateDefaultRules(): readonly TrigramTransitionRule[] {
    const rules: TrigramTransitionRule[] = [];
    const stances = Object.keys(this.trigramData) as TrigramStance[];
    for (const from of stances) {
      for (const to of stances) {
        if (from === to) continue;
        const kiCost = 10;
        const staminaCost = 5;
        const timeMs = 500;

        rules.push({
          from,
          to,
          cost: { ki: kiCost, stamina: staminaCost, timeMilliseconds: timeMs },
          effectiveness: 1.0, // Add missing property
          conditions: [], // Add optional property
        });
      }
    }
    return rules;
  }

  public getTransitionRule(
    from: TrigramStance,
    to: TrigramStance
  ): TrigramTransitionRule | undefined {
    return this.transitionRulesInternal.find(
      (r) => r.from === from && r.to === to
    );
  }

  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    const rule = this.getTransitionRule(fromStance, toStance);
    let baseCost = rule?.cost || { ki: 15, stamina: 10, timeMilliseconds: 700 };

    let kiModifier = 1.0;
    let staminaModifier = 1.0;
    let timeModifier = 1.0;

    // Modify based on player's current Ki/Stamina levels
    if (playerState.ki / playerState.maxKi < 0.3) kiModifier *= 1.5; // Higher cost if low on Ki
    if (playerState.stamina / playerState.maxStamina < 0.3)
      staminaModifier *= 1.5;

    // Modify based on active effects
    playerState.activeEffects?.forEach((effect) => {
      if (effect.type === "exhausted" /* EffectType.EXHAUSTED */) {
        kiModifier *= 1.2;
        staminaModifier *= 1.2;
        timeModifier *= 1.1;
      }
      // Add more effect-based modifications
    });

    // Archetype specific transition costs (example)
    if (
      playerState.archetype === "amsalja" && // Use actual PlayerArchetype enum value
      (toStance === "son" || fromStance === "son")
    ) {
      // Amsalja (Shadow Assassin) might be quicker with wind-related stances (son = wind)
      timeModifier *= 0.8;
      staminaModifier *= 0.9;
    }

    return {
      ki: Math.round(baseCost.ki * kiModifier),
      stamina: Math.round(baseCost.stamina * staminaModifier),
      timeMilliseconds: Math.round(baseCost.timeMilliseconds * timeModifier),
    };
  }

  public calculateTransitionEffectiveness(
    _fromStance: TrigramStance, // Prefixed with underscore to indicate unused
    toStance: TrigramStance,
    playerState: PlayerState,
    opponentStance?: TrigramStance // Opponent's stance for context
  ): number {
    let effectiveness = 1.0;
    if (opponentStance) {
      effectiveness =
        this.effectivenessMatrix[toStance]?.[opponentStance] || 1.0;
    }

    // Modify based on player health (e.g., less effective to switch to aggressive stance if low health)
    if (playerState.health / playerState.maxHealth < 0.4) {
      if (["geon", "jin", "li"].includes(toStance)) effectiveness *= 0.8; // Aggressive stances
      if (["gan", "gon"].includes(toStance)) effectiveness *= 1.1; // Defensive stances
    }

    // Consider player's mastery/affinity with the target stance (if such data exists)
    // const stanceMastery = playerState.mastery?.[toStance] || 0; // Example
    // effectiveness *= (1 + stanceMastery * 0.2); // Max 20% bonus from mastery

    return Math.max(0.1, Math.min(2.0, effectiveness)); // Clamp effectiveness
  }

  public findShortestPath(
    startStance: TrigramStance,
    endStance: TrigramStance,
    playerState: PlayerState
    // opponentStance?: TrigramStance // Unused
  ): TransitionPath | null {
    // Simplified: direct transition or null if not possible/too costly
    const cost = this.calculateTransitionCost(
      startStance,
      endStance,
      playerState
    );
    if (cost.ki > playerState.ki || cost.stamina > playerState.stamina) {
      return null;
    }
    const effectiveness = this.calculateTransitionEffectiveness(
      startStance,
      endStance,
      playerState,
      playerState.stance
    ); // Using current stance as opponent for self-effectiveness

    const path = [startStance, endStance];
    const totalCost = cost;
    const overallEffectiveness = effectiveness;
    const cumulativeRisk = (cost.timeMilliseconds / 1000) * 0.1; // Example risk calculation

    return {
      path,
      totalCost,
      overallEffectiveness,
      cumulativeRisk,
      name: `${path[0]} → ${path[path.length - 1]}`,
      description: {
        korean: `${path[0]}에서 ${path[path.length - 1]}로의 전환`,
        english: `Transition from ${path[0]} to ${path[path.length - 1]}`,
      },
    };
  }
}
