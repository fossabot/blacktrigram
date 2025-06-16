import type { PlayerState, TrigramTransitionCost } from "../../types";
import { TrigramStance } from "../../types/enums";
import { TrigramCalculator } from "./TrigramCalculator";
import { PLAYER_ARCHETYPES_DATA } from "../../types/constants";

export interface StanceChangeResult {
  readonly success: boolean;
  readonly updatedPlayer: PlayerState;
  readonly cost: TrigramTransitionCost;
  readonly message?: string;
}

/**
 * Manager for trigram stance changes and state
 */
export class StanceManager {
  private readonly minTransitionInterval = 500;
  private currentStance?: TrigramStance;

  // Fix: Remove constructor parameter requirement
  constructor() {
    // No initialization needed
  }

  /**
   * Return the last stance we set (undefined if none yet)
   */
  public getCurrent(): TrigramStance | undefined {
    return this.currentStance;
  }

  /**
   * Attempt to change stance
   */
  changeStance(
    player: PlayerState,
    newStance: TrigramStance
  ): StanceChangeResult {
    if (player.currentStance === newStance) {
      return {
        success: true,
        updatedPlayer: player,
        message: "이미 해당 자세입니다",
      };
    }

    const cost = this.getStanceTransitionCost(
      player.currentStance,
      newStance,
      player.archetype
    );

    // Fix: Ensure player has ki and stamina properties with defaults
    const currentKi = player.ki ?? 100;
    const currentStamina = player.stamina ?? 100;

    if (currentKi < cost.ki || currentStamina < cost.stamina) {
      return {
        success: false,
        updatedPlayer: player,
        message: "자세 변경에 필요한 기력이나 체력이 부족합니다",
      };
    }

    const updatedPlayer: PlayerState = {
      ...player,
      currentStance: newStance,
      ki: Math.max(0, currentKi - cost.ki),
      stamina: Math.max(0, currentStamina - cost.stamina),
    };

    return {
      success: true,
      updatedPlayer,
      message: `${newStance} 자세로 변경되었습니다`,
    };
  }

  /**
   * Check if player can change to the specified stance
   */
  canChangeStance(player: PlayerState, newStance: TrigramStance): boolean {
    const cost = this.getStanceTransitionCost(
      player.currentStance,
      newStance,
      player
    );

    // Check resources
    if (player.ki < cost.ki || player.stamina < cost.stamina) {
      return false;
    }

    // Check cooldown
    const timeSinceLastChange = Date.now() - (player.lastStanceChangeTime || 0);
    if (timeSinceLastChange < this.minTransitionInterval) {
      return false;
    }

    // Check if player is stunned or incapacitated
    if (player.isStunned || player.consciousness < 50) {
      return false;
    }

    return true;
  }

  /**
   * Calculate the cost of transitioning between stances
   */
  getStanceTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): TrigramTransitionCost {
    if (fromStance === toStance) {
      return { ki: 0, stamina: 0, timeMilliseconds: 0 };
    }

    const baseCost = { ki: 10, stamina: 15, timeMilliseconds: 500 };
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      fromStance,
      toStance
    );
    const difficultyMultiplier = 1 + difficulty;

    // Apply archetype modifiers
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];
    const archetypeModifier = favoredStances.includes(toStance) ? 0.8 : 1.0;

    return {
      ki: Math.floor(baseCost.ki * difficultyMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * difficultyMultiplier * archetypeModifier
      ),
      timeMilliseconds: Math.floor(
        baseCost.timeMilliseconds * difficultyMultiplier
      ),
    };
  }

  /**
   * Get optimal stance recommendation
   */
  getOptimalStance(player: PlayerState, opponent?: PlayerState): TrigramStance {
    if (opponent) {
      // Get counter stance against opponent
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON; // Fix: Use enum value
  }

  /**
   * Get all valid transitions from current stance
   */
  getValidTransitions(player: PlayerState): TrigramStance[] {
    return Object.values(TrigramStance).filter(
      (
        stance // Fix: Use enum values
      ) => this.canChangeStance(player, stance)
    );
  }
}
