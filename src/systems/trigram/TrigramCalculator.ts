import type {
  PlayerState,
  TrigramStance,
  TrigramData,
  TrigramEffectivenessMatrix,
  TrigramTransitionRule,
  TrigramTransitionCost,
  TransitionPath,
  // TransitionMetrics, // Unused
  KiFlowFactors,
  StatusEffect,
  EffectIntensity, // Added
} from "../../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  // MAX_TRANSITION_COST_KI, // Not directly used here, but in StanceManager
  // MAX_TRANSITION_COST_STAMINA,
  // MAX_TRANSITION_TIME_MILLISECONDS,
  // MIN_TRANSITION_EFFECTIVENESS
} from "../../types/constants"; // Import values directly

// Define missing constants if not available globally
const TRIGRAM_RELATIONSHIP_DESCRIPTIONS = {
  /* ... */
}; // Placeholder
const BASE_KI_FLOW_RATE_PER_STANCE: Record<TrigramStance, number> = {
  // Placeholder values
  geon: 1.0,
  tae: 1.2,
  li: 0.9,
  jin: 0.8,
  son: 1.1,
  gam: 0.7,
  gan: 0.6,
  gon: 1.3,
};
const EffectIntensityEnum = {
  // Placeholder if this is an enum-like object
  WEAK: "weak",
  MODERATE: "moderate",
  STRONG: "strong",
  EXTREME: "extreme",
};

export class TrigramCalculator {
  private trigramData: Readonly<Record<TrigramStance, TrigramData>>;
  private effectivenessMatrix: TrigramEffectivenessMatrix;
  private transitionRules: readonly TrigramTransitionRule[];

  constructor(
    trigramData?: Readonly<Record<TrigramStance, TrigramData>>,
    effectivenessMatrix?: TrigramEffectivenessMatrix,
    transitionRules?: readonly TrigramTransitionRule[]
  ) {
    this.trigramData = trigramData || TRIGRAM_DATA;
    this.effectivenessMatrix =
      effectivenessMatrix || STANCE_EFFECTIVENESS_MATRIX;
    this.transitionRules =
      transitionRules || this.generateDefaultTransitionRules();
  }

  private generateDefaultTransitionRules(): readonly TrigramTransitionRule[] {
    const rules: TrigramTransitionRule[] = [];
    const stances = Object.keys(this.trigramData) as TrigramStance[];
    for (const from of stances) {
      for (const to of stances) {
        if (from === to) continue;
        rules.push({
          from,
          to,
          cost: { ki: 10, stamina: 5, timeMilliseconds: 500 }, // Default cost
        });
      }
    }
    return rules;
  }

  public getTrigramData(stance: TrigramStance): TrigramData | undefined {
    return this.trigramData[stance];
  }

  public getAllTrigramData(): Readonly<Record<TrigramStance, TrigramData>> {
    return this.trigramData;
  }

  public getEffectivenessMatrix(): TrigramEffectivenessMatrix {
    return this.effectivenessMatrix;
  }

  public getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return this.effectivenessMatrix[attackerStance]?.[defenderStance] || 1.0;
  }

  public getTrigramRelationship(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): string {
    // Placeholder implementation
    const effectiveness = this.getStanceEffectiveness(stance1, stance2);
    if (effectiveness > 1.1) return `${stance1} is strong against ${stance2}`;
    if (effectiveness < 0.9) return `${stance1} is weak against ${stance2}`;
    return `${stance1} and ${stance2} are neutral`;
    // return TRIGRAM_RELATIONSHIP_DESCRIPTIONS[stance1]?.[stance2] || "Neutral";
  }

  public getKiRecoveryRate(playerState: PlayerState): number {
    const baseRate = BASE_KI_FLOW_RATE_PER_STANCE[playerState.stance] || 1.0;
    let modifier = 1.0;

    // Example: Modify based on health
    if (playerState.health < playerState.maxHealth * 0.3) {
      modifier *= 0.5; // Reduced Ki recovery at low health
    }

    // Example: Modify based on active effects
    playerState.activeEffects?.forEach((effect) => {
      if (effect.type === "ki_regen_boost" /* EffectType.KI_REGEN_BOOST */) {
        // Assuming EffectType exists
        modifier *=
          1 + (effect.intensity === EffectIntensityEnum.STRONG ? 0.5 : 0.25);
      } else if (
        effect.type === "ki_regen_debuff" /* EffectType.KI_REGEN_DEBUFF */
      ) {
        modifier *=
          1 - (effect.intensity === EffectIntensityEnum.STRONG ? 0.5 : 0.25);
      }
    });

    return baseRate * modifier;
  }

  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState // Added playerState for context
  ): TrigramTransitionCost {
    const rule = this.transitionRules.find(
      (r) => r.from === fromStance && r.to === toStance
    );
    let baseCost: TrigramTransitionCost = rule?.cost || {
      ki: 15, // Default if no rule found
      stamina: 10,
      timeMilliseconds: 700,
    };

    // Modify cost based on player state (e.g., low stamina increases Ki cost)
    if (playerState.stamina < playerState.maxStamina * 0.25) {
      baseCost = { ...baseCost, ki: baseCost.ki * 1.5 };
    }
    if (playerState.ki < playerState.maxKi * 0.25) {
      baseCost = { ...baseCost, stamina: baseCost.stamina * 1.5 };
    }

    return baseCost;
  }

  public calculateOptimalPath(
    currentStance: TrigramStance,
    targetOpponentStance: TrigramStance,
    playerState: PlayerState, // Added playerState
    maxDepth: number = 3
  ): TransitionPath | null {
    // Placeholder for a more complex pathfinding algorithm (e.g., A* or Dijkstra)
    // This simplified version just considers direct transition
    const directCost = this.calculateTransitionCost(
      currentStance,
      targetOpponentStance,
      playerState
    );
    const effectiveness = this.getStanceEffectiveness(
      targetOpponentStance,
      targetOpponentStance
    ); // Effectiveness of being IN target stance vs opponent

    if (
      directCost.ki <= playerState.ki &&
      directCost.stamina <= playerState.stamina
    ) {
      return {
        path: [currentStance, targetOpponentStance],
        totalCost: directCost,
        overallEffectiveness: effectiveness,
        cumulativeRisk: 0.1, // Placeholder risk
      };
    }
    return null;
  }

  public getStanceTechnique(
    stance: TrigramStance
  ): KoreanTechnique | undefined {
    return this.trigramData[stance]?.technique;
  }

  public getStancePhilosophy(stance: TrigramStance): string | undefined {
    return this.trigramData[stance]?.philosophy;
  }

  public getStanceElement(stance: TrigramStance): string | undefined {
    return this.trigramData[stance]?.element;
  }

  public getStanceColor(stance: TrigramStance): number | undefined {
    const colorStr = this.trigramData[stance]?.color;
    if (typeof colorStr === "number") return colorStr;
    // if (typeof colorStr === 'string' && colorStr.startsWith('#')) return parseInt(colorStr.substring(1), 16); // If color can be string
    return undefined;
  }

  public getStanceStrengths(
    stance: TrigramStance
  ): readonly TrigramStance[] | undefined {
    return this.trigramData[stance]?.strength;
  }

  public getStanceWeaknesses(
    stance: TrigramStance
  ): readonly TrigramStance[] | undefined {
    return this.trigramData[stance]?.weakness;
  }

  public getApplicableStatusEffects(
    stance: TrigramStance,
    targetPlayerState: PlayerState // Consider target's state
  ): readonly StatusEffect[] {
    const stanceData = this.trigramData[stance];
    const effects: StatusEffect[] = [];

    // Example: Geon stance might apply a 'focused' buff
    if (stance === "geon") {
      effects.push({
        id: "geon_focus",
        type: "focused" as EffectType, // Assuming 'focused' is a valid EffectType
        intensity: EffectIntensityEnum.MODERATE as EffectIntensity,
        duration: 5000, // 5 seconds
        description: { korean: "집중력 향상", english: "Increased Focus" },
        stackable: false,
      });
    }
    // Add more stance-specific effects based on game design
    return effects;
  }

  public getTransitionRulesForStance(
    stance: TrigramStance
  ): readonly TrigramTransitionRule[] {
    return this.transitionRules.filter((rule) => rule.from === stance);
  }

  public getPossibleTransitions(
    playerState: PlayerState
  ): readonly TrigramStance[] {
    const currentStance = playerState.stance;
    const possible: TrigramStance[] = [];
    const rules = this.getTransitionRulesForStance(currentStance);
    for (const rule of rules) {
      if (
        playerState.ki >= rule.cost.ki &&
        playerState.stamina >= rule.cost.stamina
      ) {
        possible.push(rule.to);
      }
    }
    return possible;
  }

  public getKiFlowFactors(
    playerState: PlayerState,
    opponentStance?: TrigramStance
  ): KiFlowFactors {
    return {
      currentStance: playerState.stance,
      // targetStance: undefined, // This would be for a specific transition calculation
      playerHealthPercent: playerState.health / playerState.maxHealth,
      playerStaminaPercent: playerState.stamina / playerState.maxStamina,
      playerKiPercent: playerState.ki / playerState.maxKi,
      activeEffects: playerState.activeEffects,
      // distanceToOpponent: undefined, // Needs to be calculated elsewhere
      // stanceAffinity: undefined, // Player-specific data
    };
  }
}
