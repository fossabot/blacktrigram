import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  HitResult, // Added
  CombatAnalysis,
  PlayerArchetype,
  VitalPoint,
  // VitalPointEffect, // Unused
  StatusEffect,
  CombatSystemInterface,
  VitalPointSystemInterface,
  TrigramSystemInterface, // Corrected import
  CombatConfig, // Added for constructor
} from "../types";
import { PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../types/constants"; // Import PLAYER_ARCHETYPES_DATA and TRIGRAM_DATA
// import { EnumDamageType } from "../types/enums"; // Unused
// import { calculateDistance } from '../utils/geometry'; // Unused or move to VitalPointSystem
// import { randomInRange } from '../utils/rng'; // Unused or move to VitalPointSystem

export class CombatSystem implements CombatSystemInterface {
  private vitalPointSystem: VitalPointSystemInterface;
  private trigramSystem: TrigramSystemInterface;
  private config: CombatConfig;
  // private currentPhase: GamePhase; // If CombatSystem manages phases

  constructor(
    vitalPointSystem: VitalPointSystemInterface,
    trigramSystem: TrigramSystemInterface,
    config: CombatConfig
    // initialPhase: GamePhase = "combat" // Example if managing phase
  ) {
    this.vitalPointSystem = vitalPointSystem;
    this.trigramSystem = trigramSystem;
    this.config = config;
    // this.currentPhase = initialPhase;
  }

  // public updatePhase(newPhase: GamePhase): void {
  //   this.currentPhase = newPhase;
  // }

  public resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPointId?: string | null // Changed from VitalPoint to ID
  ): {
    updatedAttacker: PlayerState;
    updatedDefender: PlayerState;
    result: CombatResult;
  } {
    // 1. Check if attacker can perform the technique (Ki, Stamina, conditions)
    if (
      attacker.ki < technique.kiCost ||
      attacker.stamina < technique.staminaCost
    ) {
      const missResult: CombatResult = {
        hit: false,
        damage: 0,
        isVitalPoint: false,
        vitalPointsHit: [],
        techniqueUsed: technique,
        effectiveness: 0,
        stunDuration: 0,
        bloodLoss: 0,
        painLevel: 0,
        consciousnessImpact: 0,
        balanceEffect: 0,
        statusEffects: [],
        hitType: "miss",
        description: "Insufficient resources",
      };
      return {
        updatedAttacker: attacker,
        updatedDefender: defender,
        result: missResult,
      };
    }

    // Deduct costs from attacker
    let updatedAttacker = {
      ...attacker,
      ki: attacker.ki - technique.kiCost,
      stamina: attacker.stamina - technique.staminaCost,
      isAttacking: true, // Set attacking state
    };

    // 2. Determine Hit/Miss using VitalPointSystem (which should handle accuracy, range, etc.)
    // The VitalPointSystem's calculateHit method should return a HitResult like structure
    const hitCheckResult = this.vitalPointSystem.calculateHit(
      technique,
      targetedVitalPointId
    );

    if (!hitCheckResult.hit) {
      const missResult: CombatResult = {
        hit: false,
        damage: 0,
        isVitalPoint: false,
        vitalPointsHit: [],
        techniqueUsed: technique,
        effectiveness: 0,
        stunDuration: 0,
        bloodLoss: 0,
        painLevel: 0,
        consciousnessImpact: 0,
        balanceEffect: 0,
        statusEffects: [],
        hitType: "miss",
      };
      updatedAttacker = { ...updatedAttacker, isAttacking: false };
      return { updatedAttacker, updatedDefender: defender, result: missResult };
    }

    // 3. Calculate Damage and Effects
    const stanceEffectiveness = this.trigramSystem.getStanceEffectiveness(
      attacker.stance,
      defender.stance
    );

    const damageOutput = this.calculateDamage(
      technique,
      attacker.archetype,
      defender,
      hitCheckResult as unknown as HitResult // Cast if calculateHit returns a slightly different structure
    );

    let finalDamage = damageOutput.totalDamage * stanceEffectiveness;
    finalDamage = Math.max(0, Math.round(finalDamage));

    // Apply block reduction if defender is blocking
    // This needs defender's state (isBlocking) and block effectiveness
    // if (defender.isBlocking) { finalDamage *= (1 - (this.config.BLOCK_REDUCTION || 0.5)); }

    // 4. Update Defender State
    const newDefenderHealth = Math.max(0, defender.health - finalDamage);
    const newDefenderConsciousness = Math.max(
      0,
      defender.consciousness -
        (hitCheckResult.effects.find((e) => e.type === "consciousness_loss")
          ?.intensity || 0)
    ); // Simplified
    // ... update other defender stats based on effects

    let updatedDefender: PlayerState = {
      ...defender,
      health: newDefenderHealth,
      consciousness: newDefenderConsciousness,
      // pain: defender.pain + (hitCheckResult.effects.find(e => e.type === 'pain_severe')?.intensity || 0), // Simplified
      activeEffects: [
        ...defender.activeEffects,
        ...hitCheckResult.effects,
        ...damageOutput.effectsApplied,
      ],
      // combatState: newDefenderHealth <= 0 ? "helpless" : defender.combatState,
    };

    // Update combat readiness and state
    // updatedDefender = updatePlayerCombatState(updatedDefender, finalDamage, hitCheckResult.isVitalPointHit);

    const combatOutcome: CombatResult = {
      hit: true,
      damage: finalDamage,
      isVitalPoint: hitCheckResult.isVitalPointHit,
      vitalPointsHit: hitCheckResult.vitalPoint
        ? [hitCheckResult.vitalPoint]
        : [],
      techniqueUsed: technique,
      effectiveness: stanceEffectiveness,
      stunDuration:
        hitCheckResult.effects.find((e) => e.type === "stun")?.duration || 0, // Simplified
      bloodLoss:
        hitCheckResult.effects.find((e) => e.type === "bleed")?.intensity || 0, // Simplified
      painLevel:
        damageOutput.effectsApplied.find((e) => e.type === "pain_severe")
          ?.intensity || 0, // Simplified
      consciousnessImpact:
        hitCheckResult.effects.find((e) => e.type === "consciousness_loss")
          ?.intensity || 0, // Simplified
      balanceEffect:
        hitCheckResult.effects.find((e) => e.type === "balance_loss")
          ?.intensity || 0, // Simplified
      statusEffects: [
        ...hitCheckResult.effects,
        ...damageOutput.effectsApplied,
      ],
      hitType: hitCheckResult.isVitalPointHit
        ? finalDamage > technique.damageRange.max * 1.2
          ? "critical"
          : "vital"
        : "normal", // Simplified critical check
    };

    updatedAttacker = { ...updatedAttacker, isAttacking: false }; // Reset attacking state

    return { updatedAttacker, updatedDefender, result: combatOutcome };
  }

  public calculateDamage(
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderState: PlayerState, // Added defenderState for context (e.g., resistances)
    hitResult: HitResult // Use HitResult from VitalPointSystem
  ): {
    baseDamage: number;
    modifierDamage: number;
    totalDamage: number;
    effectsApplied: readonly StatusEffect[];
  } {
    let baseDamage = hitResult.damage; // Damage from VitalPointSystem's hit calculation
    let modifierDamage = 0;

    // Archetype bonuses
    const archetypeData = PLAYER_ARCHETYPES_DATA[attackerArchetype];
    if (archetypeData?.bonuses) {
      // Example: specific bonus for damageType or technique type
      const damageBonusMultiplier =
        (archetypeData.bonuses[
          `${technique.damageType}_damage_multiplier`
        ] as number) ||
        (archetypeData.bonuses[
          `${technique.type}_damage_multiplier`
        ] as number) ||
        (archetypeData.bonuses[`damage_multiplier`] as number) ||
        1.0;
      modifierDamage += baseDamage * (damageBonusMultiplier - 1.0);
    }

    // Technique specific properties (e.g. armor piercing might ignore some defense)
    // ...

    // Defender resistances (placeholder)
    // const resistance = defenderState.resistances?.[technique.damageType] || 0;
    // baseDamage *= (1 - resistance);

    const totalDamage = baseDamage + modifierDamage;

    // Effects from the technique itself, potentially modified by hitResult context
    const effectsApplied = technique.effects || [];
    // Could also add effects based on damage thresholds, etc.

    return {
      baseDamage: Math.round(baseDamage),
      modifierDamage: Math.round(modifierDamage),
      totalDamage: Math.round(totalDamage),
      effectsApplied,
    };
  }

  public getCombatAnalysis(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatAnalysis {
    const hitChance =
      technique.accuracy *
      (this.trigramSystem.getStanceEffectiveness(
        attacker.stance,
        defender.stance
      ) > 1
        ? 1.1
        : 1.0); // Simplified
    const damageRange = {
      min: technique.damageRange.min * (this.config.DAMAGE_MULTIPLIER || 1.0),
      max: technique.damageRange.max * (this.config.DAMAGE_MULTIPLIER || 1.0),
    };

    const advantages: string[] = [];
    const disadvantages: string[] = [];

    const stanceEffectiveness = this.trigramSystem.getStanceEffectiveness(
      attacker.stance,
      defender.stance
    );
    if (stanceEffectiveness > 1.1) advantages.push("Stance advantage");
    if (stanceEffectiveness < 0.9) disadvantages.push("Stance disadvantage");

    if (technique.kiCost > attacker.ki * 0.5)
      disadvantages.push("High Ki cost relative to current Ki");
    // ... more analysis logic

    return {
      attacker,
      defender,
      technique,
      hitChance: Math.max(0, Math.min(1, hitChance)),
      damageRange,
      advantages,
      disadvantages,
    };
  }
}
