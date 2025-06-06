import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  TrigramStance,
  CombatState, // Added CombatState
} from "../types";
import { STANCE_EFFECTIVENESS_MATRIX } from "../types/constants";
import {
  executeTechnique,
  isPlayerCapacitated,
  calculateArchetypeDamage,
} from "../utils/playerUtils";

export class CombatSystem {
  /**
   * Execute a full attack sequence using playerUtils' executeTechnique.
   */
  public static async executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetPoint?: string | null
  ): Promise<CombatResult> {
    // Use playerUtils' executeTechnique for core logic
    const { hitResult } = executeTechnique(
      attacker,
      defender,
      technique,
      targetPoint
    );
    // Optionally, update states in your game loop with updatedAttacker/updatedDefender
    return hitResult;
  }

  /**
   * Calculate stance effectiveness matrix using constants.
   */
  public static calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance] ?? 1.0;
  }

  /**
   * Calculate technique damage and effects using playerUtils.
   */
  public static calculateTechnique(
    technique: KoreanTechnique,
    archetype: PlayerArchetype
  ): CombatResult {
    // Use playerUtils to get archetype damage
    const baseDamage =
      technique.damage ??
      (technique.damageRange
        ? (technique.damageRange.min + technique.damageRange.max) / 2
        : 10);
    const damage = calculateArchetypeDamage(archetype, baseDamage);
    const isCritical =
      Math.random() < (technique.critChance ?? 0.1) ||
      (!!technique.critMultiplier && Math.random() < 0.05); // Ensure boolean evaluation

    return {
      attacker: archetype,
      defender: archetype,
      damage: isCritical
        ? Math.round(damage * (technique.critMultiplier ?? 1.5))
        : Math.round(damage),
      hit: true,
      critical: isCritical,
      techniqueUsed: technique,
      effects: technique.effects || [],
      vitalPointsHit: [],
      defenderDamaged: true,
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready" as CombatState, // Cast to CombatState
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 0,
      kiUsed: technique.kiCost || 0,
      attackerStance: technique.stance || "geon",
      defenderStance: "geon",
      painLevel: damage * 0.5,
      consciousnessImpact: damage * 0.1,
      balanceEffect: 0,
      bloodLoss: 0,
      stunDuration: isCritical ? 1000 : 0,
      statusEffects: technique.effects || [],
      hitType: isCritical ? "critical" : "normal",
      effectiveness: 1.0,
      hitPosition: { x: 0, y: 0 },
    };
  }

  /**
   * Check win condition based on incapacitation, pain, or consciousness.
   */
  static checkWinCondition(
    players: readonly [PlayerState, PlayerState]
  ): string | null {
    const [player1, player2] = players;
    if (!isPlayerCapacitated(player1)) return player2.id;
    if (!isPlayerCapacitated(player2)) return player1.id;
    return null;
  }

  /**
   * Determine the winner of a combat round based on player states.
   */
  static determineRoundWinner(
    players: readonly [PlayerState, PlayerState]
  ): string | null {
    return this.checkWinCondition(players);
  }

  /**
   * Execute a technique for test purposes (stateless).
   */
  public static executeTechnique(
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderArchetype?: PlayerArchetype
  ): CombatResult {
    // Use playerUtils' calculateArchetypeDamage for base damage
    const baseDamage =
      technique.damage ??
      (technique.damageRange
        ? (technique.damageRange.min + technique.damageRange.max) / 2
        : 10);
    const damage = calculateArchetypeDamage(attackerArchetype, baseDamage); // Use attackerArchetype
    const accuracy = technique.accuracy ?? 0.8;
    const hit = Math.random() < accuracy;
    const isCritical =
      hit && // Critical only if hit
      (Math.random() < (technique.critChance ?? 0.1) ||
        (!!technique.critMultiplier && Math.random() < 0.05)); // Ensure boolean evaluation

    return {
      attacker: attackerArchetype,
      defender: defenderArchetype || attackerArchetype,
      damage: hit
        ? isCritical
          ? Math.round(damage * (technique.critMultiplier ?? 1.5))
          : Math.round(damage)
        : 0,
      hit,
      critical: isCritical,
      techniqueUsed: technique,
      effects: technique.effects || [],
      vitalPointsHit: [],
      defenderDamaged: hit,
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready" as CombatState, // Cast to CombatState
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 0,
      kiUsed: technique.kiCost || 0,
      attackerStance: technique.stance || "geon",
      defenderStance: "geon",
      painLevel: hit ? damage * 0.5 : 0,
      consciousnessImpact: hit ? damage * 0.1 : 0,
      balanceEffect: 0,
      bloodLoss: 0,
      stunDuration: isCritical ? 1000 : 0,
      statusEffects: technique.effects || [],
      hitType: hit ? (isCritical ? "critical" : "normal") : "miss",
      effectiveness: 1.0,
      hitPosition: { x: 0, y: 0 },
    };
  }
}
