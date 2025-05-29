import { describe, it, expect } from "vitest";
import { KoreanTechniques } from "./KoreanTechniques";

describe("KoreanTechniques", () => {
  describe("trigram technique generation", () => {
    it("should generate technique for geon trigram", () => {
      const geonTechnique = KoreanTechniques.getTechniqueForStance("geon");

      expect(geonTechnique).toBeDefined();
      expect(geonTechnique.name).toBeDefined();
      expect(geonTechnique.damage).toBeGreaterThan(0);
    });

    it("should generate technique for li trigram", () => {
      const liTechnique = KoreanTechniques.getTechniqueForStance("li");

      expect(liTechnique).toBeDefined();
      expect(liTechnique.name).toBeDefined();
    });

    it("should generate technique for gam trigram", () => {
      const gamTechnique = KoreanTechniques.getTechniqueForStance("gam");

      expect(gamTechnique).toBeDefined();
      expect(gamTechnique.name).toBeDefined();
    });

    it("should generate technique for gan trigram", () => {
      const ganTechnique = KoreanTechniques.getTechniqueForStance("gan");

      expect(ganTechnique).toBeDefined();
      expect(ganTechnique.name).toBeDefined();
    });
  });

  describe("technique validation", () => {
    it("should validate all trigram stances", () => {
      const stances = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ] as const;

      stances.forEach((stance) => {
        const technique = KoreanTechniques.getTechniqueForStance(stance);
        expect(technique).toBeDefined();
        expect(technique.damage).toBeGreaterThan(0);
        expect(technique.range).toBeGreaterThan(0);
      });
    });

    it("should have unique techniques for each stance", () => {
      const stances = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ] as const;
      const techniques = stances.map((stance) =>
        KoreanTechniques.getTechniqueForStance(stance)
      );

      // Check that techniques have different properties
      for (let i = 0; i < techniques.length; i++) {
        for (let j = i + 1; j < techniques.length; j++) {
          expect(techniques[i].name).not.toBe(techniques[j].name);
        }
      }
    });

    it("should contain Korean characters in technique names", () => {
      const stances = ["geon", "tae", "li", "jin"] as const;

      stances.forEach((stance) => {
        const technique = KoreanTechniques.getTechniqueForStance(stance);
        expect(technique.name).toBeDefined();
        expect(technique.name.length).toBeGreaterThan(0);
        expect(technique.name).toMatch(/[\u3131-\u3163\uac00-\ud7a3]/);
      });
    });
  });
});
