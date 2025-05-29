import type {
  VitalPoint as GameVitalPoint,
  Vector2D,
  PlayerState,
  VitalPointCategory,
  StatusEffect,
  VitalPoint,
} from "../types/GameTypes";
import type { VitalPointHit } from "../types/GameTypes";
import {
  getClosestVitalPoint,
  calculateVitalPointDamage,
  ANATOMICAL_REGIONS,
} from "./vitalpoint/AnatomicalRegions";
import { KoreanDamageCalculator } from "./vitalpoint/DamageCalculator";
import {
  calculateVitalPointEffectiveness,
  getVitalPointsByCategory,
  getVitalPointsByMastery,
  type MasteryLevel,
} from "./vitalpoint/KoreanVitalPoints";
import { KOREAN_VITAL_POINTS } from "./vitalpoint/KoreanVitalPoints";

/**
 * Korean Martial Arts Vital Point System (급소술 시스템)
 * Comprehensive vital point detection, damage calculation, and effect management
 */

interface VitalPointSystemConfig {
  readonly masteryLevel: MasteryLevel;
  readonly precision: number;
  readonly useKoreanTraditional: boolean;
}

export class VitalPointSystem {
  private static instance: VitalPointSystem | null = null;

  private readonly config: VitalPointSystemConfig = {
    maxHitDistance: 50,
    precisionThreshold: 0.3,
    debugging: false,
  };

  private hitHistory: VitalPointHit[] = [];

  constructor(config?: Partial<VitalPointSystemConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Get singleton instance (optional pattern)
   */
  public static getInstance(
    config?: Partial<VitalPointSystemConfig>
  ): VitalPointSystem {
    if (!VitalPointSystem.instance) {
      VitalPointSystem.instance = new VitalPointSystem(config);
    }
    return VitalPointSystem.instance;
  }

  /**
   * Clear all effects and history
   */
  public clearEffects(): void {
    this.hitHistory = [];
  }

  /**
   * Get current system state
   */
  public getState(): {
    enabled: boolean;
    hitCount: number;
    lastHit: VitalPointHit | null;
  } {
    return {
      enabled: true, // Always enabled for now
      hitCount: this.hitHistory.length,
      lastHit: this.hitHistory[this.hitHistory.length - 1] || null,
    };
  }

  /**
   * Update system configuration
   */
  public updateConfig(newConfig: Partial<VitalPointSystemConfig>): void {
    Object.assign(this.config, newConfig);
  }

  /**
   * Main vital point detection and processing function
   */
  public processVitalPointHit(
    attackPosition: { readonly x: number; readonly y: number },
    baseDamage: number,
    attackerSkill: number = 0.5,
    precision: number = 0.8
  ): VitalPointHit | null {
    if (!this.config.enabled) return null;

    // Find closest vital point within range
    const vitalPoint = getClosestVitalPoint(
      attackPosition,
      this.config.maxHitDistance
    );

    if (!vitalPoint) return null;

    // Check if vital point is available at current mastery level
    const availablePoints = getVitalPointsByMastery(this.config.masteryLevel);
    if (!availablePoints.some((point) => point.id === vitalPoint.id)) {
      return null;
    }

    // Check precision threshold
    if (precision < this.config.precisionThreshold) {
      if (this.config.debugging) {
        console.log(
          `Precision too low: ${precision} < ${this.config.precisionThreshold}`
        );
      }
      return null;
    }

    // Calculate vital point effectiveness
    const effectiveness = calculateVitalPointEffectiveness(
      vitalPoint,
      attackerSkill,
      precision,
      precision // Using precision for timing as well
    );

    // Calculate final damage
    const finalDamage = calculateVitalPointDamage(
      vitalPoint,
      baseDamage,
      precision
    );

    // Process status effects
    const statusEffects = this.processVitalPointEffects(
      vitalPoint,
      effectiveness.effectiveness
    );

    const hit: VitalPointHit = {
      vitalPoint,
      damage: finalDamage,
      precision,
      effectiveness: effectiveness.effectiveness,
      statusEffects,
      description: effectiveness.description,
      korean: `${vitalPoint.korean} 급소 공격`,
    };

    // Store hit in history
    this.addToHistory(hit);

    // Apply status effects
    this.applyStatusEffects(vitalPoint.id, statusEffects);

    if (this.config.debugging) {
      console.log(`🎯 Vital Point Hit:`, hit);
    }

    return hit;
  }

  /**
   * Detect vital point hit based on position, technique, and precision
   */
  public detectVitalPointHit(
    position: Vector2D,
    technique: { readonly id: string; readonly range: number },
    precision: number
  ): GameVitalPoint | null {
    const availablePoints = getVitalPointsByMastery(this.config.masteryLevel);

    // Find the closest vital point within range
    return (
      availablePoints.find((vitalPoint) => {
        const distance = Math.sqrt(
          Math.pow(position.x - vitalPoint.x, 2) +
            Math.pow(position.y - vitalPoint.y, 2)
        );

        return distance <= vitalPoint.radius * (1 + precision);
      }) || null
    );
  }

  // Fix checkVitalPointHit method signature and implementation
  public checkVitalPointHit(
    x: number,
    y: number,
    technique: string
  ): VitalPointHit {
    if (!this.isEnabled()) {
      return this.createMissResult();
    }

    const maxDistance = this.config.maxHitDistance;
    const vitalPoint = this.findNearestVitalPoint(x, y, maxDistance);

    if (!vitalPoint) {
      return this.createMissResult();
    }

    const distance = this.calculateDistance(x, y, vitalPoint);
    const precision = this.calculatePrecision(distance, maxDistance);

    if (precision < this.config.precisionThreshold) {
      return this.createMissResult();
    }

    const effects = this.processVitalPointEffects(vitalPoint, precision);
    const multiplier = this.calculateDamageMultiplier(vitalPoint, precision);

    const hit: VitalPointHit = {
      hit: true,
      vitalPointId: vitalPoint.id,
      multiplier,
      statusEffects: effects,
      finalDamage: 0, // Will be calculated by combat system
      effectiveness: precision,
      description: `Struck ${vitalPoint.korean} - ${vitalPoint.english}`,
    };

    this.addToHistory(hit);

    if (this.config.debugging) {
      this.logHitDebugInfo(hit, vitalPoint, distance, precision);
    }

    return hit;
  }

  // Add missing methods
  private isEnabled(): boolean {
    return true; // Always enabled for now
  }

  private findNearestVitalPoint(
    x: number,
    y: number,
    maxDistance: number
  ): VitalPoint | null {
    let nearestPoint: VitalPoint | null = null;
    let minDistance = maxDistance;

    Object.values(KOREAN_VITAL_POINTS).forEach((point) => {
      const distance = this.calculateDistance(x, y, point);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    });

    return nearestPoint;
  }

  private calculateDistance(
    x: number,
    y: number,
    vitalPoint: VitalPoint
  ): number {
    // Use coordinates property instead of optional x/y
    const dx = x - vitalPoint.coordinates.x;
    const dy = y - vitalPoint.coordinates.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private calculatePrecision(distance: number, maxDistance: number): number {
    if (maxDistance <= 0) return 0;
    return Math.max(0, 1 - distance / maxDistance);
  }

  private processVitalPointEffects(
    vitalPoint: VitalPoint,
    precision: number
  ): readonly StatusEffect[] {
    if (!vitalPoint.effects) return [];

    return vitalPoint.effects.map((effect) => ({
      ...effect,
      duration: effect.duration * (0.5 + precision * 0.5), // Scale duration
    }));
  }

  private calculateDamageMultiplier(
    vitalPoint: VitalPoint,
    precision: number
  ): number {
    const baseMultiplier = vitalPoint.vulnerability || 1.5;
    return baseMultiplier * (0.8 + precision * 0.4);
  }

  private createMissResult(): VitalPointHit {
    return {
      hit: false,
      vitalPointId: "",
      multiplier: 1.0,
      statusEffects: [],
      finalDamage: 0,
      effectiveness: 0,
      description: "Attack missed vital points",
    };
  }

  private addToHistory(hit: VitalPointHit): void {
    this.hitHistory.push(hit);

    // Keep only last 100 hits for performance
    if (this.hitHistory.length > 100) {
      this.hitHistory = this.hitHistory.slice(-100);
    }
  }

  private logHitDebugInfo(
    hit: VitalPointHit,
    vitalPoint: VitalPoint,
    distance: number,
    precision: number
  ): void {
    console.log(`[VitalPoint] Hit: ${vitalPoint.korean}`, {
      distance: distance.toFixed(2),
      precision: precision.toFixed(2),
      multiplier: hit.multiplier.toFixed(2),
      effects: hit.statusEffects.length,
    });
  }

  /**
   * Get hit history for analysis
   */
  public getHitHistory(): readonly VitalPointHit[] {
    return [...this.hitHistory];
  }

  /**
   * Get vital points by category
   */
  public getVitalPointsByCategory(
    category: VitalPointCategory
  ): readonly GameVitalPoint[] {
    const availablePoints = getVitalPointsByMastery(this.config.masteryLevel);

    // Map traditional categories to game categories
    const categoryMap: Record<string, VitalPointCategory> = {
      head: "consciousness" as VitalPointCategory,
      neck: "circulation" as VitalPointCategory,
      upper_torso: "respiratory" as VitalPointCategory,
      lower_torso: "energy" as VitalPointCategory,
      arms: "structural" as VitalPointCategory,
      legs: "structural" as VitalPointCategory,
    };

    return availablePoints.filter((point) => {
      // For compatibility, check against all possible categories
      const mappedCategory = categoryMap[point.region] || point.category;
      return mappedCategory === category || point.category === category;
    });
  }

  /**
   * Get vital point statistics
   */
  public getVitalPointStats(): {
    readonly totalPoints: number;
    readonly categoryCounts: Record<VitalPointCategory, number>;
    readonly averageDifficulty: number;
  } {
    const vitalPoints = Object.values(KOREAN_VITAL_POINTS);
    const categoryCounts: Record<VitalPointCategory, number> = {
      critical: 0,
      minor: 0,
    };

    let totalDifficulty = 0;

    vitalPoints.forEach((point) => {
      if (point.category === "critical") {
        categoryCounts.critical++;
      } else {
        categoryCounts.minor++;
      }
      totalDifficulty += point.difficulty || 1;
    });

    return {
      totalPoints: vitalPoints.length,
      categoryCounts,
      averageDifficulty: totalDifficulty / vitalPoints.length,
    };
  }

  /**
   * Reset system state
   */
  public reset(): void {
    this.activeEffects.clear();
    this.hitHistory.length = 0;
  }

  public getActiveEffects(playerId: string): StatusEffect[] {
    return this.activeEffects.get(playerId) || [];
  }

  private applyStatusEffects(playerId: string, effects: StatusEffect[]): void {
    const existing = this.activeEffects.get(playerId) || [];
    this.activeEffects.set(playerId, [...existing, ...effects]);
  }

  private processVitalPointEffects(
    vitalPoint: VitalPoint,
    effectiveness: number
  ): StatusEffect[] {
    return vitalPoint.effects.map((effect) => ({
      ...effect,
      intensity: effect.intensity * effectiveness,
    }));
  }
}

// Export what's available
export {
  ANATOMICAL_REGIONS,
  KOREAN_VITAL_POINTS,
  getVitalPointsByCategory as getVitalPointsByMastery,
  KoreanDamageCalculator,
};
