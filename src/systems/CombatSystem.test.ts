import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import {
  PlayerState,
  KoreanTechnique,
  PlayerArchetype,
  TrigramStance,
  VitalPoint, // This should be the one from types/index.ts or types/anatomy.ts
  CombatResult,
  KoreanText,
  HitEffectType,
  DamageType,
  VitalPointEffect, // This should be the one from types/index.ts or types/anatomy.ts
  VitalPointLocation,
  StatusEffect,
  EffectIntensity,
  EffectType,
  VitalPointCategory,
  VitalPointSeverity,
} from "../types";
import {
  PLAYER_ARCHETYPES_DATA,
  ARCHETYPE_TECHNIQUE_BONUSES,
} from "../types/constants";
// import { VitalPointSystem } from "./VitalPointSystem"; // Removed unused import

// Mock data
const mockKoreanText = (text: string): KoreanText => ({
  korean: text,
  english: text,
  romanized: text,
});

const mockVitalPoint: VitalPoint = {
  // This mock should align with VitalPoint from types/index.ts
  id: "vp_test_heart",
  name: mockKoreanText("심장"),
  category: VitalPointCategory.INTERNAL_ORGAN.toString(), // Ensure category is string if types/index.ts VitalPoint.category is string
  // description: mockKoreanText("Critical organ"), // Removed: 'description' does not exist on types/index.ts VitalPoint
  location: {
    x: 50,
    y: 100,
    region: "torso_front",
    depth: 5,
  } as VitalPointLocation,
  severity: VitalPointSeverity.LETHAL, // This should now be compatible if types/index.ts VitalPoint.severity uses the enum
  baseAccuracy: 0.7,
  baseDamage: 50,
  damageMultiplier: 3.0,
  effects: [
    // This should now be compatible if types/index.ts VitalPointEffect.intensity uses the enum
    {
      id: "effect_cardiac_arrest",
      type: EffectType.STUN,
      intensity: EffectIntensity.HIGH,
      duration: 10000,
      description: mockKoreanText("Cardiac Arrest"),
      stackable: false,
    },
  ] as VitalPointEffect[], // Cast to the correct VitalPointEffect type
  techniques: ["tech_heart_strike"],
};

const mockTechnique: KoreanTechnique = {
  id: "tech_test_punch",
  name: "Test Punch",
  koreanName: "시험용 주먹",
  englishName: "Test Punch",
  romanized: "Siheomyong Jumeok",
  description: mockKoreanText("A basic test punch."),
  stance: TrigramStance.GEON,
  type: "strike",
  damageType: DamageType.Blunt, // Use PascalCase
  damage: 10,
  kiCost: 5,
  staminaCost: 10,
  accuracy: 0.9,
  critChance: 0.1,
  critMultiplier: 2.0,
  executionTime: 100,
  recoveryTime: 200,
  range: 1,
  effects: [],
  properties: [],
};

const createMockPlayer = (
  id: string,
  archetype: PlayerArchetype,
  stance: TrigramStance,
  _health: number = 100, // Prefixed with _ if not directly used in creation logic here
  _ki: number = 100,
  _stamina: number = 100,
  _position: { x: number; y: number } = { x: 0, y: 0 },
  _consciousness: number = 100
): PlayerState => {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
  return {
    id,
    name: mockKoreanText(`Test Player ${id}`),
    archetype,
    health: archetypeData.baseHealth, // Access directly
    maxHealth: archetypeData.baseHealth, // Access directly
    ki: archetypeData.baseKi, // Access directly
    maxKi: archetypeData.baseKi, // Access directly
    stamina: archetypeData.baseStamina, // Access directly
    maxStamina: archetypeData.baseStamina, // Access directly
    currentStance: stance,
    position: _position, // Use the parameter
    isGuarding: false,
    stunDuration: 0,
    comboCount: 0,
    lastActionTime: 0,
    consciousness: _consciousness, // Use the parameter
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    currentTechnique: null,
    activeEffects: [],
    vitalPoints: {
      // Initialize with some vital points for testing
      [mockVitalPoint.id]: {
        id: mockVitalPoint.id,
        damage: 0,
        status: "normal",
        effects: [],
        lastHitTime: 0,
      },
    },
    defensiveBonus: 0,
    attackPower:
      ARCHETYPE_TECHNIQUE_BONUSES[archetype]?.bonuses?.damageBonus ?? 1.0,
    movementSpeed: 1.0,
    reactionTime: 1.0,
    focusLevel: 100,
    battleExperience: 0,
    injuredLimbs: [],
    statusConditions: [],
  };
};

describe("CombatSystem", () => {
  let attacker: PlayerState;
  let defender: PlayerState;

  beforeEach(() => {
    attacker = createMockPlayer(
      "attacker",
      PlayerArchetype.MUSA,
      TrigramStance.GEON,
      100,
      100,
      100,
      { x: 0, y: 0 }
    );
    defender = createMockPlayer(
      "defender",
      PlayerArchetype.AMSALJA,
      TrigramStance.TAE,
      100,
      100,
      100,
      { x: 1, y: 0 }
    );
  });

  describe("resolveAttack", () => {
    it("should return a CombatResult", () => {
      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        mockTechnique
      );
      expect(result).toBeDefined();
      expect(result).toHaveProperty("hit");
      expect(result).toHaveProperty("damage");
      expect(result).toHaveProperty("critical");
      expect(result).toHaveProperty("effects");
      expect(result).toHaveProperty("message");
    });

    it("should calculate damage based on technique and archetype", () => {
      // Mock Math.random to ensure a hit and no critical
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.1; // Ensures hit (if hit chance > 10%), and no crit (if crit chance > 10%)
      global.Math = mockMath;

      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        mockTechnique
      );
      if (result.hit) {
        const baseDamage = mockTechnique.damage ?? 0;
        const attackerBonus =
          ARCHETYPE_TECHNIQUE_BONUSES[attacker.archetype]?.bonuses
            ?.damageBonus ?? 1;
        // This is a simplified check, actual damage involves stance effectiveness & vital points
        expect(result.damage).toBeGreaterThanOrEqual(
          baseDamage * attackerBonus * 0.5
        ); // Allow for some reduction
        expect(result.damage).toBeLessThanOrEqual(
          baseDamage * attackerBonus * 3.0
        ); // Allow for some amplification (crit, vital)
      }
      global.Math = Object.getPrototypeOf(mockMath); // Restore original Math
    });

    it("should correctly identify a vital point hit", () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.01; // Ensure hit and critical if possible
      global.Math = mockMath;

      // Mock VitalPointSystem's processHit to ensure a vital point is hit
      // Assuming CombatSystem.vitalPointSystem is an instance of VitalPointSystem
      // If VitalPointSystem.processHit is static, mock it as VitalPointSystem.processHit
      // The error "Property 'processHit' does not exist on type 'VitalPointSystem'" suggests
      // that either the class itself doesn't have it, or the instance type is wrong.
      // For the test, we mock the method on the instance used by CombatSystem.
      const mockProcessHitFn = jest.fn().mockReturnValue({
        totalDamage: 50,
        vitalPointsHit: [mockVitalPoint],
        effectsApplied: [],
        baseDamageReduction: 0,
        finalDamageMultiplier: 1,
        hit: true,
        damage: 50,
        effects: [],
        criticalHit: false,
        location: { x: 0, y: 0 },
        effectiveness: 1,
        statusEffectsApplied: [],
        painLevel: 10,
        consciousnessImpact: 5,
      });

      // Temporarily assign the mock to the static property if that's how it's accessed
      // Or, if CombatSystem news up VitalPointSystem, this won't work directly.
      // The previous code `CombatSystem['vitalPointSystem'].processHit = jest.fn()...` is correct for an instance member.
      const originalProcessHit = CombatSystem["vitalPointSystem"].processHit;
      CombatSystem["vitalPointSystem"].processHit = mockProcessHitFn;

      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        mockTechnique,
        mockVitalPoint.id // Target the vital point
      );

      expect(result.hit).toBe(true);
      expect(
        result.effects.some(
          (e) =>
            e.type === HitEffectType.VitalPointStrike &&
            e.vitalPointId === mockVitalPoint.id
        )
      ).toBe(true); // Access vitalPointId

      CombatSystem["vitalPointSystem"].processHit = originalProcessHit; // Restore
      global.Math = Object.getPrototypeOf(mockMath); // Restore original Math
    });
  });

  describe("applyCombatResult", () => {
    it("should update defender health", () => {
      const initialHealth = defender.health;
      const combatResult: CombatResult = {
        hit: true,
        damage: 20,
        critical: false,
        effects: [],
        message: mockKoreanText("Hit!"), // Use KoreanText object
      };
      const { updatedDefender } = CombatSystem.applyCombatResult(
        combatResult,
        attacker,
        defender
      );
      expect(updatedDefender.health).toBe(initialHealth - 20);
    });

    it("should apply status effects from CombatResult", () => {
      const mockStatusEffect: StatusEffect = {
        id: "eff_stun_123", // Instance ID
        type: EffectType.STUN, // Kind of effect
        name: mockKoreanText("Stunned"),
        intensity: EffectIntensity.MEDIUM,
        duration: 2000,
        description: mockKoreanText("Cannot act."),
        stackable: false,
        source: mockTechnique.id,
        applierId: attacker.id,
        targetId: defender.id,
        startTime: Date.now(),
        endTime: Date.now() + 2000,
        // effectId: "stun", // Removed, use 'type'
      };
      const combatResult: CombatResult = {
        hit: true,
        damage: 10,
        critical: false,
        effects: [
          {
            type: HitEffectType.StatusEffect,
            attackerId: attacker.id, // Add attackerId
            defenderId: defender.id, // Add defenderId
            statusEffect: mockStatusEffect,
            timestamp: Date.now(),
          },
        ],
        message: mockKoreanText("Hit with stun!"),
      };
      const { updatedDefender } = CombatSystem.applyCombatResult(
        combatResult,
        attacker,
        defender
      );
      expect(updatedDefender.activeEffects).toContain(mockStatusEffect.id);
    });
  });

  describe("getAvailableTechniques", () => {
    it("should return techniques for the current stance", () => {
      // This test depends on TrigramSystem providing techniques for stances
      // For now, it checks if it returns an array
      const techniques = CombatSystem.getAvailableTechniques(attacker);
      expect(Array.isArray(techniques)).toBe(true);
    });
  });
});
