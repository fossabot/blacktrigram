// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  PlayerAttributes,
  PlayerSkills,
} from "../types/player";
import type {
  TrigramStance,
  EffectType,
  CombatReadiness,
  DamageType,
  BodyRegion,
} from "../types/enums";
import type { Position, StatusEffect } from "../types/common"; // Removed CombatCondition
import type { KoreanText } from "../types/korean-text"; // Import KoreanText directly
import {
  PLAYER_ARCHETYPE_DATA,
  PLAYER_BASE_STATS,
  ARCHETYPE_STAT_MODIFIERS,
  PlayerArchetypeData,
} from "../types/constants/player";
import type { KoreanTechnique, HitResult } from "../types/combat";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  // TRIGRAM_STANCES_ORDER, // Removed unused import
} from "../types/constants/trigram";
import { DEFAULT_STANCE_COOLDOWN_MS } from "../types/constants";
import type {
  VitalPoint,
  VitalPointEffect as AnatomyVitalPointEffect,
} from "../types/anatomy";
import {
  getVitalPointById,
  VITAL_POINTS_DATA,
} from "../types/constants/vital-points";

// Placeholder for TRIGRAM_TRANSITION_RULES if not found
let TRIGRAM_TRANSITION_RULES: any[] = [];
try {
  // Corrected path assuming TransitionCalculator.ts is in src/systems/trigram/
  TRIGRAM_TRANSITION_RULES =
    require("../systems/trigram/TransitionCalculator").TRIGRAM_TRANSITION_RULES;
} catch (e) {
  console.warn(
    "TRIGRAM_TRANSITION_RULES not found in ../systems/trigram/TransitionCalculator, using placeholder (empty array)."
  );
  TRIGRAM_TRANSITION_RULES = [];
}

// Placeholder for calculateDamageOnVitalPoint if not found
let calculateDamageOnVitalPointSystem: (
  vitalPoint: VitalPoint,
  baseDamage: number,
  damageType?: DamageType
) => { damage: number; effects: StatusEffect[] } = (
  vitalPoint,
  baseDamage
) => ({
  damage: baseDamage * (vitalPoint.damageMultiplier || 1.5),
  effects: [],
});

try {
  // Corrected path assuming DamageCalculator.ts is in src/systems/vitalpoint/
  calculateDamageOnVitalPointSystem =
    require("../systems/vitalpoint/DamageCalculator").calculateDamageOnVitalPoint;
} catch (e) {
  console.warn(
    "calculateDamageOnVitalPoint not found in ../systems/vitalpoint/DamageCalculator, using placeholder."
  );
}

const DEFAULT_ATTRIBUTES: PlayerAttributes = {
  strength: 10,
  agility: 10,
  endurance: 10,
  intelligence: 10,
  focus: 10,
  resilience: 10,
};

const DEFAULT_SKILLS: PlayerSkills = {
  striking: 10,
  kicking: 10,
  grappling: 10,
  weaponry: 0,
  meditation: 5,
  strategy: 5,
};

// Define ALL_BODY_REGIONS based on the BodyRegion type for initialization
const ALL_BODY_REGIONS: BodyRegion[] = [
  "head",
  "face_upper",
  "chest",
  "abdomen",
  "neck",
  "torso",
  "left_arm",
  "right_arm",
  "left_leg",
  "right_leg",
];

export function createPlayerState(
  id: string,
  archetype: PlayerArchetype,
  initialStance: TrigramStance,
  position: Position,
  facing: "left" | "right" = "right"
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  const statModifiers = ARCHETYPE_STAT_MODIFIERS[archetype];

  const maxHealth =
    PLAYER_BASE_STATS.MAX_HEALTH * statModifiers.healthMultiplier;
  const maxKi = PLAYER_BASE_STATS.MAX_KI * statModifiers.kiMultiplier;
  const maxStamina =
    PLAYER_BASE_STATS.MAX_STAMINA * statModifiers.staminaMultiplier;

  return {
    id,
    archetype,
    name: archetypeData.name,
    health: maxHealth,
    maxHealth,
    ki: maxKi,
    maxKi,
    stamina: maxStamina,
    maxStamina,
    consciousness: PLAYER_BASE_STATS.CONSCIOUSNESS,
    pain: PLAYER_BASE_STATS.PAIN,
    balance: PLAYER_BASE_STATS.BALANCE * statModifiers.balanceBonus,
    bloodLoss: PLAYER_BASE_STATS.BLOOD_LOSS,
    position,
    facing,
    currentTargetId: null,
    activeEffects: [],
    attributes: {
      ...DEFAULT_ATTRIBUTES, // Now defined
      ...(archetypeData.baseAttributes || {}),
    },
    skills: {
      ...DEFAULT_SKILLS, // Now defined
      ...(archetypeData.baseSkills || {}),
    },
    combatState: "idle",
    lastActionTime: 0,
    lastStanceChangeTime: 0,
    comboCount: 0,
    vitalPointDamage: {},
    bodyPartStatus: ALL_BODY_REGIONS.reduce((acc, region) => {
      acc[region] = "healthy";
      return acc;
    }, {} as Record<BodyRegion, "healthy" | "injured" | "critical">),
    knownTechniques: [],
    currentStance: initialStance,
    combatReadiness: "ready",
  };
}

export function updatePlayerStats(
  player: PlayerState,
  updates: Partial<PlayerState>
): PlayerState {
  return { ...player, ...updates };
}

function determineCombatReadiness(player: PlayerState): CombatReadiness {
  if (player.health <= 0 || player.consciousness <= 0) return "incapacitated";
  if (player.combatState === "defeated") return "incapacitated";
  if (player.health < player.maxHealth * 0.1) return "critical_damage";
  if (player.health < player.maxHealth * 0.3) return "heavy_damage";
  if (player.stamina < player.maxStamina * 0.1) return "exhausted";
  if (player.activeEffects.some((e) => e.type === ("stun" as EffectType)))
    return "not_ready"; // Stunned implies not_ready
  if (player.pain > 75) return "injured"; // High pain
  return "ready";
}

export function calculateStaminaCost(
  player: PlayerState,
  technique: KoreanTechnique,
  archetypeData: PlayerArchetypeData
): number {
  let cost = technique.staminaCost || 0;
  if (archetypeData.bonuses?.staminaEfficiency) {
    cost /= archetypeData.bonuses.staminaEfficiency;
  }
  if (hasStatusEffect(player, "exhausted" as EffectType)) {
    cost *= 1.5;
  }
  // Consider player's endurance attribute for reduction
  cost -= (getPlayerAttribute(player, "endurance") - 10) * 0.1; // Example: 1 point of endurance reduces cost by 0.1
  return Math.max(0, Math.round(cost));
}

export function calculateKiCost(
  player: PlayerState,
  technique: KoreanTechnique,
  archetypeData: PlayerArchetypeData
): number {
  let cost = technique.kiCost || 0;
  if (archetypeData.bonuses?.kiEfficiency) {
    cost /= archetypeData.bonuses.kiEfficiency;
  }
  if (hasStatusEffect(player, "vital_weakness" as EffectType)) {
    // Assuming 'vital_weakness' is a valid EffectType
    cost *= 1.2;
  }
  // Consider player's focus attribute for reduction
  cost -= (getPlayerAttribute(player, "focus") - 10) * 0.1; // Example: 1 point of focus reduces cost by 0.1
  return Math.max(0, Math.round(cost));
}

export function applyDamage(
  player: PlayerState,
  damageAmount: number,
  damageType?: DamageType,
  hitLocation?: BodyRegion,
  vitalPointHit?: VitalPoint | null
): PlayerState {
  let updatedPlayer = { ...player };
  const archetypeData = PLAYER_ARCHETYPE_DATA[updatedPlayer.archetype];
  let actualDamage = damageAmount;

  // Apply damage resistance from archetype
  if (archetypeData.bonuses?.damageResistance) {
    actualDamage /= archetypeData.bonuses.damageResistance;
  }
  // Apply damage resistance from active effects
  updatedPlayer.activeEffects.forEach((effect) => {
    effect.modifiers?.forEach((mod) => {
      if (
        mod.attribute === "damageResistance" &&
        damageType &&
        (!mod.damageType || mod.damageType === damageType)
      ) {
        actualDamage *= 1 - mod.value;
      }
    });
  });

  actualDamage = Math.max(0, actualDamage);
  updatedPlayer.health = Math.max(0, updatedPlayer.health - actualDamage);

  // Update pain, consciousness, balance, bloodLoss based on damage
  // These are simplified; a real system would be more nuanced
  updatedPlayer.pain = Math.min(
    100,
    updatedPlayer.pain +
      actualDamage *
        0.5 *
        (1 / (getPlayerAttribute(updatedPlayer, "resilience") / 10))
  );
  if (actualDamage > 20) {
    // Significant hit
    updatedPlayer.consciousness = Math.max(
      0,
      updatedPlayer.consciousness - actualDamage * 0.2
    );
    updatedPlayer.balance = Math.max(
      0,
      updatedPlayer.balance - actualDamage * 0.3
    );
  }
  if (damageType === "slashing" || damageType === "piercing") {
    updatedPlayer.bloodLoss = Math.min(
      100,
      updatedPlayer.bloodLoss + actualDamage * 0.1
    );
    if (
      !hasStatusEffect(updatedPlayer, "bleeding" as EffectType) &&
      actualDamage > 10
    ) {
      const bleedEffect: StatusEffect = {
        id: `bleed_${Date.now()}`,
        type: "bleeding" as EffectType,
        intensity: "moderate",
        duration: 10000,
        description: { korean: "출혈", english: "Bleeding" },
        stackable: false,
        modifiers: [
          { attribute: "health_regen_penalty", value: 0.5, type: "percentage" },
        ], // Example modifier
      };
      updatedPlayer = addStatusEffect(updatedPlayer, bleedEffect);
    }
  }

  if (hitLocation) {
    updatedPlayer.bodyPartStatus[hitLocation] =
      updatedPlayer.health < player.maxHealth * 0.2 ? "critical" : "injured";
  }

  if (vitalPointHit) {
    updatedPlayer.vitalPointDamage[vitalPointHit.id] =
      (updatedPlayer.vitalPointDamage[vitalPointHit.id] || 0) + actualDamage;
    updatedPlayer = applyVitalPointEffects(
      updatedPlayer,
      vitalPointHit,
      actualDamage
    );
  }

  if (updatedPlayer.health <= 0) {
    updatedPlayer.combatState = "defeated";
    updatedPlayer.consciousness = 0;
  } else if (
    updatedPlayer.pain > 80 &&
    updatedPlayer.combatState !== "stunned"
  ) {
    // Chance to get stunned by high pain
    if (Math.random() < (updatedPlayer.pain - 80) / 20) {
      // Higher chance as pain exceeds 80
      updatedPlayer.combatState = "stunned";
      const stunEffect: StatusEffect = {
        id: `stun_pain_${Date.now()}`,
        type: "stun" as EffectType,
        intensity: "severe",
        duration: 2000 + (updatedPlayer.pain - 80) * 50,
        description: { korean: "고통으로 기절", english: "Stunned by pain" },
        stackable: false,
      };
      updatedPlayer = addStatusEffect(updatedPlayer, stunEffect);
    }
  }

  updatedPlayer.combatReadiness = determineCombatReadiness(updatedPlayer);
  return updatePlayerStats(player, updatedPlayer); // Return a new state object
}

export function applyVitalPointEffects(
  player: PlayerState,
  vitalPoint: VitalPoint,
  damageDealtToVitalPoint: number
): PlayerState {
  let newPlayerState = { ...player };
  // Apply effects defined on the vital point itself
  vitalPoint.effects.forEach((vpEffectData: AnatomyVitalPointEffect) => {
    // Use AnatomyVitalPointEffect
    const effectToApply: StatusEffect = {
      // Map to StatusEffect
      id: vpEffectData.id || `${vpEffectData.type}_${Date.now()}`, // Ensure ID
      type: vpEffectData.type,
      intensity: vpEffectData.intensity,
      duration: vpEffectData.duration,
      description: vpEffectData.description,
      stackable: vpEffectData.stackable,
      source: vpEffectData.source || `vital_point:${vitalPoint.id}`,
      chance: vpEffectData.chance,
      modifiers: vpEffectData.modifiers,
    };
    if (!effectToApply.chance || Math.random() < effectToApply.chance) {
      newPlayerState = addStatusEffect(newPlayerState, effectToApply);
    }
  });

  // Example: Specific hardcoded effects based on vital point category or severity
  if (vitalPoint.category === "nerve" || vitalPoint.category === "vascular") {
    newPlayerState.consciousness = Math.max(
      0,
      newPlayerState.consciousness - damageDealtToVitalPoint * 0.3
    );
    if (Math.random() < 0.3) {
      // Chance for temporary paralysis/weakness
      const nerveEffect: StatusEffect = {
        id: `nerve_hit_${Date.now()}`,
        type: "paralysis" as EffectType,
        intensity: "moderate",
        duration: 3000,
        description: { korean: "신경 충격", english: "Nerve Shock" },
        stackable: false,
      };
      newPlayerState = addStatusEffect(newPlayerState, nerveEffect);
    }
  }
  if (vitalPoint.severity === "critical" || vitalPoint.severity === "lethal") {
    newPlayerState.pain = Math.min(
      100,
      newPlayerState.pain + damageDealtToVitalPoint * 0.8
    );
  }

  newPlayerState.combatReadiness = determineCombatReadiness(newPlayerState);
  return newPlayerState;
}

export function executeTechnique(
  attacker: PlayerState,
  defender: PlayerState,
  technique: KoreanTechnique,
  targetVitalPointId?: string | null
): {
  updatedAttacker: PlayerState;
  updatedDefender: PlayerState;
  hitResult: HitResult;
} {
  let updatedAttacker = { ...attacker };
  let updatedDefender = { ...defender };
  const attackerArchetypeData = PLAYER_ARCHETYPE_DATA[attacker.archetype];

  const staminaCost = calculateStaminaCost(
    attacker,
    technique,
    attackerArchetypeData
  );
  const kiCost = calculateKiCost(attacker, technique, attackerArchetypeData);

  if (attacker.stamina < staminaCost || attacker.ki < kiCost) {
    // Not enough resources
    return {
      updatedAttacker,
      updatedDefender,
      hitResult: {
        hit: false,
        damage: 0,
        critical: false,
        effects: [],
        vitalPointsHit: [],
        attacker: attacker.archetype,
        defender: defender.archetype,
        damagePrevented: 0,
        staminaUsed: 0,
        kiUsed: 0,
        defenderDamaged: false,
        attackerStance: attacker.currentStance,
        defenderStance: defender.currentStance,
        painLevel: defender.pain,
        consciousnessImpact: 0,
        balanceEffect: 0,
        bloodLoss: defender.bloodLoss,
        stunDuration: 0,
        statusEffects: [],
        hitType: "miss",
        techniqueUsed: technique,
        effectiveness: 0,
        hitPosition: defender.position,
        newState: defender.combatState,
        damageType: technique.damageType || "blunt",
        isVitalPoint: false,
        vitalPoint: undefined,
      },
    };
  }

  updatedAttacker.stamina -= staminaCost;
  updatedAttacker.ki -= kiCost;
  updatedAttacker.lastActionTime = Date.now();
  updatedAttacker.combatState = "attacking"; // Will change to recovering or idle after

  // Hit calculation (simplified: base accuracy + skill - target evasion/defense)
  const attackerSkill =
    technique.type === "strike" || technique.type === "punch"
      ? getPlayerSkill(attacker, "striking")
      : technique.type === "grapple"
      ? getPlayerSkill(attacker, "grappling")
      : getPlayerSkill(attacker, "strategy"); // Default to strategy for others

  const defenderAgility = getPlayerAttribute(defender, "agility");
  const baseAccuracy = technique.accuracy || 0.8;
  const hitChance =
    baseAccuracy +
    attackerSkill / 100 -
    defenderAgility / 150 +
    (attackerArchetypeData.bonuses?.accuracyBonus || 0) -
    (PLAYER_ARCHETYPE_DATA[defender.archetype].bonuses?.defenseBonus || 0) *
      0.1;

  const didHit = Math.random() < Math.max(0.1, Math.min(0.95, hitChance));

  let damageDealt = 0;
  let isCritical = false;
  const effectsApplied: StatusEffect[] = [];

  // Variables to build parts of HitResult
  let vitalPointForHitResult: VitalPoint | null = null;
  let hitTypeForHitResult: "miss" | "normal" | "critical" | "vital" = "miss";
  let isVitalPointForHitResult: boolean = false;

  if (didHit) {
    damageDealt =
      technique.damage ||
      (technique.damageRange
        ? (technique.damageRange.min + technique.damageRange.max) / 2
        : 10);
    damageDealt *= 1 + (getPlayerAttribute(attacker, "strength") - 10) * 0.05; // Strength bonus
    damageDealt *= attackerArchetypeData.bonuses?.damageBonus || 1.0;

    // Stance effectiveness
    const stanceEffectiveness =
      STANCE_EFFECTIVENESS_MATRIX[attacker.currentStance]?.[
        defender.currentStance
      ] || 1.0;
    damageDealt *= stanceEffectiveness;

    // Critical Hit
    const critChance =
      (technique.critChance || 0.05) +
      getPlayerAttribute(attacker, "focus") / 200;
    if (Math.random() < critChance) {
      isCritical = true;
      damageDealt *= technique.critMultiplier || 1.5;
    }

    // Vital Point Targeting
    if (targetVitalPointId) {
      vitalPointForHitResult = getVitalPointById(targetVitalPointId) || null;
    } else if (
      technique.type === "pressure_point" ||
      technique.type === "nerve_strike"
    ) {
      const vulnerablePoints = VITAL_POINTS_DATA.filter(
        (vp) => vp.severity === "critical" || vp.severity === "severe"
      );
      if (vulnerablePoints.length > 0) {
        vitalPointForHitResult =
          vulnerablePoints[Math.floor(Math.random() * vulnerablePoints.length)];
      }
    }

    if (vitalPointForHitResult) {
      isVitalPointForHitResult = true;
      // Use the imported/placeholder function
      const vpDamageResult = calculateDamageOnVitalPointSystem(
        vitalPointForHitResult,
        damageDealt,
        technique.damageType
      );
      damageDealt = vpDamageResult.damage;
      vpDamageResult.effects.forEach((effect) => effectsApplied.push(effect));
    }

    updatedDefender = applyDamage(
      updatedDefender,
      damageDealt,
      technique.damageType,
      undefined,
      vitalPointForHitResult
    );

    // Explicitly type effectData
    technique.effects?.forEach((effectData: StatusEffect) => {
      if (!effectData.chance || Math.random() < effectData.chance) {
        updatedDefender = addStatusEffect(updatedDefender, {
          ...effectData,
          id: effectData.id || `${effectData.type}_${Date.now()}`,
        });
        effectsApplied.push({
          ...effectData,
          id: effectData.id || `${effectData.type}_${Date.now()}`,
        });
      }
    });
    hitTypeForHitResult = isCritical
      ? "critical"
      : vitalPointForHitResult
      ? "vital"
      : "normal";
  } else {
    // hitTypeForHitResult is already "miss"
    // isVitalPointForHitResult is already false
  }

  updatedAttacker.combatState = "recovering"; // Or idle after a timeout
  updatedAttacker.comboCount = didHit ? attacker.comboCount + 1 : 0;

  // Update combat readiness for both
  updatedAttacker.combatReadiness = determineCombatReadiness(updatedAttacker);
  updatedDefender.combatReadiness = determineCombatReadiness(updatedDefender);

  const finalHitResult: HitResult = {
    hit: didHit,
    damage: damageDealt,
    critical: isCritical,
    effects: effectsApplied,
    vitalPointsHit: vitalPointForHitResult ? [vitalPointForHitResult] : [],
    attacker: attacker.archetype,
    defender: defender.archetype,
    damagePrevented: 0,
    staminaUsed: staminaCost,
    kiUsed: kiCost,
    defenderDamaged: didHit && damageDealt > 0,
    attackerStance: attacker.currentStance,
    defenderStance: defender.currentStance,
    painLevel: updatedDefender.pain,
    consciousnessImpact: defender.consciousness - updatedDefender.consciousness,
    balanceEffect: defender.balance - updatedDefender.balance,
    bloodLoss: updatedDefender.bloodLoss,
    stunDuration:
      updatedDefender.activeEffects.find(
        (e) => e.type === ("stun" as EffectType)
      )?.duration || 0,
    statusEffects: updatedDefender.activeEffects,
    techniqueUsed: technique,
    effectiveness:
      STANCE_EFFECTIVENESS_MATRIX[attacker.currentStance]?.[
        defender.currentStance
      ] || 1.0,
    hitPosition: defender.position,
    newState: updatedDefender.combatState,
    damageType: technique.damageType || "blunt",
    isVitalPoint: isVitalPointForHitResult,
    vitalPoint: vitalPointForHitResult || undefined,
    hitType: hitTypeForHitResult,
  };

  return {
    updatedAttacker: updatePlayerStats(attacker, updatedAttacker),
    updatedDefender: updatePlayerStats(defender, updatedDefender),
    hitResult: finalHitResult,
  };
}

export function addStatusEffect(
  player: PlayerState,
  effect: StatusEffect
): PlayerState {
  const existingEffectIndex = player.activeEffects.findIndex(
    (e) => e.id === effect.id || e.type === effect.type
  );
  let newEffects = [...player.activeEffects];

  if (existingEffectIndex !== -1) {
    if (effect.stackable) {
      // Simple stack: add new, or could extend duration/intensity of existing
      newEffects.push(effect);
    } else {
      // Replace if new one is stronger or has longer duration (example logic)
      if (
        effect.intensity > newEffects[existingEffectIndex].intensity ||
        effect.duration > newEffects[existingEffectIndex].duration
      ) {
        newEffects[existingEffectIndex] = effect;
      }
    }
  } else {
    newEffects.push(effect);
  }
  return updatePlayerStats(player, {
    activeEffects: newEffects,
    combatReadiness: determineCombatReadiness({
      ...player,
      activeEffects: newEffects,
    }),
  });
}

export function removeStatusEffect(
  player: PlayerState,
  effectIdOrType: string | EffectType
): PlayerState {
  const newEffects = player.activeEffects.filter(
    (c: StatusEffect) => c.id !== effectIdOrType && c.type !== effectIdOrType
  );
  return updatePlayerStats(player, {
    activeEffects: newEffects,
    combatReadiness: determineCombatReadiness({
      ...player,
      activeEffects: newEffects,
    }),
  });
}

export function updateStatusEffects(
  player: PlayerState,
  deltaTimeMs: number
): PlayerState {
  let stateChanged = false;
  const updatedEffects = player.activeEffects
    .map((effect: StatusEffect) => {
      const newDuration = effect.duration - deltaTimeMs;
      if (newDuration <= 0) {
        stateChanged = true;
        return null; // Mark for removal
      }
      // Apply ongoing effects (e.g., bleed damage, ki drain)
      // This part needs specific logic per effect type
      // Example: if (effect.type === 'bleeding') player.health -= effect.intensity * (deltaTimeMs / 1000);
      return { ...effect, duration: newDuration };
    })
    .filter((effect) => effect !== null) as StatusEffect[];

  if (stateChanged) {
    return updatePlayerStats(player, {
      activeEffects: updatedEffects,
      combatReadiness: determineCombatReadiness({
        ...player,
        activeEffects: updatedEffects,
      }),
    });
  }
  return player; // No change if no effects expired or ticked
}

export function hasStatusEffect(
  player: PlayerState,
  effectType: EffectType
): boolean {
  return player.activeEffects.some(
    (condition: StatusEffect) => condition.type === effectType
  );
}

export function getPlayerAttribute(
  player: PlayerState,
  attribute: keyof PlayerAttributes
): number {
  let value = player.attributes[attribute];
  player.activeEffects.forEach((effect: StatusEffect) => {
    effect.modifiers?.forEach((mod) => {
      if (mod.attribute === attribute) {
        value += mod.type === "flat" ? mod.value : value * mod.value; // Assuming percentage is multiplicative e.g. 0.1 for +10%
      }
    });
  });
  return Math.max(1, Math.round(value)); // Attributes shouldn't go below 1
}

export function getPlayerSkill(
  player: PlayerState,
  skill: keyof PlayerSkills
): number {
  let value = player.skills[skill];
  player.activeEffects.forEach((effect: StatusEffect) => {
    effect.modifiers?.forEach((mod) => {
      if (mod.attribute === skill) {
        // Assuming skill modifications use the same 'attribute' field
        value += mod.type === "flat" ? mod.value : value * mod.value;
      }
    });
  });
  return Math.max(0, Math.round(value)); // Skills can be 0
}

export function canChangeStance(
  player: PlayerState,
  newStance: TrigramStance,
  currentTime: number
): boolean {
  if (player.currentStance === newStance) return false;
  if (
    player.combatState === "stunned" ||
    player.combatState === "attacking" ||
    player.combatState === "recovering"
  ) {
    return false;
  }
  if (currentTime - player.lastStanceChangeTime < DEFAULT_STANCE_COOLDOWN_MS) {
    return false;
  }

  const transitionRule = TRIGRAM_TRANSITION_RULES.find(
    // Now defined
    (rule: any) => rule.from === player.currentStance && rule.to === newStance
  );

  if (!transitionRule) return false; // No valid transition defined or rules not loaded

  if (player.ki < (transitionRule.cost?.ki || 0)) return false;
  if (player.stamina < (transitionRule.cost?.stamina || 0)) return false;

  return true;
}

export function changeStance(
  player: PlayerState,
  newStance: TrigramStance,
  currentTime: number
): PlayerState {
  if (!canChangeStance(player, newStance, currentTime)) return player;

  const transitionRule = TRIGRAM_TRANSITION_RULES.find(
    // Now defined
    (rule: any) => rule.from === player.currentStance && rule.to === newStance
  );

  const kiCost = transitionRule?.cost?.ki || 0;
  const staminaCost = transitionRule?.cost?.stamina || 0;

  return updatePlayerStats(player, {
    currentStance: newStance,
    ki: player.ki - kiCost,
    stamina: player.stamina - staminaCost,
    lastStanceChangeTime: currentTime,
    combatState: "idle", // Changing stance usually means readying
  });
}

export function calculateCombinedArchetypeBonus(
  archetype: PlayerArchetype
): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  if (!archetypeData || !archetypeData.bonuses) return 1.0;
  // A more meaningful combination might be needed, this is just an average
  const bonuses = Object.values(archetypeData.bonuses).filter(
    (v) => typeof v === "number"
  ) as number[];
  if (bonuses.length === 0) return 1.0;
  return bonuses.reduce((sum, val) => sum + (val - 1), 0) / bonuses.length + 1; // Average of bonus factors
}

export function updatePlayerName(
  player: PlayerState,
  newName: KoreanText
): PlayerState {
  return updatePlayerStats(player, { name: newName });
}

export function calculatePlayerSpeed(player: PlayerState): number {
  let speed = getPlayerAttribute(player, "agility") * 0.1; // Base speed from agility
  if (hasStatusEffect(player, "stun" as EffectType)) {
    speed *= 0.1; // Drastically reduced if stunned
  }
  if (hasStatusEffect(player, "slowed" as EffectType)) {
    // Assuming 'slowed' is a valid EffectType
    speed *= 0.5;
  }
  if (hasStatusEffect(player, "hastened" as EffectType)) {
    // Assuming 'hastened' is a valid EffectType
    speed *= 1.5;
  }
  // Consider encumbrance or other factors if they exist
  return Math.max(0.1, speed); // Minimum speed
}

export function isPlayerCapacitated(player: PlayerState): boolean {
  return (
    player.health > 0 &&
    player.consciousness > 20 && // Need some level of consciousness
    player.combatState !== "defeated" &&
    player.combatState !== "stunned" &&
    player.combatReadiness !== "incapacitated" &&
    player.combatReadiness !== "critical_damage"
  ); // Too damaged to be effective
}

export function calculateArchetypeDamage(
  archetype: PlayerArchetype,
  baseDamage: number
): number {
  const archetypeData = PLAYER_ARCHETYPE_DATA[archetype];
  const damageBonus = archetypeData.bonuses?.damageBonus ?? 1.0;
  return baseDamage * damageBonus;
}

export function exampleCombatScenario(): void {
  let player1 = createPlayerState("P1_ID", "musa", "geon", { x: -100, y: 0 });
  let player2 = createPlayerState("P2_ID", "amsalja", "tae", { x: 100, y: 0 });

  console.log(
    "Initial P1:",
    player1.health,
    "HP,",
    player1.ki,
    "Ki,",
    player1.stamina,
    "Stamina"
  );
  console.log(
    "Initial P2:",
    player2.health,
    "HP,",
    player2.ki,
    "Ki,",
    player2.stamina,
    "Stamina"
  );

  const techniqueToUse: KoreanTechnique = TRIGRAM_DATA.geon.technique; // Example technique

  if (player1.health > 0 && player2.health > 0) {
    console.log(
      `\n${player1.name.english} (Musa) uses ${techniqueToUse.englishName} on ${player2.name.english} (Amsalja)`
    );
    const combatResult = executeTechnique(player1, player2, techniqueToUse);
    player1 = combatResult.updatedAttacker;
    player2 = combatResult.updatedDefender;

    console.log(
      "Hit:",
      combatResult.hitResult.hit,
      "Damage:",
      combatResult.hitResult.damage,
      "Critical:",
      combatResult.hitResult.critical
    );
    if (combatResult.hitResult.vitalPoint) {
      console.log(
        "Vital Point Hit:",
        combatResult.hitResult.vitalPoint.englishName
      );
    }
    console.log(
      "P1 after attack:",
      player1.health,
      "HP,",
      player1.ki,
      "Ki,",
      player1.stamina,
      "Stamina, State:",
      player1.combatState
    );
    console.log(
      "P2 after attack:",
      player2.health,
      "HP,",
      player2.ki,
      "Ki,",
      player2.stamina,
      "Stamina, State:",
      player2.combatState
    );
    combatResult.hitResult.effects.forEach((eff) =>
      console.log(
        `Effect on P2: ${eff.description.english} for ${eff.duration}ms`
      )
    );
  }

  // Example stance change
  const currentTime = Date.now();
  if (canChangeStance(player1, "li", currentTime)) {
    console.log(`\n${player1.name.english} attempts to change stance to Li.`);
    player1 = changeStance(player1, "li", currentTime);
    console.log(
      "P1 new stance:",
      player1.currentStance,
      "Ki:",
      player1.ki,
      "Stamina:",
      player1.stamina
    );
  }

  // Simulate time passing for status effects
  // In a real game loop, this would be called regularly
  player1 = updateStatusEffects(player1, 1000); // Simulate 1 second
  player2 = updateStatusEffects(player2, 1000);
  console.log(`\nAfter 1s of status effects:`);
  console.log(
    "P1 effects:",
    player1.activeEffects.map((e) => e.description.english)
  );
  console.log(
    "P2 effects:",
    player2.activeEffects.map((e) => e.description.english)
  );
}

// To run the example:
// exampleCombatScenario();
