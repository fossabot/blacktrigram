import type { PlayerState } from "../../types/player";
import type { TrigramStance } from "../../types/enums";
import { TRIGRAM_DATA } from "../../types/constants/trigram";
import { PLAYER_ARCHETYPES_DATA } from "../../types/constants/player";

export interface StanceTransitionResult {
  readonly success: boolean;
  readonly cost?: {
    readonly ki: number;
    readonly stamina: number;
    readonly timeMilliseconds: number;
  };
  readonly message: string;
  readonly updatedPlayer?: PlayerState;
}

export class StanceManager {
  private activeStance: TrigramStance | null = null;
  private lastTransitionTime = 0;
  private readonly cooldownDuration = 1000; // 1 second cooldown

  /**
   * Gets the current active stance
   */
  getCurrent(): TrigramStance | null {
    return this.activeStance;
  }

  /**
   * Changes the player's stance if they have sufficient resources
   */
  changeStance(
    player: PlayerState,
    newStance: TrigramStance
  ): StanceTransitionResult {
    // Check if stance is the same
    if (player.currentStance === newStance) {
      return {
        success: true,
        cost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        message: "Already in this stance",
        updatedPlayer: player,
      };
    }

    // Check cooldown
    const now = Date.now();
    if (now - this.lastTransitionTime < this.cooldownDuration) {
      return {
        success: false,
        message: "Stance change on cooldown",
        updatedPlayer: player,
      };
    }

    // Calculate transition cost
    const cost = this.getStanceTransitionCost(
      player,
      player.currentStance,
      newStance
    );

    // Check if player has sufficient resources
    if (player.ki < cost.ki || player.stamina < cost.stamina) {
      return {
        success: false,
        message: "Insufficient resources for stance change",
        updatedPlayer: player,
      };
    }

    // Perform the stance change
    this.activeStance = newStance;
    this.lastTransitionTime = now;

    const updatedPlayer: PlayerState = {
      ...player,
      currentStance: newStance,
      ki: Math.max(0, player.ki - cost.ki),
      stamina: Math.max(0, player.stamina - cost.stamina),
      lastStanceChangeTime: now,
    };

    return {
      success: true,
      cost,
      message: `Successfully changed to ${newStance} stance`,
      updatedPlayer,
    };
  }

  /**
   * Checks if a stance change is possible
   */
  canChangeStance(
    player: PlayerState,
    newStance: TrigramStance
  ): boolean {
    if (player.currentStance === newStance) return true;

    const now = Date.now();
    if (now - this.lastTransitionTime < this.cooldownDuration) return false;

    const cost = this.getStanceTransitionCost(
      player,
      player.currentStance,
      newStance
    );

    return player.ki >= cost.ki && player.stamina >= cost.stamina;
  }

  /**
   * Calculates the cost of transitioning between stances
   */
  getStanceTransitionCost(
    player: PlayerState,
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): { readonly ki: number; readonly stamina: number; readonly timeMilliseconds: number } {
    // Same stance has no cost
    if (fromStance === toStance) {
      return { ki: 0, stamina: 0, timeMilliseconds: 0 };
    }

    // Base transition cost
    const baseCost = {
      ki: 15,
      stamina: 10,
      timeMilliseconds: 500,
    };

    // Get stance data for difficulty calculation
    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];

    if (!fromData || !toData) {
      return baseCost;
    }

    // Calculate difficulty modifier based on stance compatibility
    const difficultyModifier = this.calculateDifficultyModifier(fromStance, toStance);

    // Apply archetype modifiers with safety check
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData?.favoredStances || [];
    const archetypeModifier = favoredStances.includes(toStance) ? 0.8 : 1.0;

    // Calculate final costs
    const finalKiCost = Math.round(baseCost.ki * difficultyModifier * archetypeModifier);
    const finalStaminaCost = Math.round(baseCost.stamina * difficultyModifier * archetypeModifier);
    const finalTimeCost = Math.round(baseCost.timeMilliseconds * difficultyModifier);

    return {
      ki: finalKiCost,
      stamina: finalStaminaCost,
      timeMilliseconds: finalTimeCost,
    };
  }

  /**
   * Gets the optimal stance against an opponent
   */
  getOptimalStance(player: PlayerState, opponent?: PlayerState): TrigramStance {
    // Get archetype preferences
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype] || {
      favoredStances: [],
    };
    const favoredStances = archetypeData.favoredStances || [];

    // If no opponent, return first favored stance or default
    if (!opponent) {
      return favoredStances.length > 0
        ? (favoredStances[0] as TrigramStance)
        : player.currentStance;
    }

    // If player has a favored stance that's effective, use it
    for (const stance of favoredStances) {
      const effectiveness = this.calculateStanceEffectiveness(
        stance as TrigramStance,
        opponent.currentStance
      );
      if (effectiveness > 1.0) {
        return stance as TrigramStance;
      }
    }

    // Otherwise, find the most effective stance
    const stances = Object.keys(TRIGRAM_DATA) as TrigramStance[];
    let bestStance = player.currentStance;
    let bestEffectiveness = 0;

    for (const stance of stances) {
      const effectiveness = this.calculateStanceEffectiveness(
        stance,
        opponent.currentStance
      );

      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness;
        bestStance = stance;
      }
    }

    return bestStance;
  }

  /**
   * Calculates difficulty modifier based on stance transition
   */
  private calculateDifficultyModifier(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    // Define stance relationships (simplified)
    const stanceOrder = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    const fromIndex = stanceOrder.indexOf(fromStance);
    const toIndex = stanceOrder.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) return 1.0;

    // Adjacent stances are easier to transition to
    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      stanceOrder.length - Math.abs(toIndex - fromIndex)
    );

    switch (distance) {
      case 1:
        return 0.8; // Adjacent stances
      case 2:
        return 1.0; // Two steps away
      case 3:
        return 1.2; // Three steps away
      case 4:
        return 1.5; // Opposite stance (maximum difficulty)
      default:
        return 1.0;
    }
  }

  /**
   * Calculates stance effectiveness (simplified)
   */
  private calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Simplified effectiveness matrix
    const effectiveness: Record<string, Record<string, number>> = {
      geon: {
        tae: 1.2,
        li: 1.0,
        jin: 0.8,
        son: 1.1,
        gam: 0.9,
        gan: 1.3,
        gon: 0.7,
      },
      tae: {
        geon: 0.8,
        li: 1.2,
        jin: 1.0,
        son: 0.9,
        gam: 1.1,
        gan: 0.7,
        gon: 1.3,
      },
      li: {
        geon: 1.0,
        tae: 0.8,
        jin: 1.2,
        son: 1.3,
        gam: 0.7,
        gan: 0.9,
        gon: 1.1,
      },
      jin: {
        geon: 1.2,
        tae: 1.0,
        li: 0.8,
        son: 0.7,
        gam: 1.3,
        gan: 1.1,
        gon: 0.9,
      },
      son: {
        geon: 0.9,
        tae: 1.1,
        li: 0.7,
        jin: 1.3,
        gam: 1.2,
        gan: 1.0,
        gon: 0.8,
      },
      gam: {
        geon: 1.1,
        tae: 0.9,
        li: 1.3,
        jin: 0.7,
        son: 0.8,
        gan: 1.2,
        gon: 1.0,
      },
      gan: {
        geon: 0.7,
        tae: 1.3,
        li: 1.1,
        jin: 0.9,
        son: 1.0,
        gam: 0.8,
        gan: 1.2,
      },
      gon: {
        geon: 1.3,
        tae: 0.7,
        li: 0.9,
        jin: 1.1,
        son: 1.2,
        gam: 1.0,
        gan: 0.8,
      },
    };

    return effectiveness[attackerStance]?.[defenderStance] || 1.0;
  }

  /**
   * Gets the current active stance
   */
  getActiveStance(): TrigramStance | null {
    return this.activeStance;
  }

  /**
   * Resets the stance manager
   */
  reset(): void {
    this.activeStance = null;
    this.lastTransitionTime = 0;
  }
}

export const stanceManager = new StanceManager();
