import { describe, it, expect } from "vitest";
import { KoreanTechniques } from "./KoreanTechniques";

describe("KoreanTechniques", () => {
  describe("getTechniqueForStance", () => {
    it("should return technique for valid stance", () => {
      const technique = KoreanTechniques.getTechniqueForStance("geon");

      expect(technique).toBeDefined();
      expect(technique.name).toBe("천둥벽력");
      expect(technique.damage).toBe(28);
      expect(technique.range).toBe(60);
      expect(technique.kiCost).toBe(15);
    });

    it("should return techniques for all valid stances", () => {
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
        expect(technique.name).toBeDefined();
        expect(typeof technique.name).toBe("string");
        expect(technique.damage).toBeGreaterThan(0);
        expect(technique.range).toBeGreaterThan(0);
        expect(technique.kiCost).toBeGreaterThan(0);
      });
    });
  });

  describe("getAllTechniques", () => {
    it("should return all eight techniques", () => {
      const allTechniques = KoreanTechniques.getAllTechniques();
      expect(Object.keys(allTechniques)).toHaveLength(8);
    });

    it("should include all required stances", () => {
      const allTechniques = KoreanTechniques.getAllTechniques();
      const expectedStances = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      expectedStances.forEach((stance) => {
        expect(
          allTechniques[stance as keyof typeof allTechniques]
        ).toBeDefined();
      });
    });
  });

  describe("getKoreanName", () => {
    it("should return Korean technique names", () => {
      const koreanName = KoreanTechniques.getKoreanName("geon");
      expect(koreanName).toBe("천둥벽력");
    });

    it("should return valid Korean names for all stances", () => {
      const expectedNames = {
        geon: "천둥벽력",
        tae: "유수연타",
        li: "화염지창",
        jin: "벽력일섬",
        son: "선풍연격",
        gam: "수류반격",
        gan: "반석방어",
        gon: "대지포옹",
      };

      Object.entries(expectedNames).forEach(([stance, expectedName]) => {
        const actualName = KoreanTechniques.getKoreanName(stance as any);
        expect(actualName).toBe(expectedName);
      });
    });
  });

  describe("Korean technique properties", () => {
    it("should have appropriate damage ranges for different technique types", () => {
      const geon = KoreanTechniques.getTechniqueForStance("geon");
      const gon = KoreanTechniques.getTechniqueForStance("gon");

      // Heaven (geon) should be powerful but balanced
      expect(geon.damage).toBeGreaterThanOrEqual(25);
      expect(geon.damage).toBeLessThanOrEqual(35);

      // Earth (gon) should be strong grappling
      expect(gon.damage).toBeGreaterThanOrEqual(25);
      expect(gon.damage).toBeLessThanOrEqual(35);
    });

    it("should have balanced ki costs", () => {
      const allTechniques = KoreanTechniques.getAllTechniques();

      Object.values(allTechniques).forEach((technique) => {
        expect(technique.kiCost).toBeGreaterThanOrEqual(10);
        expect(technique.kiCost).toBeLessThanOrEqual(25);
      });
    });
  });
});
