import { describe, it, expect } from "vitest";
import { TECHNIQUES } from "./KoreanTechniques"; // Corrected import
import type {
  KoreanTechnique,
  TrigramStance, // Unused, but fine to keep for context
  DamageType,
} from "../../types";
import { CombatAttackType } from "@/types/effects";

const sampleTechniqueGeon: KoreanTechnique = {
  id: "geon_heavenly_thunder",
  name: "Geon Heavenly Thunder",
  koreanName: "천둥벽력",
  englishName: "Heavenly Thunder Strike",
  romanized: "Cheondung Byeokryeok",
  description: {
    korean: "하늘의 힘을 담은 강력한 일격.",
    english: "A powerful strike imbued with heavenly force.",
  },
  stance: "geon",
  type: "strike" as CombatAttackType,
  damageType: "blunt" as DamageType,
  damageRange: { min: 25, max: 35, type: "blunt" as DamageType },
  range: 1.5, // Added
  kiCost: 20,
  staminaCost: 15,
  accuracy: 0.85,
  executionTime: 500,
  recoveryTime: 700,
};

const sampleTechniqueTae: KoreanTechnique = {
  id: "tae_flowing_strikes",
  name: "Tae Flowing Strikes",
  koreanName: "유수연타",
  englishName: "Flowing Water Strikes",
  romanized: "Yusu Yeonta",
  description: {
    korean: "물처럼 부드럽고 연속적인 공격.",
    english: "Smooth and continuous attacks like flowing water.",
  },
  stance: "tae",
  type: "strike" as CombatAttackType,
  damageType: "blunt" as DamageType,
  damageRange: { min: 18, max: 28, type: "blunt" as DamageType },
  range: 1.2, // Added
  kiCost: 18,
  staminaCost: 12,
  accuracy: 0.9,
  executionTime: 400,
  recoveryTime: 600,
};

describe("KoreanTechniques", () => {
  it("should contain all 8 trigram techniques", () => {
    expect(Object.keys(TECHNIQUES).length).toBe(8);
  });

  it("should have valid properties for each technique", () => {
    Object.values(TECHNIQUES).forEach((t: KoreanTechnique) => {
      // Added type for t
      expect(t.id).toBeDefined();
      expect(t.name).toBeDefined();
      // ... other property checks
      expect(t.range).toBeGreaterThan(0);
      expect(t.damageRange).toBeDefined();
      expect(t.damageRange.min).toBeLessThanOrEqual(t.damageRange.max);
    });
  });

  it("TECHNIQUES should match sample structure for Geon", () => {
    const geonTechnique = TECHNIQUES["geon_heavenly_thunder"];
    expect(geonTechnique.id).toEqual(sampleTechniqueGeon.id);
    expect(geonTechnique.stance).toEqual("geon");
    expect(geonTechnique.type).toEqual("strike");
    expect(geonTechnique.damageType).toEqual("blunt");
    expect(geonTechnique.range).toBeGreaterThan(0);
  });

  it("TECHNIQUES should match sample structure for Tae", () => {
    const taeTechnique = TECHNIQUES["tae_flowing_strikes"];
    expect(taeTechnique.id).toEqual(sampleTechniqueTae.id);
    expect(taeTechnique.stance).toEqual("tae");
    expect(taeTechnique.range).toBeGreaterThan(0);
  });

  it("should not have techniques for non-existent stances", () => {
    const techniqueForInvalidStance = Object.values(TECHNIQUES).find(
      (t: KoreanTechnique) =>
        t.stance === ("non_existent_stance" as TrigramStance) // Cast for test
    );
    expect(techniqueForInvalidStance).toBeUndefined();
  });
});
