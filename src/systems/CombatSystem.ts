import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  VitalPoint,
  PlayerArchetype,
  TrigramStance,
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
import { STANCE_EFFECTIVENESS_MATRIX } from "../types/constants";

// Add missing constant
const ARCHETYPE_TECHNIQUE_BONUSES: Record<
  PlayerArchetype,
  { damageBonus: number; accuracyBonus: number }
> = {
  musa: { damageBonus: 1.2, accuracyBonus: 1.1 },
  amsalja: { damageBonus: 1.1, accuracyBonus: 1.3 },
  hacker: { damageBonus: 1.0, accuracyBonus: 1.4 },
  jeongbo_yowon: { damageBonus: 1.0, accuracyBonus: 1.2 },
  jojik_pokryeokbae: { damageBonus: 1.3, accuracyBonus: 0.9 },
};

export class CombatSystem {
  private static vitalPointSystem: VitalPointSystem = new VitalPointSystem();

  /**
   * Execute a full attack sequence - main combat method
   */
  public static async executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetPoint?: string
  ): Promise<CombatResult> {
    const archetypeData = ARCHETYPE_TECHNIQUE_BONUSES[attacker.archetype];

    // Use defender parameter
    const defenderStance = defender.stance;
    const stanceEffectiveness =
      STANCE_EFFECTIVENESS_MATRIX[attacker.stance]?.[defenderStance] || 1.0;

    let hitResult = null;
    if (targetPoint) {
      // Find vital point by ID instead of using getVitalPointById
      const vitalPoint = this.vitalPointSystem.findVitalPoint(
        { x: 50, y: 50 }, // Mock position for targeted attack
        { width: 100, height: 200 },
        technique.accuracy
      );

      if (vitalPoint && vitalPoint.id === targetPoint) {
        hitResult = this.vitalPointSystem.processHit(
          { x: 50, y: 50 },
          technique,
          technique.damageRange?.min || 10,
          attacker.archetype
        );
      }
    }

    if (hitResult?.hit) {
      return {
        hit: true,
        damage: hitResult.damage,
        effects: hitResult.effects,
        vitalPointsHit: hitResult.vitalPointsHit,
        critical: hitResult.criticalHit || false,
        hitPosition: hitResult.location,
        effectiveness: hitResult.effectiveness * stanceEffectiveness,
        painLevel: hitResult.painLevel,
        consciousnessImpact: hitResult.consciousnessImpact,
        damageType: technique.damageType || "blunt",
        isVitalPoint: hitResult.vitalPointsHit.length > 0,
        newState: defender.combatState,
        attacker: attacker.archetype,
        defender: defender.archetype,
        damagePrevented: 0,
        staminaUsed: technique.staminaCost || 0,
        kiUsed: technique.kiCost || 0,
        defenderDamaged: hitResult.damage > 0,
        attackerStance: attacker.stance,
        defenderStance: defender.stance,
        balanceEffect: 0,
        bloodLoss: 0,
        stunDuration: 0,
        statusEffects: hitResult.effects,
        hitType: hitResult.criticalHit ? "critical" : "normal",
        techniqueUsed: technique,
        vitalPoint: hitResult.vitalPoint,
      };
    }

    // Regular attack without vital point
    const baseDamage = technique.damageRange?.min || 10;
    const modifiedDamage = Math.floor(
      baseDamage * archetypeData.damageBonus * stanceEffectiveness
    );

    return {
      hit: true,
      damage: modifiedDamage,
      effects: technique.effects || [],
      vitalPointsHit: [],
      critical: false,
      hitPosition: { x: 50, y: 50 },
      effectiveness: stanceEffectiveness,
      painLevel: modifiedDamage * 0.5,
      consciousnessImpact: modifiedDamage * 0.3,
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: defender.combatState,
      attacker: attacker.archetype,
      defender: defender.archetype,
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 0,
      kiUsed: technique.kiCost || 0,
      defenderDamaged: modifiedDamage > 0,
      attackerStance: attacker.stance,
      defenderStance: defender.stance,
      balanceEffect: 0,
      bloodLoss: 0,
      stunDuration: 0,
      statusEffects: technique.effects || [],
      hitType: "normal",
      techniqueUsed: technique,
      vitalPoint: undefined,
    };
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
  public static calculateTechnique(
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

    // Create a mock vital point for the filter operation
    const mockVitalPoint: VitalPoint = {
      id: "mock_vp",
      name: { korean: "모의 급소", english: "Mock Vital Point" },
      korean: "모의 급소",
      englishName: "Mock Vital Point",
      koreanName: "모의 급소",
      category: "head",
      description: { korean: "테스트용", english: "For testing" },
      location: { x: 50, y: 20, region: "head" },
      severity: "minor",
      baseAccuracy: 0.9,
      baseDamage: 10,
      damageMultiplier: 1.0,
      effects: [],
      techniques: ["strike"],
      damage: 10,
    };

    const vitalPointsHit: readonly VitalPoint[] = [mockVitalPoint].filter(
      (vp): vp is VitalPoint => vp !== undefined
    );

    return {
      damage: calculatedDamage,
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready", // This should reflect defender's state change, placeholder
      effects: technique.effects || [],
      hit: true, // Assuming hit is determined before this function
      critical: isCritical,
      vitalPointsHit, // Now properly typed
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

  public static executeTechnique(
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderArchetype?: PlayerArchetype
  ): CombatResult {
    // Check if technique has accuracy property
    const accuracy = technique.accuracy ?? 0.8; // Default accuracy if undefined

    const damage = technique.damageRange
      ? Math.floor(
          Math.random() *
            (technique.damageRange.max - technique.damageRange.min + 1)
        ) + technique.damageRange.min
      : 10;

    const hit = Math.random() < accuracy;

    return {
      attacker: attackerArchetype,
      defender: defenderArchetype || "musa",
      damage: hit ? damage : 0,
      hit,
      critical: Math.random() < (technique.critChance || 0.1),
      techniqueUsed: technique,
      effects: technique.effects || [],
      vitalPointsHit: [],
      defenderDamaged: hit && damage > 0,
      // Add missing properties for CombatResult
      damageType: technique.damageType || "blunt",
      isVitalPoint: false,
      newState: "ready",
      damagePrevented: 0,
      staminaUsed: technique.staminaCost || 0,
      kiUsed: technique.kiCost || 0,
      attackerStance: technique.stance || "geon",
      defenderStance: "geon",
      painLevel: hit ? damage * 0.5 : 0,
      consciousnessImpact: hit ? damage * 0.1 : 0,
      balanceEffect: 0,
      bloodLoss: 0,
      stunDuration: 0,
      statusEffects: technique.effects || [],
      hitType: "normal",
      effectiveness: 1.0,
      hitPosition: { x: 0, y: 0 },
    };
  }
}
