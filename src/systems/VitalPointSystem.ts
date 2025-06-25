// Korean martial arts vital point system

import { Position } from "../types";
import { VitalPointSeverity } from "../types/common";
import { VitalPoint, VitalPointHitResult } from "./vitalpoint";

export class VitalPointSystem {
  private vitalPoints: VitalPoint[] = [];

  constructor() {
    // Initialize with some basic vital points
    this.initializeVitalPoints();
  }

  /**
   * Process a hit at a specific position
   */
  processHit(
    targetPosition: Position,
    _hitBox: { width: number; height: number }, // Prefixed with underscore to indicate intentionally unused
    targetedVitalPointId?: string | null
  ): VitalPointHitResult {
    // If a specific vital point is targeted, check that one
    if (targetedVitalPointId) {
      const targetVitalPoint = this.getVitalPointById(targetedVitalPointId);
      if (targetVitalPoint) {
        return this.calculateVitalPointHit(targetVitalPoint, targetPosition);
      }
    }

    // Otherwise, find the closest vital point
    const closestVitalPoint = this.findClosestVitalPoint(targetPosition);
    if (!closestVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Calculate distance to determine hit accuracy
    const distance = this.calculateDistance(
      targetPosition,
      closestVitalPoint.position
    );
    const maxHitDistance = 50; // pixels

    if (distance <= maxHitDistance) {
      return {
        hit: true,
        vitalPointHit: closestVitalPoint,
        damage: this.calculateBaseDamage(closestVitalPoint, distance),
        effects: [],
        severity: closestVitalPoint.severity,
        accuracy: Math.max(0, 1 - distance / maxHitDistance),
      };
    }

    return {
      hit: false,
      damage: 0,
      effects: [],
      severity: VitalPointSeverity.MINOR,
    };
  }

  /**
   * Get vital point by ID
   */
  getVitalPointById(id: string): VitalPoint | null {
    return this.vitalPoints.find((vp) => vp.id === id) || null;
  }

  /**
   * Get all vital points
   */
  getVitalPoints(): readonly VitalPoint[] {
    return this.vitalPoints;
  }

  /**
   * Calculate hit result for a specific vital point
   */
  calculateHit(
    technique: any,
    attackerPosition: Position,
    _defenderPosition: Position, // Prefixed with underscore to indicate intentionally unused
    _defenderStance: any // Prefixed with underscore to indicate intentionally unused
  ): VitalPointHitResult {
    // Find closest vital point to attack
    const closestVitalPoint = this.findClosestVitalPoint(attackerPosition);

    if (!closestVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Calculate hit based on technique accuracy and distance
    const distance = this.calculateDistance(
      attackerPosition,
      closestVitalPoint.position
    );
    const hitChance = technique.accuracy * (1 - distance / 100);

    if (Math.random() < hitChance) {
      return {
        hit: true,
        vitalPointHit: closestVitalPoint,
        damage: this.calculateBaseDamage(closestVitalPoint, distance),
        effects: [],
        severity: closestVitalPoint.severity,
      };
    }

    return {
      hit: false,
      damage: 0,
      effects: [],
      severity: VitalPointSeverity.MINOR,
    };
  }

  /**
   * Find the closest vital point to a position
   */
  private findClosestVitalPoint(position: Position): VitalPoint | null {
    if (this.vitalPoints.length === 0) return null;

    let closest = this.vitalPoints[0];
    let minDistance = this.calculateDistance(position, closest.position);

    for (const vitalPoint of this.vitalPoints) {
      const distance = this.calculateDistance(position, vitalPoint.position);
      if (distance < minDistance) {
        minDistance = distance;
        closest = vitalPoint;
      }
    }

    return closest;
  }

  /**
   * Calculate distance between two positions
   */
  private calculateDistance(pos1: Position, pos2: Position): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate vital point hit result
   */
  private calculateVitalPointHit(
    vitalPoint: VitalPoint,
    hitPosition: Position
  ): VitalPointHitResult {
    const distance = this.calculateDistance(hitPosition, vitalPoint.position);
    const baseDamage = this.calculateBaseDamage(vitalPoint, distance);

    return {
      hit: true,
      vitalPointHit: vitalPoint,
      damage: baseDamage,
      effects: [],
      severity: vitalPoint.severity,
      accuracy: Math.max(0, 1 - distance / 50),
    };
  }

  /**
   * Calculate base damage for a vital point hit
   */
  private calculateBaseDamage(
    vitalPoint: VitalPoint,
    distance: number
  ): number {
    const baseDamage = vitalPoint.baseDamage || 10;
    const distanceModifier = Math.max(0.1, 1 - distance / 100);
    return Math.floor(baseDamage * distanceModifier);
  }

  /**
   * Initialize basic vital points for testing
   */
  private initializeVitalPoints(): void {
    // Add some basic vital points for testing
    this.vitalPoints = [
      {
        id: "head_temple",
        names: {
          korean: "태양혈",
          english: "Temple",
          romanized: "taeyang-hyeol",
        },
        position: { x: 100, y: 50 },
        category: "neurological" as any,
        severity: VitalPointSeverity.MAJOR,
        baseDamage: 25,
        effects: [],
        description: {
          korean: "관자놀이의 압박점",
          english: "Pressure point at the temple",
          romanized: "gwanja-nori-ui apbakjeom",
        },
        targetingDifficulty: 0.7,
        effectiveStances: [],
      },
      {
        id: "neck_carotid",
        names: {
          korean: "경동맥",
          english: "Carotid Artery",
          romanized: "gyeong-dong-maek",
        },
        position: { x: 100, y: 80 },
        category: "vascular" as any,
        severity: VitalPointSeverity.CRITICAL,
        baseDamage: 35,
        effects: [],
        description: {
          korean: "목의 주요 동맥",
          english: "Major artery in the neck",
          romanized: "mog-ui juyo dong-maek",
        },
        targetingDifficulty: 0.8,
        effectiveStances: [],
      },
    ];
  }
}

export default VitalPointSystem;
