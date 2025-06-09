import type {
  VitalPoint,
  KoreanTechnique,
  VitalPointSystemConfig,
  StatusEffect,
  DamageResult,
  PlayerState,
  VitalPointEffect,
} from "../../types";
import {
  VitalPointSeverity,
  DamageType,
  EffectIntensity,
} from "../../types/enums";

/**
 * Calculate damage based on vital point targeting
 */
export class DamageCalculator {
  private readonly config: VitalPointSystemConfig;

  constructor(config: VitalPointSystemConfig) {
    this.config = config;
  }

  /**
   * Calculate vital point damage
   */
  public static calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attacker: PlayerState
  ): number {
    const baseDamage =
      vitalPoint.baseDamage || vitalPoint.damage?.average || 10;
    const techniqueModifier = (technique.damage || 20) / 20;
    const severityMultiplier = this.getSeverityMultiplier(vitalPoint.severity);

    return Math.floor(baseDamage * techniqueModifier * severityMultiplier);
  }

  /**
   * Calculate total damage including vital point effects
   */
  public static calculateTotalDamage(
    baseDamage: number,
    vitalPointHit: boolean,
    vitalPoint?: VitalPoint
  ): DamageResult {
    let totalDamage = baseDamage;
    let vitalPointDamage = 0;
    const effects: StatusEffect[] = [];

    if (vitalPointHit && vitalPoint) {
      vitalPointDamage =
        vitalPoint.baseDamage || vitalPoint.damage?.average || 0;
      totalDamage += vitalPointDamage;

      // Convert VitalPointEffect to StatusEffect
      if (vitalPoint.effects) {
        for (const vpEffect of vitalPoint.effects) {
          effects.push(this.convertVitalPointEffectToStatusEffect(vpEffect));
        }
      }
    }

    return {
      totalDamage,
      vitalPointDamage,
      effects,
    };
  }

  /**
   * Convert VitalPointEffect to StatusEffect
   */
  private static convertVitalPointEffectToStatusEffect(
    vpEffect: VitalPointEffect
  ): StatusEffect {
    return {
      id: vpEffect.id || `vp_effect_${Date.now()}`,
      type: vpEffect.type as any,
      intensity: vpEffect.intensity as any,
      duration: vpEffect.duration,
      description: vpEffect.description,
      stackable: vpEffect.stackable || false,
      source: vpEffect.source || "vital_point",
      startTime: Date.now(),
      endTime: Date.now() + vpEffect.duration,
    };
  }

  /**
   * Get severity multiplier
   */
  private static getSeverityMultiplier(severity: VitalPointSeverity): number {
    switch (severity) {
      case VitalPointSeverity.MINOR:
        return 1.0;
      case VitalPointSeverity.MODERATE:
        return 1.3;
      case VitalPointSeverity.MAJOR:
        return 1.6;
      case VitalPointSeverity.CRITICAL:
        return 2.0;
      default:
        return 1.0;
    }
  }

  /**
   * Calculate damage with type effectiveness
   */
  private calculateDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    damageType: DamageType,
    isCritical: boolean = false
  ): number {
    const techniqueModifier = (technique.damage || 20) / 20;
    let totalDamage = vitalPoint.baseDamage || 0;

    // Apply severity multiplier
    const severityMultiplier =
      this.config.damageMultipliers?.[vitalPoint.severity] ?? 1.0;
    totalDamage *= severityMultiplier;

    // Apply damage type effectiveness
    const effectivenessMultiplier = this.calculateTypeEffectiveness(
      vitalPoint,
      damageType
    );
    totalDamage *= effectivenessMultiplier;

    // Apply technique modifier
    totalDamage *= techniqueModifier;

    // Apply critical hit multiplier
    if (isCritical) {
      totalDamage *= 1.5;
    }

    return Math.max(0, Math.round(totalDamage));
  }

  /**
   * Calculate type effectiveness
   */
  private calculateTypeEffectiveness(
    vitalPoint: VitalPoint,
    damageType: DamageType
  ): number {
    // Type effectiveness mapping
    const effectiveness: Record<string, Record<string, number>> = {
      [DamageType.BLUNT]: {
        skeletal: 1.3,
        muscular: 1.2,
      },
      [DamageType.PIERCING]: {
        neurological: 1.4,
        vascular: 1.3,
      },
      [DamageType.PRESSURE]: {
        neurological: 1.5,
        respiratory: 1.4,
        vascular: 1.3,
      },
      [DamageType.NERVE]: {
        neurological: 1.6,
      },
      [DamageType.JOINT]: {
        skeletal: 1.8,
      },
    };

    const categoryStr = vitalPoint.category.toString();
    return effectiveness[damageType]?.[categoryStr] || 1.0;
  }

  /**
   * Determine status effects from vital point hit
   */
  public determineEffects(
    vitalPoint: VitalPoint | null,
    technique: KoreanTechnique,
    isCritical: boolean
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];

    // Add technique effects
    if (technique.effects) {
      effects.push(...technique.effects);
    }

    // Add vital point effects
    if (vitalPoint?.effects) {
      for (const vpEffect of vitalPoint.effects) {
        effects.push(
          DamageCalculator.convertVitalPointEffectToStatusEffect(vpEffect)
        );
      }
    }

    // Add critical hit effect
    if (isCritical) {
      effects.push({
        id: `critical_hit_effect_${Date.now()}`,
        type: "stun" as any,
        intensity: EffectIntensity.MODERATE as any,
        duration: 2000,
        description: {
          korean: "치명타 효과",
          english: "Critical hit effect",
        },
        stackable: false,
        source: "critical_hit",
        startTime: Date.now(),
        endTime: Date.now() + 2000,
      });
    }

    return effects;
  }

  /**
   * Calculate damage reduction from armor/defense
   */
  public calculateDamageReduction(
    rawDamage: number,
    defenderState: PlayerState
  ): number {
    // Base damage reduction from stance
    const stanceReduction = 0.1; // 10% base reduction

    // Additional reduction from blocking
    const blockReduction = defenderState.isBlocking ? 0.5 : 0;

    // Calculate total reduction (max 80%)
    const totalReduction = Math.min(0.8, stanceReduction + blockReduction);

    return Math.floor(rawDamage * (1 - totalReduction));
  }
}
