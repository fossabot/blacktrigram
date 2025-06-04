import { describe, it, expect, beforeEach } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import { TRIGRAM_DATA, VITAL_POINTS_DATA } from "../types/constants";

const MOCK_VITAL_POINT_HEAD =
  VITAL_POINTS_DATA.find(
    (vp) => vp.category === "head" && vp.id === "head_philtrum_injoong"
  ) || VITAL_POINTS_DATA[0];

// Add the missing mock technique
const mockGeonTechnique = TRIGRAM_DATA.geon.technique;

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
    it("should return effects for a vital point hit", () => {
      // Fix: Use processHit method instead of non-existent getEffectsForVitalPoint
      const result = system.processHit(
        { x: 50, y: 20 },
        mockGeonTechnique,
        25,
        "musa"
      );
      expect(result.effects).toBeDefined();
      expect(Array.isArray(result.effects)).toBe(true);
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
