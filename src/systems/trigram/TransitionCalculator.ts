import type {
  PlayerState,
  TrigramStance,
  TrigramTransitionRule,
  TrigramTransitionCost,
  TransitionPath,
  PlayerArchetype, // Added for archetype specific logic
  StatusEffect, // Added for effect specific logic
  EffectType, // Added for effect type checking
} from "../../types";
import {
  TRIGRAM_DATA as AllTrigramDataImport,
  STANCE_EFFECTIVENESS_MATRIX as GlobalEffectivenessMatrixImport,
} from "../../types/constants";

type AllTrigramDataMap = typeof AllTrigramDataImport; // Renamed for clarity
type GlobalEffectivenessMatrixType = typeof GlobalEffectivenessMatrixImport; // Renamed for clarity

export class TransitionCalculator {
  private trigramData: AllTrigramDataMap;
  private effectivenessMatrix: GlobalEffectivenessMatrixType;
  private transitionRulesInternal: readonly TrigramTransitionRule[];

  constructor(
    trigramData?: AllTrigramDataMap,
    effectivenessMatrix?: GlobalEffectivenessMatrixType,
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
        const effectiveness = this.effectivenessMatrix[from]?.[to] || 1.0;

        rules.push({
          from,
          to,
          cost: { ki: kiCost, stamina: staminaCost, timeMilliseconds: timeMs },
          effectiveness: effectiveness,
          conditions: [],
          description: {
            korean: `${this.trigramData[from].name.korean} 에서 ${this.trigramData[to].name.korean} 로`,
            english: `From ${this.trigramData[from].name.english} to ${this.trigramData[to].name.english}`,
          },
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
      (r: TrigramTransitionRule) => r.from === from && r.to === to // Added type for r
    );
  }

  private calculateRisk(
    cost: TrigramTransitionCost
    // path: readonly TrigramStance[] // path parameter was unused
  ): number {
    // Risk could be based on time, ki/stamina percentage cost, etc.
    const timeRisk = (cost.timeMilliseconds / 1000) * 0.1; // Example: 10% risk factor per second
    // const resourceRisk = (cost.ki / 100) * 0.05 + (cost.stamina / 100) * 0.05; // Example
    return Math.min(timeRisk, 1.0); // Cap risk at 1.0
  }

  public calculateTransitionCost(
    // Public method
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    const rule = this.getTransitionRule(fromStance, toStance);
    let baseCost = rule?.cost || { ki: 15, stamina: 10, timeMilliseconds: 700 };

    let kiModifier = 1.0;
    let staminaModifier = 1.0;
    let timeModifier = 1.0;

    if (playerState.ki / playerState.maxKi < 0.3) kiModifier *= 1.5;
    if (playerState.stamina / playerState.maxStamina < 0.3)
      staminaModifier *= 1.5;

    playerState.activeEffects?.forEach((effect: StatusEffect) => {
      // Added type for effect
      if (effect.type === ("exhausted" as EffectType)) {
        // Cast to EffectType
        kiModifier *= 1.2;
        staminaModifier *= 1.2;
        timeModifier *= 1.1;
      }
    });

    const archetype = playerState.archetype as PlayerArchetype; // Cast for type safety
    if (
      archetype === "amsalja" &&
      (toStance === "son" || fromStance === "son")
    ) {
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
    _fromStance: TrigramStance, // Mark as unused if not used
    toStance: TrigramStance,
    playerState: PlayerState,
    opponentStance?: TrigramStance
  ): number {
    let effectiveness = 1.0;
    if (opponentStance) {
      effectiveness =
        this.effectivenessMatrix[toStance]?.[opponentStance] || 1.0;
    } else {
      // General effectiveness of being in 'toStance'
      // Could be based on player's affinity, or inherent stance bonuses
      effectiveness =
        this.trigramData[toStance]?.offensiveBonus ||
        this.trigramData[toStance]?.defensiveBonus ||
        1.0;
    }

    if (playerState.health / playerState.maxHealth < 0.4) {
      if (["geon", "jin", "li"].includes(toStance)) effectiveness *= 0.8;
      if (["gan", "gon"].includes(toStance)) effectiveness *= 1.1;
    }

    // Example: Archetype influence on effectiveness of transitioning TO a stance
    const archetype = playerState.archetype as PlayerArchetype;
    if (archetype === "musa" && (toStance === "geon" || toStance === "jin")) {
      effectiveness *= 1.1; // Musa more effective transitioning to their preferred stances
    }

    return Math.max(0.1, Math.min(2.0, effectiveness));
  }

  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState,
    opponentStance?: TrigramStance
  ): TransitionPath | null {
    const cost = this.calculateTransitionCost(
      fromStance,
      toStance,
      playerState
    );

    if (cost.ki > playerState.ki || cost.stamina > playerState.stamina) {
      return null;
    }

    const overallEffectiveness = this.calculateTransitionEffectiveness(
      fromStance,
      toStance,
      playerState,
      opponentStance
    );

    const path = [fromStance, toStance];
    const cumulativeRisk = this.calculateRisk(cost); // Pass only cost

    const fromName = this.trigramData[fromStance]?.name;
    const toName = this.trigramData[toStance]?.name;

    return {
      path,
      totalCost: cost,
      // overallEffectiveness, // This was causing an error, ensure TransitionPath type matches
      // If overallEffectiveness is part of TransitionPath, it should be assigned here:
      overallEffectiveness: overallEffectiveness,
      cumulativeRisk,
      name: `${fromName?.english || fromStance} → ${
        toName?.english || toStance
      }`,
      description: {
        korean: `${fromName?.korean || fromStance}에서 ${
          toName?.korean || toStance
        }로의 최적 경로`,
        english: `Optimal path from ${fromName?.english || fromStance} to ${
          toName?.english || toStance
        }`,
      },
    };
  }
}
