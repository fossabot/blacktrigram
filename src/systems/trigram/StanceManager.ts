import type {
  PlayerState,
  TrigramStance,
  TransitionPath,
  TrigramTransitionCost,
} from "../../types";
import type { TrigramCalculator } from "./TrigramCalculator";

// Fix StanceTransitionResult interface to include missing properties
interface StanceTransitionResult {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly cost: TrigramTransitionCost;
  readonly effectiveness: number;
  readonly success: boolean;
  readonly reason?: string;
  readonly newState: PlayerState;
  readonly timestamp: number;
}

// Import constants or define them if they are specific to this module
import {
  MAX_TRANSITION_COST_KI,
  MAX_TRANSITION_COST_STAMINA,
  MAX_TRANSITION_TIME_MILLISECONDS,
} from "../../types/constants";

const DEFAULT_STANCE_COOLDOWN_MS = 500;

export class StanceManager {
  private trigramCalculator: TrigramCalculator;

  constructor(trigramCalculator: TrigramCalculator) {
    this.trigramCalculator = trigramCalculator;
  }

  public changeStance(
    playerState: PlayerState,
    targetStance: TrigramStance
  ): StanceTransitionResult {
    const now = Date.now();

    // Check cooldown
    if (now - playerState.lastStanceChangeTime < DEFAULT_STANCE_COOLDOWN_MS) {
      return {
        from: playerState.stance,
        to: targetStance,
        cost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 0,
        success: false,
        reason: "Stance change on cooldown",
        newState: playerState,
        timestamp: now,
      };
    }

    // Calculate transition cost
    const transitionCost = this.trigramCalculator.calculateTransitionCost(
      playerState.stance,
      targetStance,
      playerState
    );

    // Check if player has enough resources
    if (
      playerState.ki < transitionCost.ki ||
      playerState.stamina < transitionCost.stamina
    ) {
      return {
        from: playerState.stance,
        to: targetStance,
        cost: transitionCost,
        effectiveness: 0,
        success: false,
        reason: "Insufficient resources",
        newState: playerState,
        timestamp: now,
      };
    }

    // Successful transition
    const newState: PlayerState = {
      ...playerState,
      stance: targetStance,
      ki: playerState.ki - transitionCost.ki,
      stamina: playerState.stamina - transitionCost.stamina,
      lastStanceChangeTime: now,
    };

    return {
      from: playerState.stance,
      to: targetStance,
      cost: transitionCost,
      effectiveness: 1.0,
      success: true,
      newState,
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
