import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  StatusEffect,
  CombatSystemInterface,
  VitalPointSystemInterface,
  TrigramSystemInterface,
} from "../types";

/**
 * Simple combat configuration interface
 */
interface CombatConfig {
  readonly DAMAGE_MULTIPLIER?: number;
  readonly BLOCK_REDUCTION?: number;
}

export class CombatSystem implements CombatSystemInterface {
  private vitalPointSystem: VitalPointSystemInterface;
  private trigramSystem: TrigramSystemInterface;
  private config: CombatConfig;

  constructor(
    vitalPointSystem: VitalPointSystemInterface,
    trigramSystem: TrigramSystemInterface,
    config: CombatConfig = {}
  ) {
    this.vitalPointSystem = vitalPointSystem;
    this.trigramSystem = trigramSystem;
    this.config = config;
  }

  /**
   * Resolve an attack between attacker and defender
   */
  public resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    // Calculate hit using vital point system
    const hitCheckResult = this.vitalPointSystem.calculateHit(technique);

    // Get stance effectiveness
    const stanceEffectiveness = this.trigramSystem.getStanceEffectiveness(
      attacker.stance,
      defender.stance
    );

    // Calculate final damage
    const baseDamage = hitCheckResult.damage;
    const finalDamage = Math.floor(baseDamage * stanceEffectiveness);

    // Return simplified combat result
    return {
      hit: hitCheckResult.hit,
      damage: finalDamage,
      technique: technique.koreanName,
      isVitalPoint: hitCheckResult.vitalPointsHit.length > 0,
      vitalPointsHit: hitCheckResult.vitalPointsHit,
      critical: Math.random() < 0.1,
      effects: hitCheckResult.effects,
      attacker: attacker.archetype,
      defender: defender.archetype,
      damagePrevented: 0,
      staminaUsed: technique.staminaCost,
      kiUsed: technique.kiCost,
      defenderDamaged: hitCheckResult.hit,
      attackerStance: attacker.stance,
      defenderStance: defender.stance,
    };
  }

  /**
   * Calculate damage details
   */
  public calculateDamage(
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderState: PlayerState,
    hitResult: CombatResult
  ): {
    baseDamage: number;
    modifierDamage: number;
    totalDamage: number;
    effectsApplied: readonly StatusEffect[];
  } {
    const baseDamage = hitResult.damage;
    const modifierDamage = 0; // Simplified
    const totalDamage = baseDamage + modifierDamage;

    return {
      baseDamage,
      modifierDamage,
      totalDamage,
      effectsApplied: [],
    };
  }

  /**
   * Check win condition for the combat match
   */
  checkWinCondition(
    player1: PlayerState,
    player2: PlayerState
  ): { winner: 1 | 2; reason: string } | null {
    if (player1.consciousness <= 0) {
      return { winner: 2, reason: "Player 1 knocked out" };
    }
    if (player2.consciousness <= 0) {
      return { winner: 1, reason: "Player 2 knocked out" };
    }
    if (player1.health <= 0) {
      return { winner: 2, reason: "Player 1 defeated" };
    }
    if (player2.health <= 0) {
      return { winner: 1, reason: "Player 2 defeated" };
    }
    return null;
  }

  /**
   * Calculate technique result
   */
  calculateTechnique(
    technique: KoreanTechnique,
    archetype: PlayerArchetype,
    target?: PlayerState
  ): CombatResult {
    const baseDamage = Math.floor(
      Math.random() *
        (technique.damageRange.max - technique.damageRange.min + 1) +
        technique.damageRange.min
    );

    return {
      hit: Math.random() < technique.accuracy,
      damage: baseDamage,
      technique: technique.koreanName,
      isVitalPoint: false,
      vitalPointsHit: [],
      critical: Math.random() < 0.1,
      effects: [],
      attacker: archetype,
      defender: target?.archetype || "musa",
      damagePrevented: 0,
      staminaUsed: technique.staminaCost,
      kiUsed: technique.kiCost,
      defenderDamaged: true,
      attackerStance: target?.stance || "geon",
      defenderStance: target?.stance || "geon",
    };
  }
}
