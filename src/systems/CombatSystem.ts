import { audioManager } from "../audio/AudioManager"; // Use default export
import {
  PlayerState,
  KoreanTechnique,
  VitalPoint,
  HitResult,
  Condition,
  GamePhase,
  StatusEffect,
  AttackResult, // Explicitly import AttackResult
  // ... other imports
} from "../types";
import { TrigramSystem } from "./TrigramSystem";
import { VitalPointSystem } from "./VitalPointSystem";

// If VitalPointSystem is a class instance or configured globally:
// VitalPointSystem.setConfig(initialVitalPointConfig); // Example

export class CombatSystem {
  static resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPoints: VitalPoint[] = []
  ): AttackResult {
    const distance = Math.abs(attacker.position.x - defender.position.x);

    let baseHitChance = 0.9; // General hit chance for the attack to connect at all

    if (Math.random() > baseHitChance) {
      if (audioManager.playSFX) audioManager.playSFX("hit_light"); // Assuming 'hit_light' can signify a miss/glance
      return {
        hit: false,
        damage: 0,
        critical: false,
        blocked: false,
        conditionsApplied: [],
        attackerState: attacker,
        defenderState: defender,
        description: "Attack missed",
      };
    }

    if (defender.isBlocking) {
      const blockEffectiveness = 0.7;
      const damageAfterBlock =
        (technique.damage || 0) * (1 - blockEffectiveness);
      if (audioManager.playSFX) audioManager.playSFX("block_success");
      return {
        hit: true,
        damage: Math.floor(damageAfterBlock),
        critical: false,
        blocked: true,
        conditionsApplied: [],
        attackerState: attacker,
        defenderState: {
          ...defender,
          stamina: Math.max(0, defender.stamina - 5),
        },
        description: "Attack blocked",
      };
    }

    let finalDamage: number;
    let isCriticalHit: boolean = false;
    const conditionsApplied: Condition[] = [];
    let attackDescription = "";

    let vitalPointHitDetail: HitResult | null = null;
    if (targetedVitalPoints.length > 0 && targetedVitalPoints[0]) {
      vitalPointHitDetail = VitalPointSystem.checkVitalPointHit(
        targetedVitalPoints[0],
        technique,
        distance
      );
    }

    if (vitalPointHitDetail?.hit && vitalPointHitDetail.vitalPoint) {
      // Successful vital point hit
      finalDamage = vitalPointHitDetail.damage; // Damage from VP system already includes technique base, VP multi, and curve multi
      isCriticalHit = vitalPointHitDetail.hitType === "critical";
      attackDescription = `${technique.name} struck ${vitalPointHitDetail.vitalPoint.name.english}`;
      if (vitalPointHitDetail.hitType === "critical")
        attackDescription += " (Critical!)";
      else if (vitalPointHitDetail.hitType === "vital")
        attackDescription += " (Precise!)";

      // Add effects from vital point hit. These effects have already passed their chance roll in VitalPointSystem.
      if (vitalPointHitDetail.effects) {
        vitalPointHitDetail.effects.forEach((effect) => {
          conditionsApplied.push({
            type: effect.type,
            duration: effect.duration,
            magnitude: effect.magnitude || 1.0,
            source: effect.source || attacker.playerId, // Use effect's source, fallback to attackerId
          });
        });
      }
    } else {
      // General body hit (or vital point miss, treated as general hit)
      finalDamage = technique.damage || 0;
      const techniqueCritChance = technique.critChance || 0.1;
      isCriticalHit = Math.random() < techniqueCritChance;
      if (isCriticalHit) {
        finalDamage *= technique.critMultiplier || 1.5;
      }
      attackDescription = `${technique.name} landed`;
      if (isCriticalHit) {
        attackDescription += " (Critical!)";
      }
    }

    // Apply stance advantage
    const stanceAdvantage = TrigramSystem.calculateStanceAdvantage(
      attacker.stance,
      defender.stance
    );
    finalDamage *= stanceAdvantage;
    finalDamage = Math.floor(finalDamage);

    attackDescription += ` for ${finalDamage} damage.`;

    // Apply technique effects (these might apply regardless of VP hit, or be additive)
    if (technique.effects) {
      technique.effects.forEach((effect: StatusEffect) => {
        const effectSource = effect.source || attacker.playerId;
        // Avoid duplicate conditions if an effect of the same type and source already exists
        const isDuplicate = conditionsApplied.some(
          (c) => c.type === effect.type && c.source === effectSource
        );
        // Technique effects need their chance evaluated here
        if (!isDuplicate && Math.random() < (effect.chance || 1.0)) {
          conditionsApplied.push({
            type: effect.type,
            duration: effect.duration,
            magnitude: effect.magnitude || 1.0,
            source: effectSource,
          });
        }
      });
    }

    if (audioManager.playAttackSound)
      audioManager.playAttackSound(technique.damage || 10);
    if (audioManager.playHitSound)
      audioManager.playHitSound(finalDamage, isCriticalHit);

    return {
      hit: true,
      damage: finalDamage,
      critical: isCriticalHit,
      blocked: false,
      conditionsApplied,
      attackerState: { ...attacker, ki: attacker.ki - (technique.kiCost || 5) },
      defenderState: {
        ...defender,
        health: Math.max(0, defender.health - finalDamage),
        conditions: [...defender.conditions, ...conditionsApplied],
      },
      description: attackDescription,
    };
  }

  static checkWinCondition(
    players: readonly [PlayerState, PlayerState],
    timeRemaining: number
  ): { gamePhase: GamePhase; winnerId: string | null } {
    const [player1, player2] = players;

    if (player1.health <= 0 && player2.health <= 0) {
      return { gamePhase: "defeat", winnerId: null }; // Draw or mutual defeat
    }
    if (player1.health <= 0) {
      return { gamePhase: "victory", winnerId: player2.playerId };
    }
    if (player2.health <= 0) {
      return { gamePhase: "victory", winnerId: player1.playerId };
    }

    if (timeRemaining <= 0) {
      if (player1.health > player2.health) {
        return { gamePhase: "victory", winnerId: player1.playerId };
      }
      if (player2.health > player1.health) {
        return { gamePhase: "victory", winnerId: player2.playerId };
      }
      // Draw condition if health is equal, P1 wins by default or specific rule
      return { gamePhase: "defeat", winnerId: null }; // Or player1.playerId for tie-break
    }

    return { gamePhase: "combat", winnerId: null }; // Game continues
  }

  // ... other combat system methods
  // calculateEffectiveDamage, applyConditions, checkWinCondition, etc.
}

// function calculateEffectiveDamage is declared but its value is never read.
// This function seems to be part of the internal logic of resolveAttack or a helper.
// If it's meant to be exported, it should be part of the CombatSystem object.
// For now, assuming it's a helper or its logic is incorporated above.
