import { describe, it, expect } from "vitest";
import { TrigramSystem } from "../TrigramSystem";
import type { KoreanTechnique } from "../../types";
import { TRIGRAM_DATA } from "../../types";

const mockTechnique: KoreanTechnique = {
  ...TRIGRAM_DATA.geon.technique, // Base on an existing technique
  name: "Test Technique",
  damage: 30, // Ensure damage is present
};

describe("TrigramSystem (formerly TrigramCalculator) Tests", () => {
  describe("calculateTransitionCost", () => {
    it("should calculate transition cost between different stances", () => {
      const cost = TrigramSystem.calculateTransitionCost("geon", "tae", 100);
      expect(typeof cost.kiCost).toBe("number");
      expect(typeof cost.staminaCost).toBe("number");
    });

    it("should calculate transition cost to self as zero", () => {
      const cost = TrigramSystem.calculateTransitionCost("geon", "geon", 100);
      expect(cost.kiCost).toBe(0);
      expect(cost.staminaCost).toBe(0);
    });
  });

  describe("calculateStanceAdvantage", () => {
    it("should return 1.0 for same stances", () => {
      expect(TrigramSystem.calculateStanceAdvantage("geon", "geon")).toBe(1.0);
    });
    it("should return correct advantage for different stances", () => {
      // Example from STANCE_EFFECTIVENESS_MATRIX
      expect(TrigramSystem.calculateStanceAdvantage("geon", "tae")).toBe(
        TrigramSystem.STANCE_EFFECTIVENESS_MATRIX.geon.tae
      );
    });
  });

  describe("calculateDamage (formerly calculateEffectiveDamage or calculateDamageMultiplier)", () => {
    it("should calculate damage with advantage", () => {
      const damage = TrigramSystem.calculateDamage(
        mockTechnique,
        50, // distance
        1.2 // stanceAdvantage
      );
      expect(damage).toBeGreaterThan(mockTechnique.damage * 0.5 * 1.2 * 0.9); // Example check
    });

    it("should calculate damage with neutral advantage", () => {
      const damage = TrigramSystem.calculateDamage(
        mockTechnique,
        50,
        1.0 // stanceAdvantage
      );
      expect(damage).toBeGreaterThan(mockTechnique.damage * 0.5 * 1.0 * 0.9);
    });

    it("should calculate damage with disadvantage", () => {
      const damage = TrigramSystem.calculateDamage(
        mockTechnique,
        50,
        0.8 // stanceAdvantage
      );
      expect(damage).toBeLessThan(mockTechnique.damage * 1.0 * 0.8 * 1.1);
    });
  });

  describe("calculateKiFlow", () => {
    it("should calculate Ki flow between stances", () => {
      const kiFlow = TrigramSystem.calculateKiFlow("geon", "tae", {
        baseRate: 10,
        playerLevelModifier: 1,
        stanceAffinity: 1,
      });
      expect(typeof kiFlow).toBe("number");
    });
  });

  // Tests for getKiRegenRate, getTechniqueForStance, getStanceData can be added here

  // Commenting out tests for methods that don't exist on TrigramSystem
  /*
  describe("calculateKiConsumption", () => {
    it("should calculate Ki consumption for a technique", () => {
      const kiConsumption = TrigramSystem.calculateKiConsumption( // This method doesn't exist
        mockTechnique,
        1.0
      );
      expect(kiConsumption).toBeGreaterThan(0);
    });
  });

  describe("calculateDamageReduction", () => {
    it("should calculate damage reduction based on defense and stance", () => {
      const reduction = TrigramSystem.calculateDamageReduction( // This method doesn't exist
        50,
        mockPlayerState.stance,
        10
      );
      expect(reduction).toBeGreaterThanOrEqual(0);
    });
  });
  */

  describe("findOptimalTransitionPath", () => {
    it("should find a path between stances", () => {
      const pathResult = TrigramSystem.findOptimalTransitionPath(
        "geon",
        "li",
        100
      );
      expect(pathResult.path.length).toBeGreaterThan(0);
      expect(pathResult.path[0]).toBe("geon");
      expect(pathResult.path[pathResult.path.length - 1]).toBe("li");
    });
  });

  // Tests for getStanceKoreanName, getEvasionModifier, calculateOptimalPath (if it's different from findOptimalTransitionPath)
  // would go here if those methods existed on TrigramSystem.
});
