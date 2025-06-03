import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  AttackInput,
  PlayerArchetype,
  TrigramStance,
  VitalPoint,
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";

export class CombatSystem {
  private static vitalPointSystem = new VitalPointSystem();

  /**
   * Execute a full attack sequence - main combat method
   */
  static async executeAttack(input: AttackInput): Promise<CombatResult> {
    const { attacker, defender, technique, targetPoint } = input;

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
        newState: "ready",
        effects: [],
        hit: false,
        critical: false,
        vitalPointsHit: [],
        attacker: attacker.archetype,
        defender: defender.archetype,
        damagePrevented: 0,
        staminaUsed: technique.staminaCost || 10,
        kiUsed: technique.kiCost || 5,
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
        hitPosition: defender.position,
      };
    }

    // Calculate base technique result
    const baseResult = this.calculateTechnique(technique, attacker.archetype);

    // Apply vital point targeting if specified
    const result = targetPoint
      ? this.applyVitalPointDamage(baseResult, targetPoint)
      : baseResult;

    return {
      ...result,
      defender: defender.archetype,
      defenderStance: defender.stance,
      hit: true,
      defenderDamaged: true,
      painLevel: result.damage * 0.3,
      consciousnessImpact: result.damage * 0.2,
      balanceEffect: result.damage * 0.1,
      bloodLoss: result.isVitalPoint
        ? result.damage * 0.4
        : result.damage * 0.1,
      stunDuration: result.isVitalPoint ? 2000 : 500,
      statusEffects: [],
      hitType: result.isVitalPoint
        ? "vital"
        : result.critical
        ? "critical"
        : "normal",
      techniqueUsed: technique,
      effectiveness: stanceEffectiveness,
      hitPosition: defender.position,
    };
  }

  /**
   * Calculate stance effectiveness matrix
   */
  private static calculateStanceEffectiveness(
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
    let baseDamage = technique.damage || 20;
    const isCritical = Math.random() < 0.15; // 15% critical chance

    // Apply archetype bonuses
    switch (archetype) {
      case "musa":
        baseDamage *= 1.2; // Traditional warrior strength bonus
        break;
      case "amsalja":
        baseDamage *= isCritical ? 2.0 : 1.0; // Assassin critical specialization
        break;
      case "hacker":
        baseDamage *= 1.1; // Tech-assisted precision
        break;
      case "jeongbo":
        baseDamage *= 1.15; // Intelligence operative efficiency
        break;
      case "jojik":
        baseDamage *= 1.3; // Brutal street fighting
        break;
    }

    if (isCritical) {
      baseDamage *= 1.5;
    }

    return {
      damage: Math.round(baseDamage),
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready",
      effects: technique.effects || [],
      hit: true,
      critical: isCritical,
      vitalPointsHit: [],
      attacker: archetype,
      defender: archetype, // Will be overridden
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 10,
      kiUsed: technique.kiCost || 5,
      defenderDamaged: true,
      attackerStance: "geon", // Will be overridden
      defenderStance: "geon", // Will be overridden
      painLevel: baseDamage * 0.8,
      consciousnessImpact: baseDamage * 0.5,
      balanceEffect: baseDamage * 0.3,
      bloodLoss: baseDamage * 0.1,
      stunDuration: isCritical ? 1000 : 500,
      statusEffects: [],
      hitType: isCritical ? "critical" : "normal",
      techniqueUsed: technique,
      effectiveness: 1.0,
      hitPosition: { x: 0, y: 0 }, // Will be overridden
    };
  }

  /**
   * Apply vital point specific damage and effects
   */
  private static applyVitalPointDamage(
    baseResult: CombatResult,
    vitalPoint: VitalPoint
  ): CombatResult {
    const vitalPointMultiplier = vitalPoint.damageMultiplier || 1.5;
    const enhancedDamage = Math.round(baseResult.damage * vitalPointMultiplier);

    // Get vital point specific effects
    const vitalPointEffects = this.vitalPointSystem.getVitalPointEffects(
      vitalPoint,
      baseResult.techniqueUsed,
      baseResult.critical
    );

    return {
      ...baseResult,
      damage: enhancedDamage,
      isVitalPoint: true,
      vitalPointsHit: [vitalPoint],
      effects: [...baseResult.effects, ...vitalPointEffects],
      statusEffects: [...baseResult.statusEffects, ...vitalPointEffects],
      hitType: "vital",
      consciousnessImpact: enhancedDamage * 2,
      painLevel: enhancedDamage * 1.2,
      bloodLoss: enhancedDamage * 0.4,
      stunDuration: baseResult.stunDuration + 1000,
    };
  }

  /**
   * Check win condition based on Korean martial arts realism
   */
  static checkWinCondition(
    players: readonly [PlayerState, PlayerState]
  ): PlayerState | null {
    const [player1, player2] = players;

    // Check for incapacitation
    if (player1.health <= 0 || player1.consciousness <= 0) {
      return player2;
    }
    if (player2.health <= 0 || player2.consciousness <= 0) {
      return player1;
    }

    // Check for pain overload
    if (player1.pain >= 95) {
      return player2;
    }
    if (player2.pain >= 95) {
      return player1;
    }

    return null; // No winner yet
  }

  /**
   * Determine the winner of a combat round based on player states
   */
  static determineRoundWinner(
    players: readonly [PlayerState, PlayerState]
  ): string | null {
    const [player1, player2] = players;

    // Check for knockouts (health <= 0)
    if (player1.health <= 0 && player2.health <= 0) {
      return null; // Draw
    }
    if (player1.health <= 0) {
      return player2.id;
    }
    if (player2.health <= 0) {
      return player1.id;
    }

    // Check for incapacitation (consciousness <= 0)
    if (player1.consciousness <= 0 && player2.consciousness <= 0) {
      return null; // Draw
    }
    if (player1.consciousness <= 0) {
      return player2.id;
    }
    if (player2.consciousness <= 0) {
      return player1.id;
    }

    // No clear winner yet
    return null;
  }
}
