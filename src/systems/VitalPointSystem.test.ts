import { describe, it, expect, beforeEach } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import { VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints";
import type { VitalPoint, KoreanTechnique } from "../types";

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
  damageType: "blunt",
  damageRange: { min: 10, max: 20, type: "blunt" },
  range: 1,
  kiCost: 5,
  staminaCost: 10,
  accuracy: 0.85,
  executionTime: 300,
  recoveryTime: 200,
  effects: [],
};

const MOCK_VITAL_POINT_HEAD: VitalPoint =
  VITAL_POINTS_DATA.find(
    (vp) => vp.category === "head" && vp.id === "head_philtrum_injoong"
  ) || VITAL_POINTS_DATA[0];

describe("VitalPointSystem", () => {
  let system: VitalPointSystem;

  beforeEach(() => {
    system = new VitalPointSystem(); // Remove parameter
  });

  describe("findVitalPoint", () => {
    it("should find a vital point by ID", () => {
      // Use findVitalPoint instead of getVitalPointById
      const vp = system.findVitalPoint(
        { x: 50, y: 20 },
        { width: 100, height: 200 },
        0.9
      );
      expect(vp).toBeDefined();
      if (vp) {
        expect(vp.id).toBe(MOCK_VITAL_POINT_HEAD.id);
      }
    });

    it("should return null for non-existent vital point", () => {
      const vp = system.findVitalPoint(
        { x: 200, y: 200 }, // Outside range
        { width: 100, height: 200 },
        0.9
      );
      expect(vp).toBeNull();
    });
  });

  describe("getVitalPointsByCategory", () => {
    it("should return vital points in a specific region", () => {
      const headPoints = system.getVitalPointsByCategory("head");
      expect(Array.isArray(headPoints)).toBe(true);
      expect(headPoints.length).toBeGreaterThan(0);
      headPoints.forEach((vp) => {
        expect(vp.category).toBe("head");
      });
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

  describe("processHit", () => {
    it("should process a hit and return detailed results", () => {
      const result = system.processHit(
        { x: 50, y: 20 },
        mockGeonTechnique,
        25,
        "musa"
      );
      expect(result).toBeDefined();
      expect(result.hit).toBe(true);
    });

    it("should handle miss scenarios", () => {
      const result = system.processHit(
        { x: 200, y: 200 }, // Far from any vital point
        mockGeonTechnique,
        25,
        "musa"
      );
      expect(result.hit).toBe(false);
    });
  });
});
