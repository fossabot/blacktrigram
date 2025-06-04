// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  DamageType,
  EffectIntensity,
  EffectType,
  CombatCondition,
  StatusEffect,
} from "../types";
// Import CombatReadiness as a value, not a type since we need to use it as values
import { CombatReadiness } from "../types/enums";
import type { Position } from "../types/common";
import { PLAYER_ARCHETYPE_DATA } from "../types/constants/player";

/**
 * Creates a new player state with Korean martial arts defaults
 */
export function createPlayerState(
  name: string,
  archetype: PlayerArchetype,
  stance: TrigramStance,
  position?: Position
): PlayerState {
  return {
    id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    archetype,
    position: position || { x: 0, y: 0 },
    facing: "right",
    stance,
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
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: 100,
    activeEffects: [],
    combatState: "ready",
    conditions: [],
  };
}

/**
 * Initialize both players for combat
 */
export function initializePlayers(): readonly [PlayerState, PlayerState] {
  return [
    createPlayerState("player1", "musa", "geon"),
    createPlayerState("player2", "amsalja", "tae"),
  ] as const;
}

/**
 * Updates two player states for the game.
 */
export function updatePlayerStates(
  player1: PlayerState,
  player2: PlayerState
): [PlayerState, PlayerState] {
  // Implementation for updating player states
  return [player1, player2];
}

/**
 * Updates player combat state based on damage taken
 */
export function updatePlayerCombatState(
  player: PlayerState,
  damage: number,
  vitalPointHit: boolean = false
): PlayerState {
  const newHealth = Math.max(0, player.health - damage);
  const newPain = Math.min(100, player.pain + damage * 0.8);
  const newConsciousness = vitalPointHit
    ? Math.max(0, player.consciousness - damage * 2)
    : Math.max(0, player.consciousness - damage * 0.5);

  return {
    ...player,
    health: newHealth,
    pain: newPain,
    consciousness: newConsciousness,
    isAttacking: false,
    bloodLoss: player.bloodLoss + (vitalPointHit ? damage * 0.3 : damage * 0.1),
    combatReadiness: calculateCombatReadiness(newHealth),
  };
}

// Calculate combat readiness based on health percentage
function calculateCombatReadiness(health: number): CombatReadiness {
  if (health <= 0) return CombatReadiness.INCAPACITATED;
  if (health <= 20) return CombatReadiness.CRITICAL_DAMAGE;
  if (health <= 40) return CombatReadiness.HEAVY_DAMAGE;
  if (health <= 60) return CombatReadiness.MODERATE_DAMAGE;
  if (health <= 80) return CombatReadiness.LIGHT_DAMAGE;
  return CombatReadiness.READY;
}

/**
 * Updates player health and adjusts combat state accordingly
 * Includes Korean martial arts realism with consciousness and pain effects
 */
export function updatePlayerHealth(
  player: PlayerState,
  damage: number,
  _damageType: DamageType = "blunt"
): PlayerState {
  // Calculate effective damage based on archetype resistance
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype]; // Fixed: use correct constant name
  const resistance = archetypeData?.bonuses?.damageResistance || 1.0;
  const effectiveDamage = Math.max(0, damage / resistance);

  // Apply damage with minimum health of 0
  const newHealth = Math.max(0, player.health - effectiveDamage);

  // Calculate new pain level (increases with damage taken)
  const painIncrease = effectiveDamage * 0.5;
  const newPain = Math.min(100, player.pain + painIncrease);

  // Calculate consciousness impact
  const consciousnessLoss = effectiveDamage * 0.3;
  const newConsciousness = Math.max(
    0,
    player.consciousness - consciousnessLoss
  );

  // Calculate blood loss for severe damage
  const bloodLossIncrease = effectiveDamage > 25 ? effectiveDamage * 0.2 : 0;
  const newBloodLoss = Math.min(100, player.bloodLoss + bloodLossIncrease);

  return {
    ...player,
    health: newHealth,
    pain: newPain,
    consciousness: newConsciousness,
    bloodLoss: newBloodLoss,
    combatReadiness: calculateCombatReadiness(newHealth),
  };
}

/**
 * Adds a combat condition to the player
 */
export function addCombatCondition(
  player: PlayerState,
  type: EffectType,
  duration: number,
  intensity: EffectIntensity,
  source: string
): PlayerState {
  const newCondition: CombatCondition = {
    id: `${type}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    name: { korean: type, english: type }, // Default bilingual name
    type,
    duration,
    intensity,
    source,
  };

  return {
    ...player,
    conditions: [...player.conditions, newCondition],
  };
}

/**
 * Calculates movement speed based on player state
 */
export function calculateMovementSpeed(player: PlayerState): number {
  let baseSpeed = 100;

  // Reduce speed based on health
  const healthFactor = player.health / player.maxHealth;
  baseSpeed *= 0.5 + healthFactor * 0.5;

  // Reduce speed if attacking
  if (player.isAttacking) {
    baseSpeed *= 0.3;
  }

  // Apply status effect modifiers
  player.conditions.forEach((condition: CombatCondition) => {
    switch (condition.type) {
      case "stun":
        baseSpeed *= 0.1;
        break;
      case "paralysis":
        baseSpeed *= 0.0;
        break;
      case "exhausted":
        baseSpeed *= 0.6;
        break;
    }
  });

  return Math.max(0, baseSpeed);
}

/**
 * Checks if player can perform an action
 */
export function canPerformAction(
  player: PlayerState,
  actionType: string
): boolean {
  // Check basic incapacitation
  if (player.health <= 0 || player.consciousness <= 0) {
    return false;
  }

  // Check specific action requirements
  switch (actionType) {
    case "attack":
      return player.stamina >= 10 && player.combatState !== "incapacitated";
    case "stance_change":
      return player.ki >= 5 && player.combatState !== "stunned";
    case "block":
      return player.stamina >= 5;
    default:
      return true;
  }
}

/**
 * Gets the player's current status as a string
 */
export function getPlayerStatus(player: PlayerState): string {
  if (player.health <= 0) return "기절 (Unconscious)";
  if (player.health <= 20) return "위험 (Critical)";
  if (player.health <= 50) return "부상 (Injured)";
  if (player.health <= 80) return "경상 (Light Damage)";
  return "정상 (Normal)";
}

/**
 * Checks if the player can change stance
 */
export function canChangeStance(
  player: PlayerState,
  cooldownMs: number = 500
): boolean {
  return Date.now() - player.lastStanceChangeTime >= cooldownMs;
}

/**
 * Applies a status effect to the player
 */
export function applyStatusEffect(
  player: PlayerState,
  effect: StatusEffect
): PlayerState {
  return {
    ...player,
    activeEffects: [...player.activeEffects, effect],
  };
}

/**
 * Updates the status effects on the player
 */
export function updateStatusEffects(
  player: PlayerState,
  deltaTime: number
): PlayerState {
  const updatedEffects = player.activeEffects
    .map((effect: StatusEffect) => ({
      ...effect,
      duration: effect.duration - deltaTime,
    }))
    .filter((effect: StatusEffect) => effect.duration > 0);

  return {
    ...player,
    activeEffects: updatedEffects,
  };
}

/**
 * Checks if the player is incapacitated
 */
export function isPlayerIncapacitated(player: PlayerState): boolean {
  return (
    player.health <= 0 ||
    player.consciousness <= 0 ||
    player.combatReadiness === CombatReadiness.INCAPACITATED
  );
}

/**
 * Checks if the player is defeated
 */
export function isPlayerDefeated(player: PlayerState): boolean {
  return (
    player.health <= 0 ||
    player.combatReadiness === CombatReadiness.INCAPACITATED
  );
}

/**
 * Gets the archetype's specializations and bonuses
 */
export function getArchetypeSpecializations(player: PlayerState): {
  bonuses: any; // Use proper type from PlayerArchetypeData
  preferredTrigrams: readonly string[];
  specialization: string;
} {
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];

  if (!archetypeData) {
    return {
      bonuses: {
        damageBonus: 1.0,
        accuracyBonus: 1.0,
        speedBonus: 1.0,
        defenseBonus: 1.0,
      },
      preferredTrigrams: ["geon"],
      specialization: "General combat",
    };
  }

  return {
    bonuses: archetypeData.bonuses,
    preferredTrigrams: archetypeData.preferredTrigrams,
    specialization: archetypeData.specialization,
  };
}

export function calculateArchetypeDamageModifier(
  archetype: PlayerArchetype,
  baseDamage: number
): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  if (!archetypeData) return baseDamage;

  return baseDamage * archetypeData.bonuses.damageBonus;
}

export function getArchetypeAccuracyModifier(
  archetype: PlayerArchetype
): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  return archetypeData?.bonuses.accuracyBonus ?? 1.0;
}

export function isArchetypePreferredStance(
  archetype: PlayerArchetype,
  stance: string
): boolean {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  return archetypeData?.preferredTrigrams.includes(stance) ?? false;
}

export function getArchetypeVitalPointBonus(
  archetype: PlayerArchetype,
  vitalPointCategory: string
): number {
  // Korean martial arts archetype specializations
  const categoryBonuses: Record<PlayerArchetype, Record<string, number>> = {
    musa: { head: 1.2, joints: 1.5, torso: 1.1 },
    amsalja: { nerve: 1.8, pressure_point: 2.0, vascular: 1.6 },
    hacker: { nerve: 1.6, head: 1.4, organs: 1.3 },
    jeongbo_yowon: { pressure_point: 1.7, nerve: 1.5, psychological: 1.4 },
    jojik_pokryeokbae: { joints: 1.6, organs: 1.4, general: 1.5 },
  };

  return categoryBonuses[archetype]?.[vitalPointCategory] ?? 1.0;
}

// Korean martial arts utility functions
export function getKoreanArchetypeName(archetype: PlayerArchetype): {
  korean: string;
  english: string;
  romanized: string;
} {
  const names: Record<
    PlayerArchetype,
    { korean: string; english: string; romanized: string }
  > = {
    musa: {
      korean: "무사",
      english: "Traditional Warrior",
      romanized: "Musa",
    },
    amsalja: {
      korean: "암살자",
      english: "Shadow Assassin",
      romanized: "Amsalja",
    },
    hacker: {
      korean: "해커",
      english: "Cyber Warrior",
      romanized: "Hacker",
    },
    jeongbo_yowon: {
      korean: "정보요원",
      english: "Intelligence Operative",
      romanized: "Jeongbo Yowon",
    },
    jojik_pokryeokbae: {
      korean: "조직폭력배",
      english: "Organized Crime",
      romanized: "Jojik Pokryeokbae",
    },
  };

  return names[archetype];
}

export function validatePlayerArchetype(
  archetype: string
): archetype is PlayerArchetype {
  return [
    "musa",
    "amsalja",
    "hacker",
    "jeongbo_yowon",
    "jojik_pokryeokbae",
  ].includes(archetype);
}

/**
 * Creates a default player state
 */
export function createDefaultPlayer(
  archetype: PlayerArchetype = "musa",
  stance: TrigramStance = "geon"
): PlayerState {
  return {
    id: `player_${Date.now()}`,
    name: `${archetype}_player`,
    archetype,
    stance,
    position: { x: 0, y: 0 },
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
    isAttacking: false,
    combatReadiness: 100,
    activeEffects: [],
    combatState: "ready",
    conditions: [],
  };
}

export function getArchetypeDisplayName(archetype: PlayerArchetype): {
  korean: string;
  english: string;
} {
  const archetypeNames = {
    musa: { korean: "무사", english: "Traditional Warrior" },
    amsalja: { korean: "암살자", english: "Shadow Assassin" },
    hacker: { korean: "해커", english: "Cyber Warrior" },
    jeongbo_yowon: { korean: "정보요원", english: "Intelligence Operative" },
    jojik_pokryeokbae: { korean: "조직폭력배", english: "Organized Crime" },
  };

  return archetypeNames[archetype] || archetypeNames.musa;
}

export function calculatePlayerEffectiveness(player: PlayerState): number {
  const healthRatio = player.health / player.maxHealth;
  const kiRatio = player.ki / player.maxKi;
  const staminaRatio = player.stamina / player.maxStamina;

  // Korean martial arts emphasis on mental state (consciousness)
  const consciousnessRatio = player.consciousness / 100;
  const painPenalty = Math.max(0, 1 - player.pain / 100);

  return Math.min(
    1.0,
    healthRatio * 0.3 +
      kiRatio * 0.25 +
      staminaRatio * 0.25 +
      consciousnessRatio * 0.15 +
      painPenalty * 0.05
  );
}
