import type {
  PlayerState,
  TrigramStance,
  TrigramData,
  TrigramEffectivenessMatrix,
  TrigramTransitionRule,
  TrigramTransitionCost,
  TransitionPath,
  KiFlowFactors,
  EffectIntensity,
  KoreanTechnique,
  StatusEffect,
  PlayerArchetype,
} from "../../types";
import { EffectType } from "../../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
} from "../../types/constants";

// Define missing constants if not available globally
const BASE_KI_FLOW_RATE_PER_STANCE: Record<TrigramStance, number> = {
  geon: 1.0,
  tae: 1.2,
  li: 0.9,
  jin: 0.8,
  son: 1.1,
  gam: 0.7,
  gan: 0.6,
  gon: 1.3,
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
          cost: { ki: 10, stamina: 5, timeMilliseconds: 500 },
          effectiveness: 1.0, // Add missing property
          conditions: [], // Add optional property
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
    const effectiveness = this.getStanceEffectiveness(stance1, stance2);
    if (effectiveness > 1.1) return `${stance1} is strong against ${stance2}`;
    if (effectiveness < 0.9) return `${stance1} is weak against ${stance2}`;
    return `${stance1} and ${stance2} are neutral`;
  }

  public getKiRecoveryRate(playerState: PlayerState): number {
    const baseRate = BASE_KI_FLOW_RATE_PER_STANCE[playerState.stance] || 1.0;
    let modifier = 1.0;

    // Modify based on health
    if (playerState.health < playerState.maxHealth * 0.3) {
      modifier *= 0.5;
    }

    // Modify based on active effects
    playerState.activeEffects?.forEach((effect) => {
      if (effect.type === "ki_regen_boost") {
        modifier *= 1 + (effect.intensity === "strong" ? 0.5 : 0.25);
      } else if (effect.type === "ki_regen_debuff") {
        modifier *= 1 - (effect.intensity === "strong" ? 0.5 : 0.25);
      }
    });

    return baseRate * modifier;
  }

  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): TrigramTransitionCost {
    const rule = this.transitionRules.find(
      (r) => r.from === fromStance && r.to === toStance
    );
    let baseCost: TrigramTransitionCost = rule?.cost || {
      ki: 15,
      stamina: 10,
      timeMilliseconds: 700,
    };

    // Modify cost based on player state
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
    playerState: PlayerState,
    _maxDepth: number = 3 // Prefixed with underscore to indicate unused
  ): TransitionPath | null {
    const directCost = this.calculateTransitionCost(
      currentStance,
      targetOpponentStance,
      playerState
    );
    const effectiveness = this.getStanceEffectiveness(
      targetOpponentStance,
      targetOpponentStance
    );

    if (
      directCost.ki <= playerState.ki &&
      directCost.stamina <= playerState.stamina
    ) {
      return {
        path: [currentStance, targetOpponentStance],
        totalCost: directCost,
        overallEffectiveness: effectiveness,
        cumulativeRisk: 0.1,
        name: `${currentStance} → ${targetOpponentStance}`,
        description: {
          korean: `${currentStance}에서 ${targetOpponentStance}로의 전환`,
          english: `Transition from ${currentStance} to ${targetOpponentStance}`,
        },
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
    const color = this.trigramData[stance]?.color;
    return typeof color === "number" ? color : undefined;
  }

  // Note: strength and weakness properties don't exist in TrigramData
  // These methods return undefined for now, but could be implemented
  // based on the effectiveness matrix
  public getStanceStrengths(
    stance: TrigramStance
  ): readonly TrigramStance[] | undefined {
    const strengths: TrigramStance[] = [];
    const stances = Object.keys(this.trigramData) as TrigramStance[];

    for (const target of stances) {
      if (this.getStanceEffectiveness(stance, target) > 1.1) {
        strengths.push(target);
      }
    }

    return strengths.length > 0 ? strengths : undefined;
  }

  public getStanceWeaknesses(
    stance: TrigramStance
  ): readonly TrigramStance[] | undefined {
    const weaknesses: TrigramStance[] = [];
    const stances = Object.keys(this.trigramData) as TrigramStance[];

    for (const target of stances) {
      if (this.getStanceEffectiveness(stance, target) < 0.9) {
        weaknesses.push(target);
      }
    }

    return weaknesses.length > 0 ? weaknesses : undefined;
  }

  public getApplicableStatusEffects(
    stance: TrigramStance,
    _targetPlayerState: PlayerState // Prefixed with underscore to indicate unused
  ): readonly StatusEffect[] {
    const effects: StatusEffect[] = [];

    // Example: Geon stance might apply a 'focused' buff
    if (stance === "geon") {
      effects.push({
        id: "geon_focus",
        type: "focused" as EffectType,
        intensity: "moderate" as EffectIntensity,
        duration: 5000,
        description: { korean: "집중력 향상", english: "Increased Focus" },
        stackable: false,
      });
    }

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
      playerLevelModifier: 1.0,
      stanceAffinity: this.getStanceAffinity(
        playerState.stance,
        playerState.archetype // Correct order: stance, archetype
      ),
    };
  }

  calculateOptimalKiFlow(
    playerState: PlayerState,
    opponentStance?: TrigramStance
  ): number {
    const factors: KiFlowFactors = {
      playerLevelModifier: this.getPlayerLevelModifier(playerState),
      stanceAffinity: this.getStanceAffinity(
        playerState.stance,
        playerState.archetype // Correct order: stance, archetype
      ),
    };

    const baseKiFlow = BASE_KI_FLOW_RATE_PER_STANCE[playerState.stance] || 1.0;

    let modifiedFlow = baseKiFlow;
    if (factors.playerLevelModifier) {
      modifiedFlow *= factors.playerLevelModifier;
    }
    if (factors.stanceAffinity) {
      modifiedFlow *= factors.stanceAffinity;
    }

    // Apply opponent stance modifier if provided
    if (opponentStance) {
      const effectiveness = this.getStanceEffectiveness(
        playerState.stance,
        opponentStance
      );
      modifiedFlow *= effectiveness;
    }

    return Math.max(0.1, modifiedFlow); // Ensure minimum flow
  }

  // Add missing method
  private getPlayerLevelModifier(playerState: PlayerState): number {
    // Implementation for player level modifier calculation
    const baseLevel = 1.0;
    const healthModifier = playerState.health / playerState.maxHealth;
    const staminaModifier = playerState.stamina / playerState.maxStamina;

    return baseLevel * Math.max(0.5, (healthModifier + staminaModifier) / 2);
  }

  // Fix method signature - should take stance and archetype separately
  private getStanceAffinity(
    stance: TrigramStance,
    archetype: PlayerArchetype
  ): number {
    // Implementation for stance affinity calculation
    const affinityMap: Record<
      PlayerArchetype,
      Record<TrigramStance, number>
    > = {
      musa: {
        geon: 1.2,
        jin: 1.1,
        tae: 1.0,
        li: 0.9,
        son: 0.9,
        gam: 0.8,
        gan: 1.0,
        gon: 1.0,
      },
      amsalja: {
        son: 1.2,
        gam: 1.1,
        geon: 0.9,
        tae: 1.0,
        li: 1.0,
        jin: 0.8,
        gan: 1.0,
        gon: 0.9,
      },
      hacker: {
        li: 1.2,
        tae: 1.1,
        geon: 1.0,
        jin: 0.9,
        son: 1.0,
        gam: 0.8,
        gan: 0.9,
        gon: 0.8,
      },
      jeongbo: {
        gan: 1.2,
        gon: 1.1,
        geon: 1.0,
        tae: 0.9,
        li: 0.9,
        jin: 0.8,
        son: 1.0,
        gam: 1.0,
      },
      jojik: {
        jin: 1.2,
        gam: 1.1,
        geon: 0.8,
        tae: 0.9,
        li: 1.0,
        son: 0.9,
        gan: 0.8,
        gon: 1.0,
      },
    };

    return affinityMap[archetype]?.[stance] || 1.0;
  }
}
