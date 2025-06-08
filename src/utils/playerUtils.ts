// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  KoreanText,
  Position,
  TrigramStance,
  CombatState,
  StatusEffect,
  KoreanTechnique,
  VitalPoint,
} from "../types";
import { PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../types/constants";

// Export the player update function type
export type PlayerUpdateFunction = (
  playerIndex: number,
  updates: Partial<PlayerState>
) => void;

export function createPlayerState(
  id: string,
  archetype: PlayerArchetype,
  name: KoreanText,
  position: Position
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id,
    archetype,
    name,
    health: archetypeData.baseHealth,
    maxHealth: archetypeData.baseHealth,
    ki: archetypeData.baseKi,
    maxKi: archetypeData.baseKi,
    stamina: archetypeData.baseStamina,
    maxStamina: archetypeData.baseStamina,
    pain: 0,
    consciousness: 100,
    balance: 100,
    currentStance: archetypeData.coreStance,
    position,
    combatState: "ready" as CombatState,
    isBlocking: false,
    isCountering: false,
    isStunned: false,
    lastActionTime: 0,
    lastStanceChangeTime: 0,
    statusEffects: [],
    vitalPoints: undefined,
    availableTechniques: [
      TRIGRAM_DATA[archetypeData.coreStance]?.technique,
    ].filter(Boolean) as KoreanTechnique[],
    skills: {
      striking: 50,
      grappling: 50,
      defense: 50,
      mobility: 50,
      focus: 50,
      endurance: 50,
    },
    combo: {
      count: 0,
      multiplier: 1.0,
      lastTechniqueTime: 0,
    },
  };
}

// Fix: Proper implementation with correct return types
export function executeTechnique(
  attacker: PlayerState,
  defender: PlayerState,
  technique: KoreanTechnique,
  targetVitalPoint?: string | null
): {
  hitResult: import("../types").CombatResult;
  updatedAttacker: PlayerState;
  updatedDefender: PlayerState;
} {
  // Calculate hit chance and damage
  const hitRoll = Math.random();
  const hit = hitRoll < (technique.accuracy || 0.8);

  const baseDamage = technique.damage || 10;
  const actualDamage = hit ? baseDamage : 0;

  const isCritical = hit && Math.random() < (technique.critChance || 0.1);
  const finalDamage = isCritical
    ? Math.floor(actualDamage * (technique.critMultiplier || 1.5))
    : actualDamage;

  // Update attacker (reduce ki/stamina)
  const updatedAttacker: PlayerState = {
    ...attacker,
    ki: Math.max(0, attacker.ki - (technique.kiCost || 0)),
    stamina: Math.max(0, attacker.stamina - (technique.staminaCost || 0)),
    lastActionTime: Date.now(),
  };

  // Update defender (apply damage)
  const updatedDefender: PlayerState = {
    ...defender,
    health: Math.max(0, defender.health - finalDamage),
    pain: Math.min(100, defender.pain + finalDamage * 0.5),
    consciousness: Math.max(0, defender.consciousness - finalDamage * 0.1),
  };

  const hitResult: import("../types").CombatResult = {
    attacker: attacker.archetype,
    defender: defender.archetype,
    damage: finalDamage,
    hit,
    critical: isCritical,
    techniqueUsed: technique,
    effects: technique.effects || [],
    vitalPointsHit: targetVitalPoint ? [targetVitalPoint] : [],
    defenderDamaged: hit && finalDamage > 0,
    damageType: technique.damageType || "blunt",
    isVitalPoint: !!targetVitalPoint,
    newState: "ready" as CombatState,
    damagePrevented: 0,
    staminaUsed: technique.staminaCost || 0,
    kiUsed: technique.kiCost || 0,
    attackerStance: attacker.currentStance,
    defenderStance: defender.currentStance,
    painLevel: finalDamage * 0.5,
    consciousnessImpact: finalDamage * 0.1,
    balanceEffect: 0,
    bloodLoss: 0,
    stunDuration: isCritical ? 1000 : 0,
    statusEffects: technique.effects || [],
    hitType: hit ? (isCritical ? "critical" : "normal") : "miss",
    effectiveness: hit ? 1.0 : 0.0,
    hitPosition: defender.position,
    updatedAttacker,
    updatedDefender,
  };

  return { hitResult, updatedAttacker, updatedDefender };
}

export function calculateArchetypeDamage(
  archetype: PlayerArchetype,
  baseDamage: number
): number {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
  const damageMultiplier = (archetypeData.stats.attackPower || 100) / 100;
  return Math.round(baseDamage * damageMultiplier);
}

export function isPlayerCapacitated(player: PlayerState): boolean {
  return player.health <= 0 || player.consciousness <= 0;
}

/**
 * Update player's vital point status
 */
export function updateVitalPoint(
  player: PlayerState,
  vitalPointId: string,
  damage: number
): PlayerState {
  const vitalPoint = player.vitalPoints[vitalPointId];
  if (!vitalPoint) return player;

  const updatedVitalPoint = {
    ...vitalPoint,
    damage: vitalPoint.damage + damage,
    status:
      vitalPoint.damage + damage > 50
        ? ("critical" as const)
        : vitalPoint.damage + damage > 20
        ? ("damaged" as const)
        : ("normal" as const),
    lastHit: Date.now(),
  };

  return {
    ...player,
    vitalPoints: {
      ...player.vitalPoints,
      [vitalPointId]: updatedVitalPoint,
    },
  };
}

/**
 * Check if player can perform action
 */
export function canPerformAction(
  player: PlayerState,
  actionStaminaCost: number = 10,
  actionKiCost: number = 0
): boolean {
  return (
    player.combatState !== "stunned" &&
    player.stamina >= actionStaminaCost &&
    player.ki >= actionKiCost &&
    player.consciousness > 0 &&
    Date.now() - player.lastActionTime > player.recoveryTime
  );
}

/**
 * Apply status effect to player
 */
export function applyStatusEffect(
  player: PlayerState,
  effect: {
    type: string;
    duration: number;
    intensity: number;
  }
): PlayerState {
  const newStatusEffect = {
    ...effect,
    startTime: Date.now(),
    endTime: Date.now() + effect.duration,
  };

  return {
    ...player,
    statusEffects: [...player.statusEffects, newStatusEffect],
  };
}

/**
 * Remove expired status effects
 */
export function updateStatusEffects(player: PlayerState): PlayerState {
  const currentTime = Date.now();
  const activeEffects = player.statusEffects.filter(
    (effect) => effect.endTime > currentTime
  );

  return {
    ...player,
    statusEffects: activeEffects,
  };
}
