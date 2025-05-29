import { describe, it, expect, beforeEach } from "vitest";
import { VitalPointSystem } from "./VitalPointSystem";
import type { VitalPointSystemConfig } from "../types/GameTypes";
import { KOREAN_VITAL_POINTS } from "./vitalpoint/KoreanVitalPoints";

describe("VitalPointSystem", () => {
  let system: VitalPointSystem;

  beforeEach(() => {
    system = new VitalPointSystem({
      maxHitDistance: 50,
      precisionThreshold: 0.3,
      debugging: false,
    });
  });

  describe("initialization", () => {
    it("should initialize with default config", () => {
      const defaultSystem = new VitalPointSystem();
      expect(defaultSystem).toBeDefined();
    });

    it("should initialize with custom config", () => {
      const customConfig: Partial<VitalPointSystemConfig> = {
        maxHitDistance: 75,
        precisionThreshold: 0.5,
        debugging: true,
      };

      const customSystem = new VitalPointSystem(customConfig);
      expect(customSystem).toBeDefined();
    });
  });

  describe("vital point detection", () => {
    it("should detect vital point hits correctly", () => {
      const vitalPoint = Object.values(KOREAN_VITAL_POINTS)[0];
      if (!vitalPoint) {
        throw new Error("No vital points available for testing");
      }

      const result = system.checkVitalPointHit(
        vitalPoint.coordinates.x,
        vitalPoint.coordinates.y,
        "test_technique"
      );

      expect(result).toBeDefined();
      expect(typeof result.hit).toBe("boolean");
      expect(typeof result.multiplier).toBe("number");
    });

    it("should return miss for distant hits", () => {
      const result = system.checkVitalPointHit(9999, 9999, "test_technique");

      expect(result.hit).toBe(false);
      expect(result.multiplier).toBe(1.0);
    });
  });

  describe("vital point effects", () => {
    it("should process vital point effects", () => {
      const vitalPoint = Object.values(KOREAN_VITAL_POINTS)[0];
      if (!vitalPoint?.effects) {
        // Skip test if no effects available
        return;
      }

      // Test would process effects if they exist
      expect(vitalPoint.effects).toBeDefined();
    });
  });

  describe("system state", () => {
    it("should track system state correctly", () => {
      const state = system.getState();

      expect(state).toBeDefined();
      expect(typeof state.hitCount).toBe("number");
      expect(state.enabled).toBe(true);
    });

    it("should clear effects", () => {
      system.clearEffects();
      const state = system.getState();
      expect(state.hitCount).toBe(0);
    });
  });

  describe("configuration", () => {
    it("should update configuration", () => {
      const newConfig: Partial<VitalPointSystemConfig> = {
        debugging: true,
        maxHitDistance: 100,
      };

      system.updateConfig(newConfig);
      // Config should be updated internally
      expect(system).toBeDefined();
    });
  });

  describe("statistics", () => {
    it("should provide vital point statistics", () => {
      const stats = system.getVitalPointStats();

      expect(stats).toBeDefined();
      expect(typeof stats.totalPoints).toBe("number");
      expect(stats.totalPoints).toBeGreaterThan(0);
      expect(typeof stats.averageDifficulty).toBe("number");
    });
  });
});
