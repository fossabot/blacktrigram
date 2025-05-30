import type {
  Position,
  VitalPoint,
  KoreanTechnique,
  // AnatomicalRegion, // Unused
  VitalPointHit,
  // VitalPointCategory, // Unused
  AnatomicalRegionIdentifier,
  StatusEffect,
} from "../types";
import { KOREAN_VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints";

export interface VitalPointSystemConfig {
  baseAccuracy?: number; // Make optional to match types/index.ts
  distanceModifier?: number; // Make optional
  angleModifier?: number;
}

const defaultConfig: VitalPointSystemConfig = {
  baseAccuracy: 0.8,
  distanceModifier: 0.05,
};

export const VitalPointSystem = {
  config: defaultConfig,

  configure(newConfig: Partial<VitalPointSystemConfig>) {
    this.config = { ...this.config, ...newConfig };
  },

  getVitalPointsForRegion(regionId: AnatomicalRegionIdentifier): VitalPoint[] {
    return KOREAN_VITAL_POINTS_DATA.filter(
      (vp: VitalPoint) => vp.region === regionId
    ); // Typed vp
  },

  getAllVitalPoints(): VitalPoint[] {
    return KOREAN_VITAL_POINTS_DATA;
  },

  checkVitalPointHit(
    targetPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    configParams: VitalPointSystemConfig // Make required to match CombatSystem usage
  ): VitalPointHit | null {
    const currentConfig = { ...defaultConfig, ...configParams };

    const effectiveDistance =
      Math.sqrt(
        Math.pow(targetPosition.x - vitalPoint.position.x, 2) +
          Math.pow(targetPosition.y - vitalPoint.position.y, 2)
      ) + distanceToTarget;

    const techAccuracy =
      "accuracyModifier" in technique ? technique.accuracyModifier : 1.0;
    const vpAccessibility =
      "accessibility" in vitalPoint ? vitalPoint.accessibility : 0.7;
    let hitChance = (techAccuracy || 1.0) * (vpAccessibility || 0.7);

    hitChance -= effectiveDistance * (currentConfig.distanceModifier ?? 0.05); // Use nullish coalescing
    if (currentConfig.angleModifier) {
      // Use angleModifier safely
    }
    hitChance = Math.max(0, Math.min(1, hitChance)); // Clamp between 0 and 1

    if (Math.random() < hitChance) {
      const vpDamageMultiplier =
        "damageMultiplier" in vitalPoint ? vitalPoint.damageMultiplier : 1.0;
      const vpStunMultiplier =
        "stunMultiplier" in vitalPoint ? vitalPoint.stunMultiplier : 0;
      const appliedEffects: StatusEffect[] = (vitalPoint.effects || []).filter(
        (e) => Math.random() < (e.chance || 1.0)
      );
      const techStunValue = "stunValue" in technique ? technique.stunValue : 0;
      const vpCritChanceBonus =
        "critChanceBonus" in vitalPoint ? vitalPoint.critChanceBonus : 0;

      return {
        hit: true,
        region: vitalPoint.region,
        vitalPoint: vitalPoint,
        description: `Hit ${vitalPoint.koreanName} (${vitalPoint.name.english})!`,
        effectiveness: hitChance,
        damage: Math.round(
          (technique.damage || 0) * (vpDamageMultiplier || 1.0)
        ),
        stunning: Math.round((techStunValue || 0) * (vpStunMultiplier || 0)),
        critical: Math.random() < (vpCritChanceBonus || 0),
        effectsApplied: appliedEffects,
      };
    }

    return null;
  },
};
