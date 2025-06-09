import type {
  TrigramStance,
  PlayerState,
  TrigramTransitionCost,
} from "../../types";
import { TransitionCalculator } from "./TransitionCalculator";
import { TRIGRAM_DATA } from "../../types/constants";

/**
 * Manager for trigram stance changes and state
 */
export class StanceManager {
  private currentStance: TrigramStance;
  private lastChangeTime: number = 0;
  private cooldownPeriod: number = 200; // ms

  constructor(initialStance: TrigramStance) {
    this.currentStance = initialStance;
  }

  /**
   * Get current stance
   */
  getCurrentStance(): TrigramStance {
    return this.currentStance;
  }

  /**
   * Attempt to change stance
   */
  changeStance(
    newStance: TrigramStance,
    player: PlayerState
  ): {
    success: boolean;
    updatedPlayer?: PlayerState;
    cost?: TrigramTransitionCost;
  } {
    // Check cooldown
    const now = Date.now();
    if (now - this.lastChangeTime < this.cooldownPeriod) {
      return { success: false };
    }

    // Check if transition is valid
    if (
      !TransitionCalculator.canTransition(this.currentStance, newStance, player)
    ) {
      return { success: false };
    }

    // Calculate cost
    const cost = TransitionCalculator.calculateCost(
      this.currentStance,
      newStance
    );

    // Apply stance change
    const updatedPlayer: PlayerState = {
      ...player,
      currentStance: newStance,
      ki: Math.max(0, player.ki - cost.ki),
      stamina: Math.max(0, player.stamina - cost.stamina),
      lastStanceChangeTime: now,
    };

    this.currentStance = newStance;
    this.lastChangeTime = now;

    return {
      success: true,
      updatedPlayer,
      cost,
    };
  }

  /**
   * Get stance data
   */
  getStanceData(stance?: TrigramStance) {
    return TRIGRAM_DATA[stance || this.currentStance];
  }

  /**
   * Check if stance change is on cooldown
   */
  isOnCooldown(): boolean {
    return Date.now() - this.lastChangeTime < this.cooldownPeriod;
  }

  /**
   * Get remaining cooldown time
   */
  getRemainingCooldown(): number {
    const remaining = this.cooldownPeriod - (Date.now() - this.lastChangeTime);
    return Math.max(0, remaining);
  }

  /**
   * Reset cooldown
   */
  resetCooldown(): void {
    this.lastChangeTime = 0;
  }

  /**
   * Set cooldown period
   */
  setCooldownPeriod(ms: number): void {
    this.cooldownPeriod = ms;
  }
}
