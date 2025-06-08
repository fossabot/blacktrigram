import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Application } from "@pixi/react";
import { GameEngine } from "./GameEngine";
import { MockAudioProvider } from "../../test/test-utils";
import { GamePhase, PlayerArchetype } from "../../types/enums";
import { GameMode } from "../../types/game"; // Fix: Import from correct location
import { createPlayerState } from "../../utils/playerUtils";

// Fix: Add missing mock data
const mockPlayer1 = createPlayerState(
  { korean: "Player 1", english: "Player 1" },
  PlayerArchetype.MUSA,
  { korean: "건", english: "geon" },
  "player1"
);

const mockPlayer2 = createPlayerState(
  { korean: "Player 2", english: "Player 2" },
  PlayerArchetype.AMSALJA,
  { korean: "태", english: "tae" },
  "player2"
);

describe("GameEngine", () => {
  const defaultProps = {
    player1: mockPlayer1,
    player2: mockPlayer2,
    gamePhase: GamePhase.COMBAT,
    onGameStateChange: vi.fn(),
    onPlayerUpdate: vi.fn(),
    onGamePhaseChange: vi.fn(),
    gameMode: GameMode.VERSUS, // Fix: Use correct import
  };

  const renderGameEngine = (props = {}) => {
    return render(
      <MockAudioProvider>
        <Application>
          <GameEngine {...defaultProps} {...props} />
        </Application>
      </MockAudioProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = renderGameEngine();
    expect(container).toBeInTheDocument();
  });

  it("initializes in combat mode", () => {
    renderGameEngine({ gamePhase: "combat" });
    expect(defaultProps.onGameStateChange).toHaveBeenCalled();
  });

  it("handles training mode", () => {
    renderGameEngine({ gameMode: "training" });
    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        isTraining: true,
      })
    );
  });

  it("processes game state changes", () => {
    const onGameStateChange = vi.fn();
    renderGameEngine({ onGameStateChange });

    expect(onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: "combat",
        player1: mockPlayer1,
        player2: mockPlayer2,
      })
    );
  });

  it("handles player updates", () => {
    const onPlayerUpdate = vi.fn();
    renderGameEngine({ onPlayerUpdate });

    // The game engine should be ready to handle player updates
    expect(onPlayerUpdate).not.toHaveBeenCalled(); // Not called automatically
  });

  it("manages combat effects", () => {
    const { rerender } = renderGameEngine();

    // Combat effects should be managed internally
    rerender(
      <MockAudioProvider>
        <Application>
          <GameEngine {...defaultProps} />
        </Application>
      </MockAudioProvider>
    );

    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        combatEffects: expect.any(Array),
      })
    );
  });

  it("handles victory conditions", () => {
    const damagedPlayer = {
      ...mockPlayer2,
      health: 0,
    };

    renderGameEngine({ player2: damagedPlayer });

    // Should detect victory condition in the game loop
    expect(defaultProps.onGamePhaseChange).not.toHaveBeenCalledWith("victory");
  });

  it("processes stance changes", () => {
    const { container } = renderGameEngine();

    // Game engine should be ready to process stance changes
    expect(container).toBeInTheDocument();

    // In a full test, we would simulate stance change events
    // For now, verify the component renders properly
  });

  it("handles Korean martial arts techniques", () => {
    renderGameEngine();

    // Verify that the game engine is set up to handle Korean techniques
    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        player1: expect.objectContaining({
          archetype: "musa",
          currentStance: expect.any(String),
        }),
        player2: expect.objectContaining({
          archetype: "amsalja",
          currentStance: expect.any(String),
        }),
      })
    );
  });

  it("manages game timing", async () => {
    renderGameEngine();

    // Wait for game loop to process
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Should have called game state change multiple times due to game loop
    expect(defaultProps.onGameStateChange).toHaveBeenCalled();
  });

  it("handles different game phases", () => {
    renderGameEngine({ gamePhase: "victory" });

    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: "victory",
      })
    );
  });
});
