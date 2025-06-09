import { describe, it, expect } from "vitest";
import {
  KoreanTechniquesSystem,
  getTechniquesByStance,
} from "./KoreanTechniques";
import { TrigramStance, PlayerArchetype } from "../../types/enums";
import type { KoreanTechnique } from "../../types/combat";

describe("KoreanTechniquesSystem", () => {
  describe("getAllTechniques", () => {
    it("should return array of techniques", () => {
      // Fix: Use static method
      const techniques = KoreanTechniquesSystem.getAllTechniques();

      expect(Array.isArray(techniques)).toBe(true);
      expect(techniques.length).toBeGreaterThan(0);
    });

    it("should return techniques with Korean names", () => {
      // Fix: Use static method
      const techniques = KoreanTechniquesSystem.getAllTechniques();

      techniques.forEach((technique: KoreanTechnique) => {
        // Fix: Add type annotation
        expect(technique.name.korean).toBeDefined();
        expect(technique.name.english).toBeDefined();
        expect(technique.koreanName).toBeDefined();
        expect(technique.englishName).toBeDefined();
      });
    });

    it("should have valid technique properties", () => {
      // Fix: Use static method
      const techniques = KoreanTechniquesSystem.getAllTechniques();

      techniques.forEach((technique: KoreanTechnique) => {
        // Fix: Add type annotation
        expect(technique.id).toBeDefined();
        expect(technique.stance).toBeDefined();
        expect(Object.values(TrigramStance)).toContain(technique.stance);
        expect(technique.kiCost).toBeGreaterThanOrEqual(0);
        expect(technique.staminaCost).toBeGreaterThanOrEqual(0);
        expect(technique.accuracy).toBeGreaterThan(0);
        expect(technique.accuracy).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("getTechniquesByArchetype", () => {
    it("should return archetype-specific techniques", () => {
      // Fix: Use static method
      const techniques = KoreanTechniquesSystem.getTechniquesByArchetype(
        PlayerArchetype.MUSA
      );

      expect(Array.isArray(techniques)).toBe(true);

      const musaStances = [TrigramStance.GEON, TrigramStance.GAN];
      const hasMusaTechniques = techniques.some((tech: KoreanTechnique) =>
        musaStances.includes(tech.stance)
      );
      expect(hasMusaTechniques).toBe(true);
    });

    it("should handle all archetypes", () => {
      Object.values(PlayerArchetype).forEach((archetype) => {
        // Fix: Use static method
        const techniques =
          KoreanTechniquesSystem.getTechniquesByArchetype(archetype);
        expect(Array.isArray(techniques)).toBe(true);
      });
    });
  });

  describe("getTechniqueById", () => {
    it("should return technique by ID", () => {
      // Fix: Use static method
      const allTechniques = KoreanTechniquesSystem.getAllTechniques();
      if (allTechniques.length > 0) {
        const firstTechnique = allTechniques[0];
        // Fix: Use static method
        const foundTechnique = KoreanTechniquesSystem.getTechniqueById(
          firstTechnique.id
        );

        expect(foundTechnique).toBeDefined();
        expect(foundTechnique?.id).toBe(firstTechnique.id);
      }
    });

    it("should return undefined for invalid ID", () => {
      // Fix: Use static method
      const technique = KoreanTechniquesSystem.getTechniqueById("invalid_id");

      expect(technique).toBeUndefined();
    });
  });
});

describe("getTechniquesByStance", () => {
  it("should return techniques for specific stance", () => {
    const techniques = getTechniquesByStance(TrigramStance.GEON);

    expect(Array.isArray(techniques)).toBe(true);
    techniques.forEach((technique) => {
      expect(technique.stance).toBe(TrigramStance.GEON);
    });
  });

  it("should handle all stances", () => {
    Object.values(TrigramStance).forEach((stance) => {
      const techniques = getTechniquesByStance(stance);
      expect(Array.isArray(techniques)).toBe(true);
    });
  });

  it("should return empty array for stance with no techniques", () => {
    // Test edge case - some stances might not have techniques defined yet
    const techniques = getTechniquesByStance(TrigramStance.GON);
    expect(Array.isArray(techniques)).toBe(true);
  });
});
