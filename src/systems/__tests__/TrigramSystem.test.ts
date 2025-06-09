import { describe, it, expect, beforeEach } from "vitest";
import { TrigramSystem } from "../TrigramSystem";
import { TrigramStance, PlayerArchetype } from "../../types/enums";
import type { PlayerState } from "../../types";

// Fix: Use proper enum values
const mockPlayerState: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA, // Fix: Use enum value
  currentStance: TrigramStance.GEON, // Fix: Use enum value
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  consciousness: 100,
  balance: 100,
  pain: 0,
  position: { x: 0, y: 0 },
  statusEffects: [],
  vitalPoints: [],
  isBlocking: false,
  activeEffects: [],
  combatModifiers: {},
  momentum: { x: 0, y: 0 },
  lastStanceChangeTime: Date.now(),
  actionCooldowns: {},
  technique: null,
  combatState: "idle", // Fix: Use valid combat state
  orientation: "right",
};

describe("TrigramSystem", () => {
  let system: TrigramSystem;

  beforeEach(() => {
    system = new TrigramSystem();
  });

  describe("canTransitionTo", () => {
    it("should allow transition with sufficient resources", () => {
      const result = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.LI,
        mockPlayerState
      );
      expect(result).toBe(true); // Fix: Expect boolean value
    });

    it("should allow same stance transition", () => {
      const result = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.GEON,
        mockPlayerState
      );
      expect(result).toBe(true);
    });

    it("should reject transition with insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerState, ki: 5 };
      const result = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.LI,
        lowKiPlayer
      );
      expect(result).toBe(false);
    });

    it("should reject transition with insufficient stamina", () => {
      const lowStaminaPlayer = { ...mockPlayerState, stamina: 5 };
      const result = system.canTransitionTo(
        TrigramStance.GEON,
        TrigramStance.LI,
        lowStaminaPlayer
      );
      expect(result).toBe(false);
    });
  });

  describe("calculateTransitionCost", () => {
    it("should return zero cost for same stance", () => {
      const cost = system.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.GEON
      );
      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
      expect(cost.time).toBe(0); // Fix: Use time instead of timeMilliseconds
    });

    it("should calculate cost for different stances", () => {
      const cost = system.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.LI
      );
      expect(cost.ki).toBeGreaterThan(0);
      expect(cost.stamina).toBeGreaterThan(0);
      expect(cost.time).toBeGreaterThan(0); // Fix: Use time instead of timeMilliseconds
    });

    it("should apply adjacency modifier", () => {
      const adjacentCost = system.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.TAE
      );
      const nonAdjacentCost = system.calculateTransitionCost(
        TrigramStance.GEON,
        TrigramStance.GAM
      );
      expect(adjacentCost.ki).toBeLessThan(nonAdjacentCost.ki);
    });
  });

  describe("executeStanceTransition", () => {
    it("should execute transition successfully", () => {
      const result = system.executeStanceTransition(
        TrigramStance.GEON,
        TrigramStance.LI,
        mockPlayerState
      );
      expect(result.success).toBe(true);
      expect(result.updatedPlayer.currentStance).toBe(TrigramStance.LI);
    });

    it("should fail transition with insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerState, ki: 5 };
      const result = system.executeStanceTransition(
        TrigramStance.GEON,
        TrigramStance.LI,
        lowKiPlayer
      );
      expect(result.success).toBe(false);
    });

    it("should fail transition with insufficient stamina", () => {
      const lowStaminaPlayer = { ...mockPlayerState, stamina: 5 };
      const result = system.executeStanceTransition(
        TrigramStance.GEON,
        TrigramStance.LI,
        lowStaminaPlayer
      );
      expect(result.success).toBe(false);
    });
  });

  describe("getStanceEffectiveness", () => {
    it("should return effectiveness multiplier", () => {
      const effectiveness = system.getStanceEffectiveness(
        TrigramStance.GEON,
        TrigramStance.LI
      );
      expect(typeof effectiveness).toBe("number");
    });
  });

  describe("getOptimalStanceForArchetype", () => {
    it("should return optimal stance for archetype", () => {
      const optimalStance =
        system.getOptimalStanceForArchetype(mockPlayerState);
      expect(Object.values(TrigramStance)).toContain(optimalStance);
    });
  });

  describe("getStanceTechniques", () => {
    it("should return techniques for stance", () => {
      const techniques = system.getStanceTechniques(TrigramStance.GEON);
      expect(Array.isArray(techniques)).toBe(true);
    });
  });

  describe("getStanceData", () => {
    it("should return stance data", () => {
      const data = system.getStanceData(TrigramStance.GEON);
      expect(data).toBeDefined();
      expect(data.name).toBeDefined();
    });
  });

  describe("updatePlayerStanceState", () => {
    it("should update player state over time", () => {
      const updated = system.updatePlayerStanceState(mockPlayerState, 1000);
      expect(updated.ki).toBeGreaterThanOrEqual(mockPlayerState.ki);
      expect(updated.stamina).toBeGreaterThanOrEqual(mockPlayerState.stamina);
    });
  });
});
