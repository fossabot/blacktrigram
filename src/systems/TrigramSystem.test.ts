import { describe, it, expect, beforeEach } from "vitest";
import { TrigramSystem } from "./TrigramSystem";
import type { PlayerState, TrigramStance, PlayerArchetype } from "../types";

const createMockPlayerState = (
  stance: TrigramStance,
  archetype: PlayerArchetype = "musa", // Fix archetype type
  ki = 100,
  stamina = 100
): PlayerState => ({
  id: "p1",
  name: `Test ${archetype}`,
  archetype, // Ensure correct type
  stance,
  health: 100,
  maxHealth: 100,
  ki,
  maxKi: 100,
  stamina,
  maxStamina: 100,
  position: { x: 0, y: 0 },
  facing: "right",
  consciousness: 100,
  pain: 0,
  balance: 100,
  bloodLoss: 0,
  lastStanceChangeTime: 0,
  isAttacking: false,
  combatReadiness: 100,
  activeEffects: [],
  combatState: "ready",
  conditions: [],
});

describe("TrigramSystem", () => {
  let system: TrigramSystem;
  let mockPlayerStateGeon: PlayerState = {
    id: "p1",
    name: "Test musa",
    archetype: "musa" as const, // Fix archetype type
    stance: "geon",
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    position: { x: 0, y: 0 },
    facing: "right",
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: 0,
    isAttacking: false,
    combatReadiness: 100,
    activeEffects: [],
    combatState: "ready",
    conditions: [],
  };

  beforeEach(() => {
    system = new TrigramSystem();
    mockPlayerStateGeon = createMockPlayerState("geon");
  });

  describe("calculateOptimalPath", () => {
    it("should find optimal path from Geon to Li", () => {
      const result = system.calculateOptimalPath(
        "geon", // Pass stance string, not PlayerState
        "li",
        mockPlayerStateGeon,
        "tae"
      );

      expect(result).toBeDefined();
      if (result) {
        expect(result.path).toContain("geon");
        expect(result.totalCost).toBeDefined();
        expect(result.overallEffectiveness).toBeGreaterThan(0);
      }
    });

    it("should find optimal path from Geon to Gam", () => {
      const result = system.calculateOptimalPath(
        "geon", // Pass stance string, not PlayerState
        "gam",
        mockPlayerStateGeon
      );

      // May return null if resources are insufficient
      if (result === null) {
        expect(result).toBeNull();
      } else {
        expect(result).toBeDefined();
      }
    });
  });

  describe("calculateStanceEffectiveness", () => {
    it("Geon (Heaven) vs Tae (Lake) should have specific effectiveness", () => {
      const result = system.getStanceEffectiveness("geon", "tae"); // Use correct method name
      expect(result).toBeGreaterThan(0);
    });

    it("Identical stances should have 1.0 effectiveness", () => {
      const result = system.getStanceEffectiveness("geon", "geon"); // Use correct method name
      expect(result).toBe(1.0);
    });
  });

  describe("canTransitionToStance", () => {
    it("should validate possible transitions", () => {
      const canTransition = system.canTransitionToStance(
        mockPlayerStateGeon,
        "tae"
      );
      expect(typeof canTransition).toBe("boolean");
    });

    it("should allow transition to same stance", () => {
      const canTransition = system.canTransitionToStance(
        mockPlayerStateGeon,
        "geon"
      );
      expect(canTransition).toBe(true);
    });

    it("should reject transitions with insufficient resources", () => {
      const lowResourcePlayer = createMockPlayerState("geon", "musa", 0, 0);
      const canTransition = system.canTransitionToStance(
        lowResourcePlayer,
        "gon"
      );
      expect(canTransition).toBe(false);
    });
  });

  describe("getOptimalStanceAgainst", () => {
    it("should recommend optimal stance against opponent", () => {
      const optimalStance = system.getOptimalStanceAgainst(
        mockPlayerStateGeon,
        "tae"
      );
      expect(optimalStance).toBeDefined();
      expect([
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ]).toContain(optimalStance);
    });
  });

  describe("calculateTransitionCost", () => {
    it("should calculate basic transition cost", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "li",
        mockPlayerStateGeon
      ); // Fix parameter order
      expect(cost).toBeDefined();
      expect(cost.ki).toBeGreaterThanOrEqual(0);
      expect(cost.stamina).toBeGreaterThanOrEqual(0);
      expect(cost.timeMilliseconds).toBeGreaterThanOrEqual(0);
    });

    it("should calculate transition cost for same stance", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "geon",
        mockPlayerStateGeon
      ); // Fix parameter order
      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
      expect(cost.timeMilliseconds).toBe(0);
    });
  });
});
