import { describe, it, expect } from "vitest";
import {
  KOREAN_TECHNIQUES,
  getTechniqueByStance,
  getTechniquesForStance,
  validateTechnique,
  calculateTechniqueDamage,
  getKoreanTechniqueName,
  getTechniqueEffectiveness,
} from "./KoreanTechniques";
import type { TrigramStance, KoreanTechnique } from "../../types/GameTypes";

describe("KoreanTechniques", () => {
  describe("KOREAN_TECHNIQUES data integrity", () => {
    it("should have exactly 8 techniques for the 8 trigram stances", () => {
      expect(Object.keys(KOREAN_TECHNIQUES)).toHaveLength(8);
    });

    it("should have valid Korean names for all techniques", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(technique.korean).toBeTruthy();
        expect(technique.korean).toMatch(/^[가-힣]+$/); // Only Korean characters
        expect(technique.korean.length).toBeGreaterThan(1);
      });
    });

    it("should have proper damage values for martial arts balance", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(technique.damage).toBeGreaterThan(0);
        expect(technique.damage).toBeLessThanOrEqual(50); // Max reasonable damage
      });
    });

    it("should have accuracy values between 0 and 1", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(technique.accuracy).toBeGreaterThan(0);
        expect(technique.accuracy).toBeLessThanOrEqual(1);
      });
    });

    it("should have valid status effects for each technique", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(Array.isArray(technique.effects)).toBe(true);
        expect(technique.effects.length).toBeGreaterThan(0);

        technique.effects.forEach((effect) => {
          expect(effect.type).toBeTruthy();
          expect(effect.duration).toBeGreaterThan(0);
          expect(effect.intensity).toBeGreaterThan(0);
          expect(effect.source).toBe("technique");

          // Verify effect types are valid StatusEffect types
          const validTypes = [
            "damage_boost",
            "vital_stunning",
            "vital_paralysis",
            "vital_pressure",
            "vital_weakness",
            "ki_boost",
            "stamina_drain",
            "defense_boost",
            "speed_boost",
          ];
          expect(validTypes).toContain(effect.type);
        });
      });
    });
  });

  describe("getTechniqueByStance", () => {
    it("should return correct technique for each stance", () => {
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
        const technique = getTechniqueByStance(stance);
        expect(technique).not.toBeNull();
        expect(technique?.stance).toBe(stance);
      });
    });

    it("should return thunder_strike for geon stance", () => {
      const technique = getTechniqueByStance("geon");
      expect(technique?.id).toBe("thunder_strike");
      expect(technique?.korean).toBe("천둥벽력");
      expect(technique?.english).toBe("Thunder Strike");
    });

    it("should return flame_spear for li stance", () => {
      const technique = getTechniqueByStance("li");
      expect(technique?.id).toBe("flame_spear");
      expect(technique?.korean).toBe("화염지창");
      expect(technique?.english).toBe("Flame Spear");
    });

    it("should handle invalid stance gracefully", () => {
      const technique = getTechniqueByStance("invalid" as TrigramStance);
      expect(technique).toBeNull();
    });
  });

  describe("getTechniquesForStance", () => {
    it("should return array of techniques for valid stance", () => {
      const techniques = getTechniquesForStance("geon");
      expect(Array.isArray(techniques)).toBe(true);
      expect(techniques.length).toBeGreaterThan(0);
      techniques.forEach((technique) => {
        expect(technique.stance).toBe("geon");
      });
    });

    it("should return empty array for invalid stance", () => {
      const techniques = getTechniquesForStance("invalid" as TrigramStance);
      expect(techniques).toEqual([]);
    });
  });

  describe("validateTechnique", () => {
    it("should validate all existing techniques as valid", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(validateTechnique(technique)).toBe(true);
      });
    });

    it("should reject technique with empty id", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        id: "",
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with negative damage", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        damage: -5,
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with accuracy greater than 1", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        accuracy: 1.5,
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with negative stamina cost", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        staminaCost: -10,
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with empty Korean name", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        korean: "",
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with empty English name", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        english: "",
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with zero range", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        range: 0,
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should reject technique with zero accuracy", () => {
      const invalidTechnique: KoreanTechnique = {
        ...KOREAN_TECHNIQUES.thunder_strike,
        accuracy: 0,
      };
      expect(validateTechnique(invalidTechnique)).toBe(false);
    });

    it("should validate technique with all required properties", () => {
      const validTechnique: KoreanTechnique = {
        id: "test_technique",
        korean: "테스트기법",
        english: "Test Technique",
        damage: 20,
        range: 50,
        accuracy: 0.8,
        speed: 1.0,
        staminaCost: 15,
        kiCost: 0,
        vitalPointMultiplier: 1.2,
        stance: "geon",
        description: "A test technique for validation",
        effects: [
          {
            type: "damage_boost",
            duration: 1000,
            intensity: 0.2,
            source: "technique",
          },
        ],
      };

      expect(validateTechnique(validTechnique)).toBe(true);
    });
  });

  describe("validation", () => {
    it("should reject techniques with missing required fields", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "test_technique",
          // Missing korean field - should fail
          english: "Invalid Technique",
          damage: 25,
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Invalid technique for testing",
          effects: [],
        } as KoreanTechnique);
      }).toThrow();
    });

    it("should reject techniques with invalid damage", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "invalid_damage",
          korean: "잘못된 기술",
          english: "Invalid Technique",
          damage: 150, // Too high
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Invalid damage technique",
          effects: [],
        });
      }).toThrow("Damage must be between 1 and 100");
    });

    it("should reject techniques with invalid accuracy", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "invalid_accuracy",
          korean: "잘못된 정확도",
          english: "Invalid Accuracy",
          damage: 25,
          range: 30,
          accuracy: 150, // Too high
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Invalid accuracy technique",
          effects: [],
        });
      }).toThrow("Accuracy must be between 1 and 100");
    });

    it("should reject techniques with invalid stamina cost", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "invalid_stamina",
          korean: "잘못된 체력",
          english: "Invalid Stamina",
          damage: 25,
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 150, // Too high
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Invalid stamina technique",
          effects: [],
        });
      }).toThrow("Stamina cost must be between 1 and 100");
    });

    it("should reject techniques without korean name", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "no_korean",
          korean: "", // Empty korean name
          english: "No Korean Name",
          damage: 25,
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Missing korean name",
          effects: [],
        });
      }).toThrow();
    });

    it("should reject techniques without english name", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "no_english",
          korean: "영어 없음",
          english: "", // Empty english name
          damage: 25,
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Missing english name",
          effects: [],
        });
      }).toThrow();
    });

    it("should reject techniques with invalid range", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "invalid_range",
          korean: "잘못된 범위",
          english: "Invalid Range",
          damage: 25,
          range: 200, // Too high
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Invalid range technique",
          effects: [],
        });
      }).toThrow("Range must be between 1 and 100");
    });

    it("should accept valid technique", () => {
      expect(() => {
        validateKoreanTechnique({
          id: "valid_technique",
          korean: "유효한 기술",
          english: "Valid Technique",
          damage: 25,
          range: 30,
          accuracy: 80,
          speed: 60,
          staminaCost: 15,
          kiCost: 10,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Valid technique for testing",
          effects: [],
        });
      }).not.toThrow();
    });
  });

  describe("technique calculations", () => {
    it("should calculate base damage correctly", () => {
      const technique = getTechniqueByStance("thunder_strike");
      if (!technique) {
        throw new Error("Technique not found");
      }

      const damage = calculateTechniqueDamage(technique);
      expect(damage).toBe(technique.damage);
    });

    it("should apply vital point multiplier", () => {
      const technique = getTechniqueByStance("thunder_strike");
      if (!technique) {
        throw new Error("Technique not found");
      }

      const damage = calculateTechniqueDamage(technique, true);
      expect(damage).toBe(technique.damage * technique.vitalPointMultiplier);
    });

    it("should apply distance modifier", () => {
      const technique = getTechniqueByStance("thunder_strike");
      if (!technique) {
        throw new Error("Technique not found");
      }

      const distance = 0.8;
      const damage = calculateTechniqueDamage(technique, false, distance);
      const expectedDamage = Math.round(technique.damage * distance);
      expect(damage).toBe(expectedDamage);
    });

    it("should handle minimum damage threshold", () => {
      const technique = getTechniqueByStance("thunder_strike");
      if (!technique) {
        throw new Error("Technique not found");
      }

      const damage = calculateTechniqueDamage(technique, false, 0.01);
      expect(damage).toBeGreaterThanOrEqual(1); // Minimum damage
    });
  });

  describe("getKoreanTechniqueName", () => {
    it("should return formatted Korean name with English", () => {
      const name = getKoreanTechniqueName("thunder_strike");
      expect(name).toBe("천둥벽력 (Thunder Strike)");
    });

    it("should return original ID for unknown techniques", () => {
      const name = getKoreanTechniqueName("unknown_technique");
      expect(name).toBe("unknown_technique");
    });
  });

  describe("getTechniqueEffectiveness", () => {
    it("should return effectiveness multiplier", () => {
      const technique = getTechniqueByStance("geon");
      expect(technique).not.toBeNull();
      if (technique) {
        const effectiveness = getTechniqueEffectiveness(technique, "gam");
        expect(typeof effectiveness).toBe("number");
        expect(effectiveness).toBeGreaterThan(0);
      }
    });

    it("should return 1.0 for neutral matchups", () => {
      const technique = getTechniqueByStance("geon");
      expect(technique).not.toBeNull();
      if (technique) {
        const effectiveness = getTechniqueEffectiveness(technique, "geon");
        expect(effectiveness).toBe(1.0);
      }
    });

    it("should have advantage/disadvantage relationships", () => {
      const technique = getTechniqueByStance("geon"); // Heaven stance
      expect(technique).not.toBeNull();
      if (technique) {
        // Should have advantage against son (wind)
        const advantageEffectiveness = getTechniqueEffectiveness(
          technique,
          "son"
        );
        expect(advantageEffectiveness).toBeGreaterThan(1.0);

        // Should have disadvantage against gam (water)
        const disadvantageEffectiveness = getTechniqueEffectiveness(
          technique,
          "gam"
        );
        expect(disadvantageEffectiveness).toBeLessThan(1.0);
      }
    });
  });

  describe("Korean martial arts authenticity", () => {
    it("should have culturally appropriate technique names", () => {
      const expectedTechniques = [
        "천둥벽력", // Thunder Strike
        "유수연타", // Flowing Combo
        "화염지창", // Flame Spear
        "벽력일섬", // Lightning Flash
        "선풍연격", // Whirlwind Strike
        "수류반격", // Water Counter
        "반석방어", // Mountain Defense
        "대지포옹", // Earth Grapple
      ];

      const actualKoreanNames = Object.values(KOREAN_TECHNIQUES).map(
        (t) => t.korean
      );

      expectedTechniques.forEach((name) => {
        expect(actualKoreanNames).toContain(name);
      });
    });

    it("should have balanced damage across trigram elements", () => {
      const damages = Object.values(KOREAN_TECHNIQUES).map((t) => t.damage);
      const minDamage = Math.min(...damages);
      const maxDamage = Math.max(...damages);

      // Damage should be reasonably balanced (max not more than 4x min)
      expect(maxDamage / minDamage).toBeLessThanOrEqual(4);
    });

    it("should have appropriate vital point multipliers", () => {
      Object.values(KOREAN_TECHNIQUES).forEach((technique) => {
        expect(technique.vitalPointMultiplier).toBeGreaterThan(0.5);
        expect(technique.vitalPointMultiplier).toBeLessThanOrEqual(2.0);
      });
    });

    it("should have unique technique IDs", () => {
      const techniqueIds = Object.values(KOREAN_TECHNIQUES).map((t) => t.id);
      const uniqueIds = new Set(techniqueIds);
      expect(uniqueIds.size).toBe(techniqueIds.length);
    });

    it("should have unique Korean names", () => {
      const koreanNames = Object.values(KOREAN_TECHNIQUES).map((t) => t.korean);
      const uniqueNames = new Set(koreanNames);
      expect(uniqueNames.size).toBe(koreanNames.length);
    });

    it("should map each stance to exactly one technique", () => {
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
      const usedStances = Object.values(KOREAN_TECHNIQUES).map((t) => t.stance);

      stances.forEach((stance) => {
        const techniqueCount = usedStances.filter((s) => s === stance).length;
        expect(techniqueCount).toBe(1); // Each stance should have exactly one technique
      });
    });

    it("should have consistent stance mappings", () => {
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
        const technique = getTechniqueByStance(stance);
        expect(technique).not.toBeNull();
        if (technique) {
          expect(technique.stance).toBe(stance);
        }
      });
    });

    it("should have valid effectiveness calculations for all combinations", () => {
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

      stances.forEach((attackerStance) => {
        const attackerTechnique = getTechniqueByStance(attackerStance);
        expect(attackerTechnique).not.toBeNull();

        if (attackerTechnique) {
          stances.forEach((defenderStance) => {
            const effectiveness = getTechniqueEffectiveness(
              attackerTechnique,
              defenderStance
            );
            expect(typeof effectiveness).toBe("number");
            expect(effectiveness).toBeGreaterThan(0);
            expect(effectiveness).toBeLessThanOrEqual(2.0); // Reasonable upper bound
          });
        }
      });
    });
  });

  describe("stance filtering", () => {
    it("should filter techniques by stance correctly", () => {
      const geonTechniques = getTechniquesByStance("geon");
      expect(geonTechniques.length).toBeGreaterThan(0);
      geonTechniques.forEach((technique) => {
        expect(technique.stance).toBe("geon");
      });
    });

    it("should filter trigram techniques correctly", () => {
      const liTechniques = getTechniquesByStance("li");
      expect(liTechniques.length).toBeGreaterThan(0);
      liTechniques.forEach((technique) => {
        expect(technique.stance).toBe("li");
      });
    });

    it("should filter water techniques correctly", () => {
      const gamTechniques = getTechniquesByStance("gam");
      expect(gamTechniques.length).toBeGreaterThan(0);
      gamTechniques.forEach((technique) => {
        expect(technique.stance).toBe("gam");
      });
    });

    it("should filter mountain techniques correctly", () => {
      const ganTechniques = getTechniquesByStance("gan");
      expect(ganTechniques.length).toBeGreaterThan(0);
      ganTechniques.forEach((technique) => {
        expect(technique.stance).toBe("gan");
      });
    });
  });
});
