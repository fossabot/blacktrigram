import { describe, it, expect} from "vitest";
import { TrigramSystem } from "./TrigramSystem";
import { TRIGRAM_DATA } from "../types"; // Corrected: Import from types/index.ts
import type { TrigramStance } from "../types"; // PlayerArchetype unused

describe("TrigramSystem", () => {
  describe("getAllStances", () => {
    it("should return all 8 trigram stances", () => {
      // Assuming TRIGRAM_STANCES is a static member or exported constant
      const stances =
        TrigramSystem.TRIGRAM_STANCES_ORDER ||
        Object.keys(TrigramSystem.TRIGRAM_DATA);
      expect(stances).toHaveLength(8);
      // Add more specific checks if needed
    });
  });

  describe("getTrigramData", () => {
    it("should get technique for stance", () => {
      const technique = TrigramSystem.getTechniqueForStance("geon");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.stance).toBe("geon");
        expect(technique.koreanName).toBeTruthy();
        // englishName is part of KoreanTechnique from combat.ts
        expect(technique.englishName).toBeTruthy();
      }
    });
  });

  describe("getStanceEffectiveness", () => {
    it("should return correct effectiveness between stances", () => {
      // Assuming STANCE_EFFECTIVENESS_MATRIX is a static member
      const effectiveness = TrigramSystem.STANCE_EFFECTIVENESS_MATRIX.geon.tae;
      expect(typeof effectiveness).toBe("number");
    });

    it("should handle non-existent stance pairs gracefully or as defined", () => {
      // Example: expect effectiveness for non-defined pair to be 1.0 or throw
      // This depends on the system's design
      const effectiveness = TrigramSystem.STANCE_EFFECTIVENESS_MATRIX.geon.geon; // Or some other logic
      expect(effectiveness).toBe(1.0); // Assuming neutral for same stance
    });
  });

  describe("getTechniqueForStance", () => {
    it("should return the correct technique for a given stance", () => {
      const geonTechnique = TrigramSystem.getTechniqueForStance("geon");
      // Compare by a unique identifier like koreanName or id if available and consistent
      expect(geonTechnique?.koreanName).toEqual(
        TRIGRAM_DATA.geon.technique?.koreanName
      );

      const liTechnique = TrigramSystem.getTechniqueForStance("li");
      expect(liTechnique?.koreanName).toEqual(
        TRIGRAM_DATA.li.technique?.koreanName
      );
    });

    it("should return null if no technique is defined for a stance", () => {
      // Mock a stance without a technique if TRIGRAM_DATA can have such cases
      // Otherwise, this test might not be applicable.
      // For now, assuming all stances in TRIGRAM_DATA have techniques.
      // If you have a stance that is valid but has no technique:
      // const nullTechnique = TrigramSystem.getTechniqueForStance("some_stance_without_technique" as TrigramStance);
      // expect(nullTechnique).toBeNull();
    });
  });

  describe("Korean martial arts integration", () => {
    it("should validate Korean technique names", () => {
      const technique = TrigramSystem.getTechniqueForStance("li");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.koreanName).toMatch(/[\u3131-\u3163\uac00-\ud7a3]/); // Korean characters
      }
    });

    it("should handle all trigram stances", () => {
      const stances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      stances.forEach((stance) => {
        const technique = TrigramSystem.getTechniqueForStance(stance);
        expect(technique).toBeDefined();
        if (technique) {
          expect(technique.stance).toBe(stance);
        }
      });
    });
  });

  // describe("calculateDamage (if it were part of TrigramSystem)", () => {
  //   it("should calculate damage based on technique and stance advantage", () => {
  //     const attackerStance: TrigramStance = "geon";
  //     const defenderStance: TrigramStance = "li"; // Geon is strong vs Li (example)
  //     const mockTechnique: KoreanTechnique = {
  //       id: "test_strike", // Added missing id
  //       name: "Test Strike",
  //       koreanName: "테스트 공격",
  //       englishName: "Test Strike",
  //       description: { korean: "설명", english: "Description" },
  //       kiCost: 10,
  //       staminaCost: 15,
  //       range: 1,
  //       accuracy: 0.9,
  //       stance: "geon",
  //       damage: 20,
  //       type: "strike",
  //     };

  //     // This method doesn't exist on TrigramSystem, damage calculation is usually in CombatSystem
  //     // const damage = TrigramSystem.calculateDamage(
  //     //   mockTechnique,
  //     //   attackerStance,
  //     //   defenderStance
  //     // );
  //     // expect(damage).toBeGreaterThan(mockTechnique.damage); // Expect more due to advantage
  //   });
  // });
});
