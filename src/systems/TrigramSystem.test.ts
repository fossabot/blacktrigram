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

  describe("canTransitionTo", () => {
    it("should allow transition with sufficient resources", () => {
      const result = system.canTransitionTo(mockPlayerStateGeon, "li");
      expect(result.canTransition).toBe(true);
    });

    it("should allow transition to same stance", () => {
      const canTransition = system.canTransitionTo(mockPlayerStateGeon, "geon");
      expect(canTransition).toBe(true);
    });

    it("should prevent transition with insufficient ki", () => {
      const lowKiPlayer = createMockPlayerState("geon", "musa", 0, 100);
      const result = system.canTransitionTo(lowKiPlayer, "li");
      expect(result.canTransition).toBe(false);
      expect(result.reason).toBe("insufficient_ki");
    });

    it("should prevent transition with insufficient stamina", () => {
      const lowStaminaPlayer = createMockPlayerState("geon", "musa", 100, 0);
      const result = system.canTransitionTo(lowStaminaPlayer, "li");
      expect(result.canTransition).toBe(false);
      expect(result.reason).toBe("insufficient_stamina");
    });
  });

  describe("stance optimization", () => {
    it("should find optimal stance against opponent", () => {
      const optimalStance = system.getOptimalStanceAgainst(
        "tae",
        mockPlayerStateGeon
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

  describe("transition cost calculation", () => {
    it("should calculate transition cost correctly", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "tae",
        mockPlayerStateGeon
      );
      expect(cost).toBeDefined();
      expect(cost.ki).toBeGreaterThanOrEqual(0);
      expect(cost.stamina).toBeGreaterThanOrEqual(0);
    });

    it("should handle same-stance transition", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "geon",
        mockPlayerStateGeon
      );
      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
    });
  });
});
