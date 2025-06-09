import { CombatSystem } from "../CombatSystem";
import type { PlayerState, KoreanTechnique, CombatResult } from "../../types";

/**
 * Extended combat system for training mode with educational features
 */
export class TrainingCombatSystem extends CombatSystem {
  private showTechnicalDetails: boolean = true;
  private allowUndoActions: boolean = true;
  private infiniteResources: boolean = true;

  /**
   * Execute training attack with detailed feedback
   */
  executeTrainingAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult & { trainingData?: any } {
    // Get base combat result
    const baseResult = super.executeAttack(attacker, defender, technique);

    // Add training-specific data
    const trainingData = {
      techniqueAccuracy: technique.accuracy,
      estimatedDamage: technique.damage,
      actualDamage: baseResult.damage,
      resourceCost: {
        ki: technique.kiCost,
        stamina: technique.staminaCost,
      },
      timing: {
        execution: technique.executionTime,
        recovery: technique.recoveryTime,
      },
      effectiveness: technique.damage
        ? baseResult.damage / technique.damage
        : 0, // Fix: Add null check
      tips: this.generateTrainingTips(technique, baseResult),
    };

    // Apply infinite resources if enabled - Fix: Create new result instead of mutating
    let updatedResult = baseResult;
    if (this.infiniteResources && baseResult.updatedAttacker) {
      updatedResult = {
        ...baseResult,
        updatedAttacker: {
          ...baseResult.updatedAttacker,
          ki: attacker.maxKi,
          stamina: attacker.maxStamina,
        },
      };
    }

    return {
      ...updatedResult,
      trainingData,
    };
  }

  /**
   * Generate helpful training tips
   */
  private generateTrainingTips(
    technique: KoreanTechnique,
    result: CombatResult
  ): string[] {
    const tips: string[] = [];

    if (result.criticalHit) {
      tips.push("Perfect timing! Critical hits deal extra damage.");
    }

    if (result.vitalPointHit) {
      tips.push(
        "Excellent precision! Vital point attacks are highly effective."
      );
    }

    if (technique.damage && result.damage < technique.damage * 0.8) {
      tips.push("Try to improve your stance for better damage output.");
    }

    if (technique.accuracy < 0.9) {
      tips.push("Practice this technique to improve accuracy.");
    }

    return tips;
  }

  /**
   * Toggle training features
   */
  setTrainingOptions(options: {
    showTechnicalDetails?: boolean;
    allowUndoActions?: boolean;
    infiniteResources?: boolean;
  }): void {
    this.showTechnicalDetails =
      options.showTechnicalDetails ?? this.showTechnicalDetails;
    this.allowUndoActions = options.allowUndoActions ?? this.allowUndoActions;
    this.infiniteResources =
      options.infiniteResources ?? this.infiniteResources;
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
      consciousness: 100,
      balance: 100,
      pain: 0,
      statusEffects: [],
    };
  }

  /**
   * Analyze technique performance
   */
  analyzeTechniquePerformance(
    technique: KoreanTechnique,
    results: CombatResult[]
  ): {
    averageDamage: number;
    hitRate: number;
    criticalRate: number;
    effectiveness: number;
  } {
    if (results.length === 0) {
      return {
        averageDamage: 0,
        hitRate: 0,
        criticalRate: 0,
        effectiveness: 0,
      };
    }

    const totalDamage = results.reduce((sum, r) => sum + r.damage, 0);
    const hits = results.filter((r) => r.hit).length;
    const criticals = results.filter((r) => r.criticalHit).length;

    return {
      averageDamage: totalDamage / results.length,
      hitRate: hits / results.length,
      criticalRate: criticals / results.length,
      effectiveness: technique.damage
        ? totalDamage / (technique.damage * results.length)
        : 0,
    };
  }
}
