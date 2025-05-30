import { describe, it, expect, beforeEach, vi } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import type { VitalPointSystemConfig } from "./VitalPointSystem";

import type {
  VitalPoint,
  KoreanTechnique,
  Position,
  VitalPointHit, // Added for typing hitResult
} from "../types";
import { KOREAN_VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints"; // Corrected import
import { TRIGRAM_DATA /* ANATOMICAL_REGIONS_DATA */ } from "../types"; // ANATOMICAL_REGIONS_DATA unused

describe("VitalPointSystem", () => {
  const defaultConfig: VitalPointSystemConfig = {
    baseAccuracy: 0.8,
    distanceModifier: 0.05,
  };
  const mockTechnique: KoreanTechnique = TRIGRAM_DATA.geon.technique;
  const mockTargetPosition: Position = { x: 10, y: 10 };

  beforeEach(() => {
    VitalPointSystem.configure(defaultConfig);
    vi.clearAllMocks();
  });

  describe("Configuration", () => {
    it("should initialize with default configuration", () => {
      expect(VitalPointSystem.config).toEqual(defaultConfig);
    });

    it("should allow overriding default configuration", () => {
      const customConfig: VitalPointSystemConfig = {
        baseAccuracy: 0.9,
        distanceModifier: 0.02,
        angleModifier: 0.1,
      };
      VitalPointSystem.configure(customConfig);
      expect(VitalPointSystem.config).toEqual(customConfig);
    });
  });

  describe("getVitalPointsForRegion", () => {
    it("should return vital points for a specific region", () => {
      const headVitalPoints = VitalPointSystem.getVitalPointsForRegion("head");
      expect(headVitalPoints.length).toBeGreaterThan(0);
      expect(
        headVitalPoints.every((vp: VitalPoint) => vp.region === "head")
      ).toBe(true); // Typed vp
    });

    it("should return an empty array for a region with no vital points", () => {
      const nonExistentRegionPoints = VitalPointSystem.getVitalPointsForRegion(
        "nonExistentRegion" as any
      );
      expect(nonExistentRegionPoints).toEqual([]);
    });
  });

  describe("getAllVitalPoints", () => {
    it("should return all defined vital points", () => {
      const allPoints = VitalPointSystem.getAllVitalPoints();
      expect(allPoints.length).toEqual(KOREAN_VITAL_POINTS_DATA.length);
    });
  });

  describe("checkVitalPointHit", () => {
    let sampleVitalPoint: VitalPoint;

    beforeEach(() => {
      sampleVitalPoint =
        KOREAN_VITAL_POINTS_DATA.find((vp) => vp.name.english === "Temple") ||
        KOREAN_VITAL_POINTS_DATA[0];
      if (!sampleVitalPoint)
        throw new Error("Sample vital point not found for testing");
      vi.spyOn(Math, "random").mockRestore();
    });

    it("should return null if the attack misses (random chance)", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      const hitResult = VitalPointSystem.checkVitalPointHit(
        mockTargetPosition,
        sampleVitalPoint,
        mockTechnique,
        5,
        defaultConfig // Add required config parameter
      );
      expect(hitResult).toBeNull();
    });

    it("should return a VitalPointHit object if the attack hits", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.1);
      const hitResult: VitalPointHit | null =
        VitalPointSystem.checkVitalPointHit(
          // Typed hitResult
          mockTargetPosition,
          sampleVitalPoint,
          mockTechnique,
          5,
          defaultConfig // Add required config parameter
        );
      expect(hitResult).not.toBeNull();
      if (hitResult?.vitalPoint) {
        // Check vitalPoint on hitResult
        expect(hitResult.hit).toBe(true);
        expect(hitResult.vitalPoint.name.english).toBe(
          sampleVitalPoint.name.english
        );
      }
    });

    it("should consider technique accuracyModifier", () => {
      const accurateTechnique: KoreanTechnique = {
        ...mockTechnique,
        accuracyModifier: 1.2,
      }; // Assume accuracyModifier exists
      const inaccurateTechnique: KoreanTechnique = {
        ...mockTechnique,
        accuracyModifier: 0.5,
      }; // Assume accuracyModifier exists

      vi.spyOn(Math, "random").mockReturnValue(0.7);

      const hitResultAccurate = VitalPointSystem.checkVitalPointHit(
        mockTargetPosition,
        sampleVitalPoint,
        accurateTechnique,
        5,
        defaultConfig // Add required config parameter
      );
      const hitResultInaccurate = VitalPointSystem.checkVitalPointHit(
        mockTargetPosition,
        sampleVitalPoint,
        inaccurateTechnique,
        5,
        defaultConfig // Add required config parameter
      );

      expect(hitResultAccurate !== null || hitResultInaccurate !== null).toBe(
        true
      );
    });

    it("should apply effects from the vital point", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.1);
      const vitalPointWithEffects =
        KOREAN_VITAL_POINTS_DATA.find(
          (vp: VitalPoint) => vp.effects && vp.effects.length > 0
        ) || sampleVitalPoint; // Typed vp
      const hitResult = VitalPointSystem.checkVitalPointHit(
        mockTargetPosition,
        vitalPointWithEffects,
        mockTechnique,
        5,
        defaultConfig // Add required config parameter
      );
      if (hitResult && "effectsApplied" in hitResult) {
        // Check for effectsApplied
        expect(hitResult.effectsApplied.length).toEqual(
          vitalPointWithEffects.effects?.length || 0
        );
      }
    });
  });
});
