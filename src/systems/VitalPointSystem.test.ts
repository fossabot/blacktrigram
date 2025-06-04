import { describe, it, expect, beforeEach, vi } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import type {
  VitalPoint,
  PlayerArchetype,
  KoreanTechnique,
  VitalPointSystemConfig,
  DamageType,
  DamageRange,
} from "../types";
import { VITAL_POINTS_DATA as AllVitalPoints } from "./vitalpoint/KoreanVitalPoints"; // Assuming this is the source

const MOCK_TECHNIQUE_STRIKE: KoreanTechnique = {
  id: "basic_strike",
  name: "Basic Strike",
  koreanName: "기본 치기",
  englishName: "Basic Strike",
  romanized: "Gibon Chigi",
  description: {
    korean: "기본적인 타격 기술",
    english: "A basic striking technique",
  },
  stance: "geon",
  type: "strike",
  damageType: "blunt" as DamageType,
  damageRange: { min: 10, max: 20, type: "blunt" as DamageType } as DamageRange,
  range: 1,
  kiCost: 5,
  staminaCost: 10,
  accuracy: 0.85,
  executionTime: 300,
  recoveryTime: 200,
  effects: [],
};

const MOCK_VITAL_POINT_HEAD: VitalPoint =
  AllVitalPoints.find(
    (vp) => vp.category === "head" && vp.id === "head_philtrum_injoong"
  ) || AllVitalPoints[0];

describe("VitalPointSystem", () => {
  let system: VitalPointSystem;
  const MOCK_PLAYER_ARCHETYPE: PlayerArchetype = "musa";
  const MOCK_DEFENDER_POSITION = { x: 50, y: 50 };
  const MOCK_TARGET_DIMENSIONS = { width: 100, height: 100 };

  beforeEach(() => {
    const mockConfig: VitalPointSystemConfig = {
      baseDamageMultiplier: 1.0,
      archetypeModifiers: {
        musa: { damageBonus: 0.1, precisionBonus: 0.05 },
        amsalja: { damageBonus: 0.15, precisionBonus: 0.1 }, // Added
        hacker: { damageBonus: 0.05, precisionBonus: 0.15 }, // Added
        jeongbo: { damageBonus: 0.08, precisionBonus: 0.08 }, // Added
        jojik: { damageBonus: 0.2, precisionBonus: 0.02 }, // Added
      },
      vitalPointSeverityMultiplier: {
        minor: 1.0,
        moderate: 1.2,
        severe: 1.5,
        critical: 2.0,
        lethal: 2.5,
      },
      criticalHitMultiplier: 1.5, // Added
    };
    system = new VitalPointSystem(mockConfig);
  });

  describe("getVitalPointById", () => {
    it("should return a vital point if ID exists", () => {
      const vp = system.getVitalPointById(MOCK_VITAL_POINT_HEAD.id);
      expect(vp).toBeDefined();
      expect(vp?.id).toBe(MOCK_VITAL_POINT_HEAD.id);
    });

    it("should return undefined if ID does not exist", () => {
      const vp = system.getVitalPointById("non_existent_vp");
      expect(vp).toBeUndefined();
    });
  });

  describe("getVitalPointsInRegion", () => {
    it("should return vital points for a valid region", () => {
      const headPoints = system.getVitalPointsInRegion("head"); // Assuming 'head' is a valid BodyRegion key
      expect(headPoints.length).toBeGreaterThan(0);
      headPoints.forEach((vp) => {
        expect(
          vp.location.region === "head" ||
            AllVitalPoints.find((avp) => avp.id === vp.id)?.location.region ===
              "head"
        ).toBe(true);
      });
    });
  });

  describe("calculateDamageOnVitalPoint", () => {
    it("should calculate increased damage for a vital point hit", () => {
      const baseDamage = 10;
      const damage = system.calculateDamageOnVitalPoint(
        MOCK_VITAL_POINT_HEAD,
        baseDamage,
        MOCK_PLAYER_ARCHETYPE,
        false,
        "blunt" as DamageType
      );
      // Expect damage to be > baseDamage due to multipliers and VP base damage
      expect(damage).toBeGreaterThan(baseDamage);
    });

    it("should apply critical hit multiplier", () => {
      const baseDamage = 10;
      const nonCritDamage = system.calculateDamageOnVitalPoint(
        MOCK_VITAL_POINT_HEAD,
        baseDamage,
        MOCK_PLAYER_ARCHETYPE,
        false,
        "blunt" as DamageType
      );
      const critDamage = system.calculateDamageOnVitalPoint(
        MOCK_VITAL_POINT_HEAD,
        baseDamage,
        MOCK_PLAYER_ARCHETYPE,
        true,
        "blunt" as DamageType
      );
      expect(critDamage).toBeGreaterThan(nonCritDamage);
    });
  });

  describe("getEffectsForVitalPoint", () => {
    it("should return effects defined for the vital point and technique", () => {
      const effects = system.getEffectsForVitalPoint(
        MOCK_VITAL_POINT_HEAD,
        MOCK_TECHNIQUE_STRIKE,
        false
      );
      expect(effects.length).toBeGreaterThanOrEqual(
        MOCK_VITAL_POINT_HEAD.effects.length
      );
    });
  });

  describe("calculateHit", () => {
    it("should return a hit result targeting a specific vital point", () => {
      // Mock random to ensure hit
      vi.spyOn(Math, "random").mockReturnValue(0.1); // For critical hit chance if applicable in calc
      const accuracyRoll = 0.5; // Assume this roll is good enough based on technique accuracy

      const result = system.calculateHit(
        MOCK_TECHNIQUE_STRIKE,
        MOCK_VITAL_POINT_HEAD.id,
        accuracyRoll,
        MOCK_DEFENDER_POSITION,
        "tae" // Use string literal instead of unused variable
      );

      expect(result.hit).toBe(true);
      expect(result.vitalPoint?.id).toBe(MOCK_VITAL_POINT_HEAD.id);
      expect(result.damage).toBeGreaterThan(0);
      vi.spyOn(Math, "random").mockRestore();
    });

    it("should return a non-vital hit if no specific VP targeted and accuracy roll doesn't land on one by chance", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.1); // For critical hit chance
      const accuracyRoll = 0.7; // Good accuracy roll

      const result = system.calculateHit(
        MOCK_TECHNIQUE_STRIKE,
        null, // No specific VP target
        accuracyRoll,
        MOCK_DEFENDER_POSITION,
        "tae" // Use string literal instead of unused variable
      );

      expect(result.hit).toBe(true);
      expect(result.vitalPoint).toBeNull();
      expect(result.damage).toBeGreaterThan(0);
      vi.spyOn(Math, "random").mockRestore();
    });

    it("should return a miss if accuracy roll is too low", () => {
      const accuracyRoll = 0.95; // Bad roll if technique accuracy is 0.85
      const result = system.calculateHit(
        MOCK_TECHNIQUE_STRIKE, // Accuracy 0.85
        null,
        accuracyRoll,
        MOCK_DEFENDER_POSITION,
        "tae" // Use string literal instead of unused variable
      );
      expect(result.hit).toBe(false);
      expect(result.damage).toBe(0);
    });
  });

  describe("calculateVitalPointHitEffects", () => {
    it("should return damage and effects for a vital point hit", () => {
      const baseDamage = MOCK_TECHNIQUE_STRIKE.damageRange!.min;
      const hitEffects = system.calculateVitalPointHitEffects(
        MOCK_VITAL_POINT_HEAD,
        baseDamage,
        MOCK_PLAYER_ARCHETYPE,
        MOCK_TECHNIQUE_STRIKE,
        false
      );
      expect(hitEffects.damage).toBeGreaterThan(0);
      expect(hitEffects.effects.length).toBeGreaterThanOrEqual(
        MOCK_VITAL_POINT_HEAD.effects.length
      );
    });
  });
});
