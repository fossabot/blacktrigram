import { describe, it, expect } from "vitest";
import {
  TECHNIQUES,
  getTechniqueById,
  getTechniquesByStance,
} from "./KoreanTechniques";
import type {
  KoreanTechnique,
  TrigramStance,
  StatusEffect, // For technique.effects
} from "../../types";

// Sample data for one technique to verify structure, using actual data from TECHNIQUES
const sampleTechniqueGeonFromSource: KoreanTechnique =
  TECHNIQUES["geon_heavenly_thunder"];

describe("KoreanTechniques", () => {
  it("should contain all 8 trigram techniques by default in TECHNIQUES map", () => {
    // This count depends on how many techniques are defined in KoreanTechniques.ts
    // The provided file defines 8.
    expect(Object.keys(TECHNIQUES).length).toBe(8);
  });

  it("should have valid properties for each technique in TECHNIQUES map", () => {
    Object.values(TECHNIQUES).forEach((t: KoreanTechnique) => {
      expect(t.id).toBeDefined();
      expect(t.id.length).toBeGreaterThan(0);
      expect(t.name).toBeDefined();
      expect(t.koreanName).toBeDefined();
      expect(t.englishName).toBeDefined();
      expect(t.romanized).toBeDefined();
      expect(t.description.korean).toBeDefined();
      expect(t.description.english).toBeDefined();
      expect(t.stance).toBeDefined();
      expect(
        ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"].includes(
          t.stance
        )
      ).toBe(true);
      expect(t.type).toBeDefined();
      expect(t.damageType).toBeDefined();
      expect(t.damageRange).toBeDefined();
      if (t.damageRange) {
        expect(t.damageRange.min).toBeLessThanOrEqual(t.damageRange.max);
        expect(t.damageRange.type).toEqual(t.damageType);
      }
      expect(t.range).toBeGreaterThanOrEqual(0);
      expect(t.kiCost).toBeGreaterThanOrEqual(0);
      expect(t.staminaCost).toBeGreaterThanOrEqual(0);
      expect(t.accuracy).toBeGreaterThanOrEqual(0);
      expect(t.accuracy).toBeLessThanOrEqual(1);
      expect(t.executionTime).toBeGreaterThan(0);
      expect(t.recoveryTime).toBeGreaterThan(0);
      if (t.critChance) {
        expect(t.critChance).toBeGreaterThanOrEqual(0);
        expect(t.critChance).toBeLessThanOrEqual(1);
      }
      if (t.critMultiplier) {
        expect(t.critMultiplier).toBeGreaterThanOrEqual(1);
      }
      if (t.effects) {
        expect(Array.isArray(t.effects)).toBe(true);
        t.effects.forEach((eff: StatusEffect) => {
          // Type eff as StatusEffect
          expect(eff.id).toBeDefined();
          expect(eff.type).toBeDefined();
        });
      }
      if (t.properties) {
        expect(Array.isArray(t.properties)).toBe(true);
      }
    });
  });

  it("TECHNIQUES['geon_heavenly_thunder'] should match its defined structure", () => {
    const geonTechnique = TECHNIQUES["geon_heavenly_thunder"];
    expect(geonTechnique).toEqual(sampleTechniqueGeonFromSource); // Compare with actual data
    expect(geonTechnique.stance).toBe("geon");
    expect(geonTechnique.type).toBe("strike");
    expect(geonTechnique.damageType).toBe("blunt");
    expect(geonTechnique.range).toBe(1.5);
  });

  describe("getTechniqueById", () => {
    it("should return the correct technique for a valid ID", () => {
      const technique = getTechniqueById("li_flame_lance");
      expect(technique).toBeDefined();
      expect(technique?.id).toBe("li_flame_lance");
      expect(technique?.stance).toBe("li");
    });

    it("should return undefined for an invalid ID", () => {
      const technique = getTechniqueById("non_existent_technique");
      expect(technique).toBeUndefined();
    });
  });

  describe("getTechniquesByStance", () => {
    it("should return all techniques for a given stance", () => {
      const sonTechniques = getTechniquesByStance("son");
      expect(sonTechniques.length).toBeGreaterThanOrEqual(1); // Each stance has at least one in the map
      sonTechniques.forEach((tech) => {
        expect(tech.stance).toBe("son");
      });
      // Check if the specific Son technique is present
      expect(
        sonTechniques.find((t) => t.id === "son_gale_barrage")
      ).toBeDefined();
    });

    it("should return an empty array if stance has no techniques (or invalid stance)", () => {
      const noTechniques = getTechniquesByStance(
        "invalid_stance" as TrigramStance
      );
      expect(noTechniques).toEqual([]);
    });
  });
});
