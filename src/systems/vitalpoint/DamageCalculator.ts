import type {
  VitalPoint,
  PlayerArchetype,
  KoreanTechnique,
  VitalPointSystemConfig,
  StatusEffect,
  DamageType,
} from "../../types";

export class DamageCalculator {
  private readonly config: VitalPointSystemConfig;

  constructor(config: VitalPointSystemConfig) {
    this.config = config;
  }

  public calculateDamage(
    vitalPoint: VitalPoint,
    baseDamage: number,
    archetype: PlayerArchetype,
    isCriticalHit: boolean = false,
    damageType: DamageType
  ): number {
    let totalDamage = baseDamage;

    // Apply base damage multiplier from config
    totalDamage *= this.config.baseDamageMultiplier ?? 1.0;

    // Apply damage type modifiers based on vital point and technique
    if (damageType === "nerve" && vitalPoint.category === "nerve_points") {
      totalDamage *= 1.3; // Nerve damage is more effective on nerve points
    } else if (damageType === "blunt" && vitalPoint.category === "joints") {
      totalDamage *= 1.2; // Blunt damage effective on joints
    } else if (
      damageType === "pressure" &&
      vitalPoint.category === "vascular"
    ) {
      totalDamage *= 1.4; // Pressure attacks effective on blood vessels
    } else if (damageType === "joint" && vitalPoint.category === "joints") {
      totalDamage *= 1.5; // Joint techniques very effective on joint targets
    }

    // Apply archetype-specific modifiers
    const archetypeMods = this.config.archetypeModifiers?.[archetype];
    if (archetypeMods) {
      totalDamage *= 1 + (archetypeMods.damageBonus ?? 0);
      // Accuracy and critical chance handled elsewhere, focus on damage calculation here
    }

    // Apply vital point severity multiplier
    const severityMultiplier =
      this.config.vitalPointSeverityMultiplier?.[vitalPoint.severity];
    if (severityMultiplier) {
      totalDamage *= severityMultiplier;
    }
    totalDamage += vitalPoint.baseDamage || 0; // Add VP base damage

    // Check for critical hit based on technique and vital point
    if (isCriticalHit) {
      totalDamage *= 1.5; // Apply critical multiplier
    }

    // Ensure damage is not negative
    totalDamage = Math.max(0, totalDamage);

    return Math.round(totalDamage);
  }

  public determineEffects(
    vitalPoint: VitalPoint | null,
    technique: KoreanTechnique,
    isCritical: boolean
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];
    if (technique.effects) {
      effects.push(...technique.effects);
    }
    if (vitalPoint?.effects) {
      vitalPoint.effects.forEach((vpEffect) => {
        effects.push({
          id: vpEffect.id,
          type: vpEffect.type,
          intensity: vpEffect.intensity,
          duration: vpEffect.duration,
          description: vpEffect.description,
          stackable: vpEffect.stackable,
        });
      });
    }
    if (isCritical) {
      // Add generic critical effect or enhance existing ones
    }
    return effects;
  }
}
