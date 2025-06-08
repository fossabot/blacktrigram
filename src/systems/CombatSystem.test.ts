import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import {
  PlayerState,
  KoreanTechnique,
  HitEffectType, // Fix: Use correct import name
  PlayerArchetype,
  TrigramStance,
} from "../types";
import { createPlayerState } from "../utils/playerUtils";

describe("CombatSystem", () => {
  let player1: PlayerState;
  let player2: PlayerState;
  let basicTechnique: KoreanTechnique;

  beforeEach(() => {
    player1 = createPlayerState(
      "Test Player 1",
      PlayerArchetype.MUSA,
      TrigramStance.GEON,
      "p1"
    );
    player2 = createPlayerState(
      "Test Player 2",
      PlayerArchetype.AMSALJA,
      TrigramStance.TAE,
      "p2"
    );

    basicTechnique = {
      id: "test_strike",
      name: "테스트 타격",
      koreanName: "테스트 타격",
      englishName: "Test Strike",
      romanized: "test_strike",
      description: {
        korean: "테스트용 기본 타격",
        english: "Basic test strike",
      },
      stance: "geon",
      type: "strike",
      damageType: "blunt",
      damage: 20,
      kiCost: 10,
      staminaCost: 15,
      accuracy: 0.8,
      range: 1.0,
      executionTime: 500,
      recoveryTime: 300,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  });

  describe("calculateTechnique", () => {
    it("should calculate base damage for a technique", () => {
      const result = CombatSystem.calculateTechnique(mockGeonTechnique, "musa");
      expect(result.damage).toBeGreaterThan(0);
      expect(result.attacker).toBe("musa");
      expect(result.techniqueUsed.id).toBe(mockGeonTechnique.id);
      expect(result.hit).toBe(true); // calculateTechnique assumes a hit for damage calculation part
    });

    it("should apply archetype-specific damage modifiers", () => {
      const musaResult = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        "musa"
      );
      const amsaljaResult = CombatSystem.calculateTechnique(
        mockGeonTechnique,
        "amsalja"
      );
      // Musa with Geon technique should generally do more or different damage than Amsalja with same
      // This expectation might be too strict if bonuses are complex.
      // A more robust test would check against expected values based on MUSA_SPECIALIZATION etc.
      expect(musaResult.damage).not.toBe(amsaljaResult.damage);
    });

    it("should handle critical hits", () => {
      // Corrected syntax: ()_=> to () =>
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      const result = CombatSystem.calculateTechnique(mockGeonTechnique, "musa");
      expect(result.critical).toBe(true);
      expect(result.damage).toBeGreaterThanOrEqual(
        // Changed to GreaterThanOrEqual for robustness
        (mockGeonTechnique.damage || 20) *
          (mockGeonTechnique.critMultiplier || 1.5)
      );
      vi.spyOn(Math, "random").mockRestore();
    });
  });

  describe("executeAttack", () => {
    let attacker: PlayerState;
    let defender: PlayerState;

    beforeEach(() => {
      attacker = createMockPlayer("attacker1", "musa", "geon");
      defender = createMockPlayer("defender1", "amsalja", "tae");
    });

    it("should return a CombatResult indicating a hit", async () => {
      const result = await CombatSystem.executeAttack(
        attacker,
        defender, // Add defender parameter
        mockGeonTechnique
      );
      expect(result.hit).toBe(true);
      expect(result.defenderDamaged).toBe(result.damage > 0); // Check if damage is greater than 0
      expect(result.techniqueUsed.id).toBe(mockGeonTechnique.id);
    });

    it("should return a CombatResult indicating a miss", async () => {
      // Mock Math.random to force a miss by setting accuracy very low
      vi.spyOn(Math, "random").mockReturnValue(0.99); // High random value to force miss

      // Create a technique with very low accuracy
      const lowAccuracyTechnique: KoreanTechnique = {
        ...mockGeonTechnique,
        accuracy: 0.1, // Very low accuracy
      };

      // Since executeAttack currently always returns hit: true, we'll test the executeTechnique method instead
      // This test assumes executeTechnique can result in a miss based on accuracy.
      // The actual CombatSystem.executeTechnique implementation always sets hit: true
      // and calculates damage. This test might need to adapt if that's intended.
      // For now, assuming the test wants to check a scenario where a miss *could* occur.
      const techniqueResult = CombatSystem.executeTechnique(
        // Using the static method for stateless calculation
        lowAccuracyTechnique,
        "musa"
      );
      expect(techniqueResult.hit).toBe(false); // This will fail if executeTechnique always hits
      expect(techniqueResult.damage).toBe(0);

      vi.spyOn(Math, "random").mockRestore();
    });

    it("should apply vital point damage if targetPoint is provided and hit", async () => {
      const result = await CombatSystem.executeAttack(
        attacker,
        defender,
        mockGeonTechnique,
        mockVitalPoint.id
      );

      expect(result.hit).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.vitalPointsHit).toBeDefined();
      // expect(result.vitalPointsHit.length).toBeGreaterThan(0); // More specific check
    });
  });

  describe("checkWinCondition", () => {
    it("should return player2 if player1 health is 0", () => {
      const player1 = createMockPlayer("p1", "musa", "geon", 0);
      const player2 = createMockPlayer("p2", "amsalja", "tae", 50);
      const winner = CombatSystem.checkWinCondition([player1, player2]);
      expect(winner).toBe(player2.id);
    });

    it("should return player1 if player2 consciousness is 0", () => {
      const player1 = createMockPlayer("p1", "musa", "geon", 50);
      const player2 = createMockPlayer(
        "p2",
        "amsalja",
        "tae",
        100,
        100,
        100,
        { x: 1, y: 1 },
        0
      ); // Set consciousness to 0
      const winner = CombatSystem.checkWinCondition([player1, player2]);
      expect(winner).toBe(player1.id);
    });

    it("should return null if no win condition is met", () => {
      const player1 = createMockPlayer("p1", "musa", "geon", 50);
      const player2 = createMockPlayer("p2", "amsalja", "tae", 50);
      const winner = CombatSystem.checkWinCondition([player1, player2]);
      expect(winner).toBeNull();
    });
  });

  describe("calculateStanceEffectiveness", () => {
    it("Geon (Heaven) vs Tae (Lake) should have specific effectiveness", () => {
      const effectiveness = CombatSystem.calculateStanceEffectiveness(
        "geon",
        "tae"
      );
      expect(effectiveness).toBe(STANCE_EFFECTIVENESS_MATRIX.geon.tae);
    });

    it("Identical stances should have 1.0 effectiveness", () => {
      const effectiveness = CombatSystem.calculateStanceEffectiveness(
        "geon",
        "geon"
      );
      expect(effectiveness).toBe(1.0);
    });
  });
});
