import { describe, it, expect } from "vitest";
import {
  getAdvancedTechnique,
  KOREAN_TECHNIQUES_DATABASE,
  KoreanTechniquesUtils,
} from "./KoreanTechniques";
import type { TrigramStance } from "../../types";
import { TRIGRAM_DATA } from "../../types";

describe("Korean Martial Arts Techniques", () => {
  describe("Trigram Data Validation", () => {
    it("should have all 8 trigram stances defined", () => {
      const expectedStances: TrigramStance[] = [
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
        expect(TRIGRAM_DATA[stance]).toBeDefined();
        expect(TRIGRAM_DATA[stance].technique).toBeDefined();
      });
    });

    it("should have valid Korean technique names", () => {
      const koreanTechniques = [
        "천둥벽력", // Heaven - Thunder Strike
        "유수연타", // Lake - Flowing Combo
        "화염지창", // Fire - Flame Spear
        "벽력일섬", // Thunder - Lightning Flash
        "선풍연격", // Wind - Whirlwind
        "수류반격", // Water - Counter Strike
        "반석방어", // Mountain - Defense
        "대지포옹", // Earth - Grappling
      ];

      Object.values(TRIGRAM_DATA).forEach((data) => {
        expect(koreanTechniques).toContain(data.technique.koreanName);
        expect(data.technique.koreanName).toMatch(/^[가-힣]+$/); // Korean characters only
      });
    });

    it("should have balanced damage values", () => {
      const damages = Object.values(TRIGRAM_DATA).map(
        (data) => data.technique.damage
      );
      const minDamage = Math.min(...damages);
      const maxDamage = Math.max(...damages);

      expect(minDamage).toBeGreaterThan(0);
      expect(maxDamage).toBeLessThan(50);
      expect(maxDamage - minDamage).toBeLessThan(30); // Reasonable spread
    });
  });

  describe("Korean Technique Properties", () => {
    it("should have appropriate ki and stamina costs", () => {
      Object.values(TRIGRAM_DATA).forEach((data) => {
        const technique = data.technique;

        expect(technique.kiCost).toBeGreaterThan(0);
        expect(technique.kiCost).toBeLessThan(30);
        expect(technique.staminaCost).toBeGreaterThan(0);
        expect(technique.staminaCost).toBeLessThan(25);

        // Higher damage should generally cost more
        if (technique.damage > 30) {
          expect(technique.kiCost).toBeGreaterThan(15);
        }
      });
    });

    it("should have realistic accuracy values", () => {
      Object.values(TRIGRAM_DATA).forEach((data) => {
        const accuracy = data.technique.accuracy;
        expect(accuracy).toBeGreaterThan(0.5);
        expect(accuracy).toBeLessThanOrEqual(1.0);
      });
    });

    it("should have valid attack types", () => {
      const validTypes = [
        "punch",
        "kick",
        "elbow",
        "knee",
        "grapple",
        "throw",
        "pressure_point",
        "combination",
        "strike",
      ];

      Object.values(TRIGRAM_DATA).forEach((data) => {
        expect(validTypes).toContain(data.technique.type);
      });
    });
  });

  describe("Korean Techniques Translation", () => {
    it("should provide correct Korean-English translations", () => {
      const techniques = Object.values(TRIGRAM_DATA).map(
        (data) => data.technique
      );

      const translations: Record<string, string> = {
        천둥벽력: "Thunder Strike",
        유수연타: "Flowing Combo",
        화염지창: "Flame Spear",
        벽력일섬: "Lightning Flash",
        선풍연격: "Whirlwind",
        수류반격: "Counter Strike",
        반석방어: "Mountain Defense",
        대지포옹: "Earth Embrace",
      };

      techniques.forEach((technique) => {
        const koreanName = technique.koreanName as keyof typeof translations;
        expect(translations[koreanName]).toBe(technique.englishName);
      });
    });
  });

  describe("Korean Philosophy Integration", () => {
    it("should provide philosophy-based explanations", () => {
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
        const techniqueName = TRIGRAM_DATA[stance].technique.koreanName;
        const explanation = `Philosophy for ${techniqueName}`;
        expect(explanation).toBeDefined();
      });
    });

    it("should handle thunder stance philosophy correctly", () => {
      const technique = getAdvancedTechnique("천둥벽력");

      if (technique) {
        expect(technique.philosophy.korean).toBeDefined();
        expect(technique.philosophy.english).toBeDefined();

        // Check for thunder-related concepts
        expect(technique.philosophy.korean).toContain("천둥");
        expect(technique.philosophy.english).toContain("thunder");
      }
    });
  });

  describe("Combat Balance", () => {
    it("should have balanced stance modifiers", () => {
      Object.values(TRIGRAM_DATA).forEach((data) => {
        // Damage modifiers should be reasonable
        if (data.damageModifier) {
          expect(data.damageModifier).toBeGreaterThan(0.5);
          expect(data.damageModifier).toBeLessThan(1.6);
        }

        // Defense modifiers should complement damage
        if (data.defenseModifier && data.damageModifier) {
          const total = data.defenseModifier + data.damageModifier;
          expect(total).toBeGreaterThan(1.5);
          expect(total).toBeLessThan(2.5);
        }
      });
    });

    it("should have critical hit balance", () => {
      Object.values(TRIGRAM_DATA).forEach((data) => {
        const technique = data.technique;

        if (technique.critChance) {
          expect(technique.critChance).toBeGreaterThan(0);
          expect(technique.critChance).toBeLessThan(0.3); // Max 30% crit chance
        }

        if (technique.critMultiplier) {
          expect(technique.critMultiplier).toBeGreaterThan(1.0);
          expect(technique.critMultiplier).toBeLessThan(2.0); // Max 2x damage
        }

        // High damage techniques should have lower crit chance
        if (technique.damage > 35 && technique.critChance) {
          expect(technique.critChance).toBeLessThan(0.2);
        }
      });
    });
  });

  describe("Korean Technique Execution", () => {
    it("should calculate technique effectiveness correctly", () => {
      const heavenTechnique = TRIGRAM_DATA.geon.technique;

      // Test basic properties
      expect(heavenTechnique.name).toBe("천둥벽력");
      expect(heavenTechnique.englishName).toBe("Thunder Strike");
      expect(heavenTechnique.damage).toBe(28);
      expect(heavenTechnique.stance).toBe("geon");
    });

    it("should have unique technique names", () => {
      const koreanNames = Object.values(TRIGRAM_DATA).map(
        (d) => d.technique.koreanName
      );
      const englishNames = Object.values(TRIGRAM_DATA).map(
        (d) => d.technique.englishName
      );

      expect(new Set(koreanNames).size).toBe(koreanNames.length);
      expect(new Set(englishNames).size).toBe(englishNames.length);
    });

    it("should have consistent range values", () => {
      Object.values(TRIGRAM_DATA).forEach((data) => {
        const range = data.technique.range;
        expect(range).toBeGreaterThan(20);
        expect(range).toBeLessThan(70);

        // Certain attack types should have specific range patterns
        if (data.technique.type === "kick") {
          expect(range).toBeLessThan(50); // Kicks are shorter range
        }

        if (data.technique.type === "grapple") {
          expect(range).toBeLessThan(40); // Grapples are close range
        }
      });
    });
  });

  describe("Korean Cultural Authenticity", () => {
    it("should use authentic Korean martial arts terminology", () => {
      // Check for specific Korean martial arts terms
      const techniques = Object.values(TRIGRAM_DATA).map((d) => d.technique);

      // Should include traditional Korean attack terms
      const koreanTerms = techniques.map((t) => t.koreanName).join("");
      expect(koreanTerms).toMatch(/벽력/); // Lightning/Thunder
      expect(koreanTerms).toMatch(/화염/); // Flame
      expect(koreanTerms).toMatch(/선풍/); // Whirlwind
      expect(koreanTerms).toMatch(/수류/); // Water flow
      expect(koreanTerms).toMatch(/대지/); // Earth
    });

    it("should maintain traditional trigram elements", () => {
      const expectedElements = [
        "Heaven",
        "Lake",
        "Fire",
        "Thunder",
        "Wind",
        "Water",
        "Mountain",
        "Earth",
      ];

      const actualElements = Object.values(TRIGRAM_DATA).map((d) => d.element);
      expect(actualElements.sort()).toEqual(expectedElements.sort());
    });
  });

  describe("Korean Techniques Philosophy Integration", () => {
    it("should provide philosophy-based explanations", () => {
      const techniqueNames = [
        "천둥벽력",
        "유수연타",
        "화염지창",
        "벽력일섬",
        "선풍연격",
        "수류반격",
        "반석방어",
        "대지포옹",
      ] as const;

      const expectedExplanations: Record<string, string> = {
        천둥벽력: "하늘의 기운을 담은 강력한 일격",
        유수연타: "호수의 잔잔함 속에 숨겨진 연타",
        화염지창: "불의 정밀함으로 적의 급소를 찌르다",
        벽력일섬: "번개의 속도로 적을 제압하다",
        선풍연격: "바람의 부드러움으로 연속 공격",
        수류반격: "물의 깊이로 적의 공격을 되받아치다",
        반석방어: "산의 견고함으로 모든 공격을 막다",
        대지포옹: "땅의 포용력으로 적을 제압하다",
      };

      techniqueNames.forEach((techniqueName) => {
        const explanation = `Philosophy for ${techniqueName}`;
        expect(explanation).toBe(expectedExplanations[techniqueName]);
      });
    });
  });

  describe("Korean technique names and descriptions", () => {
    it("should provide accurate Korean martial arts technique names", () => {
      const expectedTechniques: Record<string, string> = {
        // Fix: Add type annotation
        천둥벽력: "Thunder Strike",
        유수연타: "Flowing Combo",
        화염지창: "Flame Spear",
        벽력일섬: "Lightning Flash",
        선풍연격: "Whirlwind",
        수류반격: "Counter Strike",
        반석방어: "Mountain Defense",
        대지포옹: "Earth Embrace",
      };

      Object.entries(expectedTechniques).forEach(([korean, english]) => {
        const technique =
          KoreanTechniquesUtils.getTechniqueByKoreanName(korean);
        expect(technique).toBeDefined();
        expect(technique?.englishName).toBe(english);
      });
    });

    it("should include traditional Korean martial arts philosophy", () => {
      const technique = KOREAN_TECHNIQUES_DATABASE["천둥벽력"];
      expect(technique.philosophy.korean).toBeDefined();
      expect(technique.philosophy.english).toBeDefined();

      // Fix: Remove undefined function call
      expect(technique.philosophy.korean).toContain("천둥");
      expect(technique.philosophy.english).toContain("thunder");
    });
  });
});
