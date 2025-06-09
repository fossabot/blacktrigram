import { describe, it, expect } from "vitest";
import { TrigramCalculator } from "./TrigramCalculator";
import { TrigramStance } from "../../types/enums";

describe("TrigramCalculator", () => {
  describe("calculateTransitionCost", () => {
    it("should return zero cost for same stance", () => {
      const cost = TrigramCalculator.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.GEON
      );

      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
      expect(cost.time).toBe(0);
    });

    it("should calculate cost for different stances", () => {
      const cost = TrigramCalculator.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.TAE
      );

      expect(cost.ki).toBeGreaterThan(0);
      expect(cost.stamina).toBeGreaterThan(0);
      expect(cost.time).toBeGreaterThan(0);
    });

    it("should apply adjacency modifier", () => {
      const adjacentCost = TrigramCalculator.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.TAE
      );

      const nonAdjacentCost = TrigramCalculator.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.GAM
      );

      expect(adjacentCost.ki).toBeLessThan(nonAdjacentCost.ki);
    });
  });

  describe("calculateStanceEffectiveness", () => {
    it("should return neutral effectiveness for same stance", () => {
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.GEON
      );

      expect(effectiveness).toBe(1.0);
    });

    it("should return advantage for effective matchups", () => {
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.GON
      );

      expect(effectiveness).toBeGreaterThan(1.0);
    });

    it("should return disadvantage for poor matchups", () => {
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.SON
      );

      expect(effectiveness).toBeLessThan(1.0);
    });
  });
});
