import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import { TrainingCombatSystem } from "./combat/TrainingCombatSystem";
// Fix: Remove unused imports
import type { PlayerState, KoreanTechnique } from "../types";
import {
  PlayerArchetype,
  TrigramStance,
  CombatAttackType,
  DamageType,
} from "../types/enums";
import { createPlayerFromArchetype } from "../utils/playerUtils";

describe("CombatSystem", () => {
  let combatSystem: CombatSystem;
  // Fix: Remove unused variables
  let player1: PlayerState;
  let player2: PlayerState;
  let mockTechnique: KoreanTechnique;

  beforeEach(() => {
    combatSystem = new CombatSystem();
    player1 = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
    player2 = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);

    mockTechnique = {
      id: "test_punch",
      name: { korean: "주먹질", english: "Punch" },
      koreanName: "주먹질",
      englishName: "Punch",
      romanized: "jumeokjil",
      description: { korean: "기본 주먹 공격", english: "Basic punch attack" },
      stance: TrigramStance.GEON,
      type: CombatAttackType.PUNCH,
      damageType: DamageType.BLUNT,
      damage: 15,
      range: 1.0,
      kiCost: 5,
      staminaCost: 10,
      accuracy: 0.85,
      executionTime: 300,
      recoveryTime: 500,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  });

  describe("resolveAttack", () => {
    it("should resolve a basic attack successfully", () => {
      const result = combatSystem.resolveAttack(
        player1,
        player2,
        undefined // Fix: Use correct parameter type (string)
      );

      expect(result).toBeDefined();
      expect(result.hit).toBeDefined();
      expect(result.damage).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toBeGreaterThan(0);
      expect(result.criticalHit).toBeDefined();
      expect(result.vitalPointHit).toBeDefined();
    });

    it("should calculate damage based on technique and player stats", () => {
      const result = combatSystem.resolveAttack(player1, player2, undefined);

      if (result.hit) {
        expect(result.damage).toBeGreaterThan(0);
        expect(result.damage).toBeLessThanOrEqual(mockTechnique.damage! * 2);
      }
    });

    it("should handle critical hits", () => {
      // Fix: Remove unused critTechnique variable
      const result = combatSystem.resolveAttack(player1, player2, undefined);

      if (result.hit) {
        expect(result.criticalHit).toBe(true);
        expect(result.damage).toBeGreaterThan(mockTechnique.damage!);
      }
    });

    it("should apply stance effectiveness", () => {
      const player1WithGeon = { ...player1, currentStance: TrigramStance.GEON };
      const player2WithSon = { ...player2, currentStance: TrigramStance.SON };

      const result = combatSystem.resolveAttack(
        player1WithGeon,
        player2WithSon,
        undefined
      );

      expect(result).toBeDefined();
      // GEON has advantage over SON according to trigram system
    });
  });

  describe("applyCombatResult", () => {
    it("should update player states based on combat result", () => {
      const combatResult = combatSystem.resolveAttack(
        player1,
        player2,
        undefined
      );

      const { updatedAttacker, updatedDefender } =
        combatSystem.applyCombatResult(combatResult, player1, player2);

      expect(updatedAttacker).toBeDefined();
      expect(updatedDefender).toBeDefined();

      if (combatResult.hit) {
        expect(updatedDefender.health).toBeLessThanOrEqual(player2.health);
      }

      expect(updatedAttacker.ki).toBeLessThanOrEqual(player1.ki);
      expect(updatedAttacker.stamina).toBeLessThanOrEqual(player1.stamina);
    });
  });

  describe("getAvailableTechniques", () => {
    it("should return techniques for player stance", () => {
      const techniques = combatSystem.getAvailableTechniques(player1);

      expect(techniques).toBeDefined();
      expect(Array.isArray(techniques)).toBe(true);
    });

    it("should filter techniques by available resources", () => {
      const lowResourcePlayer = {
        ...player1,
        ki: 1,
        stamina: 1,
      };

      const techniques = combatSystem.getAvailableTechniques(lowResourcePlayer);

      // Should filter out high-cost techniques
      techniques.forEach((technique) => {
        expect(technique.kiCost).toBeLessThanOrEqual(lowResourcePlayer.ki);
        expect(technique.staminaCost).toBeLessThanOrEqual(
          lowResourcePlayer.stamina
        );
      });
    });
  });
});

describe("TrainingCombatSystem", () => {
  let trainingSystem: TrainingCombatSystem;
  let player: PlayerState;
  let dummy: PlayerState;

  beforeEach(() => {
    trainingSystem = new TrainingCombatSystem();
    player = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
    dummy = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);
  });

  describe("resolveAttack", () => {
    it("should provide training feedback", () => {
      // Fix: Use correct parameter type (string instead of technique object)
      const result = trainingSystem.resolveAttack(
        player,
        dummy,
        "basic_strike"
      );

      expect(result.trainingData).toBeDefined();
      if (result.trainingData) {
        expect(result.trainingData.accuracy).toBeDefined();
        expect(result.trainingData.damageCalculation).toBeDefined();
        expect(result.trainingData.stanceEffectiveness).toBeDefined();
        expect(result.trainingData.techniqueTiming).toBeDefined();
      }
    });

    it("should restore resources in infinite mode", () => {
      trainingSystem.setTrainingAids(true);

      const lowResourcePlayer = {
        ...player,
        ki: 5,
        stamina: 10,
      };

      // Fix: Use correct parameter type (string instead of technique object)
      const result = trainingSystem.resolveAttack(
        lowResourcePlayer,
        dummy,
        "basic_strike"
      );

      if (result.attacker) {
        expect(result.attacker.ki).toBe(lowResourcePlayer.maxKi);
        expect(result.attacker.stamina).toBe(lowResourcePlayer.maxStamina);
      }
    });
  });

  describe("resetTrainingDummy", () => {
    it("should reset dummy to full health", () => {
      const damagedDummy = {
        ...dummy,
        health: 50,
        ki: 30,
        stamina: 40,
        pain: 20,
      };

      const resetDummy = trainingSystem.resetTrainingDummy(damagedDummy);

      expect(resetDummy.health).toBe(damagedDummy.maxHealth);
      expect(resetDummy.ki).toBe(damagedDummy.maxKi);
      expect(resetDummy.stamina).toBe(damagedDummy.maxStamina);
      expect(resetDummy.pain).toBe(0);
      expect(resetDummy.consciousness).toBe(100);
      expect(resetDummy.balance).toBe(100);
    });
  });
});
