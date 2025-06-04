import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  VitalPoint,
  VitalPointHitResult,
  TrigramStance, // Add missing import
  AttackInput,
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
// Remove unused TrigramSystem import
import { VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints";
import { STANCE_EFFECTIVENESS_MATRIX } from "../types/constants"; // Add missing import

export class CombatSystem {
  private static vitalPointSystem: VitalPointSystem | null = null;

  public static initialize(): void {
    // Fix constructor call by providing required parameter
    this.vitalPointSystem = new VitalPointSystem(VITAL_POINTS_DATA);
  }

  /**
   * Execute a full attack sequence - main combat method
   */
  public static async executeAttack(
    attackInput: AttackInput
  ): Promise<CombatResult> {
    const { attacker, defender, technique, targetPoint } = attackInput;

    let baseResult = this.calculateTechnique(technique, attacker.archetype);
    let hitResult: VitalPointHitResult | null = null;

    // Fix: Proper vital point handling with null checks
    if (targetPoint && this.vitalPointSystem) {
      const vitalPointObject =
        this.vitalPointSystem.getVitalPointById(targetPoint);
      if (vitalPointObject) {
        const accuracyBonus = this.calculateAccuracyBonus(
          attacker.archetype,
          technique
        );
        hitResult = this.vitalPointSystem.calculateHit(
          technique,
          vitalPointObject, // Fix: Pass VitalPoint object, not string
          accuracyBonus,
          attacker.position
        );
      }
    }

    // Fix: Create new result object instead of mutating readonly property
    const stanceEffectiveness = 1.0; // Simplified - remove trigramSystem dependency for now
    const finalDamage = Math.floor(baseResult.damage * stanceEffectiveness);

    const finalResult: CombatResult = {
      ...baseResult,
      damage: finalDamage, // Fix: Create new object with modified damage
      vitalPointsHit: hitResult ? [hitResult.vitalPoint] : [],
      hitResult: hitResult,
    };

    return finalResult;
  }

  // Fix: Add missing helper method
  private static calculateAccuracyBonus(
    archetype: PlayerArchetype,
    technique: KoreanTechnique
  ): number {
    // Korean archetype specializations
    const archetypeModifiers: Record<PlayerArchetype, number> = {
      musa: 1.1, // Traditional warrior discipline
      amsalja: 1.8, // Assassin precision
      hacker: 1.4, // Tech-enhanced targeting
      jeongbo_yowon: 1.5, // Intelligence operative analysis
      jojik_pokryeokbae: 1.2, // Street combat experience
    };

    let accuracy = technique.accuracy || 0.8;
    accuracy *= archetypeModifiers[archetype] || 1.0;

    return Math.min(accuracy, 0.98); // Cap at 98% for realism
  }

  /**
   * Calculate stance effectiveness matrix
   */
  public static calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const matrix = STANCE_EFFECTIVENESS_MATRIX as Record<
      TrigramStance,
      Record<TrigramStance, number>
    >;
    return matrix[attackerStance]?.[defenderStance] ?? 1.0;
  }

  /**
   * Calculate technique damage and effects
   */
  static calculateTechnique(
    technique: KoreanTechnique,
    archetype: PlayerArchetype
  ): CombatResult {
    let baseDamage = technique.damageRange
      ? (technique.damageRange.min + technique.damageRange.max) / 2
      : technique.damage || 20;
    const isCritical = Math.random() < (technique.critChance || 0.15);

    // Apply archetype bonuses
    switch (archetype) {
      case "musa":
        baseDamage *=
          technique.stance === "geon" || technique.stance === "jin" ? 1.2 : 1.0; // Musa bonus for Geon/Jin
        break;
      case "amsalja":
        baseDamage *=
          technique.stance === "son" || technique.stance === "gam" ? 1.15 : 1.0; // Amsalja bonus
        if (isCritical) baseDamage *= 1.3; // Amsalja critical bonus
        break;
      // Add other archetypes
    }

    if (isCritical) {
      baseDamage *= technique.critMultiplier || 1.5;
    }

    const calculatedDamage = Math.round(baseDamage);

    return {
      damage: calculatedDamage,
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready", // This should reflect defender's state change, placeholder
      effects: technique.effects || [],
      hit: true, // Assuming hit is determined before this function
      critical: isCritical,
      vitalPointsHit: [],
      attacker: archetype,
      defender: archetype, // Placeholder, should be actual defender archetype if known
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 10,
      kiUsed: technique.kiCost || 5,
      defenderDamaged: calculatedDamage > 0,
      attackerStance: technique.stance || "geon", // Should be attacker's actual stance
      defenderStance: "geon", // Placeholder, should be defender's actual stance
      painLevel: calculatedDamage * 0.8,
      consciousnessImpact: calculatedDamage * 0.5,
      balanceEffect: calculatedDamage * 0.3,
      bloodLoss: calculatedDamage * 0.1,
      stunDuration: isCritical ? 1000 : 500,
      statusEffects: technique.effects || [], // Or combine with other generated effects
      hitType: isCritical ? "critical" : "normal",
      techniqueUsed: technique,
      effectiveness: 1.0, // Placeholder, should be calculated based on stances
      hitPosition: { x: 0, y: 0 }, // Placeholder
    };
  }

  /**
   * Apply vital point specific damage and effects
   */
  private static applyVitalPointDamage(
    baseResult: CombatResult,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique, // Added technique
    archetype: PlayerArchetype // Added archetype
  ): CombatResult {
    // Use VitalPointSystem to calculate refined damage and effects
    const vitalHitDetails = this.vitalPointSystem.calculateHit(
      technique,
      vitalPoint, // Use the vitalPoint parameter directly
      accuracyBonus,
      attacker.position
    );

    const combinedEffects = [
      ...(baseResult.effects || []),
      ...vitalHitDetails.effects,
    ];

    let hitType: "normal" | "critical" | "vital" = "normal";

    // If it's a vital hit, ensure hitType reflects that, possibly overriding critical
    if (vitalHitDetails) {
      hitType = "vital";
    }

    return {
      ...baseResult,
      damage: vitalHitDetails.damage,
      isVitalPoint: true,
      vitalPointsHit: [vitalPoint],
      effects: combinedEffects,
      statusEffects: combinedEffects, // Assuming statusEffects are the same as effects here
      // Update other combat result fields based on vital hit
      painLevel: vitalHitDetails.damage * 0.5, // Example, adjust based on vitalHitDetails
      consciousnessImpact: vitalHitDetails.damage * 0.4, // Example
      bloodLoss: baseResult.bloodLoss + vitalHitDetails.damage * 0.3, // Example
      stunDuration: baseResult.stunDuration + (vitalPoint.baseStun || 1000), // Example
      hitType: hitType, // Corrected assignment
    };
  }

  /**
   * Check win condition based on Korean martial arts realism
   */
  static checkWinCondition(
    players: readonly [PlayerState, PlayerState]
  ): string | null {
    const [player1, player2] = players;

    // Check for incapacitation
    if (player1.health <= 0 || player1.consciousness <= 0) {
      return player2.id;
    }
    if (player2.health <= 0 || player2.consciousness <= 0) {
      return player1.id;
    }

    // Check for pain overload
    if (player1.pain >= 95) {
      return player2.id;
    }
    if (player2.pain >= 95) {
      return player1.id;
    }

    return null; // No winner yet
  }

  /**
   * Determine the winner of a combat round based on player states
   */
  static determineRoundWinner(
    players: readonly [PlayerState, PlayerState]
  ): string | null {
    const winner = this.checkWinCondition(players);
    return winner;
  }
}
