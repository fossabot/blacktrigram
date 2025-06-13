import { describe, it, expect, beforeEach } from "vitest";
import { TrigramSystem } from "./TrigramSystem";
import { TrigramStance, PlayerArchetype } from "../types/enums";
import { createPlayerFromArchetype } from "../utils/playerUtils";
import type { PlayerState } from "../types";

describe("TrigramSystem", () => {
  let system: TrigramSystem;
  let mockPlayerState: PlayerState;

  beforeEach(() => {
    system = new TrigramSystem();
    mockPlayerState = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
  });

  describe("canTransitionTo", () => {
    it("should allow transition with sufficient resources", () => {
      const canTransition = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.TAE,
        mockPlayerState
      );
      expect(canTransition).toBe(true);
    });

    it("should prevent transition with insufficient resources", () => {
      const lowResourcePlayer: PlayerState = {
        ...mockPlayerState,
        ki: 1,
        stamina: 1,
      };

      const canTransition = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.GAM,
        lowResourcePlayer
      );
      expect(canTransition).toBe(false);
    });
  });

  describe("getTransitionCost", () => {
    it("should return zero cost for same stance", () => {
      const cost = system.getTransitionCost(
        TrigramStance.GEON,
        TrigramStance.GEON,
        mockPlayerState
      );

      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
      expect(cost.timeMilliseconds).toBe(0);
    });

    it("should return positive cost for different stances", () => {
      const cost = system.getTransitionCost(
        TrigramStance.GEON,
        TrigramStance.TAE,
        mockPlayerState
      );

      expect(cost.ki).toBeGreaterThan(0);
      expect(cost.stamina).toBeGreaterThan(0);
      expect(cost.timeMilliseconds).toBeGreaterThan(0);
    });
  });

  describe("calculateStanceEffectiveness", () => {
    it("should calculate effectiveness between stances", () => {
      const effectiveness = system.calculateStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.GON
      );

      expect(effectiveness).toBeGreaterThan(0);
      expect(effectiveness).toBeLessThanOrEqual(2);
    });
  });

  describe("getCurrentStanceData", () => {
    it("should return stance data", () => {
      const data = system.getCurrentStanceData(TrigramStance.GEON);
      expect(data).toBeDefined();
      expect(data?.id).toBe(TrigramStance.GEON);
    });
  });

  describe("recommendStance", () => {
    it("should recommend optimal stance", () => {
      const recommendedStance = system.recommendStance(mockPlayerState);
      expect(Object.values(TrigramStance)).toContain(recommendedStance);
    });
  });

  describe("validateTransition", () => {
    it("should validate valid transitions", () => {
      const result = system.validateTransition(
        TrigramStance.GEON,
        TrigramStance.TAE,
        mockPlayerState
      );
      expect(result.valid).toBe(true);
    });

    it("should invalidate insufficient resource transitions", () => {
      const lowResourcePlayer: PlayerState = {
        ...mockPlayerState,
        ki: 0,
        stamina: 0,
      };

      const result = system.validateTransition(
        TrigramStance.GEON,
        TrigramStance.GAM,
        lowResourcePlayer
      );
      expect(result.valid).toBe(false);
      expect(result.reason).toBeDefined();
    });
  });
});
