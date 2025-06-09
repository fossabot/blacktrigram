import { describe, it, expect, beforeEach, vi as vitestVi } from "vitest";
import { StanceManager } from "./StanceManager";
import { TrigramStance, PlayerArchetype } from "../../types/enums";
import type { PlayerState } from "../../types";

const mockPlayer: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA,
  currentStance: TrigramStance.GEON,
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
  combatState: "idle",
  orientation: "right",
};

describe("StanceManager", () => {
  let stanceManager: StanceManager;

  beforeEach(() => {
    stanceManager = new StanceManager(TrigramStance.GEON);
  });

  it("should initialize with correct stance", () => {
    expect(stanceManager.getCurrentStance()).toBe(TrigramStance.GEON);
  });

  it("should change stance successfully", () => {
    const result = stanceManager.changeStance(TrigramStance.TAE, mockPlayer);

    expect(result.success).toBe(true);
    expect(stanceManager.getCurrentStance()).toBe(TrigramStance.TAE);
    expect(result.updatedPlayer?.currentStance).toBe(TrigramStance.TAE);
  });

  it("should fail stance change when insufficient resources", () => {
    const lowResourcePlayer = {
      ...mockPlayer,
      ki: 5,
      stamina: 5,
    };

    const result = stanceManager.changeStance(
      TrigramStance.GAM,
      lowResourcePlayer
    );

    expect(result.success).toBe(false);
    expect(stanceManager.getCurrentStance()).toBe(TrigramStance.GEON);
  });

  it("should respect cooldown period", () => {
    stanceManager.setCooldownPeriod(100);

    // First change should succeed
    const result1 = stanceManager.changeStance(TrigramStance.TAE, mockPlayer);
    expect(result1.success).toBe(true);

    // Immediate second change should fail due to cooldown
    const result2 = stanceManager.changeStance(TrigramStance.LI, mockPlayer);
    expect(result2.success).toBe(false);
  });

  it("should get stance data correctly", () => {
    const stanceData = stanceManager.getStanceData();
    expect(stanceData).toBeDefined();
    expect(stanceData.name.korean).toBe("건");
  });
});
