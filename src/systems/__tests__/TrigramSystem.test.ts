import { describe, it, expect, beforeEach } from "vitest";
import { TrigramSystem } from "../TrigramSystem";
import type { PlayerState } from "../../types";

describe("TrigramSystem", () => {
  let system: TrigramSystem;
  let mockPlayerStateGeon: PlayerState;

  beforeEach(() => {
    system = new TrigramSystem();
    mockPlayerStateGeon = {
      id: "player1",
      name: "Test Player",
      archetype: "musa",
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
  });

  describe("canTransitionTo", () => {
    it("should allow transition with sufficient resources", () => {
      // Fix: Pass stance as first parameter, then target stance, then player state
      const result = system.canTransitionTo("geon", "li", mockPlayerStateGeon);
      expect(result.canTransition).toBe(true); // Fix: Expect object with canTransition property
    });

    it("should allow same stance transition", () => {
      // Fix: Pass current stance as first parameter
      const result = system.canTransitionTo(
        "geon",
        "geon",
        mockPlayerStateGeon
      );
      expect(result.canTransition).toBe(true);
    });

    it("should reject transition with insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerStateGeon, ki: 5, maxKi: 100 };
      // Fix: Pass stance as first parameter
      const result = system.canTransitionTo("geon", "li", lowKiPlayer);
      expect(result.canTransition).toBe(false);
      expect(result.reason).toBe("insufficient_ki");
    });

    it("should reject transition with insufficient stamina", () => {
      const lowStaminaPlayer = {
        ...mockPlayerStateGeon,
        stamina: 5,
        maxStamina: 100,
      };
      // Fix: Pass stance as first parameter
      const result = system.canTransitionTo("geon", "li", lowStaminaPlayer);
      expect(result.canTransition).toBe(false);
      expect(result.reason).toBe("insufficient_stamina");
    });
  });

  describe("calculateTransitionCost", () => {
    it("should return zero cost for same stance", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "geon",
        mockPlayerStateGeon
      );
      expect(cost.ki).toBe(0);
      expect(cost.stamina).toBe(0);
      expect(cost.timeMilliseconds).toBe(0);
    });

    it("should calculate cost for different stances", () => {
      const cost = system.calculateTransitionCost(
        "geon",
        "li",
        mockPlayerStateGeon
      );
      expect(cost.ki).toBeGreaterThan(0);
      expect(cost.stamina).toBeGreaterThan(0);
      expect(cost.timeMilliseconds).toBeGreaterThan(0);
    });

    it("should increase cost when player health is low", () => {
      const lowHealthPlayer = { ...mockPlayerStateGeon, health: 30 };
      const normalCost = system.calculateTransitionCost(
        "geon",
        "li",
        mockPlayerStateGeon
      );
      const highCost = system.calculateTransitionCost(
        "geon",
        "li",
        lowHealthPlayer
      );

      expect(highCost.ki).toBeGreaterThan(normalCost.ki);
      expect(highCost.stamina).toBeGreaterThan(normalCost.stamina);
    });
  });

  describe("executeStanceChange", () => {
    it("should successfully change stance with sufficient resources", () => {
      const result = system.executeStanceChange(mockPlayerStateGeon, "li");

      expect(result.success).toBe(true);
      expect(result.newState?.stance).toBe("li");
      expect(result.newState?.ki).toBeLessThan(mockPlayerStateGeon.ki);
      expect(result.newState?.stamina).toBeLessThan(
        mockPlayerStateGeon.stamina
      );
    });

    it("should fail to change stance with insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerStateGeon, ki: 5 };
      const result = system.executeStanceChange(lowKiPlayer, "li");

      expect(result.success).toBe(false);
      expect(result.reason).toBe("insufficient_ki");
      expect(result.newState).toBeUndefined();
    });

    it("should fail to change stance with insufficient stamina", () => {
      const lowStaminaPlayer = { ...mockPlayerStateGeon, stamina: 5 };
      const result = system.executeStanceChange(lowStaminaPlayer, "li");

      expect(result.success).toBe(false);
      expect(result.reason).toBe("insufficient_stamina");
      expect(result.newState).toBeUndefined();
    });
  });

  describe("getStanceEffectiveness", () => {
    it("should return effectiveness between stances", () => {
      const effectiveness = system.getStanceEffectiveness("geon", "li");
      expect(typeof effectiveness).toBe("number");
      expect(effectiveness).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getOptimalStanceAgainst", () => {
    it("should recommend optimal stance against opponent", () => {
      const optimalStance = system.getOptimalStanceAgainst(
        "li",
        mockPlayerStateGeon
      );
      expect(optimalStance).toBeDefined();
      expect(typeof optimalStance).toBe("string");
    });
  });

  describe("getTechniqueForStance", () => {
    it("should return technique for valid stance", () => {
      const technique = system.getTechniqueForStance("geon");
      expect(technique).toBeDefined();
      if (technique) {
        expect(technique.stance).toBe("geon");
      }
    });
  });

  describe("getStanceCycle", () => {
    it("should return clockwise cycle", () => {
      const cycle = system.getStanceCycle(true);
      expect(cycle).toBeDefined();
      expect(cycle.length).toBe(8);
    });

    it("should return counter-clockwise cycle", () => {
      const cycle = system.getStanceCycle(false);
      expect(cycle).toBeDefined();
      expect(cycle.length).toBe(8);
    });
  });

  describe("getNextStanceInCycle", () => {
    it("should return next stance in clockwise direction", () => {
      const nextStance = system.getNextStanceInCycle("geon", true);
      expect(nextStance).toBeDefined();
      expect(nextStance).not.toBe("geon");
    });

    it("should return next stance in counter-clockwise direction", () => {
      const nextStance = system.getNextStanceInCycle("geon", false);
      expect(nextStance).toBeDefined();
      expect(nextStance).not.toBe("geon");
    });
  });
});
