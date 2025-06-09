import { CombatSystem } from "../CombatSystem";
import type { PlayerState, KoreanTechnique, CombatResult } from "../../types";

/**
 * Training-specific combat result with additional data
 */
interface TrainingCombatResult extends CombatResult {
  readonly trainingData?: {
    readonly accuracy: number;
    readonly damageCalculation: number;
    readonly stanceEffectiveness: number;
    readonly techniqueTiming: number;
  };
}

/**
 * Specialized combat system for training mode
 * Provides enhanced feedback and safer combat mechanics
 */
export class TrainingCombatSystem extends CombatSystem {
  // Fix: Remove unused showHitboxes property
  private infiniteResources: boolean = true;

  constructor() {
    super();
  }

  /**
   * Training-specific combat resolution with enhanced feedback
   */
  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): TrainingCombatResult {
    // Use parent combat system but with training modifications
    const result = super.resolveAttack(attacker, defender, technique);

    // In training mode, restore resources by updating player state
    if (this.infiniteResources) {
      // Fix: Create new player state instead of mutating readonly properties
      const updatedAttacker: PlayerState = {
        ...attacker,
        ki: attacker.maxKi,
        stamina: attacker.maxStamina,
      };

      // Update the result with restored resources
      return {
        ...result,
        attacker: updatedAttacker,
        // Fix: Add trainingData with proper typing
        trainingData: {
          accuracy: technique.accuracy,
          damageCalculation: result.damage,
          stanceEffectiveness: 1.0,
          techniqueTiming: Date.now(),
        },
      } as TrainingCombatResult;
    }

    return {
      ...result,
      trainingData: {
        accuracy: technique.accuracy,
        damageCalculation: result.damage,
        stanceEffectiveness: 1.0,
        techniqueTiming: Date.now(),
      },
    } as TrainingCombatResult;
  }

  /**
   * Enable/disable visual aids for training
   */
  setTrainingAids(infiniteResources: boolean): void {
    this.infiniteResources = infiniteResources;
  }

  /**
   * Reset training dummy to full health
   */
  resetTrainingDummy(dummy: PlayerState): PlayerState {
    return {
      ...dummy,
      health: dummy.maxHealth,
      ki: dummy.maxKi,
      stamina: dummy.maxStamina,
      statusEffects: [],
      pain: 0,
      consciousness: 100,
      balance: 100,
    };
  }
}
