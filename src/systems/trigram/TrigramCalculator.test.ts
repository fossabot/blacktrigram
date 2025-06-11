import { describe, it, expect } from "vitest";
import {
  TrigramCalculator,
  STANCE_EFFECTIVENESS_MATRIX,
} from "./TrigramCalculator";
import { TrigramStance } from "../../types/enums";

describe("TrigramCalculator", () => {
  describe("calculateStanceEffectiveness", () => {
    it("should return effectiveness values from matrix", () => {
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.GON
      );

      expect(effectiveness).toBe(1.2); // GEON > GON according to matrix
    });

    it("should return 1.0 for neutral matchups", () => {
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.TAE
      );

      expect(effectiveness).toBe(1.0); // Default neutral
    });

    it("should handle all stance combinations", () => {
      const stances = Object.values(TrigramStance);

      stances.forEach((attacker) => {
        stances.forEach((defender) => {
          const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
            attacker,
            defender
          );

          expect(effectiveness).toBeGreaterThanOrEqual(0);
          expect(effectiveness).toBeLessThanOrEqual(2.0);
        });
      });
    });
  });

  describe("getCounterStance", () => {
    it("should return optimal counter stance", () => {
      const counterStance = TrigramCalculator.getCounterStance(
        TrigramStance.GON
      );

      expect(Object.values(TrigramStance)).toContain(counterStance);

      // Counter stance should have advantage
      const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
        counterStance,
        TrigramStance.GON
      );
      expect(effectiveness).toBeGreaterThanOrEqual(1.0);
    });

    it("should handle all stances", () => {
      Object.values(TrigramStance).forEach((stance) => {
        const counter = TrigramCalculator.getCounterStance(stance);
        expect(Object.values(TrigramStance)).toContain(counter);
      });
    });
  });

  describe("calculateTransitionDifficulty", () => {
    it("should return 0 for same stance", () => {
      const difficulty = TrigramCalculator.calculateTransitionDifficulty(
        TrigramStance.GEON,
        TrigramStance.GEON
      );

      expect(difficulty).toBe(0);
    });

    it("should return positive values for different stances", () => {
      const difficulty = TrigramCalculator.calculateTransitionDifficulty(
        TrigramStance.GEON,
        TrigramStance.TAE
      );

      expect(difficulty).toBeGreaterThan(0);
      expect(difficulty).toBeLessThanOrEqual(1.0);
    });

    it("should give easier transitions for adjacent stances", () => {
      const adjacentDifficulty =
        TrigramCalculator.calculateTransitionDifficulty(
          TrigramStance.GEON,
          TrigramStance.TAE
        );

      const distantDifficulty = TrigramCalculator.calculateTransitionDifficulty(
        TrigramStance.GEON,
        TrigramStance.GAM
      );

      expect(adjacentDifficulty).toBeLessThanOrEqual(distantDifficulty);
    });

    it("should handle all stance combinations", () => {
      const stances = Object.values(TrigramStance);

      stances.forEach((from) => {
        stances.forEach((to) => {
          const difficulty = TrigramCalculator.calculateTransitionDifficulty(
            from,
            to
          );
          expect(difficulty).toBeGreaterThanOrEqual(0);
          expect(difficulty).toBeLessThanOrEqual(1.0);
        });
      });
    });
  });

  describe("STANCE_EFFECTIVENESS_MATRIX", () => {
    it("should contain all stance relationships", () => {
      const stances = Object.values(TrigramStance);

      stances.forEach((stance) => {
        expect(STANCE_EFFECTIVENESS_MATRIX[stance]).toBeDefined();
      });
    });

    it("should have symmetric weakness/strength relationships", () => {
      // If A > B, then B should not have advantage over A
      Object.entries(STANCE_EFFECTIVENESS_MATRIX).forEach(
        ([attacker, defenders]) => {
          Object.entries(defenders).forEach(([defender, effectiveness]) => {
            if (effectiveness > 1.0) {
              const reverseEffectiveness =
                STANCE_EFFECTIVENESS_MATRIX[defender as TrigramStance]?.[
                  attacker as TrigramStance
                ];
              if (reverseEffectiveness) {
                expect(reverseEffectiveness).toBeLessThanOrEqual(1.0);
              }
            }
          });
        }
      );
    });

    it("should provide meaningful Korean martial arts combat balance", () => {
      // Test that the matrix represents realistic Korean martial arts principles

      // Heaven (건) should be strong against Earth (곤) - traditional opposition
      const heavenVsEarth = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.GON
      );
      expect(heavenVsEarth).toBeGreaterThan(1.0);

      // Fire (리) should be effective against certain stances
      const fireEffectiveness = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.LI,
        TrigramStance.SON
      );
      expect(fireEffectiveness).toBeGreaterThanOrEqual(1.0);

      // Water (감) should counter Fire (리) in traditional I Ching
      const waterVsFire = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GAM,
        TrigramStance.LI
      );
      expect(waterVsFire).toBeGreaterThanOrEqual(1.0);
    });
  });

  describe("Korean martial arts integration", () => {
    it("should reflect authentic trigram philosophy", () => {
      // Test that the calculator respects traditional Korean martial arts principles
      const stances = Object.values(TrigramStance);

      stances.forEach((stance) => {
        // Each stance should have at least one strong counter
        const hasStrongCounter = stances.some((counterStance) => {
          const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
            counterStance,
            stance
          );
          return effectiveness > 1.1;
        });

        expect(hasStrongCounter).toBe(true);
      });
    });

    it("should maintain game balance for all player archetypes", () => {
      // Ensure no stance is universally dominant
      const stances = Object.values(TrigramStance);

      stances.forEach((stance) => {
        let totalEffectiveness = 0;
        let advantageCount = 0;

        stances.forEach((targetStance) => {
          if (stance !== targetStance) {
            const effectiveness =
              TrigramCalculator.calculateStanceEffectiveness(
                stance,
                targetStance
              );
            totalEffectiveness += effectiveness;
            if (effectiveness > 1.0) advantageCount++;
          }
        });

        const averageEffectiveness = totalEffectiveness / (stances.length - 1);

        // No stance should have overwhelming advantage
        expect(averageEffectiveness).toBeLessThan(1.5);
        expect(advantageCount).toBeLessThan(stances.length);
      });
    });
  });
});
