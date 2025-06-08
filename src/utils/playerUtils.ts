// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  KoreanText,
  Position,
  KoreanTechnique,
  CombatResult,
  HitResult,
} from "../types";
import { PLAYER_ARCHETYPES_DATA } from "../types/constants";

/**
 * Create a new player state with default values
 */
export function createPlayerState(
  id: string,
  archetype: PlayerArchetype,
  name: KoreanText,
  position: Position = { x: 0, y: 0 }
): PlayerState {
  return {
    id,
    name,
    archetype,
    position,
    currentStance: "geon",
    facing: "right",
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: 0,
    combatReadiness: "ready",
    activeEffects: [],
    combatState: "idle",
    comboCount: 0,
    lastActionTime: 0,
    vitalPointDamage: {},
    bodyPartStatus: {
      head: "healthy",
      face_upper: "healthy",
      chest: "healthy",
      abdomen: "healthy",
      neck: "healthy",
      torso: "healthy",
      left_arm: "healthy",
      right_arm: "healthy",
      left_leg: "healthy",
      right_leg: "healthy",
    },
    knownTechniques: [],
    currentTargetId: null,
    attributes: {
      strength: 10,
      agility: 10,
      endurance: 10,
      intelligence: 10,
      focus: 10,
      resilience: 10,
    },
    skills: {
      striking: 10,
      kicking: 10,
      grappling: 10,
      weaponry: 0,
      meditation: 5,
      strategy: 5,
    },
  };
}

/**
 * Create a default player state for Korean martial arts combat
 */
export function createDefaultPlayerState(
  id: string,
  archetype: PlayerArchetype,
  name: KoreanText,
  position: Position,
  direction: "left" | "right" = "right"
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id,
    name,
    archetype,
    currentStance: archetypeData.coreStance,

    // Combat stats
    health: archetypeData.baseHealth,
    maxHealth: archetypeData.baseHealth,
    ki: archetypeData.baseKi,
    maxKi: archetypeData.baseKi,
    stamina: archetypeData.baseStamina,
    maxStamina: archetypeData.baseStamina,

    // Physical condition
    consciousness: 100,
    maxConsciousness: 100,
    pain: 0,
    balance: 100,
    focus: 100,

    // Combat state
    combatState: "idle",
    position,
    direction,

    // Vital points (simplified - in full game would have all 70)
    vitalPoints: {
      head_temple: {
        id: "head_temple",
        status: "normal",
        damage: 0,
        painLevel: 0,
        isBlocked: false,
        lastHit: null,
        location: { x: 50, y: 20 }, // Head area
      },
      torso_solar_plexus: {
        id: "torso_solar_plexus",
        status: "normal",
        damage: 0,
        painLevel: 0,
        isBlocked: false,
        lastHit: null,
        location: { x: 50, y: 60 }, // Torso area
      },
    },

    // Status effects
    statusEffects: [],

    // Combat modifiers
    attackPower: 1.0,
    defensePower: 1.0,
    speed: 1.0,
    accuracy: 1.0,

    // Technique tracking
    lastTechniqueUsed: null,
    comboCount: 0,

    // Animation state
    animationState: "idle",

    // Combat timing
    lastActionTime: 0,
    recoveryTime: 0,

    // Korean martial arts specific
    kiFlow: "balanced",
    mentalState: "focused",
    breathingPattern: "normal",
  };
}

/**
 * Execute a technique between attacker and defender
 */
export interface CombatResult {
  hit: boolean;
  damage: number;
  critical: boolean;
  hitPosition?: Position;
  updatedAttacker: Partial<PlayerState>;
  updatedDefender: Partial<PlayerState>;
}

export function executeTechnique(
  attacker: PlayerState,
  defender: PlayerState,
  technique: KoreanTechnique
): CombatResult {
  // Calculate hit chance based on technique accuracy and player stats
  const baseAccuracy = technique.accuracy || 85;
  const attackerBonus = attacker.technique || 0;
  const defenderPenalty = defender.speed || 0;

  const finalAccuracy = Math.min(
    95,
    Math.max(5, baseAccuracy + attackerBonus / 10 - defenderPenalty / 15)
  );

  const hit = Math.random() * 100 < finalAccuracy;

  if (!hit) {
    return {
      hit: false,
      damage: 0,
      critical: false,
      updatedAttacker: {
        stamina: Math.max(0, attacker.stamina - (technique.staminaCost || 10)),
      },
      updatedDefender: {},
    };
  }

  // Calculate damage
  const baseDamage = technique.damage || 10;
  const attackPower = attacker.attackPower || 50;
  const defense = defender.defense || 50;

  const damage = Math.max(
    1,
    Math.floor((baseDamage * attackPower) / (100 + defense))
  );

  // Check for critical hit
  const criticalChance = 10 + (attacker.technique || 0) / 10;
  const critical = Math.random() * 100 < criticalChance;
  const finalDamage = critical ? Math.floor(damage * 1.5) : damage;

  // Calculate hit position
  const hitPosition: Position = {
    x: defender.position.x + (Math.random() - 0.5) * 50,
    y: defender.position.y + (Math.random() - 0.5) * 50,
  };

  return {
    hit: true,
    damage: finalDamage,
    critical,
    hitPosition,
    updatedAttacker: {
      stamina: Math.max(0, attacker.stamina - (technique.staminaCost || 10)),
      ki: Math.max(0, attacker.ki - (technique.kiCost || 5)),
    },
    updatedDefender: {
      health: Math.max(0, defender.health - finalDamage),
      pain: Math.min(100, defender.pain + finalDamage / 5),
      consciousness: Math.max(0, defender.consciousness - (critical ? 10 : 5)),
    },
  };
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
