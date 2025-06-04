import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  VitalPoint,
  VitalPointHitResult,
  AttackInput, // Add missing import
  TrigramStance, // Add missing import
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";
import { STANCE_EFFECTIVENESS_MATRIX } from "../types/constants";

export class CombatSystem {
  private static vitalPointSystem: VitalPointSystem | null = null;
  private static trigramSystem: TrigramSystem | null = null;

  /**
   * Execute a full attack sequence - main combat method
   */
  public static async executeAttack(
    attackInput: AttackInput // Now properly imported
  ): Promise<CombatResult> {
    const { attacker, defender, technique, targetPoint } = attackInput;

    let baseResult = this.calculateTechnique(technique, attacker.archetype);
    let hitResult: VitalPointHitResult | null = null;

    // Convert string targetPoint to VitalPoint object if provided
    if (targetPoint && this.vitalPointSystem) {
      const vitalPointObject =
        this.vitalPointSystem.getVitalPointById(targetPoint);
      if (vitalPointObject) {
        const accuracyBonus = Math.random();
        hitResult = this.vitalPointSystem.calculateHit(
          technique,
          vitalPointObject,
          accuracyBonus,
          attacker.position
        );

        // Use hitResult to modify damage or effects
        if (hitResult.hit) {
          baseResult.damage += hitResult.damage;
          baseResult.effects.push(...hitResult.effects);
        }
      }
    }

    // Calculate hit chance based on stance effectiveness
    const stanceEffectiveness = this.calculateStanceEffectiveness(
      attacker.stance,
      defender.stance
    );

    const baseHitChance = 0.8; // 80% base hit chance
    const finalHitChance = baseHitChance * stanceEffectiveness;
    const hit = Math.random() < finalHitChance;

    if (!hit) {
      return {
        damage: 0,
        damageType: technique.damageType || "blunt",
        isVitalPoint: false,
        newState: "ready", // Or defender's current state
        effects: [],
        hit: false,
        critical: false,
        vitalPointsHit: [],
        attacker: attacker.archetype,
        defender: defender.archetype,
        damagePrevented: 0,
        staminaUsed: technique.staminaCost || 10, // Attacker's stamina cost for missed attack
        kiUsed: technique.kiCost || 5, // Attacker's KI cost for missed attack
        defenderDamaged: false,
        attackerStance: attacker.stance,
        defenderStance: defender.stance,
        painLevel: 0,
        consciousnessImpact: 0,
        balanceEffect: 0,
        bloodLoss: 0,
        stunDuration: 0,
        statusEffects: [],
        hitType: "miss",
        techniqueUsed: technique,
        effectiveness: stanceEffectiveness,
        hitPosition: defender.position, // Or a "miss" position
      };
    }

    // Apply vital point targeting if specified
    const resultWithVitalPoint = targetPoint
      ? this.applyVitalPointDamage(
          baseResult,
          targetPoint,
          technique,
          attacker.archetype
        ) // Pass technique and archetype
      : baseResult;

    return {
      ...resultWithVitalPoint, // Spread the potentially modified result
      defender: defender.archetype, // Ensure these are correctly set after vital point application
      defenderStance: defender.stance,
      hit: true,
      defenderDamaged: resultWithVitalPoint.damage > 0,
      // painLevel, consciousnessImpact etc. should be part of resultWithVitalPoint if modified by vital hit
      // If applyVitalPointDamage doesn't update these, they might need to be recalculated here
      // For now, assume resultWithVitalPoint contains all necessary updates from vital hit.
      painLevel: resultWithVitalPoint.painLevel,
      consciousnessImpact: resultWithVitalPoint.consciousnessImpact,
      balanceEffect: resultWithVitalPoint.balanceEffect,
      bloodLoss: resultWithVitalPoint.bloodLoss,
      stunDuration: resultWithVitalPoint.stunDuration,
      statusEffects: resultWithVitalPoint.statusEffects,
      hitType: resultWithVitalPoint.hitType,
      techniqueUsed: technique,
      effectiveness: stanceEffectiveness,
      hitPosition: defender.position, // Or more precise if available
    };
  }

  /**
   * Calculate stance effectiveness matrix
   */
  public static calculateStanceEffectiveness(
    attackerStance: TrigramStance, // Now properly imported
    defenderStance: TrigramStance // Now properly imported
  ): number {
    const matrix = STANCE_EFFECTIVENESS_MATRIX as Record<
      TrigramStance, // Now properly imported
      Record<TrigramStance, number> // Now properly imported
    >;
    return matrix[attackerStance]?.[defenderStance] || 1.0;
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
      vitalPointObject!,
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
