// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  DamageType,
  EffectIntensity,
  EffectType,
  CombatCondition,
} from "../types";
// Import CombatReadiness as a value, not a type since we need to use it as values
import { CombatReadiness } from "../types/enums";
import type { Position } from "../types/common";
import { PLAYER_ARCHETYPE_DATA } from "../types/constants/player";

/**
 * Creates a new player state with Korean martial arts defaults
 * Uses archetype data to apply proper bonuses and specializations
 */
export function createPlayerState(
  name: string,
  archetype: PlayerArchetype,
  stance: TrigramStance = "geon",
  position: Position = { x: 0, y: 0 }
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];

  // Base stats modified by archetype specialization
  const baseHealth = Math.floor(
    100 * (archetypeData.bonuses.defenseBonus || 1.0)
  );
  const baseKi = Math.floor(
    100 * (archetypeData.bonuses.precisionBonus || 1.0)
  );
  const baseStamina = Math.floor(
    100 * (archetypeData.bonuses.speedBonus || 1.0)
  );

  return {
    id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    archetype,
    stance,
    health: baseHealth,
    maxHealth: baseHealth,
    ki: baseKi,
    maxKi: baseKi,
    stamina: baseStamina,
    maxStamina: baseStamina,
    position,
    facing: "right",
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: CombatReadiness.READY,
    activeEffects: [],
    combatState: "ready",
    conditions: [],
  };
}

/**
 * Initialize both players for combat with proper Korean martial arts positioning
 */
export function initializePlayers(): readonly [PlayerState, PlayerState] {
  const player1 = createPlayerState("무사", "musa", "geon", { x: -100, y: 0 });
  const player2 = createPlayerState("암살자", "amsalja", "tae", {
    x: 100,
    y: 0,
  });

  return [
    { ...player1, facing: "right" },
    { ...player2, facing: "left" },
  ] as const;
}

/**
 * Updates player combat state based on damage taken with Korean martial arts realism
 */
export function updatePlayerCombatState(
  player: PlayerState,
  damage: number,
  vitalPointHit: boolean = false
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];
  const damageResistance = archetypeData.bonuses.defenseBonus || 1.0;

  // Apply archetype-specific damage resistance
  const effectiveDamage = damage / damageResistance;

  const newHealth = Math.max(0, player.health - effectiveDamage);
  const newPain = Math.min(100, player.pain + effectiveDamage * 0.8);

  // Vital point hits cause severe consciousness loss
  const consciousnessLoss = vitalPointHit
    ? effectiveDamage * 2.5
    : effectiveDamage * 0.5;
  const newConsciousness = Math.max(
    0,
    player.consciousness - consciousnessLoss
  );

  // Blood loss calculation for realism
  const bloodLossIncrease = vitalPointHit
    ? effectiveDamage * 0.4
    : effectiveDamage * 0.1;

  return {
    ...player,
    health: newHealth,
    pain: newPain,
    consciousness: newConsciousness,
    isAttacking: false,
    bloodLoss: player.bloodLoss + bloodLossIncrease,
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
 * Updates player health with Korean martial arts archetype considerations
 */
export function updatePlayerHealth(
  player: PlayerState,
  damage: number,
  damageType: DamageType = "blunt"
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];

  // Apply archetype-specific damage resistance
  let resistance = archetypeData.bonuses.defenseBonus || 1.0;

  // Archetype-specific damage type resistances
  switch (player.archetype) {
    case "musa":
      if (damageType === "blunt" || damageType === "crushing")
        resistance *= 1.2;
      break;
    case "amsalja":
      if (damageType === "nerve" || damageType === "pressure")
        resistance *= 0.8; // More vulnerable
      break;
    case "hacker":
      if (damageType === "electric") resistance *= 1.5;
      break;
  }

  const effectiveDamage = Math.max(0, damage / resistance);
  const newHealth = Math.max(0, player.health - effectiveDamage);

  // Pain system based on Korean martial arts philosophy
  const painIncrease = effectiveDamage * 0.6;
  const newPain = Math.min(100, player.pain + painIncrease);

  // Consciousness impact varies by archetype training
  const consciousnessResistance = archetypeData.bonuses.accuracyBonus || 1.0;
  const consciousnessLoss = (effectiveDamage * 0.3) / consciousnessResistance;
  const newConsciousness = Math.max(
    0,
    player.consciousness - consciousnessLoss
  );

  // Blood loss for severe damage
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
 * Calculates movement speed with Korean martial arts considerations
 */
export function calculateMovementSpeed(player: PlayerState): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];
  let baseSpeed = 100 * (archetypeData.bonuses.speedBonus || 1.0);

  // Health factor affects movement
  const healthFactor = player.health / player.maxHealth;
  baseSpeed *= 0.5 + healthFactor * 0.5;

  // Stance affects movement - some stances are more mobile
  const stanceModifiers: Record<TrigramStance, number> = {
    geon: 1.0, // Heaven - balanced
    tae: 1.2, // Lake - fluid, fast
    li: 1.1, // Fire - quick
    jin: 0.9, // Thunder - powerful but slower
    son: 1.3, // Wind - fastest
    gam: 1.0, // Water - balanced
    gan: 0.8, // Mountain - defensive, slower
    gon: 0.7, // Earth - stable but slow
  };

  baseSpeed *= stanceModifiers[player.stance] || 1.0;

  // Combat state modifiers
  if (player.isAttacking) baseSpeed *= 0.3;

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
      case "pain":
        baseSpeed *= Math.max(0.3, 1 - player.pain / 200);
        break;
    }
  });

  return Math.max(0, baseSpeed);
}

/**
 * Checks if player can perform an action based on Korean martial arts principles
 */
export function canPerformAction(
  player: PlayerState,
  actionType: string
): boolean {
  // Basic incapacitation check
  if (player.health <= 0 || player.consciousness <= 0) return false;

  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];

  switch (actionType) {
    case "attack":
      const attackStamina = 10 / (archetypeData.bonuses.speedBonus || 1.0);
      return (
        player.stamina >= attackStamina &&
        player.combatState !== "incapacitated"
      );

    case "stance_change":
      const stanceKi = 5 / (archetypeData.bonuses.precisionBonus || 1.0);
      return player.ki >= stanceKi && player.combatState !== "stunned";

    case "block":
      const blockStamina = 5 / (archetypeData.bonuses.defenseBonus || 1.0);
      return player.stamina >= blockStamina;

    case "vital_point_attack":
      // Requires high precision and ki
      return player.ki >= 15 && player.consciousness >= 80;

    default:
      return true;
  }
}

/**
 * Gets Korean martial arts status with cultural accuracy
 */
export function getPlayerStatus(player: PlayerState): {
  korean: string;
  english: string;
  level: "critical" | "danger" | "warning" | "normal";
} {
  if (player.health <= 0) {
    return { korean: "기절", english: "Unconscious", level: "critical" };
  }
  if (player.health <= 20) {
    return { korean: "위험", english: "Critical Condition", level: "critical" };
  }
  if (player.health <= 50) {
    return { korean: "부상", english: "Injured", level: "danger" };
  }
  if (player.health <= 80) {
    return { korean: "경상", english: "Light Damage", level: "warning" };
  }
  return { korean: "정상", english: "Normal", level: "normal" };
}

/**
 * Checks stance change availability with Korean martial arts flow principles
 */
export function canChangeStance(
  player: PlayerState,
  targetStance: TrigramStance,
  cooldownMs: number = 500
): {
  canChange: boolean;
  reason?: string;
  cost: { ki: number; stamina: number };
} {
  const timeSinceLastChange = Date.now() - player.lastStanceChangeTime;

  if (timeSinceLastChange < cooldownMs) {
    return {
      canChange: false,
      reason: "Stance change on cooldown",
      cost: { ki: 0, stamina: 0 },
    };
  }

  // Calculate transition cost based on trigram philosophy
  const stanceTransitionCosts: Record<
    TrigramStance,
    Record<TrigramStance, { ki: number; stamina: number }>
  > = {
    geon: {
      tae: { ki: 5, stamina: 3 },
      li: { ki: 8, stamina: 5 },
      jin: { ki: 3, stamina: 2 },
      son: { ki: 10, stamina: 8 },
      gam: { ki: 12, stamina: 10 },
      gan: { ki: 7, stamina: 6 },
      gon: { ki: 15, stamina: 12 },
      geon: { ki: 0, stamina: 0 },
    },
    // ... other stances would have similar mappings
    tae: {
      geon: { ki: 5, stamina: 3 },
      li: { ki: 6, stamina: 4 },
      jin: { ki: 8, stamina: 6 },
      son: { ki: 4, stamina: 2 },
      gam: { ki: 3, stamina: 2 },
      gan: { ki: 10, stamina: 8 },
      gon: { ki: 12, stamina: 10 },
      tae: { ki: 0, stamina: 0 },
    },
    li: {
      geon: { ki: 8, stamina: 5 },
      tae: { ki: 6, stamina: 4 },
      jin: { ki: 4, stamina: 3 },
      son: { ki: 7, stamina: 5 },
      gam: { ki: 15, stamina: 12 },
      gan: { ki: 5, stamina: 4 },
      gon: { ki: 10, stamina: 8 },
      li: { ki: 0, stamina: 0 },
    },
    jin: {
      geon: { ki: 3, stamina: 2 },
      tae: { ki: 8, stamina: 6 },
      li: { ki: 4, stamina: 3 },
      son: { ki: 6, stamina: 4 },
      gam: { ki: 7, stamina: 5 },
      gan: { ki: 12, stamina: 10 },
      gon: { ki: 9, stamina: 7 },
      jin: { ki: 0, stamina: 0 },
    },
    son: {
      geon: { ki: 10, stamina: 8 },
      tae: { ki: 4, stamina: 2 },
      li: { ki: 7, stamina: 5 },
      jin: { ki: 6, stamina: 4 },
      gam: { ki: 5, stamina: 3 },
      gan: { ki: 8, stamina: 6 },
      gon: { ki: 3, stamina: 2 },
      son: { ki: 0, stamina: 0 },
    },
    gam: {
      geon: { ki: 12, stamina: 10 },
      tae: { ki: 3, stamina: 2 },
      li: { ki: 15, stamina: 12 },
      jin: { ki: 7, stamina: 5 },
      son: { ki: 5, stamina: 3 },
      gan: { ki: 4, stamina: 3 },
      gon: { ki: 6, stamina: 4 },
      gam: { ki: 0, stamina: 0 },
    },
    gan: {
      geon: { ki: 7, stamina: 6 },
      tae: { ki: 10, stamina: 8 },
      li: { ki: 5, stamina: 4 },
      jin: { ki: 12, stamina: 10 },
      son: { ki: 8, stamina: 6 },
      gam: { ki: 4, stamina: 3 },
      gon: { ki: 3, stamina: 2 },
      gan: { ki: 0, stamina: 0 },
    },
    gon: {
      geon: { ki: 15, stamina: 12 },
      tae: { ki: 12, stamina: 10 },
      li: { ki: 10, stamina: 8 },
      jin: { ki: 9, stamina: 7 },
      son: { ki: 3, stamina: 2 },
      gam: { ki: 6, stamina: 4 },
      gan: { ki: 3, stamina: 2 },
      gon: { ki: 0, stamina: 0 },
    },
  };

  const cost = stanceTransitionCosts[player.stance]?.[targetStance] || {
    ki: 10,
    stamina: 5,
  };

  if (player.ki < cost.ki) {
    return {
      canChange: false,
      reason: "Insufficient Ki energy",
      cost,
    };
  }

  if (player.stamina < cost.stamina) {
    return {
      canChange: false,
      reason: "Insufficient Stamina",
      cost,
    };
  }

  return { canChange: true, cost };
}

/**
 * Gets archetype specializations with Korean cultural context
 */
export function getArchetypeSpecializations(player: PlayerState): {
  bonuses: any;
  preferredTrigrams: readonly string[];
  specialization: string;
  philosophy: { korean: string; english: string };
} {
  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];

  const philosophies: Record<
    PlayerArchetype,
    { korean: string; english: string }
  > = {
    musa: { korean: "힘을 통한 명예", english: "Honor through strength" },
    amsalja: {
      korean: "은밀함을 통한 효율",
      english: "Efficiency through stealth",
    },
    hacker: { korean: "정보는 힘", english: "Information as power" },
    jeongbo_yowon: {
      korean: "관찰을 통한 지식",
      english: "Knowledge through observation",
    },
    jojik_pokryeokbae: {
      korean: "무자비함을 통한 생존",
      english: "Survival through ruthlessness",
    },
  };

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
      philosophy: { korean: "일반 무술", english: "General martial arts" },
    };
  }

  return {
    bonuses: archetypeData.bonuses,
    preferredTrigrams: archetypeData.preferredTrigrams,
    specialization: archetypeData.specialization,
    philosophy: philosophies[player.archetype],
  };
}

/**
 * Calculates player effectiveness with Korean martial arts principles
 */
export function calculatePlayerEffectiveness(player: PlayerState): {
  overall: number;
  factors: {
    physical: number;
    mental: number;
    spiritual: number;
    archetype: number;
  };
} {
  const healthRatio = player.health / player.maxHealth;
  const kiRatio = player.ki / player.maxKi;
  const staminaRatio = player.stamina / player.maxStamina;
  const consciousnessRatio = player.consciousness / 100;
  const painPenalty = Math.max(0, 1 - player.pain / 100);

  const archetypeData = PLAYER_ARCHETYPE_DATA[player.archetype];
  const archetypeBonus =
    (archetypeData.bonuses.damageBonus +
      archetypeData.bonuses.accuracyBonus +
      archetypeData.bonuses.speedBonus +
      archetypeData.bonuses.defenseBonus) /
    4;

  const factors = {
    physical: (healthRatio + staminaRatio) / 2,
    mental: consciousnessRatio,
    spiritual: kiRatio,
    archetype: archetypeBonus,
  };

  const overall = Math.min(
    1.0,
    factors.physical * 0.35 +
      factors.mental * 0.25 +
      factors.spiritual * 0.25 +
      (factors.archetype - 1.0) * 0.15 +
      painPenalty * 0.1
  );

  return { overall, factors };
}

/**
 * Updates player state with partial data
 */
export function updatePlayerState(
  currentState: PlayerState,
  updates: Partial<PlayerState>
): PlayerState {
  return {
    ...currentState,
    ...updates,
  };
}

export function getPlayerArchetypeBonus(
  archetype: PlayerArchetype,
  bonusType: keyof (typeof PLAYER_ARCHETYPE_DATA)[PlayerArchetype]["bonuses"]
): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  return archetypeData.bonuses[bonusType] || 1.0;
}
