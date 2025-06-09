import { CombatSystem } from "../CombatSystem";
import type { PlayerState, TrainingCombatResult } from "../../types";

/**
 * Specialized combat system for training mode
 * Provides enhanced feedback and safer combat mechanics
 */
export class TrainingCombatSystem extends CombatSystem {
  // Fix: Remove unused trainingAids property - use it properly
  private trainingAidsEnabled: boolean = false;

  constructor() {
    super();
  }

  setTrainingAids(enabled: boolean): void {
    this.trainingAidsEnabled = enabled; // Fix: Use the property
  }

  /**
   * Override resolveAttack to provide training-specific feedback
   */
  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    targetedVitalPointId?: string
  ): TrainingCombatResult {
    // Get base combat result
    const baseResult = super.resolveAttack(
      attacker,
      defender,
      targetedVitalPointId
    );

    // Get technique from attacker's stance for training analysis
    const availableTechniques = this.getAvailableTechniques(attacker);
    const technique = availableTechniques[0]; // Use first available technique

    // Create training-specific result with additional data
    const trainingResult: TrainingCombatResult = {
      ...baseResult,
      trainingData: {
        accuracy: technique ? technique.accuracy : 0.5,
        damageCalculation: baseResult.damage,
        stanceEffectiveness: 1.0,
        techniqueTiming: technique ? technique.executionTime : 500,
      },
    };

    // Apply training aids if enabled (restore resources)
    if (this.trainingAidsEnabled && baseResult.updatedAttacker) {
      // Fix: Create new result object instead of modifying readonly property
      return {
        ...trainingResult,
        updatedAttacker: {
          ...baseResult.updatedAttacker,
          ki: attacker.maxKi,
          stamina: attacker.maxStamina,
        },
      };
    }

    return trainingResult;
  }

  /**
   * Reset training dummy to full health and resources
   */
  resetTrainingDummy(dummy: PlayerState): PlayerState {
    return {
      ...dummy,
      health: dummy.maxHealth,
      ki: dummy.maxKi,
      stamina: dummy.maxStamina,
      pain: 0,
      consciousness: 100,
      balance: 100,
      statusEffects: [],
      activeEffects: [],
    };
  }
}
