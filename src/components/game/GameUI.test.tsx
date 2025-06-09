import { render } from "@testing-library/react";
import { GameUI } from "./GameUI";
import { Stage } from "@pixi/react";
import type { GameState, MatchStatistics, PlayerState } from "../../types";
import { GameMode, GamePhase, PlayerArchetype } from "../../types/enums";
import { createPlayerFromArchetype } from "../../utils/playerUtils";

describe("GameUI Component", () => {
  // Fix: Ensure exactly 2 players and proper typing
  const mockPlayers: readonly [PlayerState, PlayerState] = [
    createPlayerFromArchetype(PlayerArchetype.MUSA, 0),
    createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1),
  ] as const;

  const mockMatchStats: MatchStatistics = {
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    criticalHits: 0,
    vitalPointHits: 0,
    techniquesUsed: 0,
    perfectStrikes: 0,
    consecutiveWins: 0,
    matchDuration: 0,
    totalMatches: 1,
    maxRounds: 3,
    winner: 0,
    totalRounds: 1,
    currentRound: 1,
    timeRemaining: 120,
    combatEvents: [],
    finalScore: { player1: 0, player2: 0 },
    roundsWon: { player1: 0, player2: 0 },
    player1: {
      wins: 0,
      losses: 0,
      hitsTaken: 0,
      hitsLanded: 0,
      totalDamageDealt: 0,
      totalDamageReceived: 0,
      techniques: [],
      perfectStrikes: 0,
      vitalPointHits: 0,
      consecutiveWins: 0,
      matchDuration: 0,
    },
    player2: {
      wins: 0,
      losses: 0,
      hitsTaken: 0,
      hitsLanded: 0,
      totalDamageDealt: 0,
      totalDamageReceived: 0,
      techniques: [],
      perfectStrikes: 0,
      vitalPointHits: 0,
      consecutiveWins: 0,
      matchDuration: 0,
    },
  };

  const mockGameState: GameState = {
    mode: GameMode.VERSUS,
    phase: GamePhase.COMBAT,
    players: mockPlayers, // Fix: No need for casting now
    currentRound: 1,
    maxRounds: 3,
    timeRemaining: 120,
    isPaused: false,
    matchStatistics: mockMatchStats,
    winner: undefined,
  };

  // Fix: Add missing mock functions
  const mockOnStateChange = jest.fn();
  const mockOnReturnToMenu = jest.fn();
  const mockOnPlayerUpdate = jest.fn();

  // Fix: Create helper function to generate game states with different phases
  const createGameStateWithPhase = (phase: GamePhase): GameState => ({
    ...mockGameState,
    phase,
  });

  it("renders intro screen", () => {
    const gameState = createGameStateWithPhase(GamePhase.INTRO);
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={gameState}
          onStateChange={mockOnStateChange}
          onReturnToMenu={mockOnReturnToMenu}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );
  });

  it("renders training screen", () => {
    const gameState = createGameStateWithPhase(GamePhase.TRAINING);
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={gameState}
          onStateChange={mockOnStateChange}
          onReturnToMenu={mockOnReturnToMenu}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );
  });

  it("renders combat screen", () => {
    const gameState = createGameStateWithPhase(GamePhase.COMBAT);
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={gameState}
          onStateChange={mockOnStateChange}
          onReturnToMenu={mockOnReturnToMenu}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );
  });

  it("renders game over screen", () => {
    const gameState = createGameStateWithPhase(GamePhase.GAME_OVER);
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={gameState}
          onReturnToMenu={mockOnReturnToMenu}
          onStateChange={mockOnStateChange}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );
  });

  it("handles state changes correctly", () => {
    const gameState = createGameStateWithPhase(GamePhase.INTRO);
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={gameState}
          onReturnToMenu={mockOnReturnToMenu}
          onStateChange={mockOnStateChange}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );

    // Add test logic here if needed
  });

  it("renders without crashing", () => {
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={mockGameState}
          onStateChange={mockOnStateChange}
          onReturnToMenu={mockOnReturnToMenu}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );
  });

  it("displays game state information", () => {
    render(
      <Stage width={800} height={600}>
        <GameUI
          gameState={mockGameState}
          onStateChange={mockOnStateChange}
          onReturnToMenu={mockOnReturnToMenu}
          onPlayerUpdate={mockOnPlayerUpdate}
        />
      </Stage>
    );

    // Add assertions to check if game state information is displayed correctly
  });
});
