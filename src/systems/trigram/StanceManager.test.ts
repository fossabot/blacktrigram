import { describe, it, expect, beforeEach, vi as vitestVi } from "vitest"; // Use aliased vi
import { StanceManager } from "./StanceManager";
import type {
  PlayerState,
  TrigramStance,
  // CombatReadiness, // Unused
  // PlayerCombatStateEnum, // Unused
  TransitionPath,
} from "../../types";
import { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "../../types";
// import { MOCK_PLAYER_STATE_GEON, MOCK_PLAYER_STATE_LI } from '../../test/mocks/player'; // Correct or remove if not used
// import { MOCK_TRIGRAM_CALCULATOR } from '../../test/mocks/trigram'; // Correct or remove if not used

// Mock PlayerState
const createMockPlayerState = (
  stance: TrigramStance,
  ki = 100,
  stamina = 100
): PlayerState => ({
  id: "player1",
  name: "Test Player",
  archetype: "musa",
  position: { x: 0, y: 0 },
  stance,
  facing: "right",
  health: 100,
  maxHealth: 100,
  ki,
  maxKi: 100,
  stamina,
  maxStamina: 100,
  consciousness: 100,
  pain: 0,
  balance: 100,
  bloodLoss: 0,
  lastStanceChangeTime: 0,
  isAttacking: false,
  combatReadiness: 100, // CombatReadiness.READY,
  activeEffects: [],
  combatState: "ready",
  conditions: [],
});

// Mock TrigramCalculator
const mockTrigramCalculator = {
  calculateTransitionCost: vitestVi.fn(),
  calculateOptimalPath: vitestVi.fn(),
  getKiRecoveryRate: vitestVi.fn(),
  getStanceEffectiveness: vitestVi.fn(),
  getTrigramData: vitestVi.fn((stance: TrigramStance) => TRIGRAM_DATA[stance]),
  getAllTrigramData: vitestVi.fn(() => TRIGRAM_DATA),
  getEffectivenessMatrix: vitestVi.fn(() => STANCE_EFFECTIVENESS_MATRIX),
};

describe("StanceManager", () => {
  let stanceManager: StanceManager;
  let playerState: PlayerState;

  beforeEach(() => {
    playerState = createMockPlayerState("geon");
    // @ts-ignore
    stanceManager = new StanceManager(mockTrigramCalculator);
    mockTrigramCalculator.calculateTransitionCost.mockReset();
    mockTrigramCalculator.calculateOptimalPath.mockReset();
  });

  it("should initialize with a TrigramCalculator", () => {
    expect(stanceManager).toBeDefined();
  });

  describe("changeStance", () => {
    it("should successfully change stance if conditions are met", () => {
      mockTrigramCalculator.calculateTransitionCost.mockReturnValue({
        ki: 10,
        stamina: 5,
        timeMilliseconds: 300,
      });
      const result = stanceManager.changeStance(playerState, "tae");
      expect(result.success).toBe(true);
      expect(result.to).toBe("tae");
      expect(result.newState.stance).toBe("tae");
      expect(result.newState.ki).toBe(playerState.ki - 10);
      expect(result.newState.stamina).toBe(playerState.stamina - 5);
    });

    it("should fail to change stance if insufficient Ki", () => {
      playerState = createMockPlayerState("geon", 5); // Low Ki
      mockTrigramCalculator.calculateTransitionCost.mockReturnValue({
        ki: 10,
        stamina: 5,
        timeMilliseconds: 300,
      });
      const result = stanceManager.changeStance(playerState, "tae");
      expect(result.success).toBe(false);
      expect(result.reason).toBe("insufficient_ki");
      expect(result.newState.stance).toBe("geon");
    });

    it("should fail to change stance if on cooldown", () => {
      // First successful change
      mockTrigramCalculator.calculateTransitionCost.mockReturnValue({
        ki: 10,
        stamina: 5,
        timeMilliseconds: 300,
      });
      let result = stanceManager.changeStance(playerState, "tae");
      playerState = result.newState; // Update player state

      // Attempt immediate second change (should fail due to cooldown)
      vitestVi.spyOn(Date, "now").mockReturnValue(result.timestamp + 100); // Advance time slightly, but less than cooldown

      result = stanceManager.changeStance(playerState, "li");
      expect(result.success).toBe(false);
      expect(result.reason).toContain("cooldown");
      vitestVi.spyOn(Date, "now").mockRestore();
    });
  });

  describe("canTransitionTo", () => {
    it("should return true if transition is possible", () => {
      mockTrigramCalculator.calculateTransitionCost.mockReturnValue({
        ki: 10,
        stamina: 5,
        timeMilliseconds: 300,
      });
      const canTransition = stanceManager.canTransitionTo(playerState, "tae");
      expect(canTransition.possible).toBe(true);
    });

    it("should return false and reason if transition is not possible (e.g. insufficient Ki)", () => {
      playerState = createMockPlayerState("geon", 5); // Low Ki
      mockTrigramCalculator.calculateTransitionCost.mockReturnValue({
        ki: 10,
        stamina: 5,
        timeMilliseconds: 300,
      });
      const canTransition = stanceManager.canTransitionTo(playerState, "tae");
      expect(canTransition.possible).toBe(false);
      expect(canTransition.reason).toBe("insufficient_ki");
    });
  });

  describe("findOptimalStancePath", () => {
    it("should call TrigramCalculator's calculateOptimalPath", () => {
      const mockPath: TransitionPath = {
        path: ["geon", "tae", "li"],
        totalCost: { ki: 15, stamina: 20, timeMilliseconds: 1000 },
        overallEffectiveness: 0.8,
        cumulativeRisk: 0.3,
        name: "Test Transition Path",
        description: {
          korean: "테스트 전환 경로",
          english: "Test Transition Path",
        },
      };
      mockTrigramCalculator.calculateOptimalPath.mockReturnValue(mockPath);
      const opponentStance: TrigramStance = "gam";
      const path = stanceManager.findOptimalStancePath(
        playerState,
        opponentStance,
        3
      );
      expect(path).toEqual(mockPath);
      expect(mockTrigramCalculator.calculateOptimalPath).toHaveBeenCalledWith(
        playerState.stance,
        opponentStance,
        playerState, // Pass full player state
        3
      );
    });
  });
});
