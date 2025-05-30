import { audioManager } from "../audio/AudioManager"; // Use default export
import type {
  PlayerState,
  KoreanTechnique,
  VitalPoint,
  // Position, // Unused
  // TrigramStance, // Unused
  AttackResult,
  // DamageResult, // Unused
  StatusEffect, // Used for technique effects
  Condition,
  VitalPointHit,
  VitalPointSystemConfig, // Assuming this is defined for vitalPointConfig
} from "../types";
import { TrigramSystem } from "./TrigramSystem";
import { VitalPointSystem } from "./VitalPointSystem";

// Placeholder for vitalPointConfig if not imported
const vitalPointConfig: VitalPointSystemConfig = {
  baseAccuracy: 0.8,
  distanceModifier: 0.05,
};

export const CombatSystem = {
  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPoints: VitalPoint[] = []
  ): AttackResult {
    const distance = Math.abs(attacker.position.x - defender.position.x);

    let baseHitChance = 0.9;
    if ("isDodging" in defender && defender.isDodging) {
      // Check if property exists
      baseHitChance -= 0.3;
    }

    if (Math.random() > baseHitChance) {
      if (audioManager.playDodgeSound) audioManager.playDodgeSound();
      return {
        hit: false,
        damage: 0,
        critical: false,
        blocked: false,
        conditionsApplied: [], // Add conditionsApplied
        attackerState: attacker,
        defenderState: defender,
      };
    }

    if (defender.isBlocking) {
      const blockEffectiveness = 0.7;
      const damageAfterBlock =
        (technique.damage || 0) * (1 - blockEffectiveness); // Ensure technique.damage exists
      if (audioManager.playBlockSound) audioManager.playBlockSound();
      return {
        hit: true,
        damage: Math.floor(damageAfterBlock),
        critical: false,
        blocked: true,
        conditionsApplied: [], // Add conditionsApplied
        attackerState: attacker,
        defenderState: {
          ...defender,
          stamina: Math.max(0, defender.stamina - 5),
        },
      };
    }

    const stanceAdvantage = TrigramSystem.calculateStanceAdvantage(
      attacker.stance,
      defender.stance
    );

    let vitalPointMultiplier = 1.0;
    let vitalPointHitDetail: VitalPointHit | null = null;
    if (targetedVitalPoints.length > 0 && targetedVitalPoints[0]) {
      vitalPointHitDetail = VitalPointSystem.checkVitalPointHit(
        defender.position,
        targetedVitalPoints[0],
        technique,
        distance,
        vitalPointConfig
      );
      if (vitalPointHitDetail?.vitalPoint) {
        // Check vitalPoint on VitalPointHit
        vitalPointMultiplier =
          vitalPointHitDetail.vitalPoint.damageMultiplier || 1.5;
      }
    }

    let finalDamage = technique.damage || 0; // Ensure technique.damage exists

    finalDamage *= stanceAdvantage;
    finalDamage *= vitalPointMultiplier;

    const techniqueCritChance =
      "critChance" in technique ? technique.critChance : 0.1;
    const isCriticalHit = Math.random() < (techniqueCritChance || 0.1);
    if (isCriticalHit) {
      const techniqueCritMultiplier =
        "critMultiplier" in technique ? technique.critMultiplier : 1.5;
      finalDamage *= techniqueCritMultiplier || 1.5;
    }

    finalDamage = Math.floor(finalDamage);

    const conditionsApplied: Condition[] = [];
    if ("effects" in technique && technique.effects) {
      // Check if property exists
      (technique.effects as StatusEffect[]).forEach((effect: StatusEffect) => {
        if (Math.random() < (effect.chance || 1.0)) {
          conditionsApplied.push({
            type: effect.type,
            duration: effect.duration,
            magnitude: effect.magnitude, // Ensure magnitude is on StatusEffect or Condition
            source: attacker.playerId, // Ensure source is on Condition
          });
        }
      });
    }
    if (
      vitalPointHitDetail &&
      "effectsApplied" in vitalPointHitDetail &&
      vitalPointHitDetail.effectsApplied
    ) {
      // Check if property exists
      (vitalPointHitDetail.effectsApplied as StatusEffect[]).forEach(
        (effect: StatusEffect) => {
          if (Math.random() < (effect.chance || 1.0)) {
            conditionsApplied.push({
              type: effect.type,
              duration: effect.duration,
              magnitude: effect.magnitude,
              source: attacker.playerId, // Ensure source is on Condition
            });
          }
        }
      );
    }

    if (audioManager.playAttackSound)
      audioManager.playAttackSound(technique.name, finalDamage); // Adjust params if needed
    if (audioManager.playHitSound)
      audioManager.playHitSound(
        finalDamage,
        isCriticalHit,
        vitalPointHitDetail !== null
      );

    return {
      hit: true,
      damage: finalDamage,
      critical: isCriticalHit,
      blocked: false,
      conditionsApplied, // Add conditionsApplied
      attackerState: { ...attacker, ki: attacker.ki - (technique.kiCost || 5) },
      defenderState: {
        ...defender,
        health: Math.max(0, defender.health - finalDamage),
        conditions: [...defender.conditions, ...conditionsApplied],
      },
    };
  },

  // ... other combat system methods
  // calculateEffectiveDamage, applyConditions, checkWinCondition, etc.
};

// function calculateEffectiveDamage is declared but its value is never read.
// This function seems to be part of the internal logic of resolveAttack or a helper.
// If it's meant to be exported, it should be part of the CombatSystem object.
// For now, assuming it's a helper or its logic is incorporated above.
