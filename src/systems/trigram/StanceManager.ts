import type {
  PlayerState,
  TrigramStance,
  TrigramTransitionCost,
  TransitionPath,
  StanceTransition,
} from "../../types";
import type { TrigramCalculator } from "./TrigramCalculator";
import type { StanceTransitionResult } from "../../types/trigram";

// Import constants or define them if they are specific to this module
import {
  MAX_TRANSITION_COST_KI,
  MAX_TRANSITION_COST_STAMINA,
  MAX_TRANSITION_TIME_MILLISECONDS,
  // MIN_TRANSITION_EFFECTIVENESS is not used in this implementation
} from "../../types/constants";

// Default cooldown for stance changes (in milliseconds)
const DEFAULT_STANCE_COOLDOWN_MS = 500;

export class StanceManager {
  private trigramCalculator: TrigramCalculator;
  // private config: StanceManagerConfig; // If you have specific config for StanceManager

  constructor(
    trigramCalculator: TrigramCalculator
    // config?: StanceManagerConfig
  ) {
    this.trigramCalculator = trigramCalculator;
    // this.config = { ...defaultConfig, ...config };
  }

  public changeStance(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): StanceTransition {
    const now = Date.now();
    // Use default cooldown since stanceChangeCooldownMs doesn't exist in TrigramData
    const cooldown = DEFAULT_STANCE_COOLDOWN_MS;

    if (
      playerState.lastStanceChangeTime &&
      now - playerState.lastStanceChangeTime < cooldown
    ) {
      return {
        success: false,
        from: playerState.stance,
        to: targetStance,
        cost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        newState: playerState,
        reason: `cooldown_active: ${
          cooldown - (now - playerState.lastStanceChangeTime)
        }ms remaining`,
        timestamp: now,
      };
    }

    const cost = this.trigramCalculator.calculateTransitionCost(
      playerState.stance,
      targetStance,
      playerState
    );

    if (playerState.ki < cost.ki) {
      return {
        success: false,
        from: playerState.stance,
        to: targetStance,
        cost,
        newState: playerState,
        reason: "insufficient_ki",
        timestamp: now,
      };
    }
    if (playerState.stamina < cost.stamina) {
      return {
        success: false,
        from: playerState.stance,
        to: targetStance,
        cost,
        newState: playerState,
        reason: "insufficient_stamina",
        timestamp: now,
      };
    }

    const newPlayerState: PlayerState = {
      ...playerState,
      stance: targetStance,
      ki: playerState.ki - cost.ki,
      stamina: playerState.stamina - cost.stamina,
      lastStanceChangeTime: now,
    };

    return {
      success: true,
      from: playerState.stance,
      to: targetStance,
      cost,
      newState: newPlayerState,
      timestamp: now,
    };
  }

  public canTransitionTo(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): { possible: boolean; reason?: string; cost?: TrigramTransitionCost } {
    const now = Date.now();
    const cooldown = DEFAULT_STANCE_COOLDOWN_MS;

    if (
      playerState.lastStanceChangeTime &&
      now - playerState.lastStanceChangeTime < cooldown
    ) {
      return { possible: false, reason: "cooldown_active" };
    }

    const cost = this.trigramCalculator.calculateTransitionCost(
      playerState.stance,
      targetStance,
      playerState
    );

    if (playerState.ki < cost.ki) {
      return { possible: false, reason: "insufficient_ki", cost };
    }
    if (playerState.stamina < cost.stamina) {
      return { possible: false, reason: "insufficient_stamina", cost };
    }
    // Check against MAX constants
    if (cost.ki > MAX_TRANSITION_COST_KI) {
      return { possible: false, reason: "exceeds_max_ki_cost", cost };
    }
    if (cost.stamina > MAX_TRANSITION_COST_STAMINA) {
      return { possible: false, reason: "exceeds_max_stamina_cost", cost };
    }
    if (cost.timeMilliseconds > MAX_TRANSITION_TIME_MILLISECONDS) {
      return { possible: false, reason: "exceeds_max_transition_time", cost };
    }

    return { possible: true, cost };
  }

  public findOptimalStancePath(
    playerState: PlayerState,
    opponentStance: TrigramStance,
    maxDepth: number = 3
  ): TransitionPath | null {
    return this.trigramCalculator.calculateOptimalPath(
      playerState.stance,
      opponentStance,
      playerState, // Pass full player state
      maxDepth
    );
  }

  public executeStanceTransition(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): StanceTransitionResult {
    const transitionCost = this.trigramCalculator.calculateTransitionCost(
      playerState.stance,
      targetStance,
      playerState
    );

    const newPlayerState: PlayerState = {
      ...playerState,
      stance: targetStance,
      ki: playerState.ki - transitionCost.ki,
      stamina: playerState.stamina - transitionCost.stamina,
      lastStanceChangeTime: Date.now(),
    };

    return {
      from: playerState.stance,
      to: targetStance,
      cost: transitionCost,
      effectiveness: 1.0,
      success: true,
      newState: newPlayerState,
      timestamp: Date.now(),
    };
  }
}
