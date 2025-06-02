// Test imports to check core type system functionality
import type {
  PlayerArchetype,
  TrigramStance,
  GamePhase,
  CombatState,
  DamageType,
  EffectType,
} from "./types";

import { KOREAN_COLORS, GAME_CONFIG } from "./types";

// Test that the types work correctly
const testArchetype: PlayerArchetype = "musa";
const testStance: TrigramStance = "geon";
const testPhase: GamePhase = "combat";
const testCombatState: CombatState = "ready";
const testDamageType: DamageType = "blunt";
const testEffect: EffectType = "stun";

// Test constants
const testColor = KOREAN_COLORS.GOLD;
const testConfig = GAME_CONFIG.MAX_HEALTH;

console.log("Type system test passed!", {
  testArchetype,
  testStance,
  testPhase,
  testCombatState,
  testDamageType,
  testEffect,
  testColor,
  testConfig,
});

export {}; // Make this a module
