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
  let player1: PlayerState;
  let player2: PlayerState;
  let mockTechnique: KoreanTechnique;

  beforeEach(() => {
    combatSystem = new CombatSystem();
    player1 = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
    player2 = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);

    // Fix: Ensure mockTechnique is properly defined in beforeEach
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
      // Fix: Use mockTechnique instead of undefined
      const result = combatSystem.resolveAttack(
        player1,
        player2,
        mockTechnique // Fix: Pass technique object
      );

      expect(result).toBeDefined();
      expect(result.hit).toBeDefined();
      expect(result.damage).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toBeGreaterThan(0);
      expect(result.criticalHit).toBeDefined();
      expect(result.vitalPointHit).toBeDefined();
    });

    it("should calculate damage based on technique and player stats", () => {
      // Fix: Use mockTechnique instead of undefined
      const result = combatSystem.resolveAttack(
        player1,
        player2,
        mockTechnique
      );

      if (result.hit) {
        expect(result.damage).toBeGreaterThan(0);
        expect(result.damage).toBeLessThanOrEqual(mockTechnique.damage! * 2);
      }
    });

    it("should handle critical hits", () => {
      // Fix: Use mockTechnique instead of undefined
      const result = combatSystem.resolveAttack(
        player1,
        player2,
        mockTechnique
      );

      if (result.hit) {
        expect(result.criticalHit).toBeDefined();
        expect(result.damage).toBeGreaterThanOrEqual(0);
      }
    });

    it("should apply stance effectiveness", () => {
      const player1WithGeon = { ...player1, currentStance: TrigramStance.GEON };
      const player2WithSon = { ...player2, currentStance: TrigramStance.SON };

      // Fix: Use mockTechnique instead of undefined
      const result = combatSystem.resolveAttack(
        player1WithGeon,
        player2WithSon,
        mockTechnique
      );

      expect(result).toBeDefined();
      // GEON has advantage over SON according to trigram system
    });
  });

  describe("applyCombatResult", () => {
    it("should update player states based on combat result", () => {
      // Fix: Use mockTechnique instead of undefined
      const combatResult = combatSystem.resolveAttack(
        player1,
        player2,
        mockTechnique // Fix: Pass proper technique object
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
  let mockTechnique: KoreanTechnique; // Fix: Add mockTechnique to this scope too

  beforeEach(() => {
    trainingSystem = new TrainingCombatSystem();
    player = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
    dummy = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);

    // Fix: Define mockTechnique in this scope as well
    mockTechnique = {
      id: "basic_strike",
      name: { korean: "기본 타격", english: "Basic Strike" },
      koreanName: "기본 타격",
      englishName: "Basic Strike",
      romanized: "gibon tagyeok",
      description: {
        korean: "기본적인 타격 기술",
        english: "Basic striking technique",
      },
      stance: TrigramStance.GEON,
      type: CombatAttackType.STRIKE,
      damageType: DamageType.BLUNT,
      damage: 12,
      range: 1.0,
      kiCost: 3,
      staminaCost: 5,
      accuracy: 0.9,
      executionTime: 250,
      recoveryTime: 400,
      critChance: 0.08,
      critMultiplier: 1.3,
      effects: [],
    };
  });

  describe("resolveAttack", () => {
    it("should provide training feedback", () => {
      // Fix: Use proper mockTechnique variable
      const result = trainingSystem.resolveAttack(
        player,
        dummy,
        mockTechnique // Fix: Use the defined mockTechnique
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

      // Fix: Use proper mockTechnique variable
      const result = trainingSystem.resolveAttack(
        lowResourcePlayer,
        dummy,
        mockTechnique // Fix: Use the defined mockTechnique
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
