import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react"; // Import Stage
import { GameUI } from "./GameUI";
import { createPlayerState } from "../../utils/playerUtils";
import type { GameState, GameUIProps, PlayerState } from "../../types";
import { GameMode, GamePhase, PlayerArchetype } from "../../types/enums"; // TrigramStance removed

const mockPlayer1Name = { korean: "선수1", english: "Player1" };
const mockPlayer2Name = { korean: "선수2", english: "Player2" };
const mockPosition = { x: 0, y: 0 };

const createMockPlayer = (
  name: string,
  archetype: PlayerArchetype // Fix: use enum type
): PlayerState => ({
  ...createPlayerState(
    name,
    archetype,
    { korean: name, english: name },
    mockPosition
  ),
});

const mockPlayers: [PlayerState, PlayerState] = [
  createMockPlayer("Player 1", PlayerArchetype.MUSA), // Fix: use enum
  createMockPlayer("Player 2", PlayerArchetype.AMSALJA), // Fix: use enum
];

describe("GameUI", () => {
  const mockGameState: GameState = {
    // Create a full GameState object
    player1: mockPlayers[0],
    player2: mockPlayers[1],
    timeRemaining: 120,
    currentRound: 1,
    phase: GamePhase.COMBAT,
    mode: GameMode.VERSUS,
    isTraining: false,
    maxRounds: 3,
    gameTime: 0,
    isPaused: false,
    winner: null,
    combatEffects: [],
    matchHistory: [],
  };

  const defaultProps: GameUIProps = {
    // Ensure this matches GameUIProps
    gameState: mockGameState,
    onStanceChange: vi.fn(),
    onPlayerAction: vi.fn(),
  };

  it("renders without crashing", () => {
    const { container } = render(
      <Stage>
        <GameUI {...defaultProps} />
      </Stage>
    );
    expect(container).toBeInTheDocument();
  });

  it("displays player information", () => {
    const { getByText } = render(
      <Stage>
        <GameUI {...defaultProps} />
      </Stage>
    );
    expect(
      getByText(mockPlayer1Name.korean, { exact: false })
    ).toBeInTheDocument();
    expect(
      getByText(mockPlayer2Name.korean, { exact: false })
    ).toBeInTheDocument();
  });

  it("displays game timer and round", () => {
    const { getByText } = render(
      <Stage>
        <GameUI
          {...defaultProps}
          gameState={{
            // Pass the modified gameState
            ...defaultProps.gameState,
            timeRemaining: 55,
            currentRound: 2,
          }}
        />
      </Stage>
    );
    expect(getByText(/55/)).toBeInTheDocument(); // Check for time
    expect(getByText(/Round 2 \/ 3/i)).toBeInTheDocument(); // Check for round
  });
});
