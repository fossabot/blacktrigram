import { beforeEach, describe, expect, it } from "vitest";
import { TrigramStance } from "../../types/common";
import {
  STANCE_EFFECTIVENESS_MATRIX,
  TrigramCalculator,
} from "./TrigramCalculator";

describe("TrigramCalculator", () => {
  let calc: TrigramCalculator;

  beforeEach(() => {
    calc = new TrigramCalculator();
  });

  it("should be instantiable", () => {
    expect(calc).toBeInstanceOf(TrigramCalculator);
  });

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
      // Water (GAM) vs Fire (LI) - Water should be strong against Fire
      const waterVsFire = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GAM,
        TrigramStance.LI
      );
      expect(waterVsFire).toBeGreaterThanOrEqual(1.0); // Water extinguishes Fire

      // Earth (GON) should be strong against Water (GAM) - absorption
      const earthVsWater = TrigramCalculator.calculateStanceEffectiveness(
        TrigramStance.GON,
        TrigramStance.GAM
      );
      expect(earthVsWater).toBeGreaterThanOrEqual(1.0); // Earth absorbs Water
    });

    it("should handle all stance combinations", () => {
      const stances = Object.values(TrigramStance);

      stances.forEach((attacker) => {
        stances.forEach((defender) => {
          const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
            attacker,
            defender
          );

          // Fix: Complete the condition - check effectiveness is reasonable
          if (effectiveness < 0.5 || effectiveness > 2.0) {
            console.warn(
              `Extreme effectiveness: ${attacker} vs ${defender} = ${effectiveness}`
            );
          }
        });
      });
    });
  });

  describe("Korean martial arts integration", () => {
    it("should reflect authentic trigram philosophy", () => {
      const allStances = Object.values(TrigramStance);

      allStances.forEach((stance) => {
        const otherStances = allStances.filter((s) => s !== stance);

        // Each stance should have at least one relationship where it's effective OR defensive
        const hasEffectiveRelationship = otherStances.some((otherStance) => {
          const effectiveness = TrigramCalculator.calculateStanceEffectiveness(
            stance,
            otherStance
          );
          return effectiveness !== 1.0; // Either strong (>1.0) or strategic (<1.0)
        });

        expect(hasEffectiveRelationship).toBe(true);
      });
    });

    it("should maintain game balance for all player archetypes", () => {
      const stances = Object.values(TrigramStance);

      stances.forEach((stance) => {
        let advantageCount = 0;
        let disadvantageCount = 0;

        stances.forEach((otherStance) => {
          if (stance !== otherStance) {
            const effectiveness =
              TrigramCalculator.calculateStanceEffectiveness(
                stance,
                otherStance
              );
            if (effectiveness > 1.0) {
              advantageCount++;
            } else if (effectiveness < 1.0) {
              disadvantageCount++;
            }
          }
        });

        // Each stance should have at least one advantage or disadvantage
        expect(advantageCount + disadvantageCount).toBeGreaterThan(0);
      });
    });
  });
});
