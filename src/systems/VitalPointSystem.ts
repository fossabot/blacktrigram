import type {
  VitalPoint,
  VitalPointSystemConfig,
  VitalPointSystemInterface,
  VitalPointHitResult,
  KoreanTechnique,
  PlayerArchetype,
  PlayerState,
  StatusEffect,
} from "../types";
import { VITAL_POINTS_DATA } from "../types/constants"; // Assuming VITAL_POINTS_DATA is here

export class VitalPointSystem implements VitalPointSystemInterface {
  private vitalPoints: ReadonlyMap<string, VitalPoint>;
  private config: VitalPointSystemConfig;

  constructor(config?: VitalPointSystemConfig) {
    this.vitalPoints = new Map(VITAL_POINTS_DATA.map((vp) => [vp.id, vp]));
    this.config = {
      baseAccuracyMultiplier: 1.0,
      damageVariance: 0.1,
      baseDamageMultiplier: 1.0,
      vitalPointSeverityMultiplier: {
        minor: 1.1,
        moderate: 1.3,
        severe: 1.6,
        critical: 2.0,
        lethal: 3.0,
      },
      maxHitAngleDifference: 30, // degrees
      baseVitalPointAccuracy: 0.7,
      ...config,
    };
  }

  public setConfig(config: VitalPointSystemConfig): void {
    this.config = { ...this.config, ...config };
  }

  public getVitalPointById(id: string): VitalPoint | undefined {
    return this.vitalPoints.get(id);
  }

  public getAllVitalPoints(): readonly VitalPoint[] {
    return Array.from(this.vitalPoints.values());
  }

  public getVitalPointsByRegion(region: string): readonly VitalPoint[] {
    return Array.from(this.vitalPoints.values()).filter(
      (vp) => vp.location.region === region
    );
  }

  public getVitalPointsForBodyPart(bodyPartId: string): readonly VitalPoint[] {
    return Array.from(this.vitalPoints.values()).filter(
      (vp) => vp.location.region === bodyPartId
    );
  }

  public getVitalPointEffects(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    isCriticalHit: boolean
  ): readonly StatusEffect[] {
    const effects: StatusEffect[] = [];
    if (vitalPoint.effects) {
      vitalPoint.effects.forEach((vpEffect) => {
        // Convert VitalPointEffect to StatusEffect
        effects.push({
          id: vpEffect.id || `${vitalPoint.id}_${technique.id}_effect`,
          type: vpEffect.type,
          intensity: vpEffect.intensity,
          duration: vpEffect.duration * (isCriticalHit ? 1.5 : 1),
          description: vpEffect.description,
          stackable:
            vpEffect.stackable !== undefined ? vpEffect.stackable : false,
        });
      });
    }
    return effects;
  }

  public calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    isCriticalHit: boolean = false
  ): number {
    // Use base damage from technique or vital point
    let baseDamage = technique.damage || vitalPoint.baseDamage || 10;

    // Apply severity multiplier
    const severityMultiplier =
      this.config.vitalPointSeverityMultiplier?.[vitalPoint.severity] || 1.0;
    baseDamage *= severityMultiplier;

    // Apply critical hit multiplier
    if (isCriticalHit) {
      baseDamage *= 1.5; // Default critical multiplier
    }

    // Apply archetype specific modifiers if available in config
    const archetypeModifier =
      this.config.archetypeModifiers?.[attackerArchetype]?.[
        vitalPoint.category
      ] || 1.0;
    baseDamage *= archetypeModifier;

    baseDamage *= this.config.baseDamageMultiplier || 1.0;

    // Add variance
    const varianceAmount = baseDamage * (this.config.damageVariance || 0.1);
    baseDamage += Math.random() * varianceAmount * 2 - varianceAmount;

    return Math.max(0, Math.round(baseDamage));
  }

  public calculateHit(
    technique: KoreanTechnique,
    targetedVitalPointId: string | null,
    accuracyRoll: number
  ): VitalPointHitResult {
    // Determine if the hit connects based on accuracy roll
    const hit = accuracyRoll > 0.5; // Simple threshold for now

    if (!hit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        vitalPointsHit: [],
      };
    }

    let finalDamage = technique.damage || 10; // Default damage if not specified
    let effects: StatusEffect[] = [];
    let vitalPointsHit: string[] = [];

    // Check if a vital point was hit
    if (targetedVitalPointId) {
      const vitalPoint = this.getVitalPointById(targetedVitalPointId);
      if (vitalPoint && accuracyRoll < vitalPoint.baseAccuracy) {
        // Vital point hit - apply multiplier and effects
        finalDamage = Math.floor(
          (technique.damage || 10) * vitalPoint.damageMultiplier
        );
        effects = [...vitalPoint.effects] as StatusEffect[];
        vitalPointsHit = [vitalPoint.id];
      }
    }

    return {
      hit: true,
      damage: finalDamage,
      effects: effects as readonly StatusEffect[],
      vitalPointsHit: vitalPointsHit as readonly string[],
    };
  }

  public applyVitalPointEffects(
    player: PlayerState,
    vitalPoint: VitalPoint,
    intensityMultiplier: number = 1.0
  ): PlayerState {
    const effects = vitalPoint.effects.map((effect) => ({
      id: `${effect.id}_${Date.now()}`,
      name: effect.description, // Keep as KoreanText for name
      type: effect.type,
      intensity: effect.intensity,
      duration: Math.round(effect.duration * intensityMultiplier),
      description: effect.description,
      stackable: effect.stackable,
      source: "vital_point" as const, // Add source property for CombatCondition
    }));

    return {
      ...player,
      conditions: [...player.conditions, ...effects],
    };
  }
}
