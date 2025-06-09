import {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  StatusEffect,
  HitEffect,
  HitEffectType,
  EffectModifier,
  VitalPoint,
  EffectType,
  VitalPointHitResult,
} from "../types";
import {
  ARCHETYPE_TECHNIQUE_BONUSES,
  ENHANCED_DAMAGE_CONSTANTS,
} from "../types/constants";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";
import { createHitEffect } from "../utils/effectUtils";

export class CombatSystem {
  private static vitalPointSystem = new VitalPointSystem(); // Simplified constructor call
  private static trigramSystem = new TrigramSystem();

  private static calculateHitChance(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): number {
    // Base hit chance (e.g., 80%)
    let hitChance = 80;

    // Attacker's accuracy bonus (from archetype or stats)
    const attackerArchetypeBonuses =
      ARCHETYPE_TECHNIQUE_BONUSES[attacker.archetype]?.bonuses;
    if (attackerArchetypeBonuses?.accuracyBonus) {
      hitChance += (attackerArchetypeBonuses.accuracyBonus - 1) * 100;
    }
    // Add technique's specific accuracy
    if (technique.accuracy) {
      hitChance += (technique.accuracy - 0.8) * 100;
    }

    // Defender's evasion (can be derived from stats like speed or a specific evasion stat)
    const defenderStanceData = CombatSystem.trigramSystem.getCurrentStanceData(
      defender.currentStance
    );
    if (defenderStanceData?.defensiveBonus) {
      hitChance -= defenderStanceData.defensiveBonus * 10; // Example: defensive bonus reduces hit chance
    }

    // Clamp hit chance between 5% and 95%
    return Math.max(5, Math.min(95, hitChance));
  }

  public static calculateBaseDamage(
    technique: KoreanTechnique,
    attacker: PlayerState
  ): number {
    let damage =
      technique.damage ?? ENHANCED_DAMAGE_CONSTANTS.BASE_DAMAGE ?? 10;
    const archetypeBonuses =
      ARCHETYPE_TECHNIQUE_BONUSES[attacker.archetype]?.bonuses;

    if (archetypeBonuses?.damageBonus) {
      damage *= archetypeBonuses.damageBonus;
    }
    return damage;
  }

  public static applyCombatResult(
    result: CombatResult,
    attacker: PlayerState,
    defender: PlayerState
  ): { updatedAttacker: PlayerState; updatedDefender: PlayerState } {
    const updatedDefender = { ...defender };
    const updatedAttacker = { ...attacker };

    updatedDefender.health = Math.max(
      0,
      updatedDefender.health - result.damage
    );

    const newActiveEffectIds: string[] = [];
    result.effects.forEach((eff: HitEffect) => {
      // Typed eff as HitEffect
      if (eff.statusEffect) {
        // Access statusEffect from HitEffect
        newActiveEffectIds.push(eff.statusEffect.id);
        if (
          eff.statusEffect.type === EffectType.STUN &&
          eff.statusEffect.duration
        ) {
          updatedDefender.stunDuration = Math.max(
            updatedDefender.stunDuration || 0,
            eff.statusEffect.duration
          );
        }
      }
    });

    updatedDefender.activeEffects = [
      ...(updatedDefender.activeEffects || []),
      ...newActiveEffectIds,
    ].filter((id, index, self) => self.indexOf(id) === index);

    // Apply other direct changes from result if any
    if (result.updatedDefender) {
      Object.assign(updatedDefender, result.updatedDefender);
    }
    if (result.updatedAttacker) {
      Object.assign(updatedAttacker, result.updatedAttacker);
    }

    return { updatedAttacker, updatedDefender };
  }

  public static resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPointId?: string | null
  ): CombatResult {
    const hitChance = this.calculateHitChance(attacker, defender, technique);
    const roll = Math.random() * 100;
    const isHit = roll <= hitChance;

    let actualDamage = 0;
    let isCritical = false;
    const hitEffects: HitEffect[] = [];
    let vitalPointHitResult: VitalPointHitResult | null = null;

    if (isHit) {
      let baseDamage = this.calculateBaseDamage(technique, attacker);

      // Stance effectiveness
      const stanceEffectiveness =
        this.trigramSystem.calculateStanceEffectiveness(
          attacker.currentStance,
          defender.currentStance
        );
      baseDamage *= stanceEffectiveness;

      // Critical hit check
      if (
        Math.random() <
        (technique.critChance ??
          ENHANCED_DAMAGE_CONSTANTS.BASE_CRIT_CHANCE ??
          0.1)
      ) {
        isCritical = true;
        baseDamage *=
          technique.critMultiplier ??
          ENHANCED_DAMAGE_CONSTANTS.CRITICAL_MULTIPLIER ??
          2;
        hitEffects.push(
          createHitEffect(HitEffectType.CriticalHit, attacker.id, defender.id)
        );
      }

      // Vital point processing
      const targetDimensions = { width: 50, height: 180 };
      vitalPointHitResult = this.vitalPointSystem.processHit(
        defender.position,
        technique,
        baseDamage,
        attacker.archetype,
        targetDimensions,
        targetedVitalPointId
      );

      actualDamage = vitalPointHitResult.damage; // Use .damage instead of .totalDamage

      vitalPointHitResult.statusEffectsApplied.forEach(
        (vpEffect: StatusEffect) => {
          // Use .statusEffectsApplied
          hitEffects.push(
            createHitEffect(
              HitEffectType.StatusEffect,
              attacker.id,
              defender.id,
              { statusEffect: vpEffect, duration: vpEffect.duration }
            )
          );
        }
      );
      if (vitalPointHitResult.vitalPointsHit.length > 0) {
        vitalPointHitResult.vitalPointsHit.forEach((vp: VitalPoint) => {
          hitEffects.push(
            createHitEffect(
              HitEffectType.VitalPointStrike,
              attacker.id,
              defender.id,
              { vitalPointId: vp.id }
            )
          );
        });
      }

      hitEffects.push(
        createHitEffect(HitEffectType.GeneralDamage, attacker.id, defender.id, {
          damageAmount: actualDamage,
        })
      );
    } else {
      hitEffects.push(
        createHitEffect(HitEffectType.Miss, attacker.id, defender.id)
      );
    }

    let messageKorean = isHit // Changed to let
      ? `${technique.koreanName}(이)가 ${actualDamage}의 피해를 입혔습니다.`
      : `${technique.koreanName}(이)가 빗나갔습니다.`;
    let messageEnglish = isHit // Changed to let
      ? `${technique.englishName} hit for ${actualDamage} damage.`
      : `${technique.englishName} missed.`;

    if (isCritical) {
      messageKorean += " 치명타!";
      messageEnglish += " Critical Hit!";
    }
    if (vitalPointHitResult && vitalPointHitResult.vitalPointsHit.length > 0) {
      messageKorean += ` 급소 (${vitalPointHitResult.vitalPointsHit
        .map((vp: VitalPoint) => vp.name.korean)
        .join(", ")}) 공격!`; // Typed vp
      messageEnglish += ` Vital Point (${vitalPointHitResult.vitalPointsHit
        .map((vp: VitalPoint) => vp.name.english)
        .join(", ")}) Strike!`; // Typed vp
    }

    const updatedAttackerState: Partial<PlayerState> = {
      ki: Math.max(0, attacker.ki - (technique.kiCost ?? 0)),
      stamina: Math.max(0, attacker.stamina - (technique.staminaCost ?? 0)),
      lastActionTime: Date.now(),
    };

    const updatedDefenderState: Partial<PlayerState> = {
      health: Math.max(0, defender.health - actualDamage),
      // Other effects like pain, balance will be handled by applying status effects
    };

    return {
      hit: isHit,
      damage: actualDamage,
      critical: isCritical,
      effects: hitEffects,
      message: { korean: messageKorean, english: messageEnglish }, // Assign KoreanText object
      updatedAttacker: updatedAttackerState,
      updatedDefender: updatedDefenderState,
    };
  }

  public static getAvailableTechniques(
    player: PlayerState
  ): readonly KoreanTechnique[] {
    const stanceData = this.trigramSystem.getCurrentStanceData(
      player.currentStance
    );
    if (stanceData && stanceData.technique) {
      // This is just the signature technique. A real system would have a list.
      // And filter by player's known techniques.
      return [stanceData.technique];
    }
    return [];
  }

  // Helper to apply status effects to a player
  public static applyStatusEffectsToPlayer(
    player: PlayerState,
    effects: readonly StatusEffect[]
  ): PlayerState {
    if (!effects || effects.length === 0) return player;

    const newActiveEffectIds = effects.map((effect) => effect.id); // Store effect IDs

    // Create a mutable copy of player state
    const updatedPlayer = {
      ...player,
      activeEffects: [
        ...(player.activeEffects || []),
        ...newActiveEffectIds,
      ].filter((id, index, self) => self.indexOf(id) === index), // Ensure unique IDs
    };

    // Modify player stats based on effects
    effects.forEach((effect) => {
      // Example: Apply stun
      if (effect.type === EffectType.STUN && effect.duration) {
        // Use effect.type
        updatedPlayer.stunDuration = Math.max(
          updatedPlayer.stunDuration,
          effect.duration
        );
      }
      // Example: Apply damage over time (would need a system to tick this)
      if (effect.type === EffectType.BLEED && effect.magnitude) {
        // Use effect.type and effect.magnitude
        // For immediate application or if effects are processed here
        // updatedPlayer.health -= effect.magnitude;
      }
      // ... other effects like pain, consciousness reduction, stat modifiers
      if (effect.modifiers) {
        effect.modifiers.forEach((mod: EffectModifier) => {
          // Explicitly type mod
          if (mod.stat === "health" && typeof mod.value === "number")
            updatedPlayer.health += mod.value;
          if (mod.stat === "ki" && typeof mod.value === "number")
            updatedPlayer.ki += mod.value;
          if (mod.stat === "stamina" && typeof mod.value === "number")
            updatedPlayer.stamina += mod.value;
          // ... etc.
        });
      }
    });
    updatedPlayer.health = Math.max(0, updatedPlayer.health);
    updatedPlayer.ki = Math.max(0, updatedPlayer.ki);
    updatedPlayer.stamina = Math.max(0, updatedPlayer.stamina);

    return updatedPlayer;
  }

  // Added missing method
  public static async executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPointId?: string
  ): Promise<CombatResult> {
    // This can be a simple wrapper or include more logic like pre-attack checks
    return this.resolveAttack(
      attacker,
      defender,
      technique,
      targetedVitalPointId
    );
  }

  // Added missing method
  public static checkWinCondition(
    players: readonly [PlayerState, PlayerState] // Use readonly tuple
  ): PlayerState | null | undefined {
    const [player1, player2] = players;
    if (player1.health <= 0 && player2.health <= 0) {
      return undefined; // Draw or mutual knockout
    }
    if (player1.health <= 0) {
      return player2; // Player 2 wins
    }
    if (player2.health <= 0) {
      return player1; // Player 1 wins
    }
    // Add other win conditions like round timer, score, etc.
    return null; // No winner yet
  }

  public static applyEffectsToPlayer(
    player: PlayerState,
    effects: readonly StatusEffect[]
  ): PlayerState {
    if (!effects || effects.length === 0) return player;

    const newActiveEffectIds = effects.map((effect) => effect.id); // Store effect IDs

    // Create a mutable copy of player state
    const updatedPlayer = {
      ...player,
      activeEffects: [
        ...(player.activeEffects || []),
        ...newActiveEffectIds,
      ].filter((id, index, self) => self.indexOf(id) === index), // Ensure unique IDs
    };

    // Modify player stats based on effects
    effects.forEach((effect) => {
      // Example: Apply stun
      if (effect.type === EffectType.STUN && effect.duration) {
        // Use effect.type
        updatedPlayer.stunDuration = Math.max(
          updatedPlayer.stunDuration,
          effect.duration
        );
      }
      // Example: Apply damage over time (would need a system to tick this)
      if (effect.type === EffectType.BLEED && effect.magnitude) {
        // Use effect.type and effect.magnitude
        // For immediate application or if effects are processed here
        // updatedPlayer.health -= effect.magnitude;
      }
      // ... other effects like pain, consciousness reduction, stat modifiers
      if (effect.modifiers) {
        effect.modifiers.forEach((mod: EffectModifier) => {
          // Explicitly type mod
          if (mod.stat === "health" && typeof mod.value === "number")
            updatedPlayer.health += mod.value;
          if (mod.stat === "ki" && typeof mod.value === "number")
            updatedPlayer.ki += mod.value;
          if (mod.stat === "stamina" && typeof mod.value === "number")
            updatedPlayer.stamina += mod.value;
          // ... etc.
        });
      }
    });
    updatedPlayer.health = Math.max(0, updatedPlayer.health);
    updatedPlayer.ki = Math.max(0, updatedPlayer.ki);
    updatedPlayer.stamina = Math.max(0, updatedPlayer.stamina);

    return updatedPlayer;
  }
}
