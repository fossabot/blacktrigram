import type { VitalPoint, VitalPointHitResult } from "../../types/anatomy";
import type { KoreanTechnique, Position } from "../../types";
import { VitalPointSeverity } from "../../types/enums";

/**
 * Detect vital point hits based on technique and positioning
 */

export class HitDetection {
  static checkVitalPointHit(
    technique: KoreanTechnique,
    targetPosition: Position,
    vitalPoints: readonly VitalPoint[]
  ): VitalPointHitResult {
    const hitChance = this.calculateHitChance(technique);

    if (Math.random() > hitChance) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    const targetVitalPoint = this.findNearestVitalPoint(
      targetPosition,
      vitalPoints
    );

    if (!targetVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    return {
      hit: true,
      damage:
        targetVitalPoint.baseDamage || targetVitalPoint.damage?.average || 0,
      vitalPoint: targetVitalPoint,
      effects: targetVitalPoint.effects,
      severity: targetVitalPoint.severity,
    };
  }

  private static calculateHitChance(technique: KoreanTechnique): number {
    return technique.accuracy * 0.3; // 30% of technique accuracy for vital points
  }

  private static findNearestVitalPoint(
    position: Position,
    vitalPoints: readonly VitalPoint[]
  ): VitalPoint | null {
    if (vitalPoints.length === 0) return null;

    let nearest = vitalPoints[0];
    let minDistance = this.calculateDistance(
      position,
      nearest.position || { x: 0, y: 0 }
    );

    for (const vp of vitalPoints) {
      const distance = this.calculateDistance(
        position,
        vp.position || { x: 0, y: 0 }
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = vp;
      }
    }

    return nearest;
  }

  private static calculateDistance(pos1: Position, pos2: Position): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
