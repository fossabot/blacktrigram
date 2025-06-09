import type {
  PlayerState,
  KoreanTechnique,
  TrigramData,
  TrigramTransitionCost,
  TransitionPath,
} from "../types";
import { TrigramStance } from "../types/enums";
import { TRIGRAM_DATA } from "../types/constants";

/**
 * Trigram system for Korean martial arts stance management
 */
export class TrigramSystem {
  /**
   * Check if a stance transition is valid
   */
  public canTransitionTo(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): boolean {
    if (fromStance === toStance) return true;

    const cost = this.calculateTransitionCost(fromStance, toStance);
    return playerState.ki >= cost.ki && playerState.stamina >= cost.stamina;
  }

  /**
   * Calculate the cost of transitioning between stances
   */
  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TrigramTransitionCost {
    if (fromStance === toStance) {
      return { ki: 0, stamina: 0, time: 0 };
    }

    // Base costs for stance transitions
    const baseCost = {
      ki: 15,
      stamina: 10,
      time: 500,
    };

    // Adjacency modifier (some stances flow more naturally)
    const modifier = this.getStanceAdjacencyModifier(fromStance, toStance);

    return {
      ki: Math.floor(baseCost.ki * modifier),
      stamina: Math.floor(baseCost.stamina * modifier),
      time: Math.floor(baseCost.time * modifier),
    };
  }

  /**
   * Execute a stance transition
   */
  public executeStanceTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): { success: boolean; updatedPlayer: PlayerState; path?: TransitionPath } {
    if (!this.canTransitionTo(fromStance, toStance, playerState)) {
      return { success: false, updatedPlayer: playerState };
    }

    const cost = this.calculateTransitionCost(fromStance, toStance);

    const updatedPlayer: PlayerState = {
      ...playerState,
      currentStance: toStance,
      ki: Math.max(0, playerState.ki - cost.ki),
      stamina: Math.max(0, playerState.stamina - cost.stamina),
      lastStanceChangeTime: Date.now(),
    };

    const transitionPath: TransitionPath = {
      from: fromStance,
      to: toStance,
      cost,
    };

    return {
      success: true,
      updatedPlayer,
      path: transitionPath,
    };
  }

  /**
   * Get the effectiveness multiplier between stances
   */
  public getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Simple effectiveness matrix - can be expanded
    const effectiveness: Record<
      TrigramStance,
      Partial<Record<TrigramStance, number>>
    > = {
      [TrigramStance.GEON]: {
        [TrigramStance.GON]: 1.2,
        [TrigramStance.SON]: 0.8,
      },
      [TrigramStance.TAE]: {
        [TrigramStance.JIN]: 1.2,
        [TrigramStance.GAN]: 0.8,
      },
      [TrigramStance.LI]: {
        [TrigramStance.GAM]: 1.2,
        [TrigramStance.TAE]: 0.8,
      },
      [TrigramStance.JIN]: {
        [TrigramStance.SON]: 1.2,
        [TrigramStance.GEON]: 0.8,
      },
      [TrigramStance.SON]: {
        [TrigramStance.GON]: 1.2,
        [TrigramStance.LI]: 0.8,
      },
      [TrigramStance.GAM]: {
        [TrigramStance.LI]: 1.2,
        [TrigramStance.JIN]: 0.8,
      },
      [TrigramStance.GAN]: {
        [TrigramStance.TAE]: 1.2,
        [TrigramStance.GAM]: 0.8,
      },
      [TrigramStance.GON]: {
        [TrigramStance.GEON]: 1.2,
        [TrigramStance.SON]: 0.8,
      },
    };

    return effectiveness[attackerStance]?.[defenderStance] ?? 1.0;
  }

  /**
   * Get stance data - Fix: Include required name property
   */
  public getStanceData(stance: TrigramStance): TrigramData {
    const stanceData = TRIGRAM_DATA[stance];

    // Fix: Return proper TrigramData structure with required name property
    return {
      id: stance,
      name: stanceData.name, // Fix: Add required name property
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      // Fix: Create proper TrigramTheme from theme data
      theme: {
        primary: stanceData.theme.primary,
        secondary: stanceData.theme.secondary,
        active: stanceData.theme.primary,
        hover: stanceData.theme.secondary,
        text: 0xffffff,
      },
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get available techniques for a stance
   */
  public getStanceTechniques(stance: TrigramStance): KoreanTechnique[] {
    const stanceData = TRIGRAM_DATA[stance];

    if (!stanceData?.techniques?.primary) {
      return [];
    }

    const primary = stanceData.techniques.primary;
    return [
      {
        id: `${stance}_primary`,
        name: {
          korean: primary.korean,
          english: primary.english,
          romanized: primary.korean,
        },
        koreanName: primary.korean,
        englishName: primary.english,
        romanized: primary.korean,
        description: primary.description,
        stance,
        type: "strike" as any,
        damageType: "blunt" as any,
        damage: primary.damage,
        damageRange: {
          min: primary.damage - 5,
          max: primary.damage + 5,
        },
        range: 1.0,
        kiCost: primary.kiCost,
        staminaCost: primary.staminaCost,
        accuracy: primary.hitChance,
        executionTime: 500,
        recoveryTime: 800,
        critChance: primary.criticalChance || 0.1,
        critMultiplier: 1.5,
        effects: [],
      },
    ];
  }

  /**
   * Get the primary technique for a stance
   */
  public getStancePrimaryTechnique(
    stance: TrigramStance
  ): KoreanTechnique | null {
    const techniques = this.getStanceTechniques(stance);
    return techniques[0] || null;
  }

  /**
   * Get optimal stance for a player's archetype
   */
  public getOptimalStanceForArchetype(player: PlayerState): TrigramStance {
    // Simple archetype-stance mapping
    const archetypeStances: Record<string, TrigramStance> = {
      musa: TrigramStance.GEON,
      amsalja: TrigramStance.SON,
      hacker: TrigramStance.LI,
      jeongbo_yowon: TrigramStance.GAN,
      jojik_pokryeokbae: TrigramStance.JIN,
    };

    return archetypeStances[player.archetype] || TrigramStance.GEON;
  }

  /**
   * Calculate stance adjacency modifier for transition costs
   */
  private getStanceAdjacencyModifier(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    // Adjacent stances have lower transition costs
    const adjacencyMap: Record<TrigramStance, TrigramStance[]> = {
      [TrigramStance.GEON]: [TrigramStance.TAE, TrigramStance.GON],
      [TrigramStance.TAE]: [TrigramStance.GEON, TrigramStance.LI],
      [TrigramStance.LI]: [TrigramStance.TAE, TrigramStance.JIN],
      [TrigramStance.JIN]: [TrigramStance.LI, TrigramStance.SON],
      [TrigramStance.SON]: [TrigramStance.JIN, TrigramStance.GAM],
      [TrigramStance.GAM]: [TrigramStance.SON, TrigramStance.GAN],
      [TrigramStance.GAN]: [TrigramStance.GAM, TrigramStance.GON],
      [TrigramStance.GON]: [TrigramStance.GAN, TrigramStance.GEON],
    };

    return adjacencyMap[from]?.includes(to) ? 0.7 : 1.0;
  }

  /**
   * Update player stance state over time
   */
  public updatePlayerStanceState(
    player: PlayerState,
    deltaTime: number
  ): PlayerState {
    return {
      ...player,
      // Add any stance-specific updates here
      ki: Math.min(player.maxKi, player.ki + (2 * deltaTime) / 1000),
      stamina: Math.min(
        player.maxStamina,
        player.stamina + (5 * deltaTime) / 1000
      ),
    };
  }
}
