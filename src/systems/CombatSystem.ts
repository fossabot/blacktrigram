import {
  DamageType,
  CombatState,
  PlayerArchetype,
  TrigramStance,
  PlayerState,
} from "@/types";
import type { VitalPoint } from "../types/anatomy";
import type { KoreanTechnique } from "../types/combat";

export interface CombatResult {
  readonly damage: number;
  readonly damageType: DamageType;
  readonly isVitalPoint: boolean;
  readonly vitalPoint?: VitalPoint;
  readonly newState: CombatState;
  readonly effects: readonly string[];
  readonly hit: boolean;
  readonly critical: boolean;
  readonly vitalPointsHit: readonly VitalPoint[];
  readonly attacker: PlayerArchetype;
  readonly defender: PlayerArchetype;
  readonly damagePrevented: number;
  readonly staminaUsed: number;
  readonly kiUsed: number;
  readonly defenderDamaged: boolean;
  readonly attackerStance: TrigramStance;
  readonly defenderStance: TrigramStance;
}

export interface AttackInput {
  readonly attacker: PlayerState;
  readonly defender: PlayerState;
  readonly technique: KoreanTechnique;
  readonly targetPoint?: VitalPoint;
}

/**
 * Core Combat System for Black Trigram Korean Martial Arts
 * Handles realistic combat calculations, vital point targeting,
 * and trigram-based technique execution.
 */
export class CombatSystem {
  /**
   * Calculate damage and effects for a Korean martial arts technique
   */
  static calculateTechnique(
    technique: KoreanTechnique,
    archetype: PlayerArchetype
  ): CombatResult {
    // Base damage calculation - use damageRange if available, fallback to 10
    let damage: number;
    if ("damageRange" in technique && technique.damageRange) {
      const range = technique.damageRange;
      damage = Math.random() * (range.max - range.min) + range.min;
    } else if ("damage" in technique && typeof technique.damage === "number") {
      damage = technique.damage;
    } else {
      damage = 15; // Default damage for Korean martial arts techniques
    }

    // Apply archetype bonuses
    const archetypeMultiplier = this.getArchetypeMultiplier(
      archetype,
      technique.stance
    );
    damage *= archetypeMultiplier;

    // Variance for realism
    const variance = 0.1; // ±10%
    damage *= 1 + (Math.random() - 0.5) * variance;

    // Determine damage type
    let damageType: DamageType = "blunt" as DamageType;
    if ("damageRange" in technique && technique.damageRange) {
      damageType = technique.damageRange.type || ("blunt" as DamageType);
    } else if ("damageType" in technique && technique.damageType) {
      damageType = technique.damageType;
    }

    return {
      damage: Math.round(damage),
      damageType,
      isVitalPoint: false,
      newState: "ready",
      effects: [],
      hit: true,
      critical: Math.random() < 0.1,
      vitalPointsHit: [],
      attacker: archetype,
      defender: "musa",
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 10,
      kiUsed: technique.kiCost || 5,
      defenderDamaged: true,
      attackerStance: technique.stance,
      defenderStance: "geon",
    };
  }

  /**
   * Execute a full combat exchange between two players
   */
  static executeCombat(input: AttackInput): CombatResult {
    const { attacker, defender, technique, targetPoint } = input;

    // Calculate base technique result
    const baseResult = this.calculateTechnique(technique, attacker.archetype);

    // Apply vital point targeting if specified
    if (targetPoint) {
      return this.applyVitalPointDamage(baseResult, targetPoint);
    }

    return {
      ...baseResult,
      defender: defender.archetype,
      defenderStance: defender.stance,
    };
  }

  /**
   * Check win condition for the combat match
   * This is a simplified version. A more complex version would be in GameEngine or a dedicated MatchManager.
   */
  static checkWinCondition(
    players: readonly [PlayerState, PlayerState]
    // timeRemaining: number // Assuming time-based win condition is handled by game loop/engine
  ): PlayerState | null {
    // Returns the winning player or null for no winner yet / draw
    const [player1, player2] = players;

    if (player1.consciousness <= 0 || player1.health <= 0) {
      return player2; // Player 2 wins
    }
    if (player2.consciousness <= 0 || player2.health <= 0) {
      return player1; // Player 1 wins
    }
    // Add time-based win logic if needed, e.g., player with more health at timeout
    // For now, only knockout determines the winner directly via this method.
    return null; // No winner yet or draw if time runs out and health is equal (handled elsewhere)
  }

  /**
   * Determines the round winner. This could be more complex,
   * involving score, remaining health at timeout, etc.
   * For now, it's a simple check based on who is not defeated.
   */
  static determineRoundWinner(
    players: readonly [PlayerState, PlayerState]
  ): PlayerState | null {
    const [player1, player2] = players;
    const player1Defeated = player1.health <= 0 || player1.consciousness <= 0;
    const player2Defeated = player2.health <= 0 || player2.consciousness <= 0;

    if (player1Defeated && !player2Defeated) {
      return player2;
    }
    if (player2Defeated && !player1Defeated) {
      return player1;
    }
    // If both are defeated (e.g. mutual KO) or neither, or time runs out,
    // this simple version returns null. More complex logic (e.g. health comparison)
    // would be needed for a draw or time-out decision.
    return null;
  }

  /**
   * Get archetype-specific damage multipliers for different stances
   */
  private static getArchetypeMultiplier(
    archetype: PlayerArchetype,
    stance: TrigramStance
  ): number {
    const multipliers: Record<
      PlayerArchetype,
      Record<TrigramStance, number>
    > = {
      musa: {
        geon: 1.2, // Traditional warrior excels at direct force
        tae: 1.0,
        li: 1.0,
        jin: 1.15, // Good with stunning techniques
        son: 0.9,
        gam: 0.9,
        gan: 1.1, // Defensive strength
        gon: 1.0,
      },
      amsalja: {
        geon: 0.8,
        tae: 1.0,
        li: 1.3, // Precision nerve strikes
        jin: 1.0,
        son: 1.2, // Stealth and continuous pressure
        gam: 1.15, // Blood flow control
        gan: 0.9,
        gon: 1.0,
      },
      hacker: {
        geon: 0.9,
        tae: 1.2, // Tech-enhanced joint manipulation
        li: 1.3, // Data-driven precision
        jin: 1.0,
        son: 1.1,
        gam: 1.0,
        gan: 1.0,
        gon: 1.0,
      },
      jeongbo: {
        geon: 0.9,
        tae: 1.0,
        li: 1.1,
        jin: 1.0,
        son: 1.0,
        gam: 1.2, // Intelligence-based pain compliance
        gan: 1.3, // Strategic defensive techniques
        gon: 1.1,
      },
      jojik: {
        geon: 1.1,
        tae: 1.0,
        li: 1.0,
        jin: 1.2, // Street-smart brutal techniques
        son: 1.0,
        gam: 1.15, // Dirty fighting tactics
        gan: 0.8,
        gon: 1.0,
      },
    };

    return multipliers[archetype]?.[stance] ?? 1.0;
  }

  /**
   * Apply additional damage and effects for vital point strikes
   */
  private static applyVitalPointDamage(
    baseResult: CombatResult,
    vitalPoint: VitalPoint
  ): CombatResult {
    const vitalPointMultiplier = this.getVitalPointMultiplier(vitalPoint);
    const enhancedDamage = Math.round(baseResult.damage * vitalPointMultiplier);

    return {
      ...baseResult,
      damage: enhancedDamage,
      isVitalPoint: true,
      vitalPoint,
      vitalPointsHit: [vitalPoint],
      effects: [...baseResult.effects, `Vital point: ${vitalPoint.name}`],
    };
  }

  /**
   * Get damage multiplier for different vital point categories
   */
  private static getVitalPointMultiplier(vitalPoint: VitalPoint): number {
    const categoryMultipliers: Record<string, number> = {
      head: 2.0,
      neck: 2.5,
      torso: 1.5,
      arms: 1.2,
      legs: 1.3,
      limbs: 1.2,
      pressure_points: 1.8,
    };

    return categoryMultipliers[vitalPoint.category] ?? 1.0;
  }
}
