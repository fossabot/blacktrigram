import type {
  PlayerState,
  TrigramStance,
  TrigramTransitionCost,
  TransitionPath,
  StanceTransition,
  TRIGRAM_DATA, // Import if used directly for cooldowns
} from "../../types";
import type { TrigramCalculator } from "./TrigramCalculator"; // Assuming TrigramCalculator is in the same directory

// Import constants or define them if they are specific to this module
import {
  MAX_TRANSITION_COST_KI,
  MAX_TRANSITION_COST_STAMINA,
  MAX_TRANSITION_TIME_MILLISECONDS,
  MIN_TRANSITION_EFFECTIVENESS,
  // TRIGRAM_DATA // Already imported above if needed
} from "../../types/constants";

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
    const currentStanceData = TRIGRAM_DATA[playerState.stance]; // Use imported TRIGRAM_DATA
    const cooldown = currentStanceData?.stanceChangeCooldownMs || 500; // Default cooldown

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
    const currentStanceData = TRIGRAM_DATA[playerState.stance];
    const cooldown = currentStanceData?.stanceChangeCooldownMs || 500;

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
}
