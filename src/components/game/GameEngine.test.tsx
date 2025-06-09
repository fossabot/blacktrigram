import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameEngine from "../GameEngine"; // Fix: Use default import
import { CombatSystem } from "../../systems/CombatSystem";
// Remove unused imports
import type {
  PlayerState,
  CombatResult,
  // Remove unused HitEffect and HitEffectType
} from "../../types";
// Import enums as values
import { PlayerArchetype, TrigramStance } from "../../types/enums";
// Remove unused KOREAN_COLORS import

jest.mock("../../systems/CombatSystem");
// jest.mock("../../systems/TrigramSystem"); // No longer needed?
// jest.mock("../../systems/VitalPointSystem"); // No longer needed?

// Mock initial player states
const mockPlayer1Initial: PlayerState = {
  id: "player1",
  name: { korean: "선수1", english: "Player 1" },
  archetype: PlayerArchetype.MUSA, // Now imported as value
  currentStance: TrigramStance.GEON, // Fix: Use currentStance and import as value
  position: { x: 100, y: 300 },
  health: 100,
  maxHealth: 100,
  ki: 100, // Fix: Use ki instead of energy
  maxKi: 100, // Fix: Use maxKi instead of maxEnergy
  stamina: 100, // Add missing stamina
  maxStamina: 100, // Add missing maxStamina
  isGuarding: false,
  stunDuration: 0,
  comboCount: 0,
  lastActionTime: 0,
  consciousness: 100,
  pain: 0,
  balance: 100,
  bloodLoss: 0,
  currentTechnique: null,
  activeEffects: [],
  vitalPoints: {},
  defensiveBonus: 0,
  attackPower: 1.0,
  movementSpeed: 1.0,
  reactionTime: 1.0,
  focusLevel: 100,
  battleExperience: 0,
  injuredLimbs: [],
  statusConditions: [],
};

const mockPlayer2Initial: PlayerState = {
  id: "player2",
  name: { korean: "선수2", english: "Player 2" },
  archetype: PlayerArchetype.AMSALJA, // Now imported as value
  currentStance: TrigramStance.GON, // Fix: Use currentStance and import as value
  position: { x: 700, y: 300 },
  health: 100,
  maxHealth: 100,
  ki: 100, // Fix: Use ki instead of energy
  maxKi: 100, // Fix: Use maxKi instead of maxEnergy
  stamina: 100, // Add missing stamina
  maxStamina: 100, // Add missing maxStamina
  isGuarding: false,
  stunDuration: 0,
  comboCount: 0,
  lastActionTime: 0,
  consciousness: 100,
  pain: 0,
  balance: 100,
  bloodLoss: 0,
  currentTechnique: null,
  activeEffects: [],
  vitalPoints: {},
  defensiveBonus: 0,
  attackPower: 1.0,
  movementSpeed: 1.0,
  reactionTime: 1.0,
  focusLevel: 100,
  battleExperience: 0,
  injuredLimbs: [],
  statusConditions: [],
};

// Mock props
const mockOnPlayerUpdate = jest.fn();
const mockOnCombatResult = jest.fn();
const mockOnGameEvent = jest.fn();

const defaultPlayers: readonly [PlayerState, PlayerState] = [
  mockPlayer1Initial,
  mockPlayer2Initial,
];

const defaultTestProps = {
  players: defaultPlayers,
  onPlayerUpdate: mockOnPlayerUpdate,
  onCombatResult: mockOnCombatResult,
  onGameEvent: mockOnGameEvent,
  isPaused: false,
};

// Define GameEngineProps interface locally
interface GameEngineProps {
  players: readonly [PlayerState, PlayerState];
  onPlayerUpdate: (playerIndex: 0 | 1, updates: Partial<PlayerState>) => void;
  onCombatResult: (result: CombatResult) => void;
  onGameEvent: (event: string, data?: any) => void;
  isPaused: boolean;
}

const renderGameEngine = (props: Partial<GameEngineProps> = {}) => {
  return render(<GameEngine {...defaultTestProps} {...props} />);
};

describe("<GameEngine />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.useFakeTimers(); // If using timers
  });

  afterEach(() => {
    // jest.runOnlyPendingTimers(); // If using timers
    // jest.useRealTimers(); // If using timers
  });

  test("renders without crashing", () => {
    renderGameEngine();
    // Add assertions if needed, e.g., checking for player rendering
  });

  test("handles player attack action", async () => {
    // Mock combat system to return a specific result
    const mockSuccessfulHitResult: CombatResult = {
      attacker: defaultPlayers[0], // Provide full PlayerState
      defender: defaultPlayers[1], // Provide full PlayerState
      damage: 15,
      hit: true, // Fix: Use 'hit' instead of 'isHit'
      critical: false,
      blocked: false,
      parried: false,
      dodged: false,
      effects: [], // Fix: Use 'effects' instead of 'effectsApplied'
      message: { korean: "명중!", english: "Hit!" },
    };

    // Mock CombatSystem methods
    (CombatSystem.executeAttack as jest.Mock).mockImplementation(
      async (
        _attacker: PlayerState,
        _defender: PlayerState,
        _technique: any
      ): Promise<CombatResult> => {
        return mockSuccessfulHitResult;
      }
    );
    (CombatSystem.applyCombatResult as jest.Mock).mockReturnValue(undefined);

    renderGameEngine();

    // Simulate player action (e.g., via a test utility or by exposing a function)
    // This requires GameEngine to have a way to trigger actions for testing.
    // For example, if GameEngine had a prop like `triggerActionRef`:
    // const triggerActionRef = React.createRef<(pIdx: 0|1, action: string) => void>();
    // renderGameEngine({ triggerActionRef });
    // act(() => triggerActionRef.current?.(0, "attack"));

    // await waitFor(() => expect(mockOnCombatResult).toHaveBeenCalledWith(mockSuccessfulHitResult));
    // await waitFor(() => expect(mockOnPlayerUpdate).toHaveBeenCalled());
  });

  test("pauses and resumes game logic", () => {
    const { rerender } = renderGameEngine({ isPaused: false });
    // Simulate time passing - requires control over useTick or game loop
    // act(() => { jest.advanceTimersByTime(1000); });
    // Check for updates

    rerender(<GameEngine {...defaultTestProps} isPaused={true} />);
    // Simulate time passing
    // act(() => { jest.advanceTimersByTime(1000); });
    // Check that no updates occurred for certain things
  });

  // Add more tests for different scenarios:
  // - Player movement (if implemented)
  // - Stance changes
  // - Defensive actions
  // - Status effect application and expiration
  // - AI behavior (if applicable)
});
