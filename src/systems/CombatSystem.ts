import type {
  PlayerState,
  CombatResult,
  VitalPoint,
  TrigramStance,
  PlayerArchetype,
  AttackInput,
  KoreanTechnique,
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";

export class CombatSystem {
  private static vitalPointSystem = new VitalPointSystem();

  /**
   * Execute a full attack sequence - main combat method
   */
  public static async executeAttack(input: AttackInput): Promise<CombatResult> {
    const { attacker, defender, technique, targetPoint } = input; // targetPoint now exists

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

    // Calculate base technique result
    let baseResult = this.calculateTechnique(technique, attacker.archetype);

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
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const effectiveness: Record<
      TrigramStance,
      Record<TrigramStance, number>
    > = {
      geon: {
        geon: 1.0,
        tae: 1.2,
        li: 0.8,
        jin: 1.1,
        son: 0.9,
        gam: 1.0,
        gan: 0.7,
        gon: 1.3,
      },
      tae: {
        geon: 0.8,
        tae: 1.0,
        li: 1.2,
        jin: 0.9,
        son: 1.1,
        gam: 1.3,
        gan: 1.0,
        gon: 0.7,
      },
      li: {
        geon: 1.2,
        tae: 0.8,
        li: 1.0,
        jin: 1.3,
        son: 0.7,
        gam: 0.9,
        gan: 1.1,
        gon: 1.0,
      },
      jin: {
        geon: 0.9,
        tae: 1.1,
        li: 0.7,
        jin: 1.0,
        son: 1.2,
        gam: 1.0,
        gan: 1.3,
        gon: 0.8,
      },
      son: {
        geon: 1.1,
        tae: 0.9,
        li: 1.3,
        jin: 0.8,
        son: 1.0,
        gam: 1.2,
        gan: 0.7,
        gon: 1.0,
      },
      gam: {
        geon: 1.0,
        tae: 0.7,
        li: 1.1,
        jin: 1.0,
        son: 0.8,
        gam: 1.0,
        gan: 1.2,
        gon: 1.3,
      },
      gan: {
        geon: 1.3,
        tae: 1.0,
        li: 0.9,
        jin: 0.7,
        son: 1.3,
        gam: 0.8,
        gan: 1.0,
        gon: 1.1,
      },
      gon: {
        geon: 0.7,
        tae: 1.3,
        li: 1.0,
        jin: 1.2,
        son: 1.0,
        gam: 0.7,
        gan: 0.9,
        gon: 1.0,
      },
    };

    return effectiveness[attackerStance]?.[defenderStance] ?? 1.0;
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
    const vitalHitDetails = this.vitalPointSystem.calculateVitalPointHitEffects(
      vitalPoint,
      baseResult.damage, // Base damage from technique
      archetype,
      technique,
      baseResult.critical // Pass critical status
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
