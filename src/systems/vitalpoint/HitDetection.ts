import type {
  Position,
  AnatomicalLocation,
  CombatResult,
  PlayerState,
  KoreanTechnique,
  VitalPoint,
  VitalPointSystemConfig,
} from "../../types";
import { VITAL_POINTS_DATA } from "../../types/constants";

// Placeholder math functions - MOVE THESE TO A DEDICATED utils/math.ts FILE
function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export class HitDetection {
  private config: VitalPointSystemConfig;

  constructor(config: VitalPointSystemConfig) {
    this.config = config;
  }

  public isHit(
    attackerPosition: Position,
    targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    hitAngle: number
  ): boolean {
    const techniqueRange = technique.range || 1.0;
    if (distanceToTarget > techniqueRange) {
      return false;
    }

    // Angle check (simplified)
    const maxAngleDeviation = Math.PI / 4; // 45 degrees
    if (Math.abs(hitAngle) > maxAngleDeviation) {
      return false;
    }

    // Check if the vital point is within the technique's effective area
    const vitalPointDistance = calculateDistance(
      attackerPosition,
      vitalPoint.location
    );
    if (vitalPointDistance > techniqueRange * 1.2) {
      return false;
    }

    return true;
  }

  public calculateHitChance(
    _attackerPosition: Position,
    _targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    attacker?: PlayerState,
    defender?: PlayerState
  ): number {
    let baseChance = technique.accuracy || 0.85;

    // Distance penalty
    const maxRange = technique.range || 1.0;
    if (distanceToTarget > maxRange * 0.8) {
      baseChance *= 0.7;
    }

    // Vital point difficulty
    switch (vitalPoint.severity) {
      case "critical":
        baseChance *= 0.6;
        break;
      case "severe":
        baseChance *= 0.75;
        break;
      case "moderate":
        baseChance *= 0.9;
        break;
    }

    // Attacker/defender state modifiers
    if (attacker && attacker.stamina < 30) {
      baseChance *= 0.8;
    }
    if (defender && defender.combatState === "stunned") {
      baseChance *= 1.3;
    }

    return Math.max(0.1, Math.min(0.95, baseChance));
  }

  public determineHitLocation(
    _attackerPosition: Position,
    _target: PlayerState,
    technique: KoreanTechnique
  ): { vitalPoint: VitalPoint | null; location: AnatomicalLocation } {
    // Simple implementation - would be more complex in practice
    const defaultLocation: AnatomicalLocation = {
      region: "torso",
      x: 0.5,
      y: 0.5,
    };

    // For now, return a random vital point based on technique type
    const availableVitalPoints = VITAL_POINTS_DATA.filter(
      (vp) => vp.category === "torso" || vp.category === "head"
    );

    const randomVitalPoint =
      availableVitalPoints[
        Math.floor(Math.random() * availableVitalPoints.length)
      ] || null;

    return {
      vitalPoint: randomVitalPoint,
      location: randomVitalPoint?.location || defaultLocation,
    };
  }

  public resolveHitOnVitalPoint(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
  ): CombatResult {
    const baseDamage =
      Math.floor(
        Math.random() *
          (technique.damageRange.max - technique.damageRange.min + 1)
      ) + technique.damageRange.min;

    const totalDamage = baseDamage + (vitalPoint.baseDamage || 0);

    return {
      hit: true,
      damage: totalDamage,
      isVitalPoint: true,
      vitalPointsHit: [vitalPoint],
      effects: vitalPoint.effects || [],
      technique,
      damageType: technique.damageType,
      location: vitalPoint.location,
      painLevel:
        vitalPoint.severity === "critical"
          ? 8
          : vitalPoint.severity === "severe"
          ? 6
          : 3,
      consciousnessLoss: vitalPoint.severity === "critical" ? 15 : 5,
      balanceLoss: vitalPoint.severity === "critical" ? 20 : 10,
      bloodLoss: vitalPoint.severity === "severe" ? 5 : 1,
      stunDuration: vitalPoint.severity === "critical" ? 3000 : 1000,
      canCounter: false,
      isCounterAttack: false,
      isCritical: vitalPoint.severity === "critical",
      multiplier: vitalPoint.severity === "critical" ? 2.0 : 1.0,
    };
  }

  public determineClosestVitalPoint(
    hitPosition: Position,
    targetBodyPosition: Position,
    availableVitalPoints: readonly VitalPoint[],
    maxDistance: number = 0.1
  ): VitalPoint | null {
    let closestVitalPoint: VitalPoint | null = null;
    let closestDistance = maxDistance;

    for (const vitalPoint of availableVitalPoints) {
      const vitalPointWorldPosition = {
        x: targetBodyPosition.x + vitalPoint.location.x,
        y: targetBodyPosition.y + vitalPoint.location.y,
      };

      const distance = calculateDistance(hitPosition, vitalPointWorldPosition);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestVitalPoint = vitalPoint;
      }
    }

    return closestVitalPoint;
    const angleToVitalPoint = Math.atan2(
      targetBodyPosition.y + vitalPoint.location.y - attackerPosition.y,
      targetBodyPosition.x + vitalPoint.location.x - attackerPosition.x
    );
    const angleDifference = Math.abs(hitAngle - angleToVitalPoint);
    const maxAngleDiff = this.config.maxHitAngleDifference ?? Math.PI / 4;

    return angleDifference <= maxAngleDiff;
  }

  public calculateHitChance(
    _attackerPosition: Position,
    _targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    attacker?: PlayerState,
    defender?: PlayerState
  ): number {
    let baseHitChance = technique.accuracy ?? 0.8;

    // Modify by distance
    const optimalRange = technique.range ? technique.range * 0.75 : 0.75;
    const rangeModifier =
      distanceToTarget <= optimalRange
        ? 1.0
        : Math.max(0.5, 1.0 - (distanceToTarget - optimalRange) / optimalRange);
    baseHitChance *= rangeModifier;

    // Modify by vital point's own accuracy
    baseHitChance *= vitalPoint.baseAccuracy || 1.0;

    // Modify by attacker/defender states if provided
    if (attacker) {
      if (attacker.activeEffects.some((e) => e.type === "focused"))
        baseHitChance *= 1.1;
    }
    if (defender) {
      if (defender.combatState === "defending") baseHitChance *= 0.7;
      if (defender.activeEffects.some((e) => e.type === "evasion_boost"))
        baseHitChance *= 0.9;
    }

    return Math.max(0, Math.min(1, baseHitChance));
  }

  public determineHitLocation(
    _attackerPosition: Position,
    _target: PlayerState,
    technique: KoreanTechnique
  ): { vitalPoint: VitalPoint | null; location: AnatomicalLocation } {
    // For now, let's assume it might hit the first vital point if the technique is precise.
    if (
      technique.precision &&
      technique.precision > 0.8 &&
      VITAL_POINTS_DATA.length > 0
    ) {
      const vp = VITAL_POINTS_DATA[0];
      return { vitalPoint: vp, location: vp.location };
    }
    // Default to a generic torso hit if no specific vital point
    return {
      vitalPoint: null,
      location: { region: "torso", x: 0.5, y: 0.5 } as AnatomicalLocation,
    };
  }

  public resolveHitOnVitalPoint(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
  ): CombatResult {
    const damage =
      (technique.damageRange.min + technique.damageRange.max) / 2 +
      (vitalPoint.baseDamage || 0);
    return {
      hit: true,
      damage: damage,
      isVitalPoint: true,
      vitalPointsHit: [vitalPoint],
      techniqueUsed: technique,
      effectiveness: 1.0,
      stunDuration: vitalPoint.baseStun || 0,
      bloodLoss: 0,
      painLevel: damage / 5,
      consciousnessImpact: (vitalPoint.baseStun || 0) * 5,
      balanceEffect: damage / 10,
      statusEffects: [],
      hitType: "vital",
    };
  }

  checkVitalPointHit(
    attackerPosition: Position,
    targetPosition: Position,
    targetBodyPosition: Position,
    technique: KoreanTechnique,
    _targetAngle: number,
    availableVitalPoints: readonly VitalPoint[]
  ): VitalPoint | null {
    const techniqueEffectiveRange = technique.damageRange.max * 0.1;
    if (
      calculateDistance(attackerPosition, targetPosition) >
      techniqueEffectiveRange
    ) {
      return null;
    }

    for (const vp of availableVitalPoints) {
      const vitalPointGlobalPosition = this.getGlobalVitalPointPosition(
        vp.location,
        targetBodyPosition,
        _targetAngle
      );

      const distanceToVP = calculateDistance(
        targetPosition,
        vitalPointGlobalPosition
      );
      const techniquePrecisionRadius = Math.max(
        0.05,
        technique.damageRange.min * 0.01
      );
      if (distanceToVP > techniquePrecisionRadius) {
        continue;
      }

      const distanceToVitalPoint = calculateDistance(
        targetPosition,
        vitalPointGlobalPosition
      );

      const vitalPointHitRadius = vp.baseAccuracy * 0.1;

      if (distanceToVitalPoint <= vitalPointHitRadius) {
        return vp;
      }
    }
    return null;
  }

  public determineClosestVitalPoint(
    hitPosition: Position,
    targetBodyPosition: Position,
    availableVitalPoints: readonly VitalPoint[],
    maxDistance: number = 0.1
  ): VitalPoint | null {
    let closestPoint: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const vp of availableVitalPoints) {
      const vitalPointGlobalPosition: Position = {
        x: targetBodyPosition.x + vp.location.x,
        y: targetBodyPosition.y + vp.location.y,
      };

      const distance = calculateDistance(hitPosition, vitalPointGlobalPosition);

      if (distance < minDistance && distance <= maxDistance) {
        minDistance = distance;
        closestPoint = vp;
      }
    }
    return closestPoint;
  }

  getPotentialVitalPointsInPath(
    _startPosition: Position,
    _endPosition: Position,
    _targetBodyPosition: Position,
    _technique: KoreanTechnique,
    availableVitalPoints: readonly VitalPoint[]
  ): readonly VitalPoint[] {
    const potentialPoints: VitalPoint[] = [];

    for (const vp of availableVitalPoints) {
      const vpGlobalPos = this.getGlobalVitalPointPosition(
        vp.location,
        _targetBodyPosition,
        0
      );

      const distToStart = calculateDistance(_startPosition, vpGlobalPos);
      const distToEnd = calculateDistance(_endPosition, vpGlobalPos);
      const attackPathLength = calculateDistance(_startPosition, _endPosition);

      if (
        distToStart + distToEnd <
        attackPathLength + (vp.baseAccuracy ?? 0.1)
      ) {
        potentialPoints.push(vp);
      }
    }
    return potentialPoints;
  }

  private isVitalPointAccessible(
    attackerPosition: Position,
    targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    defenderStance: string,
    defenderState: PlayerState
  ): boolean {
    // Check if the vital point can be accessed based on defender's stance and state
    const stanceProtection = {
      geon: ["head", "neck"],
      tae: ["torso"],
      li: ["limbs"],
      jin: ["head"],
      son: ["torso", "limbs"],
      gam: ["neck", "torso"],
      gan: ["head", "torso"],
      gon: ["limbs"],
    };

    const protectedRegions =
      stanceProtection[defenderStance as keyof typeof stanceProtection] || [];
    const vitalPointRegion = vitalPoint.location.region;

    // If the vital point is in a protected region, reduce accessibility
    if (protectedRegions.includes(vitalPointRegion)) {
      return Math.random() > 0.7; // 30% chance to hit protected area
    }

    // Check defender's consciousness and balance
    if (defenderState.consciousness < 50 || defenderState.balance < 30) {
      return true; // Easy to hit when defender is impaired
    }

    return true; // Default: accessible
  }

  private getGlobalVitalPointPosition(
    vitalPointLocation: { x: number; y: number; region: string },
    targetBodyPosition: Position,
    _targetAngle: number
  ): Position {
    return {
      x: targetBodyPosition.x + vitalPointLocation.x,
      y: targetBodyPosition.y + vitalPointLocation.y,
    };
  }
}
