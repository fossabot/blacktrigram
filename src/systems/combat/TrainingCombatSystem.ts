import { CombatSystem } from "../CombatSystem";
import type {
  CombatResult,
  KoreanTechnique,
  PlayerState,
  TrainingCombatResult,
} from "../../types";

/**
 * Specialized combat system for training mode
 * Provides enhanced feedback and safer combat mechanics
 */
export class TrainingCombatSystem extends CombatSystem {
  private infiniteResourcesEnabled: boolean = false;
  // Fix: Remove unused trainingAidsEnabled variable

  constructor() {
    super();
  }

  /**
   * Set training aids enabled/disabled
   */
  setTrainingAids(enabled: boolean): void {
    this.infiniteResourcesEnabled = enabled;
  }

  /**
   * Fix: Update resolveAttack to match parent class signature
   */
  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique, // Fix: Use technique parameter instead of targetedVitalPointId
    targetedVitalPointId?: string
  ): TrainingCombatResult {
    // Call parent method with correct parameters
    const baseResult = super.resolveAttack(
      attacker,
      defender,
      technique, // Fix: Pass technique object
      targetedVitalPointId
    );

    // Add training-specific data
    const trainingData = {
      accuracy: this.calculateAccuracyScore(technique, baseResult),
      damageCalculation: this.calculateDamageScore(baseResult),
      stanceEffectiveness: this.calculateStanceScore(attacker, defender),
      techniqueTiming: this.calculateTimingScore(technique),
    };

    // Apply training aids if enabled
    let updatedAttacker = baseResult.attacker || attacker;
    let updatedDefender = baseResult.defender || defender;

    if (this.infiniteResourcesEnabled) {
      updatedAttacker = {
        ...updatedAttacker,
        ki: updatedAttacker.maxKi,
        stamina: updatedAttacker.maxStamina,
      };
    }

    return {
      ...baseResult,
      attacker: updatedAttacker,
      defender: updatedDefender,
      trainingData,
      // Fix: Add missing TrainingCombatResult properties
      accuracyScore: trainingData.accuracy,
      techniqueScore: trainingData.techniqueTiming,
      formScore: trainingData.stanceEffectiveness,
      improvementAreas: this.getImprovementAreas(trainingData),
      nextTrainingGoals: this.getNextTrainingGoals(trainingData),
    };
  }

  /**
   * Fix: Add missing calculateAccuracyScore method
   */
  private calculateAccuracyScore(
    technique: KoreanTechnique,
    result: CombatResult
  ): number {
    // Calculate accuracy score based on hit success and technique difficulty
    const baseScore = result.hit ? 80 : 0;
    const techniqueBonus = technique.accuracy * 20;
    const criticalBonus = result.criticalHit ? 20 : 0;
    const vitalPointBonus = result.vitalPointHit ? 30 : 0;

    return Math.min(
      100,
      baseScore + techniqueBonus + criticalBonus + vitalPointBonus
    );
  }

  /**
   * Fix: Add missing calculateDamageScore method
   */
  private calculateDamageScore(result: CombatResult): number {
    // Calculate damage effectiveness score
    const damageRatio = result.damage / 50; // Assuming 50 is max expected damage
    const baseScore = Math.min(80, damageRatio * 80);
    const criticalBonus = result.criticalHit ? 15 : 0;
    const vitalPointBonus = result.vitalPointHit ? 25 : 0;

    return Math.min(100, baseScore + criticalBonus + vitalPointBonus);
  }

  /**
   * Fix: Update calculateStanceScore to not use unused parameter
   */
  private calculateStanceScore(
    attacker: PlayerState,
    defender: PlayerState
  ): number {
    // Fix: Use trigramSystem which is now protected
    const stanceEffectiveness = this.trigramSystem.calculateStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );

    // Convert effectiveness to score (1.0 = 70, above 1.0 gets bonus)
    const baseScore = 70;
    const effectivenessBonus = (stanceEffectiveness - 1.0) * 30;

    return Math.min(100, Math.max(0, baseScore + effectivenessBonus));
  }

  /**
   * Fix: Add missing calculateTimingScore method
   */
  private calculateTimingScore(technique: KoreanTechnique): number {
    // Calculate timing score based on technique execution time vs optimal window
    const executionTime = technique.executionTime || 500;
    const optimalTime = 300; // Optimal execution time in ms

    const timingDifference = Math.abs(executionTime - optimalTime);
    const maxDifference = 500; // Maximum acceptable difference

    const timingRatio = Math.max(0, 1 - timingDifference / maxDifference);
    return Math.floor(timingRatio * 100);
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
      isStunned: false,
      isCountering: false,
      isBlocking: false,
    };
  }

  /**
   * Get training statistics for player improvement
   */
  getTrainingStats(
    // Fix: Remove unused player parameter or use it
    _player: PlayerState // Use underscore prefix to indicate intentionally unused
  ): {
    averageAccuracy: number;
    averageDamage: number;
    stanceEfficiency: number;
    improvementAreas: string[];
  } {
    // Mock training statistics - in real implementation would track over time
    return {
      averageAccuracy: 75,
      averageDamage: 60,
      stanceEfficiency: 80,
      improvementAreas: ["timing", "vital_point_targeting"],
    };
  }

  /**
   * Fix: Add missing getImprovementAreas method
   */
  private getImprovementAreas(trainingData: any): string[] {
    const areas: string[] = [];

    if (trainingData.accuracy < 70) {
      areas.push("accuracy");
    }
    if (trainingData.techniqueTiming < 70) {
      areas.push("timing");
    }
    if (trainingData.stanceEffectiveness < 70) {
      areas.push("stance_positioning");
    }
    if (trainingData.damageCalculation < 70) {
      areas.push("power_generation");
    }

    return areas;
  }

  /**
   * Fix: Add missing getNextTrainingGoals method
   */
  private getNextTrainingGoals(trainingData: any): string[] {
    const goals: string[] = [];

    if (trainingData.accuracy < 80) {
      goals.push("Improve targeting precision");
    }
    if (trainingData.techniqueTiming < 80) {
      goals.push("Perfect technique timing");
    }
    if (trainingData.stanceEffectiveness < 80) {
      goals.push("Master stance transitions");
    }

    return goals;
  }
}

export default TrainingCombatSystem;
